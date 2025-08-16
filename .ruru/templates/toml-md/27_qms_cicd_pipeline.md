+++
# --- Template Metadata ---
template_id = "27_qms_cicd_pipeline"
template_name = "QMS CI/CD Pipeline"
template_version = "1.0.0"
template_description = "Template for defining and managing QMS-compliant CI/CD pipelines with automated quality gates"
template_category = "qms"
template_subcategory = "cicd"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by qms-cicd-enforcer and DevOps leads to define comprehensive quality-gated CI/CD pipelines"

# --- Core Pipeline Metadata ---
id = "" # << REQUIRED - Unique pipeline ID (e.g., QMS-PIPELINE-20250816-001) >>
title = "" # << REQUIRED - Clear, descriptive pipeline name >>
pipeline_type = "quality_gates" # << REQUIRED - Options: "quality_gates", "deployment", "testing", "security", "compliance" >>
status = "🟡 Draft" # << REQUIRED - Status indicator >>
priority = "medium" # << REQUIRED - Pipeline execution priority: "critical", "high", "medium", "low" >>
created_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
last_updated = "" # << REQUIRED - ISO format date of last modification >>
target_deployment_date = "" # << OPTIONAL - Target deployment date for pipeline >>

# --- Repository & Environment Context ---
repository_owner = "" # << REQUIRED - GitHub repository owner/organization >>
repository_name = "" # << REQUIRED - GitHub repository name >>
target_branches = [] # << REQUIRED - Array of protected branches (e.g., ["main", "develop", "stable"]) >>
environment_type = "production" # << REQUIRED - Options: "development", "staging", "production", "all" >>
deployment_strategy = "blue_green" # << OPTIONAL - Options: "rolling", "blue_green", "canary", "recreate" >>

# --- Quality Gate Configuration ---
[quality_gates]
functional_validation = true # << REQUIRED - Enable functional quality gates >>
code_standards_check = true # << REQUIRED - Enable coding standards validation >>
security_scanning = true # << REQUIRED - Enable security vulnerability scanning >>
test_coverage_validation = true # << REQUIRED - Enable test coverage requirements >>
performance_testing = false # << OPTIONAL - Enable performance testing gates >>
observability_setup = true # << REQUIRED - Enable observability configuration checks >>
documentation_check = true # << OPTIONAL - Enable documentation completeness validation >>

[quality_thresholds]
test_coverage_minimum = 80.0 # << REQUIRED - Minimum test coverage percentage (0.0-100.0) >>
security_severity_threshold = "medium" # << REQUIRED - Max allowed security issue severity: "low", "medium", "high", "critical" >>
performance_max_response_time = 2000 # << OPTIONAL - Max response time in milliseconds >>
code_complexity_threshold = 10 # << OPTIONAL - Max cyclomatic complexity >>
maintainability_index_minimum = 20 # << OPTIONAL - Minimum maintainability index (0-100) >>

# --- GitHub Actions Integration ---
[github_actions]
workflow_file_path = "" # << REQUIRED - Path to GitHub Actions workflow file (e.g., ".github/workflows/qms-pipeline.yml") >>
trigger_events = ["pull_request", "push"] # << REQUIRED - Array of GitHub events that trigger the pipeline >>
runner_type = "ubuntu-latest" # << REQUIRED - GitHub Actions runner type >>
timeout_minutes = 60 # << OPTIONAL - Pipeline timeout in minutes >>
concurrency_group = "" # << OPTIONAL - Concurrency group name for workflow >>
parallel_execution = true # << OPTIONAL - Enable parallel quality gate execution >>

[workflow_secrets]
required_secrets = [] # << OPTIONAL - Array of required GitHub secrets >>
required_variables = [] # << OPTIONAL - Array of required GitHub variables >>

# --- Quality Gate Stages ---
[stages]
stage_order = ["preparation", "functional", "quality", "security", "testing", "observability", "approval"] # << REQUIRED - Execution order of pipeline stages >>

