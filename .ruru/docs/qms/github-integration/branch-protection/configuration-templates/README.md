# QMS Branch Protection Configuration Templates

This directory contains comprehensive templates and tools for implementing QMS (Quality Management System) branch protection integration with GitHub repositories.

## Overview

The QMS Branch Protection system provides automated quality gates, intelligent reviewer assignment, and comprehensive compliance auditing for GitHub repositories. It transforms manual quality review processes into intelligent, automated systems while maintaining enterprise-grade quality standards.

## Directory Structure

```
configuration-templates/
├── README.md                              # This file
├── repository-qms-config.yml             # Main repository configuration template
├── github-workflows/
│   └── qms-status-orchestrator.yml       # GitHub Actions workflow for QMS checks
├── scripts/
│   └── setup-branch-protection.sh        # Automated deployment script
└── status-checks/
    └── qms-status-service-config.json    # Status check service configuration
```

## Configuration Files

### 1. Repository QMS Configuration (`repository-qms-config.yml`)

**Purpose**: Main configuration file that defines QMS settings for a specific repository.

**Key Features**:
- Repository tier classification (mission_critical, business_critical, standard, experimental)
- Branch protection rules with tier-appropriate settings
- Status check requirements and contexts
- Review requirements and approval thresholds
- Emergency bypass procedures and contacts
- Specialist reviewer assignment rules

**Usage**:
```yaml
# Copy to repository root as .qms/branch-protection.yml
repository:
  tier: "business_critical"  # Adjust based on repository importance
  
branch_protection:
  enabled: true
  required_status_checks:
    contexts:
      - "qms/dor-validation"
      - "qms/security-scan-critical" 
      - "qms/code-quality-gate"
      - "qms/compliance-audit"
      - "qms/dod-validation"
```

### 2. GitHub Actions Workflow (`qms-status-orchestrator.yml`)

**Purpose**: Comprehensive GitHub Actions workflow that executes all QMS quality checks.

**Key Features**:
- **18 QMS Status Checks**: DoR validation, security scanning, code quality, compliance audit, DoD validation
- **Intelligent Review Assignment**: Automatic specialist assignment based on file changes
- **Repository Tier Awareness**: Adjusts check strictness based on repository classification  
- **Emergency Bypass Support**: Detects and processes bypass requests
- **Comprehensive Reporting**: Detailed status updates and PR summary comments

**Status Checks Implemented**:
1. **Definition of Ready (DoR) Validation**
   - PR title format validation
   - Description presence and quality
   - Critical file change analysis

2. **Security Scanning (Critical)**
   - Secrets detection with gitleaks
   - Dependency vulnerability scanning
   - Critical security issue identification

3. **Code Quality Gate**
   - Test coverage validation
   - ESLint error checking
   - Pylint score validation
   - Code formatting standards

4. **Compliance Audit**
   - Commit message format validation
   - Required file presence checking
   - License compliance verification

5. **Definition of Done (DoD) Validation**
   - All prerequisite checks passed
   - Required reviewer approvals
   - No pending change requests
   - Branch synchronization status

### 3. Deployment Script (`setup-branch-protection.sh`)

**Purpose**: Automated script for applying QMS branch protection rules to GitHub repositories.

**Key Features**:
- **OS-Aware**: Works on Linux, macOS, and Windows (with WSL)
- **Dependency Checking**: Validates required tools (gh, yq, jq)
- **Configuration Validation**: Comprehensive YAML and field validation
- **Dry-Run Support**: Preview changes without applying them
- **Comprehensive Logging**: Detailed operation logs and documentation generation
- **Error Handling**: Robust error detection and recovery

**Usage Examples**:
```bash
# Basic setup
./setup-branch-protection.sh myorg/myrepo

# With custom configuration
./setup-branch-protection.sh --config custom-config.yml myorg/myrepo

# Dry run to preview changes
./setup-branch-protection.sh --dry-run --verbose myorg/myrepo

# Force override existing protection
./setup-branch-protection.sh --force --branch main myorg/myrepo
```

### 4. Status Check Service Configuration (`qms-status-service-config.json`)

**Purpose**: Configuration for the QMS status check service that processes webhook events and executes quality validations.

**Key Features**:
- **8 Comprehensive Status Checks**: From DoR validation to accessibility audits
- **Repository Tier Support**: Different timeout and retry settings per tier
- **Webhook Integration**: GitHub event processing with retry logic
- **Bypass Procedures**: 4-level authorization system for emergency situations
- **Monitoring & Alerting**: Prometheus metrics and alerting configuration
- **Caching & Performance**: Redis caching and connection pooling

**Status Check Types**:
- `qms/dor-validation`: Definition of Ready validation
- `qms/security-scan-critical`: Critical security vulnerability scanning
- `qms/security-scan-high`: High-priority security issue detection
- `qms/code-quality-gate`: Code quality metrics and standards validation
- `qms/compliance-audit`: Regulatory and internal compliance checking
- `qms/dod-validation`: Definition of Done validation
- `qms/performance-baseline`: Performance regression testing
- `qms/accessibility-audit`: WCAG compliance validation

## Repository Tier System

The QMS system classifies repositories into four tiers with increasing protection levels:

### Mission Critical
- **Use Case**: Core platform services, payment systems, security infrastructure
- **Required Checks**: All 6 core QMS checks required
- **Review Requirements**: 3 required approvals
- **Timeout**: 30 minutes per check
- **Bypass Authorization**: QMS Coordinator + Technical Architect only

### Business Critical  
- **Use Case**: Customer-facing applications, data processing systems
- **Required Checks**: 5 core QMS checks (performance optional)
- **Review Requirements**: 2 required approvals
- **Timeout**: 20 minutes per check
- **Bypass Authorization**: Leads + Coordinators + Technical Architect

