+++
# === TEMPLATE METADATA ===
template_id = "28_qms_deployment_approval"
template_name = "QMS Deployment Approval Template"
template_version = "1.0.0"
template_description = "Template for tracking deployment decisions with approval workflows and deployment validation"
created_date = "2025-08-16T05:00:00Z" # ISO 8601 format
last_modified = "2025-08-16T05:00:00Z" # ISO 8601 format
template_author = "QMS System"
template_category = "QMS CI/CD Automation"
template_tags = ["qms", "deployment", "approval", "validation", "cicd", "automation"]

# === CORE DEPLOYMENT METADATA ===
# REQUIRED: Basic deployment identification
deployment_id = "" # << REQUIRED: Unique deployment identifier (e.g., "DEP-PROD-20250816-050000") >>
deployment_name = "" # << REQUIRED: Human-readable deployment name >>
deployment_version = "" # << REQUIRED: Version being deployed (e.g., "v1.2.3", "release-2025-08-16") >>
target_environment = "" # << REQUIRED: Target deployment environment (e.g., "production", "staging", "qa") >>

# REQUIRED: Status tracking
status = "🟡 Pending Approval" # << REQUIRED: Current deployment status >>
# Valid statuses: "🟡 Pending Approval", "🔄 Under Review", "✅ Approved", "❌ Rejected", "🚀 Deploying", "🟢 Deployed", "🔴 Failed", "⏪ Rolling Back", "🛑 Blocked"

# REQUIRED: Timestamps
created_date = "" # << REQUIRED: ISO 8601 timestamp when approval request was created >>
submitted_date = "" # << OPTIONAL: ISO 8601 timestamp when submitted for approval >>
approved_date = "" # << OPTIONAL: ISO 8601 timestamp when approved >>
deployment_start_time = "" # << OPTIONAL: ISO 8601 timestamp when deployment started >>
deployment_end_time = "" # << OPTIONAL: ISO 8601 timestamp when deployment completed >>

# === DEPLOYMENT CONTEXT ===
[deployment_context]
# Source and artifact information
source_branch = "" # << REQUIRED: Git branch being deployed >>
source_commit = "" # << REQUIRED: Git commit SHA >>
build_number = "" # << OPTIONAL: CI/CD build number >>
artifact_url = "" # << OPTIONAL: URL to deployment artifact >>
release_notes_url = "" # << OPTIONAL: URL to release notes >>

# Environment configuration
environment_config = "" # << OPTIONAL: Environment-specific configuration details >>
infrastructure_changes = false # << REQUIRED: Boolean - Does deployment include infrastructure changes >>
database_migrations = false # << REQUIRED: Boolean - Does deployment include database migrations >>
breaking_changes = false # << REQUIRED: Boolean - Does deployment include breaking changes >>
rollback_plan_available = true # << REQUIRED: Boolean - Is rollback plan available >>

# === APPROVAL WORKFLOW ===
[approval_workflow]
# Approval requirements
approval_type = "standard" # << REQUIRED: Type of approval required >>
# Valid types: "standard", "expedited", "emergency", "maintenance", "hotfix"

requires_business_approval = true # << REQUIRED: Boolean - Requires business stakeholder approval >>
requires_technical_approval = true # << REQUIRED: Boolean - Requires technical lead approval >>
requires_security_approval = false # << OPTIONAL: Boolean - Requires security team approval >>
requires_compliance_approval = false # << OPTIONAL: Boolean - Requires compliance team approval >>

# Approval settings
auto_approve_eligible = false # << REQUIRED: Boolean - Eligible for automatic approval >>
emergency_override_available = true # << REQUIRED: Boolean - Emergency override available >>
approval_timeout_hours = 24 # << REQUIRED: Hours before approval request times out >>

# === APPROVERS ===
[[approvers]]
role = "" # << REQUIRED: Approver role (e.g., "Technical Lead", "Product Owner") >>
name = "" # << REQUIRED: Approver name >>
email = "" # << OPTIONAL: Approver email >>
approval_status = "pending" # << REQUIRED: Individual approval status >>
# Valid statuses: "pending", "approved", "rejected", "delegated"
approval_timestamp = "" # << OPTIONAL: ISO 8601 timestamp of approval/rejection >>
approval_comments = "" # << OPTIONAL: Comments from approver >>

# Example additional approver (copy this block for each required approver)
# [[approvers]]
# role = "Product Owner"
# name = ""
# email = ""
# approval_status = "pending"
# approval_timestamp = ""
# approval_comments = ""

