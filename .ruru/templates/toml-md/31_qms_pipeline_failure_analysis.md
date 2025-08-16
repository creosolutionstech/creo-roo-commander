+++
# --- Template Metadata (Schema Definition) ---
template_type = "qms_pipeline_failure_analysis"
template_version = "1.0.0"
template_description = "QMS Pipeline Failure Analysis - Template for systematic investigation, root cause analysis, and remediation planning for CI/CD pipeline failures within the QMS framework"
template_author = "QMS CI/CD Enforcer"
template_created = "2025-08-16T05:15:00Z"
template_usage = "Use this template to conduct thorough failure analysis, identify root causes, plan remediation, and capture lessons learned from CI/CD pipeline failures"
template_integration = ["qms-cicd-enforcer", "qms-quality-coordinator", "qms-compliance-coordinator"]

# --- Core Failure Analysis Metadata ---
id = "" # << REQUIRED - Unique failure analysis ID, format: PFA-[FAILURE_TYPE]-[YYYYMMDD-HHMMSS] >>
title = "" # << REQUIRED - Descriptive title for the failure analysis >>
failure_type = "" # << REQUIRED - Type of failure (e.g. "Build_Failure", "Test_Failure", "Deployment_Failure", "Quality_Gate_Failure", "Infrastructure_Failure") >>
severity_level = "" # << REQUIRED - Failure severity: "critical", "high", "medium", "low" >>
analysis_status = "" # << REQUIRED - Analysis status: "🔄 In_Progress", "✅ Completed", "⏸️ Paused", "🚫 Cancelled" >>
priority_level = "" # << REQUIRED - Priority level: "P0", "P1", "P2", "P3", "P4" >>

# --- Failure Incident Details ---
[incident_details]
incident_id = "" # << REQUIRED - Unique incident identifier >>
occurred_at = "" # << REQUIRED - ISO 8601 timestamp when failure occurred >>
detected_at = "" # << OPTIONAL - ISO 8601 timestamp when failure was detected >>
resolved_at = "" # << OPTIONAL - ISO 8601 timestamp when failure was resolved >>
pipeline_id = "" # << REQUIRED - ID of the failed pipeline >>
pipeline_stage = "" # << REQUIRED - Stage where failure occurred >>
job_name = "" # << OPTIONAL - Specific job that failed >>
commit_sha = "" # << REQUIRED - Git commit SHA being processed >>
branch_name = "" # << REQUIRED - Git branch name >>
pr_number = "" # << OPTIONAL - Pull request number if applicable >>

# --- Environmental Context ---
[environment_context]
deployment_environment = "" # << REQUIRED - Target environment (e.g. "development", "staging", "production") >>
infrastructure_provider = "" # << OPTIONAL - Cloud provider or infrastructure details >>
runner_type = "" # << OPTIONAL - CI/CD runner type (e.g. "github-hosted", "self-hosted") >>
resource_constraints = [] # << OPTIONAL - Array of resource limitation factors >>
external_dependencies = [] # << OPTIONAL - Array of external system dependencies >>
configuration_version = "" # << OPTIONAL - Version of pipeline configuration used >>

# --- Failure Analysis Team ---
[analysis_team]
lead_investigator = "" # << REQUIRED - Primary investigator conducting analysis >>
investigation_team = [] # << OPTIONAL - Array of team members involved in analysis >>
stakeholder_contacts = [] # << OPTIONAL - Array of stakeholder contacts >>
escalation_contacts = [] # << OPTIONAL - Array of escalation contacts >>
sme_consultants = [] # << OPTIONAL - Array of subject matter experts consulted >>