### Standard
- **Use Case**: Internal tools, documentation, supporting services
- **Required Checks**: 4 core QMS checks (compliance optional)
- **Review Requirements**: 2 required approvals  
- **Timeout**: 15 minutes per check
- **Bypass Authorization**: All leads and above

### Experimental
- **Use Case**: Prototypes, research projects, sandbox environments
- **Required Checks**: 2 basic QMS checks (DoR + quality)
- **Review Requirements**: 1 required approval
- **Timeout**: 10 minutes per check
- **Bypass Authorization**: Senior developers and above

## Implementation Guide

### Phase 1: Repository Assessment
1. **Classify Repository Tier**: Determine appropriate tier based on business criticality
2. **Review Current Protection**: Document existing branch protection rules
3. **Identify Stakeholders**: Map required reviewers and specialists
4. **Plan Migration Strategy**: Define rollout timeline and rollback procedures

### Phase 2: Configuration Setup
1. **Copy Configuration Template**: Customize `repository-qms-config.yml` for your repository
2. **Configure GitHub Workflow**: Add `qms-status-orchestrator.yml` to `.github/workflows/`
3. **Set Up Service Configuration**: Deploy status check service with appropriate config
4. **Configure Webhooks**: Set up GitHub webhook integration

### Phase 3: Deployment
1. **Run Setup Script**: Use `setup-branch-protection.sh` to apply protection rules
2. **Verify Configuration**: Test with sample PR to ensure all checks execute
3. **Train Team**: Educate developers on new workflow requirements
4. **Monitor Performance**: Watch for check failures and performance issues

### Phase 4: Optimization
1. **Analyze Metrics**: Review check success rates and performance data
2. **Adjust Thresholds**: Fine-tune quality gates based on team feedback
3. **Update Specialist Assignment**: Refine reviewer assignment rules
4. **Scale Configuration**: Extend to additional repositories

## Emergency Procedures

### Bypass Request Process
1. **Level 1 (Lead)**: 2-hour bypass for urgent fixes
2. **Level 2 (Technical Architect)**: 8-hour bypass for critical issues
3. **Level 3 (QMS Coordinator)**: 24-hour bypass for planned maintenance
4. **Emergency (Roo Commander)**: 4-hour auto-approved bypass with mandatory post-mortem

### Bypass Request Format
```
@qms-bypass level:2 duration:4h
Justification: Critical security patch for CVE-2024-XXXX
Rollback plan: Automated rollback via infrastructure pipeline
Contact: @security-lead
```

## Troubleshooting

### Common Issues

**Status Checks Not Appearing**
- Verify GitHub Actions workflow is properly configured
- Check webhook connectivity to QMS service
- Ensure required contexts match exactly

**Check Timeouts**
- Review repository tier timeout settings
- Check external service dependencies (scanning tools)
- Verify network connectivity and rate limits

**False Positive Failures** 
- Adjust quality thresholds in service configuration
- Review file change patterns for reviewer assignment
- Update exclusion patterns for generated files

**Performance Issues**
- Enable caching in service configuration
- Implement batch processing for multiple PRs
- Consider parallel execution of independent checks

### Monitoring & Alerting

The QMS system provides comprehensive monitoring through:
- **Prometheus Metrics**: Check success rates, execution times, error rates
- **Slack Notifications**: Real-time alerts for system issues
- **PagerDuty Integration**: Critical failure escalation
- **Dashboard Views**: Grafana dashboards for trend analysis

### Support Channels

- **Documentation**: Internal QMS knowledge base
- **Slack**: `#qms-support` for questions and issues  
- **Email**: `qms-coordinators@company.com` for escalations
- **On-Call**: PagerDuty rotation for critical issues

## Customization Options

### Adding Custom Status Checks
1. Define check in `qms-status-service-config.json`
2. Implement check logic in QMS service
3. Add check context to repository configuration
4. Update GitHub workflow to handle new check

### Modifying Quality Thresholds
1. Update parameters in status check configuration
2. Test thresholds with sample repositories
3. Deploy updated configuration to service
4. Monitor impact on development velocity

### Extending Specialist Assignment
1. Add new assignment rules to repository config
2. Define file patterns and specialist mappings
3. Update GitHub workflow reviewer logic
4. Test assignment accuracy with historical PRs

## Best Practices

### Repository Configuration
- Start with less strict tier and gradually increase
- Regularly review and update quality thresholds
- Maintain clear bypass procedures and contacts
- Document tier-specific requirements and expectations

### Team Adoption
- Provide comprehensive training on new workflows
- Create clear documentation for common scenarios
- Establish feedback channels for continuous improvement
- Recognize and reward quality improvements

### System Maintenance  
- Regular monitoring of check performance and accuracy
- Periodic review of specialist assignment effectiveness
- Continuous updates to security scanning tools and rules
- Proactive capacity planning for system scaling

## Related Documentation

- [QMS Emergency Bypass Procedures v1.0](../qms-emergency-bypass-procedures-v1.md)
- [QMS Branch Protection Integration Framework v1.0](../qms-branch-protection-integration-framework-v1.md)
- [QMS Status Checks Specification v1.0](../qms-status-checks-specification-v1.md)
- [QMS Review Assignment Configuration v1.0](../qms-review-assignment-configuration-v1.md)
- [QMS Merge Restriction Policies v1.0](../qms-merge-restriction-policies-v1.md)

---

**Version**: 1.0  
**Last Updated**: 2025-08-17  
**Maintainer**: DevOps Lead  
**Review Cycle**: Quarterly