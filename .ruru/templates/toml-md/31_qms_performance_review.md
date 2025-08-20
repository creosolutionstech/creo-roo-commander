+++
# --- Template Metadata ---
template_id = "31_qms_performance_review"
template_name = "QMS Performance Review"
template_version = "1.0.0"
template_description = "Template for comprehensive QMS performance review reports covering performance analysis, optimization recommendations, and performance benchmarking"
template_category = "qms"
template_subcategory = "performance"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS performance modes to document performance reviews, bottleneck analysis, and optimization planning"

# --- Core Performance Review Metadata ---
id = "" # << REQUIRED - Unique performance review ID (e.g., QMS-PERF-20250816-001) >>
title = "" # << REQUIRED - Clear performance review title >>
review_type = "performance_analysis" # << REQUIRED - Options: "performance_analysis", "load_testing", "benchmarking", "optimization", "capacity_planning" >>
performance_scope = "comprehensive" # << REQUIRED - Options: "comprehensive", "targeted", "focused", "follow-up" >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "medium" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
conducted_by = "" # << REQUIRED - QMS performance mode or team >>
review_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Performance Review Configuration ---
[performance_config]
performance_frameworks = [] # << REQUIRED - Array of frameworks (e.g., ["APM", "OpenTelemetry", "Custom-Metrics"]) >>
testing_methodology = "load-testing" # << OPTIONAL - Options: "load-testing", "stress-testing", "spike-testing", "endurance-testing" >>
performance_domains = [] # << REQUIRED - Array of performance domains (e.g., ["response-time", "throughput", "resource-usage"]) >>
baseline_reference = "" # << OPTIONAL - Reference to baseline performance metrics >>
previous_review_id = "" # << OPTIONAL - Reference to previous performance review if follow-up >>
external_tools_used = [] # << OPTIONAL - External performance tools used >>

# --- Scope & Coverage ---
[review_scope]
systems_tested = [] # << REQUIRED - Array of systems/applications in scope >>
environments_tested = [] # << REQUIRED - Array of environments (e.g., ["production", "staging", "load-test"]) >>
workload_profiles = [] # << REQUIRED - Array of workload profiles tested >>
infrastructure_components = [] # << OPTIONAL - Infrastructure components analyzed >>
user_scenarios = [] # << OPTIONAL - User scenarios/journeys tested >>
exclusions = [] # << OPTIONAL - Items explicitly excluded from review >>
testing_duration = "1 hour" # << OPTIONAL - Duration of performance testing >>

# --- Performance Metrics Summary ---
[performance_summary]
response_time_p95 = 0.0 # << REQUIRED - 95th percentile response time (ms) >>
response_time_p99 = 0.0 # << REQUIRED - 99th percentile response time (ms) >>
throughput_rps = 0.0 # << REQUIRED - Requests per second achieved >>
error_rate_percent = 0.0 # << REQUIRED - Error rate percentage >>
cpu_utilization_max = 0.0 # << REQUIRED - Maximum CPU utilization percentage >>
memory_utilization_max = 0.0 # << REQUIRED - Maximum memory utilization percentage >>
concurrent_users_max = 0 # << OPTIONAL - Maximum concurrent users tested >>

# --- Performance Assessment ---
[performance_assessment]
overall_performance_score = 0.0 # << REQUIRED - Overall performance score (0-100) >>
performance_grade = "B" # << REQUIRED - Performance grade (A, B, C, D, F) >>
sla_compliance = 85.0 # << REQUIRED - SLA compliance percentage >>
scalability_rating = "medium" # << REQUIRED - Scalability assessment >>
reliability_rating = "medium" # << REQUIRED - Reliability assessment >>
efficiency_rating = "medium" # << REQUIRED - Resource efficiency assessment >>

# --- Performance Issues & Bottlenecks ---
[issues_summary]
critical_bottlenecks = 0 # << REQUIRED - Number of critical performance bottlenecks >>
significant_issues = 0 # << REQUIRED - Number of significant performance issues >>
moderate_issues = 0 # << REQUIRED - Number of moderate performance concerns >>
minor_issues = 0 # << REQUIRED - Number of minor performance issues >>
optimization_opportunities = 0 # << REQUIRED - Number of optimization opportunities >>
capacity_warnings = 0 # << OPTIONAL - Number of capacity warnings >>

