+++
# --- Template Metadata ---
template_id = "25_qms_standards_review"
template_name = "QMS Standards Review"
template_version = "1.0.0"
template_description = "Template for comprehensive QMS standards compliance review reports and assessments"
template_category = "qms"
template_subcategory = "standards"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS modes to document standards compliance reviews, assessments, and recommendations"

# --- Core Review Metadata ---
id = "" # << REQUIRED - Unique review ID (e.g., QMS-STD-REV-20250816-001) >>
title = "" # << REQUIRED - Clear, descriptive title >>
review_type = "" # << REQUIRED - Options: "compliance", "audit", "assessment", "validation" >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "medium" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
reviewed_by = "" # << REQUIRED - QMS mode slug (e.g., qms-coding-standards) >>
review_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Standards Context ---
standards_framework = "" # << REQUIRED - Framework being reviewed (e.g., OWASP, ISO-27001, NIST) >>
standards_version = "" # << OPTIONAL - Specific version if applicable >>
scope = [] # << REQUIRED - Array of components/areas being reviewed >>
components_reviewed = [] # << OPTIONAL - Specific files/modules/systems >>
exclusions = [] # << OPTIONAL - Items explicitly excluded from review >>

# --- Review Configuration ---
review_methodology = "" # << REQUIRED - Approach used (e.g., automated, manual, hybrid) >>
tools_used = [] # << OPTIONAL - Array of tools/scanners used >>
review_depth = "standard" # << OPTIONAL - Options: "surface", "standard", "deep", "comprehensive" >>
automated_checks = true # << OPTIONAL - Whether automated checks were performed >>
manual_validation = true # << OPTIONAL - Whether manual validation was performed >>

# --- Compliance Tracking ---
[compliance_summary]
total_checks = 0 # << REQUIRED - Total number of standards checks performed >>
passed_checks = 0 # << REQUIRED - Number of checks that passed >>
failed_checks = 0 # << REQUIRED - Number of checks that failed >>
warning_checks = 0 # << OPTIONAL - Number of checks with warnings >>
skipped_checks = 0 # << OPTIONAL - Number of checks skipped >>
compliance_percentage = 0.0 # << REQUIRED - Overall compliance percentage >>

# --- Risk Assessment ---
[risk_analysis]
critical_violations = 0 # << REQUIRED - Number of critical violations found >>
high_risk_items = 0 # << REQUIRED - Number of high-risk violations >>
medium_risk_items = 0 # << REQUIRED - Number of medium-risk violations >>
low_risk_items = 0 # << REQUIRED - Number of low-risk violations >>
overall_risk_level = "medium" # << REQUIRED - Options: "critical", "high", "medium", "low" >>

# --- Related Context ---
related_reviews = [] # << OPTIONAL - Array of related review IDs >>
related_violations = [] # << OPTIONAL - Array of related violation tracking IDs >>
baseline_review = "" # << OPTIONAL - Previous baseline review for comparison >>
follow_up_required = false # << OPTIONAL - Whether follow-up review is needed >>
next_review_date = "" # << OPTIONAL - Scheduled next review date >>

# --- Documentation References ---
standards_documents = [] # << OPTIONAL - Array of standards documents referenced >>
evidence_files = [] # << OPTIONAL - Array of evidence/artifact file paths >>
external_references = [] # << OPTIONAL - Array of external documentation URLs >>

# --- Assignment & Tracking ---
assigned_team = [] # << OPTIONAL - Array of team members/modes involved >>
reviewers = [] # << OPTIONAL - Array of reviewers/validators >>
approvers = [] # << OPTIONAL - Array of approvers required >>
tags = [] # << OPTIONAL - Array of relevant tags >>
+++

# QMS Standards Review Report

## Executive Summary

### Review Overview
- **Review ID**: {{id}}
- **Standards Framework**: {{standards_framework}}
- **Review Type**: {{review_type}}
- **Overall Compliance**: {{compliance_summary.compliance_percentage}}%
- **Risk Level**: {{risk_analysis.overall_risk_level}}

### Key Findings
<!-- Provide a high-level summary of the most important findings -->

## Standards Compliance Assessment

### Compliance Summary
- **Total Checks Performed**: {{compliance_summary.total_checks}}
- **Passed**: {{compliance_summary.passed_checks}} ({{(compliance_summary.passed_checks / compliance_summary.total_checks * 100) | round(1)}}%)
- **Failed**: {{compliance_summary.failed_checks}} ({{(compliance_summary.failed_checks / compliance_summary.total_checks * 100) | round(1)}}%)
- **Warnings**: {{compliance_summary.warning_checks}}
- **Skipped**: {{compliance_summary.skipped_checks}}

