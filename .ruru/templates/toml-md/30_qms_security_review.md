+++
# --- Template Metadata ---
template_id = "30_qms_security_review"
template_name = "QMS Security Review"
template_version = "1.0.0"
template_description = "Template for comprehensive QMS security review reports covering security assessment, vulnerability analysis, and remediation planning"
template_category = "qms"
template_subcategory = "security"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS security modes to document security reviews, vulnerability assessments, and security remediation plans"

# --- Core Security Review Metadata ---
id = "" # << REQUIRED - Unique security review ID (e.g., QMS-SEC-20250816-001) >>
title = "" # << REQUIRED - Clear security review title >>
review_type = "security_assessment" # << REQUIRED - Options: "security_assessment", "vulnerability_scan", "penetration_test", "code_review", "compliance_audit" >>
security_scope = "comprehensive" # << REQUIRED - Options: "comprehensive", "targeted", "focused", "follow-up" >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "high" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
conducted_by = "" # << REQUIRED - QMS security mode or team >>
review_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Security Review Configuration ---
[security_config]
security_frameworks = [] # << REQUIRED - Array of frameworks (e.g., ["OWASP", "NIST-CSF", "ISO-27001"]) >>
assessment_methodology = "risk-based" # << OPTIONAL - Options: "risk-based", "threat-modeling", "penetration-testing", "code-analysis" >>
security_domains = [] # << REQUIRED - Array of security domains (e.g., ["authentication", "authorization", "data-protection"]) >>
threat_model_reference = "" # << OPTIONAL - Reference to threat model document >>
previous_review_id = "" # << OPTIONAL - Reference to previous security review if follow-up >>
external_assessor = false # << OPTIONAL - Whether external security assessor involved >>

# --- Scope & Coverage ---
[review_scope]
systems_assessed = [] # << REQUIRED - Array of systems/applications in scope >>
network_segments = [] # << OPTIONAL - Network segments or zones assessed >>
applications = [] # << REQUIRED - Applications reviewed >>
infrastructure_components = [] # << OPTIONAL - Infrastructure components assessed >>
data_classifications = [] # << OPTIONAL - Types/classifications of data handled >>
exclusions = [] # << OPTIONAL - Items explicitly excluded from review >>
testing_approach = "black-box" # << OPTIONAL - Options: "black-box", "white-box", "gray-box" >>

# --- Security Findings Summary ---
[findings_summary]
total_vulnerabilities = 0 # << REQUIRED - Total number of vulnerabilities identified >>
critical_vulnerabilities = 0 # << REQUIRED - Number of critical severity vulnerabilities >>
high_vulnerabilities = 0 # << REQUIRED - Number of high severity vulnerabilities >>
medium_vulnerabilities = 0 # << REQUIRED - Number of medium severity vulnerabilities >>
low_vulnerabilities = 0 # << REQUIRED - Number of low severity vulnerabilities >>
informational_findings = 0 # << REQUIRED - Number of informational findings >>
false_positives = 0 # << OPTIONAL - Number of false positive findings >>

# --- Risk Assessment ---
[risk_assessment]
overall_risk_score = 0.0 # << REQUIRED - Overall security risk score (0-10) >>
residual_risk_level = "medium" # << REQUIRED - Residual risk after current controls >>
attack_surface_score = 0.0 # << OPTIONAL - Attack surface assessment score >>
exploitability_rating = "medium" # << REQUIRED - Overall exploitability assessment >>
business_impact_rating = "medium" # << REQUIRED - Potential business impact >>
likelihood_rating = "medium" # << REQUIRED - Likelihood of successful attack >>

# --- Security Controls Assessment ---
[controls_assessment]
preventive_controls = 0 # << REQUIRED - Number of preventive controls assessed >>
detective_controls = 0 # << REQUIRED - Number of detective controls assessed >>
corrective_controls = 0 # << REQUIRED - Number of corrective controls assessed >>
effective_controls = 0 # << REQUIRED - Number of effective controls >>
ineffective_controls = 0 # << REQUIRED - Number of ineffective controls >>
missing_controls = 0 # << REQUIRED - Number of missing required controls >>

