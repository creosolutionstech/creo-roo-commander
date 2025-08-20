#!/usr/bin/env python3
"""
QMS Reporter Script
This script generates comprehensive QMS reports from collected metrics and data
"""

import os
import sys
import json
import yaml
import argparse
import logging
import sqlite3
from pathlib import Path
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime, timedelta
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import jinja2
from jinja2 import Environment, FileSystemLoader
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import base64
import io
import tempfile

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    ENDC = '\033[0m'

class QMSReporter:
    """Main QMS reporting class"""
    
    def __init__(self, config_path: Optional[str] = None, data_source: Optional[str] = None):
        self.config_path = config_path or self._find_config()
        self.config = self._load_config()
        self.data_source = data_source or self._get_data_source()
        self.output_dir = Path(self.config.get('reporting', {}).get('output_dir', './reports'))
        self.template_dir = Path(__file__).parent / 'templates'
        self._setup_matplotlib()
        
    def _find_config(self) -> str:
        """Find QMS configuration file"""
        possible_paths = [
            os.environ.get('QMS_CONFIG_FILE'),
            os.path.expanduser('~/.qms/config/qms-config.yaml'),
            './qms-config.yaml',
            './.qms/config/qms-config.yaml',
            './config/qms-config.yaml'
        ]
        
        for path in possible_paths:
            if path and os.path.exists(path):
                return path
                
        raise FileNotFoundError("QMS configuration file not found")
    
    def _load_config(self) -> Dict[str, Any]:
        """Load QMS configuration"""
        try:
            with open(self.config_path, 'r') as f:
                config = yaml.safe_load(f)
            return config
        except Exception as e:
            logger.error(f"Failed to load QMS config: {e}")
            sys.exit(1)
    
    def _get_data_source(self) -> str:
        """Get data source path"""
        db_config = self.config.get('database', {})
        if db_config.get('type') == 'sqlite':
            return db_config.get('path', './qms.db')
        else:
            logger.warning("Non-SQLite databases not yet supported for reporting")
            return './qms.db'
    
    def _setup_matplotlib(self):
        """Configure matplotlib for better plots"""
        plt.style.use('seaborn-v0_8')
        sns.set_palette("husl")
        
        # Configure matplotlib params
        plt.rcParams.update({
            'figure.figsize': (12, 8),
            'font.size': 10,
            'axes.titlesize': 14,
            'axes.labelsize': 12,
            'xtick.labelsize': 10,
            'ytick.labelsize': 10,
            'legend.fontsize': 10,
            'figure.titlesize': 16
        })
    
    def _execute_query(self, query: str, params: Optional[Tuple] = None) -> pd.DataFrame:
        """Execute SQL query and return DataFrame"""
        try:
            if not os.path.exists(self.data_source):
                logger.warning(f"Database not found at {self.data_source}, returning empty DataFrame")
                return pd.DataFrame()
            
            with sqlite3.connect(self.data_source) as conn:
                df = pd.read_sql_query(query, conn, params=params or ())
            return df
        except Exception as e:
            logger.error(f"Database query failed: {e}")
            return pd.DataFrame()
    
    def collect_quality_metrics(self, days: int = 30) -> Dict[str, Any]:
        """Collect quality metrics from the database"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        metrics = {
            'period': {
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'days': days
            },
            'quality_gates': {},
            'code_coverage': {},
            'security_issues': {},
            'code_review': {},
            'compliance': {},
            'trends': {}
        }
        
        # Quality Gates Summary
        quality_gates_query = """
        SELECT 
            status,
            COUNT(*) as count,
            AVG(score) as avg_score
        FROM quality_gate_results 
        WHERE created_at >= ? AND created_at <= ?
        GROUP BY status
        """
        
        qg_df = self._execute_query(quality_gates_query, (start_date, end_date))
        if not qg_df.empty:
            metrics['quality_gates'] = {
                'total_runs': qg_df['count'].sum(),
                'pass_rate': qg_df[qg_df['status'] == 'PASS']['count'].sum() / qg_df['count'].sum() * 100 if not qg_df.empty else 0,
                'avg_score': qg_df['avg_score'].mean(),
                'by_status': qg_df.to_dict('records')
            }
        
        # Code Coverage Metrics
        coverage_query = """
        SELECT 
            AVG(line_coverage) as avg_line_coverage,
            AVG(branch_coverage) as avg_branch_coverage,
            MIN(line_coverage) as min_line_coverage,
            MAX(line_coverage) as max_line_coverage
        FROM code_coverage_results 
        WHERE created_at >= ? AND created_at <= ?
        """
        
        coverage_df = self._execute_query(coverage_query, (start_date, end_date))
        if not coverage_df.empty and not coverage_df.iloc[0].isna().all():
            row = coverage_df.iloc[0]
            metrics['code_coverage'] = {
                'avg_line_coverage': round(row['avg_line_coverage'], 2),
                'avg_branch_coverage': round(row['avg_branch_coverage'], 2),
                'min_line_coverage': round(row['min_line_coverage'], 2),
                'max_line_coverage': round(row['max_line_coverage'], 2)
            }
        
        # Security Issues
        security_query = """
        SELECT 
            severity,
            COUNT(*) as count,
            AVG(CASE WHEN status = 'RESOLVED' THEN 1 ELSE 0 END) as resolution_rate
        FROM security_scan_results 
        WHERE created_at >= ? AND created_at <= ?
        GROUP BY severity
        """
        
        security_df = self._execute_query(security_query, (start_date, end_date))
        if not security_df.empty:
            metrics['security_issues'] = {
                'total_issues': security_df['count'].sum(),
                'by_severity': security_df.to_dict('records'),
                'avg_resolution_rate': security_df['resolution_rate'].mean() * 100
            }
        
        # Code Review Metrics
        review_query = """
        SELECT 
            AVG(review_time_hours) as avg_review_time,
            AVG(comments_count) as avg_comments,
            COUNT(*) as total_reviews,
            AVG(CASE WHEN approved = 1 THEN 1 ELSE 0 END) as approval_rate
        FROM code_review_results 
        WHERE created_at >= ? AND created_at <= ?
        """
        
        review_df = self._execute_query(review_query, (start_date, end_date))
        if not review_df.empty and not review_df.iloc[0].isna().all():
            row = review_df.iloc[0]
            metrics['code_review'] = {
                'total_reviews': int(row['total_reviews']),
                'avg_review_time': round(row['avg_review_time'], 2),
                'avg_comments': round(row['avg_comments'], 1),
                'approval_rate': round(row['approval_rate'] * 100, 1)
            }
        
        return metrics
    
    def generate_trend_charts(self, metrics: Dict[str, Any], days: int = 30) -> Dict[str, str]:
        """Generate trend charts and return base64 encoded images"""
        charts = {}
        
        # Quality Gates Trend
        trend_query = """
        SELECT 
            DATE(created_at) as date,
            AVG(score) as avg_score,
            COUNT(*) as total_runs,
            AVG(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) as pass_rate
        FROM quality_gate_results 
        WHERE created_at >= date('now', '-{} days')
        GROUP BY DATE(created_at)
        ORDER BY date
        """.format(days)
        
        trend_df = self._execute_query(trend_query)
        
        if not trend_df.empty:
            # Quality Gates Score Trend
            fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))
            
            # Convert date strings to datetime
            trend_df['date'] = pd.to_datetime(trend_df['date'])
            
            # Score trend
            ax1.plot(trend_df['date'], trend_df['avg_score'], marker='o', linewidth=2)
            ax1.set_title('Quality Gate Score Trend', fontsize=14, fontweight='bold')
            ax1.set_ylabel('Average Score')
            ax1.grid(True, alpha=0.3)
            ax1.xaxis.set_major_formatter(mdates.DateFormatter('%m-%d'))
            
            # Pass rate trend
            ax2.plot(trend_df['date'], trend_df['pass_rate'] * 100, marker='s', color='green', linewidth=2)
            ax2.set_title('Quality Gate Pass Rate Trend', fontsize=14, fontweight='bold')
            ax2.set_ylabel('Pass Rate (%)')
            ax2.set_xlabel('Date')
            ax2.grid(True, alpha=0.3)
            ax2.xaxis.set_major_formatter(mdates.DateFormatter('%m-%d'))
            
            plt.tight_layout()
            
            # Save to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
            buffer.seek(0)
            charts['quality_gates_trend'] = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
        
        # Code Coverage Trend
        coverage_trend_query = """
        SELECT 
            DATE(created_at) as date,
            AVG(line_coverage) as avg_line_coverage,
            AVG(branch_coverage) as avg_branch_coverage
        FROM code_coverage_results 
        WHERE created_at >= date('now', '-{} days')
        GROUP BY DATE(created_at)
        ORDER BY date
        """.format(days)
        
        coverage_trend_df = self._execute_query(coverage_trend_query)
        
        if not coverage_trend_df.empty:
            fig, ax = plt.subplots(figsize=(12, 6))
            
            coverage_trend_df['date'] = pd.to_datetime(coverage_trend_df['date'])
            
            ax.plot(coverage_trend_df['date'], coverage_trend_df['avg_line_coverage'], 
                   marker='o', label='Line Coverage', linewidth=2)
            ax.plot(coverage_trend_df['date'], coverage_trend_df['avg_branch_coverage'], 
                   marker='s', label='Branch Coverage', linewidth=2)
            
            ax.set_title('Code Coverage Trend', fontsize=14, fontweight='bold')
            ax.set_ylabel('Coverage (%)')
            ax.set_xlabel('Date')
            ax.legend()
            ax.grid(True, alpha=0.3)
            ax.xaxis.set_major_formatter(mdates.DateFormatter('%m-%d'))
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
            buffer.seek(0)
            charts['coverage_trend'] = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
        
        return charts
    
    def generate_summary_charts(self, metrics: Dict[str, Any]) -> Dict[str, str]:
        """Generate summary charts"""
        charts = {}
        
        # Quality Gates Status Distribution
        if 'quality_gates' in metrics and 'by_status' in metrics['quality_gates']:
            fig, ax = plt.subplots(figsize=(8, 6))
            
            statuses = [item['status'] for item in metrics['quality_gates']['by_status']]
            counts = [item['count'] for item in metrics['quality_gates']['by_status']]
            colors_map = {'PASS': 'green', 'FAIL': 'red', 'WARNING': 'orange'}
            chart_colors = [colors_map.get(status, 'blue') for status in statuses]
            
            wedges, texts, autotexts = ax.pie(counts, labels=statuses, colors=chart_colors, 
                                            autopct='%1.1f%%', startangle=90)
            ax.set_title('Quality Gates Status Distribution', fontsize=14, fontweight='bold')
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
            buffer.seek(0)
            charts['quality_gates_distribution'] = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
        
        # Security Issues by Severity
        if 'security_issues' in metrics and 'by_severity' in metrics['security_issues']:
            fig, ax = plt.subplots(figsize=(10, 6))
            
            severities = [item['severity'] for item in metrics['security_issues']['by_severity']]
            counts = [item['count'] for item in metrics['security_issues']['by_severity']]
            
            bars = ax.bar(severities, counts, color=['red', 'orange', 'yellow', 'blue'])
            ax.set_title('Security Issues by Severity', fontsize=14, fontweight='bold')
            ax.set_ylabel('Number of Issues')
            ax.set_xlabel('Severity')
            
            # Add value labels on bars
            for bar in bars:
                height = bar.get_height()
                ax.text(bar.get_x() + bar.get_width()/2., height,
                       f'{int(height)}', ha='center', va='bottom')
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
            buffer.seek(0)
            charts['security_issues_by_severity'] = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
        
        return charts
    
    def generate_html_report(self, metrics: Dict[str, Any], charts: Dict[str, str], 
                           report_type: str = 'comprehensive') -> str:
        """Generate HTML report"""
        
        # Create template
        html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QMS {{ report_type.title() }} Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 2.5em;
        }
        .header p {
            color: #666;
            margin: 10px 0 0 0;
            font-size: 1.1em;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .metric-card h3 {
            margin: 0 0 10px 0;
            font-size: 1.2em;
        }
        .metric-card .value {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
        }
        .metric-card .unit {
            font-size: 0.9em;
            opacity: 0.8;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #007bff;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .chart-container {
            text-align: center;
            margin: 20px 0;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
        }
        .chart-container img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .table th {
            background-color: #007bff;
            color: white;
        }
        .table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .status-pass { color: #28a745; font-weight: bold; }
        .status-fail { color: #dc3545; font-weight: bold; }
        .status-warning { color: #ffc107; font-weight: bold; }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>QMS {{ report_type.title() }} Report</h1>
            <p>Generated on {{ generation_time }}</p>
            <p>Period: {{ metrics.period.start_date[:10] }} to {{ metrics.period.end_date[:10] }} ({{ metrics.period.days }} days)</p>
        </div>

        <!-- Key Metrics -->
        <div class="section">
            <h2>📊 Key Metrics</h2>
            <div class="metrics-grid">
                {% if metrics.quality_gates %}
                <div class="metric-card">
                    <h3>Quality Gate Pass Rate</h3>
                    <div class="value">{{ "%.1f"|format(metrics.quality_gates.pass_rate) }}</div>
                    <div class="unit">%</div>
                </div>
                <div class="metric-card">
                    <h3>Total QG Runs</h3>
                    <div class="value">{{ metrics.quality_gates.total_runs }}</div>
                    <div class="unit">runs</div>
                </div>
                {% endif %}
                
                {% if metrics.code_coverage %}
                <div class="metric-card">
                    <h3>Avg Line Coverage</h3>
                    <div class="value">{{ metrics.code_coverage.avg_line_coverage }}</div>
                    <div class="unit">%</div>
                </div>
                {% endif %}
                
                {% if metrics.security_issues %}
                <div class="metric-card">
                    <h3>Security Issues</h3>
                    <div class="value">{{ metrics.security_issues.total_issues }}</div>
                    <div class="unit">issues</div>
                </div>
                {% endif %}
            </div>
        </div>

        <!-- Charts Section -->
        {% if charts %}
        <div class="section">
            <h2>📈 Trends & Analysis</h2>
            
            {% if charts.quality_gates_trend %}
            <div class="chart-container">
                <h3>Quality Gates Trend</h3>
                <img src="data:image/png;base64,{{ charts.quality_gates_trend }}" alt="Quality Gates Trend">
            </div>
            {% endif %}
            
            {% if charts.coverage_trend %}
            <div class="chart-container">
                <h3>Code Coverage Trend</h3>
                <img src="data:image/png;base64,{{ charts.coverage_trend }}" alt="Coverage Trend">
            </div>
            {% endif %}
            
            {% if charts.quality_gates_distribution %}
            <div class="chart-container">
                <h3>Quality Gates Status Distribution</h3>
                <img src="data:image/png;base64,{{ charts.quality_gates_distribution }}" alt="QG Distribution">
            </div>
            {% endif %}
            
            {% if charts.security_issues_by_severity %}
            <div class="chart-container">
                <h3>Security Issues by Severity</h3>
                <img src="data:image/png;base64,{{ charts.security_issues_by_severity }}" alt="Security Issues">
            </div>
            {% endif %}
        </div>
        {% endif %}

        <!-- Detailed Metrics -->
        <div class="section">
            <h2>📋 Detailed Metrics</h2>
            
            {% if metrics.quality_gates and metrics.quality_gates.by_status %}
            <h3>Quality Gates by Status</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Percentage</th>
                        <th>Avg Score</th>
                    </tr>
                </thead>
                <tbody>
                    {% for item in metrics.quality_gates.by_status %}
                    <tr>
                        <td class="status-{{ item.status.lower() }}">{{ item.status }}</td>
                        <td>{{ item.count }}</td>
                        <td>{{ "%.1f"|format((item.count / metrics.quality_gates.total_runs) * 100) }}%</td>
                        <td>{{ "%.2f"|format(item.avg_score) }}</td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
            {% endif %}

            {% if metrics.security_issues and metrics.security_issues.by_severity %}
            <h3>Security Issues by Severity</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Severity</th>
                        <th>Count</th>
                        <th>Resolution Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {% for item in metrics.security_issues.by_severity %}
                    <tr>
                        <td>{{ item.severity }}</td>
                        <td>{{ item.count }}</td>
                        <td>{{ "%.1f"|format(item.resolution_rate * 100) }}%</td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
            {% endif %}
        </div>

        <div class="footer">
            <p>Generated by QMS Reporter v1.0</p>
        </div>
    </div>
</body>
</html>
        """
        
        # Render template
        template = jinja2.Template(html_template)
        html_content = template.render(
            metrics=metrics,
            charts=charts,
            report_type=report_type,
            generation_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        )
        
        return html_content
    
    def generate_json_report(self, metrics: Dict[str, Any]) -> str:
        """Generate JSON report"""
        report = {
            'report_metadata': {
                'generated_at': datetime.now().isoformat(),
                'generator': 'QMS Reporter v1.0',
                'report_type': 'json'
            },
            'metrics': metrics
        }
        
        return json.dumps(report, indent=2, default=str)
    
    def save_report(self, content: str, filename: str, report_format: str) -> str:
        """Save report to file"""
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = self.output_dir / filename
        
        if report_format in ['html', 'json', 'markdown']:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            with open(file_path, 'wb') as f:
                f.write(content)
        
        return str(file_path)
    
    def generate_report(self, report_type: str = 'comprehensive', 
                       output_format: str = 'html', 
                       days: int = 30,
                       output_file: Optional[str] = None) -> str:
        """Generate complete QMS report"""
        
        logger.info(f"Generating {report_type} report in {output_format} format...")
        
        # Collect metrics
        logger.info("Collecting quality metrics...")
        metrics = self.collect_quality_metrics(days)
        
        # Generate charts
        logger.info("Generating charts...")
        trend_charts = self.generate_trend_charts(metrics, days)
        summary_charts = self.generate_summary_charts(metrics)
        charts = {**trend_charts, **summary_charts}
        
        # Generate report content
        if output_format == 'html':
            content = self.generate_html_report(metrics, charts, report_type)
            if not output_file:
                output_file = f"qms_report_{report_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
        
        elif output_format == 'json':
            content = self.generate_json_report(metrics)
            if not output_file:
                output_file = f"qms_report_{report_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        else:
            raise ValueError(f"Unsupported output format: {output_format}")
        
        # Save report
        report_path = self.save_report(content, output_file, output_format)
        logger.info(f"Report saved to: {report_path}")
        
        return report_path

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description='QMS Report Generator')
    parser.add_argument('--config', '-c', help='Path to QMS configuration file')
    parser.add_argument('--type', choices=['comprehensive', 'summary', 'executive'], 
                       default='comprehensive', help='Report type')
    parser.add_argument('--format', choices=['html', 'json'], 
                       default='html', help='Output format')
    parser.add_argument('--days', type=int, default=30, 
                       help='Number of days to include in the report')
    parser.add_argument('--output', '-o', help='Output filename')
    parser.add_argument('--data-source', help='Path to QMS database file')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        reporter = QMSReporter(args.config, args.data_source)
        report_path = reporter.generate_report(
            report_type=args.type,
            output_format=args.format,
            days=args.days,
            output_file=args.output
        )
        
        print(f"{Colors.GREEN}✓ Report generated successfully!{Colors.ENDC}")
        print(f"Location: {report_path}")
        
        if args.format == 'html':
            print(f"{Colors.BLUE}💡 Open the HTML file in your browser to view the report{Colors.ENDC}")
        
    except Exception as e:
        logger.error(f"Report generation failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()