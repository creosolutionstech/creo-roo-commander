+++
# Document Metadata
id = "qms-merge-restriction-policies-v1"
title = "QMS Merge Restriction Policies v1.0"
context_type = "policy_specification"
scope = "GitHub merge restriction policies based on QMS validation results"
target_audience = ["devops", "qms-coordinators", "repository-admins", "team-leads"]
granularity = "detailed"
status = "active"
created_date = "2025-08-17T05:19:00Z"
updated_date = "2025-08-17T05:19:00Z"

# Technical Context
[technical_context]
integration_phase = "2.3"
policy_scope = ["merge-restrictions", "quality-gates", "compliance-enforcement"]
enforcement_level = "automated"
coverage_target = 100

# Related Documentation
related_docs = [
    ".ruru/docs/qms/github-integration/branch-protection/qms-status-checks-specification-v1.md",
    ".ruru/docs/qms/github-integration/review-assignment/qms-review-assignment-configuration-v1.md",
    ".ruru/docs/qms/workflows/4-step-qms-review-workflow-v1.md",
    ".ruru/modes/qms-compliance-coordinator/qms-compliance-coordinator.mode.md"
]
tags = ["qms", "github", "merge-policies", "branch-protection", "quality-gates", "compliance"]
+++

# QMS Merge Restriction Policies v1.0

## Overview

This specification defines comprehensive merge restriction policies that automatically enforce QMS quality gates through GitHub branch protection rules. These policies integrate with the 18 QMS status checks and intelligent review assignment system to ensure no code reaches the main branch without meeting all quality, security, and compliance requirements.

## Policy Framework Architecture

### Core Enforcement Principles

1. **Zero-Defect Tolerance**: No merge permitted with failing critical QMS checks
2. **Progressive Restriction**: Merge restrictions scale with repository importance and risk level
3. **Intelligent Bypass**: Emergency procedures with post-merge compliance tracking
4. **Audit Transparency**: All restriction decisions and bypasses are fully logged and traceable
5. **Contextual Flexibility**: Policies adapt to different repository types and development contexts

### Integration Matrix

| QMS Component | Merge Impact | Bypass Level | Tracking Required |
|---------------|--------------|--------------|-------------------|
| DoR Validation | Block on failure | Level 2 | Post-merge audit |
| Security Scan | Block on critical/high | Level 3 | Security review |
| Code Quality | Warning on failure | Level 1 | Code review |
| DoD Validation | Block on failure | Level 2 | QMS audit |
| Compliance Audit | Block on violation | Level 3 | Legal review |
| Performance Test | Warning on regression | Level 1 | Performance review |

## Repository Classification System

### Tier 1: Mission-Critical Repositories
```yaml
classification:
  tier: "mission-critical"
  examples:
    - core-authentication-service
    - payment-processing-api
    - user-data-management
    - security-infrastructure
  
merge_restrictions:
  required_status_checks:
    - qms-dor-validation
    - qms-security-scan-critical
    - qms-security-scan-high
    - qms-compliance-audit-gdpr
    - qms-compliance-audit-pci
    - qms-code-quality-critical
    - qms-dod-validation
    - qms-performance-baseline
  
  required_reviews:
    minimum_count: 3
    specialist_approvals: 2
    architect_approval: 1
    qms_coordinator_approval: 1
  
  restrictions:
    dismiss_stale_reviews: true
    require_review_from_code_owners: true
    require_last_push_approval: true
    restrict_pushes: true
    enforce_admins: true
    allow_force_pushes: false
    allow_deletions: false
  
  bypass_authorization:
    level_1: disabled
    level_2: disabled  
    level_3: "qms-compliance-coordinator"
    emergency: "roo-commander"
```

### Tier 2: Business-Critical Repositories
```yaml
classification:
  tier: "business-critical"
  examples:
    - customer-portal-frontend
    - reporting-services
    - integration-middleware
    - data-analytics-pipeline
  
merge_restrictions:
  required_status_checks:
    - qms-dor-validation
    - qms-security-scan-critical
    - qms-security-scan-high
    - qms-compliance-audit-relevant
    - qms-code-quality-major
    - qms-dod-validation
  
  required_reviews:
    minimum_count: 2
    specialist_approvals: 2
    lead_approval: 1
  
  restrictions:
    dismiss_stale_reviews: true
    require_review_from_code_owners: true
    require_last_push_approval: true
    restrict_pushes: false
    enforce_admins: false
    allow_force_pushes: false
    allow_deletions: false
  
  bypass_authorization:
    level_1: "lead-devops"
    level_2: "core-architect"
    level_3: "qms-compliance-coordinator"
    emergency: "roo-commander"
```

