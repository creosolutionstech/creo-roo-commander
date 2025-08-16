+++
# --- Template Metadata ---
template_id = "26_qms_standards_violation"
template_name = "QMS Standards Violation"
template_version = "1.0.0"
template_description = "Template for tracking, documenting, and managing QMS standards violations and their remediation"
template_category = "qms"
template_subcategory = "standards"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS modes to track individual standards violations, remediation progress, and compliance status"

# --- Core Violation Metadata ---
id = "" # << REQUIRED - Unique violation ID (e.g., QMS-VIOL-20250816-001) >>
title = "" # << REQUIRED - Clear, concise violation description >>
violation_type = "compliance" # << REQUIRED - Options: "compliance", "security", "quality", "process", "documentation" >>
severity = "medium" # << REQUIRED - Options: "critical", "high", "medium", "low" >>
status = "🔴 Open" # << REQUIRED - Status indicator >>
priority = "medium" # << REQUIRED - Remediation priority: "critical", "high", "medium", "low" >>
discovered_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
target_resolution_date = "" # << OPTIONAL - Target remediation date >>
actual_resolution_date = "" # << OPTIONAL - Actual resolution date >>

# --- Standards Context ---
standards_framework = "" # << REQUIRED - Framework violated (e.g., OWASP, ISO-27001, NIST) >>
standards_version = "" # << OPTIONAL - Specific version if applicable >>
requirement_id = "" # << REQUIRED - Specific requirement/control ID >>
requirement_title = "" # << REQUIRED - Title of the violated requirement >>
compliance_category = "" # << OPTIONAL - Category within the framework >>

# --- Discovery Context ---
discovered_by = "" # << REQUIRED - QMS mode or person who found the violation >>
discovery_method = "automated" # << REQUIRED - Options: "automated", "manual", "audit", "review", "incident" >>
discovery_tool = "" # << OPTIONAL - Tool used for discovery if automated >>
related_review_id = "" # << OPTIONAL - Related review document ID >>
parent_assessment_id = "" # << OPTIONAL - Parent assessment or audit ID >>

# --- Violation Details ---
[violation_details]
affected_components = [] # << REQUIRED - Array of affected files/systems/components >>
violation_description = "" # << REQUIRED - Detailed description of the violation >>
evidence_location = [] # << OPTIONAL - Array of paths to evidence files >>
root_cause = "" # << OPTIONAL - Identified root cause >>
business_impact = "" # << REQUIRED - Impact on business/operations >>
technical_impact = "" # << REQUIRED - Technical consequences >>
security_implications = "" # << OPTIONAL - Security-related implications >>
compliance_gap = "" # << REQUIRED - What compliance requirement is not met >>

# --- Risk Assessment ---
[risk_assessment]
likelihood = "medium" # << REQUIRED - Options: "very_low", "low", "medium", "high", "very_high" >>
impact = "medium" # << REQUIRED - Options: "very_low", "low", "medium", "high", "very_high" >>
risk_score = 0.0 # << REQUIRED - Calculated risk score (0.0-10.0) >>
risk_level = "medium" # << REQUIRED - Overall risk level: "critical", "high", "medium", "low" >>
exploitability = "medium" # << OPTIONAL - How easily exploitable: "very_low", "low", "medium", "high", "very_high" >>
regulatory_risk = false # << OPTIONAL - Whether this poses regulatory compliance risk >>

# --- Remediation Plan ---
[remediation]
assigned_to = "" # << OPTIONAL - Person/team responsible for remediation >>
remediation_approach = "" # << REQUIRED - High-level approach to fix >>
estimated_effort = "" # << OPTIONAL - Effort estimate (hours/days/story points) >>
dependencies = [] # << OPTIONAL - Array of dependencies that must be resolved >>
blocking_issues = [] # << OPTIONAL - Array of issues blocking remediation >>
verification_method = "" # << REQUIRED - How the fix will be verified >>
testing_required = true # << OPTIONAL - Whether testing is required >>
documentation_updates = [] # << OPTIONAL - Documentation that needs updates >>

