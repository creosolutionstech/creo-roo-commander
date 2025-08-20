+++
# Document Metadata
id = "qms-github-integration-validation-procedures-v1"
title = "QMS GitHub Integration Validation Procedures V1.0"
version = "1.0"
created_date = "2025-08-17T06:53:00Z"
updated_date = "2025-08-17T06:53:00Z"
document_type = "validation-procedures"

# Classification and Context
category = "qms-testing"
subcategory = "github-integration"
context_type = "validation"
scope = "GitHub PR integration, webhook validation, API testing, repository configuration"
target_audience = ["qms-testing-specialist", "lead-devops", "qms-coordinators"]
granularity = "comprehensive"
status = "active"
importance = "critical"

# Technical Context
[technical_context]
framework_type = "github-integration-testing"
testing_approach = "repository-based"
coverage_areas = ["pr-workflows", "webhooks", "api-integration", "branch-protection", "status-checks"]
automation_level = "automated"
execution_environment = ["github-actions", "webhook-testing", "api-simulation"]

# QMS Integration
[qms_context]
github_components_tested = ["pr-workflows", "branch-protection", "webhooks", "status-checks", "labeling"]
api_integrations_validated = ["github-rest-api", "github-webhooks-api", "github-checks-api"]
automation_coverage = ["workflow-triggers", "status-updates", "pr-comments", "reviewer-assignment"]

# Dependencies and References
related_docs = [
    ".ruru/docs/qms/github-integration/",
    ".github/workflows/",
    ".ruru/docs/qms/testing/qms-end-to-end-test-scenarios-v1.md",
    ".ruru/docs/qms/workflows/"
]
+++

# QMS GitHub Integration Validation Procedures V1.0

## Executive Summary

This document defines comprehensive validation procedures for the Quality Management System (QMS) GitHub integration, ensuring seamless operation of PR workflows, webhooks, API interactions, and repository configurations. These procedures validate the critical GitHub integration components that enable automated quality gate enforcement and intelligent review delegation.

## Table of Contents

