+++
# --- Template Metadata ---
template_id = "28_qms_dod_dor_validation"
template_name = "QMS DoD/DoR Validation"
template_version = "1.0.0"
template_description = "Template for validating Definition of Done (DoD) and Definition of Ready (DoR) criteria compliance"
template_category = "qms"
template_subcategory = "validation"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS validator modes to assess and document DoD/DoR compliance for tasks, features, and deliverables"

# --- Core Validation Metadata ---
id = "" # << REQUIRED - Unique validation ID (e.g., QMS-DOD-20250816-001) >>
title = "" # << REQUIRED - Clear validation title >>
validation_type = "dod" # << REQUIRED - Options: "dod", "dor", "both" >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "medium" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
validated_by = "" # << REQUIRED - QMS validator mode (e.g., qms-dod-validator) >>
validation_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Subject Context ---
subject_type = "feature" # << REQUIRED - Options: "feature", "story", "epic", "task", "bug", "release" >>
subject_id = "" # << REQUIRED - ID of the item being validated >>
subject_title = "" # << REQUIRED - Title/name of the subject >>
project_context = "" # << OPTIONAL - Project or epic context >>
team_context = "" # << OPTIONAL - Team or squad context >>
milestone = "" # << OPTIONAL - Related milestone or release >>

# --- Validation Configuration ---
[validation_config]
criteria_version = "1.0" # << REQUIRED - Version of DoD/DoR criteria used >>
criteria_source = "" # << REQUIRED - Path to criteria definition document >>
strict_mode = true # << OPTIONAL - Whether to enforce all criteria strictly >>
exception_allowed = false # << OPTIONAL - Whether exceptions can be granted >>
reviewer_required = true # << OPTIONAL - Whether manual review is required >>

# --- Validation Results Summary ---
[validation_summary]
total_criteria = 0 # << REQUIRED - Total number of criteria evaluated >>
passed_criteria = 0 # << REQUIRED - Number of criteria that passed >>
failed_criteria = 0 # << REQUIRED - Number of criteria that failed >>
pending_criteria = 0 # << REQUIRED - Number of criteria awaiting validation >>
exceptions_granted = 0 # << OPTIONAL - Number of approved exceptions >>
overall_status = "pending" # << REQUIRED - Options: "passed", "failed", "pending", "conditional" >>

# --- Quality Metrics ---
[quality_metrics]
compliance_percentage = 0.0 # << REQUIRED - Percentage of criteria passed (0-100) >>
critical_failures = 0 # << REQUIRED - Number of critical criterion failures >>
blocker_issues = 0 # << REQUIRED - Number of blocking issues found >>
recommendation_count = 0 # << OPTIONAL - Number of improvement recommendations >>

# --- Tracking & Assignment ---
assignee = "" # << OPTIONAL - Person/team responsible for addressing issues >>
reviewer = "" # << OPTIONAL - Human reviewer if required >>
stakeholders = [] # << OPTIONAL - Array of stakeholders to notify >>
related_validations = [] # << OPTIONAL - Array of related validation IDs >>
parent_validation = "" # << OPTIONAL - Parent validation if this is a sub-validation >>

# --- References & Documentation ---
requirements_docs = [] # << OPTIONAL - Array of requirement document paths >>
acceptance_criteria = [] # << OPTIONAL - Array of acceptance criteria references >>
test_evidence = [] # << OPTIONAL - Array of test evidence file paths >>
external_references = [] # << OPTIONAL - Array of external reference URLs >>

# --- Process Metadata ---
methodology = "agile" # << OPTIONAL - Development methodology context >>
sprint_context = "" # << OPTIONAL - Sprint or iteration context >>
tags = [] # << OPTIONAL - Array of relevant tags >>
+++

# QMS DoD/DoR Validation Report

## Executive Summary

### Validation Overview
- **Validation ID**: {{id}}
- **Subject**: {{subject_title}} ({{subject_type}}: {{subject_id}})
- **Validation Type**: {{validation_type | upper}}
- **Overall Status**: {{validation_summary.overall_status | upper}}
- **Compliance**: {{validation_summary.compliance_percentage}}% ({{validation_summary.passed_criteria}}/{{validation_summary.total_criteria}})
- **Critical Issues**: {{quality_metrics.critical_failures}}
- **Blockers**: {{quality_metrics.blocker_issues}}

### Key Findings
<!-- Provide a high-level summary of validation results and key issues -->

## Validation Criteria Assessment

### {{validation_type == "dod" ? "Definition of Done (DoD)" : validation_type == "dor" ? "Definition of Ready (DoR)" : "DoD & DoR"}} Criteria

**Criteria Version**: {{validation_config.criteria_version}}  
**Source Document**: {{validation_config.criteria_source}}

---

### ✅ Passed Criteria

#### Development Standards
- [ ] **Code Quality**: Code meets established quality standards
  - **Status**: ✅ **Passed**
  - **Evidence**: [Link to code review results]
  - **Validation Method**: [Automated/Manual review]
  - **Notes**: [Any relevant observations]

