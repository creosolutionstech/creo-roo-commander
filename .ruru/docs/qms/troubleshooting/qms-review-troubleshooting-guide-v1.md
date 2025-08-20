+++
# --- Document Metadata ---
id = "qms-troubleshooting-guide-v1"
title = "QMS Review Troubleshooting Guide v1.0"
context_type = "troubleshooting"
scope = "Common QMS review issues and their solutions"
target_audience = ["developers", "team-leads", "qms-coordinators", "support-teams"]
granularity = "detailed"
status = "active"
last_updated = "2025-08-17T05:59:00Z"
version = "1.0.0"

# --- QMS Integration Metadata ---
quality_gates_integration = true
automation_level = "high"
github_integration = true
troubleshooting_guide = true

# --- Related Documentation ---
related_docs = [
    ".ruru/docs/qms/developer-guides/comprehensive-qms-developer-guide-v1.md",
    ".ruru/docs/qms/workflows/4-step-qms-review-workflow-v1.md",
    ".ruru/docs/qms/workflows/review-delegation-system-v1.md",
    ".github/PULL_REQUEST_TEMPLATE/qms_standard_pr_template.md"
]
tags = ["qms", "troubleshooting", "issues", "solutions", "debugging", "support"]
+++

# QMS Review Troubleshooting Guide v1.0

## Table of Contents

