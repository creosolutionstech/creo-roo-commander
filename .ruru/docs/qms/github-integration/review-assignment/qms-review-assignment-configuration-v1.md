+++
# Document Metadata
id = "qms-review-assignment-config-v1"
title = "QMS Review Assignment Configuration v1.0"
context_type = "configuration_specification"
scope = "Automated assignment of QMS specialists for GitHub PR reviews"
target_audience = ["devops", "qms-coordinators", "team-leads"]
granularity = "detailed"
status = "active"
created_date = "2025-08-17T05:16:00Z"
updated_date = "2025-08-17T05:16:00Z"

# Technical Context
[technical_context]
integration_phase = "2.3"
automation_level = "intelligent"
assignment_scope = ["pull-requests", "code-reviews", "quality-gates"]
coverage_target = 100

# Related Documentation
related_docs = [
    ".ruru/docs/qms/workflows/review-delegation-system-v1.md",
    ".ruru/docs/qms/github-integration/branch-protection/qms-status-checks-specification-v1.md",
    ".ruru/modes/qms-code-reviewer/qms-code-reviewer.mode.md",
    ".ruru/modes/qms-security-scanner/qms-security-scanner.mode.md"
]
tags = ["qms", "github", "code-review", "assignment", "automation", "specialists"]
+++

# QMS Review Assignment Configuration v1.0

## Overview

This configuration specification defines the intelligent assignment of QMS specialists to GitHub pull request reviews based on automated analysis of code changes, file patterns, complexity metrics, and compliance requirements. The system ensures that every PR receives appropriate specialist review while optimizing for reviewer availability and expertise matching.

## Assignment Strategy Framework

### Core Assignment Principles

1. **Expertise Matching**: Assign reviewers based on their domain expertise and the technical areas affected by the PR
2. **Load Balancing**: Distribute review workload evenly across available QMS specialists
3. **Coverage Guarantee**: Ensure all QMS quality gates have designated specialist oversight
4. **Escalation Readiness**: Automatically escalate high-risk or blocked reviews to senior specialists
5. **Context Preservation**: Maintain reviewer continuity for related PRs and ongoing feature work

### Assignment Matrix

| Change Type | Primary QMS Specialist | Secondary Specialist | Escalation Path |
|-------------|----------------------|---------------------|-----------------|
| Security-Critical | `qms-security-scanner` | `qms-compliance-coordinator` | `lead-security` |
| Database Schema | `qms-dod-validator` | `lead-db` | `core-architect` |
| API Changes | `qms-code-reviewer` | `qms-testing-specialist` | `lead-backend` |
| Frontend/UI | `qms-code-reviewer` | `lead-frontend` | `lead-design` |
| Infrastructure | `qms-compliance-coordinator` | `lead-devops` | `core-architect` |
| Documentation | `qms-dod-validator` | `util-writer` | `manager-product` |
| Configuration | `qms-security-scanner` | `qms-compliance-coordinator` | `lead-devops` |
| Testing | `qms-testing-specialist` | `qms-dod-validator` | `lead-qa` |

## File Pattern-Based Assignment Rules

### Security-Sensitive Files
```yaml
patterns:
  - "**/*auth*/**/*"
  - "**/*security*/**/*"
  - "**/*crypto*/**/*"
  - "**/secrets/**/*"
  - "**/*.env*"
  - "**/docker/**/*"
  - "**/k8s/**/*"
  - "**/*deploy*/**/*"
  - "**/nginx/**/*"
  - "**/ssl/**/*"

assignment:
  primary: "qms-security-scanner"
  secondary: "qms-compliance-coordinator"
  required_approvals: 2
  bypass_allowed: false
  escalation_threshold: "high"
```

