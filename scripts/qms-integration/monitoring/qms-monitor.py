#!/usr/bin/env python3
"""
QMS Monitor Script
This script provides real-time monitoring and alerting for QMS systems
"""

import os
import sys
import json
import yaml
import argparse
import logging
import sqlite3
import asyncio
import aiohttp
import time
from pathlib import Path
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
import requests
import psutil
import threading
from concurrent.futures import ThreadPoolExecutor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AlertLevel(Enum):
    """Alert severity levels"""
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

class MonitorStatus(Enum):
    """Monitor status states"""
    HEALTHY = "healthy"
    WARNING = "warning"
    UNHEALTHY = "unhealthy"
    UNKNOWN = "unknown"

@dataclass
class Alert:
    """Alert data structure"""
    timestamp: datetime
    level: AlertLevel
    source: str
    message: str
    details: Dict[str, Any]
    resolved: bool = False

@dataclass
class HealthCheck:
    """Health check result"""
    name: str
    status: MonitorStatus
    timestamp: datetime
    response_time_ms: float
    details: Dict[str, Any]
    error: Optional[str] = None

class QMSMonitor:
    """Main QMS monitoring class"""
    
    def __init__(self, config_path: Optional[str] = None):
        self.config_path = config_path or self._find_config()
        self.config = self._load_config()
        self.monitoring_config = self.config.get('monitoring', {})
        self.alerts = []
        self.health_checks = []
        self.running = False
        self.alert_handlers = []
        self._setup_alert_handlers()
        
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
    
    def _setup_alert_handlers(self):
        """Setup alert notification handlers"""
        integrations = self.config.get('integrations', {})
        
        # Email handler
        if integrations.get('email', {}).get('enabled'):
            self.alert_handlers.append(self._send_email_alert)
        
        # Slack handler  
        if integrations.get('slack', {}).get('enabled'):
            self.alert_handlers.append(self._send_slack_alert)
        
        # Console handler (always enabled)
        self.alert_handlers.append(self._log_alert)
    
    async def check_database_health(self) -> HealthCheck:
        """Check database connectivity and performance"""
        start_time = time.time()
        
        try:
            db_config = self.config.get('database', {})
            db_path = db_config.get('path', './qms.db')
            
            if not os.path.exists(db_path):
                return HealthCheck(
                    name="database",
                    status=MonitorStatus.UNHEALTHY,
                    timestamp=datetime.now(),
                    response_time_ms=0,
                    details={"error": "Database file not found"},
                    error=f"Database file not found: {db_path}"
                )
            
            # Test database connection
            with sqlite3.connect(db_path, timeout=5) as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table'")
                table_count = cursor.fetchone()[0]
                
                # Check recent activity
                cursor.execute("""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name LIKE '%_results'
                    LIMIT 1
                """)
                
                if cursor.fetchone():
                    cursor.execute("""
                        SELECT COUNT(*) FROM quality_gate_results 
                        WHERE created_at >= datetime('now', '-1 hour')
                    """)
                    recent_records = cursor.fetchone()[0]
                else:
                    recent_records = 0
            
            response_time = (time.time() - start_time) * 1000
            
            status = MonitorStatus.HEALTHY
            if response_time > 1000:  # > 1 second
                status = MonitorStatus.WARNING
            if table_count == 0:
                status = MonitorStatus.UNHEALTHY
            
            return HealthCheck(
                name="database",
                status=status,
                timestamp=datetime.now(),
                response_time_ms=response_time,
                details={
                    "table_count": table_count,
                    "recent_records": recent_records,
                    "db_size_mb": round(os.path.getsize(db_path) / (1024 * 1024), 2)
                }
            )
            
        except Exception as e:
            return HealthCheck(
                name="database",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=(time.time() - start_time) * 1000,
                details={"error": str(e)},
                error=str(e)
            )
    
    async def check_api_health(self) -> HealthCheck:
        """Check QMS API health"""
        start_time = time.time()
        
        try:
            api_config = self.config.get('api', {})
            if not api_config.get('enabled'):
                return HealthCheck(
                    name="api",
                    status=MonitorStatus.UNKNOWN,
                    timestamp=datetime.now(),
                    response_time_ms=0,
                    details={"message": "API not enabled"}
                )
            
            host = api_config.get('host', 'localhost')
            port = api_config.get('port', 3000)
            url = f"http://{host}:{port}/health"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    response_time = (time.time() - start_time) * 1000
                    
                    if response.status == 200:
                        data = await response.json()
                        return HealthCheck(
                            name="api",
                            status=MonitorStatus.HEALTHY,
                            timestamp=datetime.now(),
                            response_time_ms=response_time,
                            details=data
                        )
                    else:
                        return HealthCheck(
                            name="api",
                            status=MonitorStatus.UNHEALTHY,
                            timestamp=datetime.now(),
                            response_time_ms=response_time,
                            details={"status_code": response.status},
                            error=f"API returned status {response.status}"
                        )
                        
        except asyncio.TimeoutError:
            return HealthCheck(
                name="api",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=(time.time() - start_time) * 1000,
                details={},
                error="API request timed out"
            )
        except Exception as e:
            return HealthCheck(
                name="api",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=(time.time() - start_time) * 1000,
                details={"error": str(e)},
                error=str(e)
            )
    
    async def check_dashboard_health(self) -> HealthCheck:
        """Check QMS dashboard health"""
        start_time = time.time()
        
        try:
            dashboard_config = self.config.get('dashboard', {})
            if not dashboard_config.get('enabled'):
                return HealthCheck(
                    name="dashboard",
                    status=MonitorStatus.UNKNOWN,
                    timestamp=datetime.now(),
                    response_time_ms=0,
                    details={"message": "Dashboard not enabled"}
                )
            
            host = dashboard_config.get('host', 'localhost')
            port = dashboard_config.get('port', 8080)
            url = f"http://{host}:{port}/"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    response_time = (time.time() - start_time) * 1000
                    
                    if response.status == 200:
                        content = await response.text()
                        return HealthCheck(
                            name="dashboard",
                            status=MonitorStatus.HEALTHY,
                            timestamp=datetime.now(),
                            response_time_ms=response_time,
                            details={
                                "status_code": response.status,
                                "content_length": len(content)
                            }
                        )
                    else:
                        return HealthCheck(
                            name="dashboard",
                            status=MonitorStatus.UNHEALTHY,
                            timestamp=datetime.now(),
                            response_time_ms=response_time,
                            details={"status_code": response.status},
                            error=f"Dashboard returned status {response.status}"
                        )
                        
        except Exception as e:
            return HealthCheck(
                name="dashboard",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=(time.time() - start_time) * 1000,
                details={"error": str(e)},
                error=str(e)
            )
    
    def check_system_resources(self) -> HealthCheck:
        """Check system resource usage"""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            # Determine status based on thresholds
            status = MonitorStatus.HEALTHY
            issues = []
            
            if cpu_percent > 80:
                status = MonitorStatus.WARNING
                issues.append(f"High CPU usage: {cpu_percent}%")
            
            if memory.percent > 85:
                status = MonitorStatus.WARNING
                issues.append(f"High memory usage: {memory.percent}%")
            
            if disk.percent > 90:
                status = MonitorStatus.WARNING
                issues.append(f"High disk usage: {disk.percent}%")
            
            if cpu_percent > 95 or memory.percent > 95 or disk.percent > 95:
                status = MonitorStatus.UNHEALTHY
            
            return HealthCheck(
                name="system_resources",
                status=status,
                timestamp=datetime.now(),
                response_time_ms=0,
                details={
                    "cpu_percent": cpu_percent,
                    "memory_percent": memory.percent,
                    "memory_available_gb": round(memory.available / (1024**3), 2),
                    "disk_percent": disk.percent,
                    "disk_free_gb": round(disk.free / (1024**3), 2),
                    "issues": issues
                },
                error="; ".join(issues) if issues else None
            )
            
        except Exception as e:
            return HealthCheck(
                name="system_resources",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=0,
                details={"error": str(e)},
                error=str(e)
            )
    
    async def check_quality_gate_performance(self) -> HealthCheck:
        """Check recent quality gate performance"""
        try:
            db_config = self.config.get('database', {})
            db_path = db_config.get('path', './qms.db')
            
            if not os.path.exists(db_path):
                return HealthCheck(
                    name="quality_gates",
                    status=MonitorStatus.UNKNOWN,
                    timestamp=datetime.now(),
                    response_time_ms=0,
                    details={"message": "Database not available"}
                )
            
            with sqlite3.connect(db_path) as conn:
                cursor = conn.cursor()
                
                # Check quality gates in last hour
                cursor.execute("""
                    SELECT 
                        status,
                        COUNT(*) as count,
                        AVG(score) as avg_score
                    FROM quality_gate_results 
                    WHERE created_at >= datetime('now', '-1 hour')
                    GROUP BY status
                """)
                
                results = cursor.fetchall()
                
                if not results:
                    return HealthCheck(
                        name="quality_gates",
                        status=MonitorStatus.WARNING,
                        timestamp=datetime.now(),
                        response_time_ms=0,
                        details={"message": "No quality gate runs in the last hour"}
                    )
                
                total_runs = sum(row[1] for row in results)
                pass_count = next((row[1] for row in results if row[0] == 'PASS'), 0)
                fail_count = next((row[1] for row in results if row[0] == 'FAIL'), 0)
                
                pass_rate = (pass_count / total_runs) * 100 if total_runs > 0 else 0
                
                # Determine status based on pass rate
                status = MonitorStatus.HEALTHY
                if pass_rate < 90:
                    status = MonitorStatus.WARNING
                if pass_rate < 70:
                    status = MonitorStatus.UNHEALTHY
                
                return HealthCheck(
                    name="quality_gates",
                    status=status,
                    timestamp=datetime.now(),
                    response_time_ms=0,
                    details={
                        "total_runs": total_runs,
                        "pass_count": pass_count,
                        "fail_count": fail_count,
                        "pass_rate": round(pass_rate, 2),
                        "by_status": [{"status": row[0], "count": row[1], "avg_score": row[2]} for row in results]
                    }
                )
                
        except Exception as e:
            return HealthCheck(
                name="quality_gates",
                status=MonitorStatus.UNHEALTHY,
                timestamp=datetime.now(),
                response_time_ms=0,
                details={"error": str(e)},
                error=str(e)
            )
    
    async def run_health_checks(self) -> List[HealthCheck]:
        """Run all health checks concurrently"""
        checks = await asyncio.gather(
            self.check_database_health(),
            self.check_api_health(),
            self.check_dashboard_health(),
            asyncio.to_thread(self.check_system_resources),
            self.check_quality_gate_performance(),
            return_exceptions=True
        )
        
        # Filter out exceptions and return valid health checks
        valid_checks = []
        for check in checks:
            if isinstance(check, HealthCheck):
                valid_checks.append(check)
            else:
                logger.error(f"Health check failed with exception: {check}")
        
        return valid_checks
    
    def create_alert(self, level: AlertLevel, source: str, message: str, 
                    details: Optional[Dict[str, Any]] = None) -> Alert:
        """Create and process a new alert"""
        alert = Alert(
            timestamp=datetime.now(),
            level=level,
            source=source,
            message=message,
            details=details or {}
        )
        
        self.alerts.append(alert)
        
        # Process alert through handlers
        for handler in self.alert_handlers:
            try:
                handler(alert)
            except Exception as e:
                logger.error(f"Alert handler failed: {e}")
        
        return alert
    
    def _log_alert(self, alert: Alert):
        """Log alert to console"""
        level_colors = {
            AlertLevel.INFO: '\033[94m',
            AlertLevel.WARNING: '\033[93m', 
            AlertLevel.ERROR: '\033[91m',
            AlertLevel.CRITICAL: '\033[95m'
        }
        
        color = level_colors.get(alert.level, '')
        reset = '\033[0m'
        
        print(f"{color}[{alert.level.value.upper()}] {alert.timestamp.strftime('%Y-%m-%d %H:%M:%S')}{reset}")
        print(f"Source: {alert.source}")
        print(f"Message: {alert.message}")
        if alert.details:
            print(f"Details: {json.dumps(alert.details, indent=2)}")
        print()
    
    def _send_email_alert(self, alert: Alert):
        """Send alert via email"""
        try:
            email_config = self.config.get('integrations', {}).get('email', {})
            
            smtp_server = email_config.get('smtp_server')
            smtp_port = email_config.get('smtp_port', 587)
            username = email_config.get('username')
            password = os.environ.get('QMS_EMAIL_PASSWORD')
            
            if not all([smtp_server, username, password]):
                logger.warning("Email configuration incomplete, skipping email alert")
                return
            
            msg = MimeMultipart()
            msg['From'] = username
            msg['To'] = email_config.get('alerts_to', username)
            msg['Subject'] = f"QMS Alert: {alert.level.value.upper()} - {alert.source}"
            
            body = f"""
QMS Alert Notification

Level: {alert.level.value.upper()}
Source: {alert.source}
Timestamp: {alert.timestamp}
Message: {alert.message}

Details:
{json.dumps(alert.details, indent=2)}
"""
            
            msg.attach(MimeText(body, 'plain'))
            
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(username, password)
            text = msg.as_string()
            server.sendmail(username, msg['To'], text)
            server.quit()
            
        except Exception as e:
            logger.error(f"Failed to send email alert: {e}")
    
    def _send_slack_alert(self, alert: Alert):
        """Send alert via Slack"""
        try:
            slack_config = self.config.get('integrations', {}).get('slack', {})
            webhook_url = os.environ.get('QMS_SLACK_WEBHOOK') or slack_config.get('webhook_url')
            
            if not webhook_url:
                logger.warning("Slack webhook not configured, skipping Slack alert")
                return
            
            color_map = {
                AlertLevel.INFO: '#36a64f',
                AlertLevel.WARNING: '#ff9500',
                AlertLevel.ERROR: '#ff0000',
                AlertLevel.CRITICAL: '#8b0000'
            }
            
            payload = {
                "attachments": [
                    {
                        "color": color_map.get(alert.level, '#cccccc'),
                        "title": f"QMS Alert: {alert.level.value.upper()}",
                        "fields": [
                            {"title": "Source", "value": alert.source, "short": True},
                            {"title": "Time", "value": alert.timestamp.strftime('%Y-%m-%d %H:%M:%S'), "short": True},
                            {"title": "Message", "value": alert.message, "short": False}
                        ]
                    }
                ]
            }
            
            if alert.details:
                payload["attachments"][0]["fields"].append({
                    "title": "Details",
                    "value": f"```{json.dumps(alert.details, indent=2)}```",
                    "short": False
                })
            
            response = requests.post(webhook_url, json=payload, timeout=10)
            response.raise_for_status()
            
        except Exception as e:
            logger.error(f"Failed to send Slack alert: {e}")
    
    def analyze_health_checks(self, health_checks: List[HealthCheck]):
        """Analyze health check results and generate alerts"""
        for check in health_checks:
            if check.status == MonitorStatus.UNHEALTHY:
                self.create_alert(
                    AlertLevel.ERROR,
                    check.name,
                    f"Health check failed: {check.error or 'Unknown error'}",
                    check.details
                )
            elif check.status == MonitorStatus.WARNING:
                self.create_alert(
                    AlertLevel.WARNING,
                    check.name,
                    f"Health check warning: {check.error or 'Performance degraded'}",
                    check.details
                )
    
    async def monitor_cycle(self):
        """Single monitoring cycle"""
        try:
            logger.info("Running health checks...")
            health_checks = await self.run_health_checks()
            self.health_checks = health_checks
            
            # Analyze results and generate alerts
            self.analyze_health_checks(health_checks)
            
            # Print status summary
            self.print_status_summary(health_checks)
            
        except Exception as e:
            logger.error(f"Monitor cycle failed: {e}")
            self.create_alert(
                AlertLevel.CRITICAL,
                "monitor",
                f"Monitor cycle failed: {e}",
                {"error": str(e)}
            )
    
    def print_status_summary(self, health_checks: List[HealthCheck]):
        """Print current status summary"""
        print(f"\n{'='*50}")
        print(f"QMS Status Summary - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*50}")
        
        for check in health_checks:
            status_symbols = {
                MonitorStatus.HEALTHY: '✅',
                MonitorStatus.WARNING: '⚠️',
                MonitorStatus.UNHEALTHY: '❌',
                MonitorStatus.UNKNOWN: '❓'
            }
            
            symbol = status_symbols.get(check.status, '?')
            print(f"{symbol} {check.name.ljust(20)} {check.status.value.ljust(10)} "
                  f"({check.response_time_ms:.1f}ms)")
            
            if check.error:
                print(f"   Error: {check.error}")
        
        # Overall system status
        unhealthy_count = sum(1 for c in health_checks if c.status == MonitorStatus.UNHEALTHY)
        warning_count = sum(1 for c in health_checks if c.status == MonitorStatus.WARNING)
        
        if unhealthy_count > 0:
            overall = "❌ UNHEALTHY"
        elif warning_count > 0:
            overall = "⚠️  WARNING"
        else:
            overall = "✅ HEALTHY"
        
        print(f"\nOverall Status: {overall}")
        print(f"Recent Alerts: {len([a for a in self.alerts if a.timestamp > datetime.now() - timedelta(hours=1)])}")
    
    async def run_continuous_monitoring(self, interval: int = 60):
        """Run continuous monitoring"""
        logger.info(f"Starting continuous monitoring (interval: {interval}s)...")
        self.running = True
        
        try:
            while self.running:
                await self.monitor_cycle()
                await asyncio.sleep(interval)
        except KeyboardInterrupt:
            logger.info("Monitoring stopped by user")
        except Exception as e:
            logger.error(f"Continuous monitoring failed: {e}")
        finally:
            self.running = False
    
    def stop_monitoring(self):
        """Stop continuous monitoring"""
        self.running = False
    
    async def run_single_check(self) -> Dict[str, Any]:
        """Run a single monitoring cycle and return results"""
        health_checks = await self.run_health_checks()
        self.health_checks = health_checks
        
        return {
            "timestamp": datetime.now().isoformat(),
            "overall_status": self._calculate_overall_status(health_checks),
            "health_checks": [
                {
                    "name": check.name,
                    "status": check.status.value,
                    "response_time_ms": check.response_time_ms,
                    "details": check.details,
                    "error": check.error
                }
                for check in health_checks
            ],
            "recent_alerts": len([a for a in self.alerts if a.timestamp > datetime.now() - timedelta(hours=1)])
        }
    
    def _calculate_overall_status(self, health_checks: List[HealthCheck]) -> str:
        """Calculate overall system status"""
        if any(c.status == MonitorStatus.UNHEALTHY for c in health_checks):
            return "unhealthy"
        elif any(c.status == MonitorStatus.WARNING for c in health_checks):
            return "warning"
        else:
            return "healthy"

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description='QMS System Monitor')
    parser.add_argument('--config', '-c', help='Path to QMS configuration file')
    parser.add_argument('--mode', choices=['once', 'continuous'], default='once',
                       help='Monitoring mode')
    parser.add_argument('--interval', type=int, default=60,
                       help='Monitoring interval in seconds (continuous mode)')
    parser.add_argument('--json', action='store_true',
                       help='Output results in JSON format')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        monitor = QMSMonitor(args.config)
        
        if args.mode == 'once':
            # Run single check
            result = asyncio.run(monitor.run_single_check())
            
            if args.json:
                print(json.dumps(result, indent=2))
            else:
                monitor.print_status_summary(monitor.health_checks)
        
        else:
            # Run continuous monitoring
            asyncio.run(monitor.run_continuous_monitoring(args.interval))
        
    except Exception as e:
        logger.error(f"Monitoring failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()