# --- Optimization Tracking ---
[optimization_status]
immediate_optimizations = 0 # << REQUIRED - Optimizations needed within days >>
short_term_optimizations = 0 # << REQUIRED - Optimizations needed within weeks >>
long_term_improvements = 0 # << REQUIRED - Strategic improvements (months) >>
total_recommendations = 0 # << REQUIRED - Total number of performance recommendations >>
accepted_optimizations = 0 # << OPTIONAL - Number of optimizations accepted by team >>

# --- Capacity & Scaling ---
current_capacity_utilization = 0.0 # << REQUIRED - Current capacity utilization percentage >>
projected_growth_rate = 0.0 # << OPTIONAL - Projected growth rate percentage >>
scaling_threshold = 0.0 # << OPTIONAL - Threshold for scaling decisions >>
capacity_planning_horizon = "6 months" # << OPTIONAL - Capacity planning timeframe >>

# --- Stakeholders & Communication ---
stakeholders = [] # << OPTIONAL - Array of key stakeholders >>
performance_team = [] # << OPTIONAL - Performance team members involved >>
approvers = [] # << REQUIRED - Array of required approvers >>
distribution_list = [] # << OPTIONAL - Report distribution list >>

# --- Evidence & References ---
evidence_repository = "" # << OPTIONAL - Path to performance evidence repository >>
test_results = [] # << OPTIONAL - Array of performance test result references >>
monitoring_data = [] # << OPTIONAL - Monitoring system data references >>
benchmark_reports = [] # << OPTIONAL - Benchmark report references >>
external_references = [] # << OPTIONAL - External performance guidance/standards >>
+++

# QMS Performance Review Report

## Executive Summary

### Performance Review Overview
- **Review ID**: {{id}}
- **Review Date**: {{review_date}}
- **Performance Frameworks**: {{performance_config.performance_frameworks | join(", ")}}
- **Overall Performance Score**: {{performance_assessment.overall_performance_score}}/100 (Grade: {{performance_assessment.performance_grade}})
- **SLA Compliance**: {{performance_assessment.sla_compliance}}%
- **Response Time (P95)**: {{performance_summary.response_time_p95}}ms
- **Throughput**: {{performance_summary.throughput_rps}} RPS
- **Critical Bottlenecks**: {{issues_summary.critical_bottlenecks}}

### Key Performance Findings
<!-- Provide high-level summary of most critical performance findings -->

### Performance Posture Assessment
<!-- High-level assessment of overall performance health and scalability -->

### Management Summary
<!-- Executive summary for leadership highlighting key performance risks and required actions -->

## Performance Testing Methodology