### Risk Analysis
- **Critical Violations**: {{risk_analysis.critical_violations}}
- **High Risk**: {{risk_analysis.high_risk_items}}
- **Medium Risk**: {{risk_analysis.medium_risk_items}}
- **Low Risk**: {{risk_analysis.low_risk_items}}

## Detailed Findings

### ✅ Compliant Areas
<!-- List areas that fully comply with standards -->
- [ ] Area 1: [Description]
- [ ] Area 2: [Description]

### ❌ Non-Compliant Areas
<!-- List areas with standards violations -->
- [ ] **Critical**: [Description of critical violation]
  - **Standard**: [Specific standard reference]
  - **Impact**: [Business/security impact]
  - **Recommendation**: [Immediate action required]

- [ ] **High**: [Description of high-risk violation]
  - **Standard**: [Specific standard reference]
  - **Impact**: [Business/security impact]
  - **Recommendation**: [Action required]

### ⚠️ Warning Areas
<!-- List areas with warnings or potential issues -->
- [ ] **Warning**: [Description of warning]
  - **Standard**: [Specific standard reference]
  - **Recommendation**: [Suggested improvement]

## Framework-Specific Analysis

### {{standards_framework}} Compliance
<!-- Detailed analysis specific to the standards framework -->

#### Core Requirements
- [ ] Requirement 1: Status and findings
- [ ] Requirement 2: Status and findings
- [ ] Requirement 3: Status and findings

#### Implementation Gaps
<!-- Identify specific gaps in implementation -->

## Remediation Plan

### Immediate Actions Required (Critical/High Risk)
1. **[Action Item 1]**
   - **Priority**: Critical
   - **Timeline**: [Specific deadline]
   - **Owner**: [Responsible party]
   - **Resources**: [Required resources]

2. **[Action Item 2]**
   - **Priority**: High
   - **Timeline**: [Specific deadline]
   - **Owner**: [Responsible party]
   - **Resources**: [Required resources]

### Medium-Term Improvements
1. **[Improvement Item 1]**
   - **Priority**: Medium
   - **Timeline**: [Target completion]
   - **Owner**: [Responsible party]

### Long-Term Strategic Enhancements
1. **[Enhancement Item 1]**
   - **Priority**: Low/Strategic
   - **Timeline**: [Target completion]
   - **Owner**: [Responsible party]

## Quality Gates & Controls

### Automated Controls
<!-- List automated controls and their effectiveness -->
- [ ] Control 1: [Status and effectiveness]
- [ ] Control 2: [Status and effectiveness]

### Manual Controls
<!-- List manual controls and their effectiveness -->
- [ ] Control 1: [Status and effectiveness]
- [ ] Control 2: [Status and effectiveness]

### Recommended New Controls
<!-- Suggest additional controls to improve compliance -->

## Evidence & Documentation

### Compliance Evidence
<!-- Links to evidence supporting compliance findings -->
- [Evidence file 1]({{evidence_files[0]}})
- [Evidence file 2]({{evidence_files[1]}})

### Standards Documentation
<!-- References to relevant standards documents -->
- [{{standards_documents[0]}}]({{external_references[0]}})

### Test Results
<!-- Results from automated and manual testing -->

## Recommendations

### Strategic Recommendations
1. **[Strategic Recommendation 1]**
   - **Rationale**: [Why this is important]
   - **Impact**: [Expected benefits]
   - **Timeline**: [Implementation timeframe]

### Operational Recommendations
1. **[Operational Recommendation 1]**
   - **Rationale**: [Why this is needed]
   - **Impact**: [Expected improvements]
   - **Timeline**: [Implementation timeframe]

### Technology Recommendations
1. **[Technology Recommendation 1]**
   - **Rationale**: [Technical justification]
   - **Impact**: [Expected benefits]
   - **Timeline**: [Implementation timeframe]

## Follow-Up Actions

### Next Review Schedule
- **Next Review Date**: {{next_review_date}}
- **Review Type**: [Scheduled review type]
- **Focus Areas**: [Areas requiring focused attention]

### Monitoring & Tracking
- **Violation Tracking**: [Reference to violation tracking documents]
- **Progress Metrics**: [Key metrics to monitor]
- **Reporting Schedule**: [Regular reporting cadence]

## Appendices

### Appendix A: Detailed Test Results
<!-- Comprehensive test results and data -->

### Appendix B: Standards Mapping
<!-- Mapping of requirements to implementation -->

### Appendix C: Tool Configurations
<!-- Details of tools and configurations used -->

---

**Review Completed**: {{completion_date || "In Progress"}}  
**Reviewed By**: {{reviewed_by}}  
**Review Methodology**: {{review_methodology}}  
**Tools Used**: {{tools_used | join(", ")}}