+++
# === TEMPLATE METADATA ===
template_id = "29_qms_test_execution_report"
template_name = "QMS Test Execution Report Template"
template_version = "1.0.0"
template_description = "Template for automated testing results with coverage metrics and test quality validation"
created_date = "2025-08-16T05:00:00Z" # ISO 8601 format
last_modified = "2025-08-16T05:00:00Z" # ISO 8601 format
template_author = "QMS System"
template_category = "QMS CI/CD Automation"
template_tags = ["qms", "testing", "report", "coverage", "validation", "automation"]

# === CORE TEST EXECUTION METADATA ===
# REQUIRED: Basic test execution identification
test_execution_id = "" # << REQUIRED: Unique test execution identifier (e.g., "TEST-EXEC-20250816-050000") >>
test_execution_name = "" # << REQUIRED: Human-readable test execution name >>
test_suite_name = "" # << REQUIRED: Name of the test suite executed >>
test_run_type = "automated" # << REQUIRED: Type of test run >>
# Valid types: "automated", "manual", "hybrid", "smoke", "regression", "integration", "unit", "e2e"

# REQUIRED: Status and results
status = "🟡 Running" # << REQUIRED: Current execution status >>
# Valid statuses: "🟡 Running", "🟢 Passed", "🔴 Failed", "⚠️ Partial", "⏹️ Stopped", "🔄 Retrying", "⏭️ Skipped"

overall_result = "pending" # << REQUIRED: Overall test result >>
# Valid results: "pending", "passed", "failed", "partial", "skipped", "error"

# REQUIRED: Timestamps
start_time = "" # << REQUIRED: ISO 8601 timestamp when test execution started >>
end_time = "" # << OPTIONAL: ISO 8601 timestamp when test execution completed >>
duration_seconds = 0 # << OPTIONAL: Total execution duration in seconds >>

# === TEST ENVIRONMENT ===
[test_environment]
# Environment configuration
environment_name = "" # << REQUIRED: Test environment name (e.g., "staging", "qa", "ci") >>
environment_url = "" # << OPTIONAL: Base URL of test environment >>
environment_version = "" # << OPTIONAL: Version of application under test >>

# Infrastructure details
os_platform = "" # << OPTIONAL: Operating system platform >>
browser_type = "" # << OPTIONAL: Browser type for web tests >>
browser_version = "" # << OPTIONAL: Browser version >>
device_type = "" # << OPTIONAL: Device type for mobile tests >>

# Configuration details
test_data_source = "" # << OPTIONAL: Source of test data >>
database_state = "" # << OPTIONAL: Database state/snapshot used >>
external_dependencies = [] # << OPTIONAL: List of external dependencies >>

# === TEST EXECUTION CONTEXT ===
[test_execution_context]
# Trigger information
triggered_by = "" # << REQUIRED: What triggered the test execution >>
# Valid triggers: "ci_pipeline", "manual", "scheduled", "webhook", "deployment", "pull_request"

trigger_source = "" # << OPTIONAL: Specific trigger source (e.g., PR number, user, schedule name) >>
pipeline_id = "" # << OPTIONAL: Related CI/CD pipeline identifier >>
build_number = "" # << OPTIONAL: Build number being tested >>
commit_sha = "" # << OPTIONAL: Git commit SHA being tested >>
branch_name = "" # << OPTIONAL: Git branch being tested >>

# Test configuration
test_framework = "" # << REQUIRED: Testing framework used >>
test_runner = "" # << OPTIONAL: Test runner tool >>
parallel_execution = false # << REQUIRED: Boolean - Tests executed in parallel >>
max_retry_attempts = 0 # << OPTIONAL: Maximum retry attempts for failed tests >>

# === TEST SUITE CONFIGURATION ===
[test_suite_configuration]
# Test selection criteria
test_categories = [] # << OPTIONAL: List of test categories executed >>
# Example: ["smoke", "regression", "api", "ui", "integration"]

test_tags = [] # << OPTIONAL: List of test tags used for filtering >>
test_priorities = [] # << OPTIONAL: List of test priorities included >>
# Example: ["critical", "high", "medium", "low"]

# Execution parameters
timeout_minutes = 30 # << REQUIRED: Global test timeout in minutes >>
test_data_refresh = false # << OPTIONAL: Boolean - Test data was refreshed >>
cleanup_enabled = true # << REQUIRED: Boolean - Test cleanup enabled >>

