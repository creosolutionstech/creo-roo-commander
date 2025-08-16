+++
id = "qms-structured-logging-standards"
title = "Structured Logging Standards"
version = 1.0
status = "draft"
effective_date = "2025-08-16"
scope = "QMS Phase 4 – Observability (system-wide structured logging across services)"
owner = "QMS Observability Committee"
template_schema_doc = ".ruru/templates/toml-md/14_standard_guideline.README.md"
tags = ["QMS", "observability", "logging", "structured-logging", "standards"]
related_docs = [
  ".ruru/docs/qms/observability/jaeger-tracing-configuration.md"
]
related_tasks = []
+++

# Structured Logging Standards (v1.0)

**Status:** draft | **Effective Date:** 2025-08-16 | **Owner:** QMS Observability Committee

## Purpose / Goal 🎯

Establish a unified set of **structured logging standards** for all Creo products so that:

- Engineers can reliably search, parse, and aggregate logs across services.
- Operational staff and SREs can correlate logs with distributed traces (OpenTelemetry) and metrics.
- Compliance auditors can confirm that privacy-sensitive data is properly scrubbed and that required quality-metric events are captured.
- Teams share a common vocabulary, JSON schema, and log-level taxonomy, reducing onboarding and troubleshooting time.
- The standards fulfil the QMS Phase-4 observability requirements (Structured-Logging-001 through Structured-Logging-010).

## Scope 🗺️

These standards apply to **all first-party codebases** (microservices, CLI tools, batch jobs, back-end-for-front-ends, etc.) maintained by Creo that emit application logs, regardless of language or runtime (Node.js/TypeScript, Python, Go, Java, etc.) and in every deployment environment (local, CI, dev, staging, production).

They **do not** cover:

- Logs generated solely by third-party infrastructure/SaaS (e.g., managed databases, load balancers) **unless** the service allows custom log enrichment by Creo code.
- End-user browser console logs (handled by separate client-side telemetry guidelines).

Third-party components integrated into Creo services **must** be configured, where feasible, to emit logs conforming to these standards or to be re-shaped by a side-car/collector before ingestion.

## Standard / Guideline Details 📜

### Rule/Guideline 1: Multi-Language Implementation (Node.js/TypeScript, Python, Go, Java)

Each first-party codebase **MUST** implement structured logging through a Creo-maintained wrapper library per language. The wrapper ensures:
1. Emission of newline-delimited JSON objects.
2. Automatic injection of standard fields defined in §4 (`service_name`, `env`, `trace_id`, `span_id`, etc.).
3. Seamless propagation of OpenTelemetry context.
4. Centralised runtime configuration (§6) via environment variables and the Creo Config Service.

| Language | Approved Base Library | Creo Wrapper Package | Key Features |
|----------|----------------------|----------------------|--------------|
| Node.js / TypeScript | `pino` v8+ | `@creo/logging-node` | Async transports, HTTP serializer, Error flattening |
| Python | `structlog` ≥24 | `creo_logging_py` | Contextvars support, FastAPI middleware |
| Go | `uber-go/zap` v1.27+ | `github.com/creo/logging-go` | Gin/Echo handlers, zap.SugaredLogger wrapper |
| Java | Logback 1.4 + `logstash-encoder` | `com.creo.logging-java` | SLF4J facade, Spring Boot auto-config |

Implementation rules:
- `logger.<level>(message, fields?)` **SHOULD** be the canonical API surface across languages.
- Wrapper **MUST** default to `INFO` level in prod, `DEBUG` in local/dev unless overridden.
- Wrapper **MUST NOT** pretty-print or colorise output in production.
- New services **MUST** adopt the wrapper immediately; existing services **MUST** migrate by **Q2 2026**.
- Sample code snippets **MUST** be referenced in the companion repository `creo-observability-examples`.


### Rule/Guideline 2: OpenTelemetry Correlation and Trace Context Integration

All structured logs **MUST** embed OpenTelemetry trace context so log events can be correlated with distributed traces across Creo services.

#### Standard Correlation Fields