### Database and Schema Files
```yaml
patterns:
  - "**/migrations/**/*"
  - "**/schema/**/*"
  - "**/*.sql"
  - "**/models/**/*"
  - "**/entities/**/*"
  - "**/repositories/**/*"
  - "**/dao/**/*"

assignment:
  primary: "qms-dod-validator"
  secondary: "lead-db"
  required_approvals: 2
  bypass_allowed: false
  escalation_threshold: "medium"
```

### API and Service Files
```yaml
patterns:
  - "**/api/**/*"
  - "**/controllers/**/*"
  - "**/services/**/*"
  - "**/handlers/**/*"
  - "**/middleware/**/*"
  - "**/*api*.{js,ts,py,go,java}"
  - "**/graphql/**/*"
  - "**/rest/**/*"

assignment:
  primary: "qms-code-reviewer"
  secondary: "qms-testing-specialist"
  required_approvals: 2
  bypass_allowed: true
  escalation_threshold: "medium"
```

### Frontend and UI Files
```yaml
patterns:
  - "**/components/**/*"
  - "**/pages/**/*"
  - "**/views/**/*"
  - "**/ui/**/*"
  - "**/*.{jsx,tsx,vue,svelte}"
  - "**/*.{css,scss,sass,less}"
  - "**/styles/**/*"
  - "**/assets/**/*"

assignment:
  primary: "qms-code-reviewer"
  secondary: "lead-frontend"
  required_approvals: 1
  bypass_allowed: true
  escalation_threshold: "low"
```

### Infrastructure and Configuration Files
```yaml
patterns:
  - "**/infrastructure/**/*"
  - "**/terraform/**/*"
  - "**/ansible/**/*"
  - "**/*.{yml,yaml}"
  - "**/config/**/*"
  - "**/settings/**/*"
  - "Dockerfile*"
  - "docker-compose*"
  - "**/.github/**/*"
  - "**/workflows/**/*"

assignment:
  primary: "qms-compliance-coordinator"
  secondary: "lead-devops"
  required_approvals: 2
  bypass_allowed: true
  escalation_threshold: "high"
```

### Test Files
```yaml
patterns:
  - "**/test/**/*"
  - "**/tests/**/*"
  - "**/*test*.{js,ts,py,go,java}"
  - "**/*spec*.{js,ts,py,go,java}"
  - "**/e2e/**/*"
  - "**/integration/**/*"
  - "**/unit/**/*"

assignment:
  primary: "qms-testing-specialist"
  secondary: "qms-dod-validator"
  required_approvals: 1
  bypass_allowed: true
  escalation_threshold: "low"
```

### Documentation Files
```yaml
patterns:
  - "**/*.md"
  - "**/docs/**/*"
  - "**/documentation/**/*"
  - "README*"
  - "CHANGELOG*"
  - "**/wiki/**/*"
  - "**/*.rst"
  - "**/*.adoc"

assignment:
  primary: "qms-dod-validator"
  secondary: "util-writer"
  required_approvals: 1
  bypass_allowed: true
  escalation_threshold: "low"
```

## Complexity-Based Assignment Enhancement

### Code Complexity Metrics
```yaml
complexity_thresholds:
  cyclomatic_complexity:
    low: "≤ 5"
    medium: "6-10"
    high: "11-15"
    critical: "> 15"
  
  lines_changed:
    small: "≤ 100"
    medium: "101-500"
    large: "501-1000"
    massive: "> 1000"
  
  files_changed:
    focused: "≤ 5"
    moderate: "6-15"
    broad: "16-30"
    sweeping: "> 30"

assignment_adjustments:
  high_complexity:
    additional_reviewers: 1
    escalation_required: true
    senior_approval_needed: true
  
  critical_complexity:
    additional_reviewers: 2
    escalation_required: true
    architect_review_required: true
    bypass_prohibited: true
```