# === DEPLOYMENT VALIDATION ===
[deployment_validation]
# Pre-deployment validation
pre_deployment_checks = [
    # << REQUIRED: List of pre-deployment validation checks >>
    # Example: "Infrastructure readiness", "Database connectivity", "External service dependencies"
]
pre_deployment_status = "not_started" # << REQUIRED: Status of pre-deployment validation >>
# Valid statuses: "not_started", "in_progress", "passed", "failed", "skipped"

# Post-deployment validation
post_deployment_checks = [
    # << REQUIRED: List of post-deployment validation checks >>
    # Example: "Application health", "Key user journeys", "Performance benchmarks", "Integration tests"
]
post_deployment_status = "not_started" # << REQUIRED: Status of post-deployment validation >>
# Valid statuses: "not_started", "in_progress", "passed", "failed", "skipped"

# Monitoring and alerting
monitoring_enabled = true # << REQUIRED: Boolean - Monitoring enabled for deployment >>
alerting_enabled = true # << REQUIRED: Boolean - Alerting enabled for deployment >>
health_check_url = "" # << OPTIONAL: URL for application health checks >>
performance_baseline = "" # << OPTIONAL: Performance baseline for comparison >>

# === QMS INTEGRATION ===
[qms_integration]
# Quality gate requirements
requires_quality_gate_pass = true # << REQUIRED: Boolean - Requires quality gate to pass >>
quality_gate_results = [] # << OPTIONAL: Array of quality gate result references >>
# Example: ["QG-BUILD-20250816-050000", "QG-TEST-20250816-050001"]

# QMS mode integration
assigned_qms_mode = "qms-cicd-enforcer" # << REQUIRED: QMS mode handling deployment >>
coordinator_mode = "" # << OPTIONAL: Coordinator mode managing process >>
related_pipeline_id = "" # << OPTIONAL: Related CI/CD pipeline identifier >>

# Compliance and audit
compliance_checks_required = [
    # << OPTIONAL: List of required compliance checks >>
    # Example: "SOX compliance", "GDPR compliance", "Security review"
]
audit_trail_enabled = true # << REQUIRED: Boolean - Audit trail enabled >>
change_request_id = "" # << OPTIONAL: Related change request ID >>

# === RISK ASSESSMENT ===
[risk_assessment]
# Risk factors
deployment_risk_level = "medium" # << REQUIRED: Overall risk level >>
# Valid levels: "low", "medium", "high", "critical"

risk_factors = [
    # << OPTIONAL: List of identified risk factors >>
    # Example: "Peak traffic time", "Critical business period", "New feature deployment"
]

# Mitigation strategies
mitigation_strategies = [
    # << OPTIONAL: List of risk mitigation strategies >>
    # Example: "Gradual rollout", "Feature flags", "Rollback plan", "Monitoring alerts"
]

# Impact assessment
business_impact = "medium" # << REQUIRED: Business impact level >>
# Valid levels: "low", "medium", "high", "critical"
technical_impact = "medium" # << REQUIRED: Technical impact level >>
user_impact = "low" # << REQUIRED: User impact level >>

# === ROLLBACK PROCEDURES ===
[rollback_procedures]
# Rollback configuration
rollback_strategy = "blue_green" # << REQUIRED: Rollback strategy >>
# Valid strategies: "blue_green", "rolling", "recreate", "manual", "database_restore"

rollback_time_estimate = "15 minutes" # << REQUIRED: Estimated time for rollback >>
rollback_triggers = [
    # << REQUIRED: List of conditions that would trigger rollback >>
    # Example: "Application errors > 5%", "Response time > 2s", "Critical feature failure"
]

# Rollback validation
rollback_validation_steps = [
    # << REQUIRED: List of steps to validate successful rollback >>
    # Example: "Verify application health", "Test critical paths", "Confirm data integrity"
]

automatic_rollback_enabled = false # << REQUIRED: Boolean - Automatic rollback enabled >>
rollback_approval_required = true # << REQUIRED: Boolean - Manual approval required for rollback >>

# === EMERGENCY PROCEDURES ===
[emergency_procedures]
# Emergency deployment settings
emergency_deployment = false # << REQUIRED: Boolean - Is this an emergency deployment >>
emergency_justification = "" # << OPTIONAL: Justification for emergency deployment >>
emergency_approver = "" # << OPTIONAL: Emergency approver name >>
emergency_approval_timestamp = "" # << OPTIONAL: ISO 8601 timestamp of emergency approval >>

# Emergency contacts
emergency_contacts = [
    # << OPTIONAL: List of emergency contacts >>
    # Example: {role = "On-call Engineer", name = "John Doe", phone = "+1-555-0123"}
]

# Emergency procedures
emergency_rollback_plan = "" # << OPTIONAL: Emergency rollback plan details >>
emergency_communication_plan = "" # << OPTIONAL: Emergency communication plan >>