### Tier 3: Standard Repositories
```yaml
classification:
  tier: "standard"
  examples:
    - documentation-sites
    - internal-tools
    - development-utilities
    - testing-frameworks
  
merge_restrictions:
  required_status_checks:
    - qms-dor-validation
    - qms-security-scan-critical
    - qms-code-quality-major
    - qms-dod-validation
  
  required_reviews:
    minimum_count: 1
    specialist_approvals: 1
  
  restrictions:
    dismiss_stale_reviews: false
    require_review_from_code_owners: true
    require_last_push_approval: false
    restrict_pushes: false
    enforce_admins: false
    allow_force_pushes: false
    allow_deletions: false
  
  bypass_authorization:
    level_1: "lead-*"
    level_2: "core-architect"
    level_3: "qms-compliance-coordinator"
    emergency: "roo-commander"
```

### Tier 4: Development/Experimental Repositories
```yaml
classification:
  tier: "experimental"
  examples:
    - proof-of-concepts
    - research-projects
    - learning-repositories
    - sandbox-environments
  
merge_restrictions:
  required_status_checks:
    - qms-security-scan-critical
    - qms-code-quality-minor
  
  required_reviews:
    minimum_count: 1
  
  restrictions:
    dismiss_stale_reviews: false
    require_review_from_code_owners: false
    require_last_push_approval: false
    restrict_pushes: false
    enforce_admins: false
    allow_force_pushes: true
    allow_deletions: true
  
  bypass_authorization:
    level_1: "any-developer"
    level_2: "lead-*"
    level_3: "core-architect"
    emergency: "roo-commander"
```

## Status Check Integration Policies

### Critical Blocking Checks
These checks must pass before any merge is allowed:

```yaml
critical_blocking_checks:
  qms-dor-validation:
    description: "Definition of Ready validation"
    failure_action: "block_merge"
    bypass_level: 2
    error_message: "PR does not meet Definition of Ready requirements"
    remediation_guide: "Review DoR checklist and ensure all items are completed"
  
  qms-security-scan-critical:
    description: "Critical security vulnerabilities detected"
    failure_action: "block_merge"
    bypass_level: 3
    error_message: "Critical security vulnerabilities must be resolved"
    remediation_guide: "Review security scan results and fix all critical issues"
  
  qms-compliance-audit-gdpr:
    description: "GDPR compliance validation"
    failure_action: "block_merge"
    bypass_level: 3
    error_message: "GDPR compliance violations detected"
    remediation_guide: "Review data handling practices and ensure GDPR compliance"
  
  qms-compliance-audit-pci:
    description: "PCI DSS compliance validation"  
    failure_action: "block_merge"
    bypass_level: 3
    error_message: "PCI DSS compliance violations detected"
    remediation_guide: "Review payment processing code and ensure PCI compliance"
  
  qms-dod-validation:
    description: "Definition of Done validation"
    failure_action: "block_merge"
    bypass_level: 2
    error_message: "PR does not meet Definition of Done requirements"
    remediation_guide: "Complete all DoD checklist items before merging"
```

### Warning-Level Checks
These checks generate warnings but don't block merges:

```yaml
warning_level_checks:
  qms-code-quality-minor:
    description: "Minor code quality issues detected"
    failure_action: "warn"
    bypass_level: 1
    warning_message: "Code quality improvements recommended"
    remediation_guide: "Review code quality metrics and address suggestions"
  
  qms-performance-regression:
    description: "Performance regression detected"
    failure_action: "warn"
    bypass_level: 1
    warning_message: "Performance regression detected, review recommended"
    remediation_guide: "Analyze performance metrics and optimize if necessary"
  
  qms-documentation-coverage:
    description: "Documentation coverage below threshold"
    failure_action: "warn"
    bypass_level: 1
    warning_message: "Documentation coverage could be improved"
    remediation_guide: "Add documentation for new features and complex code"
```

### Contextual Blocking Checks
These checks block merges based on repository tier and content:

