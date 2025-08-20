## 📋 QMS Standard Pull Request Template

<!-- 
This template guides you through creating a QMS-compliant PR.
The QMS system will automatically validate these requirements.
Delete sections that don't apply to your change.
-->

### 🎯 Description
<!-- Provide a clear and concise description of what this PR does -->


### 🔗 Related Issues
<!-- Link to related issues using one of these formats:
- Fixes #123
- Closes #456
- Resolves #789
- Related to #101
-->


### 🧪 Type of Change
<!-- Check all that apply -->
- [ ] 🐞 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)  
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Configuration change
- [ ] ♻️ Code refactoring
- [ ] 🚀 Performance improvement
- [ ] 🧹 Code cleanup
- [ ] 🔒 Security fix
- [ ] 🏗️ Infrastructure change

---

## 🏗️ QMS Quality Gates Checklist

### Step 1: Definition of Ready (DoR) ✅
<!-- These will be automatically validated by QMS DoR Validator -->
- [ ] **PR Description**: Comprehensive description provided (≥100 characters)
- [ ] **Issue Linking**: Related issues properly linked
- [ ] **Branch Naming**: Branch follows naming convention (`feature/`, `bugfix/`, `hotfix/`, `release/`)
- [ ] **CI Pipeline**: Initial automated checks pass
- [ ] **Security Scan**: No high-severity security vulnerabilities

### Step 2: Progress Review Requirements 🔍
<!-- Requirements for code review phase -->
- [ ] **Code Quality**: Code follows established patterns and standards
- [ ] **Architecture**: Changes align with system architecture
- [ ] **Performance**: Performance impact assessed and acceptable
- [ ] **Security**: Security implications reviewed and addressed
- [ ] **Testing**: Appropriate tests added or updated
- [ ] **Documentation**: Code comments and documentation updated

### Step 3: Definition of Done (DoD) ✅
<!-- These will be automatically validated by QMS DoD Validator -->
- [ ] **Code Coverage**: Test coverage ≥ 80% for new/modified code
- [ ] **All Conversations Resolved**: All review comments addressed
- [ ] **Performance Tests**: Performance benchmarks pass
- [ ] **Security Validation**: All security vulnerabilities resolved
- [ ] **Documentation Complete**: API docs and user guides updated
- [ ] **Breaking Changes**: Breaking changes documented and communicated

### Step 4: Final Review Approval 🚀
<!-- Final executive approval requirements -->
- [ ] **Business Alignment**: Changes align with business requirements
- [ ] **Quality Metrics**: All quality gates met
- [ ] **Compliance**: Regulatory compliance verified (if applicable)
- [ ] **Deployment Ready**: Changes ready for production deployment

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] New unit tests added for new functionality
- [ ] Existing unit tests updated where necessary
- [ ] All unit tests pass locally
- [ ] Code coverage target met (≥ 80%)

### Integration Tests  
- [ ] Integration tests added for new features
- [ ] End-to-end workflows tested
- [ ] API contract tests updated
- [ ] Database migration tests (if applicable)

### Manual Testing
- [ ] Happy path scenarios tested
- [ ] Edge cases and error conditions tested
- [ ] User interface tested across supported browsers (if applicable)
- [ ] Mobile responsiveness verified (if applicable)

---

## 🔒 Security Checklist
<!-- Security considerations and validations -->
- [ ] **Input Validation**: All user inputs properly validated and sanitized
- [ ] **Authentication**: Authentication mechanisms properly implemented
- [ ] **Authorization**: Access controls correctly applied
- [ ] **Data Privacy**: Personal data handling complies with privacy requirements
- [ ] **Secrets Management**: No hardcoded secrets or credentials
- [ ] **Dependency Security**: Dependencies scanned for vulnerabilities
- [ ] **OWASP Top 10**: Common security vulnerabilities addressed

---

## 🚀 Performance Impact
<!-- Describe the performance implications of your changes -->

### Performance Testing Results
- [ ] Load testing completed (if applicable)
- [ ] Memory usage within acceptable limits
- [ ] Database query performance optimized
- [ ] API response times meet SLA requirements
- [ ] Build/deployment time impact acceptable

### Metrics
<!-- Provide relevant metrics -->
- **Build Time**: Before: `X min`, After: `Y min`
- **Test Suite Time**: Before: `X min`, After: `Y min`
- **Memory Usage**: `X MB` (if significant change)
- **API Response Time**: `X ms` (if applicable)

---

## 💥 Breaking Changes
<!-- List any breaking changes and migration guidance -->
- [ ] No breaking changes in this PR
- [ ] Breaking changes documented below

### Breaking Change Details
<!-- If you checked breaking changes above, provide details -->
<!--
Example:
- **API Endpoint Changed**: `/api/v1/users` → `/api/v2/users`
- **Migration Guide**: [Link to migration documentation]
- **Backward Compatibility**: Supported until version X.Y
-->

---

## 📚 Documentation Updates
<!-- Documentation changes included in this PR -->
- [ ] **API Documentation**: Updated OpenAPI/Swagger specs
- [ ] **README**: Updated project README if needed
- [ ] **User Guide**: Updated user-facing documentation
- [ ] **Developer Docs**: Updated technical documentation
- [ ] **CHANGELOG**: Entry added to changelog
- [ ] **Architecture Docs**: System design documentation updated

---

## 🎯 QMS Review Assignment
<!-- The QMS system will automatically assign reviewers based on these selections -->

### Expertise Required
<!-- Check areas that require specialized review -->
- [ ] **Security Review**: Security-sensitive changes
- [ ] **Performance Review**: Performance-critical changes  
- [ ] **Database Review**: Database schema or query changes
- [ ] **Infrastructure Review**: DevOps/infrastructure changes
- [ ] **Architecture Review**: Significant design changes
- [ ] **Compliance Review**: Regulatory or compliance implications

### Priority Level
<!-- Select appropriate priority -->
- [ ] 🔴 **Critical**: Security fix or production outage
- [ ] 🟡 **High**: Important feature or significant bug fix
- [ ] 🟢 **Normal**: Standard feature or improvement
- [ ] 🔵 **Low**: Minor improvement or cleanup

---

## 🚀 Deployment Notes
<!-- Information for deployment and release -->

### Deployment Requirements
- [ ] **Database Migrations**: No migrations required
- [ ] **Configuration Changes**: No config changes needed
- [ ] **Feature Flags**: No feature flags required
- [ ] **Third-party Dependencies**: No external service changes
- [ ] **Rollback Plan**: Rollback strategy documented

### Environment Considerations
- [ ] **Development**: Tested in dev environment
- [ ] **Staging**: Ready for staging deployment
- [ ] **Production**: Production deployment requirements met

---

## 📝 Additional Notes
<!-- Any additional context or notes for reviewers -->


---

## 🤖 QMS Automation Commands
<!-- Commands for QMS system interaction -->

Use these commands in comments to interact with the QMS system:

- `@qms-bot status` - Check current QMS review status
- `@qms-bot reassign` - Request reviewer reassignment
- `@qms-bot recheck` - Re-run quality gate validations  
- `@qms-bot skip-gate <gate-name> --reason="justification"` - Skip non-critical gate
- `@qms-bot priority <level> --reason="justification"` - Change review priority

---

**By submitting this PR, I confirm that:**
- [ ] I have read and understood the QMS review process
- [ ] This PR follows our coding standards and practices
- [ ] I have tested my changes thoroughly
- [ ] I am ready for the QMS 4-step review process