# --- Timeline & Duration Impact ---
[impact_metrics]
total_downtime_minutes = 0 # << OPTIONAL - Total minutes of system downtime >>
pipeline_blocked_duration = 0 # << OPTIONAL - Minutes pipeline was blocked >>
developer_productivity_impact = "" # << OPTIONAL - Assessment of developer impact >>
business_impact_level = "" # << OPTIONAL - Business impact: "none", "low", "medium", "high", "critical" >>
customer_facing_impact = false # << OPTIONAL - Whether failure affected customers >>
revenue_impact_estimated = 0.0 # << OPTIONAL - Estimated revenue impact (if applicable) >>

# --- Root Cause Analysis ---
[root_cause_analysis]
analysis_methodology = "" # << REQUIRED - RCA methodology used (e.g. "5_Whys", "Fishbone", "Timeline", "Fault_Tree") >>
primary_root_cause = "" # << REQUIRED - Primary root cause identified >>
contributing_factors = [] # << REQUIRED - Array of contributing factors >>
immediate_cause = "" # << REQUIRED - Immediate cause of the failure >>
underlying_causes = [] # << OPTIONAL - Array of underlying systemic causes >>
human_factors_involved = false # << OPTIONAL - Whether human error was a factor >>

# --- Failure Classification ---
[failure_classification]
failure_category = "" # << REQUIRED - Primary failure category: "code_defect", "infrastructure", "configuration", "dependency", "process", "human_error" >>
failure_subcategory = "" # << OPTIONAL - More specific subcategory >>
recurring_failure = false # << REQUIRED - Whether this is a recurring type of failure >>
similar_incidents_count = 0 # << OPTIONAL - Number of similar incidents in recent history >>
preventability_assessment = "" # << OPTIONAL - Assessment of whether failure was preventable >>
detection_effectiveness = "" # << OPTIONAL - How effectively was failure detected >>

# --- Technical Analysis Details ---
[technical_analysis]
error_messages = [] # << REQUIRED - Array of relevant error messages >>
log_file_paths = [] # << OPTIONAL - Array of relevant log file paths >>
stack_traces = [] # << OPTIONAL - Array of stack trace information >>
configuration_issues = [] # << OPTIONAL - Array of configuration problems identified >>
code_quality_issues = [] # << OPTIONAL - Array of code quality problems >>
dependency_issues = [] # << OPTIONAL - Array of dependency-related problems >>

# --- System State Analysis ---
[system_state_analysis]
resource_utilization = [] # << OPTIONAL - Array of resource utilization metrics at failure time >>
system_performance_metrics = [] # << OPTIONAL - Array of performance metrics >>
network_connectivity_status = "" # << OPTIONAL - Network connectivity assessment >>
database_performance_impact = "" # << OPTIONAL - Database performance assessment >>
third_party_service_status = [] # << OPTIONAL - Array of third-party service statuses >>

# --- Remediation Plan ---
[remediation_plan]
immediate_actions_taken = [] # << REQUIRED - Array of immediate remediation actions >>
short_term_fixes = [] # << REQUIRED - Array of short-term fixes planned/implemented >>
long_term_improvements = [] # << OPTIONAL - Array of long-term improvement actions >>
preventive_measures = [] # << REQUIRED - Array of measures to prevent recurrence >>
monitoring_enhancements = [] # << OPTIONAL - Array of monitoring improvements >>
process_improvements = [] # << OPTIONAL - Array of process improvements >>

# --- Action Items & Assignments ---
[[action_items]]
# << REQUIRED - Array of specific action items >>
action_id = "" # << REQUIRED - Unique action item ID >>
description = "" # << REQUIRED - Action item description >>
assigned_to = "" # << REQUIRED - Person responsible for action >>
due_date = "" # << REQUIRED - ISO 8601 due date >>
priority = "" # << REQUIRED - Action priority: "high", "medium", "low" >>
status = "" # << REQUIRED - Action status: "pending", "in_progress", "completed", "blocked" >>
completion_criteria = "" # << OPTIONAL - Criteria for considering action complete >>
related_actions = [] # << OPTIONAL - Array of related action item IDs >>