### Testing Framework & Approach
{{#each performance_config.performance_frameworks}}
- **{{this}}**: [Description of how this framework was applied]
{{/each}}

### Testing Methodology
- **Testing Type**: {{performance_config.testing_methodology}}
- **Testing Duration**: {{review_scope.testing_duration}}
- **Performance Domains**: {{performance_config.performance_domains | join(", ")}}
- **Workload Profiles**: {{review_scope.workload_profiles | join(", ")}}

### Testing Environment & Tools
- **Environments Tested**: {{review_scope.environments_tested | join(", ")}}
- **External Tools**: {{performance_config.external_tools_used | join(", ")}}
- **Infrastructure**: {{review_scope.infrastructure_components | join(", ")}}

### Testing Team & Expertise
- **Lead Performance Engineer**: {{conducted_by}}
- **Performance Team**: [List of team members and expertise]
- **Testing Coordination**: [Description of testing coordination approach]
- **Quality Assurance**: [QA involvement in performance testing]

## Scope & Coverage

### Systems & Applications Tested

#### Systems in Scope
{{#each review_scope.systems_tested}}
- **{{this}}**: [System description, architecture, and performance characteristics]
{{/each}}

#### Environments Analyzed
{{#each review_scope.environments_tested}}
- **{{this}}**: [Environment configuration and testing approach]
{{/each}}

### Workload & User Scenarios
- **Workload Profiles**: {{review_scope.workload_profiles | join(", ")}}
- **User Scenarios**: {{review_scope.user_scenarios | join(", ")}}
- **Concurrent Users**: Up to {{performance_summary.concurrent_users_max}} users

### Testing Exclusions & Limitations
{{#each review_scope.exclusions}}
- **{{this}}**: [Rationale for exclusion and potential performance implications]
{{/each}}

## Performance Results & Analysis

### Performance Metrics Overview

| Metric Category | Current | Target | Status | Trend |
|----------------|---------|--------|--------|-------|
| **Response Time (P95)** | {{performance_summary.response_time_p95}}ms | [Target]ms | [Status] | [↑/↓/→] |
| **Response Time (P99)** | {{performance_summary.response_time_p99}}ms | [Target]ms | [Status] | [↑/↓/→] |
| **Throughput** | {{performance_summary.throughput_rps}} RPS | [Target] RPS | [Status] | [↑/↓/→] |
| **Error Rate** | {{performance_summary.error_rate_percent}}% | <0.1% | [Status] | [↑/↓/→] |
| **CPU Utilization** | {{performance_summary.cpu_utilization_max}}% | <80% | [Status] | [↑/↓/→] |
| **Memory Utilization** | {{performance_summary.memory_utilization_max}}% | <80% | [Status] | [↑/↓/→] |

### SLA Compliance Analysis
- **Overall SLA Compliance**: {{performance_assessment.sla_compliance}}%
- **Response Time SLA**: [Compliance percentage and analysis]
- **Availability SLA**: [Compliance percentage and analysis]
- **Throughput SLA**: [Compliance percentage and analysis]

### Performance Trend Analysis
1. **Historical Performance Comparison**:
   - [Comparison with previous performance reviews]
   - [Performance trend over time]
   - [Seasonal or usage pattern effects]

2. **Baseline Deviation Analysis**:
   - [Analysis against performance baselines]
   - [Significant deviations and root causes]
   - [Performance regression identification]

## Critical Performance Issues & Bottlenecks

### Performance Issue Distribution

| Severity | Count | Impact | Resolution Priority |
|----------|-------|--------|-------------------|
| 🔴 Critical | {{issues_summary.critical_bottlenecks}} | High | Immediate |
| 🟠 Significant | {{issues_summary.significant_issues}} | Medium-High | 1-2 weeks |
| 🟡 Moderate | {{issues_summary.moderate_issues}} | Medium | 1-3 months |
| 🟢 Minor | {{issues_summary.minor_issues}} | Low | Future planning |
| **TOTAL** | **{{issues_summary.critical_bottlenecks + issues_summary.significant_issues + issues_summary.moderate_issues + issues_summary.minor_issues}}** | | |

### Critical Performance Bottlenecks ({{issues_summary.critical_bottlenecks}})

#### 🔴 Critical Bottleneck 1: [Bottleneck Title]
**System/Component**: [Affected system or component]
**Performance Impact**: Critical
**Affected Users**: [Number or percentage of users affected]

**Issue Description**:
[Detailed technical description of the performance bottleneck]

**Performance Metrics**:
- **Response Time Impact**: [Specific impact on response times]
- **Throughput Impact**: [Impact on system throughput]
- **Resource Consumption**: [CPU/Memory/IO impact]
- **Error Rate Increase**: [Any error rate increases]

**Root Cause Analysis**:
- **Primary Cause**: [What directly causes the bottleneck]
- **Contributing Factors**: [System design, load, configuration factors]
- **Resource Constraints**: [Hardware, software, or architectural limitations]
- **Code/Query Issues**: [Specific code or database query problems]

**Business Impact Assessment**:
- **User Experience Impact**: [How users are affected]
- **Revenue Impact**: [Potential revenue loss or business impact]
- **SLA Breach Risk**: [Risk of SLA violations]
- **Scalability Implications**: [Impact on system growth]

**Performance Evidence**:
```
[Performance graphs, metrics, or data supporting the findings]
```

**Technical Details**:
[Detailed technical analysis, stack traces, query plans, etc.]

---

### Significant Performance Issues ({{issues_summary.significant_issues}})

#### 🟠 Significant Issue 1: [Issue Title]
**System/Component**: [Affected system]
**Performance Impact**: High

**Issue Description**:
[Description of the significant performance issue]

**Performance Metrics Impact**:
[Specific metrics affected and by how much]

**Root Cause**:
[Brief root cause analysis]

**Business Risk**:
[Assessment of business risk and user impact]

---

### Moderate Performance Concerns ({{issues_summary.moderate_issues}})

#### 🟡 Moderate Issue 1: [Issue Title]
**System/Component**: [Affected system]
**Performance Impact**: Medium
**Summary**: [Brief description of issue and impact]
**Recommendation**: [High-level optimization approach]

---

### Minor Performance Issues & Opportunities ({{issues_summary.minor_issues + issues_summary.optimization_opportunities}})

#### 🟢 Minor Issue/Opportunity 1: [Title]
**Type**: Performance Issue / Optimization Opportunity
**Finding**: [Brief description]
**Potential Improvement**: [Expected performance gain]

## Capacity & Scalability Analysis

### Current Capacity Assessment

#### Resource Utilization Analysis
- **Current Capacity Utilization**: {{current_capacity_utilization}}%
- **CPU Capacity**: [Current vs maximum capacity]
- **Memory Capacity**: [Current vs maximum capacity]
- **Storage Capacity**: [Current vs maximum capacity]
- **Network Capacity**: [Current vs maximum bandwidth]

#### Scalability Assessment
- **Horizontal Scalability**: {{performance_assessment.scalability_rating}}
- **Vertical Scalability**: [Assessment of vertical scaling options]
- **Database Scalability**: [Database scaling assessment]
- **Application Scalability**: [Application tier scaling assessment]

### Capacity Planning & Growth Projections

#### Growth Analysis
- **Projected Growth Rate**: {{projected_growth_rate}}% annually
- **Planning Horizon**: {{capacity_planning_horizon}}
- **Scaling Threshold**: {{scaling_threshold}}% utilization
- **Peak Load Projections**: [Expected peak loads]

#### Capacity Recommendations
1. **Immediate Capacity Needs** (0-3 months):
   - [Specific capacity additions needed]
   - [Resource scaling requirements]

2. **Medium-term Capacity Planning** (3-12 months):
   - [Projected capacity requirements]
   - [Infrastructure scaling roadmap]

3. **Long-term Capacity Strategy** (1-3 years):
   - [Strategic capacity planning]
   - [Architecture evolution for scale]

### Load Testing Results

#### Load Test Scenarios
1. **Normal Load Test**:
   - **Users**: [Number] concurrent users
   - **Duration**: [Time]
   - **Results**: [Key results and findings]

2. **Peak Load Test**:
   - **Users**: [Number] concurrent users
   - **Duration**: [Time]
   - **Results**: [Key results and findings]

3. **Stress Test**:
   - **Load**: [Stress conditions]
   - **Breaking Point**: [System breaking point]
   - **Recovery**: [System recovery behavior]

## Performance Optimization Plan

### Immediate Optimizations (0-1 week) - {{optimization_status.immediate_optimizations}} items

#### Optimization 1: Address Critical Bottleneck [X]
- **Target Issue**: [Specific critical bottleneck]
- **Responsible Party**: [Performance team member/role]
- **Target Completion**: [Specific date]
- **Success Criteria**: [Performance improvement targets]
- **Resources Required**: [Personnel, tools, budget needed]
- **Risk if Delayed**: [Consequence of not completing immediately]
- **Expected Impact**: [Performance improvement expected]

### Short-term Optimizations (1-8 weeks) - {{optimization_status.short_term_optimizations}} items

#### Optimization 1: [Performance Enhancement]
- **Objective**: [Performance improvement goal]
- **Responsible Party**: [Name/Role]
- **Target Date**: [Date within 8 weeks]
- **Implementation Plan**: [Detailed implementation steps]
- **Dependencies**: [Prerequisites or dependencies]
- **Expected Benefits**: [Performance gains expected]
- **Testing Plan**: [Performance validation approach]

### Long-term Performance Improvements (2-12 months) - {{optimization_status.long_term_improvements}} items

#### Improvement 1: [Strategic Performance Initiative]
- **Strategic Goal**: [Long-term performance objective]
- **Implementation Timeline**: [Phased implementation approach]
- **Investment Required**: [Budget and resource requirements]
- **Expected Performance Benefits**: [ROI and performance gains]
- **Architecture Changes**: [Any architectural modifications needed]
- **Risk Assessment**: [Implementation risks and mitigation]

### Performance Governance & Monitoring

#### Performance Response Management
1. **Performance SLA Monitoring**: Continuous monitoring of performance SLAs
2. **Alerting Thresholds**: [Performance alert thresholds and escalation]
3. **Performance Reviews**: Regular performance review schedule
4. **Capacity Planning**: Ongoing capacity planning and forecasting

#### Performance Accountability Framework
- **Performance Owner**: [Senior leader accountable for performance]
- **Performance Team Lead**: [Technical leader managing performance]
- **System Owners**: [Individuals responsible for specific systems]
- **Performance Committee**: [Performance oversight and decision making]

## Performance Recommendations

### Strategic Performance Recommendations

#### 1. Performance Architecture Enhancement
**Recommendation**: [High-level performance architecture recommendation]
**Rationale**: [Why this is critical for performance and scalability]
**Implementation Approach**: [How to implement effectively]
**Expected Timeline**: [Realistic implementation timeline]
**Success Metrics**: [How to measure performance improvement]
**Investment Required**: [Resource and budget requirements]

#### 2. Performance Technology Investment
**Recommendation**: [Technology-focused performance recommendation]
**Benefits**: [Expected performance and operational benefits]
**ROI Analysis**: [Return on investment analysis]
**Implementation Risks**: [Technology risks and mitigation strategies]

#### 3. Performance Process Improvement
**Recommendation**: [Process-focused performance recommendation]
**Change Management**: [Considerations for performance culture change]
**Training Needs**: [Performance engineering training requirements]

### Operational Performance Recommendations

#### Application Performance Improvements
1. **[Performance Area 1]**: [Specific application optimization]
2. **[Performance Area 2]**: [Database performance improvement]
3. **[Performance Area 3]**: [Infrastructure optimization]

#### Performance Monitoring Enhancements
- **APM Integration**: [Application Performance Monitoring improvements]
- **Real User Monitoring**: [RUM implementation recommendations]
- **Performance Dashboards**: [Dashboard and alerting enhancements]
- **Capacity Monitoring**: [Capacity monitoring and forecasting]

## Benchmarking & Comparison

### Industry Benchmarking
- **Industry Standards**: [Comparison to industry performance standards]
- **Competitive Analysis**: [Performance compared to competitors]
- **Best Practices**: [Industry best practices assessment]

### Internal Benchmarking
- **Historical Performance**: [Comparison to historical performance]
- **System Comparison**: [Performance across different systems]
- **Environment Comparison**: [Performance across environments]

## Conclusion

### Overall Performance Assessment
The performance review of {{review_scope.systems_tested | join(", ")}} reveals an overall performance score of {{performance_assessment.overall_performance_score}}/100 (Grade: {{performance_assessment.performance_grade}}). While [positive performance aspects], there are {{issues_summary.critical_bottlenecks}} critical bottlenecks and {{issues_summary.significant_issues}} significant issues requiring immediate performance attention.

### Key Performance Takeaways
1. **[Primary Performance Conclusion]**: [Most important performance finding or theme]
2. **[Secondary Performance Insight]**: [Additional key performance insight]
3. **[Future Performance Focus]**: [Recommended performance area of focus going forward]

### Performance Maturity Assessment
- **Current Performance Maturity Level**: [Assessment of performance engineering maturity]
- **Target Performance Maturity**: [Desired performance maturity level]
- **Maturity Gap**: [Analysis of performance maturity gaps]

### Performance Investment Justification
Investment in performance improvements is critical to:
- Meeting user experience expectations
- Supporting business growth and scalability
- Maintaining competitive advantage
- Reducing infrastructure costs through efficiency
- Ensuring SLA compliance and reliability

### Next Steps
1. **Performance Response Plan**: Due by [Date]
2. **Critical Optimization Implementation**: Complete by [Date]
3. **Performance Progress Reviews**: Weekly performance status reports
4. **Follow-up Performance Review**: Scheduled for [Date]

## Appendices

### Appendix A: Detailed Performance Metrics
<!-- Complete performance metrics from all test runs -->

### Appendix B: Load Test Results
<!-- Comprehensive load test results and analysis -->

### Appendix C: System Resource Analysis
<!-- Detailed system resource utilization analysis -->

### Appendix D: Performance Optimization Matrix
<!-- Matrix of all performance optimizations with priorities and impact -->

### Appendix E: Capacity Planning Models
<!-- Detailed capacity planning models and projections -->

### Appendix F: Performance Tool Configuration
<!-- Configuration details for performance testing tools -->

### Appendix G: Performance Evidence Repository
<!-- Index of all performance test evidence and artifacts -->

### Appendix H: Benchmark Comparison Data
<!-- Detailed benchmarking data and comparisons -->

---

**Performance Review Completed**: {{completion_date || "In Progress"}}  
**Lead Performance Engineer**: {{conducted_by}}  
**Report Classification**: [Confidential/Internal/Performance Sensitive]  
**Distribution**: {{distribution_list | join(", ")}}  
**Next Performance Review Due**: [Date based on performance review cycle]  
**Performance Team Contact**: [Performance team contact information]  
**Performance Dashboard**: [Link to real-time performance dashboard if available]