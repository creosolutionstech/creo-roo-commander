# 👑 Roo Commander: An Advanced Multi-Agent Framework for Roo Code

> Roo Commander helps developers using Roo Code manage complex software projects by orchestrating specialized AI agents within VS Code, improving structure, context management, and task delegation.

Roo Commander is an advanced configuration layer and opinionated workflow system *built specifically for* the [Roo Code](https://github.com/RooVetGit/Roo-Code) VS Code extension. It transforms your Roo Code experience by implementing a sophisticated framework for managing software development projects using a structured, **multi-agent approach**. Imagine having a virtual, specialized software team within your VS Code workspace, orchestrated by the 👑 Roo Commander, to handle tasks with specific expertise and maintain a clear project history.

---
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jezweb/roo-commander)

**🐾 Join the Community:** [Roo Commander Discord](https://discord.gg/ESaJBnw7As)

**💫 Support Roo Commander:**  [Donate with Buy me a Coffee](https://buymeacoffee.com/jezweb)

---

## What is Roo Commander?

Roo Commander isn't just a collection of modes; it's an **opinionated workflow and project management system** (meaning it prescribes specific structures and processes for optimal results) built on top of Roo Code. It addresses the challenges of complex projects and context limitations in LLMs by:

*   **Specialized Roles:** Assigning tasks to **AI Agents (modes)** with specific expertise (e.g., React, API Design, Git, AWS, Testing).
*   **Structured Communication:** Using a defined task delegation and reporting system.
*   **Persistent Context:** Leveraging a structured project journal (`.ruru/tasks/`, `.ruru/decisions/`, etc.) and standardized document formats (TOML+Markdown) to maintain state and history effectively.
*   **Standardized Processes:** Defining reusable workflows and procedures for common development activities.

The goal is to bring structure, consistency, traceability, and the power of specialized AI skills to your development process.

## Why Use Roo Commander?

*   **🧠 Specialized Expertise:** Delegate tasks to the right AI expert (e.g., let the `framework-react` mode handle React code, not a generalist).
*   **🏗️ Structured Workflow:** Breaks down complex goals into manageable, trackable tasks using a defined system (MDTM - Markdown Task Management).
*   **💾 Enhanced Context Management:** Mitigates LLM context window limitations through structured logging and dedicated context retrieval agents.
*   **🔍 Traceability & Auditability:** Creates a clear history of tasks, decisions (ADRs), and actions within your project repository.
*   **⚙️ Consistency:** Promotes consistent project structure, documentation formats, and development processes.
*   **🚀 Potential for Automation:** The structured nature enables more reliable automation of complex development sequences.

## Core Concepts

To get the most out of Roo Commander, it helps to understand these key ideas:

1.  **Multi-Agent System (The "Team"):**
    *   Think of Roo Commander as managing a team of specialized **AI agents (called 'modes'** within Roo Code). They have a loose hierarchy (Commander, Managers, Specialists, etc.).
    *   The main Commander mode analyzes your goals and delegates tasks to the most suitable specialist using a specific command (`new_task`).
    *   *(You can find a detailed list of available roles in your installation under `.ruru/modes/roo-commander/kb/kb-available-modes-summary.md`)*

2.  **Structured Project Artifacts (TOML+Markdown):**
    *   Roo Commander maintains project history and context using standardized files. Key information like tasks, decisions, and documentation are stored in dedicated hidden folders (like `.ruru/tasks/`, `.ruru/decisions/`).
    *   These files use a consistent **TOML+Markdown format**: machine-readable TOML metadata at the top (for status, IDs, tags) and human-readable Markdown below. This structure ensures consistency and helps the AI track progress.
    *   *(See rules `01-...` and `02-...` in `.roo/rules/` for format/folder details after installation)*.
    *   **Example Task Snippet (`.ruru/tasks/TASK-001.md`):**
        ```toml
        +++
        id = "TASK-001"
        status = "pending"
        assignee = "framework-react"
        tags = ["ui", "login"]
        +++

        ## Implement Login Button

        Create the main login button component based on the Figma design...
        ```

3.  **Agent Instructions (Rules & Knowledge Bases):** Each AI agent's behavior is guided by:
    *   **Rules (`.roo/rules/`):** Core instructions, procedures, and logic loaded directly into the AI's context for immediate use.
    *   **Knowledge Base (`.ruru/modes/<slug>/kb/`):** Detailed references, templates, and examples specific to an agent's expertise. These are looked up *on demand* when needed, keeping the main context focused while providing deep knowledge access.

## Key Features

*   **👑 Central Coordinator:** Roo Commander orchestrates workflows and delegates tasks.
*   **🚦 Project Onboarding:** Streamlined process for initializing new projects or analyzing existing ones.
*   **📋 Task Management (MDTM):** Structured task tracking using TOML+Markdown files (`.ruru/tasks/`), following the Markdown Task Management system.
*   **📖 Context Management:** Dedicated agents (`agent-context-resolver`, `agent-context-condenser`) help manage and summarize project information.
*   **🛠️ Specialist Modes:** A wide range of modes covering various frameworks (React, Vue, Angular, Next.js, Laravel, Django, FastAPI, etc.), cloud platforms (AWS, Azure, GCP), databases (SQL, NoSQL), design tools (Tailwind, MUI, Bootstrap), testing, DevOps, security, and utilities.
*   **📝 Decision Logging (ADRs):** Formal process for recording significant Architectural Decision Records in `.ruru/decisions/`.
*   **🧩 Standardized Workflows & Processes:** Reusable definitions in `.ruru/workflows/` and `.ruru/processes/`.
*   **⏱️ Session Management (New in V7):** Enhances traceability and context by introducing optional, structured **Session Logs**.
    *   **Goal:** To provide a persistent record of a user's interaction focused on a specific objective, complementing MDTM tasks.
    *   **Session Log (`session_log.md`):** A TOML+Markdown file created in a dedicated directory (e.g., `.ruru/sessions/SESSION-[Goal]-[Timestamp]/`). It includes metadata (ID, title, status, related tasks, artifacts) and a chronological log of significant events.
    *   **Artifacts:** An `artifacts/` subdirectory within the session folder stores contextual notes (e.g., decisions, learnings, research) in organized subfolders like `notes/`, `learnings/`, etc.
    *   **How it works:** Coordinator modes can initiate a session, creating the log and artifact structure. All modes then contribute to the active session log when performing tasks, linking their work back to the overall session goal.

## Getting Started (Installation)

> **Prerequisite:** You must have the [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) VS Code extension installed and configured first.

The recommended installation method uses the pre-built release:

1.  **Download:** Go to the [Roo Commander Releases page](https://github.com/jezweb/roo-commander/releases) and download the latest `roo-commander-vX.Y.Z-Codename.zip` file. *(Currently: `roo-commander-v7.1.2-Wallaby.zip`)*
2.  **Extract:** Unzip the contents directly into the **root directory** of your VS Code project workspace. This is the top-level folder containing your code, `.git` directory (if applicable), etc.
    *   *This will create/overwrite hidden folders like `.ruru/` and `.roo/` in your workspace root, containing the Roo Commander configurations and modes.*
3.  **Reload VS Code:** Reload the VS Code window (`Ctrl+Shift+P` or `Cmd+Shift+P` -> `"Developer: Reload Window"`) to ensure Roo Code recognizes the new mode configurations.

This will add/overwrite the necessary hidden configuration folders (`.ruru/modes`, `.roo`, `.ruru/templates`, etc.) and files (`.roomodes`).
## Release Notes

*   [v7.1.5](./.ruru/docs/release-notes/v7.1.5.md)

## Basic Usage

1.  **Activate Commander:** Select the `"👑 Roo Commander"` mode in the Roo Code chat interface.
2.  **State Your Goal:** Tell Commander what you want to achieve (e.g., `"Start planning a new Python API using FastAPI"`, `"Implement the login UI based on the design in .docs/designs/login.md"`, `"Fix the bug described in task BUG-123"`).
3.  **Interact:** Follow Commander's lead. It will likely:
    *   Ask clarifying questions.
    *   Propose a plan or workflow.
    *   Delegate tasks to specialist modes (using `new_task`).
    *   Ask for your approval or feedback on steps or results.
4.  **Review:** Check the files created/modified by the modes, especially in the `.ruru/tasks/` directory, to understand the progress and details.

## Recommended Setup (Optional, for Optimal Performance)

While Roo Commander works out-of-the-box, these steps are recommended for the best experience, especially on complex projects:

### 1. Large Context Window API

Roo Commander performs best when connected to an LLM provider offering a large context window (1 million tokens or more). This allows the underlying AI models to maintain more information about your project during complex tasks. *(Note: While free tiers may exist, using large context window models via APIs can incur costs depending on your usage and the provider's pricing. Please check the provider's terms.)*

*   **Recommended Models (via Vertex AI API):**
    *   `gemini-2.5-pro-exp-03-25`
    *   `gemini-2.5-pro-preview-03-25`

*   **Setup Guide:** Learn how to configure the Vertex AI API provider in Roo Code, including accessing models like `gemini-2.5-pro-exp-03-25` potentially for free (as of April 2025):
    *   **Video Tutorial:** [Setting up Gemini 2.5 Pro (Free Tier) via Vertex AI for Roo Code](https://vimeo.com/1075028909/098f77b209)
    *   **Official Roo Code Docs:** [Vertex AI Provider Setup](https://docs.roocode.com/providers/vertex)

### 2. Model Context Protocol (MCP) Servers

MCP (Model Context Protocol) servers are separate helper applications that provide Roo Commander's AI agents with additional tools and capabilities beyond standard LLM functions, such as live web searching or advanced file system interactions. Installing relevant MCP servers is highly recommended.

*   **Vertex AI MCP Server:** Provides tools for web search-augmented queries, documentation lookups, code generation, and advanced file system operations.
    *   **Repository & Installation:** [`shariqriazz/vertex-ai-mcp-server`](https://github.com/shariqriazz/vertex-ai-mcp-server) (Includes easy NPM install option)
*   **GitHub MCP Server:** Offers tools for interacting with GitHub repositories.
    *   **Repository:** [`github/github-mcp-server`](https://github.com/github/github-mcp-server)

*(Refer to Roo Commander's initial prompt (Option 0) or the `agent-mcp-manager` mode for installing and managing MCP servers.)*


## 🔍 Quality Management System (QMS)

Roo Commander includes a comprehensive **Quality Management System (QMS)** that provides enterprise-grade quality assurance throughout the software development lifecycle. The QMS ensures consistent, high-quality code delivery through automated standards enforcement, structured review processes, and comprehensive metrics tracking.

### 🎯 QMS Core Features

*   **Multi-Language Coding Standards:** Automated enforcement for Go, Python, TypeScript, JavaScript, and other languages
*   **4-Step Code Review Process:** Mandatory quality validation covering functional, quality, testing, and security aspects
*   **Real-time Quality Metrics:** Live compliance scoring and trend analysis with comprehensive dashboards
*   **Definition of Done/Ready Validation:** Automated checks ensuring requirements are properly defined before development
*   **GitHub Integration:** Branch protection, status checks, automated PR workflows, and merge restrictions
*   **Observability & Monitoring:** OpenTelemetry integration with Jaeger tracing for performance monitoring
*   **Compliance Auditing:** Automated audit trails and compliance reporting

### 🔧 QMS Components

#### **Quality Management Modes:**
*   **`qms-quality-coordinator`:** Central orchestrator managing quality workflows and coordination
*   **`qms-coding-standards`:** Multi-language coding standards enforcement engine
*   **`qms-code-reviewer`:** 4-step systematic code review workflow implementation
*   **`qms-dod-validator`:** Definition of Done validation and compliance checking
*   **`qms-dor-validator`:** Definition of Ready validation ensuring proper requirements
*   **`qms-testing-specialist`:** Comprehensive testing strategy and validation
*   **`qms-security-scanner`:** Automated security scanning and vulnerability assessment
*   **`qms-compliance-coordinator`:** Compliance monitoring and audit coordination
*   **`qms-metrics-reporter`:** Real-time quality metrics collection and dashboard reporting
*   **`lead-qms-observability`:** Observability infrastructure management and monitoring

#### **Language-Specific QMS Modes:**
*   **`dev-golang-qms`:** Go-specific quality standards and best practices
*   **`dev-python-qms`:** Python-specific quality standards and best practices
*   **`dev-react-qms`:** React/TypeScript quality standards and best practices
*   **`util-typescript-qms`:** TypeScript utility and quality standards

### 📊 Quality Gates & Workflows

#### **Automated Quality Gates:**
*   **Pre-commit Hooks:** Code formatting, linting, and basic quality checks
*   **CI/CD Pipeline Gates:** Automated testing, security scanning, and compliance validation
*   **Branch Protection:** Mandatory status checks and review requirements
*   **Merge Restrictions:** Quality score thresholds for merge approvals

#### **4-Step Code Review Process:**
1. **Functional Review:** Code functionality and business logic validation
2. **Quality Review:** Code quality, maintainability, and best practices
3. **Testing Review:** Test coverage and test quality assessment
4. **Security Review:** Security vulnerability scanning and compliance checks

### 🎛️ Using the QMS

#### **Basic Usage:**
1. **Enable QMS Mode:** Select `"qms-quality-coordinator"` mode in Roo Code
2. **Set Quality Standards:** Configure project-specific quality requirements
3. **Run Quality Checks:** Execute automated quality assessments
4. **Review Results:** Analyze quality metrics and compliance reports
5. **Address Issues:** Fix identified quality violations and re-run checks

#### **Development Workflow:**
```bash
# Enable QMS for your project
1. Select qms-quality-coordinator mode
2. Run "Initialize QMS for project"
3. Configure quality standards
4. Enable automated quality gates
```

#### **Code Review Process:**
```bash
1. Submit code for review
2. QMS automatically runs 4-step review
3. Address any quality violations
4. Re-submit until quality gates pass
5. Approved code can be merged
```

### 📈 Quality Metrics Dashboard

The QMS provides real-time quality metrics including:
*   **Compliance Scores:** Overall project quality compliance percentage
*   **Standards Violations:** Count and severity of coding standard violations
*   **Code Review Status:** Pass/fail rates for quality gates
*   **Test Coverage:** Automated test coverage metrics
*   **Security Issues:** Identified security vulnerabilities and fixes
*   **Performance Metrics:** Application performance and optimization opportunities

### 🔐 Security & Compliance

#### **Security Features:**
*   **Automated Security Scanning:** Continuous vulnerability assessment
*   **Dependency Analysis:** Third-party library security checks
*   **Code Security Review:** Automated security best practice validation
*   **Audit Trails:** Complete security event logging and reporting

#### **Compliance Standards:**
*   **OWASP Top 10:** Web application security standards
*   **CIS Benchmarks:** Security configuration standards
*   **Language-Specific Standards:** Go, Python, TypeScript security guidelines
*   **Industry Regulations:** GDPR, HIPAA, SOC 2 compliance frameworks

### 🚀 Benefits of Using QMS

*   **Consistent Quality:** Standardized processes ensure consistent code quality
*   **Reduced Technical Debt:** Proactive identification and resolution of quality issues
*   **Faster Delivery:** Automated quality gates prevent quality issues from reaching production
*   **Better Security:** Continuous security scanning and automated vulnerability fixes
*   **Improved Maintainability:** Enforced coding standards and best practices
*   **Regulatory Compliance:** Automated compliance checking and audit trails
*   **Team Productivity:** Clear quality expectations and automated validation

### ⚙️ QMS Configuration

#### **Quality Standards Configuration:**
```toml
# .ruru/config/qms-standards.toml
[standards]
enforce_coding_standards = true
require_code_reviews = true
minimum_test_coverage = 80
security_scan_enabled = true

[languages.go]
enforce_formatting = true
require_documentation = true

[languages.python]
max_complexity = 10
require_type_hints = true
```

## Contributing

*(Optional: Add guidelines if you welcome contributions)*

## License

This project is licensed under the MIT License - see the [`LICENSE`](./LICENSE) file for details.

---

Command your virtual team and build amazing things!
