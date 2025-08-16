+++
# --- Template Metadata (Schema Definition) ---
template_type = "qms_quality_gate_result"
template_version = "1.0.0"
template_description = "QMS Quality Gate Result - Template for tracking quality gate execution results, pass/fail status, and remediation workflows within CI/CD pipelines"
template_author = "QMS CI/CD Enforcer"
template_created = "2025-08-16T05:10:00Z"
template_usage = "Use this template to document quality gate execution results, track compliance status, manage failure remediation, and maintain gate performance metrics within the QMS framework"
template_integration = ["qms-cicd-enforcer", "qms-quality-coordinator", "qms-compliance-coordinator"]

# --- Core Quality Gate Result Metadata ---
id = "" # << REQUIRED - Unique gate result ID, format: QGR-[GATE_TYPE]-[YYYYMMDD-HHMMSS] >>
title = "" # << REQUIRED - Descriptive title for the quality gate result >>
gate_type = "" # << REQUIRED - Type of quality gate (e.g. "Code_Quality", "Security_Scan", "Performance_Test", "Compliance_Check") >>
gate_version = "" # << REQUIRED - Version of the gate definition used >>
execution_id = "" # << REQUIRED - Unique execution instance ID >>
pipeline_id = "" # << OPTIONAL - Associated pipeline ID if part of CI/CD >>
commit_sha = "" # << OPTIONAL - Git commit SHA being evaluated >>
branch = "" # << OPTIONAL - Git branch name >>

# --- Result Status & Timing ---
result_status = "" # << REQUIRED - Overall gate result: "✅ PASSED", "❌ FAILED", "⚠️ CONDITIONALLY_PASSED", "🔄 PENDING", "⏸️ PAUSED", "🚫 CANCELLED" >>
execution_start_time = "" # << REQUIRED - ISO 8601 timestamp when gate execution began >>
execution_end_time = "" # << OPTIONAL - ISO 8601 timestamp when gate execution completed >>
execution_duration_seconds = 0 # << OPTIONAL - Total execution time in seconds >>
timeout_seconds = 0 # << OPTIONAL - Maximum allowed execution time >>
retry_attempt = 1 # << OPTIONAL - Current retry attempt number (default: 1) >>
max_retries = 3 # << OPTIONAL - Maximum allowed retries (default: 3) >>

# --- Quality Gate Configuration Reference ---
[gate_configuration]
gate_definition_file = "" # << REQUIRED - Path to gate definition file >>
criteria_count = 0 # << REQUIRED - Total number of evaluation criteria >>
weight_distribution = "equal" # << OPTIONAL - How criteria weights are distributed: "equal", "weighted", "tiered" >>
pass_threshold_percent = 80 # << OPTIONAL - Minimum percentage required to pass (default: 80) >>
critical_failure_tolerance = 0 # << OPTIONAL - Number of critical failures allowed (default: 0) >>

# --- Detailed Gate Results ---
[[gate_criteria]]
# << REQUIRED - Array of criteria evaluation results >>
criterion_id = "" # << REQUIRED - Unique criterion identifier >>
criterion_name = "" # << REQUIRED - Human-readable criterion name >>
criterion_type = "" # << REQUIRED - Type: "code_quality", "security", "performance", "compliance", "test_coverage", "documentation" >>
weight = 1.0 # << REQUIRED - Relative importance weight >>
result = "" # << REQUIRED - Criterion result: "PASS", "FAIL", "WARNING", "SKIP" >>
score = 0.0 # << OPTIONAL - Numerical score (0-100) >>
threshold = 0.0 # << OPTIONAL - Required threshold for passing >>
message = "" # << OPTIONAL - Detailed result message >>
evidence_files = [] # << OPTIONAL - Array of evidence file paths >>
remediation_required = false # << OPTIONAL - Whether remediation is needed >>