# --- Risk Assessment ---
[risk_assessment]
likelihood_of_recurrence = "" # << REQUIRED - Likelihood: "very_low", "low", "medium", "high", "very_high" >>
potential_impact_if_recurring = "" # << REQUIRED - Impact assessment if failure recurs >>
risk_mitigation_strategies = [] # << REQUIRED - Array of risk mitigation approaches >>
early_warning_indicators = [] # << OPTIONAL - Array of indicators to watch for >>
monitoring_thresholds = [] # << OPTIONAL - Array of monitoring threshold adjustments >>

# --- Communication & Notifications ---
[communication_status]
stakeholders_notified = [] # << REQUIRED - Array of stakeholders who were notified >>
incident_reports_filed = [] # << OPTIONAL - Array of formal incident reports filed >>
customer_communications_sent = false # << OPTIONAL - Whether customer communications were sent >>
post_mortem_scheduled = false # << OPTIONAL - Whether post-mortem meeting is scheduled >>
lessons_learned_documented = false # << OPTIONAL - Whether lessons learned are documented >>

# --- Quality Assurance Validation ---
[qa_validation]
qa_review_completed = false # << OPTIONAL - Whether QA reviewed the analysis >>
qa_reviewer = "" # << OPTIONAL - QA reviewer name >>
qa_approval_date = "" # << OPTIONAL - ISO 8601 date of QA approval >>
qa_recommendations = [] # << OPTIONAL - Array of QA recommendations >>
testing_adequacy_assessment = "" # << OPTIONAL - Assessment of testing coverage >>

# --- Process Improvement Opportunities ---
[process_improvements]
process_gaps_identified = [] # << OPTIONAL - Array of process gaps found >>
automation_opportunities = [] # << OPTIONAL - Array of automation opportunities >>
tooling_improvements = [] # << OPTIONAL - Array of tooling improvement suggestions >>
training_needs_identified = [] # << OPTIONAL - Array of training needs >>
documentation_updates_needed = [] # << OPTIONAL - Array of documentation updates required >>

# --- Historical Context & Patterns ---
[historical_context]
similar_failures_last_30_days = 0 # << OPTIONAL - Count of similar failures in last 30 days >>
similar_failures_last_90_days = 0 # << OPTIONAL - Count of similar failures in last 90 days >>
trend_analysis = "" # << OPTIONAL - Analysis of failure trends >>
seasonal_patterns = "" # << OPTIONAL - Any seasonal patterns observed >>
related_previous_incidents = [] # << OPTIONAL - Array of related previous incident IDs >>

# --- Metrics & KPIs ---
[performance_metrics]
mean_time_to_detection_mtd = 0.0 # << OPTIONAL - Mean time to detection in minutes >>
mean_time_to_resolution_mtr = 0.0 # << OPTIONAL - Mean time to resolution in minutes >>
analysis_completion_time = 0.0 # << OPTIONAL - Time taken to complete analysis >>
fix_effectiveness_score = 0.0 # << OPTIONAL - Effectiveness score of implemented fixes >>
stakeholder_satisfaction_score = 0.0 # << OPTIONAL - Stakeholder satisfaction with resolution >>

# --- Compliance & Audit Trail ---
[compliance_tracking]
regulatory_implications = [] # << OPTIONAL - Array of regulatory compliance implications >>
audit_trail_maintained = true # << OPTIONAL - Whether complete audit trail is maintained >>
compliance_notifications_required = false # << OPTIONAL - Whether compliance notifications are needed >>
sla_impact_assessment = "" # << OPTIONAL - Assessment of SLA impact >>
contractual_obligations_affected = [] # << OPTIONAL - Array of affected contractual obligations >>

# --- Knowledge Management ---
[knowledge_management]
runbook_updates_needed = [] # << OPTIONAL - Array of runbook updates required >>
knowledge_base_articles_created = [] # << OPTIONAL - Array of KB articles created >>
training_materials_updated = false # << OPTIONAL - Whether training materials were updated >>
best_practices_documented = [] # << OPTIONAL - Array of best practices documented >>
failure_patterns_catalogued = false # << OPTIONAL - Whether failure patterns were catalogued >>

