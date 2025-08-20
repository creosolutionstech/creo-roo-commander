+++
# --- Document Metadata ---
id = "qms-review-delegation-system-v1"
title = "QMS Review Delegation System v1.0"
context_type = "workflow"
scope = "QMS intelligent reviewer assignment and delegation management system"
target_audience = ["qms-coordinators", "development-teams", "devops", "architects"]
granularity = "detailed"
status = "active"
last_updated = "2025-08-16T22:23:00Z"
version = "1.0.0"

# --- QMS Integration ---
quality_gates_integration = true
automation_level = "high"
github_integration = true
compliance_tracking = true

# --- Related Documentation ---
related_docs = [
    ".ruru/docs/qms/workflows/4-step-qms-review-workflow-v1.md",
    ".ruru/docs/qms/github-integration/",
    ".ruru/modes/qms-code-reviewer/qms-code-reviewer.mode.md",
    ".ruru/modes/qms-security-scanner/qms-security-scanner.mode.md"
]
tags = ["qms", "review-delegation", "intelligent-assignment", "load-balancing", "escalation", "automation"]
+++

# QMS Review Delegation System v1.0

## Overview

The QMS Review Delegation System provides intelligent, automated assignment of code reviews to specialized QMS reviewers based on comprehensive analysis of code changes, reviewer expertise, workload distribution, and review priority. This system ensures that the right expertise is applied to each review while maintaining balanced workloads and meeting SLA requirements.

## System Architecture

### Core Components

1. **Code Change Analyzer**: Analyzes PR content to determine required expertise
2. **Reviewer Expertise Mapper**: Maintains expertise profiles for all QMS specialists
3. **Load Balancer**: Distributes review workload evenly across available reviewers
4. **Escalation Engine**: Handles unavailable reviewers and blocked reviews
5. **Notification System**: Manages reviewer notifications and reminders
6. **SLA Manager**: Tracks and enforces review timelines
7. **Phase Delegator**: Routes reviews through appropriate QMS phases

## Intelligent Reviewer Assignment Algorithm

### Code Change Analysis Matrix

The system analyzes PR changes against multiple dimensions to determine required expertise:

#### 1. File Pattern Analysis
```yaml
file_patterns:
  security_sensitive:
    - "**/*auth*/**"
    - "**/*security*/**"
    - "**/middleware/**"
    - "**/api/**"
    - "**/*crypto*/**"
    - "**/login/**"
    - "**/oauth/**"
    required_reviewers: ["qms-security-scanner", "qms-code-reviewer"]
    
  infrastructure:
    - "**/docker/**"
    - "**/k8s/**"
    - "**/terraform/**"
    - "**/ansible/**"
    - "**/.github/workflows/**"
    - "**/deployment/**"
    required_reviewers: ["lead-devops", "qms-code-reviewer"]
    
  data_layer:
    - "**/models/**"
    - "**/migrations/**"
    - "**/database/**"
    - "**/sql/**"
    - "**/schema/**"
    required_reviewers: ["lead-db", "qms-code-reviewer"]
    
  testing:
    - "**/test/**"
    - "**/spec/**"
    - "**/*test*"
    - "**/*spec*"
    required_reviewers: ["qms-testing-specialist", "qms-code-reviewer"]
    
  performance_critical:
    - "**/performance/**"
    - "**/optimization/**"
    - "**/cache/**"
    - "**/async/**"
    - "**/parallel/**"
    required_reviewers: ["util-performance", "qms-code-reviewer"]
```

#### 2. Code Complexity Assessment
```yaml
complexity_thresholds:
  lines_changed:
    low: "< 50 lines"
    medium: "50-200 lines"  
    high: "200-500 lines"
    critical: "> 500 lines"
    
  files_changed:
    low: "< 5 files"
    medium: "5-15 files"
    high: "15-30 files"
    critical: "> 30 files"
    
  cyclomatic_complexity:
    low: "< 10"
    medium: "10-20"
    high: "20-50"
    critical: "> 50"

reviewer_assignment_rules:
  low_complexity:
    required_reviewers: 1
    specialist_types: ["qms-code-reviewer"]
    
  medium_complexity:
    required_reviewers: 2
    specialist_types: ["qms-code-reviewer", "domain-specific"]
    
  high_complexity:
    required_reviewers: 2-3
    specialist_types: ["qms-code-reviewer", "domain-specific", "util-senior-dev"]
    
  critical_complexity:
    required_reviewers: 3+
    specialist_types: ["qms-code-reviewer", "domain-specific", "util-senior-dev", "core-architect"]
    escalation_required: true
```

