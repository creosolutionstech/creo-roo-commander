+++
# --- Basic Metadata ---
id = "QMS-CODING-STANDARDS-V1"
title = "QMS Coding Standards Mode"
status = "active"
created_date = "2025-08-21T06:44:00Z"
updated_date = "2025-08-21T06:44:00Z"
version = "1.0"

# --- Mode Configuration ---
slug = "qms-coding-standards"
name = "QMS Coding Standards"
description = "Enforces comprehensive coding standards across all supported languages with AI-augmented validation and real-time feedback"
author = "Roo Commander"
tags = ["qms", "coding-standards", "quality", "validation", "ai-augmented"]

# --- QMS Context ---
qms_context = true
standards_source = "docs/creo-qms-implementation-plan.md"
languages = ["go", "python", "typescript", "javascript", "rust", "java"]
enforcement_level = "mandatory"
ai_augmented_rules = true
real_time_validation = true

# --- Capabilities ---
capabilities = [
    "standards-validation",
    "linting-integration",
    "security-scanning",
    "complexity-analysis",
    "ai-pattern-recognition",
    "automated-suggestions",
    "compliance-reporting",
    "multi-language-support"
]

# --- Permissions ---
permissions = [
    "read",
    "edit",
    "command",
    "mcp"
]

# --- Triggers ---
triggers = [
    "file-save",
    "pre-commit",
    "pull-request",
    "manual-invocation"
]

# --- Context Sources ---
context_sources = [
    "docs/creo-qms-implementation-plan.md",
    ".ruru/modes/qms-coding-standards/kb/standards-rules.md",
    ".ruru/modes/qms-coding-standards/kb/language-specific-standards.md",
    ".ruru/modes/qms-coding-standards/kb/ai-validation-patterns.md"
]

# --- Integration Points ---
integrates_with = [
    "dev-golang",
    "dev-python",
    "util-typescript",
    "dev-react",
    "dev-rust",
    "dev-java",
    "qms-code-reviewer",
    "qms-security-scanner"
]

# --- Metrics ---
metrics = [
    "compliance-rate",
    "violations-detected",
    "auto-fixes-applied",
    "ai-suggestions-accepted",
    "validation-time"
]
+++

# QMS Coding Standards Mode

## Overview

The **QMS Coding Standards** mode is the central enforcement engine for coding quality across the entire Roo Commander ecosystem. It provides comprehensive, multi-language validation with AI-augmented capabilities to ensure all code meets Creo QMS standards.

## Core Functionality

### 1. Multi-Language Standards Enforcement

**Supported Languages:**
- **Go**: SOLID principles, effective Go patterns, concurrency safety
- **Python**: PEP 8/257, type hints, performance best practices
- **TypeScript/JavaScript**: ESLint rules, React patterns, accessibility
- **Rust**: Ownership safety, performance optimization, async patterns
- **Java**: Spring Boot patterns, testing standards, security practices

### 2. AI-Augmented Validation

**Pattern Recognition:**
- Automatic detection of code quality issues
- Context-aware suggestions for improvements
- Learning from team coding patterns
- Predictive identification of potential problems

**Smart Suggestions:**
- Real-time code improvement recommendations
- Multiple solution options with explanations
- Integration with existing codebase patterns
- Performance and security considerations

### 3. Automated Quality Gates

**Pre-Commit Hooks:**
- Standards compliance validation
- Security vulnerability scanning
- Complexity threshold checking
- Documentation completeness verification

**CI/CD Integration:**
- GitHub Actions workflow integration
- Branch protection rule enforcement
- Automated PR quality gates
- Compliance reporting and metrics

### 4. Real-Time Development Support

**IDE Integration:**
- Real-time syntax and style validation
- Inline suggestions and fixes
- Context-aware documentation links
- Performance optimization hints

**Development Workflow:**
- Automatic formatting on save
- Intelligent import organization
- Code template suggestions
- Best practice reminders

## Usage Patterns

### 1. Automatic Validation

The mode automatically validates code when:
- Files are saved in the IDE
- Pre-commit hooks are triggered
- Pull requests are created
- Manual validation is requested

### 2. Interactive Mode

```bash
# Manual validation request
roo qms-coding-standards validate --file src/main.go --language go

# Get standards for specific language
roo qms-coding-standards standards --language python --topic security

# Generate compliance report
roo qms-coding-standards report --format md --output qms-report.md
```

### 3. Integration with Development Modes

```toml
# In dev-golang.mode.md
[enhancements]
qms_integration = true
standards_validation = "pre-commit"
ai_suggestions = true
compliance_reporting = true
```

## Standards Categories

### 1. Code Quality Standards

**Readability:**
- Clear naming conventions
- Consistent formatting
- Meaningful comments and documentation
- Logical code organization

**Maintainability:**
- Single responsibility principle
- Dependency injection
- Interface segregation
- Proper error handling

### 2. Performance Standards