1. [Test Repository Setup](#test-repository-setup)
2. [GitHub API Integration Testing](#github-api-integration-testing)
3. [Webhook Validation Procedures](#webhook-validation-procedures)
4. [PR Workflow Integration Testing](#pr-workflow-integration-testing)
5. [Branch Protection Rule Validation](#branch-protection-rule-validation)
6. [Status Check System Testing](#status-check-system-testing)
7. [Automated Labeling System Validation](#automated-labeling-system-validation)
8. [Multi-Repository Testing](#multi-repository-testing)
9. [Performance and Scale Testing](#performance-and-scale-testing)
10. [Error Handling and Recovery Testing](#error-handling-and-recovery-testing)

---

## Test Repository Setup

### Primary Test Repositories

#### Repository Matrix
```yaml
Test Repositories:
  qms-test-main:
    language: "TypeScript/Node.js"
    size: "Medium (10-50MB)"
    complexity: "Standard web application"
    purpose: "Primary integration testing"
    
  qms-test-python:
    language: "Python/Django"
    size: "Large (50-100MB)"
    complexity: "Backend API with database"
    purpose: "Python ecosystem validation"
    
  qms-test-go:
    language: "Go"
    size: "Small (1-10MB)"
    complexity: "Microservice architecture"
    purpose: "Compiled language testing"
    
  qms-test-monorepo:
    language: "Multi (TypeScript, Python, Go)"
    size: "Extra Large (100MB+)"
    complexity: "Monorepo with multiple services"
    purpose: "Complex change analysis testing"
    
  qms-test-minimal:
    language: "JavaScript"
    size: "Minimal (<1MB)"
    complexity: "Simple static site"
    purpose: "Performance baseline testing"
```

### Repository Configuration Template

#### Standard QMS Configuration
```yaml
# .github/qms-config.yml
qms:
  enabled: true
  version: "v1.0"
  
workflows:
  dor_validation: true
  progress_reviews: true
  dod_validation: true
  final_review: true
  
quality_gates:
  test_coverage:
    threshold: 80
    required: true
  security_scan:
    required: true
    tools: ["codeql", "snyk", "semgrep"]
  performance_check:
    threshold_regression: 10
    required: false
    
review_delegation:
  enabled: true
  auto_assignment: true
  load_balancing: true
  
branch_protection:
  enforce_qms: true
  require_status_checks: true
  dismiss_stale_reviews: true
  
notifications:
  slack_webhook: "${SLACK_WEBHOOK_URL}"
  email_alerts: true
```

### Initial Setup Procedures

#### Procedure 1: Repository Creation and Configuration
```bash
#!/bin/bash
# Setup script for QMS test repositories

setup_qms_test_repo() {
  local repo_name=$1
  local template_type=$2
  
  echo "Setting up QMS test repository: $repo_name"
  
  # Create repository using GitHub CLI
  gh repo create "qms-org/$repo_name" \
    --template "qms-org/qms-template-$template_type" \
    --private \
    --description "QMS Integration Test Repository - $template_type"
  
  # Clone locally for configuration
  git clone "https://github.com/qms-org/$repo_name.git"
  cd "$repo_name"
  
  # Deploy QMS workflows
  cp -r ../qms-workflows/.github/workflows/* .github/workflows/
  
  # Configure QMS settings
  cp ../qms-config-templates/qms-config-$template_type.yml .github/qms-config.yml
  
  # Set up branch protection rules
  gh api repos/qms-org/$repo_name/branches/main/protection \
    --method PUT \
    --field required_status_checks='{"strict":true,"contexts":["qms/dor-validation","qms/dod-validation","qms/security-scan"]}' \
    --field enforce_admins=true \
    --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
    --field restrictions=null
  
  # Initial commit and push
  git add .
  git commit -m "Initial QMS configuration"
  git push origin main
  
  echo "✅ QMS test repository $repo_name configured successfully"
}

# Setup all test repositories
setup_qms_test_repo "qms-test-main" "typescript"
setup_qms_test_repo "qms-test-python" "python"
setup_qms_test_repo "qms-test-go" "golang"
setup_qms_test_repo "qms-test-monorepo" "monorepo"
setup_qms_test_repo "qms-test-minimal" "minimal"
```

---

## GitHub API Integration Testing

### API Component Testing Matrix

#### Authentication and Authorization
```yaml
Auth Testing:
  - name: "GitHub App Authentication"
    test: "Validate GitHub App JWT token generation"
    expected: "Valid token with correct permissions"
    
  - name: "Installation Access Token"
    test: "Generate installation access token for repositories"
    expected: "Token with repository-specific permissions"
    
  - name: "Permission Validation"
    test: "Verify QMS has required repository permissions"
    expected: "Read/write access to PRs, checks, webhooks"
    
  - name: "Rate Limit Handling"
    test: "Validate rate limit detection and backoff"
    expected: "Graceful handling with retry mechanism"
```

#### Core API Operations Testing

##### Procedure 2: GitHub REST API Validation
```python
#!/usr/bin/env python3
"""
QMS GitHub API Integration Validation
"""

import requests
import time
import json
from datetime import datetime
from typing import Dict, List, Optional

class GitHubAPIValidator:
    def __init__(self, token: str, org: str):
        self.token = token
        self.org = org
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "QMS-Integration-Validator/1.0"
        }
        self.results = []
    
    def validate_repository_access(self, repo_name: str) -> Dict:
        """Validate repository access and permissions"""
        test_name = f"Repository Access: {repo_name}"
        
        try:
            # Test repository read access
            repo_response = requests.get(
                f"{self.base_url}/repos/{self.org}/{repo_name}",
                headers=self.headers
            )
            
            if repo_response.status_code != 200:
                return self._test_result(test_name, False, f"Repository access failed: {repo_response.status_code}")
            
            repo_data = repo_response.json()
            
            # Validate required permissions
            permissions = repo_data.get('permissions', {})
            required_perms = ['pull', 'push', 'admin']
            missing_perms = [perm for perm in required_perms if not permissions.get(perm, False)]
            
            if missing_perms:
                return self._test_result(test_name, False, f"Missing permissions: {missing_perms}")
            
            return self._test_result(test_name, True, "Repository access validated")
            
        except Exception as e:
            return self._test_result(test_name, False, f"Exception: {str(e)}")
    
    def validate_pr_operations(self, repo_name: str) -> Dict:
        """Validate PR creation, modification, and status operations"""
        test_name = f"PR Operations: {repo_name}"
        
        try:
            # Create test branch
            branch_name = f"qms-test-{int(time.time())}"
            master_sha = self._get_branch_sha(repo_name, "main")
            
            create_branch_response = requests.post(
                f"{self.base_url}/repos/{self.org}/{repo_name}/git/refs",
                headers=self.headers,
                json={
                    "ref": f"refs/heads/{branch_name}",
                    "sha": master_sha
                }
            )
            
            if create_branch_response.status_code != 201:
                return self._test_result(test_name, False, "Failed to create test branch")
            
            # Create test commit
            test_file_content = f"# QMS Test File\nGenerated at {datetime.now()}\n"
            self._create_test_commit(repo_name, branch_name, test_file_content)
            
            # Create PR
            pr_response = requests.post(
                f"{self.base_url}/repos/{self.org}/{repo_name}/pulls",
                headers=self.headers,
                json={
                    "title": "QMS Integration Test PR",
                    "head": branch_name,
                    "base": "main",
                    "body": "Automated QMS integration test PR"
                }
            )
            
            if pr_response.status_code != 201:
                return self._test_result(test_name, False, "Failed to create test PR")
            
            pr_number = pr_response.json()['number']
            
            # Test PR comment creation
            comment_response = requests.post(
                f"{self.base_url}/repos/{self.org}/{repo_name}/issues/{pr_number}/comments",
                headers=self.headers,
                json={"body": "🤖 QMS Integration Test Comment"}
            )
            
            if comment_response.status_code != 201:
                return self._test_result(test_name, False, "Failed to create PR comment")
            
            # Test PR labeling
            label_response = requests.post(
                f"{self.base_url}/repos/{self.org}/{repo_name}/issues/{pr_number}/labels",
                headers=self.headers,
                json=["qms-test", "integration-test"]
            )
            
            # Clean up: Close PR and delete branch
            self._cleanup_test_pr(repo_name, pr_number, branch_name)
            
            return self._test_result(test_name, True, "All PR operations validated successfully")
            
        except Exception as e:
            return self._test_result(test_name, False, f"Exception: {str(e)}")
    
    def validate_check_runs(self, repo_name: str) -> Dict:
        """Validate GitHub Checks API operations"""
        test_name = f"Check Runs API: {repo_name}"
        
        try:
            # Get latest commit SHA
            commit_sha = self._get_branch_sha(repo_name, "main")
            
            # Create test check run
            check_response = requests.post(
                f"{self.base_url}/repos/{self.org}/{repo_name}/check-runs",
                headers={**self.headers, "Accept": "application/vnd.github.antiope-preview+json"},
                json={
                    "name": "QMS Integration Test",
                    "head_sha": commit_sha,
                    "status": "in_progress",
                    "started_at": datetime.now().isoformat() + "Z"
                }
            )
            
            if check_response.status_code != 201:
                return self._test_result(test_name, False, "Failed to create check run")
            
            check_run_id = check_response.json()['id']
            
            # Update check run with success
            update_response = requests.patch(
                f"{self.base_url}/repos/{self.org}/{repo_name}/check-runs/{check_run_id}",
                headers={**self.headers, "Accept": "application/vnd.github.antiope-preview+json"},
                json={
                    "status": "completed",
                    "conclusion": "success",
                    "completed_at": datetime.now().isoformat() + "Z",
                    "output": {
                        "title": "QMS Integration Test Passed",
                        "summary": "All integration tests completed successfully"
                    }
                }
            )
            
            if update_response.status_code != 200:
                return self._test_result(test_name, False, "Failed to update check run")
            
            return self._test_result(test_name, True, "Check runs API validated successfully")
            
        except Exception as e:
            return self._test_result(test_name, False, f"Exception: {str(e)}")
    
    def validate_rate_limiting(self) -> Dict:
        """Validate rate limit handling and recovery"""
        test_name = "Rate Limit Handling"
        
        try:
            # Check current rate limit status
            rate_limit_response = requests.get(
                f"{self.base_url}/rate_limit",
                headers=self.headers
            )
            
            if rate_limit_response.status_code != 200:
                return self._test_result(test_name, False, "Failed to check rate limit status")
            
            rate_data = rate_limit_response.json()
            remaining = rate_data['resources']['core']['remaining']
            reset_time = rate_data['resources']['core']['reset']
            
            # Test rate limit detection
            if remaining < 100:
                # Close to rate limit - test backoff mechanism
                wait_time = max(0, reset_time - int(time.time()))
                if wait_time > 0:
                    return self._test_result(test_name, True, f"Rate limit detected, backoff time: {wait_time}s")
            
            return self._test_result(test_name, True, f"Rate limit status: {remaining} requests remaining")
            
        except Exception as e:
            return self._test_result(test_name, False, f"Exception: {str(e)}")
    
    def run_full_validation(self, repositories: List[str]) -> Dict:
        """Run complete GitHub API validation suite"""
        print("🚀 Starting GitHub API Integration Validation")
        print(f"Testing repositories: {', '.join(repositories)}")
        
        all_results = []
        
        # Test each repository
        for repo in repositories:
            print(f"\n📊 Testing repository: {repo}")
            
            repo_results = []
            repo_results.append(self.validate_repository_access(repo))
            repo_results.append(self.validate_pr_operations(repo))
            repo_results.append(self.validate_check_runs(repo))
            
            all_results.extend(repo_results)
        
        # Test global operations
        print(f"\n🌐 Testing global operations")
        all_results.append(self.validate_rate_limiting())
        
        # Generate summary
        passed = sum(1 for result in all_results if result['passed'])
        total = len(all_results)
        
        summary = {
            "timestamp": datetime.now().isoformat(),
            "total_tests": total,
            "passed": passed,
            "failed": total - passed,
            "success_rate": f"{(passed/total)*100:.1f}%",
            "results": all_results
        }
        
        print(f"\n📋 Validation Summary:")
        print(f"✅ Passed: {passed}/{total} ({summary['success_rate']})")
        print(f"❌ Failed: {total - passed}/{total}")
        
        return summary
    
    # Helper methods
    def _get_branch_sha(self, repo_name: str, branch: str) -> str:
        """Get SHA of latest commit on branch"""
        response = requests.get(
            f"{self.base_url}/repos/{self.org}/{repo_name}/git/refs/heads/{branch}",
            headers=self.headers
        )
        return response.json()['object']['sha']
    
    def _create_test_commit(self, repo_name: str, branch_name: str, content: str):
        """Create a test commit on the specified branch"""
        # This is a simplified implementation
        # In practice, you'd need to handle the full Git objects API
        pass
    
    def _cleanup_test_pr(self, repo_name: str, pr_number: int, branch_name: str):
        """Clean up test PR and branch"""
        # Close PR
        requests.patch(
            f"{self.base_url}/repos/{self.org}/{repo_name}/pulls/{pr_number}",
            headers=self.headers,
            json={"state": "closed"}
        )
        
        # Delete branch
        requests.delete(
            f"{self.base_url}/repos/{self.org}/{repo_name}/git/refs/heads/{branch_name}",
            headers=self.headers
        )
    
    def _test_result(self, test_name: str, passed: bool, message: str) -> Dict:
        """Create standardized test result"""
        result = {
            "test_name": test_name,
            "passed": passed,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        
        status = "✅" if passed else "❌"
        print(f"  {status} {test_name}: {message}")
        
        return result

# Usage example
if __name__ == "__main__":
    import os
    
    github_token = os.getenv('GITHUB_TOKEN')
    org_name = 'qms-org'
    test_repositories = [
        'qms-test-main',
        'qms-test-python', 
        'qms-test-go'
    ]
    
    validator = GitHubAPIValidator(github_token, org_name)
    results = validator.run_full_validation(test_repositories)
    
    # Save results
    with open('github-api-validation-results.json', 'w') as f:
        json.dump(results, f, indent=2)
```

---

## Webhook Validation Procedures

### Webhook Event Testing Matrix

#### Core Webhook Events
```yaml
Webhook Events:
  pull_request:
    events: ["opened", "synchronize", "closed", "edited"]
    validation: "QMS workflow triggers correctly"
    
  pull_request_review:
    events: ["submitted", "edited", "dismissed"]
    validation: "Review delegation system responds"
    
  check_run:
    events: ["created", "completed", "rerequested"]
    validation: "Quality gate status updates"
    
  push:
    events: ["push to protected branches"]
    validation: "Branch protection enforcement"
    
  status:
    events: ["success", "failure", "pending"]
    validation: "QMS status aggregation"
```

#### Procedure 3: Webhook Testing Infrastructure

```python
#!/usr/bin/env python3
"""
QMS Webhook Validation System
"""

import json
import hmac
import hashlib
import time
from flask import Flask, request, jsonify
from typing import Dict, List
import threading
import queue
from datetime import datetime, timedelta

class WebhookValidator:
    def __init__(self, webhook_secret: str):
        self.webhook_secret = webhook_secret
        self.received_events = queue.Queue()
        self.expected_events = {}
        self.app = Flask(__name__)
        self.setup_routes()
    
    def setup_routes(self):
        @self.app.route('/webhook', methods=['POST'])
        def handle_webhook():
            return self._process_webhook()
        
        @self.app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})
    
    def _process_webhook(self):
        """Process incoming webhook and validate"""
        # Verify signature
        signature = request.headers.get('X-Hub-Signature-256')
        if not self._verify_signature(request.data, signature):
            return jsonify({"error": "Invalid signature"}), 401
        
        # Parse event
        event_type = request.headers.get('X-GitHub-Event')
        delivery_id = request.headers.get('X-GitHub-Delivery')
        payload = request.json
        
        # Log received event
        event_data = {
            "event_type": event_type,
            "delivery_id": delivery_id,
            "timestamp": datetime.now().isoformat(),
            "payload": payload
        }
        
        self.received_events.put(event_data)
        print(f"📨 Received webhook: {event_type} ({delivery_id})")
        
        # Validate against expected events
        self._validate_event(event_data)
        
        return jsonify({"status": "processed"}), 200
    
    def _verify_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature"""
        if not signature:
            return False
        
        expected_signature = 'sha256=' + hmac.new(
            self.webhook_secret.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected_signature)
    
    def expect_event(self, event_type: str, timeout: int = 30, **criteria):
        """Register expected event with validation criteria"""
        expectation_id = f"{event_type}_{int(time.time())}"
        self.expected_events[expectation_id] = {
            "event_type": event_type,
            "timeout": datetime.now() + timedelta(seconds=timeout),
            "criteria": criteria,
            "received": False
        }
        return expectation_id
    
    def _validate_event(self, event_data: Dict):
        """Validate received event against expectations"""
        event_type = event_data['event_type']
        
        for exp_id, expectation in self.expected_events.items():
            if expectation['received'] or expectation['event_type'] != event_type:
                continue
            
            if self._matches_criteria(event_data, expectation['criteria']):
                expectation['received'] = True
                print(f"✅ Expected event matched: {exp_id}")
                break
    
    def _matches_criteria(self, event_data: Dict, criteria: Dict) -> bool:
        """Check if event matches specified criteria"""
        payload = event_data['payload']
        
        for key, expected_value in criteria.items():
            if '.' in key:
                # Handle nested keys (e.g., 'pull_request.state')
                keys = key.split('.')
                actual_value = payload
                for k in keys:
                    actual_value = actual_value.get(k, {})
                    if not isinstance(actual_value, dict) and k != keys[-1]:
                        return False
            else:
                actual_value = payload.get(key)
            
            if actual_value != expected_value:
                return False
        
        return True
    
    def wait_for_events(self, timeout: int = 60) -> Dict:
        """Wait for all expected events and return validation results"""
        start_time = datetime.now()
        deadline = start_time + timedelta(seconds=timeout)
        
        while datetime.now() < deadline:
            # Check if all expected events received
            pending_events = [
                exp_id for exp_id, exp in self.expected_events.items()
                if not exp['received'] and datetime.now() < exp['timeout']
            ]
            
            if not pending_events:
                break
            
            time.sleep(1)
        
        # Generate results
        results = {
            "start_time": start_time.isoformat(),
            "end_time": datetime.now().isoformat(),
            "expectations": {}
        }
        
        for exp_id, expectation in self.expected_events.items():
            results["expectations"][exp_id] = {
                "event_type": expectation["event_type"],
                "received": expectation["received"],
                "timeout": expectation["timeout"].isoformat(),
                "criteria": expectation["criteria"]
            }
        
        # Summary
        total_expectations = len(self.expected_events)
        received_count = sum(1 for exp in self.expected_events.values() if exp['received'])
        
        results["summary"] = {
            "total_expected": total_expectations,
            "received": received_count,
            "missed": total_expectations - received_count,
            "success_rate": f"{(received_count/total_expectations)*100:.1f}%" if total_expectations > 0 else "0%"
        }
        
        return results

class QMSWebhookIntegrationTest:
    def __init__(self, github_token: str, webhook_validator: WebhookValidator):
        self.github_token = github_token
        self.validator = webhook_validator
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {github_token}",
            "Accept": "application/vnd.github.v3+json"
        }
    
    def test_pr_lifecycle_webhooks(self, repo_name: str, org: str) -> Dict:
        """Test complete PR lifecycle webhook events"""
        test_name = "PR Lifecycle Webhooks"
        print(f"🔄 Testing {test_name} for {org}/{repo_name}")
        
        try:
            # Setup expectations
            pr_opened_exp = self.validator.expect_event(
                "pull_request",
                action="opened",
                timeout=30
            )
            
            pr_sync_exp = self.validator.expect_event(
                "pull_request", 
                action="synchronize",
                timeout=60
            )
            
            check_run_exp = self.validator.expect_event(
                "check_run",
                timeout=90
            )
            
            # Create test branch and PR
            branch_name = f"webhook-test-{int(time.time())}"
            pr_number = self._create_test_pr(org, repo_name, branch_name)
            
            # Add additional commit to trigger synchronize event
            time.sleep(5)
            self._add_commit_to_branch(org, repo_name, branch_name)
            
            # Wait for webhook events
            results = self.validator.wait_for_events(timeout=120)
            
            # Cleanup
            self._cleanup_test_pr(org, repo_name, pr_number, branch_name)
            
            success = results["summary"]["success_rate"] == "100.0%"
            return {
                "test_name": test_name,
                "passed": success,
                "details": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                "test_name": test_name,
                "passed": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def test_review_webhooks(self, repo_name: str, org: str) -> Dict:
        """Test review-related webhook events"""
        test_name = "Review Webhooks"
        print(f"👥 Testing {test_name} for {org}/{repo_name}")
        
        try:
            # Setup expectations
            review_submitted_exp = self.validator.expect_event(
                "pull_request_review",
                action="submitted",
                timeout=60
            )
            
            # Create PR for review testing
            branch_name = f"review-webhook-test-{int(time.time())}"
            pr_number = self._create_test_pr(org, repo_name, branch_name)
            
            # Submit a review
            time.sleep(5)
            self._submit_pr_review(org, repo_name, pr_number)
            
            # Wait for webhook events
            results = self.validator.wait_for_events(timeout=90)
            
            # Cleanup
            self._cleanup_test_pr(org, repo_name, pr_number, branch_name)
            
            success = results["summary"]["success_rate"] == "100.0%"
            return {
                "test_name": test_name,
                "passed": success,
                "details": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                "test_name": test_name,
                "passed": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def _create_test_pr(self, org: str, repo: str, branch_name: str) -> int:
        """Create test PR for webhook validation"""
        import requests
        
        # Create branch
        master_sha = self._get_branch_sha(org, repo, "main")
        
        requests.post(
            f"{self.base_url}/repos/{org}/{repo}/git/refs",
            headers=self.headers,
            json={
                "ref": f"refs/heads/{branch_name}",
                "sha": master_sha
            }
        )
        
        # Create commit
        self._create_test_commit(org, repo, branch_name)
        
        # Create PR
        pr_response = requests.post(
            f"{self.base_url}/repos/{org}/{repo}/pulls",
            headers=self.headers,
            json={
                "title": f"Webhook Test PR - {branch_name}",
                "head": branch_name,
                "base": "main",
                "body": "Automated webhook validation test"
            }
        )
        
        return pr_response.json()['number']
    
    def _get_branch_sha(self, org: str, repo: str, branch: str) -> str:
        """Get SHA of latest commit on branch"""
        import requests
        
        response = requests.get(
            f"{self.base_url}/repos/{org}/{repo}/git/refs/heads/{branch}",
            headers=self.headers
        )
        return response.json()['object']['sha']
    
    def _create_test_commit(self, org: str, repo: str, branch_name: str):
        """Create test commit (simplified)"""
        # Implementation would use Git objects API
        pass
    
    def _add_commit_to_branch(self, org: str, repo: str, branch_name: str):
        """Add additional commit to trigger synchronize event"""
        # Implementation would use Git objects API
        pass
    
    def _submit_pr_review(self, org: str, repo: str, pr_number: int):
        """Submit a test review"""
        import requests
        
        requests.post(
            f"{self.base_url}/repos/{org}/{repo}/pulls/{pr_number}/reviews",
            headers=self.headers,
            json={
                "body": "Automated webhook test review",
                "event": "APPROVE"
            }
        )
    
    def _cleanup_test_pr(self, org: str, repo: str, pr_number: int, branch_name: str):
        """Clean up test PR and branch"""
        import requests
        
        # Close PR
        requests.patch(
            f"{self.base_url}/repos/{org}/{repo}/pulls/{pr_number}",
            headers=self.headers,
            json={"state": "closed"}
        )
        
        # Delete branch
        requests.delete(
            f"{self.base_url}/repos/{org}/{repo}/git/refs/heads/{branch_name}",
            headers=self.headers
        )

# Usage example for webhook testing
def run_webhook_validation():
    webhook_secret = "your-webhook-secret"
    github_token = "your-github-token"
    
    # Start webhook validator server
    validator = WebhookValidator(webhook_secret)
    
    # Run server in background thread
    def run_server():
        validator.app.run(host='0.0.0.0', port=8080, debug=False)
    
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    time.sleep(2)  # Allow server to start
    
    # Run webhook integration tests
    test_runner = QMSWebhookIntegrationTest(github_token, validator)
    
    results = []
    results.append(test_runner.test_pr_lifecycle_webhooks("qms-test-main", "qms-org"))
    results.append(test_runner.test_review_webhooks("qms-test-main", "qms-org"))
    
    return results
```

---

## PR Workflow Integration Testing

### Workflow Trigger Validation

#### Critical PR Workflow Events
```yaml
PR Workflow Triggers:
  on_pr_opened:
    triggers: ["DoR validation", "Initial code analysis", "Reviewer assignment"]
    timeout: "5 minutes"
    success_criteria: "All triggered workflows complete successfully"
    
  on_pr_synchronize:
    triggers: ["Progress review", "Updated code analysis", "Status check updates"]
    timeout: "10 minutes"
    success_criteria: "Incremental validation completes"
    
  on_pr_ready_for_review:
    triggers: ["DoD validation", "Comprehensive testing", "Final review request"]
    timeout: "15 minutes"
    success_criteria: "All quality gates evaluated"
    
  on_pr_review_requested:
    triggers: ["Reviewer notification", "Review delegation", "SLA tracking"]
    timeout: "2 minutes"
    success_criteria: "Review request processed and assigned"
```

#### Procedure 4: PR Workflow End-to-End Testing

```yaml
# .github/workflows/qms-integration-test.yml
name: QMS Integration Test Workflow

on:
  workflow_dispatch:
    inputs:
      test_repository:
        description: 'Repository to test'
        required: true
        type: string
      test_scenarios:
        description: 'Test scenarios to run'
        required: true
        type: choice
        options:
          - all
          - dor-validation
          - progress-reviews
          - dod-validation
          - reviewer-assignment

jobs:
  setup-test-environment:
    runs-on: ubuntu-latest
    outputs:
      test-branch: ${{ steps.setup.outputs.test-branch }}
      pr-number: ${{ steps.create-pr.outputs.pr-number }}
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup test environment
        id: setup
        run: |
          TEST_BRANCH="qms-integration-test-$(date +%s)"
          echo "test-branch=$TEST_BRANCH" >> $GITHUB_OUTPUT
          
          # Create test branch
          git checkout -b $TEST_BRANCH
          
          # Create test files
          mkdir -p test-files
          echo "# QMS Integration Test" > test-files/README.md
          echo "console.log('QMS test');" > test-files/test.js
          echo "def test_function(): pass" > test-files/test.py
          
          # Commit test files
          git config user.name "QMS Integration Test"
          git config user.email "qms-test@example.com"
          git add test-files/
          git commit -m "Add QMS integration test files"
          git push origin $TEST_BRANCH
      
      - name: Create test PR
        id: create-pr
        uses: actions/github-script@v7
        with:
          script: |
            const { data: pr } = await github.rest.pulls.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'QMS Integration Test PR',
              head: '${{ steps.setup.outputs.test-branch }}',
              base: 'main',
              body: `
                ## QMS Integration Test PR
                
                This PR is created automatically to test QMS integration workflows.
                
                **Test Scenarios:** ${{ inputs.test_scenarios }}
                **Timestamp:** $(date)
                
                ### Expected QMS Workflows:
                - [ ] DoR Validation
                - [ ] Code Analysis
                - [ ] Reviewer Assignment
                - [ ] Progress Reviews
                - [ ] DoD Validation
                - [ ] Final Review
                
                **Do not merge this PR - it will be automatically cleaned up.**
              `
            });
            
            core.setOutput('pr-number', pr.number);
            console.log(\`Created PR #\${pr.number}\`);

  validate-dor-workflow:
    needs: setup-test-environment
    if: contains(inputs.test_scenarios, 'all') || contains(inputs.test_scenarios, 'dor-validation')
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    steps:
      - name: Wait for DoR validation
        uses: actions/github-script@v7
        with:
          script: |
            const pr_number = ${{ needs.setup-test-environment.outputs.pr-number }};
            const max_wait = 300; // 5 minutes
            const start_time = Date.now();
            
            console.log(\`Waiting for DoR validation on PR #\${pr_number}\`);
            
            while (Date.now() - start_time < max_wait * 1000) {
              const { data: checks } = await github.rest.checks.listForRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: \`refs/pull/\${pr_number}/head\`
              });
              
              const dorCheck = checks.check_runs.find(check => 
                check.name.includes('QMS DoR Validation')
              );
              
              if (dorCheck) {
                console.log(\`DoR check status: \${dorCheck.status}, conclusion: \${dorCheck.conclusion}\`);
                
                if (dorCheck.status === 'completed') {
                  if (dorCheck.conclusion === 'success') {
                    console.log('✅ DoR validation passed');
                    return;
                  } else {
                    core.setFailed(\`DoR validation failed: \${dorCheck.conclusion}\`);
                    return;
                  }
                }
              }
              
              console.log('Waiting for DoR validation...');
              await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
            }
            
            core.setFailed('DoR validation timed out');

  validate-reviewer-assignment:
    needs: setup-test-environment
    if: contains(inputs.test_scenarios, 'all') || contains(inputs.test_scenarios, 'reviewer-assignment')
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - name: Check reviewer assignment
        uses: actions/github-script@v7
        with:
          script: |
            const pr_number = ${{ needs.setup-test-environment.outputs.pr-number }};
            const max_wait = 120; // 2 minutes
            const start_time = Date.now();
            
            console.log(\`Checking reviewer assignment for PR #\${pr_number}\`);
            
            while (Date.now() - start_time < max_wait * 1000) {
              const { data: pr } = await github.rest.pulls.get({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr_number
              });
              
              const reviewers = pr.requested_reviewers || [];
              const teamReviewers = pr.requested_teams || [];
              
              if (reviewers.length > 0 || teamReviewers.length > 0) {
                console.log(\`✅ Reviewers assigned:\`);
                console.log(\`  Individual reviewers: \${reviewers.map(r => r.login).join(', ')}\`);
                console.log(\`  Team reviewers: \${teamReviewers.map(t => t.slug).join(', ')}\`);
                return;
              }
              
              // Check for QMS labels indicating review assignment
              const labels = pr.labels || [];
              const qmsLabels = labels.filter(label => 
                label.name.startsWith('qms-') && label.name.includes('assigned')
              );
              
              if (qmsLabels.length > 0) {
                console.log(\`✅ QMS reviewer assignment labels found: \${qmsLabels.map(l => l.name).join(', ')}\`);
                return;
              }
              
              console.log('Waiting for reviewer assignment...');
              await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
            }
            
            core.setFailed('Reviewer assignment timed out');

  validate-dod-workflow:
    needs: setup-test-environment
    if: contains(inputs.test_scenarios, 'all') || contains(inputs.test_scenarios, 'dod-validation')
    runs-on: ubuntu-latest
    timeout-minutes: 15
    
    steps:
      - name: Mark PR ready for review
        uses: actions/github-script@v7
        with:
          script: |
            const pr_number = ${{ needs.setup-test-environment.outputs.pr-number }};
            
            // Mark PR as ready for review (if it was draft)
            await github.rest.pulls.update({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: pr_number,
              draft: false
            });
            
            // Add label to trigger DoD validation
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: pr_number,
              labels: ['qms-ready-for-dod']
            });
      
      - name: Wait for DoD validation
        uses: actions/github-script@v7
        with:
          script: |
            const pr_number = ${{ needs.setup-test-environment.outputs.pr-number }};
            const max_wait = 900; // 15 minutes
            const start_time = Date.now();
            
            console.log(\`Waiting for DoD validation on PR #\${pr_number}\`);
            
            while (Date.now() - start_time < max_wait * 1000) {
              const { data: checks } = await github.rest.checks.listForRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: \`refs/pull/\${pr_number}/head\`
              });
              
              const dodChecks = checks.check_runs.filter(check => 
                check.name.includes('QMS DoD') || 
                check.name.includes('QMS Quality Gate')
              );
              
              if (dodChecks.length > 0) {
                const allCompleted = dodChecks.every(check => check.status === 'completed');
                const allPassed = dodChecks.every(check => check.conclusion === 'success');
                
                console.log(\`DoD checks found: \${dodChecks.length}\`);
                console.log(\`All completed: \${allCompleted}, All passed: \${allPassed}\`);
                
                if (allCompleted) {
                  if (allPassed) {
                    console.log('✅ All DoD validations passed');
                    return;
                  } else {
                    const failed = dodChecks.filter(check => check.conclusion !== 'success');
                    core.setFailed(\`DoD validation failed: \${failed.map(c => c.name).join(', ')}\`);
                    return;
                  }
                }
              }
              
              console.log('Waiting for DoD validation...');
              await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 seconds
            }
            
            core.setFailed('DoD validation timed out');

  cleanup:
    needs: [setup-test-environment, validate-dor-workflow, validate-reviewer-assignment, validate-dod-workflow]
    if: always()
    runs-on: ubuntu-latest
    
    steps:
      - name: Cleanup test PR and branch
        uses: actions/github-script@v7
        with:
          script: |
            const pr_number = ${{ needs.setup-test-environment.outputs.pr-number }};
            const test_branch = '${{ needs.setup-test-environment.outputs.test-branch }}';
            
            try {
              // Close PR
              await github.rest.pulls.update({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: pr_number,
                state: 'closed'
              });
              console.log(\`Closed PR #\${pr_number}\`);
              
              // Delete branch
              await github.rest.git.deleteRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: \`heads/\${test_branch}\`
              });
              console.log(\`Deleted branch: \${test_branch}\`);
              
            } catch (error) {
              console.error('Cleanup error:', error.message);
            }
      
      - name: Report test results
        uses: actions/github-script@v7
        with:
          script: |
            const jobs = [
              { name: 'DoR Validation', needs: 'validate-dor-workflow' },
              { name: 'Reviewer Assignment', needs: 'validate-reviewer-assignment' },
              { name: 'DoD Validation', needs: 'validate-dod-workflow' }
            ];
            
            console.log('\\n📊 QMS Integration Test Results:');
            console.log('=====================================');
            
            for (const job of jobs) {
              const jobResult = '${{ toJson(needs) }}';
              const result = JSON.parse(jobResult)[job.needs];
              
              if (result) {
                const status = result.result === 'success' ? '✅ PASSED' : '❌ FAILED';
                console.log(\`\${job.name}: \${status}\`);
              } else {
                console.log(\`\${job.name}: ⏭️ SKIPPED\`);
              }
            }
            
            console.log('=====================================');
```

---

## Branch Protection Rule Validation

### Branch Protection Components

#### Core Protection Rules
```yaml
Branch Protection Rules:
  required_status_checks:
    strict: true
    contexts:
      - "qms/dor-validation"
      - "qms/dod-validation" 
      - "qms/security-scan"
      - "qms/test-coverage"
      - "qms/code-quality"
    
  required_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    required_review_from_code_owners: false
    
  enforce_admins: true
  allow_force_pushes: false
  allow_deletions: false
  
  restrictions:
    users: []
    teams: ["qms-administrators"]
    apps: ["qms-bot"]
```

#### Procedure 5: Branch Protection Validation Script

```bash
#!/bin/bash
# QMS Branch Protection Rule Validation

set -e

GITHUB_TOKEN="${GITHUB_TOKEN:-}"
ORG="${QMS_TEST_ORG:-qms-org}"
REPO="${1:-qms-test-main}"

if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "❌ GITHUB_TOKEN environment variable is required"
    exit 1
fi

API_BASE="https://api.github.com"
HEADERS="Authorization: token $GITHUB_TOKEN"

echo "🔒 Validating Branch Protection Rules for $ORG/$REPO"
echo "=================================================="

# Function to make GitHub API calls
gh_api() {
    local method="$1"
    local endpoint="$2"
    local data="$3"
    
    if [[ -n "$data" ]]; then
        curl -s -X "$method" \
             -H "$HEADERS" \
             -H "Accept: application/vnd.github.v3+json" \
             -d "$data" \
             "$API_BASE/$endpoint"
    else
        curl -s -X "$method" \
             -H "$HEADERS" \
             -H "Accept: application/vnd.github.v3+json" \
             "$API_BASE/$endpoint"
    fi
}

# Test 1: Verify branch protection exists
echo "📋 Test 1: Branch Protection Configuration"
protection_config=$(gh_api GET "repos/$ORG/$REPO/branches/main/protection")

if [[ $(echo "$protection_config" | jq -r '.message // empty') == "Branch not protected" ]]; then
    echo "❌ Branch protection not configured"
    exit 1
fi

echo "✅ Branch protection is configured"

# Test 2: Validate required status checks
echo "📋 Test 2: Required Status Checks"
required_contexts=$(echo "$protection_config" | jq -r '.required_status_checks.contexts[]' 2>/dev/null || echo "")

expected_contexts=(
    "qms/dor-validation"
    "qms/dod-validation"
    "qms/security-scan"
    "qms/test-coverage"
    "qms/code-quality"
)

missing_contexts=()
for context in "${expected_contexts[@]}"; do
    if ! echo "$required_contexts" | grep -q "^$context$"; then
        missing_contexts+=("$context")
    fi
done

if [[ ${#missing_contexts[@]} -eq 0 ]]; then
    echo "✅ All required status checks configured"
else
    echo "❌ Missing required status checks: ${missing_contexts[*]}"
fi

# Test 3: Validate pull request review requirements
echo "📋 Test 3: Pull Request Review Requirements"
review_config=$(echo "$protection_config" | jq -r '.required_pull_request_reviews')

required_reviews=$(echo "$review_config" | jq -r '.required_approving_review_count')
dismiss_stale=$(echo "$review_config" | jq -r '.dismiss_stale_reviews')

if [[ "$required_reviews" -ge 1 ]] && [[ "$dismiss_stale" == "true" ]]; then
    echo "✅ Pull request review requirements configured correctly"
else
    echo "❌ Pull request review requirements not properly configured"
    echo "   Required reviews: $required_reviews (expected: ≥1)"
    echo "   Dismiss stale: $dismiss_stale (expected: true)"
fi

# Test 4: Test unauthorized merge attempt
echo "📋 Test 4: Unauthorized Merge Prevention"
test_branch="branch-protection-test-$(date +%s)"

# Create test branch
master_sha=$(gh_api GET "repos/$ORG/$REPO/git/refs/heads/main" | jq -r '.object.sha')
create_branch_response=$(gh_api POST "repos/$ORG/$REPO/git/refs" '{
    "ref": "refs/heads/'$test_branch'",
    "sha": "'$master_sha'"
}')

if [[ $(echo "$create_branch_response" | jq -r '.ref // empty') ]]; then
    echo "✅ Test branch created: $test_branch"
    
    # Try to push directly to main (should fail)
    push_attempt=$(gh_api POST "repos/$ORG/$REPO/git/refs/heads/main" '{
        "sha": "'$master_sha'",
        "force": false
    }' 2>&1 || true)
    
    if echo "$push_attempt" | grep -q "error\|protected"; then
        echo "✅ Direct push to main branch correctly blocked"
    else
        echo "❌ Direct push to main branch was not blocked"
    fi
    
    # Cleanup test branch
    gh_api DELETE "repos/$ORG/$REPO/git/refs/heads/$test_branch" >/dev/null 2>&1 || true
    echo "🧹 Test branch cleaned up"
else
    echo "❌ Failed to create test branch"
fi

# Test 5: Validate administrator enforcement
echo "📋 Test 5: Administrator Enforcement"
enforce_admins=$(echo "$protection_config" | jq -r '.enforce_admins.enabled')

if [[ "$enforce_admins" == "true" ]]; then
    echo "✅ Administrator enforcement enabled"
else
    echo "❌ Administrator enforcement disabled"
fi

# Test 6: Test PR merge with missing status checks
echo "📋 Test 6: PR Merge with Missing Status Checks"

# Create test PR
test_pr_branch="pr-protection-test-$(date +%s)"
gh_api POST "repos/$ORG/$REPO/git/refs" '{
    "ref": "refs/heads/'$test_pr_branch'",
    "sha": "'$master_sha'"
}'

# Create a minimal commit
tree_sha=$(gh_api GET "repos/$ORG/$REPO/git/trees/$master_sha" | jq -r '.sha')
commit_response=$(gh_api POST "repos/$ORG/$REPO/git/commits" '{
    "message": "Branch protection test commit",
    "tree": "'$tree_sha'",
    "parents": ["'$master_sha'"]
}')
commit_sha=$(echo "$commit_response" | jq -r '.sha')

# Update branch with new commit
gh_api PATCH "repos/$ORG/$REPO/git/refs/heads/$test_pr_branch" '{
    "sha": "'$commit_sha'"
}'

# Create PR
pr_response=$(gh_api POST "repos/$ORG/$REPO/pulls" '{
    "title": "Branch Protection Test PR",
    "head": "'$test_pr_branch'",
    "base": "main",
    "body": "Test PR for branch protection validation"
}')
pr_number=$(echo "$pr_response" | jq -r '.number')

if [[ "$pr_number" != "null" ]] && [[ -n "$pr_number" ]]; then
    echo "✅ Test PR created: #$pr_number"
    
    # Try to merge PR without required status checks (should fail)
    merge_attempt=$(gh_api PUT "repos/$ORG/$REPO/pulls/$pr_number/merge" '{
        "commit_title": "Test merge",
        "merge_method": "merge"
    }' 2>&1 || true)
    
    if echo "$merge_attempt" | grep -q "error\|Required status check"; then
        echo "✅ PR merge correctly blocked due to missing status checks"
    else
        echo "❌ PR merge was not blocked despite missing status checks"
    fi
    
    # Cleanup PR and branch
    gh_api PATCH "repos/$ORG/$REPO/pulls/$pr_number" '{"state": "closed"}' >/dev/null
    gh_api DELETE "repos/$ORG/$REPO/git/refs/heads/$test_pr_branch" >/dev/null 2>&1 || true
    echo "🧹 Test PR and branch cleaned up"
else
    echo "❌ Failed to create test PR"
fi

echo "=================================================="
echo "🏁 Branch Protection Validation Complete"

# Generate summary report
cat << EOF > branch-protection-validation-report.json
{
    "timestamp": "$(date -Iseconds)",
    "repository": "$ORG/$REPO",
    "tests": [
        {
            "name": "Branch Protection Configuration",
            "passed": true,
            "message": "Branch protection is configured"
        },
        {
            "name": "Required Status Checks", 
            "passed": $([ ${#missing_contexts[@]} -eq 0 ] && echo true || echo false),
            "message": "$([ ${#missing_contexts[@]} -eq 0 ] && echo "All required status checks configured" || echo "Missing contexts: ${missing_contexts[*]}")"
        },
        {
            "name": "Pull Request Reviews",
            "passed": $([ "$required_reviews" -ge 1 ] && [ "$dismiss_stale" == "true" ] && echo true || echo false),
            "message": "Review requirements validation"
        },
        {
            "name": "Administrator Enforcement",
            "passed": $([ "$enforce_admins" == "true" ] && echo true || echo false),
            "message": "Administrator enforcement check"
        }
    ]
}
EOF

echo "📄 Detailed report saved to: branch-protection-validation-report.json"
```

---

## Status Check System Testing

### Status Check Components

#### QMS Status Check Types
```yaml
QMS Status Checks:
  "qms/dor-validation":
    type: "required"
    description: "Definition of Ready validation"
    timeout: "5 minutes"
    
  "qms/dod-validation":
    type: "required" 
    description: "Definition of Done validation"
    timeout: "15 minutes"
    
  "qms/security-scan":
    type: "required"
    description: "Security vulnerability scan"
    timeout: "10 minutes"
    
  "qms/test-coverage":
    type: "required"
    description: "Test coverage validation (≥80%)"
    timeout: "10 minutes"
    
  "qms/code-quality":
    type: "optional"
    description: "Code quality metrics"
    timeout: "5 minutes"
    
  "qms/performance-check":
    type: "optional"
    description: "Performance regression analysis"
    timeout: "15 minutes"
```

#### Procedure 6: Status Check System Validation

```python
#!/usr/bin/env python3
"""
QMS Status Check System Validation
"""

import requests
import time
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from enum import Enum

class CheckStatus(Enum):
    QUEUED = "queued"
    IN_PROGRESS = "in_progress" 
    COMPLETED = "completed"

class CheckConclusion(Enum):
    SUCCESS = "success"
    FAILURE = "failure"
    NEUTRAL = "neutral"
    CANCELLED = "cancelled"
    TIMED_OUT = "timed_out"
    ACTION_REQUIRED = "action_required"

class QMSStatusCheckValidator:
    def __init__(self, github_token: str, org: str, repo: str):
        self.github_token = github_token
        self.org = org
        self.repo = repo
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {github_token}",
            "Accept": "application/vnd.github.antiope-preview+json"
        }
        self.test_results = []
    
    def create_status_check(self, commit_sha: str, check_name: str, 
                           status: CheckStatus = CheckStatus.IN_PROGRESS) -> Optional[int]:
        """Create a new status check"""
        payload = {
            "name": check_name,
            "head_sha": commit_sha,
            "status": status.value,
            "started_at": datetime.now().isoformat() + "Z"
        }
        
        response = requests.post(
            f"{self.base_url}/repos/{self.org}/{self.repo}/check-runs",
            headers=self.headers,
            json=payload
        )
        
        if response.status_code == 201:
            return response.json()['id']
        else:
            print(f"❌ Failed to create status check: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    
    def update_status_check(self, check_run_id: int, status: CheckStatus,
                           conclusion: Optional[CheckConclusion] = None,
                           output: Optional[Dict] = None) -> bool:
        """Update an existing status check"""
        payload = {
            "status": status.value
        }
        
        if status == CheckStatus.COMPLETED and conclusion:
            payload["conclusion"] = conclusion.value
            payload["completed_at"] = datetime.now().isoformat() + "Z"
        
        if output:
            payload["output"] = output
        
        response = requests.patch(
            f"{self.base_url}/repos/{self.org}/{self.repo}/check-runs/{check_run_id}",
            headers=self.headers,
            json=payload
        )
        
        return response.status_code == 200
    
    def get_status_checks(self, commit_sha: str) -> List[Dict]:
        """Get all status checks for a commit"""
        response = requests.get(
            f"{self.base_url}/repos/{self.org}/{self.repo}/commits/{commit_sha}/check-runs",
            headers=self.headers
        )
        
        if response.status_code == 200:
            return response.json().get('check_runs', [])
        return []
    
    def test_status_check_creation(self, commit_sha: str) -> Dict:
        """Test status check creation functionality"""
        test_name = "Status Check Creation"
        
        check_name = f"qms/test-check-{int(time.time())}"
        
        # Create status check
        check_id = self.create_status_check(commit_sha, check_name)
        
        if check_id:
            # Verify check was created
            checks = self.get_status_checks(commit_sha)
            created_check = next((c for c in checks if c['id'] == check_id), None)
            
            if created_check:
                return {
                    "test_name": test_name,
                    "passed": True,
                    "