#### 3. Language and Technology Detection
```yaml
language_expertise_map:
  javascript_typescript:
    file_patterns: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"]
    specialist_modes: ["dev-react", "framework-nextjs", "util-typescript"]
    
  python:
    file_patterns: ["**/*.py"]
    specialist_modes: ["dev-python", "framework-django", "framework-fastapi"]
    
  golang:
    file_patterns: ["**/*.go"]
    specialist_modes: ["dev-golang", "dev-golang-qms"]
    
  java:
    file_patterns: ["**/*.java"]
    specialist_modes: ["dev-java", "framework-spring"]
    
  rust:
    file_patterns: ["**/*.rs"]
    specialist_modes: ["dev-rust"]
    
  database:
    file_patterns: ["**/*.sql", "**/*migration*"]
    specialist_modes: ["data-mysql", "data-mongo", "data-neon"]
```

### Reviewer Expertise Mapping System

#### QMS Specialist Profiles
```yaml
qms_specialists:
  qms-code-reviewer:
    expertise_areas:
      - "general-code-review"
      - "quality-assessment"
      - "coding-standards"
      - "security-basics"
      - "performance-review"
    languages: ["all"]
    complexity_levels: ["low", "medium", "high", "critical"]
    review_types: ["dor", "progress", "dod", "final"]
    
  qms-security-scanner:
    expertise_areas:
      - "security-vulnerabilities"
      - "owasp-compliance"
      - "dependency-scanning"
      - "secure-coding"
      - "penetration-testing"
    languages: ["all"]
    complexity_levels: ["medium", "high", "critical"]
    review_types: ["dod", "final"]
    
  qms-testing-specialist:
    expertise_areas:
      - "test-coverage"
      - "test-automation"
      - "integration-testing"
      - "performance-testing"
    languages: ["all"]
    complexity_levels: ["medium", "high"]
    review_types: ["progress", "dod"]
    
  qms-dor-validator:
    expertise_areas:
      - "requirements-validation"
      - "design-review"
      - "architecture-assessment"
    languages: ["all"]
    complexity_levels: ["all"]
    review_types: ["dor"]
    
  qms-dod-validator:
    expertise_areas:
      - "completion-validation"
      - "acceptance-criteria"
      - "documentation-review"
    languages: ["all"]
    complexity_levels: ["all"]
    review_types: ["dod"]
```

## Load Balancing Mechanisms

### 1. Reviewer Availability Tracking
```yaml
availability_metrics:
  current_workload:
    active_reviews: "number of currently assigned reviews"
    pending_reviews: "number of reviews in queue"
    overdue_reviews: "number of reviews past SLA"
    
  capacity_limits:
    max_concurrent_reviews: 5
    max_daily_assignments: 10
    max_weekly_workload: 40
    
  availability_status:
    available: "ready for new assignments"
    busy: "at capacity but can take urgent reviews"
    unavailable: "out of office or blocked"
    
  historical_metrics:
    average_review_time: "hours to complete review"
    review_quality_score: "1-10 based on feedback"
    responsiveness_score: "time to first response"
```

### 2. Dynamic Load Distribution
```yaml
load_balancing_algorithm:
  primary_factors:
    - current_workload_percentage: 40%
    - expertise_match_score: 30%
    - historical_performance: 20%
    - availability_status: 10%
    
  assignment_rules:
    round_robin_base: "distribute evenly across available reviewers"
    expertise_weighted: "prefer specialists with higher expertise scores"
    workload_adjusted: "avoid overloading any single reviewer"
    performance_based: "favor reviewers with better historical metrics"
    
  escalation_triggers:
    all_specialists_unavailable: true
    workload_threshold_exceeded: 80%
    sla_risk_detected: true
    quality_requirements_unmet: true
```

## Escalation Procedures

### 1. Reviewer Unavailability Handling
```yaml
escalation_chain:
  level_1_unavailable:
    action: "assign to next best match specialist"
    timeout: "30 minutes"
    
  level_2_multiple_unavailable:
    action: "expand search to related expertise areas"
    notify: ["qms-quality-coordinator"]
    timeout: "1 hour"
    
  level_3_critical_shortage:
    action: "emergency assignment to senior reviewers"
    notify: ["qms-quality-coordinator", "core-architect"]
    escalate_to: ["util-senior-dev", "util-second-opinion"]
    timeout: "2 hours"
    
  level_4_system_failure:
    action: "manual assignment required"
    notify: ["roo-commander", "qms-quality-coordinator"]
    fallback: "human project manager intervention"
```