# --- Remediation Tracking ---
[remediation_status]
immediate_fixes_required = 0 # << REQUIRED - Fixes needed within 24-48 hours >>
urgent_fixes = 0 # << REQUIRED - Fixes needed within 1-2 weeks >>
short_term_fixes = 0 # << REQUIRED - Fixes needed within 30-90 days >>
long_term_improvements = 0 # << REQUIRED - Strategic improvements (3-12 months) >>
total_recommendations = 0 # << REQUIRED - Total number of security recommendations >>
accepted_risks = 0 # << OPTIONAL - Number of risks accepted by management >>

# --- Compliance & Standards ---
compliance_frameworks = [] # << OPTIONAL - Compliance frameworks assessed (e.g., ["PCI-DSS", "GDPR", "HIPAA"]) >>
regulatory_requirements = [] # << OPTIONAL - Specific regulatory requirements addressed >>
industry_standards = [] # << OPTIONAL - Industry security standards applied >>
certification_scope = [] # << OPTIONAL - Security certifications in scope >>

# --- Stakeholders & Communication ---
stakeholders = [] # << OPTIONAL - Array of key stakeholders >>
security_team = [] # << OPTIONAL - Security team members involved >>
approvers = [] # << REQUIRED - Array of required approvers >>
distribution_list = [] # << OPTIONAL - Report distribution list >>

# --- Evidence & References ---
evidence_repository = "" # << OPTIONAL - Path to security evidence repository >>
scan_results = [] # << OPTIONAL - Array of security scan result references >>
test_reports = [] # << OPTIONAL - Penetration test or assessment reports >>
tool_outputs = [] # << OPTIONAL - Security tool output references >>
external_references = [] # << OPTIONAL - External security guidance/standards >>
+++

# QMS Security Review Report

## Executive Summary

### Security Review Overview
- **Review ID**: {{id}}
- **Review Date**: {{review_date}}
- **Security Frameworks**: {{security_config.security_frameworks | join(", ")}}
- **Overall Risk Score**: {{risk_assessment.overall_risk_score}}/10
- **Residual Risk Level**: {{risk_assessment.residual_risk_level | upper}}
- **Critical Vulnerabilities**: {{findings_summary.critical_vulnerabilities}}
- **High Vulnerabilities**: {{findings_summary.high_vulnerabilities}}
- **Total Recommendations**: {{remediation_status.total_recommendations}}

### Key Security Findings
<!-- Provide executive summary of most critical security findings -->

### Security Posture Assessment
<!-- High-level assessment of overall security posture and maturity -->

### Management Summary
<!-- Executive summary for leadership highlighting key risks and required immediate actions -->

## Security Assessment Methodology