# === TEST RESULTS SUMMARY ===
[test_results_summary]
# Test counts
total_tests = 0 # << REQUIRED: Total number of tests >>
passed_tests = 0 # << REQUIRED: Number of passed tests >>
failed_tests = 0 # << REQUIRED: Number of failed tests >>
skipped_tests = 0 # << OPTIONAL: Number of skipped tests >>
blocked_tests = 0 # << OPTIONAL: Number of blocked tests >>
retried_tests = 0 # << OPTIONAL: Number of tests that were retried >>

# Success metrics
pass_rate = 0.0 # << REQUIRED: Pass rate percentage (0.0 to 1.0) >>
success_threshold = 0.95 # << REQUIRED: Required success threshold (0.0 to 1.0) >>
threshold_met = false # << REQUIRED: Boolean - Success threshold met >>

# Performance metrics
average_test_duration = 0.0 # << OPTIONAL: Average test duration in seconds >>
slowest_test_duration = 0.0 # << OPTIONAL: Duration of slowest test in seconds >>
fastest_test_duration = 0.0 # << OPTIONAL: Duration of fastest test in seconds >>

# === CODE COVERAGE METRICS ===
[code_coverage]
# Coverage collection
coverage_enabled = true # << REQUIRED: Boolean - Code coverage collection enabled >>
coverage_tool = "" # << OPTIONAL: Tool used for coverage collection >>

# Line coverage
line_coverage_percentage = 0.0 # << OPTIONAL: Line coverage percentage (0.0 to 1.0) >>
lines_covered = 0 # << OPTIONAL: Number of lines covered >>
lines_total = 0 # << OPTIONAL: Total number of lines >>

# Branch coverage
branch_coverage_percentage = 0.0 # << OPTIONAL: Branch coverage percentage (0.0 to 1.0) >>
branches_covered = 0 # << OPTIONAL: Number of branches covered >>
branches_total = 0 # << OPTIONAL: Total number of branches >>

# Function coverage
function_coverage_percentage = 0.0 # << OPTIONAL: Function coverage percentage (0.0 to 1.0) >>
functions_covered = 0 # << OPTIONAL: Number of functions covered >>
functions_total = 0 # << OPTIONAL: Total number of functions >>

# Statement coverage
statement_coverage_percentage = 0.0 # << OPTIONAL: Statement coverage percentage (0.0 to 1.0) >>
statements_covered = 0 # << OPTIONAL: Number of statements covered >>
statements_total = 0 # << OPTIONAL: Total number of statements >>

# Coverage thresholds
coverage_threshold_line = 0.8 # << OPTIONAL: Required line coverage threshold (0.0 to 1.0) >>
coverage_threshold_branch = 0.7 # << OPTIONAL: Required branch coverage threshold (0.0 to 1.0) >>
coverage_thresholds_met = false # << REQUIRED: Boolean - All coverage thresholds met >>

# === TEST QUALITY METRICS ===
[test_quality_metrics]
# Test reliability
flaky_tests_count = 0 # << OPTIONAL: Number of flaky tests identified >>
flaky_tests_percentage = 0.0 # << OPTIONAL: Percentage of flaky tests (0.0 to 1.0) >>
test_stability_score = 0.0 # << OPTIONAL: Test stability score (0.0 to 10.0) >>

# Test maintainability
duplicated_test_code = 0.0 # << OPTIONAL: Percentage of duplicated test code (0.0 to 1.0) >>
test_code_quality_score = 0.0 # << OPTIONAL: Test code quality score (0.0 to 10.0) >>
test_documentation_coverage = 0.0 # << OPTIONAL: Test documentation coverage (0.0 to 1.0) >>

# Test effectiveness
mutation_testing_score = 0.0 # << OPTIONAL: Mutation testing score (0.0 to 1.0) >>
test_effectiveness_score = 0.0 # << OPTIONAL: Overall test effectiveness score (0.0 to 10.0) >>

# === FAILED TESTS ANALYSIS ===
[[failed_tests]]
test_name = "" # << REQUIRED: Name of failed test >>
test_class = "" # << OPTIONAL: Test class/suite name >>
test_method = "" # << OPTIONAL: Test method name >>
failure_type = "" # << REQUIRED: Type of failure >>
# Valid types: "assertion", "timeout", "exception", "setup_failure", "teardown_failure", "infrastructure"

