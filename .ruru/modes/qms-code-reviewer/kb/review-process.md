+++
id = "qms-code-reviewer-process"
title = "QMS Code Review Process Guide"
context_type = "knowledge_base"
scope = "Comprehensive guide to QMS 4-step code review process"
target_audience = ["qms-code-reviewer", "dev-*", "qms-coding-standards"]
granularity = "comprehensive"
status = "active"
last_updated = "2025-08-20"
version = "1.0"
tags = ["qms", "code-review", "quality-gates", "process-guide", "best-practices", "compliance"]
related_context = [
    ".ruru/modes/qms-code-reviewer/qms-code-reviewer.mode.md",
    ".ruru/templates/toml-md/27_qms_code_review.md",
    "docs/creo-qms-implementation-plan.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Essential reference for QMS code review execution"
+++

# QMS Code Review Process Guide

## Overview

This knowledge base provides comprehensive guidance for executing the QMS 4-step code review process. The process ensures consistent, high-quality code through systematic evaluation of functional correctness, quality standards, testing adequacy, and security compliance.

## Core Process Principles

### 1. Progressive Quality Gates
- **Gate 1: Functional Review** - Ensures code meets business requirements
- **Gate 2: Quality Standards** - Validates adherence to coding standards
- **Gate 3: Testing Review** - Confirms adequate test coverage and quality
- **Gate 4: Security Review** - Identifies security vulnerabilities and risks

### 2. Quality First Mentality
- **Zero Tolerance for Critical Issues** - Blockers must be resolved before merge
- **Educational Approach** - Provide guidance and explanations for violations
- **Consistency** - Apply standards uniformly across all code changes
- **Documentation** - Record all review findings and decisions

### 3. Efficiency Focus
- **Automated First** - Leverage tools for initial validation
- **Risk-Based Review** - Focus effort on high-impact changes
- **Batch Processing** - Handle related changes together when possible
- **Clear Communication** - Provide actionable feedback

## Step 1: Functional Review

### Purpose
Ensure the code correctly implements the specified requirements and business logic.

### Key Activities

#### 1. Requirements Alignment
- **Verify Requirements Mapping:** Confirm each requirement has corresponding code implementation
- **Check Acceptance Criteria:** Validate that all acceptance criteria are met
- **Review Business Logic:** Ensure business rules are correctly implemented
- **Validate Edge Cases:** Check handling of boundary conditions and error scenarios

#### 2. Code Completeness
- **Feature Completeness:** Ensure no requirements are missing
- **Integration Points:** Verify proper integration with existing systems
- **Data Flow:** Validate data transformation and processing logic
- **Error Handling:** Confirm appropriate error handling and user feedback

#### 3. Functional Testing
- **Manual Testing:** Execute key user journeys
- **Edge Case Testing:** Test boundary conditions and error paths
- **Data Validation:** Verify data integrity and business rule enforcement
- **UI/UX Validation:** Check user interface and experience alignment

### Review Checklist
```markdown
## Step 1: Functional Review
### Requirements Alignment
- [ ] **Requirements Traceability**: All requirements have corresponding code implementation
- [ ] **Acceptance Criteria**: All acceptance criteria are satisfied
- [ ] **Business Logic**: Business rules correctly implemented
- [ ] **Edge Cases**: Boundary conditions and error scenarios handled

### Code Completeness
- [ ] **Feature Completeness**: No missing functionality
- [ ] **Integration Points**: Proper integration with existing systems
- [ ] **Data Flow**: Data transformation logic is correct
- [ ] **Error Handling**: Appropriate error handling and user feedback

### Functional Testing
- [ ] **Manual Testing**: Key user journeys executed successfully
- [ ] **Edge Cases**: Boundary conditions tested
- [ ] **Data Validation**: Data integrity maintained
- [ ] **UI/UX**: User interface meets requirements
```

### Common Issues
- **Missing Requirements:** Code doesn't implement all specified features
- **Logic Errors:** Business rules incorrectly implemented
- **Edge Case Failures:** Boundary conditions not handled
- **Integration Problems:** Incorrect interaction with other systems

### Resolution Guidelines
- **Minor Issues:** Document and request fixes in next iteration
- **Major Issues:** Require immediate fixes before proceeding
- **Critical Issues:** Block merge until resolved
- **Documentation:** Explain why changes are needed and provide examples

## Step 2: Quality Standards Review

### Purpose
Validate adherence to coding standards, best practices, and maintainability requirements.

### Key Activities

#### 1. Standards Compliance
- **Coding Standards:** Check against language-specific standards
- **Naming Conventions:** Verify consistent and descriptive naming
- **Code Structure:** Ensure logical organization and modularity
- **Documentation:** Confirm adequate code documentation

#### 2. Code Quality Metrics
- **Complexity Analysis:** Review cyclomatic complexity and function length
- **Duplication Check:** Identify and eliminate code duplication
- **Performance Review:** Assess computational and memory efficiency
- **Maintainability:** Evaluate code readability and modification ease

#### 3. Best Practices
- **Design Patterns:** Appropriate use of established patterns
- **Language Idioms:** Proper use of language-specific features
- **Error Handling:** Consistent error handling patterns
- **Resource Management:** Proper resource allocation and cleanup

### Review Checklist
```markdown
## Step 2: Quality Standards Review
### Standards Compliance
- [ ] **Coding Standards**: Adheres to language-specific standards
- [ ] **Naming Conventions**: Consistent and descriptive naming
- [ ] **Code Structure**: Logical organization and modularity
- [ ] **Documentation**: Adequate code documentation

### Code Quality Metrics
- [ ] **Complexity**: Cyclomatic complexity within limits
- [ ] **Duplication**: No significant code duplication
- [ ] **Performance**: Computationally and memory efficient
- [ ] **Maintainability**: Readable and easily modifiable

### Best Practices
- [ ] **Design Patterns**: Appropriate pattern usage
- [ ] **Language Idioms**: Proper language feature utilization
- [ ] **Error Handling**: Consistent error handling patterns
- [ ] **Resource Management**: Proper resource lifecycle management
```

### Common Issues
- **Standards Violations:** Non-compliance with coding standards
- **Poor Naming:** Unclear or inconsistent variable/function names
- **High Complexity:** Functions that are too long or complex
- **Code Duplication:** Repeated code patterns that should be refactored

### Resolution Guidelines
- **Automated Fixes:** Use linters and formatters to fix formatting issues
- **Refactoring:** Suggest specific refactoring approaches for complex code
- **Education:** Provide links to standards documentation
- **Tool Integration:** Recommend IDE plugins or tools for ongoing compliance

## Step 3: Testing Review

### Purpose
Ensure comprehensive test coverage and quality test implementation.

### Key Activities

#### 1. Test Coverage Analysis
- **Unit Test Coverage:** Verify minimum 80% coverage requirement
- **Integration Test Coverage:** Ensure key integration points tested
- **Edge Case Coverage:** Confirm boundary conditions are tested
- **Error Path Coverage:** Validate error scenarios are tested

#### 2. Test Quality Assessment
- **Test Design:** Evaluate test structure and organization
- **Assertion Quality:** Check appropriateness and completeness of assertions
- **Mock Usage:** Review mock object implementation and appropriateness
- **Test Data:** Assess quality and variety of test data

#### 3. Test Execution and Results
- **Test Execution:** Ensure all tests pass in CI/CD pipeline
- **Flaky Tests:** Identify and address non-deterministic tests
- **Performance Tests:** Review load and performance test implementation
- **Test Documentation:** Check test documentation and naming

### Review Checklist
```markdown
## Step 3: Testing Review
### Test Coverage Analysis
- [ ] **Unit Test Coverage**: ≥80% coverage requirement met
- [ ] **Integration Coverage**: Key integration points tested
- [ ] **Edge Cases**: Boundary conditions covered
- [ ] **Error Paths**: Error scenarios tested

### Test Quality Assessment
- [ ] **Test Design**: Well-structured and organized tests
- [ ] **Assertions**: Appropriate and complete assertions
- [ ] **Mock Usage**: Proper mock implementation
- [ ] **Test Data**: Quality and variety of test data

### Test Execution and Results
- [ ] **Test Execution**: All tests pass in CI/CD
- [ ] **Flaky Tests**: No non-deterministic test behavior
- [ ] **Performance Tests**: Load and performance tests implemented
- [ ] **Test Documentation**: Clear test naming and documentation
```

### Common Issues
- **Insufficient Coverage:** Test coverage below required thresholds
- **Poor Test Design:** Tests that are hard to understand or maintain
- **Missing Edge Cases:** Important boundary conditions not tested
- **Flaky Tests:** Tests that fail intermittently

### Resolution Guidelines
- **Coverage Gaps:** Require additional tests for uncovered code paths
- **Test Refactoring:** Suggest improvements to test structure and design
- **Automation:** Recommend test automation tools and frameworks
- **CI/CD Integration:** Ensure proper test execution in pipeline

## Step 4: Security Review

### Purpose
Identify security vulnerabilities, risks, and ensure compliance with security best practices.

### Key Activities

#### 1. Input Validation
- **Input Sanitization:** Verify all inputs are properly validated
- **SQL Injection:** Check for SQL injection vulnerabilities
- **XSS Prevention:** Ensure XSS protection mechanisms
- **Command Injection:** Validate command execution security

#### 2. Authentication & Authorization
- **Authentication:** Verify proper user authentication implementation
- **Authorization:** Check role-based access control
- **Session Management:** Review session handling security
- **Token Security:** Validate token generation and validation

#### 3. Data Protection
- **Data Encryption:** Ensure sensitive data is encrypted
- **Data Storage:** Verify secure data storage practices
- **Data Transmission:** Check secure data transmission (HTTPS/TLS)
- **Privacy Compliance:** Validate privacy regulation compliance

#### 4. Security Best Practices
- **Error Handling:** Ensure errors don't leak sensitive information
- **Logging Security:** Review security event logging
- **Dependencies:** Check for known vulnerabilities in dependencies
- **Configuration:** Validate secure configuration settings

### Review Checklist
```markdown
## Step 4: Security Review
### Input Validation
- [ ] **Input Sanitization**: All inputs properly validated
- [ ] **SQL Injection**: No SQL injection vulnerabilities
- [ ] **XSS Prevention**: XSS protection mechanisms in place
- [ ] **Command Injection**: Secure command execution

### Authentication & Authorization
- [ ] **Authentication**: Proper user authentication implemented
- [ ] **Authorization**: Role-based access control working
- [ ] **Session Management**: Secure session handling
- [ ] **Token Security**: Secure token generation and validation

### Data Protection
- [ ] **Data Encryption**: Sensitive data encrypted at rest and in transit
- [ ] **Data Storage**: Secure data storage practices
- [ ] **Data Transmission**: Secure data transmission protocols
- [ ] **Privacy Compliance**: Privacy regulation compliance

### Security Best Practices
- [ ] **Error Handling**: No sensitive information leakage
- [ ] **Logging Security**: Security events properly logged
- [ ] **Dependencies**: No known vulnerabilities in dependencies
- [ ] **Configuration**: Secure configuration settings
```

### Common Issues
- **Input Validation Failures:** Missing or insufficient input validation
- **Authentication Weaknesses:** Weak password policies or session management
- **Data Exposure:** Sensitive data not properly protected
- **Dependency Vulnerabilities:** Outdated or vulnerable third-party libraries

### Resolution Guidelines
- **Critical Vulnerabilities:** Block merge until resolved
- **High-Risk Issues:** Require immediate fixes with security review
- **Medium-Risk Issues:** Allow with timeline for fixes and monitoring
- **Security Training:** Provide security awareness training

## Review Workflow Integration

### 1. Pull Request Process
```markdown
## QMS Code Review Process

### Pre-Review Checklist
- [ ] Code compiles without errors
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Migration scripts included (if applicable)

### Review Steps
1. **Automated Checks**: Run linters, tests, and security scanners
2. **Step 1: Functional Review** - Verify requirements implementation
3. **Step 2: Quality Standards** - Check coding standards compliance
4. **Step 3: Testing Review** - Validate test coverage and quality
5. **Step 4: Security Review** - Identify security vulnerabilities

### Post-Review Actions
- [ ] Address all blocker issues
- [ ] Implement suggested improvements
- [ ] Update documentation
- [ ] Retest after changes
```

### 2. Automated Integration
- **Pre-submit Hooks:** Run basic checks before review
- **CI/CD Integration:** Automated validation in pipeline
- **Quality Gates:** Block merges for critical violations
- **Reporting:** Generate review reports and metrics

### 3. Tool Integration
- **Code Review Tools:** Integrate with GitHub, GitLab, or similar platforms
- **Static Analysis:** Automated code quality and security scanning
- **Test Coverage:** Automated coverage reporting and thresholds
- **Dependency Scanning:** Automated vulnerability detection

## Quality Metrics and Reporting

### 1. Review Metrics
- **Review Time:** Average time to complete each review step
- **Defect Density:** Number of issues found per review
- **Review Coverage:** Percentage of code changes reviewed
- **Escalation Rate:** Percentage of reviews requiring escalation

### 2. Quality Trends
- **Defect Trends:** Track defect discovery over time
- **Standards Compliance:** Monitor adherence to coding standards
- **Test Coverage:** Track test coverage improvements
- **Security Incidents:** Monitor security issue detection and resolution

### 3. Process Improvement
- **Feedback Collection:** Gather reviewer and developer feedback
- **Process Metrics:** Track review process efficiency
- **Training Needs:** Identify areas needing additional training
- **Tool Effectiveness:** Assess effectiveness of automated tools

## Training and Development

### 1. Reviewer Training
- **Process Training:** Comprehensive training on 4-step process
- **Standards Training:** Language-specific standards education
- **Security Training:** Security awareness and best practices
- **Tool Training:** Training on review tools and automation

### 2. Developer Education
- **Standards Education:** Regular updates on coding standards
- **Best Practices:** Sharing of best practices and patterns
- **Feedback Sessions:** Regular sessions to discuss common issues
- **Mentorship Program:** Pair programming and code review mentoring

### 3. Continuous Improvement
- **Retrospective Meetings:** Regular review of process effectiveness
- **Standards Updates:** Regular review and update of coding standards
- **Tool Updates:** Keep review tools and automation current
- **Process Refinement:** Continuously improve review process based on feedback

This comprehensive guide ensures consistent, thorough, and effective code reviews that maintain high quality standards while supporting development team productivity and learning.