# --- Overall Metrics & Statistics ---
[result_metrics]
total_criteria = 0 # << REQUIRED - Total number of criteria evaluated >>
passed_criteria = 0 # << REQUIRED - Number of criteria that passed >>
failed_criteria = 0 # << REQUIRED - Number of criteria that failed >>
warning_criteria = 0 # << OPTIONAL - Number of criteria with warnings >>
skipped_criteria = 0 # << OPTIONAL - Number of criteria skipped >>
overall_score = 0.0 # << OPTIONAL - Computed overall score (0-100) >>
pass_rate_percent = 0.0 # << REQUIRED - Percentage of criteria passed >>
improvement_from_previous = 0.0 # << OPTIONAL - Score improvement since last run >>

# --- Stakeholder Information ---
[stakeholders]
gate_executor = "" # << REQUIRED - Who/what executed the gate (user, system, mode) >>
result_reviewer = "" # << OPTIONAL - Designated reviewer for results >>
notification_recipients = [] # << OPTIONAL - Array of notification recipients >>
escalation_contacts = [] # << OPTIONAL - Array of escalation contacts for failures >>
approval_required_by = [] # << OPTIONAL - Array of required approvers for conditional passes >>

# --- Pipeline Integration ---
[pipeline_integration]
stage_name = "" # << OPTIONAL - Pipeline stage name >>
job_name = "" # << OPTIONAL - Specific job name >>
workflow_file = "" # << OPTIONAL - Path to workflow/pipeline definition >>
previous_stage_results = [] # << OPTIONAL - Array of previous stage result IDs >>
blocking_next_stages = [] # << OPTIONAL - Array of stages blocked by this result >>
rollback_triggered = false # << OPTIONAL - Whether result triggered rollback >>

# --- Failure Analysis & Remediation ---
[failure_analysis]
root_cause_category = "" # << OPTIONAL - Primary failure category if failed >>
affected_components = [] # << OPTIONAL - Array of affected system components >>
severity_level = "" # << OPTIONAL - Failure severity: "critical", "high", "medium", "low" >>
business_impact = "" # << OPTIONAL - Assessment of business impact >>
technical_debt_created = false # << OPTIONAL - Whether failure creates tech debt >>

[remediation_plan]
required_actions = [] # << OPTIONAL - Array of required remediation actions >>
estimated_fix_time_hours = 0.0 # << OPTIONAL - Estimated time to fix issues >>
assigned_to = "" # << OPTIONAL - Who is assigned to fix issues >>
remediation_deadline = "" # << OPTIONAL - ISO 8601 deadline for fixes >>
blocking_deployment = true # << OPTIONAL - Whether issues block deployment >>
bypass_approved_by = "" # << OPTIONAL - Who can approve bypass of this gate >>

# --- QMS Integration & Compliance ---
[qms_integration]
qms_coordinator_notified = false # << OPTIONAL - Whether QMS coordinator was notified >>
compliance_implications = [] # << OPTIONAL - Array of compliance implications >>
audit_trail_updated = false # << OPTIONAL - Whether audit trail was updated >>
metrics_dashboard_updated = false # << OPTIONAL - Whether metrics dashboard was updated >>
process_improvement_flagged = false # << OPTIONAL - Whether improvement opportunity flagged >>

# --- Automation & CI/CD Integration ---
[automation_status]
automated_execution = true # << OPTIONAL - Whether gate was executed automatically >>
manual_intervention_required = false # << OPTIONAL - Whether manual intervention needed >>
auto_retry_enabled = true # << OPTIONAL - Whether automatic retries are enabled >>
notification_sent = false # << OPTIONAL - Whether notifications were sent >>
downstream_actions_triggered = [] # << OPTIONAL - Array of triggered downstream actions >>

# --- Historical Context & Trends ---
[historical_context]
previous_execution_id = "" # << OPTIONAL - ID of previous execution for comparison >>
trend_direction = "" # << OPTIONAL - Quality trend: "improving", "declining", "stable" >>
consecutive_failures = 0 # << OPTIONAL - Number of consecutive failures >>
consecutive_passes = 0 # << OPTIONAL - Number of consecutive passes >>
last_passed_execution_id = "" # << OPTIONAL - ID of last successful execution >>
baseline_comparison_score = 0.0 # << OPTIONAL - Score compared to baseline >>