# --- Progress Tracking ---
[progress]
remediation_status = "not_started" # << REQUIRED - Options: "not_started", "in_progress", "testing", "verification", "completed", "deferred", "risk_accepted" >>
completion_percentage = 0 # << REQUIRED - Percentage complete (0-100) >>
last_updated = "" # << REQUIRED - ISO format date of last progress update >>
next_milestone = "" # << OPTIONAL - Next milestone or checkpoint >>
milestone_date = "" # << OPTIONAL - Target date for next milestone >>
work_log = [] # << OPTIONAL - Array of work log entries with dates and descriptions >>

# --- Validation & Verification ---
[validation]
fix_validated = false # << REQUIRED - Whether the fix has been validated >>
validation_date = "" # << OPTIONAL - Date of validation >>
validated_by = "" # << OPTIONAL - Who performed the validation >>
validation_method = "" # << OPTIONAL - Method used for validation >>
validation_evidence = [] # << OPTIONAL - Array of validation evidence files >>
retest_required = false # << OPTIONAL - Whether retesting is needed >>
regression_testing = false # << OPTIONAL - Whether regression testing was performed >>

# --- Related Context ---
related_violations = [] # << OPTIONAL - Array of related violation IDs >>
duplicate_of = "" # << OPTIONAL - If this is a duplicate, reference to original >>
blocks = [] # << OPTIONAL - Array of violation IDs this blocks >>
blocked_by = [] # << OPTIONAL - Array of violation IDs that block this >>
parent_epic = "" # << OPTIONAL - Parent epic or initiative if applicable >>
child_tasks = [] # << OPTIONAL - Array of child task/violation IDs >>

# --- Communication & Reporting ---
[communication]
stakeholders_notified = [] # << OPTIONAL - Array of stakeholders who were notified >>
escalation_required = false # << OPTIONAL - Whether escalation is needed >>
escalated_to = "" # << OPTIONAL - Who the issue was escalated to >>
customer_impact = false # << OPTIONAL - Whether customers are impacted >>
external_reporting = false # << OPTIONAL - Whether external reporting is required >>
regulatory_notification = false # << OPTIONAL - Whether regulatory bodies need notification >>

# --- Documentation References ---
evidence_files = [] # << OPTIONAL - Array of evidence file paths >>
remediation_docs = [] # << OPTIONAL - Array of remediation documentation paths >>
test_results = [] # << OPTIONAL - Array of test result file paths >>
external_references = [] # << OPTIONAL - Array of external reference URLs >>
regulatory_docs = [] # << OPTIONAL - Array of regulatory document references >>

# --- Assignment & Tracking ---
assigned_team = [] # << OPTIONAL - Array of team members involved >>
reviewers = [] # << OPTIONAL - Array of reviewers for the remediation >>
approvers = [] # << OPTIONAL - Array of approvers required >>
tags = [] # << OPTIONAL - Array of relevant tags >>
+++

# QMS Standards Violation Report

## Violation Summary

### Basic Information
- **Violation ID**: {{id}}
- **Title**: {{title}}
- **Severity**: {{severity}} | **Priority**: {{priority}} | **Status**: {{status}}
- **Standards Framework**: {{standards_framework}}
- **Requirement**: {{requirement_id}} - {{requirement_title}}
- **Discovered**: {{discovered_date}} by {{discovered_by}}

### Risk Assessment
- **Risk Level**: {{risk_assessment.risk_level}}
- **Risk Score**: {{risk_assessment.risk_score}}/10.0
- **Likelihood**: {{risk_assessment.likelihood}} | **Impact**: {{risk_assessment.impact}}

## Violation Details

### Description
{{violation_details.violation_description}}