| Field              | Type                | Mandatory | Description                                                                                               |
|--------------------|---------------------|-----------|-----------------------------------------------------------------------------------------------------------|
| `trace_id`         | string (hex-16/32)  | Yes       | Active OpenTelemetry Trace ID (`traceparent`) at log emission time.                                       |
| `span_id`          | string (hex-8)      | Yes       | Active Span ID at log emission time.                                                                      |
| `parent_span_id`   | string (hex-8)      | Conditional | Parent span when the current span is synthetic or suppressed.                                             |
| `otel_service_name`| string             | Yes       | Service name from OpenTelemetry Resource (mirrors `service_name`).                                        |
| `otel_trace_flags` | string (hex-2)      | Yes       | Sampling flags (`00` = unsampled, `01` = sampled).                                                        |
| `otel_trace_state` | string             | Optional  | Vendor-specific `tracestate` if present.                                                                  |

#### Wrapper Responsibilities

1. **Automatic injection** – Language wrappers **MUST** inspect the active OpenTelemetry `Context` and inject the fields above into every log record.
2. **Context propagation** – Wrappers **MUST** provide middleware/interceptors (HTTP, gRPC, message queues) that automatically create spans and propagate context to downstream calls.
3. **Sampling alignment** – When a log is emitted inside a **sampled** span, the wrapper **SHOULD** set transport metadata (e.g., `sampled=true`) to enable cost-efficient collector routing.
4. **Thread/Task safety** – Context extraction **MUST** use language-native propagation mechanisms (`async_hooks`, `contextvars`, Go `context.Context`, Java `ThreadLocal`/`ContextStorage`)—no unsafe globals.
5. **Fail-safe mode** – If no span is active, wrappers **MUST** generate a new trace/span pair with `sampled=false` but still include IDs to guarantee correlation.
6. **Field naming** – Injected fields **MUST** match §4 naming conventions and remain flat (no nested objects).

#### Migration Timeline

* **New services** – Immediate adoption for any code merged after **2025-10-01**.
* **Existing services** – **MUST** migrate by **Q3 2026** or sooner when undergoing major version upgrades.
* Reference examples are available in `creo-observability-examples/opentelemetry_correlation/`.
### Rule/Guideline&nbsp;4: Log Structure Standards

Logs emitted by Creo services **MUST** conform to a common, language-agnostic JSON schema so downstream tooling can parse them deterministically.

#### 4.1 Newline-Delimited JSON (NDJSON)
- Each log event **SHALL** be a single-line JSON object terminated by `\n`.
- Pretty-printing or colour codes **MUST NOT** be enabled beyond local development.
- UTF-8 **MUST** be used; all control characters except `\n` **MUST** be escaped.

#### 4.2 Field Naming Conventions

| Rule | Description | Example |
|------|-------------|---------|
| `snake_case` | Keys **MUST** use lower-snake-case. | `service_name`, `user_id` |
| ASCII-only | Keys **MUST NOT** contain diacritics/special symbols. | ✅ `error_code`  ❌ `error-cøde` |
| Flat structure | Nesting is forbidden except for the `error` object. Use prefixed keys. | `http_method` |
| Reserved prefixes | Keys starting with `_` are reserved for collectors/forwarders. |

#### 4.3 Required Core Fields

| Field | Type | Example | Purpose |
|-------|------|---------|---------|
| `timestamp` | RFC-3339 string | `"2025-08-16T21:30:11.234Z"` | UTC event time |
| `level` | ENUM string | `"INFO"` | Severity (§5) |
| `service_name` | string | `"payments-api"` | Logical service |
| `env` | ENUM string | `"prod"` | Deployment environment |
| `trace_id` | hex 32 | `"4bf92f3577b34da6a3ce929d0e0e4736"` | Trace correlation (§2) |
| `span_id` | hex 16 | `"00f067aa0ba902b7"` | Span correlation (§2) |
| `message` | string | `"processed payment"` | Human-readable summary |

If a wrapper cannot populate a required field it **MUST** substitute `"UNKNOWN"` (string) rather than omitting the key.

#### 4.4 Optional Context Fields

| Field | Type | Description |
|-------|------|-------------|
| `component` | string | Sub-component (`controller`, `dao`, …) |
| `request_id` | UUID | Correlates logs within a request |
| `user_id` | string/number | Authenticated user (GDPR-scrubbed) |
| `error` | object | Structured error (see 4.4.1) |

##### 4.4.1 `error` Object Schema
```json
{
  "error": {
    "type": "ValidationError",
    "message": "amount must be positive",
    "stack": "...",
    "code": "PAY-001"
  }
}
```

#### 4.5 QMS Metric Fields
Wrappers **MUST** emit the following when `level=="INFO"` and `event_type=="business"`:

