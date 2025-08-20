+++
id = "qms-coding-standards-overview"
title = "QMS Coding Standards Overview"
context_type = "knowledge_base"
scope = "Comprehensive guide to QMS coding standards implementation"
target_audience = ["qms-coding-standards", "dev-*", "qms-code-reviewer"]
granularity = "comprehensive"
status = "active"
last_updated = "2025-08-20"
version = "1.0"
tags = ["qms", "coding-standards", "implementation-guide", "best-practices", "compliance"]
related_context = [
    ".ruru/modes/qms-coding-standards/qms-coding-standards.mode.md",
    "docs/creo-qms-implementation-plan.md"
]
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
relevance = "High: Essential reference for QMS coding standards enforcement"
+++

# QMS Coding Standards Overview

## Purpose

This knowledge base provides comprehensive guidance for implementing and enforcing coding standards within the QMS framework. It serves as the central reference for all coding standards compliance activities across all supported programming languages.

## Core Principles

### 1. Language-Agnostic Standards
- **Readability**: Code must be self-documenting and easy to understand
- **Maintainability**: Code structure should facilitate future modifications
- **Performance**: Efficient use of language constructs and resources
- **Security**: Adherence to secure coding practices
- **Testability**: Code should be designed for comprehensive testing

### 2. Quality Gates Integration
- **Pre-commit Validation**: Automated checks before code commits
- **Pull Request Reviews**: Mandatory standards compliance verification
- **Continuous Integration**: Automated testing of standards compliance
- **Quality Metrics**: Trackable compliance metrics and trends

### 3. Progressive Enforcement
- **Education First**: Provide guidance and examples for violations
- **Automated Fixes**: Apply automatic formatting and corrections where possible
- **Mandatory Compliance**: Block non-compliant code from merging
- **Continuous Improvement**: Regular updates to standards based on learnings

## Language-Specific Standards

### Go Standards

#### 1. Code Organization
```go
// ✅ GOOD: Clear package structure
package main

import (
    "fmt"
    "time"
)

// ✅ GOOD: Single responsibility function
func processUser(userID int) error {
    // Implementation
}

// ❌ BAD: Large function with multiple responsibilities
func doEverything(userID int) error {
    // Multiple unrelated operations
}
```

#### 2. Error Handling
```go
// ✅ GOOD: Explicit error handling
func validateUser(userID int) error {
    if userID <= 0 {
        return fmt.Errorf("invalid user ID: %d", userID)
    }
    return nil
}

// ❌ BAD: Silent failure
func validateUser(userID int) bool {
    return userID > 0 // No error context
}
```

#### 3. Naming Conventions
- **Packages**: lowercase, single word (e.g., `http`, `json`)
- **Functions**: PascalCase for exported, camelCase for unexported
- **Variables**: descriptive names, avoid abbreviations
- **Constants**: ALL_CAPS with underscores

### Python Standards

#### 1. PEP 8 Compliance
```python
# ✅ GOOD: Proper spacing and naming
def calculate_total(items):
    """Calculate total value of items."""
    total = 0
    for item in items:
        total += item.price
    return total

# ❌ BAD: Poor formatting and naming
def calc_tot(itms):
    tot=0
    for i in itms:tot+=i.price
    return tot
```

#### 2. Type Hints
```python
# ✅ GOOD: Full type annotations
from typing import List, Dict, Optional

def process_users(users: List[Dict[str, any]]) -> Optional[str]:
    """Process list of users and return result."""
    if not users:
        return None
    return f"Processed {len(users)} users"

# ❌ BAD: No type hints
def process_users(users):
    if not users:
        return None
    return f"Processed {len(users)} users"
```

### TypeScript Standards

#### 1. Type Safety
```typescript
// ✅ GOOD: Strict typing
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // Implementation
    return { ...userData, id: 1, createdAt: new Date() };
}

// ❌ BAD: Any types and loose typing
async function createUser(userData: any): Promise<any> {
    return { ...userData, id: 1, createdAt: new Date() };
}
```

#### 2. React Component Patterns
```typescript
// ✅ GOOD: Functional component with proper typing
interface Props {
    user: User;
    onUpdate: (user: User) => void;
}

const UserProfile: React.FC<Props> = ({ user, onUpdate }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <button onClick={() => onUpdate(user)}>
                Update
            </button>
        </div>
    );
};

// ❌ BAD: Class component, any types
class UserProfile extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.user.name}</h2>
                <button onClick={this.props.onUpdate}>
                    Update
                </button>
            </div>
        );
    }
}
```

## Static Analysis Tools

### Tool Configuration

