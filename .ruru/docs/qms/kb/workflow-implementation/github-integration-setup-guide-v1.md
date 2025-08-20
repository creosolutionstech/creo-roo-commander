+++
# --- Basic Metadata ---
id = "qms-github-integration-setup-guide-v1"
title = "QMS GitHub Integration Setup Guide v1.0"
context_type = "setup_guide"
scope = "GitHub repository configuration and integration procedures for QMS deployment"
target_audience = ["devops", "repository-administrators", "qms-coordinators"]
granularity = "detailed"
status = "active"
created_date = "2025-08-17T23:21:00Z"
updated_date = "2025-08-17T23:21:00Z"
author = "util-writer"
version = "1.0"
tags = ["qms", "github", "integration", "setup", "configuration", "repository", "permissions"]
related_context = [
    ".ruru/docs/qms/kb/workflow-implementation/4-step-qms-workflow-implementation-guide-v1.md",
    ".ruru/docs/qms/github-integration/review-assignment/qms-review-assignment-configuration-v1.md"
]
relevance = "Critical: Repository-level setup procedures for QMS integration"
+++

# QMS GitHub Integration Setup Guide v1.0

## Overview

This guide provides step-by-step procedures for configuring GitHub repositories to integrate with the QMS 4-Step Review Workflow. It covers repository settings, permissions, integrations, and automated configurations needed for successful QMS deployment.

## Prerequisites

### Administrative Requirements
- Repository owner or admin privileges
- Organization admin access (for team management)
- GitHub Apps installation permissions
- API token with appropriate scopes

### Technical Requirements
- GitHub CLI (`gh`) installed and authenticated
- Git configured with appropriate credentials
- Access to organization settings
- Understanding of GitHub Actions and branch protection

## Setup Procedure

### Phase 1: Repository Configuration

#### 1.1 Repository Settings Configuration

**Step 1: Enable Required Repository Features**

```bash
#!/bin/bash
# QMS Repository Feature Enablement Script

REPO_OWNER="${1:-$(gh repo view --json owner -q .owner.login)}"
REPO_NAME="${2:-$(gh repo view --json name -q .name)}"

echo "Configuring repository features for $REPO_OWNER/$REPO_NAME"

# Enable Issues (required for QMS tracking)
gh api repos/$REPO_OWNER/$REPO_NAME \
  --method PATCH \
  --field has_issues=true \
  --field has_projects=true \
  --field has_wiki=false

# Enable vulnerability alerts
gh api repos/$REPO_OWNER/$REPO_NAME/vulnerability-alerts \
  --method PUT

# Enable automated security fixes
gh api repos/$REPO_OWNER/$REPO_NAME/automated-security-fixes \
  --method PUT

echo "Repository features configured successfully"
```

**Step 2: Configure Repository Topics and Description**

```bash
#!/bin/bash
# QMS Repository Metadata Configuration

# Set repository topics for QMS identification
gh api repos/$REPO_OWNER/$REPO_NAME/topics \
  --method PUT \
  --field names='["qms-enabled","quality-management","automated-review","ci-cd"]'

# Update repository description
gh api repos/$REPO_OWNER/$REPO_NAME \
  --method PATCH \
  --field description="QMS-enabled repository with automated quality management and 4-step review workflow"

echo "Repository metadata updated"
```

#### 1.2 Branch Strategy Setup

**Step 1: Create Standard Branch Structure**

```bash
#!/bin/bash
# QMS Branch Structure Setup

# Ensure main branch exists and is default
gh api repos/$REPO_OWNER/$REPO_NAME \
  --method PATCH \
  --field default_branch="main"

# Create develop branch if it doesn't exist
if ! git ls-remote --heads origin develop | grep -q develop; then
  git checkout -b develop
  git push -u origin develop
  echo "Created develop branch"
fi

# Create release branch template (example)
git checkout -b release/template
echo "# Release Template Branch" > README-release.md
git add README-release.md
git commit -m "feat: add release template branch"
git push -u origin release/template
git checkout main
git branch -d release/template

echo "Branch structure configured"
```

**Step 2: Configure Branch Protection Rules**