### Risk Assessment Integration
```yaml
risk_factors:
  security_impact:
    - authentication_changes
    - authorization_modifications
    - cryptographic_updates
    - external_api_integrations
  
  data_impact:
    - database_schema_changes
    - data_migration_scripts
    - model_relationship_updates
    - data_validation_changes
  
  performance_impact:
    - query_modifications
    - algorithm_changes
    - caching_updates
    - resource_allocation_changes
  
  business_impact:
    - core_business_logic_changes
    - payment_processing_updates
    - user_workflow_modifications
    - reporting_changes

risk_based_assignment:
  high_risk:
    minimum_reviewers: 3
    specialist_approval_required: true
    compliance_review_mandatory: true
  
  critical_risk:
    minimum_reviewers: 4
    architect_approval_required: true
    qms_coordinator_approval_required: true
    extensive_testing_required: true
```

## Review Requirement Configurations

### Standard Review Requirements
```yaml
standard_requirements:
  minimum_approvals: 2
  dismiss_stale_reviews: true
  require_code_owner_reviews: true
  required_status_checks_strict: true
  enforce_admins: false
  allow_force_pushes: false
  allow_deletions: false

pr_review_settings:
  require_review_from_code_owners: true
  required_approving_review_count: 2
  dismiss_stale_reviews: true
  require_last_push_approval: true
  restrict_pushes: true
```

### Enhanced Requirements for Critical Changes
```yaml
critical_requirements:
  minimum_approvals: 4
  specialist_approvals: 2
  architect_approval: 1
  qms_coordinator_approval: 1
  security_approval_required: true
  performance_testing_required: true
  documentation_update_required: true
```

## Specialist Availability and Load Balancing

### Availability Tracking
```yaml
specialist_capacity:
  qms-code-reviewer:
    max_concurrent_reviews: 8
    estimated_review_time: "2 hours"
    expertise_areas: ["general-code", "business-logic", "api-design"]
    availability_schedule: "business-hours"
  
  qms-security-scanner:
    max_concurrent_reviews: 5
    estimated_review_time: "4 hours"
    expertise_areas: ["security", "authentication", "cryptography"]
    availability_schedule: "extended-hours"
  
  qms-dod-validator:
    max_concurrent_reviews: 6
    estimated_review_time: "3 hours"
    expertise_areas: ["testing", "documentation", "compliance"]
    availability_schedule: "business-hours"
  
  qms-testing-specialist:
    max_concurrent_reviews: 7
    estimated_review_time: "3 hours"
    expertise_areas: ["testing", "qa", "automation"]
    availability_schedule: "business-hours"
  
  qms-compliance-coordinator:
    max_concurrent_reviews: 4
    estimated_review_time: "5 hours"
    expertise_areas: ["compliance", "audit", "governance"]
    availability_schedule: "business-hours"
```

### Load Balancing Algorithm
```yaml
assignment_algorithm:
  primary_factors:
    - expertise_match_score: 40%
    - current_workload: 30%
    - availability_window: 20%
    - previous_context: 10%
  
  workload_calculation:
    - active_reviews * estimated_time_per_review
    - queue_depth * priority_weight
    - recent_completion_rate
  
  expertise_scoring:
    - direct_expertise_match: 10 points
    - related_expertise_match: 7 points
    - general_expertise_match: 5 points
    - no_expertise_match: 1 point
```

## Escalation and Override Procedures

### Automatic Escalation Triggers
```yaml
escalation_rules:
  time_based:
    - review_pending > 24_hours: notify_lead
    - review_pending > 48_hours: escalate_to_senior
    - review_pending > 72_hours: emergency_escalation
  
  complexity_based:
    - critical_complexity_detected: immediate_architect_notification
    - security_vulnerability_found: immediate_security_lead_escalation
    - compliance_violation_detected: immediate_qms_coordinator_escalation
  
  conflict_based:
    - reviewer_disagreement: escalate_to_lead
    - multiple_rejection_rounds: senior_mediation_required
    - bypass_request_conflicts: qms_coordinator_decision_required
```