- [ ] **Code Coverage**: Minimum test coverage threshold met
  - **Status**: ✅ **Passed**
  - **Evidence**: [Coverage report path]
  - **Actual Coverage**: [X]%
  - **Required Minimum**: [Y]%

- [ ] **Coding Standards**: Adherence to team coding standards
  - **Status**: ✅ **Passed**
  - **Evidence**: [Linter/formatter results]
  - **Validation Method**: Automated static analysis

#### Testing Requirements
- [ ] **Unit Tests**: Comprehensive unit test coverage
  - **Status**: ✅ **Passed**
  - **Evidence**: [Test suite results]
  - **Test Count**: [X] tests
  - **Pass Rate**: [Y]%

- [ ] **Integration Tests**: Key integration scenarios tested
  - **Status**: ✅ **Passed**
  - **Evidence**: [Integration test results]
  - **Scenarios Covered**: [List key scenarios]

#### Documentation Standards
- [ ] **Code Documentation**: Adequate inline documentation
  - **Status**: ✅ **Passed**
  - **Evidence**: [Documentation review results]
  - **Coverage**: Functions, classes, and complex logic documented

- [ ] **User Documentation**: End-user documentation updated
  - **Status**: ✅ **Passed**
  - **Evidence**: [Documentation files updated]
  - **Scope**: [What was documented]

---

### ❌ Failed Criteria

#### Security Requirements
- [ ] **Security Review**: Security vulnerabilities assessed
  - **Status**: ❌ **Failed**
  - **Issue**: [Description of security issue]
  - **Severity**: High
  - **Impact**: [Business/technical impact]
  - **Required Action**: [Specific remediation needed]
  - **Assigned To**: {{assignee}}
  - **Target Resolution**: [Date]

#### Performance Standards
- [ ] **Performance Testing**: Performance benchmarks met
  - **Status**: ❌ **Failed**
  - **Issue**: Response time exceeds acceptable threshold
  - **Current Performance**: [X]ms
  - **Required Performance**: [Y]ms
  - **Impact**: User experience degradation
  - **Required Action**: Performance optimization required

---

### ⏳ Pending Criteria

#### Stakeholder Approval
- [ ] **Product Owner Approval**: Feature approved by Product Owner
  - **Status**: ⏳ **Pending**
  - **Waiting For**: Product Owner review
  - **Expected Date**: [Date]
  - **Notes**: Review scheduled for [Date]

#### Deployment Readiness
- [ ] **Deployment Scripts**: Deployment automation ready
  - **Status**: ⏳ **Pending**
  - **Waiting For**: DevOps team to complete CI/CD configuration
  - **Dependencies**: Environment configuration
  - **Target Completion**: [Date]

---

### 🔄 Conditional Passes

#### Business Logic Validation
- [ ] **Business Rules**: Business logic implementation verified
  - **Status**: 🔄 **Conditional**
  - **Condition**: Pending stakeholder confirmation on edge case handling
  - **Evidence**: [Business logic tests pass]
  - **Exception Granted**: Yes, approved by [Name] on [Date]
  - **Rationale**: Edge case affects <1% of users, fix scheduled for next sprint

---

## Detailed Assessment Results

### DoD Criteria Evaluation

#### 1. Functional Completeness
**Criteria**: All acceptance criteria are implemented and working as expected

| Acceptance Criteria | Status | Evidence | Notes |
|-------------------|--------|----------|-------|
| User can log in via email | ✅ Pass | Login test suite | All scenarios covered |
| Password reset functionality | ❌ Fail | Missing test coverage | Integration tests needed |
| Remember me option | ✅ Pass | Feature tests pass | Implementation complete |

**Overall Status**: ❌ **Failed** - 2/3 criteria passed

#### 2. Quality Assurance
**Criteria**: Code quality standards met and tests pass

| Quality Check | Required | Actual | Status | Notes |
|--------------|----------|---------|---------|-------|
| Code Coverage | 80% | 85% | ✅ Pass | Above minimum threshold |
| Static Analysis | 0 critical issues | 2 critical | ❌ Fail | Memory leak potential |
| Performance Tests | <200ms response | 350ms avg | ❌ Fail | Needs optimization |
| Security Scan | 0 high vulnerabilities | 1 high | ❌ Fail | SQL injection risk |

**Overall Status**: ❌ **Failed** - 1/4 checks passed

#### 3. Documentation & Communication
**Criteria**: Documentation is complete and stakeholders are informed

- [✅] **API Documentation**: Updated with new endpoints
- [✅] **User Guide**: Screenshots and instructions updated
- [❌] **Release Notes**: Not yet prepared
- [⏳] **Stakeholder Notification**: Pending deployment schedule

**Overall Status**: ⏳ **Pending** - 2/4 items complete

### DoR Criteria Evaluation