# === COMMUNICATION ===
[communication]
# Stakeholder notifications
notify_stakeholders = true # << REQUIRED: Boolean - Notify stakeholders of deployment >>
notification_channels = [
    # << OPTIONAL: List of notification channels >>
    # Example: "slack", "email", "teams", "sms"
]

# Communication templates
deployment_announcement = "" # << OPTIONAL: Deployment announcement template >>
success_notification = "" # << OPTIONAL: Success notification template >>
failure_notification = "" # << OPTIONAL: Failure notification template >>

# Status updates
status_update_frequency = "hourly" # << OPTIONAL: Frequency of status updates >>
# Valid frequencies: "real-time", "15min", "hourly", "daily", "on-demand"

# === AUTOMATION SETTINGS ===
[automation_settings]
# CI/CD pipeline integration
pipeline_trigger_mode = "manual" # << REQUIRED: How deployment is triggered >>
# Valid modes: "manual", "automatic", "scheduled", "approval-based"

automated_testing_required = true # << REQUIRED: Boolean - Automated testing required >>
automated_validation_required = true # << REQUIRED: Boolean - Automated validation required >>
automated_rollback_conditions = [
    # << OPTIONAL: List of conditions for automated rollback >>
    # Example: "health_check_failure", "error_rate_threshold", "performance_degradation"
]

# Deployment automation
deployment_timeout_minutes = 60 # << REQUIRED: Maximum deployment time in minutes >>
parallel_deployment = false # << REQUIRED: Boolean - Support parallel deployment >>
canary_deployment = false # << REQUIRED: Boolean - Use canary deployment >>
canary_percentage = 5 # << OPTIONAL: Percentage of traffic for canary deployment >>

# === METRICS AND MONITORING ===
[metrics_monitoring]
# Key metrics to track
key_metrics = [
    # << REQUIRED: List of key metrics to monitor during deployment >>
    # Example: "response_time", "error_rate", "throughput", "cpu_utilization"
]

# Monitoring duration
pre_deployment_monitoring = "1 hour" # << REQUIRED: Duration of pre-deployment monitoring >>
post_deployment_monitoring = "24 hours" # << REQUIRED: Duration of post-deployment monitoring >>

# Alert thresholds
alert_thresholds = [
    # << OPTIONAL: Alert threshold configurations >>
    # Example: {metric = "error_rate", threshold = "5%", action = "alert"}
]

# Dashboard and reporting
monitoring_dashboard_url = "" # << OPTIONAL: URL to monitoring dashboard >>
deployment_report_url = "" # << OPTIONAL: URL to deployment report >>

# === VALIDATION RESULTS ===
[validation_results]
# Test execution results
unit_tests_passed = true # << OPTIONAL: Boolean - Unit tests passed >>
integration_tests_passed = true # << OPTIONAL: Boolean - Integration tests passed >>
e2e_tests_passed = true # << OPTIONAL: Boolean - End-to-end tests passed >>
performance_tests_passed = true # << OPTIONAL: Boolean - Performance tests passed >>
security_tests_passed = true # << OPTIONAL: Boolean - Security tests passed >>

# Quality metrics
code_coverage = 0.0 # << OPTIONAL: Code coverage percentage (0.0 to 1.0) >>
code_quality_score = 0.0 # << OPTIONAL: Code quality score (0.0 to 10.0) >>
security_score = 0.0 # << OPTIONAL: Security score (0.0 to 10.0) >>

# Validation timestamps
validation_start_time = "" # << OPTIONAL: ISO 8601 timestamp when validation started >>
validation_end_time = "" # << OPTIONAL: ISO 8601 timestamp when validation completed >>
+++

# Deployment Approval: {Deployment Name}

## Overview

**Deployment ID:** `{deployment_id}`  
**Version:** `{deployment_version}`  
**Target Environment:** `{target_environment}`  
**Status:** {status}  

## Deployment Context

### Source Information
- **Branch:** `{source_branch}`
- **Commit:** `{source_commit}`
- **Build:** `{build_number}`

### Changes Summary
- **Infrastructure Changes:** {Yes/No}
- **Database Migrations:** {Yes/No}
- **Breaking Changes:** {Yes/No}
- **Rollback Plan Available:** {Yes/No}

## Approval Workflow

### Approval Requirements
- **Type:** {approval_type}
- **Business Approval:** {Required/Not Required}
- **Technical Approval:** {Required/Not Required}
- **Security Approval:** {Required/Not Required}
- **Compliance Approval:** {Required/Not Required}

### Approval Status
<!-- Update this section as approvals are received -->

| Approver Role | Name | Status | Timestamp | Comments |
|---------------|------|--------|-----------|----------|
| {role} | {name} | {status} | {timestamp} | {comments} |