failure_message = "" # << REQUIRED: Failure message >>
failure_category = "" # << OPTIONAL: Categorized failure type >>
# Example categories: "application_bug", "test_issue", "environment_issue", "data_issue"

duration_seconds = 0.0 # << OPTIONAL: Test duration in seconds >>
retry_attempts = 0 # << OPTIONAL: Number of retry attempts >>
stack_trace = "" # << OPTIONAL: Stack trace or error details >>

# Failure analysis
is_known_issue = false # << OPTIONAL: Boolean - Is this a known issue >>
related_ticket = "" # << OPTIONAL: Related ticket/issue identifier >>
fix_priority = "medium" # << OPTIONAL: Priority for fixing >>
# Valid priorities: "critical", "high", "medium", "low"

# Example additional failed test (copy this block for each failed test)
# [[failed_tests]]
# test_name = "test_user_login"
# test_class = "LoginTests"
# failure_type = "assertion"
# failure_message = "Expected login to succeed but got error"
# duration_seconds = 5.2
# retry_attempts = 1

# === PERFORMANCE ANALYSIS ===
[performance_analysis]
# Performance metrics
performance_testing_enabled = false # << REQUIRED: Boolean - Performance testing enabled >>
response_time_average = 0.0 # << OPTIONAL: Average response time in milliseconds >>
response_time_p95 = 0.0 # << OPTIONAL: 95th percentile response time in milliseconds >>
response_time_p99 = 0.0 # << OPTIONAL: 99th percentile response time in milliseconds >>

# Throughput metrics
requests_per_second = 0.0 # << OPTIONAL: Requests per second >>
transactions_per_minute = 0.0 # << OPTIONAL: Transactions per minute >>

# Resource utilization
cpu_utilization_max = 0.0 # << OPTIONAL: Maximum CPU utilization percentage (0.0 to 1.0) >>
memory_utilization_max = 0.0 # << OPTIONAL: Maximum memory utilization percentage (0.0 to 1.0) >>
disk_io_max = 0.0 # << OPTIONAL: Maximum disk I/O in MB/s >>

# Performance thresholds
performance_thresholds_met = true # << REQUIRED: Boolean - Performance thresholds met >>
response_time_threshold = 1000.0 # << OPTIONAL: Response time threshold in milliseconds >>

# === SECURITY TESTING ===
[security_testing]
# Security test execution
security_tests_enabled = false # << REQUIRED: Boolean - Security tests enabled >>
security_scan_type = [] # << OPTIONAL: Types of security scans performed >>
# Example: ["sast", "dast", "dependency", "container", "infrastructure"]

# Security findings
security_vulnerabilities_found = 0 # << OPTIONAL: Number of security vulnerabilities found >>
critical_vulnerabilities = 0 # << OPTIONAL: Number of critical vulnerabilities >>
high_vulnerabilities = 0 # << OPTIONAL: Number of high-severity vulnerabilities >>
medium_vulnerabilities = 0 # << OPTIONAL: Number of medium-severity vulnerabilities >>
low_vulnerabilities = 0 # << OPTIONAL: Number of low-severity vulnerabilities >>

# Security compliance
security_compliance_score = 0.0 # << OPTIONAL: Security compliance score (0.0 to 10.0) >>
security_thresholds_met = true # << REQUIRED: Boolean - Security thresholds met >>

# === INTEGRATION TESTING ===
[integration_testing]
# Integration test configuration
integration_tests_enabled = true # << REQUIRED: Boolean - Integration tests enabled >>
external_services_tested = [] # << OPTIONAL: List of external services tested >>
database_integration_tested = false # << OPTIONAL: Boolean - Database integration tested >>
api_integration_tested = false # << OPTIONAL: Boolean - API integration tested >>

# Integration test results
integration_tests_passed = 0 # << OPTIONAL: Number of integration tests passed >>
integration_tests_failed = 0 # << OPTIONAL: Number of integration tests failed >>
service_connectivity_issues = 0 # << OPTIONAL: Number of service connectivity issues >>

# === ACCESSIBILITY TESTING ===
[accessibility_testing]
# Accessibility test configuration
accessibility_tests_enabled = false # << REQUIRED: Boolean - Accessibility tests enabled >>
accessibility_standards = [] # << OPTIONAL: Accessibility standards tested >>
# Example: ["WCAG2.1", "Section508", "ADA"]