### Override Authorization Levels
```yaml
override_permissions:
  level_1_bypass: # Non-critical checks
    authorized_roles: ["lead-devops", "lead-frontend", "lead-backend"]
    bypassable_checks: ["coding-standards", "documentation-format"]
    approval_requirement: "single_lead_approval"
  
  level_2_bypass: # Standard quality checks
    authorized_roles: ["core-architect", "qms-quality-coordinator"]
    bypassable_checks: ["test-coverage", "complexity-analysis"]
    approval_requirement: "architect_plus_qms_approval"
  
  level_3_bypass: # Security and compliance checks
    authorized_roles: ["qms-compliance-coordinator"]
    bypassable_checks: ["security-scan", "compliance-audit"]
    approval_requirement: "qms_coordinator_plus_security_lead_approval"
  
  emergency_bypass: # All checks (extreme circumstances)
    authorized_roles: ["roo-commander"]
    bypassable_checks: ["all"]
    approval_requirement: "commander_approval_plus_post_incident_review"
```

## Integration with GitHub API

### CODEOWNERS Integration
```yaml
codeowners_enhancement:
  pattern_matching: "enhanced"
  specialist_mapping: "automatic"
  fallback_assignments: "configured"
  
  specialist_codeowners:
    - pattern: "**/*security*/**"
      owners: ["@qms-security-scanner", "@lead-security"]
    - pattern: "**/api/**"
      owners: ["@qms-code-reviewer", "@lead-backend"]
    - pattern: "**/*.sql"
      owners: ["@qms-dod-validator", "@lead-db"]
    - pattern: "**/test/**"
      owners: ["@qms-testing-specialist", "@lead-qa"]
```

### Review Assignment API Workflow
```yaml
api_integration:
  trigger_events:
    - pull_request.opened
    - pull_request.synchronize
    - pull_request.ready_for_review
  
  assignment_workflow:
    1. analyze_pr_changes
    2. calculate_complexity_metrics
    3. determine_risk_factors
    4. match_specialist_expertise
    5. check_availability_and_load
    6. assign_primary_and_secondary_reviewers
    7. set_review_requirements
    8. notify_assigned_reviewers
    9. update_pr_labels_and_status
```

## Monitoring and Analytics

### Assignment Effectiveness Metrics
```yaml
metrics_tracking:
  assignment_accuracy:
    - expertise_match_success_rate
    - review_completion_time
    - defect_detection_rate
  
  load_distribution:
    - reviewer_workload_balance
    - queue_time_distribution
    - specialist_utilization_rates
  
  quality_outcomes:
    - defect_escape_rate_by_reviewer
    - review_thoroughness_score
    - developer_satisfaction_ratings
```

### Continuous Improvement Feedback Loop
```yaml
improvement_process:
  data_collection:
    - review_completion_metrics
    - defect_correlation_analysis
    - reviewer_feedback_surveys
  
  optimization_triggers:
    - assignment_accuracy < 85%
    - average_review_time > target_sla
    - specialist_overload_detected
  
  adjustment_mechanisms:
    - pattern_weight_updates
    - complexity_threshold_tuning
    - specialist_capacity_rebalancing
```

## Implementation Guidelines

### Phase 1: Basic Pattern Matching
- Implement file pattern-based assignment rules
- Configure basic review requirements
- Set up specialist capacity tracking

### Phase 2: Complexity Integration  
- Add code complexity analysis
- Implement risk-based assignment adjustments
- Enable automatic escalation triggers

### Phase 3: Machine Learning Enhancement
- Develop expertise scoring algorithms
- Implement predictive assignment optimization
- Add feedback-based continuous improvement

### Phase 4: Advanced Analytics
- Deploy comprehensive metrics dashboard
- Enable real-time assignment optimization
- Implement proactive capacity planning

This configuration ensures comprehensive QMS specialist coverage while maintaining development velocity through intelligent assignment and appropriate flexibility for different risk levels.