# --- Evidence & Artifacts ---
[evidence_artifacts]
result_report_path = "" # << OPTIONAL - Path to detailed result report >>
log_files = [] # << OPTIONAL - Array of log file paths >>
screenshots = [] # << OPTIONAL - Array of screenshot paths for UI tests >>
performance_profiles = [] # << OPTIONAL - Array of performance profile paths >>
security_scan_reports = [] # << OPTIONAL - Array of security scan report paths >>
coverage_reports = [] # << OPTIONAL - Array of test coverage report paths >>

# --- Notifications & Communications ---
[notifications]
immediate_notifications = [] # << OPTIONAL - Array of immediate notification configs >>
escalation_notifications = [] # << OPTIONAL - Array of escalation notification configs >>
status_page_updated = false # << OPTIONAL - Whether status page was updated >>
slack_channels_notified = [] # << OPTIONAL - Array of notified Slack channels >>
email_distribution_lists = [] # << OPTIONAL - Array of notified email lists >>

# --- Process Metrics ---
[process_metrics]
gate_reliability_score = 0.0 # << OPTIONAL - Gate reliability metric (0-100) >>
false_positive_rate = 0.0 # << OPTIONAL - Rate of false positive failures >>
execution_efficiency_score = 0.0 # << OPTIONAL - Efficiency metric for gate execution >>
developer_satisfaction_score = 0.0 # << OPTIONAL - Developer feedback score >>
process_adherence_score = 0.0 # << OPTIONAL - Adherence to defined process >>

# --- System Integration Points ---
[system_integration]
jira_ticket_created = "" # << OPTIONAL - JIRA ticket ID if created >>
github_issue_created = "" # << OPTIONAL - GitHub issue ID if created >>
monitoring_alerts_triggered = [] # << OPTIONAL - Array of triggered monitoring alerts >>
dashboard_links = [] # << OPTIONAL - Array of relevant dashboard URLs >>
external_system_integrations = [] # << OPTIONAL - Array of external system integration statuses >>

# --- Quality Assurance Validation ---
[qa_validation]
qa_review_required = false # << OPTIONAL - Whether QA review is required >>
qa_reviewer_assigned = "" # << OPTIONAL - Assigned QA reviewer >>
qa_review_status = "" # << OPTIONAL - QA review status >>
qa_sign_off_date = "" # << OPTIONAL - ISO 8601 date of QA sign-off >>
qa_recommendations = [] # << OPTIONAL - Array of QA recommendations >>

# --- Documentation & Knowledge Management ---
[documentation]
runbook_updated = false # << OPTIONAL - Whether relevant runbooks were updated >>
lessons_learned_documented = false # << OPTIONAL - Whether lessons learned were captured >>
process_documentation_updated = false # << OPTIONAL - Whether process docs were updated >>
training_materials_flagged = false # << OPTIONAL - Whether training materials need updates >>
knowledge_base_articles = [] # << OPTIONAL - Array of relevant knowledge base articles >>

# --- Metadata & Tracking ---
created_by = "" # << REQUIRED - Who created this result record >>
created_date = "" # << REQUIRED - ISO 8601 timestamp of creation >>
updated_by = "" # << OPTIONAL - Who last updated this record >>
updated_date = "" # << OPTIONAL - ISO 8601 timestamp of last update >>
source_system = "qms-cicd-enforcer" # << OPTIONAL - System that generated this result >>
result_schema_version = "1.0.0" # << OPTIONAL - Version of this result schema >>
tags = [] # << OPTIONAL - Array of relevant tags for categorization >>
related_results = [] # << OPTIONAL - Array of related quality gate result IDs >>
+++

# Quality Gate Result: [GATE_TYPE] - [TITLE]

## Result Summary

