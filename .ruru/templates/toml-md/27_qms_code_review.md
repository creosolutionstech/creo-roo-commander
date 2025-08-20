+++
# --- Template Metadata ---
template_id = "27_qms_code_review"
template_name = "QMS Code Review"
template_version = "1.0.0"
template_description = "Template for comprehensive QMS-driven code review reports and assessments"
template_category = "qms"
template_subcategory = "review"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS code review modes to document code review findings, quality assessments, and improvement recommendations"

# --- Core Review Metadata ---
id = "" # << REQUIRED - Unique review ID (e.g., QMS-CR-20250816-001) >>
title = "" # << REQUIRED - Clear, descriptive title >>
review_type = "code_review" # << REQUIRED - Fixed value for code reviews >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "medium" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
reviewed_by = "" # << REQUIRED - QMS mode slug (e.g., qms-code-reviewer) >>
review_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Code Context ---
repository = "" # << REQUIRED - Repository name or path >>
branch = "" # << REQUIRED - Branch being reviewed >>
commit_hash = "" # << OPTIONAL - Specific commit hash >>
pull_request_id = "" # << OPTIONAL - PR/MR identifier >>
scope = [] # << REQUIRED - Array of files/directories being reviewed >>
exclusions = [] # << OPTIONAL - Items explicitly excluded from review >>

# --- Review Configuration ---
review_depth = "standard" # << OPTIONAL - Options: "surface", "standard", "deep", "comprehensive" >>
automated_checks = true # << OPTIONAL - Whether automated checks were performed >>
manual_review = true # << OPTIONAL - Whether manual review was performed >>
tools_used = [] # << OPTIONAL - Array of tools/linters used >>
standards_applied = [] # << REQUIRED - Array of coding standards applied >>

# --- Quality Metrics ---
[quality_metrics]
total_files_reviewed = 0 # << REQUIRED - Number of files reviewed >>
lines_of_code = 0 # << REQUIRED - Total lines of code reviewed >>
complexity_score = 0.0 # << OPTIONAL - Average complexity score >>
maintainability_index = 0.0 # << OPTIONAL - Maintainability score >>
test_coverage = 0.0 # << OPTIONAL - Code coverage percentage >>

# --- Issues Summary ---
[issues_summary]
critical_issues = 0 # << REQUIRED - Number of critical issues found >>
major_issues = 0 # << REQUIRED - Number of major issues >>
minor_issues = 0 # << REQUIRED - Number of minor issues >>
suggestions = 0 # << REQUIRED - Number of improvement suggestions >>
total_issues = 0 # << REQUIRED - Total number of issues >>

# --- Compliance Assessment ---
[compliance_status]
coding_standards_compliant = true # << REQUIRED - Whether code meets coding standards >>
security_review_passed = true # << REQUIRED - Whether security review passed >>
performance_acceptable = true # << REQUIRED - Whether performance is acceptable >>
documentation_adequate = true # << REQUIRED - Whether documentation is adequate >>
test_coverage_sufficient = true # << REQUIRED - Whether test coverage is sufficient >>

# --- Related Context ---
related_reviews = [] # << OPTIONAL - Array of related review IDs >>
parent_feature_id = "" # << OPTIONAL - Related feature or epic ID >>
follow_up_required = false # << OPTIONAL - Whether follow-up review is needed >>
baseline_comparison = "" # << OPTIONAL - Previous baseline for comparison >>

# --- Documentation References ---
requirements_docs = [] # << OPTIONAL - Array of requirements document paths >>
design_docs = [] # << OPTIONAL - Array of design document paths >>
api_docs = [] # << OPTIONAL - Array of API documentation paths >>
external_references = [] # << OPTIONAL - Array of external documentation URLs >>

# --- Assignment & Tracking ---
reviewers = [] # << OPTIONAL - Array of human reviewers >>
approvers = [] # << OPTIONAL - Array of required approvers >>
assignee = "" # << OPTIONAL - Developer responsible for addressing issues >>
tags = [] # << OPTIONAL - Array of relevant tags >>
+++

# QMS Code Review Report

## Executive Summary

### Review Overview
- **Review ID**: {{id}}
- **Repository**: {{repository}}
- **Branch**: {{branch}}
- **Review Type**: {{review_type}}
- **Overall Quality Score**: {{(100 - (issues_summary.critical_issues * 10 + issues_summary.major_issues * 5 + issues_summary.minor_issues * 2)) | round(1)}}%
- **Compliance Status**: {{compliance_status.coding_standards_compliant and compliance_status.security_review_passed and compliance_status.performance_acceptable and compliance_status.documentation_adequate and compliance_status.test_coverage_sufficient}}

### Key Findings
<!-- Provide a high-level summary of the most important findings -->

## Code Quality Assessment

### Quality Metrics
- **Files Reviewed**: {{quality_metrics.total_files_reviewed}}
- **Lines of Code**: {{quality_metrics.lines_of_code}}
- **Complexity Score**: {{quality_metrics.complexity_score}}
- **Maintainability Index**: {{quality_metrics.maintainability_index}}
- **Test Coverage**: {{quality_metrics.test_coverage}}%

### Issues Summary
- **Critical**: {{issues_summary.critical_issues}}
- **Major**: {{issues_summary.major_issues}}
- **Minor**: {{issues_summary.minor_issues}}
- **Suggestions**: {{issues_summary.suggestions}}
- **Total Issues**: {{issues_summary.total_issues}}