# --- Integration Points ---
[system_integrations]
monitoring_system_updates = [] # << OPTIONAL - Array of monitoring system updates >>
alerting_rule_modifications = [] # << OPTIONAL - Array of alerting rule changes >>
dashboard_enhancements = [] # << OPTIONAL - Array of dashboard improvements >>
notification_workflow_updates = [] # << OPTIONAL - Array of notification workflow changes >>
external_system_coordination = [] # << OPTIONAL - Array of external system coordination needs >>

# --- Cost Analysis ---
[cost_analysis]
investigation_time_hours = 0.0 # << OPTIONAL - Hours spent on investigation >>
remediation_implementation_hours = 0.0 # << OPTIONAL - Hours spent implementing fixes >>
business_disruption_cost = 0.0 # << OPTIONAL - Estimated cost of business disruption >>
prevention_investment_required = 0.0 # << OPTIONAL - Investment needed for prevention >>
roi_of_prevention_measures = 0.0 # << OPTIONAL - ROI of implementing prevention measures >>

# --- Follow-up & Verification ---
[followup_verification]
fix_verification_completed = false # << OPTIONAL - Whether fixes were verified >>
fix_verification_date = "" # << OPTIONAL - ISO 8601 date of verification >>
regression_testing_performed = false # << OPTIONAL - Whether regression testing was done >>
monitoring_validation_completed = false # << OPTIONAL - Whether monitoring validation was done >>
stakeholder_signoff_received = false # << OPTIONAL - Whether stakeholder signoff was received >>

# --- Metadata & Tracking ---
created_by = "" # << REQUIRED - Who created this analysis record >>
created_date = "" # << REQUIRED - ISO 8601 timestamp of creation >>
updated_by = "" # << OPTIONAL - Who last updated this record >>
updated_date = "" # << OPTIONAL - ISO 8601 timestamp of last update >>
analysis_version = "1.0" # << OPTIONAL - Version of this analysis >>
source_system = "qms-cicd-enforcer" # << OPTIONAL - System that generated this analysis >>
tags = [] # << OPTIONAL - Array of relevant tags for categorization >>
related_analyses = [] # << OPTIONAL - Array of related failure analysis IDs >>
+++

# Pipeline Failure Analysis: [FAILURE_TYPE] - [TITLE]

## Executive Summary

**Incident ID:** [INCIDENT_ID]  
**Failure Type:** [FAILURE_TYPE]  
**Severity:** [SEVERITY_LEVEL]  
**Occurred At:** [OCCURRED_AT]  
**Pipeline:** [PIPELINE_ID] - Stage: [PIPELINE_STAGE]  
**Branch/Commit:** [BRANCH_NAME] @ [COMMIT_SHA]  
**Business Impact:** [BUSINESS_IMPACT_LEVEL]  
**Analysis Status:** [ANALYSIS_STATUS]  

## Incident Overview

### Timeline of Events
<!-- Detailed chronological timeline of the incident -->

### Initial Detection
**Detected At:** [DETECTED_AT]  
**Detection Method:** [DETECTION_METHOD]  
**Initial Symptoms:** [INITIAL_SYMPTOMS]  

### Impact Assessment
**Downtime Duration:** [TOTAL_DOWNTIME_MINUTES] minutes  
**Systems Affected:** [AFFECTED_SYSTEMS]  
**Users Impacted:** [USERS_IMPACTED]  
**Customer-Facing Impact:** [CUSTOMER_FACING_IMPACT]  

## Root Cause Analysis

### Methodology Used
**Analysis Approach:** [ANALYSIS_METHODOLOGY]  
**Investigation Team:** [INVESTIGATION_TEAM]  
**Analysis Duration:** [ANALYSIS_COMPLETION_TIME] hours  