## Deployment Plan

### Pre-Deployment Validation
<!-- Check off items as they are completed -->

- [ ] Infrastructure readiness check
- [ ] Database connectivity verification
- [ ] External service dependency check
- [ ] Security scan completion
- [ ] Performance baseline established
- [ ] Rollback plan validated

### Deployment Steps
<!-- Outline the deployment procedure -->

1. **Pre-deployment Checks**
   - Verify all approval requirements met
   - Confirm rollback plan availability
   - Validate deployment environment

2. **Deployment Execution**
   - Execute deployment pipeline
   - Monitor deployment progress
   - Validate each deployment stage

3. **Post-deployment Validation**
   - Application health verification
   - Key user journey testing
   - Performance metric validation
   - Integration testing

### Post-Deployment Monitoring
<!-- Define monitoring procedures -->

- **Duration:** {post_deployment_monitoring}
- **Key Metrics:** {List key metrics}
- **Alert Thresholds:** {Define alert conditions}
- **Dashboard:** [{monitoring_dashboard_url}]({monitoring_dashboard_url})

## Risk Assessment

### Risk Level: {deployment_risk_level}

### Risk Factors
<!-- List identified risks -->
- {risk_factor_1}
- {risk_factor_2}
- {risk_factor_n}

### Mitigation Strategies
<!-- List mitigation approaches -->
- {mitigation_strategy_1}
- {mitigation_strategy_2}
- {mitigation_strategy_n}

### Impact Assessment
- **Business Impact:** {business_impact}
- **Technical Impact:** {technical_impact}
- **User Impact:** {user_impact}

## Rollback Procedures

### Rollback Strategy
- **Method:** {rollback_strategy}
- **Estimated Time:** {rollback_time_estimate}
- **Automatic Rollback:** {Enabled/Disabled}
- **Approval Required:** {Yes/No}

### Rollback Triggers
<!-- Define conditions that would trigger rollback -->
- {trigger_condition_1}
- {trigger_condition_2}
- {trigger_condition_n}

### Rollback Validation
<!-- Steps to validate successful rollback -->
1. {validation_step_1}
2. {validation_step_2}
3. {validation_step_n}

## Emergency Procedures

### Emergency Contacts
<!-- List emergency contacts if deployment fails -->
| Role | Name | Contact |
|------|------|---------|
| {role} | {name} | {contact_info} |

### Emergency Rollback Plan
{emergency_rollback_plan}

### Communication Plan
{emergency_communication_plan}

## QMS Integration

### Quality Gate Requirements
- **Quality Gate Pass Required:** {Yes/No}
- **Related Quality Gates:** {List quality gate IDs}

### Compliance Requirements
<!-- List compliance checks if applicable -->
- [ ] {compliance_check_1}
- [ ] {compliance_check_2}
- [ ] {compliance_check_n}

### Audit Trail
- **Change Request ID:** `{change_request_id}`
- **Audit Trail Enabled:** {Yes/No}

## Validation Results

### Test Execution
<!-- Update as tests are executed -->
- **Unit Tests:** {Passed/Failed/Not Run}
- **Integration Tests:** {Passed/Failed/Not Run}
- **End-to-End Tests:** {Passed/Failed/Not Run}
- **Performance Tests:** {Passed/Failed/Not Run}
- **Security Tests:** {Passed/Failed/Not Run}

### Quality Metrics
- **Code Coverage:** {code_coverage}%
- **Code Quality Score:** {code_quality_score}/10
- **Security Score:** {security_score}/10

## Communication

### Stakeholder Notifications
- **Notify Stakeholders:** {Yes/No}
- **Notification Channels:** {List channels}

### Status Updates
- **Update Frequency:** {status_update_frequency}
- **Last Updated:** {timestamp}

## Timeline

### Key Timestamps
- **Created:** {created_date}
- **Submitted for Approval:** {submitted_date}
- **Approved:** {approved_date}
- **Deployment Start:** {deployment_start_time}
- **Deployment Complete:** {deployment_end_time}

## Notes and Comments

<!-- Add any additional notes, comments, or special considerations -->

## Deployment Log

<!-- Use this section to log deployment progress and any issues encountered -->

### {timestamp} - Deployment Initiated
- Deployment started by: {user}
- Initial status: {status}

### {timestamp} - Validation Complete
- All pre-deployment checks passed
- Proceeding with deployment

### {timestamp} - Deployment Complete
- Deployment finished successfully
- Post-deployment validation initiated

---

**Last Updated:** {last_modified}  
**QMS Mode:** {assigned_qms_mode}  
**Coordinator:** {coordinator_mode}