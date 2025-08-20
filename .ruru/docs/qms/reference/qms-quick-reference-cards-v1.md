+++
# --- Document Metadata ---
id = "qms-quick-reference-cards-v1"
title = "QMS Quick Reference Cards v1.0"
context_type = "reference"
scope = "Quick reference cards for QMS quality gates and requirements"
target_audience = ["developers", "team-leads", "reviewers", "qa-teams"]
granularity = "reference"
status = "active"
last_updated = "2025-08-17T06:06:00Z"
version = "1.0.0"

# --- QMS Integration Metadata ---
quality_gates_integration = true
automation_level = "high"
github_integration = true
quick_reference = true

# --- Related Documentation ---
related_docs = [
    ".ruru/docs/qms/developer-guides/comprehensive-qms-developer-guide-v1.md",
    ".ruru/docs/qms/workflows/4-step-qms-review-workflow-v1.md",
    ".ruru/docs/qms/troubleshooting/qms-review-troubleshooting-guide-v1.md",
    ".ruru/docs/qms/training/qms-adoption-training-materials-v1.md"
]
tags = ["qms", "reference", "quick-guide", "quality-gates", "commands", "thresholds"]
+++

# QMS Quick Reference Cards v1.0

## Card 1: QMS Bot Commands

### Status & Information
```bash
@qms-bot status                    # Get current QMS status
@qms-bot help                      # Show available commands
@qms-bot detailed-status           # Get detailed status info
@qms-bot gate-details [gate-name]  # Get specific gate details
```

### Review Management
```bash
@qms-bot priority [low|normal|high|critical]   # Set review priority
@qms-bot assign-reviewer @username              # Request specific reviewer
@qms-bot reassign --reason="explanation"        # Request reassignment
@qms-bot reassign --expertise [type]            # Reassign by expertise
@qms-bot workload @reviewer-name                # Check reviewer workload
```

### Quality Gates
```bash
@qms-bot rerun-gate [coverage|security|performance]  # Re-run specific gate
@qms-bot skip-gate [gate-name] --reason="justification"  # Skip gate (requires approval)
@qms-bot exempt-gate [gate-name] --justification="reason"  # Request exemption
```

### Emergency & Escalation
```bash
@qms-bot priority critical --reason="Production outage"  # Critical priority
@qms-bot extend-sla 48h --reason="Complex integration"   # Extend SLA
@qms-bot architecture-review --priority high             # Request arch review
```

---

## Card 2: Quality Gates & Thresholds

### DoR (Definition of Ready) - Step 1
| Check | Threshold | Tool/Method |
|-------|-----------|-------------|
| **PR Description** | ≥ 100 characters | Automated validation |
| **Issue Links** | At least 1 linked issue | GitHub API |
| **Branch Naming** | Follows conventions | Regex validation |
| **Initial CI** | All checks passing | GitHub Actions |
| **Labels** | Required labels applied | GitHub API |

**Pass Criteria**: All DoR checks must pass ✅

### Progress Review - Step 2
| Check | Threshold | Reviewer Type |
|-------|-----------|---------------|
| **Code Quality** | Architecture review | Senior/Lead developers |
| **Security Review** | Vulnerability scan | Security team |
| **Performance** | No regression | Performance experts |
| **Test Coverage** | Adequate tests added | QA/Testing team |

**Pass Criteria**: All reviewer feedback addressed ✅

### DoD (Definition of Done) - Step 3
| Gate | Threshold | Tool | Action on Failure |
|------|-----------|------|-------------------|
| **Code Coverage** | ≥ 80% | Jest/Istanbul | Add missing tests |
| **Security Scan** | No high/critical vulnerabilities | Snyk/OWASP | Fix vulnerabilities |
| **Performance** | < 5% regression | Lighthouse/K6 | Optimize performance |
| **Bundle Size** | < 5% increase | Bundlephobia | Optimize bundle |
| **Linting** | 0 errors | ESLint/Prettier | Fix code style |
| **Type Checking** | 0 errors | TypeScript | Fix type issues |

**Pass Criteria**: All gates must pass ✅

### Final Review - Step 4
| Check | Reviewer | Focus Area |
|-------|----------|------------|
| **Business Requirements** | Product Owner | Acceptance criteria |
| **Compliance Audit** | Compliance Team | SOC2, GDPR, regulations |
| **Architecture** | Tech Lead/Architect | System design |
| **Release Readiness** | Release Manager | Deployment safety |

**Pass Criteria**: Business approval + compliance sign-off ✅

---

## Card 3: PR Template Checklist

### Required Sections
- [ ] **Description**: What does this PR do? (≥ 100 chars)
- [ ] **Why**: Business justification or bug details
- [ ] **Testing**: How was this tested?
- [ ] **Breaking Changes**: List any breaking changes
- [ ] **Screenshots**: For UI changes
- [ ] **Checklist**: All items checked before submission