### Assessment Framework & Standards
{{#each security_config.security_frameworks}}
- **{{this}}**: [Description of how this framework was applied]
{{/each}}

### Assessment Approach
- **Methodology**: {{security_config.assessment_methodology}}
- **Testing Approach**: {{review_scope.testing_approach}}
- **Security Domains**: {{security_config.security_domains | join(", ")}}
- **Assessment Tools**: [List of security tools and techniques used]

### Assessment Team & Qualifications
- **Lead Security Assessor**: {{conducted_by}}
- **Assessment Team**: [List of team members and security certifications]
- **External Expertise**: {{security_config.external_assessor ? "External security assessor involved" : "Internal assessment only"}}
- **Independence**: [Statement on assessor independence and objectivity]

## Scope & Coverage

### Systems & Applications Assessed

#### Systems in Scope
{{#each review_scope.systems_assessed}}
- **{{this}}**: [System description, criticality, and security context]
{{/each}}

#### Applications Reviewed
{{#each review_scope.applications}}
- **{{this}}**: [Application description, exposure, and data handling]
{{/each}}

### Infrastructure & Network Assessment
- **Network Segments**: {{review_scope.network_segments | join(", ")}}
- **Infrastructure Components**: {{review_scope.infrastructure_components | join(", ")}}
- **Data Classifications**: {{review_scope.data_classifications | join(", ")}}

### Assessment Exclusions & Limitations
{{#each review_scope.exclusions}}
- **{{this}}**: [Rationale for exclusion and potential security implications]
{{/each}}

## Security Findings & Vulnerability Analysis

### Vulnerability Distribution Overview

| Severity | Count | Percentage | CVSS Range | Action Required |
|----------|-------|------------|------------|----------------|
| 🔴 Critical | {{findings_summary.critical_vulnerabilities}} | [X%] | 9.0-10.0 | Immediate |
| 🟠 High | {{findings_summary.high_vulnerabilities}} | [X%] | 7.0-8.9 | Urgent (1-2 weeks) |
| 🟡 Medium | {{findings_summary.medium_vulnerabilities}} | [X%] | 4.0-6.9 | Short-term (30-90 days) |
| 🟢 Low | {{findings_summary.low_vulnerabilities}} | [X%] | 0.1-3.9 | Long-term planning |
| ℹ️ Info | {{findings_summary.informational_findings}} | [X%] | N/A | Awareness |
| **TOTAL** | **{{findings_summary.total_vulnerabilities}}** | **100%** | | |

### Critical Security Vulnerabilities ({{findings_summary.critical_vulnerabilities}})

#### 🔴 Critical Vulnerability 1: [Vulnerability Title]
**CVE/Reference**: [CVE-YYYY-XXXXX or internal reference]
**CVSS Score**: [X.X] (Critical)
**Affected Systems**: [List of affected systems/applications]

**Vulnerability Description**:
[Detailed technical description of the vulnerability]

**Attack Vector & Exploitability**:
- **Attack Vector**: [Network/Adjacent/Local/Physical]
- **Attack Complexity**: [Low/High]
- **Privileges Required**: [None/Low/High]
- **User Interaction**: [None/Required]
- **Exploitability**: [Proof of concept available/Active exploitation/Theoretical]

**Business Impact Assessment**:
- **Confidentiality Impact**: [High/Medium/Low/None]
- **Integrity Impact**: [High/Medium/Low/None]
- **Availability Impact**: [High/Medium/Low/None]
- **Potential Business Consequences**: [Description of business impact]

**Technical Details**:
```
[Technical details, code snippets, or configuration examples]
```

**Proof of Concept**:
[Steps to reproduce or evidence of exploitability if applicable]

**Root Cause Analysis**:
- **Primary Cause**: [What directly caused the vulnerability]
- **Contributing Factors**: [Design, implementation, or configuration factors]
- **Systemic Issues**: [Broader organizational or process factors]

**Evidence**:
- [Screenshots, scan results, or other supporting evidence]
- [Tool outputs or manual testing results]

---

### High Severity Vulnerabilities ({{findings_summary.high_vulnerabilities}})

#### 🟠 High Vulnerability 1: [Vulnerability Title]
**CVSS Score**: [X.X] (High)
**Affected Systems**: [Systems affected]

**Vulnerability Description**:
[Description of the high severity vulnerability]

**Attack Scenario**:
[Realistic attack scenario and exploitation path]

**Business Risk**:
[Assessment of business risk and potential impact]

**Technical Evidence**:
[Supporting technical evidence]

---

### Medium Severity Vulnerabilities ({{findings_summary.medium_vulnerabilities}})

#### 🟡 Medium Vulnerability 1: [Vulnerability Title]
**CVSS Score**: [X.X] (Medium)
**Summary**: [Brief description of vulnerability and impact]
**Recommendation**: [High-level remediation approach]

---

### Low Severity & Informational Findings ({{findings_summary.low_vulnerabilities + findings_summary.informational_findings}})

#### 🟢 Low/Info Finding 1: [Finding Title]
**Type**: Low Risk / Informational
**Finding**: [Brief description]
**Recommendation**: [Improvement suggestion]

## Security Controls Assessment

### Control Effectiveness Analysis

#### Preventive Controls ({{controls_assessment.preventive_controls}} assessed)
- **Effective Controls**: {{controls_assessment.effective_controls}}
- **Ineffective Controls**: {{controls_assessment.ineffective_controls}}
- **Missing Controls**: {{controls_assessment.missing_controls}}

| Control Category | Implemented | Effective | Partially Effective | Ineffective | Missing |
|-----------------|-------------|-----------|-------------------|-------------|---------|
| Access Controls | [X] | [X] | [X] | [X] | [X] |
| Authentication | [X] | [X] | [X] | [X] | [X] |
| Authorization | [X] | [X] | [X] | [X] | [X] |
| Data Protection | [X] | [X] | [X] | [X] | [X] |
| Network Security | [X] | [X] | [X] | [X] | [X] |
| Logging & Monitoring | [X] | [X] | [X] | [X] | [X] |
| Incident Response | [X] | [X] | [X] | [X] | [X] |
| Vulnerability Management | [X] | [X] | [X] | [X] | [X] |

### Control Gaps & Deficiencies

#### Critical Control Gaps
1. **[Control Area]**: [Description of missing or ineffective critical control]
2. **[Control Area]**: [Description of gap and security implication]
3. **[Control Area]**: [Critical control deficiency]

#### Control Improvement Opportunities
- **[Control Enhancement]**: [Specific improvement recommendation]
- **[Process Improvement]**: [Process-related control enhancement]
- **[Technology Enhancement]**: [Technology-based control improvement]

## Risk Assessment & Business Impact

### Overall Security Risk Profile

#### Risk Heat Map
```
           High Impact    Medium Impact    Low Impact
High Like    🔴 [X]         🟠 [X]         🟡 [X]
Med Like     🟠 [X]         🟡 [X]         🟢 [X]
Low Like     🟡 [X]         🟢 [X]         🟢 [X]
```

#### Risk Categories Assessment
- **Data Breach Risk**: {{risk_assessment.overall_risk_score}}/10 - [Assessment]
- **System Compromise Risk**: [Score]/10 - [Assessment]
- **Availability Risk**: [Score]/10 - [Assessment]
- **Compliance Risk**: [Score]/10 - [Assessment]
- **Reputational Risk**: [Score]/10 - [Assessment]

### Attack Surface Analysis
- **External Attack Surface**: [Assessment of externally accessible services]
- **Internal Attack Surface**: [Assessment of internal network exposure]
- **Application Attack Surface**: [Web application and API security assessment]
- **Physical Security**: [Physical access controls and security]

### Threat Landscape Assessment
1. **Current Threat Actors**: [Relevant threat actors for organization]
2. **Attack Trends**: [Current attack trends and techniques]
3. **Industry-Specific Threats**: [Threats specific to industry sector]
4. **Emerging Threats**: [New or evolving security threats]

### Business Impact Analysis
1. **Immediate Security Risks**:
   - [Short-term consequences of current vulnerabilities]
   - [Active threats to operations or data]

2. **Long-term Security Implications**:
   - [Potential long-term effects if issues not addressed]
   - [Strategic security implications for the organization]

3. **Stakeholder Impact Assessment**:
   - **Customers**: [Impact on customer data and trust]
   - **Regulators**: [Regulatory concerns and potential sanctions]
   - **Partners**: [Effect on business partnerships and supply chain]
   - **Employees**: [Impact on employee data and operations]

## Security Remediation Plan

### Immediate Actions (0-48 hours) - {{remediation_status.immediate_fixes_required}} items

#### Action 1: Address Critical Vulnerability [X]
- **Responsible Party**: [Security team member/role]
- **Target Completion**: [Specific date/time]
- **Success Criteria**: [How success will be measured]
- **Resources Required**: [Personnel, tools, budget needed]
- **Risk if Delayed**: [Consequence of not completing immediately]
- **Verification Method**: [How fix will be validated]

### Urgent Actions (1-2 weeks) - {{remediation_status.urgent_fixes}} items

#### Action 1: [High Priority Security Fix]
- **Responsible Party**: [Name/Role]
- **Target Date**: [Date within 2 weeks]
- **Dependencies**: [Prerequisites or dependencies]
- **Deliverables**: [Expected security outcomes]
- **Testing Plan**: [Security testing approach]

### Short-term Actions (30-90 days) - {{remediation_status.short_term_fixes}} items

#### Action 1: [Security Enhancement]
- **Objective**: [Security improvement goal]
- **Implementation Plan**: [Detailed implementation steps]
- **Resource Requirements**: [Personnel, tools, training needed]
- **Success Metrics**: [Security metrics to track improvement]

### Long-term Security Improvements (3-12 months) - {{remediation_status.long_term_improvements}} items

#### Improvement 1: [Strategic Security Initiative]
- **Strategic Goal**: [Long-term security objective]
- **Implementation Timeline**: [Phased implementation approach]
- **Investment Required**: [Budget and resource requirements]
- **Expected Security Benefits**: [ROI and risk reduction]
- **Integration Points**: [Integration with existing security programs]

### Security Governance & Oversight

#### Security Response Management
1. **Response Timeline**: Security team responses due within [X] hours
2. **Escalation Process**: [Process for critical security issues]
3. **Progress Monitoring**: [How remediation progress will be tracked]
4. **Follow-up Assessment**: Scheduled for [Date] to verify fixes

#### Security Accountability Framework
- **CISO/Security Leader**: [Senior leader accountable for security]
- **Security Program Manager**: [Person managing remediation program]
- **System Owners**: [Individuals responsible for specific systems]
- **Risk Committee**: [Security oversight and reporting structure]

## Security Recommendations

### Strategic Security Recommendations

#### 1. Security Architecture Enhancement
**Recommendation**: [High-level security architecture recommendation]
**Rationale**: [Why this is critical for organizational security]
**Implementation Approach**: [How to implement securely and effectively]
**Expected Timeline**: [Realistic implementation timeline]
**Success Metrics**: [How to measure security improvement]

#### 2. Security Process Improvement
**Recommendation**: [Process-focused security recommendation]
**Benefits**: [Expected security and operational benefits]
**Change Management**: [Considerations for security culture change]

#### 3. Security Technology Investment
**Recommendation**: [Technology-related security recommendation]
**ROI Justification**: [Return on security investment analysis]
**Implementation Risks**: [Security risks and mitigation strategies]

### Operational Security Recommendations

#### Security Operations Improvements
1. **[Security Monitoring]**: [Specific SIEM/SOC enhancement]
2. **[Incident Response]**: [Incident response capability improvement]
3. **[Vulnerability Management]**: [Vuln mgmt process enhancement]

#### Security Training & Awareness
- **Security Awareness Training**: [Employee security training recommendations]
- **Technical Security Training**: [Technical team security skills development]
- **Security Culture**: [Organizational security culture initiatives]

## Compliance & Regulatory Assessment

### Regulatory Compliance Status
{{#each compliance_frameworks}}
#### {{this}} Compliance Assessment
- **Overall Compliance**: [Percentage or status]
- **Key Gaps**: [Major compliance gaps identified]
- **Remediation Priority**: [Priority for addressing gaps]
- **Regulatory Risk**: [Assessment of regulatory risk]
{{/each}}

### Industry Standards Adherence
- **Security Standards**: [Assessment against industry security standards]
- **Best Practices**: [Adherence to security best practices]
- **Benchmarking**: [Comparison to industry security benchmarks]

## Conclusion

### Overall Security Assessment
The security review of {{review_scope.systems_assessed | join(", ")}} reveals an overall security risk score of {{risk_assessment.overall_risk_score}}/10. While [positive security aspects], there are {{findings_summary.critical_vulnerabilities}} critical vulnerabilities and {{findings_summary.high_vulnerabilities}} high-risk issues requiring immediate security attention.

### Key Security Takeaways
1. **[Primary Security Conclusion]**: [Most important security finding or theme]
2. **[Secondary Security Insight]**: [Additional key security insight]
3. **[Future Security Focus]**: [Recommended security area of focus going forward]

### Security Posture Maturity
- **Current Security Maturity Level**: [Assessment of security maturity]
- **Target Security Maturity**: [Desired security maturity level]
- **Maturity Gap**: [Analysis of security maturity gaps]

### Management Security Commitment
Management commitment to addressing security findings is critical to:
- Protecting organizational assets and data
- Maintaining customer and stakeholder trust
- Meeting regulatory and compliance obligations
- Reducing cyber risk exposure
- Supporting business continuity objectives

### Next Steps
1. **Security Response Plan**: Due by [Date]
2. **Critical Fix Implementation**: Complete by [Date]
3. **Security Progress Reviews**: Weekly security status reports
4. **Follow-up Security Assessment**: Scheduled for [Date]

## Appendices

### Appendix A: Detailed Vulnerability Registry
<!-- Complete registry of all vulnerabilities with CVSS scores and details -->

### Appendix B: Security Control Matrix
<!-- Comprehensive matrix of all security controls assessed -->

### Appendix C: Risk Register
<!-- Detailed security risk register with likelihood and impact -->

### Appendix D: Security Tool Output Summary
<!-- Summary of all security tool results and findings -->

### Appendix E: Threat Model Reference
<!-- Reference to threat model and attack scenarios -->

### Appendix F: Security Evidence Repository
<!-- Index of all security assessment evidence and artifacts -->

### Appendix G: Security Remediation Tracking
<!-- Detailed tracking matrix for all security remediation activities -->

---

**Security Review Completed**: {{completion_date || "In Progress"}}  
**Lead Security Assessor**: {{conducted_by}}  
**Report Classification**: [Confidential/Restricted/Internal Use Only]  
**Distribution**: {{distribution_list | join(", ")}}  
**Next Security Review Due**: [Date based on security review cycle]  
**Security Contact**: [Security team contact information]