[stages.preparation]
enabled = true # << REQUIRED - Enable this stage >>
timeout_minutes = 5 # << OPTIONAL - Stage timeout >>
dependencies = [] # << OPTIONAL - Array of dependent stages >>
failure_action = "abort" # << REQUIRED - Action on failure: "abort", "continue", "manual_review" >>

[stages.functional]
enabled = true # << REQUIRED - Enable functional validation stage >>
timeout_minutes = 15 # << OPTIONAL - Stage timeout >>
dependencies = ["preparation"] # << OPTIONAL - Dependencies >>
failure_action = "abort" # << REQUIRED - Action on failure >>
qms_modes = ["qms-code-reviewer", "qms-dor-validator"] # << OPTIONAL - Integrated QMS modes >>

[stages.quality]
enabled = true # << REQUIRED - Enable quality standards stage >>
timeout_minutes = 10 # << OPTIONAL - Stage timeout >>
dependencies = ["functional"] # << OPTIONAL - Dependencies >>
failure_action = "abort" # << REQUIRED - Action on failure >>
qms_modes = ["qms-coding-standards"] # << OPTIONAL - Integrated QMS modes >>

[stages.security]
enabled = true # << REQUIRED - Enable security scanning stage >>
timeout_minutes = 20 # << OPTIONAL - Stage timeout >>
dependencies = ["quality"] # << OPTIONAL - Dependencies >>
failure_action = "abort" # << REQUIRED - Action on failure >>
qms_modes = ["qms-security-scanner"] # << OPTIONAL - Integrated QMS modes >>

[stages.testing]
enabled = true # << REQUIRED - Enable testing and coverage stage >>
timeout_minutes = 30 # << OPTIONAL - Stage timeout >>
dependencies = ["security"] # << OPTIONAL - Dependencies >>
failure_action = "abort" # << REQUIRED - Action on failure >>
qms_modes = ["qms-testing-specialist"] # << OPTIONAL - Integrated QMS modes >>

[stages.observability]
enabled = true # << REQUIRED - Enable observability setup stage >>
timeout_minutes = 10 # << OPTIONAL - Stage timeout >>
dependencies = ["testing"] # << OPTIONAL - Dependencies >>
failure_action = "continue" # << REQUIRED - Action on failure >>
qms_modes = [] # << OPTIONAL - Integrated QMS modes >>

[stages.approval]
enabled = true # << REQUIRED - Enable final approval stage >>
timeout_minutes = 1440 # << OPTIONAL - Stage timeout (24 hours) >>
dependencies = ["observability"] # << OPTIONAL - Dependencies >>
failure_action = "abort" # << REQUIRED - Action on failure >>
qms_modes = ["qms-dod-validator"] # << OPTIONAL - Integrated QMS modes >>

# --- Monitoring & Metrics ---
[monitoring]
enable_metrics_collection = true # << REQUIRED - Enable pipeline metrics >>
metrics_retention_days = 90 # << OPTIONAL - Metrics retention period >>
alert_on_failure = true # << REQUIRED - Enable failure alerting >>
alert_recipients = [] # << OPTIONAL - Array of alert recipient emails/slack channels >>
performance_tracking = true # << OPTIONAL - Track pipeline performance >>

[sla_targets]
pipeline_completion_time_minutes = 45 # << OPTIONAL - Target total pipeline execution time >>
first_time_success_rate = 85.0 # << OPTIONAL - Target percentage for first-time success >>
mean_time_to_recovery_minutes = 30 # << OPTIONAL - Target MTTR for pipeline issues >>

# --- Integration Configuration ---
[qms_integration]
quality_coordinator = "" # << OPTIONAL - QMS Quality Coordinator Task ID >>
compliance_coordinator = "" # << OPTIONAL - QMS Compliance Coordinator Task ID >>
enforce_dod_validation = true # << REQUIRED - Require DoD validation before completion >>
enforce_dor_validation = true # << REQUIRED - Require DoR validation before execution >>
audit_trail_required = true # << REQUIRED - Maintain comprehensive audit trail >>