```bash
#!/bin/bash
# QMS Branch Protection Configuration

# Main branch protection (Production)
gh api repos/$REPO_OWNER/$REPO_NAME/branches/main/protection \
  --method PUT \
  --field required_status_checks='{
    "strict": true,
    "contexts": [
      "QMS Step 1 - DoR Validation",
      "QMS Step 2 - Progress Monitoring", 
      "QMS Step 3 - DoD Validation",
      "QMS Step 4 - Final QMS Review",
      "continuous-integration",
      "security-scan",
      "quality-gate"
    ]
  }' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "require_review_from_codeowners": true,
    "bypass_pull_request_allowances": {
      "users": [],
      "teams": ["qms-coordinators"],
      "apps": []
    }
  }' \
  --field restrictions='{
    "users": [],
    "teams": ["qms-coordinators", "senior-developers"],
    "apps": ["qms-automation-bot"]
  }' \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_linear_history=true

# Develop branch protection (Development)
if gh api repos/$REPO_OWNER/$REPO_NAME/branches/develop 2>/dev/null; then
  gh api repos/$REPO_OWNER/$REPO_NAME/branches/develop/protection \
    --method PUT \
    --field required_status_checks='{
      "strict": true,
      "contexts": [
        "QMS Step 1 - DoR Validation",
        "QMS Step 2 - Progress Monitoring",
        "continuous-integration",
        "security-scan"
      ]
    }' \
    --field enforce_admins=false \
    --field required_pull_request_reviews='{
      "required_approving_review_count": 1,
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": false
    }' \
    --field allow_force_pushes=false \
    --field allow_deletions=false
fi

# Release branch protection pattern
gh api repos/$REPO_OWNER/$REPO_NAME/branches/release*/protection \
  --method PUT \
  --field required_status_checks='{
    "strict": true,
    "contexts": [
      "QMS Step 1 - DoR Validation",
      "QMS Step 2 - Progress Monitoring",
      "QMS Step 3 - DoD Validation",
      "continuous-integration",
      "security-scan",
      "quality-gate"
    ]
  }' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  }' \
  --field allow_force_pushes=false \
  --field allow_deletions=false

echo "Branch protection rules configured"
```

### Phase 2: Team and Permission Setup

#### 2.1 QMS Team Structure

**Create QMS Teams Configuration**:

```yaml
# .github/qms/teams-config.yml
teams:
  qms_coordinators:
    name: "QMS Coordinators"
    description: "Primary QMS quality coordinators with override permissions"
    privacy: "closed"
    members:
      - "@qms-quality-coordinator"
      - "@senior-lead"
      - "@tech-lead"
    permissions: "admin"
    
  qms_reviewers:
    name: "QMS Reviewers" 
    description: "Qualified reviewers for QMS processes"
    privacy: "closed"
    members:
      - "@senior-developer-1"
      - "@senior-developer-2"
      - "@security-specialist"
      - "@architecture-lead"
    permissions: "write"
    
  qms_specialists:
    name: "QMS Domain Specialists"
    description: "Domain-specific specialists for focused reviews"
    privacy: "closed"
    members:
      - "@security-lead"
      - "@performance-lead"
      - "@frontend-lead"
      - "@backend-lead"
      - "@database-lead"
    permissions: "write"
    
  developers:
    name: "Development Team"
    description: "All developers participating in QMS processes"
    privacy: "closed"
    permissions: "write"
```

**Script to Create Teams**:

```bash
#!/bin/bash
# QMS Team Setup Script

ORG_NAME="${1:-$GITHUB_ORG}"

# Create QMS Coordinators team
gh api orgs/$ORG_NAME/teams \
  --method POST \
  --field name="QMS Coordinators" \
  --field description="Primary QMS quality coordinators with override permissions" \
  --field privacy="closed"

QMS_COORDINATORS_TEAM_ID=$(gh api orgs/$ORG_NAME/teams/qms-coordinators --jq '.id')

# Create QMS Reviewers team
gh api orgs/$ORG_NAME/teams \
  --method POST \
  --field name="QMS Reviewers" \
  --field description="Qualified reviewers for QMS processes" \
  --field privacy="closed"

QMS_REVIEWERS_TEAM_ID=$(gh api orgs/$ORG_NAME/teams/qms-reviewers --jq '.id')

# Create QMS Specialists team
gh api orgs/$ORG_NAME/teams \
  --method POST \
  --field name="QMS Domain Specialists" \
  --field description="Domain-specific specialists for focused reviews" \
  --field privacy="closed"

QMS_SPECIALISTS_TEAM_ID=$(gh api orgs/$ORG_NAME/teams/qms-domain-specialists --jq '.id')

# Grant repository permissions
gh api teams/$QMS_COORDINATORS_TEAM_ID/repos/$REPO_OWNER/$REPO_NAME \
  --method PUT \
  --field permission="admin"

gh api teams/$QMS_REVIEWERS_TEAM_ID/repos/$REPO_OWNER/$REPO_NAME \
  --method PUT \
  --field permission="write"

gh api teams/$QMS_SPECIALISTS_TEAM_ID/repos/$REPO_OWNER/$REPO_NAME \
  --method PUT \
  --field permission="write"

echo "QMS teams created and configured"
```