#### 1. Requirements Clarity
**Criteria**: Requirements are clear, complete, and testable

- [✅] **Acceptance Criteria**: Well-defined and testable
- [✅] **User Story**: Follows INVEST principles
- [❌] **Edge Cases**: Not all edge cases identified
- [✅] **Dependencies**: Clearly documented

**Overall Status**: ❌ **Failed** - 3/4 criteria met

#### 2. Technical Readiness
**Criteria**: Technical approach is defined and feasible

- [✅] **Architecture Design**: Technical approach documented
- [✅] **API Contracts**: Interfaces defined
- [⏳] **Database Schema**: Changes pending review
- [✅] **External Dependencies**: Identified and available

**Overall Status**: ⏳ **Pending** - 3/4 criteria ready

## Issues & Remediation Plan

### Critical Issues (Must Fix)
1. **Security Vulnerability - SQL Injection Risk**
   - **Severity**: Critical
   - **Impact**: Data breach potential
   - **Action Required**: Implement parameterized queries
   - **Assigned To**: {{assignee}}
   - **Target Date**: [Date + 2 days]
   - **Blocking**: Release deployment

2. **Performance Degradation**
   - **Severity**: High
   - **Impact**: Poor user experience
   - **Action Required**: Database query optimization
   - **Assigned To**: {{assignee}}
   - **Target Date**: [Date + 3 days]
   - **Blocking**: Performance tests

### Major Issues (Should Fix)
1. **Missing Integration Tests**
   - **Severity**: Medium
   - **Impact**: Reduced confidence in password reset flow
   - **Action Required**: Write integration test suite
   - **Assigned To**: {{assignee}}
   - **Target Date**: [Date + 5 days]

### Minor Issues (Nice to Fix)
1. **Release Notes Missing**
   - **Severity**: Low
   - **Impact**: Communication gap
   - **Action Required**: Prepare release documentation
   - **Assigned To**: Product Owner
   - **Target Date**: [Date + 1 day]

## Recommendations

### Process Improvements
1. **Earlier Security Reviews**
   - **Issue**: Security vulnerabilities found late in process
   - **Recommendation**: Implement security review in DoR phase
   - **Benefit**: Prevent late-stage security fixes

2. **Automated Performance Testing**
   - **Issue**: Performance issues discovered manually
   - **Recommendation**: Add automated performance gates to CI/CD
   - **Benefit**: Early detection of performance regressions

### Quality Enhancements
1. **Enhanced Test Coverage**
   - **Current**: 85% line coverage
   - **Recommendation**: Increase to 90% and add integration coverage metrics
   - **Benefit**: Higher confidence in releases

2. **Static Analysis Integration**
   - **Current**: Manual static analysis
   - **Recommendation**: Integrate SAST tools in CI pipeline
   - **Benefit**: Automated quality gates

## Validation Decision

### Current Status: {{validation_summary.overall_status | upper}}

{{#if validation_summary.overall_status == "failed"}}
### ❌ VALIDATION FAILED

**Reason**: {{quality_metrics.critical_failures}} critical issue(s) and {{quality_metrics.blocker_issues}} blocker(s) prevent completion.

**Required Actions Before Re-validation**:
1. Resolve all critical security vulnerabilities
2. Address performance issues
3. Complete missing integration tests
4. Obtain pending approvals

**Re-validation Required**: Yes
**Estimated Resolution Time**: [X] days
{{/if}}

{{#if validation_summary.overall_status == "conditional"}}
### 🔄 CONDITIONAL PASS

**Conditions**:
- {{validation_summary.exceptions_granted}} exception(s) granted
- {{validation_summary.pending_criteria}} criteria pending completion
- Follow-up actions scheduled

**Approval Authority**: [Name and Role]
**Monitoring Required**: Yes
**Next Review Date**: [Date]
{{/if}}

{{#if validation_summary.overall_status == "passed"}}
### ✅ VALIDATION PASSED

**Summary**: All DoD/DoR criteria satisfied
- {{validation_summary.passed_criteria}}/{{validation_summary.total_criteria}} criteria passed
- {{validation_summary.compliance_percentage}}% compliance achieved
- No blocking issues identified

**Approved For**: {{validation_type == "dod" ? "Release/Deployment" : "Sprint/Development"}}
**Next Steps**: [Describe what happens next]
{{/if}}

## Appendices

### Appendix A: Criteria Checklist
<!-- Complete checklist of all DoD/DoR criteria with pass/fail status -->

### Appendix B: Evidence Artifacts
<!-- Links to all evidence files, test results, review documents -->

### Appendix C: Exception Documentation
<!-- Details of any exceptions granted, approval authority, conditions -->

---

**Validation Completed**: {{completion_date || "In Progress"}}  
**Validated By**: {{validated_by}}  
**Criteria Version**: {{validation_config.criteria_version}}  
**Next Review**: {{#if validation_summary.overall_status == "failed"}}Required after remediation{{else}}Per standard schedule{{/if}}