# --- Notification & Reporting ---
[notifications]
slack_webhook_url = "" # << OPTIONAL - Slack webhook for notifications >>
email_notifications = [] # << OPTIONAL - Array of email addresses for notifications >>
notify_on_success = false # << OPTIONAL - Send notifications on successful completion >>
notify_on_failure = true # << REQUIRED - Send notifications on pipeline failure >>
notify_on_approval_required = true # << REQUIRED - Send notifications when manual approval is needed >>

[reporting]
generate_quality_report = true # << REQUIRED - Generate comprehensive quality reports >>
report_format = "markdown" # << OPTIONAL - Options: "markdown", "html", "pdf", "json" >>
include_metrics_dashboard = true # << OPTIONAL - Include metrics dashboard in reports >>
archive_reports = true # << OPTIONAL - Archive reports for compliance >>

# --- Emergency Procedures ---
[emergency_bypass]
allow_emergency_bypass = false # << REQUIRED - Allow emergency quality gate bypass >>
bypass_approval_required = [] # << OPTIONAL - Array of required approvers for bypass >>
bypass_documentation_required = true # << OPTIONAL - Require documentation for bypass >>
bypass_audit_trail = true # << REQUIRED - Maintain audit trail for bypass actions >>

# --- Rollback Configuration ---
[rollback]
automatic_rollback_enabled = true # << OPTIONAL - Enable automatic rollback on critical failures >>
rollback_trigger_conditions = ["critical_security_failure", "deployment_failure"] # << OPTIONAL - Conditions that trigger rollback >>
rollback_timeout_minutes = 10 # << OPTIONAL - Timeout for rollback operations >>
post_rollback_validation = true # << OPTIONAL - Validate system state after rollback >>

# --- Documentation References ---
pipeline_documentation = [] # << OPTIONAL - Array of pipeline documentation file paths >>
runbook_references = [] # << OPTIONAL - Array of operational runbook paths >>
architecture_diagrams = [] # << OPTIONAL - Array of architecture diagram file paths >>
compliance_documents = [] # << OPTIONAL - Array of compliance documentation paths >>

# --- Assignment & Ownership ---
pipeline_owner = "" # << REQUIRED - Primary owner/maintainer of the pipeline >>
technical_contacts = [] # << OPTIONAL - Array of technical contacts >>
on_call_team = "" # << OPTIONAL - On-call team responsible for pipeline >>
reviewers = [] # << OPTIONAL - Array of required reviewers for pipeline changes >>
tags = [] # << OPTIONAL - Array of relevant tags >>
+++

# QMS CI/CD Pipeline Configuration

## Pipeline Overview