# Accessibility results
accessibility_violations_found = 0 # << OPTIONAL: Number of accessibility violations found >>
critical_accessibility_issues = 0 # << OPTIONAL: Number of critical accessibility issues >>
accessibility_score = 0.0 # << OPTIONAL: Accessibility score (0.0 to 10.0) >>
accessibility_thresholds_met = true # << REQUIRED: Boolean - Accessibility thresholds met >>

# === QMS INTEGRATION ===
[qms_integration]
# Quality gate integration
quality_gate_evaluation = false # << REQUIRED: Boolean - Quality gate evaluation enabled >>
quality_gate_passed = false # << REQUIRED: Boolean - Quality gate passed >>
quality_gate_id = "" # << OPTIONAL: Quality gate identifier >>

# QMS mode integration
assigned_qms_mode = "qms-testing-specialist" # << REQUIRED: QMS mode handling test execution >>
coordinator_mode = "" # << OPTIONAL: Coordinator mode managing process >>
related_pipeline_id = "" # << OPTIONAL: Related CI/CD pipeline identifier >>

# Compliance and standards
testing_standards_compliance = [
    # << OPTIONAL: List of testing standards compliance >>
    # Example: "ISO29119", "IEEE829", "Agile Testing"
]
test_documentation_complete = true # << REQUIRED: Boolean - Test documentation complete >>

# === ARTIFACT MANAGEMENT ===
[artifact_management]
# Test artifacts
test_report_url = "" # << OPTIONAL: URL to detailed test report >>
coverage_report_url = "" # << OPTIONAL: URL to coverage report >>
test_logs_url = "" # << OPTIONAL: URL to test execution logs >>
screenshot_archive_url = "" # << OPTIONAL: URL to screenshot archive >>
video_recordings_url = "" # << OPTIONAL: URL to test video recordings >>

# Test data artifacts
test_data_backup_url = "" # << OPTIONAL: URL to test data backup >>
test_results_export_url = "" # << OPTIONAL: URL to exported test results >>

# Archival settings
artifact_retention_days = 90 # << REQUIRED: Days to retain test artifacts >>
archive_enabled = true # << REQUIRED: Boolean - Artifact archival enabled >>

# === NOTIFICATION SETTINGS ===
[notification_settings]
# Notification configuration
notify_on_failure = true # << REQUIRED: Boolean - Notify on test failure >>
notify_on_success = false # << OPTIONAL: Boolean - Notify on test success >>
notify_on_threshold_breach = true # << REQUIRED: Boolean - Notify on threshold breach >>

# Notification channels
notification_channels = [
    # << OPTIONAL: List of notification channels >>
    # Example: "slack", "email", "teams", "webhook"
]

# Recipient configuration
failure_notification_recipients = [] # << OPTIONAL: List of failure notification recipients >>
success_notification_recipients = [] # << OPTIONAL: List of success notification recipients >>

# === HISTORICAL ANALYSIS ===
[historical_analysis]
# Trend analysis
previous_pass_rate = 0.0 # << OPTIONAL: Pass rate from previous execution (0.0 to 1.0) >>
pass_rate_trend = "stable" # << OPTIONAL: Pass rate trend >>
# Valid trends: "improving", "degrading", "stable", "volatile"

previous_duration = 0.0 # << OPTIONAL: Duration of previous execution in seconds >>
duration_trend = "stable" # << OPTIONAL: Duration trend >>

# Baseline comparison
baseline_pass_rate = 0.0 # << OPTIONAL: Baseline pass rate for comparison (0.0 to 1.0) >>
deviation_from_baseline = 0.0 # << OPTIONAL: Deviation from baseline percentage >>
baseline_comparison_result = "within_tolerance" # << OPTIONAL: Baseline comparison result >>
# Valid results: "within_tolerance", "exceeds_tolerance", "below_baseline"

# === RECOMMENDATIONS ===
[recommendations]
# Improvement recommendations
test_suite_optimization_needed = false # << OPTIONAL: Boolean - Test suite optimization needed >>
coverage_improvement_areas = [] # << OPTIONAL: Areas needing coverage improvement >>
performance_optimization_areas = [] # << OPTIONAL: Areas needing performance optimization >>

# Action items
immediate_actions_required = [] # << OPTIONAL: List of immediate actions required >>
long_term_improvements = [] # << OPTIONAL: List of long-term improvements needed >>

# Risk assessment
test_risk_level = "low" # << OPTIONAL: Overall test risk level >>
# Valid levels: "low", "medium", "high", "critical"
risk_factors = [] # << OPTIONAL: List of identified risk factors >>
+++