| Field | Type | Description |
|-------|------|-------------|
| `qms_metric_id` | string | ID from QMS catalog (e.g., `STL-004`) |
| `qms_metric_value` | number/string | Captured metric value |

#### 4.6 Canonical Example
```json
{"timestamp":"2025-08-16T21:30:11.234Z","level":"INFO","service_name":"payments-api","env":"prod","trace_id":"4bf92f3577b34da6a3ce929d0e0e4736","span_id":"00f067aa0ba902b7","component":"handler","event_type":"business","message":"processed payment","order_id":"ord_123","qms_metric_id":"STL-004","qms_metric_value":1}
```

#### 4.7 Validation & Schema Management
- A canonical JSON Schema **MUST** be published at `https://schemas.creo.dev/log/structured/v1.json`.
- CI pipelines **MUST** validate emitted log fixtures using `ajv` (Node) or language-equivalent.
- Breaking schema changes **MUST** follow QMS change-management and increment the document `version`.

**Migration deadline for existing services: Q4 2026.**

### Rule/Guideline&nbsp;5: Log Levels and Categories

#### 5.1 Standard Log Levels  
Logging wrappers **MUST** expose the following canonical level set across all languages. The numeric mapping aligns with RFC 5424 and common logging libraries:

| Level | Severity Numeric | Intended Use |
|-------|------------------|--------------|
| `FATAL` | 60 | Irrecoverable application failure; service abort imminent |
| `ERROR` | 50 | Unexpected runtime failure blocking a request or scheduled job |
| `WARN`  | 40 | Undesirable but expected condition (timeouts, retries, deprecated API use) |
| `INFO`  | 30 | Business events and high-level lifecycle state changes |
| `DEBUG` | 20 | Diagnostic details useful during active troubleshooting |
| `TRACE` | 10 | Fine-grained, step-by-step traces **ONLY** for short-lived debugging sessions |

Wrappers **MUST** reject unknown levels at runtime; fallback to `INFO` only when explicitly configured by Operations.

#### 5.2 Event Categories  
Each log entry **MUST** include an `event_type` field whose value is **exactly one** of the following mutually-exclusive categories:

| `event_type` | Description | Typical Level(s) |
|--------------|-------------|------------------|
| `business`   | Domain events adding product value (payment processed, shipment dispatched) | `INFO`, `WARN` |
| `technical`  | Infrastructure/performance events (GC pause, cache miss) | Any |
| `security`   | AuthN/AuthZ, IAM evaluation, encryption or policy failures | `INFO`, `WARN`, `ERROR` |
| `audit`      | Immutable compliance records (GDPR exports, SOX changes) | `INFO`, `ERROR` |

`business` events are the primary source for QMS metric extraction (§9).

#### 5.3 Level-to-Category Matrix  
The following matrix defines valid combinations; CI lint rules **MUST** enforce it:

| `event_type` \\ `level` | TRACE | DEBUG | INFO | WARN | ERROR | FATAL |
|-------------------------|:-----:|:-----:|:----:|:----:|:-----:|:-----:|
| business                | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |
| technical               | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| security                | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |
| audit                   | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |

*✓ = Allowed  ✗ = Prohibited*

#### 5.4 QMS Category IDs  
Logs **MUST** also include `qms_category_id`, sourced from the central taxonomy (`s3://creo-config/qms/categories.json`). Wrappers **MUST** validate this ID on startup and refuse to run if unknown.

#### 5.5 Implementation Requirements  
* Default production level: `INFO`; lower levels require the feature flag `ENABLE_VERBOSE_LOGGING`.  
* Level filtering **SHOULD** occur in-process to reduce I/O.  
* Wrappers **MUST** expose a protected runtime endpoint `/log/level` (mTLS) to adjust levels without redeploying.  
* `TRACE` logs **MUST** redact PII—even in non-production environments.

#### 5.6 Canonical Example
```json
{"timestamp":"2025-08-16T21:35:02.512Z","level":"WARN","event_type":"security","qms_category_id":"SEC-UNAUTHORIZED","service_name":"orders-api","env":"prod","message":"access denied for resource /admin/users","user_id":"u_123","trace_id":"4bf92f3577b34da6a3ce929d0e0e4736","span_id":"00f067aa0ba902b7"}
```
---

### Rule/Guideline&nbsp;6: Configuration Management

#### 6.1 Centralized Configuration Registry  
All structured-logging libraries **MUST** consume their runtime parameters from a single, declarative configuration source.  
The canonical registry is the **Creo Config Service** exposed via read-only S3 buckets and the Config-API:

```text
s3://creo-config/logging/&lt;service_or_component&gt;.yaml
https://config.creo.dev/v1/logging/&lt;service_or_component&gt;
```

The first source is used for batch / infrastructure builds, the second for in-process hot-reloads.  
Configuration files **MUST** be version-controlled and peer-reviewed (QMS Change-Control Category *CONFIG*).

#### 6.2 Environment Override Hierarchy  
Parameters **MUST** resolve using the following precedence (highest → lowest):

1. CLI flag / Kubernetes `--set logging.*`
2. Config-API runtime patch  
3. `environment:` section inside the YAML (`prod` → `staging` → `dev` → `local`)  
4. `defaults:` section inside the YAML  
5. Library hard-coded defaults (only for portable CLI tools)

If a key is defined at multiple levels, the highest-precedence value **MUST** win.

#### 6.3 Hot Reload & Versioning  
Wrappers **MUST** detect config version changes **within 60 seconds** (ETag difference or `version` field bump) and apply them without full process restart.  
A `/conf/reload` mTLS-protected endpoint **SHOULD** be provided for immediate reload after emergency pushes.  
Reload events **MUST** be logged at `INFO` with `event_type=="technical"` and `qms_category_id=="CFG-RELOAD"`.

#### 6.4 Immutable Infrastructure & Pinning  
While configuration is dynamic, the logging library **binary** version **MUST** be immutably pinned in the container image.  
Library upgrades **MUST** follow the standard deployment pipeline and QMS DoR/DoD gates.

#### 6.5 Canonical YAML Example  
```yaml
version: "2025-08-16"
defaults:
  level: INFO
  format: ndjson
  sinks:
    - stdout
    - loki://tenantA
  sampling:
    rate: 0.25           # 25 % for DEBUG/TRACE
environment:
  prod:
    level: INFO
    sinks:
      - loki://tenantA
  staging:
    level: DEBUG
    sinks:
      - stdout
      - loki://tenantA
  dev:
    level: DEBUG
    sampling:
      rate: 1.0
feature_flags:
  ENABLE_VERBOSE_LOGGING: false
redaction:
  pii:
    - user.ssn
    - user.cardNumber
```

#### 6.6 Implementation Requirements  
* Configuration file **MUST** validate against `logging-config-schema.json`; startup **MUST** abort on schema errors.  
* Boolean flags **MUST** be explicitly true/false – no implicit coercion.  
* A `config_version` metric **MUST** be emitted to Prometheus on successful reload.  
* Libraries **MUST** cache the active config in memory and expose it at `/debug/log-config` (redacted) for support engineers.  

### Rule/Guideline&nbsp;7: Performance Optimization

#### 7.1 Asynchronous Emission  
All logging libraries **MUST** emit events through a **non-blocking, asynchronous pipeline** to eliminate request-path latency. The recommended pattern is a lock-free ring buffer (≥ 16 K slots) drained by one or more background workers.  

* Request/worker threads **MUST NOT** perform blocking I/O to sinks.  
* Implementations **MUST** expose the metrics  
  * `logging_async_queue_depth` (gauge)  
  * `logging_events_dropped_total{cause="queue_overflow"}` (counter).

#### 7.2 Buffering & Batching  
Background workers **SHOULD** batch events by **size** (≤ 256 KiB) or **time** (≤ 100 ms) before flushing to remote sinks (Loki, S3, Kafka, Elasticsearch). These thresholds **MUST** be configurable via the centralized registry (`performance.batch.*`).

#### 7.3 Adaptive Sampling  
Wrappers **MUST** implement token-bucket sampling to safeguard CPU and network during spikes. Default policy:

| `level` | default rate | burst |
|---------|--------------|-------|
| TRACE   | 0.05         | 100   |
| DEBUG   | 0.10         | 500   |

Sampling **MUST** be deterministic per `trace_id` to maintain end-to-end visibility.

#### 7.4 Back-Pressure & Circuit-Breaking  
If either condition persists for **> 30 s**  
1. Async queue ≥ 80 % capacity, **or**  
2. Remote sink returns ≥ 3 consecutive errors,  

the library **MUST**:  

1. Halve all sampling rates (min 0.01).  
2. Emit an `ERROR` with `event_type=="technical"` and `qms_category_id=="LOG-BACKPRESSURE"`.  
3. Set Prometheus alert `logging_backpressure_active` until the queue recovers.  