**Gate Type:** [GATE_TYPE]  
**Execution ID:** [EXECUTION_ID]  
**Status:** [RESULT_STATUS]  
**Overall Score:** [OVERALL_SCORE]% ([PASSED_CRITERIA]/[TOTAL_CRITERIA] criteria passed)  
**Execution Time:** [EXECUTION_DURATION_SECONDS]s  
**Branch/Commit:** [BRANCH] @ [COMMIT_SHA]  

## Gate Criteria Results

### Passed Criteria ✅
<!-- List all criteria that passed with their scores and evidence -->

### Failed Criteria ❌
<!-- List all criteria that failed with details and required actions -->

### Warning Criteria ⚠️
<!-- List all criteria that passed with warnings -->

## Detailed Analysis

### Root Cause Analysis
<!-- If the gate failed, provide detailed root cause analysis -->

### Impact Assessment
**Business Impact:** [BUSINESS_IMPACT]  
**Technical Impact:** [TECHNICAL_IMPACT]  
**Security Impact:** [SECURITY_IMPACT]  
**Compliance Impact:** [COMPLIANCE_IMPACT]  

### Affected Components
<!-- List all system components affected by the gate results -->

## Remediation Plan

### Required Actions
<!-- Detailed list of actions required to address failures -->

### Timeline & Assignments
**Estimated Fix Time:** [ESTIMATED_FIX_TIME_HOURS] hours  
**Assigned To:** [ASSIGNED_TO]  
**Remediation Deadline:** [REMEDIATION_DEADLINE]  
**Deployment Blocked:** [BLOCKING_DEPLOYMENT]  

### Bypass Procedures
<!-- If applicable, document bypass procedures and approval requirements -->

## Evidence & Artifacts

### Generated Reports
<!-- Links to all generated reports, logs, and artifacts -->

### Screenshots & Visual Evidence
<!-- Any visual evidence captured during gate execution -->

### Performance Data
<!-- Performance metrics and profiling data if applicable -->

## Stakeholder Communications

### Notifications Sent
<!-- Record of all notifications sent to stakeholders -->

### Escalations Required
<!-- Any escalations that need to be made based on results -->

### Approvals Needed
<!-- Any approvals required before proceeding -->

## Historical Context

### Trend Analysis
**Trend Direction:** [TREND_DIRECTION]  
**Consecutive Failures:** [CONSECUTIVE_FAILURES]  
**Consecutive Passes:** [CONSECUTIVE_PASSES]  
**Improvement Since Previous:** [IMPROVEMENT_FROM_PREVIOUS]%  

### Comparison with Baseline
<!-- Comparison with established baseline metrics -->

## Process Improvements

### Lessons Learned
<!-- Key lessons learned from this gate execution -->

### Process Enhancement Opportunities
<!-- Identified opportunities to improve the gate process -->

### Automation Improvements
<!-- Suggested improvements to gate automation -->

## QMS Integration Status

### Compliance Tracking
<!-- Status of compliance tracking and audit trail updates -->

### Metrics Dashboard Updates
<!-- Confirmation of metrics dashboard updates -->

### Process Documentation Updates
<!-- Any updates needed to process documentation -->

## Next Steps

### Immediate Actions
<!-- Actions that need to be taken immediately -->

### Follow-up Activities
<!-- Follow-up activities scheduled for later -->

### Monitoring & Verification
<!-- How the remediation will be monitored and verified -->

## Appendices

### A. Detailed Criterion Results
<!-- Comprehensive breakdown of each criterion result -->

### B. Technical Logs
<!-- Relevant technical logs and debug information -->

### C. Configuration Details
<!-- Gate configuration details and parameters used -->

### D. Integration Status
<!-- Status of all system integrations -->

---

**Result Generated:** [CREATED_DATE] by [CREATED_BY]  
**Last Updated:** [UPDATED_DATE] by [UPDATED_BY]  
**Schema Version:** [RESULT_SCHEMA_VERSION]