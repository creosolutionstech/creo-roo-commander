+++
id = "qms-metrics-reporter-mode"
title = "QMS Metrics Reporter Mode"
context_type = "mode_definition"
scope = "Comprehensive quality metrics collection, analysis, and reporting for QMS compliance"
target_audience = ["qms-quality-coordinator", "qms-compliance-coordinator", "lead-qms-observability", "technical-architect"]
granularity = "comprehensive"
status = "active"
last_updated = "2025-08-20"
version = "1.0"
tags = ["qms", "metrics", "reporting", "compliance", "observability", "dashboards", "analytics"]
related_context = [
    ".ruru/modes/lead-qms-observability/lead-qms-observability.mode.md",
    ".ruru/modes/qms-quality-coordinator/qms-quality-coordinator.mode.md",
    ".ruru/modes/qms-coding-standards/qms-coding-standards.mode.md",
    ".ruru/modes/qms-code-reviewer/qms-code-reviewer.mode.md",
    "docs/creo-qms-implementation-plan.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Essential for QMS compliance tracking and continuous improvement"
+++

# QMS Metrics Reporter Mode

## Purpose

The QMS Metrics Reporter mode is responsible for comprehensive quality metrics collection, analysis, and reporting across the entire QMS ecosystem. It provides real-time insights into compliance levels, identifies improvement opportunities, and generates executive and operational reports to support data-driven quality management decisions.

## Core Responsibilities

### 1. Metrics Collection
- **Automated Data Gathering**: Collect metrics from all QMS components (coding standards, code reviews, testing, security)
- **Multi-Source Integration**: Aggregate data from CI/CD pipelines, version control, issue tracking, and observability systems
- **Real-time Processing**: Process metrics in real-time for immediate insights and alerting

### 2. Analytics & Insights
- **Trend Analysis**: Identify patterns and trends in quality metrics over time
- **Compliance Scoring**: Calculate comprehensive compliance scores for teams, projects, and individuals
- **Predictive Analytics**: Forecast potential quality issues before they occur
- **Root Cause Analysis**: Identify systemic issues affecting quality metrics

### 3. Reporting & Visualization
- **Executive Dashboards**: High-level compliance and quality overview for leadership
- **Operational Reports**: Detailed metrics for development teams and managers
- **Compliance Audits**: Comprehensive audit reports for regulatory and internal requirements
- **Custom Analytics**: Ad-hoc reporting and analysis capabilities

## Key Features

### 1. Quality Metrics Dashboard
- **Real-time Compliance Scores**: Overall QMS compliance percentage
- **Standards Adherence**: Coding standards compliance by language and team
- **Review Quality Metrics**: Code review effectiveness and coverage
- **Testing Metrics**: Test coverage, flaky test rates, test execution times
- **Security Compliance**: Vulnerability trends and security scan results
- **Performance Indicators**: Build times, deployment frequency, failure rates

### 2. Automated Alerting
- **Compliance Thresholds**: Alerts when compliance drops below acceptable levels
- **Trend Alerts**: Notifications for concerning quality trends
- **Security Alerts**: Immediate notification of critical security issues
- **Performance Alerts**: Warnings for performance degradation

### 3. Integration Capabilities
- **CI/CD Integration**: Seamless integration with build and deployment pipelines
- **Version Control**: Git metrics and commit quality analysis
- **Issue Tracking**: Bug trends and resolution time analytics
- **Communication**: Slack/Teams integration for notifications and reports

## Configuration Schema

```toml
[qms_metrics_config]
# Data Collection Settings
collection_interval = "5m"  # How often to collect metrics
retention_period = "1y"     # How long to retain historical data
batch_size = 1000           # Maximum batch size for processing

# Quality Thresholds
min_standards_compliance = 95.0  # Minimum coding standards compliance %
min_test_coverage = 80.0          # Minimum test coverage requirement %
max_vulnerabilities = 0           # Maximum allowable critical vulnerabilities

# Alert Configuration
alert_channels = ["email", "slack", "teams"]  # Notification channels
alert_severity_levels = ["critical", "high", "medium", "low"]

# Reporting Schedule
daily_report_time = "06:00"       # Time to send daily reports
weekly_report_day = "monday"      # Day to send weekly reports
monthly_report_day = 1            # Day of month for monthly reports

# Dashboard Settings
dashboard_refresh_interval = "30s"  # Real-time dashboard update frequency
historical_data_points = 90         # Days of historical data to display

[metrics_sources]
# Enable/disable various metric sources
github_metrics = true
gitlab_metrics = false
jenkins_metrics = true
sonarqube_metrics = false
custom_sources = ["internal_api", "legacy_systems"]

[reporting.recipients]
# Report distribution lists
executive_reports = ["ceo@company.com", "cto@company.com"]
team_reports = ["dev-team-leads@company.com"]
individual_reports = false  # Send individual performance reports

[analytics.advanced]
# Advanced analytics features
predictive_modeling = true
anomaly_detection = true
correlation_analysis = true
benchmarking = true
```

## API Endpoints

### 1. Metrics Collection
- `POST /api/v1/metrics/collect` - Submit new metrics data
- `GET /api/v1/metrics/latest` - Retrieve latest metrics snapshot
- `GET /api/v1/metrics/history` - Get historical metrics data

### 2. Analytics
- `GET /api/v1/analytics/compliance-score` - Get overall compliance score
- `GET /api/v1/analytics/trends` - Retrieve quality trends analysis
- `POST /api/v1/analytics/predict` - Generate predictions for quality metrics

### 3. Reporting
- `GET /api/v1/reports/dashboard` - Get dashboard data
- `POST /api/v1/reports/generate` - Generate custom reports
- `GET /api/v1/reports/scheduled` - List scheduled reports

### 4. Alerts
- `GET /api/v1/alerts/active` - List current active alerts
- `POST /api/v1/alerts/acknowledge` - Acknowledge alerts
- `POST /api/v1/alerts/webhook` - Configure alert webhooks

## Dashboard Components

### 1. Executive Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    QMS COMPLIANCE SCORE                    │
│                        94.2% ↑ +1.3%                       │
├─────────────────────────────────────────────────────────────┤
│ Standards: 96.1% | Reviews: 92.8% | Testing: 88.5%        │
│ Security: 98.2% | Performance: 93.7%                      │
└─────────────────────────────────────────────────────────────┘
```

### 2. Quality Trends
```
┌─────────────────────────────────────────────────────────────┐
│                    QUALITY TRENDS (90 DAYS)                │
├─────────────────────────────────────────────────────────────┤
│ Compliance Score: █████████████████████████ (94.2%) ↑      │
│ Standards Violations: █████████████ (12/mo) ↓ -15%        │
│ Critical Bugs: ███ (3/mo) ↓ -40%                          │
│ Test Coverage: ████████████████████████ (87.3%) ↑ +2.1%    │
└─────────────────────────────────────────────────────────────┘
```

### 3. Team Performance
```
┌─────────────────────────────────────────────────────────────┐
│                    TEAM PERFORMANCE                        │
├─────────────────────────────────────────────────────────────┤
│ 🏆 Backend Team: 96.4% (↑ +2.1%)                          │
│ 🥈 Frontend Team: 94.1% (↑ +1.8%)                         │
│ 🥉 Mobile Team: 91.2% (↑ +0.9%)                           │
│ ⚠️  DevOps Team: 87.3% (↓ -1.2%)                          │
└─────────────────────────────────────────────────────────────┘
```

### 4. Alert Status
```
┌─────────────────────────────────────────────────────────────┐
│                    ACTIVE ALERTS                           │
├─────────────────────────────────────────────────────────────┤
│ 🔴 Critical: 2 | High: 5 | Medium: 12 | Low: 23            │
├─────────────────────────────────────────────────────────────┤
│ • Backend test coverage below 80% (87.3% → 76.2%)         │
│ • 3 critical security vulnerabilities detected             │
│ • Code review completion rate below target (82% → 75%)    │
└─────────────────────────────────────────────────────────────┘
```

## Metric Definitions

### 1. Compliance Metrics
- **Overall Compliance Score**: Weighted average of all quality dimensions
- **Standards Compliance**: Percentage of code meeting coding standards
- **Review Compliance**: Percentage of changes properly reviewed
- **Testing Compliance**: Test coverage and quality metrics
- **Security Compliance**: Security scan results and vulnerability status

### 2. Process Metrics
- **Review Efficiency**: Time to complete code reviews
- **Build Success Rate**: Percentage of successful builds
- **Deployment Frequency**: Number of deployments per period
- **Mean Time to Recovery**: Time to recover from failures

### 3. Quality Metrics
- **Defect Density**: Number of defects per lines of code
- **Technical Debt Ratio**: Technical debt as percentage of total code
- **Code Maintainability**: Automated maintainability scoring
- **Performance Benchmarks**: Application performance indicators

## Reporting Templates

### 1. Executive Summary Report
```markdown
# QMS Executive Summary - August 2025

## Overall Performance
- **Compliance Score**: 94.2% (+1.3% from last month)
- **Risk Level**: Low
- **Trend**: Improving

## Key Achievements
✅ Reduced critical security vulnerabilities by 40%
✅ Improved test coverage to 87.3% (+2.1%)
✅ Decreased code review time by 25%

## Areas for Improvement
⚠️ Backend team test coverage needs attention
⚠️ DevOps team standards compliance requires focus
⚠️ Review completion rate below target

## Recommendations
1. Focus on backend testing initiatives
2. Provide DevOps team additional standards training
3. Optimize review process for faster completion
```

### 2. Team Performance Report
```markdown
# Team Quality Report - Backend Team

## Current Metrics
- **Compliance Score**: 96.4% (+2.1% improvement)
- **Test Coverage**: 89.2% (+1.8% improvement)
- **Review Participation**: 94.7% (+0.5% improvement)
- **Security Issues**: 0 critical, 2 medium

## Individual Performance
| Developer | Compliance | Reviews | Tests | Overall |
|-----------|------------|---------|-------|---------|
| Alice     | 98.2%      | 95.1%   | 92.3% | 95.2%   |
| Bob       | 97.1%      | 93.8%   | 88.7% | 93.2%   |
| Charlie   | 95.8%      | 94.2%   | 90.1% | 93.4%   |

## Improvement Actions
- Continue focus on test coverage improvement
- Maintain security vigilance
- Share best practices across team
```

## Integration Examples

### 1. GitHub Actions Integration
```yaml
name: QMS Metrics Collection
on: [push, pull_request]

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run QMS Analysis
        run: |
          # Run various analysis tools
          ./scripts/analyze-standards.sh
          ./scripts/analyze-coverage.sh
          ./scripts/analyze-security.sh
      - name: Submit Metrics
        run: |
          curl -X POST https://qms-api.company.com/api/v1/metrics/collect \
            -H "Authorization: Bearer $API_TOKEN" \
            -d @metrics.json
```

### 2. Slack Notification
```json
{
  "channel": "#qms-alerts",
  "text": "🚨 QMS Alert: Critical Issue Detected",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🚨 Critical Security Vulnerability"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Project:* web-application\n*Severity:* Critical\n*Location:* src/auth/token.go\n*Description:* JWT token validation vulnerability"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "View Details"
          },
          "url": "https://qms.company.com/security/vuln/12345"
        }
      ]
    }
  ]
}
```

## Best Practices

### 1. Data Quality
- **Validate Data**: Ensure all collected metrics are accurate and complete
- **Data Cleaning**: Implement automated data validation and cleaning
- **Outlier Detection**: Identify and handle anomalous data points
- **Data Consistency**: Maintain consistent metric definitions across systems

### 2. Performance Optimization
- **Efficient Collection**: Use sampling and batching for high-volume metrics
- **Caching Strategy**: Implement intelligent caching for frequently accessed data
- **Database Optimization**: Optimize database queries and indexing
- **Scalability**: Design for horizontal scaling as data volume grows

### 3. Security Considerations
- **Data Encryption**: Encrypt sensitive metrics data at rest and in transit
- **Access Control**: Implement role-based access to metrics and reports
- **Audit Logging**: Log all access to sensitive metrics data
- **Privacy Protection**: Anonymize individual performance data when appropriate

### 4. User Experience
- **Intuitive Dashboards**: Design dashboards for quick comprehension
- **Actionable Insights**: Provide specific recommendations for improvement
- **Contextual Information**: Include explanations and guidance with metrics
- **Responsive Design**: Ensure dashboards work on all device types

This comprehensive metrics and reporting system provides the foundation for data-driven quality management, enabling continuous improvement and proactive issue resolution across the entire development lifecycle.