### 2. SLA Breach Prevention
```yaml
sla_monitoring:
  warning_thresholds:
    dor_review: "4 hours remaining"
    progress_review: "8 hours remaining"
    dod_review: "6 hours remaining"
    final_review: "12 hours remaining"
    
  escalation_actions:
    sla_warning:
      - notify_reviewer: "automated reminder"
      - notify_backup: "prepare secondary reviewer"
      
    sla_critical:
      - reassign_primary: "to available specialist"
      - parallel_review: "assign secondary reviewer"
      - notify_management: ["qms-quality-coordinator"]
      
    sla_breach:
      - emergency_assignment: "to senior reviewer"
      - bypass_procedures: "expedited review process"
      - incident_report: "document for retrospective"
```

## Notification and Reminder Systems

### 1. Automated Notifications
```yaml
notification_types:
  assignment_notifications:
    immediate: "new review assigned"
    digest: "daily assignment summary"
    
  deadline_reminders:
    24_hour_warning: "review due tomorrow"
    4_hour_warning: "review due in 4 hours"
    1_hour_critical: "review overdue soon"
    
  escalation_alerts:
    reviewer_unavailable: "assignment failed"
    sla_risk: "deadline at risk"
    quality_issue: "review quality concern"
    
  system_notifications:
    workload_alert: "approaching capacity"
    expertise_gap: "no suitable reviewer available"
    performance_concern: "reviewer performance issue"
```

### 2. Communication Channels
```yaml
notification_channels:
  github_integration:
    pr_comments: "review assignment notifications"
    review_requests: "formal GitHub review requests"
    status_updates: "review progress tracking"
    
  internal_systems:
    qms_dashboard: "review status updates"
    email_notifications: "deadline reminders"
    slack_integration: "real-time alerts"
    
  escalation_channels:
    management_alerts: "high-priority issues"
    emergency_contacts: "critical system failures"
```

## Review Priority and SLA Management

### 1. Priority Classification
```yaml
priority_levels:
  p0_critical:
    description: "security vulnerabilities, production fixes"
    sla_target: "2 hours"
    required_reviewers: 2+
    escalation_immediate: true
    
  p1_high:
    description: "feature releases, major changes"
    sla_target: "8 hours"
    required_reviewers: 2
    escalation_threshold: "6 hours"
    
  p2_normal:
    description: "regular development, bug fixes"
    sla_target: "24 hours"
    required_reviewers: 1-2
    escalation_threshold: "20 hours"
    
  p3_low:
    description: "documentation, refactoring"
    sla_target: "48 hours"
    required_reviewers: 1
    escalation_threshold: "40 hours"
```

### 2. SLA Enforcement
```yaml
sla_management:
  tracking_metrics:
    assignment_time: "time from PR creation to reviewer assignment"
    first_response_time: "time to initial reviewer feedback"
    completion_time: "time to review completion"
    total_cycle_time: "time from PR creation to merge approval"
    
  performance_targets:
    assignment_sla: "< 30 minutes"
    first_response_sla: "< 4 hours"
    completion_sla: "varies by priority level"
    quality_threshold: "> 8.0/10 average score"
```

## QMS Phase Delegation Patterns

### 1. Four-Step Review Process Integration
```yaml
phase_delegation:
  dor_validation:
    primary_specialist: "qms-dor-validator"
    supporting_specialists: ["qms-code-reviewer"]
    triggers: ["pr_opened", "requirements_ready"]
    
  progress_reviews:
    25_percent_checkpoint:
      specialists: ["qms-code-reviewer", "domain-expert"]
      focus: "architecture and foundation"
      
    50_percent_checkpoint:
      specialists: ["qms-code-reviewer", "qms-testing-specialist"]
      focus: "core implementation"
      
    75_percent_checkpoint:
      specialists: ["qms-code-reviewer", "qms-testing-specialist", "qms-security-scanner"]
      focus: "integration and testing"
      
  dod_validation:
    primary_specialist: "qms-dod-validator"
    supporting_specialists: ["qms-code-reviewer", "qms-testing-specialist"]
    triggers: ["implementation_complete", "tests_passing"]
    
  final_review:
    specialists: ["qms-code-reviewer", "qms-security-scanner", "qms-compliance-coordinator"]
    focus: "comprehensive compliance audit"
    triggers: ["dod_validated", "ready_for_production"]
```

