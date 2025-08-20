+++
# Document Metadata
id = "qms-quick-reference-cards-v1"
title = "QMS Quick Reference Cards v1"
context_type = "reference-documentation"
scope = "Concise quick reference cards for common QMS tasks and workflows"
target_audience = ["developers", "code-reviewers", "team-leads", "qa-engineers", "all-roles"]
granularity = "quick-reference"
status = "active"
last_updated = "2025-08-17"
version = "1.0"
tags = ["qms", "quick-reference", "workflow", "checklists", "procedures", "daily-tasks"]
related_context = [
    ".ruru/docs/qms/kb/workflow-implementation/4-step-qms-workflow-implementation-guide-v1.md",
    ".ruru/docs/qms/procedures/dor-validation-procedures-v1.md",
    ".ruru/docs/qms/procedures/dod-validation-procedures-v1.md",
    ".ruru/docs/qms/kb/training/developer-qms-onboarding-guide-v1.md",
    ".ruru/docs/qms/kb/training/reviewer-training-certification-guide-v1.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Essential daily reference for all QMS practitioners"

# Reference Configuration
[reference_config]
card_count = 12
format = "quick-reference"
print_friendly = true
mobile_optimized = true
bookmark_ready = true
+++

# QMS Quick Reference Cards v1

## Overview

These quick reference cards provide concise, actionable guidance for common QMS tasks and workflows. Each card is designed to be easily accessible, printable, and mobile-friendly for immediate use during daily development activities.

**How to Use These Cards:**
- Keep them readily accessible during development work
- Print the relevant cards and keep them nearby
- Bookmark this page for quick digital access
- Use them as checklists to ensure complete task execution
- Reference them during team training and onboarding

---

## Card 1: Definition of Ready (DoR) Validation

### 📋 Quick Checklist
- [ ] **Requirements Complete**: All acceptance criteria defined
- [ ] **Technical Design**: Architecture and approach documented
- [ ] **Dependencies**: External dependencies identified and resolved
- [ ] **Testability**: Clear testing strategy and test cases outlined
- [ ] **Estimation**: Story points or time estimates provided
- [ ] **Stakeholder Approval**: Product owner and tech lead sign-off

### ⚡ 5-Minute DoR Check
```markdown
1. Can I explain what this task accomplishes? (30 seconds)
2. Do I know HOW to implement this? (2 minutes)
3. Are all external dependencies available? (1 minute)
4. Can I write tests for this? (1 minute)
5. Does the team agree on the approach? (30 seconds)
```

### 🚨 Red Flags - Stop and Escalate
- Vague or conflicting requirements
- Missing critical technical details
- Blocked dependencies with no timeline
- Unable to estimate effort required
- Disagreement on technical approach

### 📞 Who to Contact
- **Requirements Issues**: Product Owner
- **Technical Questions**: Tech Lead
- **Dependencies**: Team Lead or Project Manager
- **Testing Concerns**: QA Lead

---

## Card 2: Code Review Execution

### 📋 Review Checklist
- [ ] **Functionality**: Code meets acceptance criteria
- [ ] **Security**: No vulnerabilities or security issues
- [ ] **Performance**: No obvious performance problems
- [ ] **Standards**: Follows coding standards and conventions
- [ ] **Tests**: Adequate test coverage and quality
- [ ] **Documentation**: Code is well-documented

### ⚡ 15-Minute Review Process
```markdown
1. Understand the requirement (2 minutes)
2. Review implementation approach (3 minutes)
3. Check for security issues (3 minutes)
4. Verify test coverage (2 minutes)
5. Check code standards compliance (3 minutes)
6. Provide constructive feedback (2 minutes)
```

### 🎯 Focus Areas by Priority
1. **Critical**: Security vulnerabilities, logic errors
2. **Important**: Performance issues, standards violations
3. **Suggestions**: Code optimization, style improvements

### ✍️ Feedback Templates
```markdown
**Security Concern**: 
"Line X has a potential security vulnerability. Consider using [specific solution] to prevent [specific risk]."

**Performance Issue**: 
"This approach may cause performance problems under high load. Consider [alternative approach] for better scalability."

**Standards Violation**: 
"This doesn't follow our naming conventions. Please rename to [suggested name] per our coding standards."
```

---

## Card 3: Quality Gates Monitoring

### 📋 Quality Gate Status Check
- [ ] **Unit Tests**: >95% pass rate
- [ ] **Integration Tests**: >90% pass rate  
- [ ] **Security Scan**: No critical vulnerabilities
- [ ] **Code Coverage**: >80% coverage
- [ ] **Static Analysis**: No blocking issues
- [ ] **Performance Tests**: Within acceptable limits

### ⚡ Quick Quality Gate Review
```markdown
1. Check CI/CD pipeline status (30 seconds)
2. Review failed test details (2 minutes)
3. Examine security scan results (2 minutes)
4. Verify code coverage metrics (1 minute)
5. Address any blocking issues (varies)
```

### 🔧 Common Fixes
- **Failed Tests**: Run locally, fix logic, update tests
- **Security Issues**: Update dependencies, fix code patterns
- **Low Coverage**: Add missing unit tests
- **Performance**: Optimize queries, reduce complexity

### 🚨 Escalation Thresholds
- **Critical Security Issues**: Immediate escalation
- **>10% Test Failures**: Block deployment, investigate
- **Coverage Drop >5%**: Require additional tests
- **Performance Degradation >20%**: Performance review required

---

## Card 4: Definition of Done (DoD) Validation

### 📋 DoD Completion Checklist
- [ ] **Feature Complete**: All acceptance criteria met
- [ ] **Quality Gates Passed**: All automated checks green
- [ ] **Code Reviewed**: Peer review completed and approved
- [ ] **Tests Passing**: Unit, integration, and E2E tests pass
- [ ] **Documentation Updated**: Code docs, user docs, changelog
- [ ] **Ready for Release**: Deployable to production

### ⚡ Pre-Deployment Verification
```markdown
1. Run full test suite locally (5 minutes)
2. Verify all acceptance criteria (3 minutes)
3. Check documentation completeness (2 minutes)
4. Confirm deployment readiness (2 minutes)
5. Get final stakeholder approval (varies)
```

### 📋 Documentation Requirements
- **Code Documentation**: Functions, classes, complex logic
- **User Documentation**: Feature guides, API changes
- **Technical Documentation**: Architecture decisions, setup instructions
- **Change Log**: User-facing changes and breaking changes

### ✅ Ready-to-Ship Criteria
- All DoD items completed and verified
- No open critical or high severity issues
- Stakeholder acceptance received
- Deployment plan confirmed

---

## Card 5: Security Review Process

### 📋 Security Review Checklist
- [ ] **Input Validation**: All inputs sanitized and validated
- [ ] **Authentication**: Proper authentication mechanisms
- [ ] **Authorization**: Appropriate access controls
- [ ] **Data Protection**: Sensitive data encrypted/protected
- [ ] **Injection Prevention**: SQL, XSS, Command injection protected
- [ ] **Error Handling**: No sensitive information in errors

### 🔍 Common Vulnerability Patterns
```markdown
❌ AVOID:
- Direct SQL string concatenation
- Unvalidated user inputs
- Hard-coded secrets/passwords
- Excessive error information exposure
- Weak authentication mechanisms

✅ USE:
- Parameterized queries
- Input validation and sanitization
- Environment variables for secrets
- Generic error messages
- Multi-factor authentication
```

### ⚡ Security Quick Scan
```markdown
1. Check for SQL injection risks (2 minutes)
2. Validate input handling (2 minutes)
3. Review authentication/authorization (3 minutes)
4. Check for sensitive data exposure (2 minutes)
5. Verify error handling (1 minute)
```

### 🚨 Critical Security Issues
- **SQL Injection**: Immediate fix required
- **Authentication Bypass**: Block deployment
- **Sensitive Data Exposure**: Immediate remediation
- **XSS Vulnerabilities**: Fix before release

---

## Card 6: Performance Review Guidelines

### 📋 Performance Review Checklist
- [ ] **Algorithm Efficiency**: Optimal time/space complexity
- [ ] **Database Queries**: Optimized with proper indexing
- [ ] **Memory Usage**: No memory leaks, reasonable consumption
- [ ] **Network Calls**: Minimized and optimized
- [ ] **Caching**: Appropriate caching strategies implemented
- [ ] **Load Testing**: Performance validated under load

### ⚡ Performance Red Flags
```markdown
🚨 IMMEDIATE ATTENTION:
- O(n²) or worse algorithms on large datasets
- N+1 database query problems
- Memory leaks or unbounded growth
- Synchronous calls to external services
- No caching on expensive operations
```

### 📊 Performance Benchmarks
```markdown
**Response Times:**
- API Endpoints: <200ms (95th percentile)
- Database Queries: <100ms average
- Page Load Times: <2 seconds
- Background Jobs: Complete within SLA

**Resource Usage:**
- Memory: <80% of available
- CPU: <70% sustained load
- Database Connections: <80% of pool
```

### 🔧 Quick Performance Fixes
- Add database indexes for frequent queries
- Implement caching for expensive operations
- Use async/await for I/O operations
- Optimize algorithms for better complexity
- Add connection pooling for external services

---

## Card 7: Incident Response

### 🚨 Immediate Response (First 15 Minutes)
```markdown
1. ASSESS: Severity and impact (2 minutes)
2. CONTAIN: Stop the bleeding (5 minutes)
3. NOTIFY: Alert relevant stakeholders (3 minutes)
4. INVESTIGATE: Begin root cause analysis (5 minutes)
```

### 📋 Incident Severity Classification
- **P0 - Critical**: System down, data loss, security breach
- **P1 - High**: Major feature broken, significant user impact
- **P2 - Medium**: Minor feature issues, limited user impact
- **P3 - Low**: Cosmetic issues, minimal impact

### 📞 Escalation Chain
```markdown
P0 (Critical):
- Immediate: Team Lead, Engineering Manager
- Within 30 min: VP Engineering, CTO
- Within 1 hour: CEO (if customer-facing)

P1 (High):
- Within 15 min: Team Lead
- Within 1 hour: Engineering Manager
- Within 4 hours: VP Engineering

P2/P3 (Medium/Low):
- Within 4 hours: Team Lead
- Next business day: Engineering Manager
```

### 📋 Communication Template
```markdown
**INCIDENT ALERT - [SEVERITY]**
- **What**: Brief description of the issue
- **Impact**: Who/what is affected
- **When**: When did it start
- **Status**: Current response status
- **ETA**: Expected resolution time
- **Next Update**: When you'll provide next update
```

---

## Card 8: Code Standards Compliance

### 📋 Code Standards Checklist
- [ ] **Naming Conventions**: Variables, functions, classes properly named
- [ ] **Code Structure**: Proper organization and separation of concerns
- [ ] **Documentation**: Adequate comments and documentation
- [ ] **Error Handling**: Consistent and appropriate error handling
- [ ] **Formatting**: Consistent indentation and style
- [ ] **Dependencies**: Appropriate use of libraries and frameworks

### ⚡ Quick Standards Check
```markdown
1. Run linter/formatter (30 seconds)
2. Check naming conventions (1 minute)
3. Verify function/class structure (2 minutes)
4. Review error handling patterns (1 minute)
5. Ensure adequate comments (1 minute)
```

### 📏 Naming Convention Quick Reference
```markdown
**Variables & Functions**: camelCase
- getUserData(), isValidEmail(), currentUser

**Classes & Interfaces**: PascalCase
- UserService, PaymentProcessor, ApiResponse

**Constants**: UPPER_SNAKE_CASE
- MAX_RETRY_COUNT, API_BASE_URL

**Files**: kebab-case or camelCase (per project)
- user-service.js, paymentProcessor.ts
```

### 🚨 Standards Violations
- **Blocking**: Security issues, major architecture violations
- **Warning**: Style issues, minor naming problems
- **Info**: Suggestions for improvement

---

## Card 9: Test Coverage and Quality

### 📋 Test Coverage Checklist
- [ ] **Unit Tests**: >80% line coverage, all critical paths
- [ ] **Integration Tests**: Key workflows and API endpoints
- [ ] **Edge Cases**: Error conditions and boundary values
- [ ] **Performance Tests**: Load and stress testing
- [ ] **Security Tests**: Authentication and authorization
- [ ] **User Acceptance Tests**: End-to-end user scenarios

### ⚡ Test Quality Quick Check
```markdown
1. Run test suite and check coverage (2 minutes)
2. Review test names for clarity (1 minute)
3. Check for edge case coverage (2 minutes)
4. Verify test independence (1 minute)
5. Ensure tests are maintainable (1 minute)
```

### 🧪 Test Quality Standards
```markdown
**Good Test Characteristics:**
✅ Clear, descriptive test names
✅ Tests one thing at a time
✅ Independent and repeatable
✅ Fast execution
✅ Easy to maintain

**Test Anti-patterns to Avoid:**
❌ Testing implementation details
❌ Flaky or non-deterministic tests
❌ Overly complex test setup
❌ Tests that test the framework
❌ Duplicate or redundant tests
```

### 📊 Coverage Targets
- **Unit Tests**: 80-90% line coverage
- **Branch Coverage**: 70-80%
- **Critical Path Coverage**: 100%
- **Integration Test Coverage**: Major workflows

---

## Card 10: Continuous Improvement

### 📋 Improvement Identification
- [ ] **Metrics Review**: Analyze quality and performance metrics
- [ ] **Team Feedback**: Collect input from development team
- [ ] **Process Bottlenecks**: Identify workflow inefficiencies
- [ ] **Tool Effectiveness**: Evaluate current tooling
- [ ] **Industry Best Practices**: Research new approaches
- [ ] **Customer Impact**: Consider user experience improvements

### ⚡ Weekly Improvement Review
```markdown
1. Review quality metrics trends (5 minutes)
2. Identify biggest pain points (5 minutes)
3. Brainstorm potential solutions (10 minutes)
4. Prioritize improvements by impact/effort (5 minutes)
5. Create action items with owners (5 minutes)
```

### 🎯 Improvement Categories
```markdown
**Process Improvements:**
- Workflow optimization
- Automation opportunities
- Communication enhancement
- Documentation updates

**Technical Improvements:**
- Tool upgrades/replacements
- Code quality enhancements
- Performance optimizations
- Security strengthening

**Team Improvements:**
- Skill development
- Knowledge sharing
- Collaboration enhancement
- Workload balancing
```

### 📊 Success Metrics
- Reduced defect escape rate
- Faster delivery times
- Improved team satisfaction
- Better code quality scores
- Enhanced customer satisfaction

---

## Card 11: Compliance and Audit Readiness

### 📋 Compliance Checklist
- [ ] **Documentation**: All procedures documented and current
- [ ] **Traceability**: Requirements linked to implementation
- [ ] **Change Control**: All changes properly approved and tracked
- [ ] **Quality Records**: Test results and reviews documented
- [ ] **Training Records**: Team certification and training logs
- [ ] **Process Evidence**: Workflow execution proof

### ⚡ Pre-Audit Quick Prep
```markdown
1. Verify all documentation is current (10 minutes)
2. Check traceability matrix completeness (10 minutes)
3. Review change control records (5 minutes)
4. Confirm quality gate evidence (5 minutes)
5. Validate training completeness (5 minutes)
```

### 📄 Required Documentation
```markdown
**Process Documents:**
- QMS workflow procedures
- Coding standards and guidelines
- Review and testing procedures
- Change management processes

**Evidence Documents:**
- Quality gate execution logs
- Code review records
- Test execution results
- Training completion certificates

**Traceability Documents:**
- Requirements to design mapping
- Design to implementation links
- Implementation to test coverage
- Test results to acceptance
```

### 🎯 Audit Success Factors
- Complete and current documentation
- Clear evidence of process execution
- Demonstrated continuous improvement
- Team understanding of procedures

---

## Card 12: Team Communication and Coordination

### 📋 Communication Checklist
- [ ] **Daily Standups**: Quality issues and blockers discussed
- [ ] **Sprint Planning**: Quality activities estimated and planned
- [ ] **Code Reviews**: Constructive feedback and knowledge sharing
- [ ] **Retrospectives**: Quality process improvements identified
- [ ] **Documentation**: Knowledge shared and documented
- [ ] **Escalations**: Issues raised promptly and appropriately

### ⚡ Effective Quality Communication
```markdown
**Daily Standups (2-3 minutes per person):**
- Quality issues encountered yesterday
- Quality activities planned for today
- Quality blockers needing team help

**Code Review Communication:**
- Be constructive and specific
- Explain the "why" behind suggestions
- Acknowledge good practices
- Offer to pair on complex issues
```

### 💬 Communication Templates
```markdown
**Quality Issue Alert:**
"Found a [severity] issue in [component]. Impact: [description]. Suggested action: [recommendation]. Need help from: [person/team]."

**Quality Achievement:**
"Great job on [specific improvement]! This [impact description] and shows our commitment to quality."

**Process Improvement Idea:**
"I noticed we could improve [process] by [suggestion]. Benefits: [list]. Shall we try this in our next sprint?"
```

### 🤝 Collaboration Best Practices
- Share quality wins and learnings
- Ask for help early when blocked
- Provide specific, actionable feedback
- Document decisions and rationale
- Celebrate quality achievements as a team

---

## Quick Access Summary

### 🔗 Emergency Contacts
- **P0 Incidents**: Team Lead → Engineering Manager → VP Eng
- **Security Issues**: Security Lead + Team Lead
- **Quality Concerns**: QA Lead + Team Lead
- **Process Questions**: Team Lead + Project Manager

### 📊 Key Metrics Thresholds
- **Test Pass Rate**: >95% (Red: <90%)
- **Code Coverage**: >80% (Yellow: 70-80%, Red: <70%)
- **Review Time**: <6 hours (Yellow: 6-12h, Red: >12h)
- **DoR Compliance**: >90% (Red: <85%)

### 🔧 Essential Tools Quick Links
- CI/CD Pipeline Status Dashboard
- Quality Metrics Dashboard  
- Code Review Assignment Board
- Incident Management System
- Documentation Wiki
- Team Communication Channels

### 📋 Daily Quality Routine
1. **Morning**: Check overnight build/test results (5 min)
2. **Development**: Follow QMS workflow for all changes
3. **Code Review**: Provide timely, constructive feedback
4. **End of Day**: Update task status and quality metrics (5 min)

---

## Print-Friendly Versions

Each card above is designed to be printer-friendly. To create physical reference cards:

1. **Individual Cards**: Print each card section on separate sheets
2. **Pocket Cards**: Scale down to fit business card size
3. **Desktop Reference**: Print as single sheet for desk reference
4. **Mobile Version**: Access this page on mobile devices for quick lookup

## Additional Resources

- **Full Training Guides**: See comprehensive training materials
- **Detailed Procedures**: Reference complete workflow documentation
- **Tool Documentation**: Access specific tool guides and tutorials
- **Team Guidelines**: Check team-specific adaptations and customizations

Remember: These cards are starting points. Adapt them to your specific project needs, team culture, and organizational requirements while maintaining the core quality principles.