The library **MUST NOT** crash or block the host application.

#### 7.5 Canonical YAML Extension  
```yaml
performance:
  async_queue_size: 32768      # ring buffer entries
  batch:
    max_bytes: 262144          # 256 KiB
    max_latency_ms: 100
  sampling:
    trace: 0.05
    debug: 0.10
  backpressure:
    high_watermark: 0.80
    cooldown_sec: 30
```

#### 7.6 Implementation Requirements  
* Async workers **MUST** inherit OpenTelemetry span context (`trace_id`, `span_id`).  
* Queue overflow **MUST** increment `logging_events_dropped_total{cause="queue_overflow"}`.  
* Performance knobs **MUST** be tunable at runtime via the Config-API (`/logging/perf` patch).  
* SDKs **MUST** publish load-test fixtures proving ≤ 5 % CPU & ≤ 50 MiB RSS overhead at **10 K events/s**.
### Rule/Guideline&nbsp;8: Security and Compliance

#### 8.1 Sensitive-Data Classification &amp; Redaction  
* All event schemas **MUST** tag fields with one of `classification` values: `public`, `internal`, `confidential`, `restricted`.  
* Fields classified `confidential` or `restricted` **MUST** be redacted *before* serialization using reversible format-preserving tokenization **or** irreversibly hashed (`SHA-256` + org-wide salt).  
* Redaction **MUST** be deterministic to enable join operations while preventing disclosure (`user.email_hash`).  
* The redaction policy **MUST** be centrally configured (`security.redaction.*`) and validated against `redaction-policy-schema.json`.  

#### 8.2 Transport &amp; Storage Security  
* All log traffic leaving the host **MUST** be encrypted in transit using mTLS (TLS&nbsp;1.3 preferred).  
* Remote sinks **MUST** present certificates signed by the Creo Internal CA; clients **MUST** validate SANs.  
* At rest, logs **MUST** be written to encrypted volumes (LUKS, EBS, GCP-CMEK) or object storage buckets with SSE-KMS.  
* Compression streams (gzip, snappy) **MUST NOT** leak plaintext blocks of redacted values.  

#### 8.3 Authentication, Authorization &amp; Audit  
* Write access to centralized sinks **MUST** use short-lived OAuth2 service tokens (&lt; 1&nbsp;hour) scoped to `log.write`.  
* Read/Query access **MUST** be gated via RBAC groups mapped to data classification levels.  
* Every access to a restricted log **MUST** itself generate an **audit** log entry with `event_type=="audit"` and `qms_category_id=="LOG-ACCESS"`.  

#### 8.4 Regulatory Alignment  
* **GDPR/CCPA:** Redaction policy **MUST** support data-subject deletion by purging tokenization maps within **30&nbsp;days** of request.  
* **PCI-DSS:** PAN and CVV **MUST** be truncated to first 6/last 4 digits prior to hashing.  
* **HIPAA:** PHI fields **MUST** be masked in any lower environment (`dev`, `staging`).  

#### 8.5 Canonical YAML Security Block  
```yaml
security:
  transport:
    tls_version: "1.3"
    ca_bundle: /etc/creo/pki/int-ca.crt
  redaction:
    classification_field: classification
    default: public
    rules:
      - field: user.email
        classification: confidential
        method: sha256_tokenize
      - field: payment.cardNumber
        classification: restricted
        method: truncate_and_hash
  rbac:
    sink_write_role: log-writer
    sink_read_roles:
      - log-reader-internal
      - log-reader-restricted
```

#### 8.6 Implementation Requirements  
* Redaction **MUST** occur *before* the event enters the async queue (Rule&nbsp;7.1) to avoid leaking in metrics.  
* TLS certificates **MUST** be hot-reloaded on rotation without process restart.  
* SDKs **MUST** expose metric `logging_redaction_errors_total`.  
* A unit-test suite **MUST** assert that all restricted fields are absent in serialized payloads.  
* Policy violations detected at runtime **MUST** raise Prometheus alert `logging_security_violation_total &gt; 0` within 5&nbsp;minutes.  

## 9. QMS Integration 🧩

Structured logging is a first-class signal within Creo’s Quality Management System (QMS).  The guidelines in Sections 1-8 culminate in the ability to feed high-quality, security-vetted log events into downstream quality, compliance, and audit workflows.