#### 2.2 CODEOWNERS Configuration

**Create `.github/CODEOWNERS`**:

```bash
#!/bin/bash
# Generate CODEOWNERS file for QMS

cat > .github/CODEOWNERS << 'EOF'
# QMS Code Ownership and Review Assignment Rules
# 
# Global QMS oversight - all files require QMS coordinator review
* @qms-coordinators/qms-coordinators

# Application source code
/src/ @qms-coordinators/qms-reviewers @qms-coordinators/qms-domain-specialists
/app/ @qms-coordinators/qms-reviewers @qms-coordinators/qms-domain-specialists

# Frontend specific
/src/components/ @frontend-lead @qms-coordinators/qms-reviewers
/src/pages/ @frontend-lead @qms-coordinators/qms-reviewers
/src/styles/ @frontend-lead @qms-coordinators/qms-reviewers
*.tsx @frontend-lead @qms-coordinators/qms-reviewers
*.jsx @frontend-lead @qms-coordinators/qms-reviewers
*.css @frontend-lead @qms-coordinators/qms-reviewers
*.scss @frontend-lead @qms-coordinators/qms-reviewers

# Backend specific
/src/api/ @backend-lead @qms-coordinators/qms-reviewers
/src/services/ @backend-lead @qms-coordinators/qms-reviewers
/src/controllers/ @backend-lead @qms-coordinators/qms-reviewers
/src/models/ @backend-lead @database-lead @qms-coordinators/qms-reviewers
*.py @backend-lead @qms-coordinators/qms-reviewers
*.js @backend-lead @qms-coordinators/qms-reviewers
*.ts @backend-lead @qms-coordinators/qms-reviewers

# Database and migrations
/migrations/ @database-lead @backend-lead @qms-coordinators/qms-coordinators
/database/ @database-lead @backend-lead @qms-coordinators/qms-coordinators
*.sql @database-lead @qms-coordinators/qms-coordinators

# Infrastructure and deployment
/docker/ @devops-lead @qms-coordinators/qms-coordinators
/k8s/ @devops-lead @qms-coordinators/qms-coordinators
/terraform/ @devops-lead @qms-coordinators/qms-coordinators
/ansible/ @devops-lead @qms-coordinators/qms-coordinators
Dockerfile @devops-lead @qms-coordinators/qms-coordinators
docker-compose.yml @devops-lead @qms-coordinators/qms-coordinators

# CI/CD workflows
/.github/workflows/ @devops-lead @qms-coordinators/qms-coordinators
/.github/actions/ @devops-lead @qms-coordinators/qms-coordinators

# QMS specific files (require coordinator approval)
/.github/qms/ @qms-coordinators/qms-coordinators
/.github/CODEOWNERS @qms-coordinators/qms-coordinators

# Security-sensitive files
/src/auth/ @security-lead @qms-coordinators/qms-coordinators
/src/security/ @security-lead @qms-coordinators/qms-coordinators
*.key @security-lead @qms-coordinators/qms-coordinators
*.pem @security-lead @qms-coordinators/qms-coordinators
*.env.example @security-lead @devops-lead @qms-coordinators/qms-coordinators

# Configuration files
/config/ @devops-lead @backend-lead @qms-coordinators/qms-reviewers
*.yml @devops-lead @qms-coordinators/qms-reviewers
*.yaml @devops-lead @qms-coordinators/qms-reviewers
*.json @backend-lead @qms-coordinators/qms-reviewers
*.toml @devops-lead @qms-coordinators/qms-reviewers

# Documentation (require tech writing review)
/docs/ @technical-writer @qms-coordinators/qms-coordinators
README.md @technical-writer @qms-coordinators/qms-coordinators
*.md @technical-writer @qms-coordinators/qms-reviewers

# Testing files
/tests/ @qms-coordinators/qms-reviewers
/test/ @qms-coordinators/qms-reviewers
*test.py @qms-coordinators/qms-reviewers
*test.js @qms-coordinators/qms-reviewers
*test.ts @qms-coordinators/qms-reviewers
*.spec.* @qms-coordinators/qms-reviewers

# Package management
package.json @devops-lead @backend-lead @qms-coordinators/qms-coordinators
package-lock.json @devops-lead @backend-lead @qms-coordinators/qms-coordinators
requirements.txt @devops-lead @backend-lead @qms-coordinators/qms-coordinators
Pipfile @devops-lead @backend-lead @qms-coordinators/qms-coordinators
go.mod @devops-lead @backend-lead @qms-coordinators/qms-coordinators
Cargo.toml @devops-lead @backend-lead @qms-coordinators/qms-coordinators
EOF

echo "CODEOWNERS file created"
```