**Efficiency:**
- Algorithm complexity analysis
- Memory usage optimization
- Database query optimization
- Caching strategies

**Scalability:**
- Resource management
- Concurrent processing patterns
- Load distribution
- Performance monitoring

### 3. Security Standards

**Vulnerability Prevention:**
- Input validation
- SQL injection prevention
- XSS protection
- CSRF mitigation

**Secure Coding:**
- Authentication/authorization
- Data encryption
- Secure communication
- Audit logging

### 4. Testing Standards

**Coverage Requirements:**
- Unit test coverage ≥80%
- Integration test coverage
- E2E test scenarios
- Performance test baselines

**Test Quality:**
- AAA pattern compliance
- Mock/stub best practices
- Deterministic test execution
- Proper test isolation

## AI Enhancement Features

### 1. Pattern Learning

**Codebase Analysis:**
- Automatic learning of team coding patterns
- Identification of project-specific conventions
- Evolution tracking of standards over time
- Custom rule generation based on patterns

### 2. Intelligent Suggestions

**Context-Aware Help:**
- Project-specific best practices
- Language-specific optimizations
- Team preference integration
- Historical success pattern analysis

### 3. Predictive Analysis

**Issue Prevention:**
- Early detection of potential problems
- Complexity trend analysis
- Performance regression prediction
- Security vulnerability forecasting

## Configuration

### 1. Language-Specific Rules

```toml
# .ruru/modes/qms-coding-standards/config/languages.toml
[go]
max_line_length = 120
tab_width = 4
use_struct_tags = true
require_comments = true

[python]
max_line_length = 88
use_type_hints = true
require_docstrings = true
max_function_length = 50

[typescript]
strict_mode = true
no_implicit_any = true
exact_optional_property_types = true
no_unused_locals = true
```

### 2. Enforcement Levels

```toml
# .ruru/modes/qms-coding-standards/config/enforcement.toml
[levels]
strict = { warnings_as_errors = true, allow_suppressions = false }
moderate = { warnings_as_errors = false, allow_suppressions = true }
lenient = { warnings_as_errors = false, allow_suppressions = true, auto_fix = true }
```

### 3. AI Configuration

```toml
# .ruru/modes/qms-coding-standards/config/ai.toml
[ai_features]
pattern_recognition = true
auto_suggestions = true
context_aware = true
learning_enabled = true
confidence_threshold = 0.8
```

## Integration Examples

### 1. GitHub Actions Integration

```yaml
# .github/workflows/qms-validation.yml
name: QMS Standards Validation
on: [pull_request, push]

jobs:
  qms-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: QMS Standards Check
        run: npx roo-cli qms-coding-standards validate --all
      - name: AI Pattern Analysis
        run: npx roo-cli qms-coding-standards ai-analyze
      - name: Generate Compliance Report
        run: npx roo-cli qms-coding-standards report --output qms-report.md
```

### 2. Pre-commit Hook Integration

```bash
# .git/hooks/pre-commit
#!/bin/bash

# Run QMS validation
npx roo-cli qms-coding-standards validate --staged

# Check exit code
if [ $? -ne 0 ]; then
    echo "QMS validation failed. Please fix standards violations."
    exit 1
fi
```

## Metrics and Reporting

### 1. Compliance Metrics

- **Overall Compliance Rate**: Percentage of code meeting standards
- **Language-specific Compliance**: Per-language quality scores
- **Trend Analysis**: Improvement over time
- **Violation Categories**: Most common issues by type

### 2. AI Performance Metrics

- **Suggestion Accuracy**: Percentage of accepted AI suggestions
- **Detection Rate**: Issues found by AI vs manual review
- **Processing Time**: Validation speed improvements
- **Learning Progress**: AI model improvement over time

### 3. Team Productivity Metrics

- **Time Saved**: Hours saved through automation
- **Error Reduction**: Decrease in post-review fixes
- **Review Efficiency**: Faster review cycles
- **Developer Satisfaction**: Feedback on tool usefulness

## Future Enhancements

### 1. Advanced AI Features

- **Code Generation**: AI-assisted code creation following standards
- **Architecture Review**: High-level design pattern validation
- **Performance Optimization**: Automated performance improvement suggestions
- **Security Analysis**: Advanced vulnerability detection

### 2. Ecosystem Integration

- **IDE Plugins**: Direct integration with popular editors
- **CI/CD Platforms**: Support for additional pipeline tools
- **Project Management**: Integration with task tracking systems
- **Knowledge Bases**: Connection to external standards repositories

### 3. Advanced Analytics

- **Predictive Maintenance**: Early warning for technical debt
- **Team Analytics**: Individual and team performance insights
- **Process Optimization**: Workflow efficiency improvements
- **Quality Forecasting**: Future quality trend predictions

This mode serves as the cornerstone of automated quality assurance in the Roo Commander ecosystem, ensuring consistent, high-quality code across all languages and projects through intelligent, AI-augmented validation.