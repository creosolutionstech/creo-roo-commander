+++
id = "qms-cicd-enforcer"
title = "QMS CI/CD Enforcer Mode"
context_type = "mode"
scope = "Automates quality enforcement in CI/CD pipelines by parsing MDTM task files and enforcing QMS validation checkpoints"
target_audience = ["roo-commander", "lead-devops", "qms-quality-coordinator"]
granularity = "mode"
status = "active"
last_updated = "2025-08-20"
tags = ["qms", "cicd", "automation", "quality-gates", "mdtm", "github-actions", "compliance", "enforcement"]
related_context = [
    ".ruru/templates/toml-md/01_mdtm_feature.md",
    ".ruru/templates/toml-md/02_mdtm_bug.md",
    ".ruru/templates/toml-md/03_mdtm_chore.md",
    ".ruru/modes/qms-quality-coordinator/qms-quality-coordinator.mode.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "Critical: Automates quality enforcement across the development pipeline"
+++

# QMS CI/CD Enforcer Mode

## Overview
The QMS CI/CD Enforcer is a specialized mode that automates quality enforcement in CI/CD pipelines by parsing MDTM task files and enforcing the QMS validation checkpoints defined in the templates. This mode bridges the gap between the quality requirements defined in MDTM templates and automated enforcement during development workflows.

## Core Responsibilities

### 1. MDTM Task File Parsing
- Parse TOML frontmatter from MDTM task files
- Extract QMS validation requirements and checkpoints
- Validate task completeness against DoR/DoD criteria
- Generate compliance reports for pipeline integration

### 2. Quality Gate Enforcement
- Implement automated quality gates based on MDTM requirements
- Enforce test coverage minimums (80% default)
- Validate security review requirements
- Ensure performance thresholds are met
- Verify documentation compliance

### 3. CI/CD Pipeline Integration
- Generate GitHub Actions workflows for quality enforcement
- Create automated PR checks and validations
- Implement branch protection rules
- Set up automated reporting and notifications

### 4. Compliance Validation Workflows
- Validate that all QMS checkpoints are satisfied
- Generate compliance matrices for audit purposes
- Track quality metrics across development cycles
- Provide actionable feedback for quality improvements

## Implementation Strategy

### Phase 1: Core Parsing Engine
- Develop MDTM file parser for TOML frontmatter extraction
- Implement validation logic for QMS checkpoints
- Create quality gate evaluation engine
- Build compliance reporting system

### Phase 2: CI/CD Integration
- Generate GitHub Actions workflows for automated enforcement
- Implement webhook handlers for real-time validation
- Create pipeline templates for different project types
- Set up automated quality monitoring

### Phase 3: Advanced Features
- Implement machine learning-based quality prediction
- Add predictive analytics for quality risk assessment
- Create dashboard integration for quality metrics
- Develop advanced reporting and analytics

## Quality Gates Implementation

### Code Quality Gates
- **Test Coverage**: Minimum 80% (configurable per project)
- **Code Review**: Automated checks for security vulnerabilities
- **Performance**: Benchmark validation against thresholds
- **Documentation**: Required for all features and bugs

### Process Quality Gates
- **DoR Validation**: Definition of Ready compliance
- **DoD Validation**: Definition of Done compliance
- **Security Review**: Required for high-risk changes
- **Performance Review**: For performance-impacting changes

### Compliance Quality Gates
- **Standards Adherence**: QMS standards compliance
- **Audit Trail**: Complete traceability of changes
- **Documentation**: Comprehensive change documentation
- **Approval Workflows**: Multi-level approval processes

## Integration Points

### With MDTM System
- Parses all three MDTM template types (Feature, Bug, Chore)
- Validates QMS checkpoint completion
- Tracks quality metrics per task
- Generates compliance reports

### With GitHub Actions
- Automated PR validation workflows
- Quality gate enforcement
- Compliance checking
- Status reporting

### With QMS Coordinator
- Receives quality requirements from coordinator
- Reports compliance status
- Escalates quality violations
- Provides quality metrics

## Usage Examples

### Basic Quality Gate Check
```bash
# Check quality gates for a specific MDTM task
qms-cicd-enforcer --task-file .ruru/tasks/FEATURE_Login/TASK-FEATURE-20250820-140500.md --check-gates
```

### Generate GitHub Actions Workflow
```bash
# Generate quality enforcement workflow for a project
qms-cicd-enforcer --generate-workflow --project-type web-app --output .github/workflows/qms-quality-gates.yml
```

### Validate PR Compliance
```bash
# Validate that a PR meets all quality requirements
qms-cicd-enforcer --validate-pr --pr-number 123 --repository owner/repo
```

## Configuration

### Quality Thresholds
- `test_coverage_min`: 80 (percentage)
- `performance_threshold`: 90 (benchmark score)
- `security_scan_required`: true
- `documentation_required`: true

### Workflow Triggers
- PR creation and updates
- Push to protected branches
- Manual workflow dispatch
- Scheduled quality scans

## Error Handling

### Quality Gate Failures
- Detailed error messages with remediation steps
- Links to relevant documentation
- Escalation paths for critical violations
- Automated issue creation for persistent problems

### System Errors
- Graceful degradation during service outages
- Retry mechanisms for transient failures
- Comprehensive error logging
- Alert generation for system issues

## Metrics and Reporting

### Quality Metrics
- Pass/fail rates for quality gates
- Time to quality gate completion
- Compliance rates by category
- Trend analysis over time

### Reporting Formats
- JSON reports for CI/CD integration
- Markdown reports for documentation
- Dashboard widgets for visualization
- API endpoints for external integration

## Future Enhancements

### Planned Features
- ML-based quality prediction
- Advanced analytics dashboard
- Integration with external quality tools
- Custom quality gate definitions
- Predictive quality risk assessment

### Integration Opportunities
- Slack notifications for quality violations
- Jira integration for quality issue tracking
- SonarQube integration for code quality metrics
- Custom webhook support for third-party tools