### Phase 3: GitHub Apps and Integrations

#### 3.1 QMS Automation Bot Setup

**GitHub App Configuration**:

```json
{
  "name": "QMS Automation Bot",
  "description": "Automated QMS workflow management and quality gate enforcement",
  "url": "https://github.com/your-org/qms-automation-bot",
  "setup_url": "https://github.com/your-org/qms-automation-bot/setup",
  "webhook_url": "https://your-webhook-endpoint.com/webhook",
  "public": false,
  "default_events": [
    "pull_request",
    "pull_request_review",
    "push",
    "issues",
    "issue_comment",
    "status",
    "check_suite",
    "check_run"
  ],
  "default_permissions": {
    "issues": "write",
    "pull_requests": "write",
    "statuses": "write",
    "checks": "write",
    "repository_projects": "write",
    "contents": "read",
    "metadata": "read"
  }
}
```

**Installation Script**:

```bash
#!/bin/bash
# QMS GitHub App Installation

# Install GitHub App to organization
gh api orgs/$ORG_NAME/installations \
  --method POST \
  --field app_id=$QMS_APP_ID

# Configure app permissions for specific repositories
gh api installations/$INSTALLATION_ID/repositories/$REPO_ID \
  --method PUT

echo "QMS Automation Bot installed and configured"
```

#### 3.2 Third-Party Integrations

**SonarQube Integration**:

```yaml
# .github/qms/integrations/sonarqube-config.yml
sonarqube:
  server_url: "https://sonarqube.your-domain.com"
  project_key: "${REPO_OWNER}_${REPO_NAME}"
  quality_gate: "QMS_Quality_Gate"
  coverage_threshold: 80
  duplications_threshold: 3
  maintainability_rating: "A"
  reliability_rating: "A"
  security_rating: "A"
```

**Slack Integration**:

```yaml
# .github/qms/integrations/slack-config.yml  
slack:
  webhook_url: "${SLACK_WEBHOOK_URL}"
  channels:
    qms_alerts: "#qms-alerts"
    code_reviews: "#code-reviews"  
    deployments: "#deployments"
    security: "#security-alerts"
  notification_events:
    - "qms_workflow_failure"
    - "security_vulnerability_detected"
    - "quality_gate_failed"
    - "manual_override_used"
```

### Phase 4: Secrets and Environment Configuration

#### 4.1 Repository Secrets Setup

```bash
#!/bin/bash
# QMS Repository Secrets Configuration

# QMS Configuration secrets
gh secret set QMS_CONFIG_TOKEN --body="$QMS_CONFIG_TOKEN"
gh secret set QMS_WEBHOOK_SECRET --body="$QMS_WEBHOOK_SECRET"

# Third-party integration secrets
gh secret set SONARQUBE_TOKEN --body="$SONARQUBE_TOKEN"
gh secret set SLACK_WEBHOOK_URL --body="$SLACK_WEBHOOK_URL"
gh secret set SECURITY_SCAN_TOKEN --body="$SECURITY_SCAN_TOKEN"

# Database and deployment secrets
gh secret set DATABASE_URL --body="$DATABASE_URL"
gh secret set DEPLOY_KEY --body="$DEPLOY_KEY"
gh secret set DOCKER_REGISTRY_TOKEN --body="$DOCKER_REGISTRY_TOKEN"

# Monitoring and observability
gh secret set DATADOG_API_KEY --body="$DATADOG_API_KEY"
gh secret set NEW_RELIC_LICENSE_KEY --body="$NEW_RELIC_LICENSE_KEY"

echo "Repository secrets configured"
```

