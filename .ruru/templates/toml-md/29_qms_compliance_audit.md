+++
# --- Template Metadata ---
template_id = "29_qms_compliance_audit"
template_name = "QMS Compliance Audit"
template_version = "1.0.0"
template_description = "Template for comprehensive QMS compliance audit reports covering regulatory, security, and quality standards"
template_category = "qms"
template_subcategory = "audit"
created_date = "2025-08-16"
last_updated = "2025-08-16"
template_usage = "Used by QMS audit modes to document compliance audits, findings, and remediation plans across multiple standards"

# --- Core Audit Metadata ---
id = "" # << REQUIRED - Unique audit ID (e.g., QMS-AUDIT-20250816-001) >>
title = "" # << REQUIRED - Clear audit title >>
audit_type = "compliance" # << REQUIRED - Options: "compliance", "security", "quality", "process", "regulatory" >>
audit_scope = "comprehensive" # << REQUIRED - Options: "comprehensive", "focused", "targeted", "follow-up" >>
status = "🟡 In Progress" # << REQUIRED - Status indicator >>
priority = "medium" # << OPTIONAL - Options: "critical", "high", "medium", "low" >>
conducted_by = "" # << REQUIRED - QMS audit mode or team >>
audit_date = "" # << REQUIRED - ISO format date (YYYY-MM-DD) >>
completion_date = "" # << OPTIONAL - ISO format date when completed >>

# --- Audit Configuration ---
[audit_config]
standards_frameworks = [] # << REQUIRED - Array of standards (e.g., ["ISO-27001", "OWASP", "NIST"]) >>
audit_methodology = "risk-based" # << OPTIONAL - Options: "risk-based", "comprehensive", "sampling", "controls-based" >>
audit_period = "" # << REQUIRED - Time period covered (e.g., "2025-Q1", "2025-01-01 to 2025-03-31") >>
previous_audit_id = "" # << OPTIONAL - Reference to previous audit if follow-up >>
external_auditor = false # << OPTIONAL - Whether external auditor involved >>
certification_scope = [] # << OPTIONAL - Certifications in scope >>

# --- Scope & Coverage ---
[audit_scope_details]
systems_audited = [] # << REQUIRED - Array of systems/applications in scope >>
processes_audited = [] # << REQUIRED - Array of processes evaluated >>
departments = [] # << OPTIONAL - Organizational units in scope >>
locations = [] # << OPTIONAL - Physical/virtual locations audited >>
data_types = [] # << OPTIONAL - Types of data handled >>
exclusions = [] # << OPTIONAL - Items explicitly excluded from audit >>

# --- Audit Results Summary ---
[audit_summary]
total_controls_tested = 0 # << REQUIRED - Number of controls evaluated >>
compliant_controls = 0 # << REQUIRED - Number of controls meeting requirements >>
non_compliant_controls = 0 # << REQUIRED - Number of controls with gaps >>
partially_compliant = 0 # << REQUIRED - Number of controls with minor issues >>
not_applicable = 0 # << OPTIONAL - Controls not applicable >>
overall_compliance_score = 0.0 # << REQUIRED - Percentage compliance (0-100) >>

# --- Risk & Impact Assessment ---
[risk_assessment]
critical_findings = 0 # << REQUIRED - Number of critical compliance gaps >>
high_risk_findings = 0 # << REQUIRED - Number of high-risk issues >>
medium_risk_findings = 0 # << REQUIRED - Number of medium-risk issues >>
low_risk_findings = 0 # << REQUIRED - Number of low-risk issues >>
residual_risk_level = "medium" # << REQUIRED - Overall residual risk after controls >>
business_impact = "medium" # << REQUIRED - Overall business impact assessment >>

# --- Remediation Tracking ---
[remediation_status]
immediate_actions_required = 0 # << REQUIRED - Actions needed within 30 days >>
short_term_actions = 0 # << REQUIRED - Actions needed within 90 days >>
long_term_improvements = 0 # << REQUIRED - Actions for next 6-12 months >>
total_recommendations = 0 # << REQUIRED - Total number of recommendations >>
management_responses = 0 # << OPTIONAL - Number of management responses received >>