### 9.1 Quality Metrics
| Metric | Description | Prometheus Name | QMS Dashboard |
|--------|-------------|-----------------|---------------|
| Ingest Throughput | Rate of log events accepted by central broker | `logging_events_ingest_total` | _Observability → Logging → Ingest_ |
| Parsing Success | Percentage of events that conform to schema | `logging_events_valid_ratio` | _Observability → Logging → Health_ |
| Redaction Errors | Count of sensitive-data redaction failures | `logging_redaction_errors_total` | _Security → Data Loss Prevention_ |

> QMS **MUST** reject deployments where *Parsing Success* \< 99.5 % on staging.

### 9.2 Compliance Events
Security and compliance controls emit dedicated **qms.compliance.\*** log categories.
These events are automatically copied into the QMS *Compliance Ledger* for immutable retention (10 years).

```yaml
qms:
  compliance_sink:
    enabled: true
    endpoint: https://qms.internal.example.com/compliance
    tls:
      ca_bundle: /etc/creo/pki/compliance-ca.crt
    oauth2:
      client_id: logs-compliance-writer
      scope: compliance.write
```

### 9.3 Audit-Trail Hooks
Each service **MUST** register an *audit hook* that transforms selected log events into the canonical QMS *Audit Trail* schema.  At minimum:

* `user.id`
* `operation` (`CREATE`|`READ`|`UPDATE`|`DELETE`)
* `entity_type` + `entity_id`
* `timestamp` (UTC, RFC 3339 nano)

Audit hooks **SHOULD** be unit-tested and integration-tested using the `qms-audit-validator` mode.

### 9.4 Instrumentation & Alerting
Services **MUST** expose the following Prometheus metrics for QMS-driven SLOs:

* `logging_audit_hook_failures_total` – Alert when `≥ 5 per min` for 5 m
* `logging_compliance_sink_backlog_bytes` – Alert when `> 50 MB` for 15 m

### 9.5 Continuous Validation
A nightly QMS CI job (`qms-log-lint`) runs schema validation over the past 24 h of logs.
Builds **MUST** fail if *Parsing Success* < 98 % or if forbidden fields are detected.

## 10. Deployment Configurations 🚀

### 10.1 Container Images (Docker/Podman)
* All services **MUST** emit logs to **STDOUT** in structured JSON; no file-based logging inside the container.
* Base images **SHOULD** use the `creo/runtime-[language]:slim` series which already embeds the `creo-log-forwarder` binary.
* Production images **MUST** include label `com.creo.logging.schema-version="1.0"` to enable automated schema validation jobs.

### 10.2 Orchestration – Kubernetes
* Pods **MUST** mount a read-only ConfigMap named `<service>-logging-config` at `/etc/creo/logging.yaml`.
* Cluster operators **MUST** enable the **LogForwarder** side-car injection via the `logging.creo.io/enabled: "true"` pod annotation.
* The Fluent-Bit DaemonSet **MUST** batch events using `fluentbit.buffer.chunk_size=1M` and `fluentbit.buffer.max_size=5M`.

Example Helm values override 👇
```yaml
logging:
  sidecar:
    enabled: true
    resources:
      limits:
        cpu: 50m
        memory: 64Mi
  fluentbit:
    buffer:
      chunkSize: 1M
      maxSize: 5M
```

### 10.3 Docker Compose / Local Development
* Developers **SHOULD** use the provided `docker-compose.logging.yml` which spins up:
  1. `fluentbit` for local aggregation
  2. `tempo` + `loki` for trace/log exploration
  3. `grafana` with the QMS Observability dashboards pre-imported.
* A `make logs` target **MUST** stream and colorize JSON logs for rapid debugging.

### 10.4 Stand-Alone Binaries & systemd
* Services deployed as native binaries **MUST** use `SyslogHandler` (`RFC 5424`) with the `--structured-json` flag.
* Unit files **MUST** set `StandardOutput=journal` and `LogLevelMax=notice` to avoid truncating `debug` logs.

### 10.5 Deployment Validation
* CI/CD pipelines **MUST** run `qms-log-deploy-check` which:
  * Captures sample logs from the new workload
  * Verifies OpenTelemetry trace IDs are present
  * Confirms schema compliance via `creo-log-linter`
* Deployments **MUST** fail if validation score < 95 %.

## 11 Monitoring and Alerting
Structured logging enables robust, real-time insight into service health. Operators **MUST** implement log-driven monitoring to surface Service-Level Objectives (SLOs) and proactively alert on anomalies.