### Affected Components
{{#each violation_details.affected_components}}
- {{this}}
{{/each}}

### Compliance Gap
**What is not compliant**: {{violation_details.compliance_gap}}

**Business Impact**: {{violation_details.business_impact}}

**Technical Impact**: {{violation_details.technical_impact}}

{{#if violation_details.security_implications}}
**Security Implications**: {{violation_details.security_implications}}
{{/if}}

### Root Cause Analysis
{{#if violation_details.root_cause}}
**Root Cause**: {{violation_details.root_cause}}
{{else}}
*Root cause analysis pending*
{{/if}}

## Standards Framework Analysis

### {{standards_framework}} Requirement Details
- **Framework Version**: {{standards_version || "Latest"}}
- **Requirement ID**: {{requirement_id}}
- **Requirement Title**: {{requirement_title}}
- **Compliance Category**: {{compliance_category || "Not specified"}}

### Specific Violations
<!-- Detail how this violation specifically conflicts with the standard -->

#### What the Standard Requires
<!-- Describe what the standard expects -->

#### Current Implementation Gap
<!-- Describe what is currently missing or incorrect -->

#### Compliance Implications
<!-- Explain the compliance consequences -->

## Risk Analysis

### Risk Matrix
| Factor | Level | Score | Justification |
|--------|-------|-------|---------------|
| Likelihood | {{risk_assessment.likelihood}} | {{risk_assessment.likelihood_score || "TBD"}} | [Why this likelihood level?] |
| Impact | {{risk_assessment.impact}} | {{risk_assessment.impact_score || "TBD"}} | [Why this impact level?] |
| **Overall** | **{{risk_assessment.risk_level}}** | **{{risk_assessment.risk_score}}** | **Combined assessment** |

### Risk Factors
{{#if risk_assessment.exploitability}}
- **Exploitability**: {{risk_assessment.exploitability}}
{{/if}}
{{#if risk_assessment.regulatory_risk}}
- **Regulatory Risk**: Yes - Potential regulatory compliance issues
{{/if}}

### Business Risk Assessment
<!-- Assess the broader business risk implications -->

## Remediation Plan

### Approach
**Strategy**: {{remediation.remediation_approach}}

{{#if remediation.estimated_effort}}
**Estimated Effort**: {{remediation.estimated_effort}}
{{/if}}

### Implementation Steps
1. **Step 1**: [First remediation step]
   - **Owner**: [Responsible party]
   - **Timeline**: [Target completion]
   - **Dependencies**: [Any dependencies]

2. **Step 2**: [Second remediation step]
   - **Owner**: [Responsible party]
   - **Timeline**: [Target completion]
   - **Dependencies**: [Any dependencies]

<!-- Add more steps as needed -->

### Dependencies & Blockers
{{#if remediation.dependencies}}
**Dependencies**:
{{#each remediation.dependencies}}
- {{this}}
{{/each}}
{{/if}}

{{#if remediation.blocking_issues}}
**Blocking Issues**:
{{#each remediation.blocking_issues}}
- {{this}}
{{/each}}
{{/if}}

### Verification Plan
**Verification Method**: {{remediation.verification_method}}

{{#if remediation.testing_required}}
**Testing Requirements**:
- [ ] Unit testing
- [ ] Integration testing
- [ ] Security testing
- [ ] Compliance validation
{{/if}}

### Documentation Updates
{{#if remediation.documentation_updates}}
**Required Documentation Updates**:
{{#each remediation.documentation_updates}}
- {{this}}
{{/each}}
{{/if}}

## Progress Tracking

### Current Status
- **Status**: {{progress.remediation_status}}
- **Completion**: {{progress.completion_percentage}}%
- **Last Updated**: {{progress.last_updated}}

{{#if progress.next_milestone}}
### Next Milestone
- **Milestone**: {{progress.next_milestone}}
- **Target Date**: {{progress.milestone_date}}
{{/if}}

### Work Log
{{#if progress.work_log}}
{{#each progress.work_log}}
- **{{this.date}}**: {{this.description}}
{{/each}}
{{else}}
*No work log entries yet*
{{/if}}

### Timeline
- **Discovered**: {{discovered_date}}
- **Target Resolution**: {{target_resolution_date || "TBD"}}
- **Actual Resolution**: {{actual_resolution_date || "Pending"}}

## Validation & Verification

### Validation Status
- **Fix Validated**: {{#if validation.fix_validated}}✅ Yes{{else}}❌ No{{/if}}
{{#if validation.validation_date}}
- **Validation Date**: {{validation.validation_date}}
- **Validated By**: {{validation.validated_by}}
- **Validation Method**: {{validation.validation_method}}
{{/if}}

### Testing Results
{{#if validation.regression_testing}}
- **Regression Testing**: ✅ Completed
{{/if}}
{{#if validation.retest_required}}
- **Retest Required**: ⚠️ Yes
{{/if}}

### Evidence
{{#if validation.validation_evidence}}
**Validation Evidence**:
{{#each validation.validation_evidence}}
- [{{this}}]({{this}})
{{/each}}
{{/if}}

## Communication & Stakeholders

### Notification Status
{{#if communication.stakeholders_notified}}
**Stakeholders Notified**:
{{#each communication.stakeholders_notified}}
- {{this}}
{{/each}}
{{/if}}

### Escalation
{{#if communication.escalation_required}}
- **Escalation Required**: ⚠️ Yes
{{#if communication.escalated_to}}
- **Escalated To**: {{communication.escalated_to}}
{{/if}}
{{/if}}

### External Reporting
{{#if communication.external_reporting}}
- **External Reporting**: ⚠️ Required
{{/if}}
{{#if communication.regulatory_notification}}
- **Regulatory Notification**: ⚠️ Required
{{/if}}
{{#if communication.customer_impact}}
- **Customer Impact**: ⚠️ Yes
{{/if}}

## Related Items

### Related Violations
{{#if related_violations}}
{{#each related_violations}}
- [{{this}}] - Related violation
{{/each}}
{{/if}}

### Blocking Relationships
{{#if blocks}}
**This violation blocks**:
{{#each blocks}}
- [{{this}}] - Blocked violation
{{/each}}
{{/if}}

{{#if blocked_by}}
**This violation is blocked by**:
{{#each blocked_by}}
- [{{this}}] - Blocking violation
{{/each}}
{{/if}}

### Parent/Child Relationships
{{#if parent_epic}}
**Parent Epic**: [{{parent_epic}}]
{{/if}}

{{#if child_tasks}}
**Child Tasks**:
{{#each child_tasks}}
- [{{this}}] - Child task
{{/each}}
{{/if}}

## Evidence & Documentation

### Evidence Files
{{#if evidence_files}}
{{#each evidence_files}}
- [Evidence {{@index}}]({{this}}) - Supporting evidence
{{/each}}
{{/if}}

### Remediation Documentation
{{#if remediation_docs}}
{{#each remediation_docs}}
- [{{this}}]({{this}}) - Remediation documentation
{{/each}}
{{/if}}

### Test Results
{{#if test_results}}
{{#each test_results}}
- [{{this}}]({{this}}) - Test results
{{/each}}
{{/if}}

### External References
{{#if external_references}}
{{#each external_references}}
- [External Reference {{@index}}]({{this}})
{{/each}}
{{/if}}

## Action Items

### Immediate Actions
- [ ] **[Action 1]** - [Description] (Owner: [Name], Due: [Date])
- [ ] **[Action 2]** - [Description] (Owner: [Name], Due: [Date])

### Follow-up Actions
- [ ] **[Follow-up 1]** - [Description] (Owner: [Name], Due: [Date])
- [ ] **[Follow-up 2]** - [Description] (Owner: [Name], Due: [Date])

### Long-term Actions
- [ ] **[Long-term 1]** - [Description] (Owner: [Name], Due: [Date])

## Lessons Learned

### What Went Wrong
<!-- Analysis of how this violation occurred -->

### Prevention Measures
<!-- What can be done to prevent similar violations -->

### Process Improvements
<!-- Recommendations for process improvements -->

---

**Violation Created**: {{discovered_date}}  
**Last Updated**: {{progress.last_updated}}  
**Discovered By**: {{discovered_by}}  
**Current Owner**: {{remediation.assigned_to || "Unassigned"}}  
**Priority**: {{priority}} | **Severity**: {{severity}}