### Primary Root Cause
**Root Cause:** [PRIMARY_ROOT_CAUSE]  
**Category:** [FAILURE_CATEGORY] / [FAILURE_SUBCATEGORY]  
**Preventable:** [PREVENTABILITY_ASSESSMENT]  

### Contributing Factors
<!-- Detailed analysis of all contributing factors -->

### 5 Whys Analysis
<!-- If applicable, document the 5 Whys analysis -->

### System State at Failure
<!-- Detailed analysis of system state, resource utilization, dependencies -->

## Technical Analysis

### Error Details
**Primary Error Messages:**
<!-- List all relevant error messages -->

**Stack Traces:**
<!-- Include relevant stack traces -->

**Log Analysis:**
<!-- Summary of log analysis findings -->

### Configuration Analysis
<!-- Analysis of configuration issues found -->

### Code Quality Assessment
<!-- Assessment of code quality issues -->

### Dependency Analysis
<!-- Analysis of dependency-related issues -->

## Failure Classification

**Category:** [FAILURE_CATEGORY]  
**Recurring Issue:** [RECURRING_FAILURE]  
**Similar Incidents:** [SIMILAR_INCIDENTS_COUNT] in last 90 days  
**Pattern Analysis:** [TREND_ANALYSIS]  

## Environmental Context

**Environment:** [DEPLOYMENT_ENVIRONMENT]  
**Infrastructure:** [INFRASTRUCTURE_PROVIDER]  
**Runner Type:** [RUNNER_TYPE]  
**Resource Constraints:** [RESOURCE_CONSTRAINTS]  
**External Dependencies:** [EXTERNAL_DEPENDENCIES]  

## Impact Analysis

### Business Impact
**Level:** [BUSINESS_IMPACT_LEVEL]  
**Revenue Impact:** $[REVENUE_IMPACT_ESTIMATED]  
**Customer Impact:** [CUSTOMER_FACING_IMPACT]  
**SLA Impact:** [SLA_IMPACT_ASSESSMENT]  

### Technical Impact
**Pipeline Blocked:** [PIPELINE_BLOCKED_DURATION] minutes  
**Developer Productivity:** [DEVELOPER_PRODUCTIVITY_IMPACT]  
**System Performance:** [SYSTEM_PERFORMANCE_IMPACT]  

## Remediation Actions

### Immediate Actions Taken
<!-- List all immediate actions taken to resolve the issue -->

### Short-term Fixes
<!-- List short-term fixes implemented -->

### Long-term Improvements
<!-- List long-term improvement actions planned -->

### Preventive Measures
<!-- List measures to prevent recurrence -->

## Action Items

### High Priority Actions
<!-- List high-priority action items -->

### Medium Priority Actions
<!-- List medium-priority action items -->

### Long-term Actions
<!-- List long-term action items -->

## Risk Assessment

**Likelihood of Recurrence:** [LIKELIHOOD_OF_RECURRENCE]  
**Potential Impact if Recurring:** [POTENTIAL_IMPACT_IF_RECURRING]  

### Mitigation Strategies
<!-- List risk mitigation strategies -->

### Early Warning Indicators
<!-- List indicators to monitor for early warning -->

### Monitoring Enhancements
<!-- List monitoring improvements implemented -->

## Process Improvements

### Process Gaps Identified
<!-- List process gaps found during analysis -->

### Automation Opportunities
<!-- List automation opportunities identified -->

### Tooling Improvements
<!-- List tooling improvements suggested -->

### Training Needs
<!-- List training needs identified -->

## Quality Assurance Review

**QA Review Completed:** [QA_REVIEW_COMPLETED]  
**QA Reviewer:** [QA_REVIEWER]  
**QA Approval Date:** [QA_APPROVAL_DATE]  

### QA Recommendations
<!-- List QA recommendations -->

### Testing Adequacy Assessment
<!-- Assessment of testing coverage and effectiveness -->

## Communication & Stakeholder Management

### Notifications Sent
<!-- List stakeholders notified and communication sent -->