### 11.1 Log-Based SLO Metrics
* **MUST** derive **availability**, **latency**, and **error-rate** SLOs from the canonical fields
  `severity`, `service`, `operation`, and `status_code`.
* **MUST** export these metrics via the **Prometheus** `qms_log_exporter` sidecar.
* **SHOULD** define SLO targets in a `<service>.slo.yml` file stored next to application manifests.

### 11.2 Prometheus Alert Rules
* Alerting rules **MUST** live in the repo under `ops/prometheus/<service>_alerts.yml`.
* Critical alerts **MUST** page the on-call within **5 minutes**; warnings **SHOULD** create a ticket.
* Example rule:

```yaml
- alert: HighErrorRate
  expr: rate(qms_log_errors_total{service="payments"}[5m]) > 0.02
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "High error rate detected in payments service"
    runbook: "https://runbooks.creo.io/payments/high_error_rate"
```

### 11.3 Grafana Dashboards
* Dashboards **MUST** be generated via `grafonnet` templates in `ops/grafana/`.
* Each service **MUST** include:
  1. Request/second & Error % graphs
  2. p50/p95 latency panels
  3. Top log message table (Loki) with live filters for `trace_id` and `user_id`.
* Dashboards **SHOULD** link to Jaeger trace views using `trace_id` templating.

### 11.4 Synthetic Probes & Health Checks
* Critical public endpoints **MUST** have synthetic probes (Prometheus `blackbox_exporter`) hitting them every **30 s**.
* Probes **MUST** inject a unique `probe_id` logged by the service; failures **MUST** raise `ProbeFailure` alerts.
* Kubernetes `liveness`/`readiness` probes **SHOULD** include a lightweight log endpoint (`/healthz`) returning last-write timestamp of the logging pipeline.

## 12. Troubleshooting and Best Practices
### 12.1 Common Failure Modes
* **Logging pipeline outage**&nbsp;— Fluent Bit/Vector pod crash or buffer overflow halts log forwarding.
  • **Immediate Action:** `kubectl rollout restart daemonset/fluent-bit -n logging`; verify recovery with `kubectl logs -n logging -l app=fluent-bit --tail=20`.
  • **Long-Term Fix:** Enable back-pressure limits and configure persistent disk buffering (`storage.metrics=filesystem`).

* **Schema drift**&nbsp;— fields added or type-changed without version bump break downstream parsing.
  • Detect via CI schema validation step (`make validate-logs`).
  • Roll back offending change, bump schema version, update parsers, re-deploy.

* **Loki ingestion throttling**&nbsp;— `429 Too Many Requests` responses from distributor.
  • Tune `ingester.concurrentWrites`, add shards, or enable LogQL sharding.
  • Short-term: decrease client batch size (`maxBatchSize=512 KB`).

* **Missing `trace_id` correlation**&nbsp;— logger instantiated outside request context.
  • Inject middleware/handler to propagate trace span into logger instance.
  • Unit-test with synthetic request carrying a known `trace_id`.

### 12.2 Debugging Workflow
1. **Reproduce** issue in staging using the same input that triggered the error.
2. **Correlate** application error → `trace_id` → log stream via Loki:
   ```logql
   {service="payments",trace_id="<id>"} | json | line_format "{{.level}} {{.msg}}"
   ```
3. **Compare** healthy vs failing requests (`trace_id IN ["good","bad"]`).
4. **Inspect** Kubernetes events: `kubectl describe pod <pod>` → check OOM, restarts.
5. **Validate schema** with local replay: `make log-replay INPUT=error_payload.json`.
6. **Patch & redeploy** with feature flag toggled to verify fix.

### 12.3 Production Incident Playbook
| Phase | Action | Owner |
|-------|--------|-------|
| **T0** | Triage alert, acknowledge in PagerDuty, pull latest runbook. | On-call SRE |
| **T+5 m** | Use LogQL quick-filter dashboard (`Top Error Signatures`) to scope blast radius. | SRE |
| **T+10 m** | If pipeline outage, execute **Runbook #17** (pipeline fail-over to standby Loki). | SRE |
| **T+15 m** | Open incident Zoom + Slack war-room, assign scribe. | Incident Cmdr |
| **T+30 m** | Post preliminary RCA in Slack `#incidents`. | Scribe |
| **Post-mortem** | Within 24 h create RCA doc including log excerpts, tracer screenshots. | Service Owner |