### 2. Context-Aware Delegation
```yaml
delegation_context:
  pr_metadata:
    feature_flags: "affects delegation to feature specialists"
    breaking_changes: "requires senior reviewer approval"
    database_changes: "requires database specialist"
    api_changes: "requires API design review"
    
  project_context:
    release_timeline: "affects priority and SLA"
    compliance_requirements: "affects required specialist types"
    risk_assessment: "affects review depth and specialists"
    
  team_context:
    author_experience: "junior authors require more thorough review"
    previous_violations: "authors with history require additional scrutiny"
    domain_knowledge: "complex domains require specialist expertise"
```

## Implementation Details

### 1. GitHub Actions Integration
```yaml
github_workflows:
  reviewer_assignment:
    trigger: "pull_request.opened"
    steps:
      - analyze_changes: "determine required expertise"
      - check_availability: "find available specialists"
      - assign_reviewers: "create GitHub review requests"
      - notify_stakeholders: "send assignment notifications"
      
  sla_monitoring:
    trigger: "schedule.cron"
    frequency: "every 30 minutes"
    steps:
      - check_review_status: "scan all active reviews"
      - identify_at_risk: "find reviews approaching SLA"
      - send_reminders: "notify reviewers and managers"
      - escalate_overdue: "trigger escalation procedures"
```

### 2. Configuration Management
```yaml
configuration_files:
  specialist_profiles: ".ruru/docs/qms/config/specialist-profiles.yml"
  assignment_rules: ".ruru/docs/qms/config/assignment-rules.yml"
  sla_definitions: ".ruru/docs/qms/config/sla-definitions.yml"
  escalation_procedures: ".ruru/docs/qms/config/escalation-procedures.yml"
  notification_settings: ".ruru/docs/qms/config/notification-settings.yml"
```

## Monitoring and Analytics

### 1. Key Performance Indicators
```yaml
kpis:
  assignment_efficiency:
    - average_assignment_time
    - assignment_accuracy_rate
    - reviewer_satisfaction_score
    
  review_quality:
    - defect_detection_rate
    - false_positive_rate
    - review_completeness_score
    
  process_efficiency:
    - sla_compliance_rate
    - escalation_frequency
    - reviewer_utilization_rate
    
  system_performance:
    - algorithm_response_time
    - load_balancer_effectiveness
    - notification_delivery_success
```

### 2. Continuous Improvement
```yaml
improvement_mechanisms:
  feedback_collection:
    - post_review_surveys
    - reviewer_performance_metrics
    - author_satisfaction_scores
    
  algorithm_tuning:
    - machine_learning_insights
    - pattern_recognition_updates
    - assignment_rule_optimization
    
  process_optimization:
    - bottleneck_identification
    - workflow_streamlining
    - automation_enhancement
```

## Migration and Rollout Strategy

### 1. Phased Implementation
```yaml
rollout_phases:
  phase_1_pilot:
    scope: "single team, low-risk changes"
    duration: "2 weeks"
    focus: "basic assignment algorithm"
    
  phase_2_expansion:
    scope: "multiple teams, medium complexity"
    duration: "4 weeks" 
    focus: "load balancing and escalation"
    
  phase_3_full_deployment:
    scope: "all teams, all change types"
    duration: "ongoing"
    focus: "advanced features and optimization"
```

### 2. Success Criteria
```yaml
success_metrics:
  assignment_success_rate: "> 95%"
  sla_compliance_rate: "> 90%"
  reviewer_satisfaction: "> 8.0/10"
  system_availability: "> 99.5%"
  false_assignment_rate: "< 5%"
```

## Related Documentation

- [4-Step QMS Review Workflow](./4-step-qms-review-workflow-v1.md)
- [GitHub PR Integration Framework](../github-integration/)
- [QMS Specialist Mode Definitions](../../modes/qms-*)
- [Review Templates and Checklists](../../templates/toml-md/27_qms_code_review.md)

---

**Document Version**: v1.0.0  
**Last Updated**: 2025-08-16T22:23:00Z  
**Next Review Date**: 2025-09-16  
**Owner**: DevOps Lead  
**Approvers**: QMS Quality Coordinator, Technical Architect