# Test Execution Report: {Test Execution Name}

## Overview

**Execution ID:** `{test_execution_id}`  
**Test Suite:** `{test_suite_name}`  
**Type:** {test_run_type}  
**Status:** {status}  
**Result:** {overall_result}  

**Duration:** {duration_seconds} seconds  
**Started:** {start_time}  
**Completed:** {end_time}  

## Executive Summary

### Test Results
- **Total Tests:** {total_tests}
- **Passed:** {passed_tests} ({pass_rate}%)
- **Failed:** {failed_tests}
- **Skipped:** {skipped_tests}
- **Success Threshold:** {success_threshold}% | **Met:** {Yes/No}

### Code Coverage
- **Line Coverage:** {line_coverage_percentage}%
- **Branch Coverage:** {branch_coverage_percentage}%
- **Function Coverage:** {function_coverage_percentage}%
- **Thresholds Met:** {Yes/No}

### Quality Gates
- **Quality Gate Passed:** {Yes/No}
- **Performance Thresholds Met:** {Yes/No}
- **Security Thresholds Met:** {Yes/No}
- **Accessibility Thresholds Met:** {Yes/No}

## Test Environment

### Configuration
- **Environment:** {environment_name}
- **Application Version:** {environment_version}
- **Platform:** {os_platform}
- **Browser:** {browser_type} {browser_version}

### Test Data
- **Data Source:** {test_data_source}
- **Database State:** {database_state}
- **Data Refresh:** {Yes/No}

## Test Execution Context

### Trigger Information
- **Triggered By:** {triggered_by}
- **Source:** {trigger_source}
- **Pipeline ID:** {pipeline_id}
- **Build:** {build_number}
- **Branch:** {branch_name}
- **Commit:** {commit_sha}

### Test Configuration
- **Framework:** {test_framework}
- **Runner:** {test_runner}
- **Parallel Execution:** {Yes/No}
- **Timeout:** {timeout_minutes} minutes
- **Max Retries:** {max_retry_attempts}

## Detailed Results

### Test Categories
<!-- Update based on test categories executed -->
| Category | Total | Passed | Failed | Skipped | Pass Rate |
|----------|-------|--------|--------|---------|-----------|
| {category} | {total} | {passed} | {failed} | {skipped} | {pass_rate}% |

### Failed Tests Analysis
<!-- This section is populated for each failed test -->

#### {test_name}
- **Class:** {test_class}
- **Method:** {test_method}
- **Failure Type:** {failure_type}
- **Category:** {failure_category}
- **Duration:** {duration_seconds}s
- **Retries:** {retry_attempts}

**Error Message:**
```
{failure_message}
```

**Analysis:**
- **Known Issue:** {Yes/No}
- **Related Ticket:** {related_ticket}
- **Priority:** {fix_priority}

### Performance Analysis

#### Response Times
- **Average:** {response_time_average}ms
- **95th Percentile:** {response_time_p95}ms
- **99th Percentile:** {response_time_p99}ms
- **Threshold:** {response_time_threshold}ms
- **Met:** {Yes/No}

#### Throughput
- **Requests/Second:** {requests_per_second}
- **Transactions/Minute:** {transactions_per_minute}

#### Resource Utilization
- **Max CPU:** {cpu_utilization_max}%
- **Max Memory:** {memory_utilization_max}%
- **Max Disk I/O:** {disk_io_max} MB/s

## Code Coverage Report

### Coverage Metrics
| Type | Covered | Total | Percentage | Threshold | Status |
|------|---------|-------|------------|-----------|--------|
| Lines | {lines_covered} | {lines_total} | {line_coverage_percentage}% | {coverage_threshold_line}% | {Pass/Fail} |
| Branches | {branches_covered} | {branches_total} | {branch_coverage_percentage}% | {coverage_threshold_branch}% | {Pass/Fail} |
| Functions | {functions_covered} | {functions_total} | {function_coverage_percentage}% | - | - |
| Statements | {statements_covered} | {statements_total} | {statement_coverage_percentage}% | - | - |

### Coverage Analysis
- **Overall Coverage Status:** {Pass/Fail}
- **Coverage Tool:** {coverage_tool}
- **Detailed Report:** [{coverage_report_url}]({coverage_report_url})

## Quality Metrics