```yaml
contextual_blocking_checks:
  qms-security-scan-high:
    tier_requirements:
      mission_critical: "block_merge"
      business_critical: "block_merge"  
      standard: "warn"
      experimental: "ignore"
    failure_action: "contextual"
    bypass_level: 2
  
  qms-code-quality-major:
    tier_requirements:
      mission_critical: "block_merge"
      business_critical: "block_merge"
      standard: "block_merge"
      experimental: "warn"
    failure_action: "contextual"
    bypass_level: 1
  
  qms-test-coverage-threshold:
    tier_requirements:
      mission_critical: "block_merge"  # 85% required
      business_critical: "block_merge" # 75% required
      standard: "warn"                 # 60% recommended
      experimental: "ignore"           # No requirement
    failure_action: "contextual"
    bypass_level: 1
```

## Branch-Specific Policies

### Main/Master Branch Protection
```yaml
main_branch_policies:
  protected_branches: ["main", "master", "production"]
  
  absolute_requirements:
    - all_critical_checks_pass
    - minimum_required_reviews_obtained
    - no_conflicts_with_base_branch
    - linear_history_maintained
  
  additional_restrictions:
    - no_direct_pushes_allowed
    - no_force_pushes_allowed
    - no_branch_deletion_allowed
    - administrator_enforcement_enabled
  
  merge_strategies:
    allowed: ["merge", "squash"]
    prohibited: ["rebase"]
    default: "squash"
```

### Release Branch Protection
```yaml
release_branch_policies:
  protected_branches: ["release/*", "hotfix/*"]
  
  requirements:
    - qms-dor-validation
    - qms-security-scan-critical
    - qms-security-scan-high  
    - qms-dod-validation
    - qms-performance-baseline
    - minimum_2_approvals
  
  restrictions:
    - require_review_from_code_owners: true
    - dismiss_stale_reviews: true
    - require_last_push_approval: true
```

### Feature Branch Policies
```yaml
feature_branch_policies:
  protected_branches: ["feature/*", "feat/*"]
  
  requirements:
    - qms-security-scan-critical
    - qms-code-quality-major
    - minimum_1_approval
  
  restrictions:
    - allow_force_pushes: true  # For development flexibility
    - require_review_from_code_owners: false
```

## Emergency Bypass Procedures

### Level 1 Bypass: Non-Critical Quality Issues
```yaml
level_1_bypass:
  authorized_roles: ["lead-devops", "lead-frontend", "lead-backend", "lead-qa"]
  bypassable_checks: 
    - qms-code-quality-minor
    - qms-documentation-coverage
    - qms-performance-regression
    - qms-test-coverage-threshold (standard tier only)
  
  approval_process:
    - single_lead_approval_required
    - justification_comment_mandatory
    - automatic_follow_up_issue_created
  
  post_bypass_actions:
    - create_technical_debt_tracking_issue
    - schedule_remediation_within_5_business_days
    - notify_qms_coordinator
```

### Level 2 Bypass: Standard Quality Gates
```yaml
level_2_bypass:
  authorized_roles: ["core-architect", "qms-quality-coordinator"]
  bypassable_checks:
    - qms-dor-validation
    - qms-dod-validation
    - qms-code-quality-major
    - qms-security-scan-high
    - qms-test-coverage-threshold
  
  approval_process:
    - architect_approval_plus_qms_coordination
    - detailed_justification_document_required
    - impact_assessment_mandatory
  
  post_bypass_actions:
    - create_compliance_tracking_issue
    - schedule_audit_within_3_business_days
    - notify_development_team_leads
    - update_risk_register
```

### Level 3 Bypass: Security and Compliance Gates
```yaml
level_3_bypass:
  authorized_roles: ["qms-compliance-coordinator"]
  bypassable_checks:
    - qms-security-scan-critical
    - qms-compliance-audit-gdpr
    - qms-compliance-audit-pci
    - qms-compliance-audit-sox
  
  approval_process:
    - qms_coordinator_approval_required
    - security_lead_consultation_mandatory
    - legal_review_for_compliance_issues
    - detailed_risk_assessment_document
  
  post_bypass_actions:
    - immediate_security_review_scheduled
    - compliance_incident_report_created
    - executive_notification_sent
    - mandatory_post_incident_review
```

### Emergency Bypass: All Quality Gates (Production Incidents)
```yaml
emergency_bypass:
  authorized_roles: ["roo-commander"]
  bypassable_checks: ["all"]
  
  trigger_conditions:
    - production_incident_severity_1
    - security_breach_response
    - data_loss_prevention
    - regulatory_compliance_deadline
  
  approval_process:
    - commander_authorization_required
    - incident_commander_confirmation
    - c_level_notification_automatic
  
  post_bypass_actions:
    - immediate_post_incident_review_scheduled
    - full_compliance_audit_within_24_hours
    - comprehensive_remediation_plan_required
    - board_level_reporting_for_severe_incidents
```