## Detailed Findings

### 🚨 Critical Issues
<!-- List critical issues that must be addressed before merge -->
- [ ] **Critical**: [Description of critical issue]
  - **File**: [Path to file]
  - **Line**: [Line number(s)]
  - **Impact**: [Business/technical impact]
  - **Recommendation**: [Immediate action required]

### ⚠️ Major Issues
<!-- List major issues that should be addressed -->
- [ ] **Major**: [Description of major issue]
  - **File**: [Path to file]
  - **Line**: [Line number(s)]
  - **Impact**: [Business/technical impact]
  - **Recommendation**: [Action required]

### 🔧 Minor Issues
<!-- List minor issues and improvements -->
- [ ] **Minor**: [Description of minor issue]
  - **File**: [Path to file]
  - **Line**: [Line number(s)]
  - **Recommendation**: [Suggested improvement]

### 💡 Suggestions
<!-- List improvement suggestions -->
- [ ] **Suggestion**: [Description of suggestion]
  - **File**: [Path to file]
  - **Rationale**: [Why this would be beneficial]
  - **Priority**: [Low/Medium/High]

## Standards Compliance

### Coding Standards
- [ ] **Code Style**: Consistent with project standards
- [ ] **Naming Conventions**: Follows established patterns
- [ ] **Code Organization**: Proper structure and separation
- [ ] **Comments**: Adequate and meaningful documentation

### Security Review
- [ ] **Input Validation**: Proper validation of inputs
- [ ] **Authentication**: Secure authentication handling
- [ ] **Authorization**: Appropriate access controls
- [ ] **Data Handling**: Safe data processing and storage

### Performance Assessment
- [ ] **Algorithm Efficiency**: Optimal algorithmic choices
- [ ] **Resource Usage**: Efficient memory and CPU usage
- [ ] **Database Queries**: Optimized data access patterns
- [ ] **Caching Strategy**: Appropriate use of caching

## Testing Assessment

### Test Coverage Analysis
- **Coverage Percentage**: {{quality_metrics.test_coverage}}%
- **Critical Paths Tested**: [Assessment]
- **Edge Cases Covered**: [Assessment]
- **Integration Tests**: [Assessment]

### Test Quality
- [ ] **Unit Tests**: Comprehensive and well-structured
- [ ] **Integration Tests**: Adequate coverage of interactions
- [ ] **Error Handling**: Proper testing of error conditions
- [ ] **Performance Tests**: Load and stress testing where applicable

## Documentation Review

### Code Documentation
- [ ] **Inline Comments**: Adequate explanation of complex logic
- [ ] **Function Documentation**: Clear API documentation
- [ ] **README Updates**: Project documentation updated
- [ ] **Architecture Documentation**: Design decisions documented

### API Documentation
- [ ] **Endpoint Documentation**: Complete API specification
- [ ] **Parameter Documentation**: Clear input/output definitions
- [ ] **Example Usage**: Practical examples provided
- [ ] **Error Codes**: Error handling documented

## Remediation Plan

### Immediate Actions Required (Critical Issues)
1. **[Critical Issue 1]**
   - **Action**: [Specific action required]
   - **Timeline**: [Immediate/Within 24 hours]
   - **Owner**: [Responsible person]
   - **Blocking**: [What this blocks]

### Short-Term Improvements (Major Issues)
1. **[Major Issue 1]**
   - **Action**: [Specific action required]
   - **Timeline**: [Within this sprint/week]
   - **Owner**: [Responsible person]
   - **Priority**: High

### Long-Term Enhancements (Minor Issues & Suggestions)
1. **[Enhancement Item 1]**
   - **Action**: [Specific improvement]
   - **Timeline**: [Future sprint/release]
   - **Owner**: [Responsible person]
   - **Priority**: [Low/Medium]

## Quality Gates

### Merge Criteria
- [ ] All critical issues resolved
- [ ] Major issues addressed or approved exceptions
- [ ] Security review passed
- [ ] Performance benchmarks met
- [ ] Test coverage meets minimum threshold ({{project.minimum_coverage || 80}}%)
- [ ] Documentation updated

### Post-Merge Actions
- [ ] Monitor performance metrics
- [ ] Track error rates
- [ ] Validate user acceptance
- [ ] Schedule follow-up review if needed

## Recommendations

### Immediate Recommendations
1. **[Immediate Recommendation 1]**
   - **Rationale**: [Why this is important]
   - **Impact**: [Expected benefits]
   - **Effort**: [Implementation complexity]

### Process Improvements
1. **[Process Improvement 1]**
   - **Current Gap**: [What's missing in current process]
   - **Proposed Solution**: [How to improve]
   - **Benefits**: [Expected improvements]

### Tool & Automation Suggestions
1. **[Tool/Automation Suggestion 1]**
   - **Tool**: [Specific tool or automation]
   - **Use Case**: [What it would help with]
   - **ROI**: [Return on investment]

## Appendices

### Appendix A: Automated Check Results
<!-- Results from linters, static analysis tools, etc. -->

### Appendix B: Performance Metrics
<!-- Performance benchmarks and analysis -->

### Appendix C: Security Scan Results
<!-- Security analysis results -->

---

**Review Completed**: {{completion_date || "In Progress"}}  
**Reviewed By**: {{reviewed_by}}  
**Review Depth**: {{review_depth}}  
**Tools Used**: {{tools_used | join(", ")}}  
**Standards Applied**: {{standards_applied | join(", ")}}