### Quality Gates Checklist
- [ ] **Code Coverage**: ≥ 80% test coverage
- [ ] **Security**: No high/critical vulnerabilities  
- [ ] **Performance**: No significant regressions
- [ ] **Documentation**: Updated if needed
- [ ] **Breaking Changes**: Documented and approved

### Review Requirements
- [ ] **Expertise**: Required review types selected
- [ ] **Priority**: Appropriate priority level set
- [ ] **Dependencies**: Related PRs linked
- [ ] **Rollback**: Rollback plan if needed

---

## Card 4: Quality Gate Troubleshooting

### Coverage Failures (< 80%)
```bash
# Check current coverage
npm run test:coverage

# Identify uncovered lines
open coverage/lcov-report/index.html

# Focus on critical paths
# - Error conditions
# - Edge cases  
# - Integration points
```

### Security Vulnerabilities
```bash
# Check vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Manual dependency updates
npm update [package-name]
npm install [package-name]@latest
```

### Performance Regressions
```bash
# Run performance tests
npm run perf:test

# Profile build time
npm run build --profile

# Analyze bundle size
npm run build:analyze
```

### Linting/Type Errors
```bash
# Auto-fix linting
npm run lint:fix
npm run format

# Check TypeScript
npm run type-check

# Fix remaining issues manually
```

---

## Card 5: Branch & Commit Conventions

### Branch Naming
```
feature/description-of-feature      # New features
bugfix/issue-description           # Bug fixes  
hotfix/critical-issue-fix          # Emergency fixes
release/v1.2.0                     # Release branches
chore/maintenance-task             # Maintenance
docs/update-readme                 # Documentation
```

### Commit Messages
```
feat: add user authentication system    # New feature
fix: resolve login redirect loop         # Bug fix
docs: update API documentation          # Documentation
style: fix code formatting              # Code style
refactor: improve error handling        # Code refactor
test: add integration tests             # Tests
chore: update dependencies              # Maintenance
```

### Issue Linking
```markdown
Fixes #123           # Closes issue
Closes #456          # Closes issue
Resolves #789        # Closes issue
Related to #101      # References issue
```

---

## Card 6: Emergency Procedures

### Production Hotfix Process
1. **Create emergency branch**:
   ```bash
   git checkout -b hotfix/critical-security-fix
   ```

2. **Request expedited review**:
   ```bash
   @qms-bot priority critical --reason="Security vulnerability"
   ```

3. **Skip non-critical gates** (if approved):
   ```bash
   @qms-bot skip-gate coverage --reason="Critical security fix"
   ```

4. **Notify stakeholders**:
   ```bash
   @security-team @tech-lead Urgent security fix needed
   ```

### QMS System Down
1. **Check system status**:
   ```bash
   curl -f https://qms.company.com/health
   ```

2. **Use manual process**:
   ```markdown
   @team-lead QMS system is down. Using manual review process.
   
   Manual checklist completed:
   - ✅ Code review by @senior-dev
   - ✅ Security review by @security-team
   - ✅ Tests passing locally
   - ✅ Documentation updated
   ```

3. **Document for later**:
   ```markdown
   Note: Approved during QMS outage on [date].
   Follow-up QMS validation in PR #[number]
   ```

---

## Card 7: Review Assignment Matrix

### Code Change Types → Required Reviewers

| File Pattern | Reviewer Type | Expertise |
|--------------|---------------|-----------|
| `**/*.sql`, `migrations/` | DBA, Backend Lead | Database |
| `**/*.js`, `**/*.ts` | Senior Developer | JavaScript/TypeScript |
| `**/*security*`, `auth/` | Security Team | Security |
| `**/*.yaml`, `docker/`, `.github/workflows/` | DevOps Team | Infrastructure |
| `**/*.test.*`, `__tests__/` | QA Lead | Testing |
| `**/*.md`, `docs/` | Tech Writer | Documentation |

### Reviewer Load Balancing
- **Max Active Reviews**: 5 per reviewer
- **SLA Response Time**: 24 hours for normal priority
- **Escalation Time**: 48 hours without response
- **Emergency Override**: Tech leads can approve critical fixes

---

## Card 8: Status Indicators & Actions

### PR Status Indicators
| Status | Meaning | Action Required |
|--------|---------|-----------------|
| 🟢 **Passed** | Quality gate met | Continue to next step |
| 🟡 **Pending** | Check in progress | Wait for completion |
| ⚠️ **Warning** | Non-blocking issue | Review and address if needed |
| 🔴 **Failed** | Blocking issue | Must fix before proceeding |
| ⏸️ **Paused** | Manual intervention | Check comments/requirements |
| 🔄 **In Review** | Awaiting reviewer | Ping reviewer if overdue |

