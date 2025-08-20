#!/usr/bin/env python3
"""
QMS Validator Script
This script validates QMS configurations, integrations, and quality gate definitions
"""

import os
import sys
import json
import yaml
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime
import requests
from urllib.parse import urlparse
import subprocess
import tempfile

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('/tmp/qms-validator.log')
    ]
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

class QMSValidator:
    """Main QMS validation class"""
    
    def __init__(self, config_path: Optional[str] = None):
        self.config_path = config_path or self._find_config()
        self.config = self._load_config()
        self.validation_results = []
        self.warnings = []
        self.errors = []
        
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
                logger.info(f"Found QMS config at: {path}")
                return path
                
        raise FileNotFoundError("QMS configuration file not found. Please set QMS_CONFIG_FILE or place config in a standard location.")
    
    def _load_config(self) -> Dict[str, Any]:
        """Load QMS configuration"""
        try:
            with open(self.config_path, 'r') as f:
                config = yaml.safe_load(f)
            logger.info("QMS configuration loaded successfully")
            return config
        except Exception as e:
            logger.error(f"Failed to load QMS config: {e}")
            sys.exit(1)
    
    def _add_result(self, category: str, check: str, status: str, message: str, details: Optional[str] = None):
        """Add validation result"""
        result = {
            'timestamp': datetime.now().isoformat(),
            'category': category,
            'check': check,
            'status': status,
            'message': message,
            'details': details
        }
        self.validation_results.append(result)
        
        if status == 'ERROR':
            self.errors.append(result)
        elif status == 'WARNING':
            self.warnings.append(result)
    
    def validate_config_structure(self) -> None:
        """Validate QMS configuration structure"""
        logger.info("Validating configuration structure...")
        
        required_sections = [
            'qms',
            'dashboard',
            'api', 
            'database',
            'logging',
            'quality_gates',
            'integrations',
            'notifications',
            'reporting'
        ]
        
        for section in required_sections:
            if section not in self.config:
                self._add_result(
                    'Config Structure',
                    f'Required Section: {section}',
                    'ERROR',
                    f"Missing required configuration section: {section}"
                )
            else:
                self._add_result(
                    'Config Structure',
                    f'Required Section: {section}',
                    'PASS',
                    f"Section '{section}' present"
                )
        
        # Validate QMS core settings
        qms_config = self.config.get('qms', {})
        required_qms_fields = ['version', 'environment']
        
        for field in required_qms_fields:
            if field not in qms_config:
                self._add_result(
                    'Config Structure',
                    f'QMS Core Field: {field}',
                    'ERROR',
                    f"Missing required QMS field: {field}"
                )
    
    def validate_quality_gates(self) -> None:
        """Validate quality gate definitions"""
        logger.info("Validating quality gates...")
        
        quality_gates = self.config.get('quality_gates', {})
        default_thresholds = quality_gates.get('default_thresholds', {})
        
        expected_thresholds = {
            'code_coverage': (int, float),
            'security_issues': int,
            'code_quality': (int, float),
            'performance_score': (int, float)
        }
        
        for threshold, expected_type in expected_thresholds.items():
            if threshold not in default_thresholds:
                self._add_result(
                    'Quality Gates',
                    f'Threshold: {threshold}',
                    'WARNING',
                    f"Missing default threshold for: {threshold}"
                )
            else:
                value = default_thresholds[threshold]
                if not isinstance(value, expected_type):
                    self._add_result(
                        'Quality Gates',
                        f'Threshold: {threshold}',
                        'ERROR',
                        f"Invalid type for {threshold}: expected {expected_type}, got {type(value)}"
                    )
                else:
                    # Validate threshold ranges
                    if threshold == 'code_coverage' and not (0 <= value <= 100):
                        self._add_result(
                            'Quality Gates',
                            f'Threshold: {threshold}',
                            'ERROR',
                            f"Code coverage must be between 0 and 100, got: {value}"
                        )
                    elif threshold == 'security_issues' and value < 0:
                        self._add_result(
                            'Quality Gates',
                            f'Threshold: {threshold}',
                            'ERROR',
                            f"Security issues threshold must be >= 0, got: {value}"
                        )
                    elif threshold in ['code_quality', 'performance_score'] and not (0 <= value <= 100):
                        self._add_result(
                            'Quality Gates',
                            f'Threshold: {threshold}',
                            'WARNING',
                            f"{threshold} typically ranges 0-100, got: {value}"
                        )
                    else:
                        self._add_result(
                            'Quality Gates',
                            f'Threshold: {threshold}',
                            'PASS',
                            f"Valid threshold: {threshold} = {value}"
                        )
    
    def validate_database_config(self) -> None:
        """Validate database configuration"""
        logger.info("Validating database configuration...")
        
        db_config = self.config.get('database', {})
        db_type = db_config.get('type')
        
        if not db_type:
            self._add_result(
                'Database',
                'Database Type',
                'ERROR',
                "Database type not specified"
            )
            return
        
        if db_type == 'sqlite':
            db_path = db_config.get('path')
            if not db_path:
                self._add_result(
                    'Database',
                    'SQLite Path',
                    'ERROR',
                    "SQLite database path not specified"
                )
            else:
                # Check if directory exists and is writable
                db_dir = os.path.dirname(db_path)
                if not os.path.exists(db_dir):
                    self._add_result(
                        'Database',
                        'SQLite Directory',
                        'WARNING',
                        f"Database directory does not exist: {db_dir}"
                    )
                elif not os.access(db_dir, os.W_OK):
                    self._add_result(
                        'Database',
                        'SQLite Directory',
                        'ERROR',
                        f"Database directory not writable: {db_dir}"
                    )
                else:
                    self._add_result(
                        'Database',
                        'SQLite Configuration',
                        'PASS',
                        f"SQLite database configured: {db_path}"
                    )
        
        elif db_type in ['postgresql', 'mysql']:
            required_fields = ['host', 'port', 'database', 'username']
            for field in required_fields:
                if field not in db_config:
                    self._add_result(
                        'Database',
                        f'{db_type.title()} Field: {field}',
                        'ERROR',
                        f"Missing {db_type} field: {field}"
                    )
        else:
            self._add_result(
                'Database',
                'Database Type',
                'ERROR',
                f"Unsupported database type: {db_type}"
            )
    
    def validate_integrations(self) -> None:
        """Validate external integrations"""
        logger.info("Validating integrations...")
        
        integrations = self.config.get('integrations', {})
        
        # GitHub integration
        github_config = integrations.get('github', {})
        if github_config.get('enabled'):
            token = os.environ.get('QMS_GITHUB_TOKEN') or github_config.get('token')
            if not token:
                self._add_result(
                    'Integrations',
                    'GitHub Token',
                    'ERROR',
                    "GitHub integration enabled but no token provided"
                )
            else:
                # Test GitHub API connection
                try:
                    headers = {'Authorization': f'token {token}'}
                    response = requests.get('https://api.github.com/user', headers=headers, timeout=10)
                    if response.status_code == 200:
                        self._add_result(
                            'Integrations',
                            'GitHub API',
                            'PASS',
                            "GitHub API connection successful"
                        )
                    else:
                        self._add_result(
                            'Integrations',
                            'GitHub API',
                            'ERROR',
                            f"GitHub API error: {response.status_code}"
                        )
                except requests.RequestException as e:
                    self._add_result(
                        'Integrations',
                        'GitHub API',
                        'ERROR',
                        f"GitHub API connection failed: {e}"
                    )
        
        # Slack integration
        slack_config = integrations.get('slack', {})
        if slack_config.get('enabled'):
            webhook_url = os.environ.get('QMS_SLACK_WEBHOOK') or slack_config.get('webhook_url')
            if not webhook_url:
                self._add_result(
                    'Integrations',
                    'Slack Webhook',
                    'ERROR',
                    "Slack integration enabled but no webhook URL provided"
                )
            else:
                # Validate webhook URL format
                parsed_url = urlparse(webhook_url)
                if not (parsed_url.scheme in ['https'] and 'slack.com' in parsed_url.netloc):
                    self._add_result(
                        'Integrations',
                        'Slack Webhook',
                        'ERROR',
                        "Invalid Slack webhook URL format"
                    )
                else:
                    self._add_result(
                        'Integrations',
                        'Slack Webhook',
                        'PASS',
                        "Slack webhook URL format valid"
                    )
    
    def validate_logging_config(self) -> None:
        """Validate logging configuration"""
        logger.info("Validating logging configuration...")
        
        logging_config = self.config.get('logging', {})
        log_level = logging_config.get('level', 'info').lower()
        
        valid_levels = ['debug', 'info', 'warning', 'error', 'critical']
        if log_level not in valid_levels:
            self._add_result(
                'Logging',
                'Log Level',
                'ERROR',
                f"Invalid log level: {log_level}. Must be one of: {valid_levels}"
            )
        else:
            self._add_result(
                'Logging',
                'Log Level',
                'PASS',
                f"Valid log level: {log_level}"
            )
        
        # Check log file path
        log_file = logging_config.get('file')
        if log_file:
            log_dir = os.path.dirname(log_file)
            if not os.path.exists(log_dir):
                self._add_result(
                    'Logging',
                    'Log Directory',
                    'WARNING',
                    f"Log directory does not exist: {log_dir}"
                )
            elif not os.access(log_dir, os.W_OK):
                self._add_result(
                    'Logging',
                    'Log Directory',
                    'ERROR',
                    f"Log directory not writable: {log_dir}"
                )
            else:
                self._add_result(
                    'Logging',
                    'Log File',
                    'PASS',
                    f"Log file path valid: {log_file}"
                )
    
    def validate_dependencies(self) -> None:
        """Validate system dependencies"""
        logger.info("Validating dependencies...")
        
        # Check Python packages
        required_packages = [
            'requests', 'pyyaml', 'jinja2', 'matplotlib', 
            'pandas', 'numpy', 'plotly'
        ]
        
        for package in required_packages:
            try:
                __import__(package)
                self._add_result(
                    'Dependencies',
                    f'Python Package: {package}',
                    'PASS',
                    f"Package {package} available"
                )
            except ImportError:
                self._add_result(
                    'Dependencies',
                    f'Python Package: {package}',
                    'ERROR',
                    f"Required package {package} not installed"
                )
        
        # Check system commands
        required_commands = ['git', 'node', 'npm']
        
        for cmd in required_commands:
            try:
                result = subprocess.run(['which', cmd], capture_output=True, text=True)
                if result.returncode == 0:
                    version_result = subprocess.run([cmd, '--version'], capture_output=True, text=True)
                    version = version_result.stdout.strip().split('\n')[0]
                    self._add_result(
                        'Dependencies',
                        f'Command: {cmd}',
                        'PASS',
                        f"Command {cmd} available: {version}"
                    )
                else:
                    self._add_result(
                        'Dependencies',
                        f'Command: {cmd}',
                        'WARNING',
                        f"Command {cmd} not found in PATH"
                    )
            except Exception as e:
                self._add_result(
                    'Dependencies',
                    f'Command: {cmd}',
                    'ERROR',
                    f"Error checking command {cmd}: {e}"
                )
    
    def validate_github_actions(self) -> None:
        """Validate GitHub Actions workflow files"""
        logger.info("Validating GitHub Actions workflows...")
        
        workflows_dir = Path('.github/workflows')
        if not workflows_dir.exists():
            self._add_result(
                'GitHub Actions',
                'Workflows Directory',
                'WARNING',
                "No .github/workflows directory found"
            )
            return
        
        qms_workflows = [
            'qms-quality-gates.yml',
            'qms-code-review.yml',
            'qms-security-scan.yml',
            'qms-test-coverage.yml',
            'qms-compliance-audit.yml'
        ]
        
        for workflow in qms_workflows:
            workflow_path = workflows_dir / workflow
            if workflow_path.exists():
                try:
                    with open(workflow_path, 'r') as f:
                        workflow_content = yaml.safe_load(f)
                    
                    # Basic workflow validation
                    required_keys = ['name', 'on', 'jobs']
                    for key in required_keys:
                        if key not in workflow_content:
                            self._add_result(
                                'GitHub Actions',
                                f'{workflow}: {key}',
                                'ERROR',
                                f"Missing required key '{key}' in {workflow}"
                            )
                    
                    self._add_result(
                        'GitHub Actions',
                        f'Workflow: {workflow}',
                        'PASS',
                        f"Workflow {workflow} structure valid"
                    )
                    
                except yaml.YAMLError as e:
                    self._add_result(
                        'GitHub Actions',
                        f'Workflow: {workflow}',
                        'ERROR',
                        f"YAML syntax error in {workflow}: {e}"
                    )
            else:
                self._add_result(
                    'GitHub Actions',
                    f'Workflow: {workflow}',
                    'WARNING',
                    f"QMS workflow not found: {workflow}"
                )
    
    def generate_report(self, output_format: str = 'console') -> str:
        """Generate validation report"""
        total_checks = len(self.validation_results)
        passed_checks = len([r for r in self.validation_results if r['status'] == 'PASS'])
        warning_count = len(self.warnings)
        error_count = len(self.errors)
        
        if output_format == 'console':
            return self._generate_console_report(total_checks, passed_checks, warning_count, error_count)
        elif output_format == 'json':
            return json.dumps({
                'summary': {
                    'total_checks': total_checks,
                    'passed_checks': passed_checks,
                    'warnings': warning_count,
                    'errors': error_count,
                    'validation_date': datetime.now().isoformat()
                },
                'results': self.validation_results
            }, indent=2)
        else:
            raise ValueError(f"Unsupported output format: {output_format}")
    
    def _generate_console_report(self, total_checks: int, passed_checks: int, warning_count: int, error_count: int) -> str:
        """Generate console-formatted report"""
        report = []
        
        # Header
        report.append(f"\n{Colors.BOLD}{Colors.BLUE}QMS Validation Report{Colors.ENDC}")
        report.append("=" * 50)
        
        # Summary
        report.append(f"\n{Colors.BOLD}Summary:{Colors.ENDC}")
        report.append(f"Total Checks: {total_checks}")
        report.append(f"Passed: {Colors.GREEN}{passed_checks}{Colors.ENDC}")
        report.append(f"Warnings: {Colors.YELLOW}{warning_count}{Colors.ENDC}")
        report.append(f"Errors: {Colors.RED}{error_count}{Colors.ENDC}")
        
        # Overall status
        if error_count == 0 and warning_count == 0:
            status = f"{Colors.GREEN}✓ All validations passed{Colors.ENDC}"
        elif error_count == 0:
            status = f"{Colors.YELLOW}⚠ Validations passed with warnings{Colors.ENDC}"
        else:
            status = f"{Colors.RED}✗ Validations failed with errors{Colors.ENDC}"
        
        report.append(f"\nOverall Status: {status}")
        
        # Detailed results by category
        categories = {}
        for result in self.validation_results:
            category = result['category']
            if category not in categories:
                categories[category] = []
            categories[category].append(result)
        
        for category, results in categories.items():
            report.append(f"\n{Colors.BOLD}{category}:{Colors.ENDC}")
            for result in results:
                status_color = {
                    'PASS': Colors.GREEN,
                    'WARNING': Colors.YELLOW,
                    'ERROR': Colors.RED
                }.get(result['status'], '')
                
                status_symbol = {
                    'PASS': '✓',
                    'WARNING': '⚠',
                    'ERROR': '✗'
                }.get(result['status'], '')
                
                report.append(f"  {status_color}{status_symbol} {result['check']}: {result['message']}{Colors.ENDC}")
                
                if result['details']:
                    report.append(f"    Details: {result['details']}")
        
        return '\n'.join(report)
    
    def run_validation(self, checks: Optional[List[str]] = None) -> None:
        """Run QMS validation"""
        available_checks = {
            'config': self.validate_config_structure,
            'quality_gates': self.validate_quality_gates,
            'database': self.validate_database_config,
            'integrations': self.validate_integrations,
            'logging': self.validate_logging_config,
            'dependencies': self.validate_dependencies,
            'github_actions': self.validate_github_actions
        }
        
        if checks:
            # Run specific checks
            for check in checks:
                if check in available_checks:
                    available_checks[check]()
                else:
                    logger.warning(f"Unknown validation check: {check}")
        else:
            # Run all checks
            for check_func in available_checks.values():
                check_func()

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description='QMS Configuration and Integration Validator')
    parser.add_argument('--config', '-c', help='Path to QMS configuration file')
    parser.add_argument('--output', '-o', choices=['console', 'json'], default='console', help='Output format')
    parser.add_argument('--checks', nargs='+', help='Specific checks to run', 
                       choices=['config', 'quality_gates', 'database', 'integrations', 'logging', 'dependencies', 'github_actions'])
    parser.add_argument('--save-report', help='Save report to file')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        validator = QMSValidator(args.config)
        validator.run_validation(args.checks)
        
        report = validator.generate_report(args.output)
        
        if args.save_report:
            with open(args.save_report, 'w') as f:
                f.write(report)
            print(f"Report saved to: {args.save_report}")
        else:
            print(report)
        
        # Exit with appropriate code
        if validator.errors:
            sys.exit(1)
        elif validator.warnings:
            sys.exit(2)
        else:
            sys.exit(0)
            
    except Exception as e:
        logger.error(f"Validation failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()