#### 4.2 Environment Variables

```bash
#!/bin/bash
# QMS Environment Variables Setup

# Create environment configuration file
cat > .github/qms/environment-config.yml << 'EOF'
environments:
  development:
    qms_enabled: true
    quality_gates:
      dor_validation: true
      progress_monitoring: true
      dod_validation: false
      final_review: false
    auto_merge: false
    
  staging:
    qms_enabled: true
    quality_gates:
      dor_validation: true
      progress_monitoring: true
      dod_validation: true
      final_review: true
    auto_merge: false
    
  production:
    qms_enabled: true
    quality_gates:
      dor_validation: true
      progress_monitoring: true
      dod_validation: true
      final_review: true
    auto_merge: false
    require_manual_approval: true
EOF
```

### Phase 5: Webhook Configuration

#### 5.1 QMS Webhook Setup

```javascript
// webhook-config.js - QMS Webhook Configuration
const webhookConfig = {
  url: process.env.QMS_WEBHOOK_URL,
  secret: process.env.QMS_WEBHOOK_SECRET,
  events: [
    'pull_request',
    'pull_request_review', 
    'push',
    'check_suite',
    'check_run',
    'issues',
    'issue_comment'
  ],
  active: true,
  ssl_verification: true
};

// Configure webhook
async function setupWebhook(octokit, owner, repo) {
  try {
    const response = await octokit.rest.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookConfig.url,
        secret: webhookConfig.secret,
        content_type: 'json',
        insecure_ssl: '0'
      },
      events: webhookConfig.events,
      active: webhookConfig.active
    });
    
    console.log('QMS webhook configured:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Webhook setup failed:', error);
    throw error;
  }
}

module.exports = { setupWebhook };
```

**Webhook Setup Script**:

```bash
#!/bin/bash
# QMS Webhook Setup

# Install webhook using GitHub CLI
gh api repos/$REPO_OWNER/$REPO_NAME/hooks \
  --method POST \
  --field name="web" \
  --field active=true \
  --field events='["pull_request","pull_request_review","push","check_suite","check_run","issues","issue_comment"]' \
  --field config='{
    "url": "'$QMS_WEBHOOK_URL'",
    "content_type": "json",
    "secret": "'$QMS_WEBHOOK_SECRET'",
    "insecure_ssl": "0"
  }'

echo "QMS webhook configured successfully"
```

### Phase 6: Testing and Validation

#### 6.1 Integration Testing Script

```bash
#!/bin/bash
# QMS GitHub Integration Testing

echo "Testing QMS GitHub integration..."

# Test 1: Repository configuration
echo "✅ Testing repository configuration..."
gh repo view $REPO_OWNER/$REPO_NAME --json hasIssuesEnabled,hasProjectsEnabled

# Test 2: Branch protection
echo "✅ Testing branch protection..."
gh api repos/$REPO_OWNER/$REPO_NAME/branches/main/protection --jq '.required_status_checks.contexts[]'

# Test 3: Team permissions
echo "✅ Testing team permissions..."
gh api orgs/$ORG_NAME/teams/qms-coordinators/repos/$REPO_OWNER/$REPO_NAME

# Test 4: Webhook configuration
echo "✅ Testing webhook configuration..."
gh api repos/$REPO_OWNER/$REPO_NAME/hooks --jq '.[].config.url'

# Test 5: Secrets availability
echo "✅ Testing secrets configuration..."
gh secret list | grep -E "(QMS|SONAR|SLACK)"

# Test 6: Labels configuration
echo "✅ Testing QMS labels..."
gh label list | grep "qms:"

echo "Integration testing completed"
```

#### 6.2 End-to-End Workflow Test