### Quality Gate Status
```bash
# Check overall status
@qms-bot status

# Expected output format:
✅ DoR: Passed
🔄 Progress Review: In Review (2/3 approvals)  
⏸️ DoD: Pending (coverage: 75% - need 80%)
⚪ Final Review: Not started
```

---

## Card 9: Performance Thresholds

### Response Time Limits
| Endpoint Type | Threshold | Measurement |
|---------------|-----------|-------------|
| **API Calls** | < 200ms | Average response time |
| **Database Queries** | < 100ms | Query execution time |
| **Page Load** | < 2s | Time to interactive |
| **Build Time** | < 5 min | CI/CD pipeline duration |

### Resource Usage Limits  
| Resource | Threshold | Action |
|----------|-----------|--------|
| **Memory Usage** | < 10% increase | Optimize memory allocation |
| **Bundle Size** | < 5% increase | Code splitting, tree shaking |
| **Docker Image** | < 20% increase | Optimize layers, multi-stage builds |
| **Test Duration** | < 20% increase | Parallelize, optimize slow tests |

### Monitoring Commands
```bash
# Performance testing
npm run perf:test                # Run performance tests
npm run bundle:analyze           # Analyze bundle size  
npm run lighthouse              # Run Lighthouse audit
docker images --format "table {{.Repository}}\t{{.Size}}"  # Check image sizes
```

---

## Card 10: Integration Checklist

### Before Creating PR
- [ ] Branch is up to date with target branch
- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] No console.log or debug statements
- [ ] Documentation updated if needed

### PR Creation
- [ ] Use QMS PR template
- [ ] Fill out all required sections
- [ ] Link to related issues
- [ ] Add appropriate labels
- [ ] Set correct priority level

### During Review
- [ ] Address all reviewer feedback
- [ ] Update tests if implementation changes  
- [ ] Resolve all conversations
- [ ] Keep PR size manageable (< 400 lines)
- [ ] Respond to reviews within 24 hours

### Before Merge
- [ ] All quality gates passed
- [ ] All reviewers approved
- [ ] No merge conflicts
- [ ] Final CI checks passed
- [ ] Deployment plan ready (if needed)

---

## Card 11: Common File Patterns & Gates

### File Patterns Triggering Specific Gates

#### Security Scan Required
```
**/auth/**
**/security/**
**/*auth*
**/*security*
**/*password*
**/*token*
**/api/admin/**
```

#### Performance Testing Required  
```
**/api/**
**/*controller*
**/*service*
**/database/**
**/*query*
**/public/**
```

#### Documentation Update Required
```
**/README.md
**/docs/**
**/api/**
**/*config*
**/package.json
```

#### Architecture Review Required
```
**/src/core/**
**/lib/**
**/shared/**
**/*architecture*
**/*framework*
**/migrations/**
```

---

## Card 12: Error Codes & Solutions

### Common QMS Error Codes

| Code | Error | Solution |
|------|-------|----------|
| **QMS-001** | DoR validation failed | Check PR description, issue links |
| **QMS-002** | Coverage below threshold | Add tests to reach 80% coverage |
| **QMS-003** | Security vulnerability detected | Fix vulnerabilities in dependencies |
| **QMS-004** | Performance regression | Optimize code or justify regression |
| **QMS-005** | Reviewer assignment failed | Check expertise requirements |
| **QMS-006** | SLA exceeded | Contact team lead for escalation |

### GitHub Actions Failures
```bash
# Re-run failed checks
gh pr checks 123 --required     # List required checks
gh workflow run "QMS Review"     # Re-run workflow

# Common fixes
git commit --amend --no-edit     # Fix commit message
git push --force-with-lease      # Update PR safely
```

---

## Support & Resources

### Quick Help
- **Slack Channels**: `#qms-help`, `#qms-support`  
- **Documentation**: `.ruru/docs/qms/`
- **Training**: `.ruru/docs/qms/training/`
- **Troubleshooting**: `.ruru/docs/qms/troubleshooting/`

### Escalation Contacts
| Issue Type | Contact | Response Time |
|------------|---------|---------------|
| **Critical/Security** | `@security-team` + `@qms-coordinators` | 1 hour |
| **Production** | `@qms-coordinators` + `@team-lead` | 2 hours |
| **Standard** | `#qms-support` | 4 hours |
| **Training** | `#qms-help` | Next business day |

### Command Reference
```bash
# Print this reference
@qms-bot reference

# Get help for specific command  
@qms-bot help [command]

# Check QMS version
@qms-bot version
```

---

*Quick Reference Cards v1.0 - For complete documentation, see [QMS Developer Guide](.ruru/docs/qms/developer-guides/comprehensive-qms-developer-guide-v1.md)*

**Print-Friendly**: Each card is designed to fit on a standard page for easy printing and desk reference.

**Last Updated**: 2025-08-17 | **Version**: 1.0.0 | **Status**: Active