### Basic Information
- **Pipeline ID**: {{id}}
- **Title**: {{title}}
- **Type**: {{pipeline_type}} | **Priority**: {{priority}} | **Status**: {{status}}
- **Repository**: {{repository_owner}}/{{repository_name}}
- **Target Branches**: {{#each target_branches}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Environment**: {{environment_type}}

### Quality Gate Summary
- **Functional Validation**: {{#if quality_gates.functional_validation}}✅ Enabled{{else}}❌ Disabled{{/if}}
- **Code Standards**: {{#if quality_gates.code_standards_check}}✅ Enabled{{else}}❌ Disabled{{/if}}
- **Security Scanning**: {{#if quality_gates.security_scanning}}✅ Enabled{{else}}❌ Disabled{{/if}}
- **Test Coverage**: {{#if quality_gates.test_coverage_validation}}✅ Enabled ({{quality_thresholds.test_coverage_minimum}}% minimum){{else}}❌ Disabled{{/if}}
- **Observability**: {{#if quality_gates.observability_setup}}✅ Enabled{{else}}❌ Disabled{{/if}}

## GitHub Actions Configuration

### Workflow Details
- **Workflow File**: `{{github_actions.workflow_file_path}}`
- **Trigger Events**: {{#each github_actions.trigger_events}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Runner Type**: {{github_actions.runner_type}}
- **Timeout**: {{github_actions.timeout_minutes}} minutes
- **Parallel Execution**: {{#if github_actions.parallel_execution}}✅ Enabled{{else}}❌ Disabled{{/if}}

### Required Secrets & Variables
{{#if workflow_secrets.required_secrets}}
**Secrets**:
{{#each workflow_secrets.required_secrets}}
- {{this}}
{{/each}}
{{/if}}

{{#if workflow_secrets.required_variables}}
**Variables**:
{{#each workflow_secrets.required_variables}}
- {{this}}
{{/each}}
{{/if}}

## Pipeline Stages

The pipeline executes stages in the following order:
{{#each stages.stage_order}}
{{@index}}. **{{this}}** Stage
{{/each}}

### Stage Configuration

{{#if stages.preparation.enabled}}
#### 1. Preparation Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.preparation.timeout_minutes}} minutes
- **Failure Action**: {{stages.preparation.failure_action}}
- **Purpose**: Environment setup, dependency preparation, and prerequisite validation
{{/if}}

{{#if stages.functional.enabled}}
#### 2. Functional Validation Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.functional.timeout_minutes}} minutes
- **Failure Action**: {{stages.functional.failure_action}}
- **QMS Integration**: {{#each stages.functional.qms_modes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Purpose**: Code review automation, DoR validation, and functional requirement checks
{{/if}}

{{#if stages.quality.enabled}}
#### 3. Quality Standards Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.quality.timeout_minutes}} minutes
- **Failure Action**: {{stages.quality.failure_action}}
- **QMS Integration**: {{#each stages.quality.qms_modes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Purpose**: Coding standards enforcement, linting, and code quality validation
{{/if}}

{{#if stages.security.enabled}}
#### 4. Security Scanning Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.security.timeout_minutes}} minutes
- **Failure Action**: {{stages.security.failure_action}}
- **Threshold**: Maximum {{quality_thresholds.security_severity_threshold}} severity issues allowed
- **QMS Integration**: {{#each stages.security.qms_modes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Purpose**: Vulnerability scanning, dependency checking, and security policy validation
{{/if}}

{{#if stages.testing.enabled}}
#### 5. Testing & Coverage Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.testing.timeout_minutes}} minutes
- **Failure Action**: {{stages.testing.failure_action}}
- **Coverage Requirement**: {{quality_thresholds.test_coverage_minimum}}% minimum
- **QMS Integration**: {{#each stages.testing.qms_modes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Purpose**: Unit tests, integration tests, coverage validation, and quality metrics
{{/if}}

{{#if stages.observability.enabled}}
#### 6. Observability Setup Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.observability.timeout_minutes}} minutes
- **Failure Action**: {{stages.observability.failure_action}}
- **Purpose**: Monitoring configuration, logging setup, and telemetry validation
{{/if}}

{{#if stages.approval.enabled}}
#### 7. Approval Stage
- **Status**: ✅ Enabled
- **Timeout**: {{stages.approval.timeout_minutes}} minutes ({{stages.approval.timeout_minutes / 60}} hours)
- **Failure Action**: {{stages.approval.failure_action}}
- **QMS Integration**: {{#each stages.approval.qms_modes}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Purpose**: DoD validation, final approval, and deployment authorization
{{/if}}

## Quality Thresholds & SLA Targets

### Quality Requirements
- **Test Coverage**: ≥{{quality_thresholds.test_coverage_minimum}}%
- **Security Severity**: ≤{{quality_thresholds.security_severity_threshold}}
{{#if quality_thresholds.performance_max_response_time}}
- **Performance**: ≤{{quality_thresholds.performance_max_response_time}}ms response time
{{/if}}
{{#if quality_thresholds.code_complexity_threshold}}
- **Code Complexity**: ≤{{quality_thresholds.code_complexity_threshold}} cyclomatic complexity
{{/if}}
{{#if quality_thresholds.maintainability_index_minimum}}
- **Maintainability**: ≥{{quality_thresholds.maintainability_index_minimum}} maintainability index
{{/if}}

### Performance Targets
{{#if sla_targets.pipeline_completion_time_minutes}}
- **Pipeline Completion**: ≤{{sla_targets.pipeline_completion_time_minutes}} minutes
{{/if}}
{{#if sla_targets.first_time_success_rate}}
- **First-Time Success Rate**: ≥{{sla_targets.first_time_success_rate}}%
{{/if}}
{{#if sla_targets.mean_time_to_recovery_minutes}}
- **Mean Time to Recovery**: ≤{{sla_targets.mean_time_to_recovery_minutes}} minutes
{{/if}}

## QMS Integration

### QMS Mode Integration
- **DoD Validation**: {{#if qms_integration.enforce_dod_validation}}✅ Required{{else}}❌ Optional{{/if}}
- **DoR Validation**: {{#if qms_integration.enforce_dor_validation}}✅ Required{{else}}❌ Optional{{/if}}
- **Audit Trail**: {{#if qms_integration.audit_trail_required}}✅ Required{{else}}❌ Optional{{/if}}

{{#if qms_integration.quality_coordinator}}
**Quality Coordinator**: {{qms_integration.quality_coordinator}}
{{/if}}
{{#if qms_integration.compliance_coordinator}}
**Compliance Coordinator**: {{qms_integration.compliance_coordinator}}
{{/if}}

### Integrated QMS Modes
- **Code Review**: qms-code-reviewer, qms-dor-validator
- **Quality Standards**: qms-coding-standards
- **Security**: qms-security-scanner
- **Testing**: qms-testing-specialist
- **Final Validation**: qms-dod-validator

## Monitoring & Alerting

### Metrics Collection
- **Collection Enabled**: {{#if monitoring.enable_metrics_collection}}✅ Yes{{else}}❌ No{{/if}}
- **Retention**: {{monitoring.metrics_retention_days}} days
- **Performance Tracking**: {{#if monitoring.performance_tracking}}✅ Enabled{{else}}❌ Disabled{{/if}}

### Notification Configuration
- **Failure Alerts**: {{#if notifications.notify_on_failure}}✅ Enabled{{else}}❌ Disabled{{/if}}
- **Success Notifications**: {{#if notifications.notify_on_success}}✅ Enabled{{else}}❌ Disabled{{/if}}
- **Approval Notifications**: {{#if notifications.notify_on_approval_required}}✅ Enabled{{else}}❌ Disabled{{/if}}

{{#if notifications.slack_webhook_url}}
**Slack Integration**: Configured
{{/if}}

{{#if notifications.email_notifications}}
**Email Recipients**:
{{#each notifications.email_notifications}}
- {{this}}
{{/each}}
{{/if}}

## Emergency Procedures

### Emergency Bypass
- **Bypass Allowed**: {{#if emergency_bypass.allow_emergency_bypass}}⚠️ Yes{{else}}✅ No{{/if}}
{{#if emergency_bypass.allow_emergency_bypass}}
- **Required Approvers**: {{#each emergency_bypass.bypass_approval_required}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Documentation Required**: {{#if emergency_bypass.bypass_documentation_required}}✅ Yes{{else}}❌ No{{/if}}
- **Audit Trail**: {{#if emergency_bypass.bypass_audit_trail}}✅ Maintained{{else}}❌ Not Required{{/if}}
{{/if}}

### Automatic Rollback
- **Auto Rollback**: {{#if rollback.automatic_rollback_enabled}}✅ Enabled{{else}}❌ Disabled{{/if}}
{{#if rollback.automatic_rollback_enabled}}
- **Trigger Conditions**: {{#each rollback.rollback_trigger_conditions}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- **Rollback Timeout**: {{rollback.rollback_timeout_minutes}} minutes
- **Post-Rollback Validation**: {{#if rollback.post_rollback_validation}}✅ Required{{else}}❌ Optional{{/if}}
{{/if}}

## Pipeline Implementation

### GitHub Actions Workflow Template

```yaml
name: {{title}}
on:
  {{#each github_actions.trigger_events}}
  {{this}}:
    branches: [{{#each ../target_branches}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
  {{/each}}

{{#if github_actions.concurrency_group}}
concurrency:
  group: {{github_actions.concurrency_group}}
  cancel-in-progress: true
{{/if}}

jobs:
  qms-quality-gates:
    runs-on: {{github_actions.runner_type}}
    timeout-minutes: {{github_actions.timeout_minutes}}
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        
      {{#if stages.preparation.enabled}}
      - name: Preparation Stage
        run: |
          echo "🔧 Preparation: Environment setup and dependency validation"
          # Add preparation steps here
        timeout-minutes: {{stages.preparation.timeout_minutes}}
      {{/if}}
      
      {{#if stages.functional.enabled}}
      - name: Functional Validation
        run: |
          echo "✅ Functional: Code review and DoR validation"
          # Add functional validation steps here
        timeout-minutes: {{stages.functional.timeout_minutes}}
      {{/if}}
      
      {{#if stages.quality.enabled}}
      - name: Quality Standards Check
        run: |
          echo "📏 Quality: Coding standards and quality validation"
          # Add quality standards checks here
        timeout-minutes: {{stages.quality.timeout_minutes}}
      {{/if}}
      
      {{#if stages.security.enabled}}
      - name: Security Scanning
        run: |
          echo "🔒 Security: Vulnerability and dependency scanning"
          # Add security scanning steps here
        timeout-minutes: {{stages.security.timeout_minutes}}
      {{/if}}
      
      {{#if stages.testing.enabled}}
      - name: Testing & Coverage
        run: |
          echo "🧪 Testing: Unit tests and coverage validation"
          # Add testing and coverage steps here
        timeout-minutes: {{stages.testing.timeout_minutes}}
      {{/if}}
      
      {{#if stages.observability.enabled}}
      - name: Observability Setup
        run: |
          echo "📊 Observability: Monitoring and logging configuration"
          # Add observability setup steps here
        timeout-minutes: {{stages.observability.timeout_minutes}}
      {{/if}}
      
      {{#if stages.approval.enabled}}
      - name: Final Approval & DoD Validation
        run: |
          echo "✔️ Approval: DoD validation and deployment authorization"
          # Add approval and DoD validation steps here
        timeout-minutes: {{stages.approval.timeout_minutes}}
      {{/if}}
```

## Documentation & References

### Pipeline Documentation
{{#if pipeline_documentation}}
{{#each pipeline_documentation}}
- [{{this}}]({{this}})
{{/each}}
{{/if}}

### Operational References
{{#if runbook_references}}
**Runbooks**:
{{#each runbook_references}}
- [{{this}}]({{this}})
{{/each}}
{{/if}}

{{#if architecture_diagrams}}
**Architecture Diagrams**:
{{#each architecture_diagrams}}
- [{{this}}]({{this}})
{{/each}}
{{/if}}

### Compliance Documentation
{{#if compliance_documents}}
{{#each compliance_documents}}
- [{{this}}]({{this}})
{{/each}}
{{/if}}

## Ownership & Contacts

- **Pipeline Owner**: {{pipeline_owner}}
{{#if technical_contacts}}
- **Technical Contacts**: {{#each technical_contacts}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if on_call_team}}
- **On-Call Team**: {{on_call_team}}
{{/if}}
{{#if reviewers}}
- **Required Reviewers**: {{#each reviewers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

---

**Pipeline Created**: {{created_date}}  
**Last Updated**: {{last_updated}}  
**Priority**: {{priority}} | **Status**: {{status}}  
**Environment**: {{environment_type}} | **Deployment Strategy**: {{deployment_strategy}}