```bash
#!/bin/bash
# E2E QMS Workflow Test

echo "Executing end-to-end QMS workflow test..."

# Create test branch
git checkout -b test/qms-integration-$(date +%s)

# Create test change
echo "# QMS Integration Test" > test-qms.md
echo "This is a test file for QMS integration validation." >> test-qms.md
git add test-qms.md
git commit -m "feat: add QMS integration test file"
git push -u origin HEAD

# Create PR
gh pr create \
  --title "feat: QMS integration test" \
  --body "## Description
This PR tests the QMS integration workflow.

## Acceptance Criteria
- [ ] DoR validation passes
- [ ] Progress monitoring activates
- [ ] Quality gates function correctly
- [ ] Review assignment works

closes #123" \
  --assignee "@me"

# Get PR number
PR_NUMBER=$(gh pr view --json number -q .number)

echo "Test PR created: #$PR_NUMBER"
echo "Monitor the QMS workflow execution in GitHub Actions"

# Cleanup (optional)
read -p "Press enter to cleanup test PR and branch..."
gh pr close $PR_NUMBER --delete-branch

echo "E2E test completed"
```

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: Branch Protection Not Working
```bash
# Check branch protection status
gh api repos/$REPO_OWNER/$REPO_NAME/branches/main/protection

# Common fix: Ensure status check names match exactly
gh api repos/$REPO_OWNER/$REPO_NAME/branches/main/protection \
  --method PATCH \
  --field required_status_checks.contexts='["continuous-integration","QMS Step 1 - DoR Validation"]'
```

#### Issue 2: Team Permissions Issues
```bash
# Check team membership
gh api orgs/$ORG_NAME/teams/qms-coordinators/members

# Add missing members
gh api orgs/$ORG_NAME/teams/qms-coordinators/memberships/$USERNAME \
  --method PUT \
  --field role="maintainer"
```

#### Issue 3: Webhook Not Triggering
```bash
# Check webhook configuration
gh api repos/$REPO_OWNER/$REPO_NAME/hooks --jq '.[].config'

# Test webhook delivery
curl -X POST $QMS_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"test": "webhook"}'
```

#### Issue 4: GitHub Actions Not Running
```bash
# Check workflow files
ls -la .github/workflows/

# Validate workflow syntax
gh workflow list

# Check recent runs
gh run list --limit 10
```

## Security Considerations

### Access Control
- Use least privilege principle for team permissions
- Regularly audit team memberships
- Implement mandatory 2FA for QMS coordinators
- Use GitHub Apps instead of personal access tokens where possible

### Secret Management
- Rotate secrets regularly (quarterly)
- Use GitHub's dependabot for secret scanning
- Never commit secrets to repository
- Use environment-specific secret management

### Webhook Security
- Always use webhook secrets for validation
- Implement proper HTTPS certificate validation
- Log and monitor webhook activities
- Implement rate limiting and abuse protection

## Maintenance Procedures

### Monthly Tasks
- Review and update team memberships
- Audit repository permissions
- Check webhook delivery success rates
- Review and rotate secrets as needed

### Quarterly Tasks  
- Comprehensive security audit
- Update integration configurations
- Review and optimize branch protection rules
- Update documentation and runbooks

### Annual Tasks
- Complete security assessment
- Update QMS integration strategy
- Review and update compliance procedures
- Technology stack and integration review

## Integration Checklist

### Pre-Deployment
- [ ] Repository features enabled (issues, security alerts, etc.)
- [ ] Branch structure created and configured
- [ ] Branch protection rules applied
- [ ] Teams created with proper permissions
- [ ] CODEOWNERS file configured
- [ ] GitHub App installed and configured
- [ ] Third-party integrations configured
- [ ] Repository secrets added
- [ ] Environment variables set
- [ ] Webhooks configured and tested

### Post-Deployment
- [ ] Integration testing completed successfully
- [ ] E2E workflow test passed
- [ ] Team notifications and training completed
- [ ] Documentation updated
- [ ] Monitoring and alerting configured
- [ ] Backup and recovery procedures tested

### Ongoing Maintenance
- [ ] Regular permission audits scheduled
- [ ] Secret rotation schedule established
- [ ] Monitoring and alerting verified
- [ ] Team training schedule created
- [ ] Incident response procedures documented

## Conclusion

This GitHub integration setup provides a robust foundation for the QMS 4-Step Review Workflow. The configuration ensures:

- **Automated Quality Gates**: All QMS steps are enforced through GitHub's native features
- **Proper Access Control**: Teams and permissions are structured to support QMS processes
- **Integration Readiness**: Third-party tools are properly connected and configured
- **Security**: Best practices for secrets, permissions, and webhook security
- **Maintainability**: Clear procedures for ongoing maintenance and updates

The setup supports both immediate deployment and long-term maintenance of the QMS system within GitHub's ecosystem.