### 12.4 Development Best Practices
* **Feature Flags for Log Verbosity** — wrap expensive/verbose logs behind `DEBUG_LOGS` flag.
* **Local Log Replay** — `make log-replay` replays captured JSON to stdout + OpenTelemetry agent for deterministic tests.
* **Pre-commit Hooks** — `pre-commit run log-schema` validates new log statements against JSON-Schema.
* **Structured Logger Wrapper** — use project-provided wrapper (`@creo/log`) to auto-inject `service`, `env`, `trace_id`.
* **Documentation** — every new log field **MUST** be documented in `docs/log-schema.md` with purpose and data type.

---
## 13. Tooling & Automation 🤖

* **CI Integration** — All repositories **MUST** include the `log-schema` pre-commit job and a GitHub Actions workflow that runs `make validate-logs` on every pull request.
* **Schema Validation** — JSON-Schema files live in `infra/logging/schema/`. The `log-schema` tool validates log events against these definitions.
* **Centralized Dashboards** — Grafana dashboards (`Log Health`, `Error Hotspots`) are automatically provisioned via Terraform modules.
* **IDE Tooling** — Provide VS Code snippets and IntelliJ Live Templates for common log patterns.
* **Automation** — A nightly cron pipeline scans Loki for schema drift and posts results to `#logging-report`.

## 14. Governance & Ownership 🏛️

| Role | Responsibilities |
|------|------------------|
| **Logging Standards Owner** | Maintains this document, approves schema changes, shepherds roadmap. |
| **Service Teams** | Implement and maintain compliant structured logging in their codebases. |
| **SRE Team** | Operates the centralized logging pipeline, defines SLOs, manages retention. |
| **Security & Compliance** | Audits logs for sensitive-data exposure, ensures regulatory alignment. |

## 15. Change Management & Versioning 🔄

1. All schema changes MUST follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`).
2. Submit an **RFC** via pull request to `docs/log-schema/` detailing field additions or removals.
3. Deprecations require a **90-day sunset** period with dual-write and log warnings.
4. Breaking changes MUST be flagged with `breaking-change:` in the PR title and tagged `schema-major`.
5. Update this document and dashboards concurrently with approved changes.

## 16. Training & Adoption 🎓

* Quarterly workshops cover log-instrumentation patterns and troubleshooting with LogQL.
* Onboarding guides live in the Engineering Wiki → *Observability → Structured Logging 101*.
* Certification quizzes in the LMS ensure developers understand required fields and severity usage.
* Office hours held every Wednesday by the Observability Guild for Q&A.

## 17. Future Work & Roadmap 🔭

* **Anomaly Detection** — Integrate ML-based outlier detection on log series.
* **Auto-Redaction** — Real-time PII masking at the collector level.
* **Improved Trace Navigation** — Deep-link logs to Jaeger trace views in Grafana.
* **SDK Expansion** — Provide structured logging wrappers for Rust and Swift.
* **Data Governance** — Automate data classification tags (`confidential`, `public`) in log events.

## Enforcement / Compliance 👮

| Control | Mechanism | Frequency |
|---------|-----------|-----------|
| **CI Blockers** | Pull-request fails if `make validate-logs` reports schema errors. | Every PR |
| **Monthly Audit** | SRE script scans Loki for non-conforming events and files JIRA tickets. | 1×/month |
| **Quality Gate** | Build pipeline enforces <1 % parse errors before deploy. | Each release |
| **Production Alert** | Alertmanager triggers on >5 % malformed logs for 10 min. | Continuous |

Non-compliant services have **5 business days** to remediate or risk deployment freeze.

## Exceptions 🤷

*Temporary or permanent deviations* require filling an **Exception Request Form** containing:
1. **Justification** (e.g., legacy dependency).
2. **Scope & Impact**.
3. **Mitigation Plan** and **Expiry Date** (max 90 days).
Forms are reviewed by the Logging Standards Owner within 3 business days.

## Revision History ⏳
| Version | Date | Author | Notes |
|---------|------|--------|-------|
| v1.0 | 2025-08-16 | Roo Technical Writer | Initial draft covering Sections 1-12 |
| v1.1 | 2025-08-16 | Roo Technical Writer | Added Sections 13-17, completed compliance, exceptions & links |

## Related Links 🔗
* QMS Policy Framework — `.ruru/docs/qms/qms-policy-overview.md`
* OpenTelemetry Specification — https://opentelemetry.io/docs/
* Loki Runbook #17 — `.ruru/docs/runbooks/loki-failover.md`