### Incident Reports
<!-- List formal incident reports filed -->

### Customer Communications
<!-- Details of customer communications if applicable -->

### Post-mortem Planning
**Post-mortem Scheduled:** [POST_MORTEM_SCHEDULED]  
**Participants:** [POST_MORTEM_PARTICIPANTS]  
**Date:** [POST_MORTEM_DATE]  

## Lessons Learned

### Key Insights
<!-- Document key insights gained from analysis -->

### Best Practices
<!-- Document best practices identified -->

### Anti-patterns
<!-- Document anti-patterns to avoid -->

### Knowledge Sharing
<!-- Plan for sharing lessons learned across teams -->

## Compliance & Regulatory Considerations

**Regulatory Implications:** [REGULATORY_IMPLICATIONS]  
**Compliance Notifications Required:** [COMPLIANCE_NOTIFICATIONS_REQUIRED]  
**Audit Trail Maintained:** [AUDIT_TRAIL_MAINTAINED]  

## Cost Analysis

**Investigation Time:** [INVESTIGATION_TIME_HOURS] hours  
**Remediation Time:** [REMEDIATION_IMPLEMENTATION_HOURS] hours  
**Business Disruption Cost:** $[BUSINESS_DISRUPTION_COST]  
**Prevention Investment:** $[PREVENTION_INVESTMENT_REQUIRED]  
**Prevention ROI:** [ROI_OF_PREVENTION_MEASURES]%  

## Historical Context

**Similar Failures (30 days):** [SIMILAR_FAILURES_LAST_30_DAYS]  
**Similar Failures (90 days):** [SIMILAR_FAILURES_LAST_90_DAYS]  
**Trend Analysis:** [TREND_ANALYSIS]  
**Seasonal Patterns:** [SEASONAL_PATTERNS]  

## Follow-up & Verification

### Fix Verification
**Verification Completed:** [FIX_VERIFICATION_COMPLETED]  
**Verification Date:** [FIX_VERIFICATION_DATE]  
**Regression Testing:** [REGRESSION_TESTING_PERFORMED]  

### Monitoring Validation
**Monitoring Validated:** [MONITORING_VALIDATION_COMPLETED]  
**Alerting Tested:** [ALERTING_TESTED]  
**Dashboard Updated:** [DASHBOARD_UPDATED]  

### Stakeholder Signoff
**Signoff Received:** [STAKEHOLDER_SIGNOFF_RECEIVED]  
**Signoff Date:** [SIGNOFF_DATE]  
**Outstanding Issues:** [OUTSTANDING_ISSUES]  

## Knowledge Management Updates

### Documentation Updates
**Runbooks Updated:** [RUNBOOK_UPDATES_COMPLETED]  
**KB Articles Created:** [KNOWLEDGE_BASE_ARTICLES_CREATED]  
**Training Materials Updated:** [TRAINING_MATERIALS_UPDATED]  

### Process Documentation
**Process Updates:** [PROCESS_DOCUMENTATION_UPDATED]  
**Best Practices Documented:** [BEST_PRACTICES_DOCUMENTED]  
**Failure Patterns Catalogued:** [FAILURE_PATTERNS_CATALOGUED]  

## Appendices

### A. Technical Logs
<!-- Attach relevant technical logs -->

### B. Error Messages
<!-- Complete error messages and stack traces -->

### C. Configuration Files
<!-- Relevant configuration files -->

### D. Monitoring Screenshots
<!-- Screenshots from monitoring systems -->

### E. Communication Records
<!-- Records of communications sent -->

### F. Action Item Tracking
<!-- Detailed action item tracking -->

---

**Analysis Completed:** [CREATED_DATE] by [CREATED_BY]  
**Last Updated:** [UPDATED_DATE] by [UPDATED_BY]  
**Analysis Version:** [ANALYSIS_VERSION]  
**Next Review Date:** [NEXT_REVIEW_DATE]