#### 1. Go - golangci-lint
```yaml
# .golangci.yml
run:
  timeout: 5m
  modules-download-mode: readonly

linters-settings:
  gofmt:
    simplify: true
  goimports:
    local-prefixes: github.com/your-org
  govet:
    check-shadowing: true
  revive:
    min-confidence: 0.8
    rules:
      - name: atomic
      - name: line-length-limit
        arguments: [120]
```

#### 2. Python - flake8
```ini
# .flake8
[flake8]
max-line-length = 88
max-complexity = 10
ignore =
    E203,  # whitespace before ':'
    E501,  # line too long
    W503,  # line break before binary operator
exclude =
    .git,
    __pycache__,
    .venv,
    build,
    dist
per-file-ignores =
    __init__.py:F401
```

#### 3. TypeScript - ESLint
```json
// .eslintrc.json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "@typescript-eslint/recommended-requiring-type-checking"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-non-null-assertion": "error"
    }
}
```

## Quality Metrics

### 1. Standards Compliance Rate
- **Calculation**: (Standards-compliant files / Total files) × 100
- **Target**: >95% for existing code, 100% for new code
- **Reporting**: Daily compliance dashboard updates

### 2. Violation Trends
- **Tracking**: Types and frequency of standards violations
- **Analysis**: Identify patterns and recurring issues
- **Action**: Targeted training and automation improvements

### 3. Review Efficiency
- **Metric**: Average time to resolve standards violations
- **Target**: <30 minutes per violation for automated fixes
- **Improvement**: Focus on tools and automation to reduce manual effort

## Automated Enforcement

### Pre-commit Hooks
```bash
#!/bin/bash
# pre-commit hook for standards validation

# Run language-specific linters
if [ -f "go.mod" ]; then
    golangci-lint run
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
    flake8 .
    black --check .
    isort --check-only .
elif [ -f "tsconfig.json" ]; then
    npx eslint . --ext .ts,.tsx
    npx prettier --check .
fi

# Exit with error if any linter fails
if [ $? -ne 0 ]; then
    echo "Standards validation failed. Please fix violations before committing."
    exit 1
fi
```

### CI/CD Integration
```yaml
# .github/workflows/standards-check.yml
name: Standards Check
on: [pull_request]

jobs:
  standards-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      - name: Run golangci-lint
        uses: golangci/golangci-lint-action@v3
        with:
          version: latest
      - name: Check formatting
        run: |
          if [ -f "go.mod" ]; then
            gofmt -d . | tee gofmt.out
            test ! -s gofmt.out
          fi
```

## Training & Education

### 1. Standards Documentation
- **Language Guides**: Detailed standards for each supported language
- **Examples**: Good and bad code examples with explanations
- **Rationale**: Why each standard exists and its benefits
- **Common Mistakes**: Frequent violations and how to avoid them

### 2. Interactive Learning
- **Code Reviews**: Educational feedback during review process
- **Automated Suggestions**: AI-powered improvement recommendations
- **Standards Updates**: Regular communication of standards changes
- **Best Practices Sharing**: Internal knowledge sharing sessions

## Continuous Improvement

### 1. Standards Evolution Process
1. **Identify Need**: New language features, security requirements, performance insights
2. **Research**: Industry best practices and community standards
3. **Proposal**: Document proposed changes with rationale and examples
4. **Review**: Cross-team review and feedback collection
5. **Implementation**: Update standards, tools, and documentation
6. **Training**: Educate team on changes and rationale
7. **Monitoring**: Track compliance and gather feedback

### 2. Metrics-Driven Updates
- **Violation Analysis**: Identify frequently violated standards
- **Developer Feedback**: Collect pain points and improvement suggestions
- **Industry Trends**: Monitor language ecosystem changes
- **Performance Impact**: Assess standards impact on development velocity

## Integration with QMS Components

### Code Review Integration
- **Automated Standards Checks**: Pre-review validation
- **Educational Feedback**: Explanations for violations
- **Progressive Enforcement**: Warnings → Errors → Blocking
- **Contextual Guidance**: Language-specific recommendations

### Testing Integration
- **Standards-Aware Testing**: Test patterns that align with standards
- **Coverage Requirements**: Minimum coverage thresholds
- **Test Quality Standards**: AAA pattern, mocking best practices
- **Performance Testing**: Standards for performance test implementation

### CI/CD Integration
- **Quality Gates**: Standards compliance as merge requirements
- **Automated Reporting**: Standards compliance in build reports
- **Trend Analysis**: Historical standards compliance tracking
- **Alerting**: Notifications for standards violations

This comprehensive standards framework ensures consistent, high-quality code across all languages while supporting developer productivity and continuous improvement.