## Integration with Review Assignment System

### Reviewer Requirements Based on Failing Checks
```yaml
failing_check_reviewer_assignment:
  security_failures:
    additional_reviewers:
      - qms-security-scanner
      - lead-security
    minimum_security_approvals: 2
    escalation_path: "security-incident-team"
  
  compliance_failures:
    additional_reviewers:
      - qms-compliance-coordinator
      - legal-compliance-team
    minimum_compliance_approvals: 1
    escalation_path: "legal-department"
  
  quality_failures:
    additional_reviewers:
      - qms-code-reviewer
      - qms-testing-specialist
    minimum_quality_approvals: 2
    escalation_path: "quality-assurance-team"
```

### Dynamic Review Requirements
```yaml
dynamic_review_escalation:
  multiple_check_failures:
    threshold: 3
    action: "escalate_to_architect"
    additional_approvals: 1
  
  repeated_failures:
    threshold: "same_check_3_times"
    action: "mandatory_specialist_review"
    cooling_off_period: "24_hours"
  
  bypass_request_conflicts:
    condition: "reviewer_disagrees_with_bypass"
    action: "escalate_to_qms_coordinator"
    resolution_required: true
```

## Monitoring and Metrics

### Policy Effectiveness Metrics
```yaml
monitoring_metrics:
  merge_success_rates:
    - successful_merges_per_day
    - average_time_to_merge
    - policy_compliance_rate
  
  quality_impact_metrics:
    - defect_escape_rate_by_repository_tier
    - security_incident_correlation
    - post_release_issue_frequency
  
  bypass_usage_analytics:
    - bypass_frequency_by_level
    - bypass_justification_categories
    - post_bypass_issue_resolution_time
```

### Alerting and Notifications
```yaml
alerting_configuration:
  critical_policy_violations:
    - multiple_security_scan_failures
    - compliance_audit_failures
    - repeated_bypass_requests
    
  notification_channels:
    immediate: ["slack-qms-alerts", "pagerduty-qms"]
    daily_summary: ["email-dev-leads", "dashboard-qms"]
    weekly_reports: ["stakeholder-reports", "compliance-board"]
```

## Repository Configuration Templates

### Mission-Critical Repository Template
```yaml
# .github/branch_protection_rules.yml
branch_protection_rules:
  main:
    protection:
      required_status_checks:
        strict: true
        contexts:
          - qms-dor-validation
          - qms-security-scan-critical
          - qms-security-scan-high
          - qms-compliance-audit-gdpr
          - qms-compliance-audit-pci
          - qms-code-quality-critical
          - qms-dod-validation
          - qms-performance-baseline
      
      required_pull_request_reviews:
        required_approving_review_count: 3
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
        require_last_push_approval: true
      
      restrictions:
        users: []
        teams: ["qms-emergency-response"]
      
      enforce_admins: true
      allow_force_pushes: false
      allow_deletions: false
```

### Standard Repository Template
```yaml
# .github/branch_protection_rules.yml
branch_protection_rules:
  main:
    protection:
      required_status_checks:
        strict: true
        contexts:
          - qms-dor-validation
          - qms-security-scan-critical
          - qms-code-quality-major
          - qms-dod-validation
      
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: false
        require_code_owner_reviews: true
        require_last_push_approval: false
      
      restrictions:
        users: []
        teams: ["development-leads"]
      
      enforce_admins: false
      allow_force_pushes: false
      allow_deletions: false
```

## Implementation Phases

### Phase 1: Core Policy Deployment
- Deploy basic branch protection rules for all repository tiers
- Implement critical blocking checks for security and compliance
- Enable Level 3 and Emergency bypass procedures

### Phase 2: Advanced Integration
- Integrate with review assignment system
- Implement contextual blocking checks
- Deploy monitoring and alerting infrastructure

### Phase 3: Optimization and Intelligence
- Implement dynamic review requirements
- Deploy predictive policy adjustments
- Enable comprehensive analytics and reporting

### Phase 4: Continuous Improvement
- Implement machine learning-based policy optimization
- Enable self-healing policy adjustments
- Deploy advanced threat detection integration

This comprehensive merge restriction policy framework ensures that QMS quality gates are consistently enforced while providing appropriate flexibility for different development contexts and emergency situations.