# --- Stakeholders & Communication ---
stakeholders = [] # << OPTIONAL - Array of key stakeholders >>
audit_committee = [] # << OPTIONAL - Audit committee members involved >>
approvers = [] # << REQUIRED - Array of required approvers >>
distribution_list = [] # << OPTIONAL - Report distribution list >>

# --- References & Evidence ---
evidence_repository = "" # << OPTIONAL - Path to audit evidence repository >>
working_papers = [] # << OPTIONAL - Array of working paper references >>
interview_records = [] # << OPTIONAL - Records of interviews conducted >>
document_reviews = [] # << OPTIONAL - Documents reviewed during audit >>
external_references = [] # << OPTIONAL - External guidance/standards referenced >>

# --- Certification & Compliance Context ---
regulatory_requirements = [] # << OPTIONAL - Specific regulatory requirements addressed >>
certification_bodies = [] # << OPTIONAL - Relevant certification bodies >>
compliance_deadlines = [] # << OPTIONAL - Key compliance deadlines >>
industry_standards = [] # << OPTIONAL - Industry-specific standards applied >>
+++

# QMS Compliance Audit Report

## Executive Summary

### Audit Overview
- **Audit ID**: {{id}}
- **Audit Period**: {{audit_config.audit_period}}
- **Standards Framework**: {{audit_config.standards_frameworks | join(", ")}}
- **Overall Compliance Score**: {{audit_summary.overall_compliance_score}}%
- **Residual Risk Level**: {{risk_assessment.residual_risk_level | upper}}
- **Critical Findings**: {{risk_assessment.critical_findings}}
- **Total Recommendations**: {{remediation_status.total_recommendations}}

### Key Findings
<!-- Provide high-level summary of most significant audit findings -->

### Management Summary
<!-- Executive summary for senior management highlighting key risks and required actions -->

## Audit Methodology & Approach