### Test Quality
- **Flaky Tests:** {flaky_tests_count} ({flaky_tests_percentage}%)
- **Stability Score:** {test_stability_score}/10
- **Code Quality Score:** {test_code_quality_score}/10
- **Documentation Coverage:** {test_documentation_coverage}%

### Test Effectiveness
- **Mutation Testing Score:** {mutation_testing_score}%
- **Overall Effectiveness:** {test_effectiveness_score}/10

## Security Testing

### Security Scan Results
- **Security Tests Enabled:** {Yes/No}
- **Scan Types:** {List scan types}
- **Total Vulnerabilities:** {security_vulnerabilities_found}

#### Vulnerability Breakdown
- **Critical:** {critical_vulnerabilities}
- **High:** {high_vulnerabilities}
- **Medium:** {medium_vulnerabilities}
- **Low:** {low_vulnerabilities}

### Security Compliance
- **Compliance Score:** {security_compliance_score}/10
- **Thresholds Met:** {Yes/No}

## Integration Testing

### Integration Results
- **Integration Tests Enabled:** {Yes/No}
- **Services Tested:** {List external services}
- **Passed:** {integration_tests_passed}
- **Failed:** {integration_tests_failed}
- **Connectivity Issues:** {service_connectivity_issues}

### Integration Analysis
- **Database Integration:** {Pass/Fail}
- **API Integration:** {Pass/Fail}
- **Service Dependencies:** {Status}

## Accessibility Testing

### Accessibility Results
- **Tests Enabled:** {Yes/No}
- **Standards Tested:** {List standards}
- **Violations Found:** {accessibility_violations_found}
- **Critical Issues:** {critical_accessibility_issues}

### Accessibility Score
- **Score:** {accessibility_score}/10
- **Thresholds Met:** {Yes/No}

## Historical Analysis

### Trend Analysis
- **Pass Rate Trend:** {pass_rate_trend}
  - Previous: {previous_pass_rate}%
  - Current: {pass_rate}%
  
- **Duration Trend:** {duration_trend}
  - Previous: {previous_duration}s
  - Current: {duration_seconds}s

### Baseline Comparison
- **Baseline Pass Rate:** {baseline_pass_rate}%
- **Deviation:** {deviation_from_baseline}%
- **Comparison Result:** {baseline_comparison_result}

## QMS Integration

### Quality Gate Evaluation
- **Quality Gate ID:** {quality_gate_id}
- **Evaluation Enabled:** {Yes/No}
- **Quality Gate Passed:** {Yes/No}

### Compliance
- **Testing Standards:** {List standards}
- **Documentation Complete:** {Yes/No}

## Recommendations

### Immediate Actions Required
<!-- List immediate actions if any -->
- {immediate_action_1}
- {immediate_action_2}

### Test Suite Optimization
- **Optimization Needed:** {Yes/No}
- **Coverage Improvement Areas:** {List areas}
- **Performance Optimization Areas:** {List areas}

### Long-term Improvements
- {long_term_improvement_1}
- {long_term_improvement_2}

## Risk Assessment

### Risk Level: {test_risk_level}

### Risk Factors
- {risk_factor_1}
- {risk_factor_2}

### Mitigation Recommendations
- {mitigation_recommendation_1}
- {mitigation_recommendation_2}

## Test Artifacts

### Reports and Logs
- **Detailed Test Report:** [{test_report_url}]({test_report_url})
- **Coverage Report:** [{coverage_report_url}]({coverage_report_url})
- **Execution Logs:** [{test_logs_url}]({test_logs_url})
- **Screenshots:** [{screenshot_archive_url}]({screenshot_archive_url})
- **Video Recordings:** [{video_recordings_url}]({video_recordings_url})

### Data Artifacts
- **Test Data Backup:** [{test_data_backup_url}]({test_data_backup_url})
- **Results Export:** [{test_results_export_url}]({test_results_export_url})

### Retention Policy
- **Retention Period:** {artifact_retention_days} days
- **Archive Enabled:** {Yes/No}

## Notifications

### Notification Status
- **Failure Notifications:** {Enabled/Disabled}
- **Success Notifications:** {Enabled/Disabled}
- **Threshold Breach Notifications:** {Enabled/Disabled}

### Notification Channels
- {List notification channels}

---

**Report Generated:** {end_time}  
**QMS Mode:** {assigned_qms_mode}  
**Coordinator:** {coordinator_mode}  
**Pipeline:** {related_pipeline_id}