1. [Getting Started](#getting-started)
2. [DoR (Definition of Ready) Issues](#dor-definition-of-ready-issues)
3. [Progress Review Issues](#progress-review-issues)
4. [DoD (Definition of Done) Issues](#dod-definition-of-done-issues)
5. [Final Review Issues](#final-review-issues)
6. [Quality Gate Failures](#quality-gate-failures)
7. [Review Assignment Issues](#review-assignment-issues)
8. [Performance Issues](#performance-issues)
9. [Integration Issues](#integration-issues)
10. [Emergency Procedures](#emergency-procedures)
11. [Getting Help](#getting-help)

---

## Getting Started

### Quick Diagnostic Commands

Before diving into specific issues, run these diagnostic commands to get a quick overview of your QMS status:

```bash
# Check overall QMS status
@qms-bot status

# View quality gate results
gh pr checks 123

# Check reviewer assignments
gh pr view 123 --json reviewRequests

# View recent QMS activity
gh pr view 123 --json timelineItems
```

### Common Status Indicators

| Status | Meaning | Action Required |
|--------|---------|----------------|
| 🟢 **Passed** | Quality gate met | None - continue to next step |
| 🟡 **Pending** | Check in progress | Wait for completion |
| ⚠️ **Warning** | Non-blocking issue | Review and address if needed |
| 🔴 **Failed** | Blocking issue | Must resolve before proceeding |
| ⏸️ **Paused** | Manual intervention needed | Check comments/requirements |

---

## DoR (Definition of Ready) Issues

### Issue: PR Description Too Short

**Symptoms:**
- DoR validation fails with "Description insufficient"
- Error: "PR description must be at least 100 characters"

**Solution:**
1. Edit your PR description to be more comprehensive
2. Include these sections:
   - What the change does
   - Why it's needed
   - How to test it
   - Any potential risks

**Example Fix:**
```markdown
## Description
This PR implements user authentication using JWT tokens to secure API endpoints.

## Why This Change
Previous authentication was basic and insecure. JWT provides stateless, scalable auth.

## Testing
- Added unit tests for auth middleware
- Tested login/logout flows manually
- Verified token expiration handling

## Risks
- Session handling changes may affect existing users
- Requires database migration for user tokens
```

### Issue: Missing Issue Links

**Symptoms:**
- DoR fails with "No linked issues found"
- Missing GitHub issue references

**Solution:**
1. Link to related issues using keywords:
   ```markdown
   Fixes #123
   Closes #456
   Resolves #789
   Related to #101
   ```
2. Ensure issues exist and are accessible
3. Use proper GitHub linking syntax

### Issue: Branch Naming Violations

**Symptoms:**
- DoR fails with "Invalid branch name"
- Branch doesn't follow naming conventions

**Solution:**
1. Rename your branch to follow conventions:
   ```bash
   # Good examples:
   feature/user-authentication
   bugfix/login-redirect-loop
   hotfix/security-patch-oauth
   release/v2.1.0
   ```
2. If you can't rename (already pushed), create a new branch:
   ```bash
   git checkout -b feature/proper-name
   git cherry-pick <commit-range>
   git push origin feature/proper-name
   ```

### Issue: Initial CI Pipeline Failures

**Symptoms:**
- DoR blocked by failed CI checks
- Build or test failures prevent DoR validation

**Solution:**
1. **Build Failures:**
   ```bash
   # Fix common build issues
   npm install          # Update dependencies
   npm run build        # Test build locally
   npm run lint:fix     # Auto-fix linting issues
   ```

2. **Test Failures:**
   ```bash
   npm test             # Run tests locally
   npm run test:coverage # Check coverage
   npm run test:watch   # Debug failing tests
   ```

3. **Dependency Issues:**
   ```bash
   npm audit fix        # Fix security vulnerabilities
   npm ci               # Clean install
   ```

---

## Progress Review Issues

### Issue: No Reviewers Assigned

**Symptoms:**
- PR stuck in "Waiting for reviewers" state
- No automatic reviewer assignment

**Solution:**
1. **Request manual assignment:**
   ```markdown
   @qms-bot reassign
   ```

2. **Check expertise requirements:**
   - Verify your PR template selections
   - Ensure required expertise boxes are checked
   - Add specific reviewer requests if needed

3. **Manual reviewer assignment:**
   ```bash
   gh pr edit 123 --add-reviewer @security-team
   ```

### Issue: Reviewers Not Responding

**Symptoms:**
- Review assigned but no activity for 24+ hours
- SLA approaching or exceeded

**Solution:**
1. **Check reviewer availability:**
   ```markdown
   @qms-bot status
   ```

2. **Request priority review:**
   ```markdown
   @qms-bot priority high --reason="Blocking release"
   ```

3. **Escalate if urgent:**
   ```markdown
   @qms-coordinators This PR needs urgent review for [reason]
   ```

4. **Request reassignment:**
   ```markdown
   @qms-bot reassign --reason="Original reviewer unavailable"
   ```

### Issue: Review Comments Not Being Resolved

**Symptoms:**
- Conversations remain "Unresolved"
- Blocking progress to DoD validation

**Solution:**
1. **Address all feedback:**
   - Implement requested changes
   - Respond to each comment
   - Mark conversations as resolved when complete

2. **If you disagree with feedback:**
   ```markdown
   I understand your concern about [issue]. However, I believe [alternative approach] 
   is better because [reasoning]. Can we discuss this further?
   ```

3. **Request clarification:**
   ```markdown
   Could you provide more specific guidance on [issue]? 
   I want to make sure I understand your concern correctly.
   ```

### Issue: Code Quality Standards Violations

**Symptoms:**
- Reviewer requests code style changes
- Architecture concerns raised

**Solution:**
1. **Run quality checks locally:**
   ```bash
   npm run lint          # Check coding standards
   npm run format        # Auto-format code
   npm run complexity    # Check complexity metrics
   ```

2. **Address specific feedback:**
   - Refactor complex functions (cyclomatic complexity > 10)
   - Extract reusable components
   - Add missing documentation
   - Improve variable naming

3. **Request architecture review:**
   ```markdown
   @architecture-team Could you review the design approach in this PR?
   ```

---

## DoD (Definition of Done) Issues

### Issue: Code Coverage Below Threshold

**Symptoms:**
- DoD fails with "Coverage below 80%"
- Missing test coverage for new code

**Solution:**
1. **Check current coverage:**
   ```bash
   npm run test:coverage
   ```

2. **Identify uncovered code:**
   ```bash
   # Look at coverage report
   open coverage/lcov-report/index.html
   ```

3. **Add missing tests:**
   ```javascript
   // Example: Test the new function
   describe('getUserData', () => {
     it('should return user data for valid ID', async () => {
       const result = await getUserData('123');
       expect(result).toEqual(expectedUserData);
     });
     
     it('should throw error for invalid ID', async () => {
       await expect(getUserData('invalid')).rejects.toThrow();
     });
   });
   ```

4. **Focus on critical paths:**
   - Test error conditions
   - Test edge cases
   - Test integration points

### Issue: Security Vulnerabilities Detected

**Symptoms:**
- DoD blocked by security scan failures
- High/medium severity vulnerabilities found

**Solution:**
1. **Review security report:**
   ```bash
   npm audit
   npm audit --fix
   ```

2. **Update dependencies:**
   ```bash
   # Update vulnerable packages
   npm update package-name
   
   # For major version updates
   npm install package-name@latest
   ```

3. **Manual fixes for code issues:**
   ```javascript
   // Bad: SQL injection vulnerable
   const query = `SELECT * FROM users WHERE id = ${userId}`;
   
   // Good: Parameterized query
   const query = 'SELECT * FROM users WHERE id = ?';
   const result = await db.query(query, [userId]);
   ```

4. **Request security exception (if necessary):**
   ```markdown
   @security-team This vulnerability is in legacy code that will be replaced in v2.0. 
   Can we accept risk temporarily with mitigation: [describe mitigation]
   ```

### Issue: Performance Benchmarks Failing

**Symptoms:**
- DoD blocked by performance regression
- Build/test times exceeding limits

**Solution:**
1. **Identify performance bottlenecks:**
   ```bash
   # Run performance tests
   npm run perf:test
   
   # Profile build time
   npm run build --profile
   ```

2. **Common performance fixes:**
   ```javascript
   // Bad: Inefficient loop
   users.forEach(user => {
     database.findUserRoles(user.id); // N+1 query
   });
   
   // Good: Batch query
   const userIds = users.map(u => u.id);
   const roles = await database.findRolesByUserIds(userIds);
   ```

3. **Optimize bundle size:**
   ```bash
   # Analyze bundle
   npm run build:analyze
   
   # Remove unused dependencies
   npm run deps:check
   ```

### Issue: Documentation Not Updated

**Symptoms:**
- DoD requires documentation updates
- API docs, README, or changelog missing

**Solution:**
1. **Update API documentation:**
   ```javascript
   /**
    * Retrieves user data by ID
    * @param {string} userId - The user identifier
    * @returns {Promise<User>} User object with profile data
    * @throws {NotFoundError} When user doesn't exist
    */
   async function getUserData(userId) {
     // implementation
   }
   ```

2. **Update README if needed:**
   ```markdown
   ## New Feature: User Authentication
   
   Added JWT-based authentication. See [Auth Guide](./docs/auth.md) for details.
   
   ### Breaking Changes
   - `/api/users` now requires authentication header
   - Session cookies are no longer used
   ```

3. **Add changelog entry:**
   ```markdown
   ## [1.2.0] - 2025-08-17
   ### Added
   - JWT-based user authentication
   - Password reset functionality
   
   ### Changed
   - API authentication method (BREAKING)
   ```

---

## Final Review Issues

### Issue: Business Requirements Not Met

**Symptoms:**
- Final review blocked by business alignment concerns
- Requirements verification failures

**Solution:**
1. **Review original requirements:**
   - Check linked issues/tickets
   - Verify acceptance criteria met
   - Confirm scope alignment

2. **Document compliance:**
   ```markdown
   ## Business Requirements Verification
   
   ✅ REQ-1: Users can authenticate with email/password
   ✅ REQ-2: Session timeout after 24 hours
   ✅ REQ-3: Password reset via email
   ⚠️ REQ-4: Social login (deferred to v1.1)
   ```

3. **Request stakeholder review:**
   ```markdown
   @product-team @business-stakeholders 
   Please review this implementation against original requirements.
   ```

### Issue: Compliance Audit Failures

**Symptoms:**
- Regulatory compliance checks failing
- GDPR, SOC2, or other compliance issues

**Solution:**
1. **Review compliance requirements:**
   ```markdown
   @compliance-team What specific compliance issues need addressing?
   ```

2. **Common compliance fixes:**
   ```javascript
   // Add data retention policies
   const userData = {
     ...user,
     dataRetentionPolicy: '2_YEARS',
     consentGiven: true,
     consentDate: new Date()
   };
   
   // Add audit logging
   auditLog.record('USER_DATA_ACCESS', {
     userId,
     accessor: req.user.id,
     timestamp: new Date()
   });
   ```

3. **Document compliance measures:**
   ```markdown
   ## Compliance Checklist
   - ✅ Personal data encrypted at rest
   - ✅ Data access logged
   - ✅ User consent recorded
   - ✅ Data retention policy applied
   ```

---

## Quality Gate Failures

### Issue: Linting Errors

**Symptoms:**
- Quality gate fails with code style violations
- ESLint, Prettier, or similar tool errors

**Quick Fix:**
```bash
# Auto-fix most linting issues
npm run lint:fix
npm run format

# Check remaining issues
npm run lint
```

**Manual Fixes:**
```javascript
// Bad: Unused variable
const unusedVar = 'test';
const result = processData(data);

// Good: Remove unused, fix naming
const result = processData(inputData);

// Bad: Console.log in production
console.log('Debug info:', data);

// Good: Use proper logging
logger.debug('Processing user data', { userId: data.id });
```

### Issue: Type Errors (TypeScript)

**Symptoms:**
- TypeScript compilation failures
- Type checking errors

**Solution:**
```typescript
// Bad: Missing types
function processUser(user) {
  return user.name.toUpperCase();
}

// Good: Proper typing
interface User {
  id: string;
  name: string;
  email: string;
}

function processUser(user: User): string {
  return user.name.toUpperCase();
}

// Bad: Any type
const apiResponse: any = await fetchData();

// Good: Proper interface
interface ApiResponse {
  status: 'success' | 'error';
  data: User[];
  message?: string;
}

const apiResponse: ApiResponse = await fetchData();
```

### Issue: Test Failures

**Symptoms:**
- Unit or integration tests failing
- Flaky test behavior

**Debugging Steps:**
```bash
# Run tests with detailed output
npm test -- --verbose

# Run specific test file
npm test -- --testNamePattern="getUserData"

# Run with debugger
npm run test:debug

# Check test coverage
npm run test:coverage
```

**Common Test Fixes:**
```javascript
// Bad: Flaky async test
it('should fetch user data', () => {
  fetchUserData().then(data => {
    expect(data.name).toBe('John');
  });
});

// Good: Proper async handling
it('should fetch user data', async () => {
  const data = await fetchUserData();
  expect(data.name).toBe('John');
});

// Bad: Test interdependency
let sharedState = {};
it('test 1', () => {
  sharedState.value = 'test';
});
it('test 2', () => {
  expect(sharedState.value).toBe('test'); // Fragile!
});

// Good: Independent tests
it('test 1', () => {
  const state = { value: 'test' };
  expect(state.value).toBe('test');
});
```

---

## Review Assignment Issues

### Issue: Wrong Reviewer Assigned

**Symptoms:**
- Reviewer lacks required expertise
- Assignment doesn't match code changes

**Solution:**
1. **Request reassignment:**
   ```markdown
   @qms-bot reassign --expertise security
   ```

2. **Manually request specific reviewer:**
   ```bash
   gh pr edit 123 --add-reviewer @security-specialist
   ```

3. **Update PR template:**
   - Check correct expertise boxes
   - Add priority level if needed
   - Specify required review types

### Issue: Reviewer Overload

**Symptoms:**
- Reviewer has too many active reviews
- Long wait times for review

**Solution:**
1. **Check reviewer workload:**
   ```markdown
   @qms-bot workload @reviewer-name
   ```

2. **Request load balancing:**
   ```markdown
   @qms-bot reassign --balance-load
   ```

3. **Escalate if urgent:**
   ```markdown
   @qms-coordinators Please help with reviewer assignment for urgent PR
   ```

### Issue: Review SLA Exceeded

**Symptoms:**
- Review taking longer than expected SLA
- Automated escalation notifications

**Solution:**
1. **Check escalation status:**
   ```markdown
   @qms-bot sla-status
   ```

2. **Ping reviewer directly:**
   ```markdown
   @reviewer-name Could you please review this PR when you have a moment? 
   It's approaching the SLA deadline.
   ```

3. **Request manager escalation:**
   ```markdown
   @team-lead This PR has exceeded SLA and needs attention
   ```

---

## Performance Issues

### Issue: QMS Process Taking Too Long

**Symptoms:**
- Quality gates running longer than expected
- Timeouts in validation steps

**Diagnostic Steps:**
1. **Check system status:**
   ```bash
   # Check CI/CD pipeline status
   gh workflow list --repo organization/repo
   
   # Check recent runs
   gh run list --limit 10
   ```

2. **Identify bottlenecks:**
   ```bash
   # Check test execution time
   npm test -- --verbose --detectSlowTestThreshold 10000
   
   # Profile build performance
   npm run build -- --profile
   ```

**Solutions:**
1. **Optimize tests:**
   ```javascript
   // Bad: Slow setup in every test
   beforeEach(async () => {
     await setupCompleteDatabase();
   });
   
   // Good: Shared setup with cleanup
   beforeAll(async () => {
     await setupDatabase();
   });
   
   beforeEach(() => {
     resetDatabaseState();
   });
   ```

2. **Parallelize CI steps:**
   ```yaml
   # .github/workflows/qms.yml
   jobs:
     test:
       strategy:
         matrix:
           test-type: [unit, integration, e2e]
       steps:
         - run: npm run test:${{ matrix.test-type }}
   ```

### Issue: High Memory Usage

**Symptoms:**
- CI runners running out of memory
- Build processes killed

**Solution:**
1. **Optimize memory usage:**
   ```bash
   # Increase Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=4096"
   
   # Use memory-efficient test runner
   npm test -- --max-workers=2
   ```

2. **Clean up resources:**
   ```javascript
   // Proper cleanup in tests
   afterEach(() => {
     jest.clearAllMocks();
     jest.clearAllTimers();
   });
   
   afterAll(async () => {
     await database.close();
     await server.close();
   });
   ```

---

## Integration Issues

### Issue: GitHub Integration Problems

**Symptoms:**
- QMS bot not responding to commands
- GitHub checks not updating

**Solution:**
1. **Check bot permissions:**
   ```bash
   # Verify bot has correct permissions
   gh api repos/owner/repo/collaborators/qms-bot
   ```

2. **Re-trigger automation:**
   ```markdown
   @qms-bot recheck
   ```

3. **Manual workflow dispatch:**
   ```bash
   gh workflow run "QMS Review" --ref your-branch
   ```

### Issue: Webhook Failures

**Symptoms:**
- Events not triggering QMS processes
- Delayed or missing notifications

**Diagnostic Steps:**
1. **Check webhook delivery:**
   ```bash
   # View recent webhook deliveries (requires admin)
   gh api repos/owner/repo/hooks/123/deliveries
   ```

2. **Test webhook manually:**
   ```bash
   # Re-deliver webhook
   gh api repos/owner/repo/hooks/123/deliveries/456/attempts --method POST
   ```

### Issue: Database Connection Problems

**Symptoms:**
- QMS data not persisting
- Review state inconsistencies

**Solution:**
1. **Check database connectivity:**
   ```bash
   # Test database connection
   npm run db:test-connection
   
   # Check database health
   npm run db:health-check
   ```

2. **Reset connection pool:**
   ```bash
   # Restart database connections
   npm run db:reset-pool
   ```

---

## Emergency Procedures

### Critical Security Issue

**Immediate Actions:**
1. **Create hotfix branch:**
   ```bash
   git checkout -b hotfix/critical-security-fix
   ```

2. **Apply minimal fix:**
   - Focus only on security issue
   - Avoid unrelated changes

3. **Request expedited review:**
   ```markdown
   @qms-bot priority critical --reason="Security vulnerability fix"
   @security-team Urgent security fix needed
   ```

4. **Skip non-critical gates:**
   ```markdown
   @qms-bot skip-gate coverage --reason="Critical security fix"
   @qms-bot skip-gate performance --reason="Security priority"
   ```

### Production Outage

**Emergency Process:**
1. **Create emergency branch:**
   ```bash
   git checkout -b emergency/production-fix
   ```

2. **Request emergency approval:**
   ```markdown
   @qms-coordinators PRODUCTION OUTAGE - Need emergency approval
   
   Issue: [Brief description]
   Impact: [User/business impact]
   Fix: [What this PR does]
   Rollback: [Rollback plan]
   ```

3. **Get senior approval:**
   ```markdown
   @tech-lead @senior-engineer Please approve emergency fix
   ```

4. **Deploy with monitoring:**
   - Have rollback ready
   - Monitor deployment closely
   - Create follow-up PR for proper testing

### QMS System Down

**When QMS is unavailable:**
1. **Check system status:**
   ```bash
   # Check QMS service health
   curl -f https://qms.company.com/health
   ```

2. **Use manual process:**
   ```markdown
   @team-lead QMS system is down. Using manual review process.
   
   Manual checklist:
   - ✅ Code review completed by @senior-dev
   - ✅ Security reviewed by @security-team  
   - ✅ Tests passing locally
   - ✅ Documentation updated
   ```

3. **Document for later:**
   ```markdown
   Note: This PR was approved during QMS outage on [date].
   Will run full QMS validation in follow-up PR #[number]
   ```

---

## Getting Help

### Self-Service Resources

1. **Documentation:**
   - [Comprehensive QMS Developer Guide](.ruru/docs/qms/developer-guides/comprehensive-qms-developer-guide-v1.md)
   - [4-Step Review Workflow](.ruru/docs/qms/workflows/4-step-qms-review-workflow-v1.md)
   - [PR Template Guide](.github/PULL_REQUEST_TEMPLATE/qms_standard_pr_template.md)

2. **Diagnostic Commands:**
   ```bash
   # Get QMS status
   @qms-bot status
   @qms-bot help
   
   # Check specific issues
   gh pr checks 123
   gh pr view 123 --json statusCheckRollup
   ```

### Contact Support

| Issue Type | Contact | Response Time |
|------------|---------|---------------|
| **Critical/Security** | `@security-team` + `@qms-coordinators` | 1 hour |
| **Production Blocking** | `@qms-coordinators` + `@team-lead` | 2 hours |
| **Standard Issues** | `#qms-support` channel | 4 hours |
| **Questions/Training** | `#qms-help` channel | Next business day |

### Escalation Path

1. **Level 1:** Self-service using this guide
2. **Level 2:** Team lead or senior developer
3. **Level 3:** QMS coordinators (`@qms-coordinators`)
4. **Level 4:** Engineering management
5. **Level 5:** VP Engineering (critical issues only)

### Providing Information When Asking for Help

Include this information in your help request:

```markdown
## Issue Summary
Brief description of the problem

## PR Details
- PR: #123
- Branch: feature/branch-name
- Target: main

## QMS Status
@qms-bot status

## Error Messages
```
[Copy exact error messages here]
```

## What I've Tried
- [List troubleshooting steps attempted]
- [Include relevant commands run]

## Expected Behavior
[What should happen]

## Additional Context
[Any other relevant information]
```

---

## Feedback and Improvements

Found an issue not covered in this guide? Help us improve:

1. **Report missing issues:**
   ```markdown
   @qms-coordinators This troubleshooting scenario should be added to the guide:
   [Describe the issue and solution]
   ```

2. **Suggest improvements:**
   - Create an issue with the `qms-documentation` label
   - Include specific suggestions for better explanations
   - Share successful workarounds

3. **Contribute solutions:**
   - Submit PRs to improve this guide
   - Share new troubleshooting scenarios
   - Update outdated information

---

*This guide is actively maintained and updated based on common issues encountered by development teams. Last updated: 2025-08-17*