### Standards & Frameworks Applied
{{#each audit_config.standards_frameworks}}
- **{{this}}**: [Brief description of how this standard was applied]
{{/each}}

### Audit Methodology
- **Approach**: {{audit_config.audit_methodology}}
- **Sampling Method**: [Description of sampling approach if applicable]
- **Testing Procedures**: [Overview of testing methodologies used]
- **Evidence Gathering**: [Approach to collecting and validating evidence]

### Audit Team & Qualifications
- **Lead Auditor**: {{conducted_by}}
- **Audit Team**: [List of team members and qualifications]
- **External Expertise**: {{audit_config.external_auditor ? "External auditor involved" : "Internal audit only"}}
- **Independence**: [Statement on auditor independence]

## Scope & Coverage

### Systems & Processes Audited

#### Systems in Scope
{{#each audit_scope_details.systems_audited}}
- **{{this}}**: [Brief description and criticality]
{{/each}}

#### Processes Evaluated
{{#each audit_scope_details.processes_audited}}
- **{{this}}**: [Process description and compliance requirements]
{{/each}}

### Organizational Coverage
- **Departments**: {{audit_scope_details.departments | join(", ")}}
- **Locations**: {{audit_scope_details.locations | join(", ")}}
- **Data Types**: {{audit_scope_details.data_types | join(", ")}}

### Exclusions & Limitations
{{#each audit_scope_details.exclusions}}
- **{{this}}**: [Rationale for exclusion]
{{/each}}

## Detailed Findings & Assessment

### Compliance Status Overview

| Control Category | Total Controls | Compliant | Non-Compliant | Partially Compliant | N/A |
|-----------------|---------------|-----------|---------------|-------------------|-----|
| Security Controls | [X] | [X] | [X] | [X] | [X] |
| Access Management | [X] | [X] | [X] | [X] | [X] |
| Data Protection | [X] | [X] | [X] | [X] | [X] |
| Change Management | [X] | [X] | [X] | [X] | [X] |
| Incident Response | [X] | [X] | [X] | [X] | [X] |
| Business Continuity | [X] | [X] | [X] | [X] | [X] |
| **TOTALS** | **{{audit_summary.total_controls_tested}}** | **{{audit_summary.compliant_controls}}** | **{{audit_summary.non_compliant_controls}}** | **{{audit_summary.partially_compliant}}** | **{{audit_summary.not_applicable}}** |

### Critical Findings ({{risk_assessment.critical_findings}})

#### 🚨 Critical Finding 1: [Title]
**Control Reference**: [Standard.Section.Control]
**Risk Level**: Critical
**Business Impact**: High

**Finding Description**:
[Detailed description of the non-compliance issue]

**Root Cause Analysis**:
- **Immediate Cause**: [What directly caused the issue]
- **Contributing Factors**: [Underlying factors that enabled the issue]
- **Systemic Issues**: [Broader organizational factors if applicable]

**Compliance Gap**:
- **Required**: [What the standard requires]
- **Current State**: [What was found during audit]
- **Gap**: [Specific deficiency identified]

**Risk & Impact Assessment**:
- **Likelihood**: [Probability of exploitation/occurrence]
- **Impact**: [Potential business/operational consequences]
- **Risk Rating**: [Quantitative/qualitative risk assessment]

**Evidence**:
- [Reference to audit evidence supporting this finding]
- [Additional documentation or observations]

---

### High Risk Findings ({{risk_assessment.high_risk_findings}})

#### ⚠️ High Risk Finding 1: [Title]
**Control Reference**: [Standard.Section.Control]
**Risk Level**: High
**Business Impact**: Medium-High

**Finding Description**:
[Detailed description of the non-compliance issue]

**Compliance Gap**:
[Description of gap between required and actual state]

**Risk Assessment**:
[Assessment of risks associated with this finding]

**Evidence**:
[Supporting evidence and documentation]

---

### Medium Risk Findings ({{risk_assessment.medium_risk_findings}})

#### 🔶 Medium Risk Finding 1: [Title]
**Control Reference**: [Standard.Section.Control]
**Risk Level**: Medium
**Business Impact**: Medium

**Finding Description**:
[Brief description of the compliance issue]

**Recommended Action**:
[High-level recommendation for remediation]

---

### Low Risk Findings & Observations ({{risk_assessment.low_risk_findings}})

#### 🔹 Low Risk Finding 1: [Title]
**Control Reference**: [Standard.Section.Control]
**Finding**: [Brief description]
**Recommendation**: [Improvement suggestion]

## Positive Observations & Best Practices

### Exemplary Controls
- **[Control Area]**: [Description of well-implemented control]
- **[Best Practice]**: [Notable practice that exceeds requirements]
- **[Process Excellence]**: [Process that demonstrates maturity]

### Strengths Identified
1. **[Strength 1]**: [Description and impact]
2. **[Strength 2]**: [Description and value to organization]
3. **[Strength 3]**: [Competitive advantage or risk mitigation]

## Risk Assessment & Business Impact

### Overall Risk Profile

#### Risk Heat Map
```
           High Impact    Medium Impact    Low Impact
High Prob    🔴 [X]         🟠 [X]         🟡 [X]
Med Prob     🟠 [X]         🟡 [X]         🟢 [X]
Low Prob     🟡 [X]         🟢 [X]         🟢 [X]
```

#### Risk Categories
- **Regulatory Risk**: [Assessment of regulatory compliance risk]
- **Operational Risk**: [Risk to business operations]
- **Reputational Risk**: [Risk to organization reputation]
- **Financial Risk**: [Potential financial impact]
- **Security Risk**: [Information security and privacy risks]

### Business Impact Analysis
1. **Immediate Impacts**:
   - [Short-term consequences of current gaps]
   - [Immediate threats to operations or compliance]

2. **Long-term Consequences**:
   - [Potential long-term effects if issues not addressed]
   - [Strategic implications for the organization]

3. **Stakeholder Impact**:
   - **Customers**: [Impact on customer trust and service]
   - **Regulators**: [Regulatory concerns and potential actions]
   - **Partners**: [Effect on business partnerships]
   - **Employees**: [Impact on staff and operations]

## Management Action Plan

### Immediate Actions (0-30 days) - {{remediation_status.immediate_actions_required}} items

#### Action 1: Address Critical Finding [X]
- **Responsible Party**: [Name/Role]
- **Target Date**: [Specific date]
- **Success Criteria**: [How success will be measured]
- **Resources Required**: [Budget, staff, tools needed]
- **Risk if Not Completed**: [Consequence of inaction]

### Short-term Actions (31-90 days) - {{remediation_status.short_term_actions}} items

#### Action 1: [Action Title]
- **Responsible Party**: [Name/Role]
- **Target Date**: [Date within 90 days]
- **Dependencies**: [Prerequisites or dependencies]
- **Deliverables**: [Expected outcomes]

### Long-term Improvements (3-12 months) - {{remediation_status.long_term_improvements}} items

#### Improvement 1: [Strategic Improvement]
- **Objective**: [Long-term goal]
- **Timeline**: [Implementation timeline]
- **Investment Required**: [Resource requirements]
- **Expected Benefits**: [ROI and risk reduction]

### Governance & Oversight

#### Management Response Process
1. **Response Timeline**: Management responses due within [X] days
2. **Escalation Process**: [Process for unresolved issues]
3. **Progress Monitoring**: [How progress will be tracked]
4. **Follow-up Audit**: Scheduled for [Date] to verify remediation

#### Accountability Framework
- **Executive Sponsor**: [Senior leader accountable]
- **Program Manager**: [Person managing remediation program]
- **Control Owners**: [Individuals responsible for specific controls]
- **Audit Committee**: [Oversight and reporting structure]

## Recommendations

### Strategic Recommendations

#### 1. Governance & Risk Management Enhancement
**Recommendation**: [High-level strategic recommendation]
**Rationale**: [Why this is important for the organization]
**Implementation Approach**: [How to implement effectively]
**Expected Timeline**: [Realistic implementation timeline]
**Success Metrics**: [How to measure success]

#### 2. Process Improvement & Standardization
**Recommendation**: [Process-focused recommendation]
**Benefits**: [Expected benefits to organization]
**Change Management**: [Considerations for organizational change]

#### 3. Technology & Automation Opportunities
**Recommendation**: [Technology-related recommendation]
**ROI Justification**: [Return on investment analysis]
**Implementation Risks**: [Risks and mitigation strategies]

### Operational Recommendations

#### Control Environment Improvements
1. **[Specific Control Area]**: [Detailed recommendation]
2. **[Process Enhancement]**: [Specific process improvement]
3. **[Training & Awareness]**: [Skills and knowledge gaps to address]

#### Monitoring & Continuous Improvement
- **Control Testing**: [Recommendations for ongoing control testing]
- **Metrics & KPIs**: [Key performance indicators to track]
- **Reporting**: [Enhanced reporting recommendations]

## Conclusion

### Overall Assessment
The audit of {{audit_config.standards_frameworks | join(" and ")}} compliance for the period {{audit_config.audit_period}} reveals an overall compliance score of {{audit_summary.overall_compliance_score}}%. While [positive aspects], there are {{risk_assessment.critical_findings}} critical findings and {{risk_assessment.high_risk_findings}} high-risk issues that require immediate management attention.

### Key Takeaways
1. **[Primary Conclusion]**: [Most important finding or theme]
2. **[Secondary Insight]**: [Additional key insight]
3. **[Future Focus]**: [Recommended area of focus going forward]

### Management Commitment
Management's commitment to addressing the findings in this audit is critical to:
- Maintaining regulatory compliance
- Reducing operational and security risks
- Preserving organizational reputation
- Supporting business objectives

### Next Steps
1. **Management Response**: Due by [Date]
2. **Remediation Planning**: Complete by [Date]
3. **Progress Reviews**: Monthly progress reports
4. **Follow-up Audit**: Scheduled for [Date]

## Appendices

### Appendix A: Detailed Control Testing Results
<!-- Complete matrix of all controls tested with detailed results -->

### Appendix B: Risk Register
<!-- Comprehensive risk register with all identified risks -->

### Appendix C: Evidence Repository Index
<!-- Index of all audit evidence and supporting documentation -->

### Appendix D: Interview Summary
<!-- Summary of key personnel interviews conducted -->

### Appendix E: Document Review Results
<!-- Results of document reviews and gap analysis -->

### Appendix F: Management Responses
<!-- Management responses to audit findings (to be added post-audit) -->

---

**Audit Completed**: {{completion_date || "In Progress"}}  
**Lead Auditor**: {{conducted_by}}  
**Report Classification**: [Confidential/Internal/Restricted]  
**Distribution**: {{distribution_list | join(", ")}}  
**Next Audit Due**: [Date based on audit cycle]