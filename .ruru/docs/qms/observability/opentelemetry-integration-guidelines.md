+++
# --- Document Metadata ---
document_id = "QMS-OBS-OTEL-GUIDE-20250816-001"
title = "OpenTelemetry Integration Guidelines for QMS Phase 4"
document_type = "technical_guidelines"
document_version = "1.0.0"
created_date = "2025-08-16"
last_updated = "2025-08-16"
author = "util-writer"
status = "🟢 Active"
target_audience = ["lead-qms-observability", "qms-observability-engineer", "development-teams"]
document_category = "qms"
document_subcategory = "observability"

# --- QMS Integration Context ---
qms_phase = "phase_4"
qms_component = "observability_traceability"
compliance_requirements = ["audit_trail", "quality_gates", "performance_monitoring", "error_tracking"]
integration_modes = ["lead-qms-observability", "qms-observability-engineer"]

# --- OpenTelemetry Configuration ---
[opentelemetry_config]
specification_version = "1.29.0"
supported_languages = ["nodejs", "typescript", "python", "go", "java"]
instrumentation_types = ["automatic", "manual", "hybrid"]
telemetry_signals = ["traces", "metrics", "logs"]
sampling_strategies = ["probabilistic", "rate_limiting", "tail_based"]

[supported_exporters]
trace_exporters = ["jaeger", "zipkin", "otlp", "console"]
metric_exporters = ["prometheus", "otlp", "console", "statsd"]
log_exporters = ["otlp", "console", "fluentd", "elasticsearch"]

# --- Infrastructure Requirements ---
[infrastructure_requirements]
minimum_cpu_cores = 2
minimum_memory_gb = 4
minimum_disk_gb = 20
network_requirements = ["outbound_https", "prometheus_scraping", "jaeger_ports"]

[observability_stack]
collector_enabled = true
jaeger_enabled = true
prometheus_enabled = true
grafana_enabled = true
elasticsearch_enabled = false

# --- QMS Compliance Configuration ---
[qms_compliance]
audit_trail_retention_days = 365
quality_gate_metrics = ["error_rate", "latency_p95", "throughput", "availability"]
performance_baselines_required = true
automated_alerting_enabled = true
compliance_reporting_enabled = true

[dora_metrics]
deployment_frequency = true
lead_time_for_changes = true
mean_time_to_recovery = true
change_failure_rate = true

# --- Security & Data Privacy ---
[security_config]
data_encryption_at_rest = true
data_encryption_in_transit = true
pii_scrubbing_enabled = true
access_control_required = true
audit_logging_enabled = true

# --- Performance Configuration ---
[performance_config]
batch_timeout_ms = 5000
max_batch_size = 512
max_export_batch_size = 512
export_timeout_ms = 30000
max_queue_size = 2048

[sampling_config]
default_sampling_rate = 0.1
high_volume_sampling_rate = 0.01
error_sampling_rate = 1.0
debug_sampling_rate = 1.0

# --- Multi-Language Support ---
[language_configurations]

[language_configurations.nodejs]
sdk_version = "^1.29.0"
auto_instrumentation_packages = ["@opentelemetry/auto-instrumentations-node"]
manual_instrumentation_packages = ["@opentelemetry/api", "@opentelemetry/sdk-node"]
supported_frameworks = ["express", "fastify", "koa", "nestjs"]

[language_configurations.python]
sdk_version = "^1.29.0"
auto_instrumentation_packages = ["opentelemetry-distro[otlp]", "opentelemetry-bootstrap"]
manual_instrumentation_packages = ["opentelemetry-api", "opentelemetry-sdk"]
supported_frameworks = ["django", "flask", "fastapi", "aiohttp"]

[language_configurations.go]
sdk_version = "v1.29.0"
manual_instrumentation_packages = ["go.opentelemetry.io/otel", "go.opentelemetry.io/otel/sdk"]
supported_frameworks = ["gin", "echo", "fiber", "chi"]

[language_configurations.java]
sdk_version = "1.29.0"
auto_instrumentation_agent = "opentelemetry-javaagent.jar"
manual_instrumentation_packages = ["io.opentelemetry:opentelemetry-api", "io.opentelemetry:opentelemetry-sdk"]
supported_frameworks = ["spring-boot", "spring-mvc", "jakarta-servlet"]

# --- Related Documentation ---
related_docs = [
    ".ruru/docs/qms/observability/observability-architecture.md",
    ".ruru/docs/qms/compliance/audit-trail-requirements.md",
    ".ruru/docs/qms/quality-gates/performance-metrics.md"
]

# --- Implementation Tracking ---
implementation_stages = ["planning", "sdk_installation", "instrumentation", "configuration", "testing", "deployment"]
estimated_implementation_hours = 40
priority = "high"

# --- Tags ---
tags = ["opentelemetry", "observability", "qms", "tracing", "metrics", "logging", "compliance", "performance-monitoring"]
+++

# OpenTelemetry Integration Guidelines for QMS Phase 4

## Overview

This document provides comprehensive guidelines for integrating OpenTelemetry across all development environments within the QMS Phase 4: Observability & Traceability implementation. OpenTelemetry serves as the foundational observability framework that enables unified telemetry data collection, processing, and export to support QMS compliance requirements, audit trails, and performance monitoring objectives.

### Purpose and Scope

OpenTelemetry integration within QMS Phase 4 addresses critical observability requirements:

- **Unified Telemetry Collection**: Standardized approach to traces, metrics, and logs across all services
- **QMS Compliance Support**: Automated collection of audit trail data and compliance metrics  
- **Performance Monitoring**: Real-time visibility into system performance and quality indicators
- **Cross-Service Observability**: End-to-end visibility across distributed microservices architecture
- **Quality Gate Integration**: Automated performance and reliability metrics for deployment gates

### Key Benefits

- **Standardization**: Consistent telemetry collection across multi-language environments
- **Vendor Neutrality**: Flexible export to multiple observability backends (Jaeger, Prometheus, etc.)
- **Compliance Automation**: Automated generation of audit trails and compliance reports
- **Performance Insights**: Detailed performance metrics supporting DORA metrics and SLA monitoring
- **Cost Optimization**: Intelligent sampling and efficient data collection strategies

## Architecture Overview

### OpenTelemetry Components

#### 1. OpenTelemetry SDKs
Language-specific libraries providing instrumentation capabilities:
- **Node.js/TypeScript**: `@opentelemetry/sdk-node` with auto-instrumentation support
- **Python**: `opentelemetry-sdk` with framework-specific instrumentations
- **Go**: `go.opentelemetry.io/otel/sdk` with manual instrumentation focus  
- **Java**: `opentelemetry-java` with automatic agent-based instrumentation

#### 2. OpenTelemetry Collector
Centralized telemetry data processing pipeline:
- **Data Reception**: Receives telemetry from multiple sources and protocols
- **Processing**: Filtering, batching, enrichment, and sampling of telemetry data
- **Export**: Routing telemetry to appropriate backends (Jaeger, Prometheus, etc.)

#### 3. Instrumentation Libraries
Framework and library-specific instrumentation:
- **Automatic Instrumentation**: Zero-code instrumentation for popular frameworks
- **Manual Instrumentation**: Custom spans and metrics for business logic
- **Hybrid Approach**: Combination of automatic and manual instrumentation

### Integration Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Application   │    │   Application   │    │   Application   │
│   (Node.js)     │    │   (Python)      │    │   (Go)          │
│                 │    │                 │    │                 │
│  OTel SDK       │    │  OTel SDK       │    │  OTel SDK       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │   OpenTelemetry          │
                    │   Collector              │
                    │                          │
                    │  - Receive               │
                    │  - Process               │
                    │  - Export                │
                    └─────────────┬─────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    ┌─────▼─────┐         ┌─────▼─────┐         ┌─────▼─────┐
    │  Jaeger   │         │Prometheus │         │    ELK    │
    │ (Traces)  │         │ (Metrics) │         │  (Logs)   │
    └───────────┘         └───────────┘         └───────────┘
```

## SDK Installation & Setup

### Node.js/TypeScript Setup

#### Automatic Instrumentation (Recommended)

**Installation:**
```bash
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/exporter-jaeger
npm install --save @opentelemetry/exporter-prometheus
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/api
```

**Configuration (`tracing.js`):**
```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'qms-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
    ['qms.phase']: 'phase_4',
    ['qms.component']: 'observability'
  }),
  traceExporter: new JaegerExporter({
    endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
  }),
  metricReader: new PrometheusExporter({
    port: 9090,
    prefix: 'qms_',
  }),
  instrumentations: [getNodeAutoInstrumentations({
    // Disable unwanted instrumentations
    '@opentelemetry/instrumentation-fs': { enabled: false },
    // Configure HTTP instrumentation for QMS compliance
    '@opentelemetry/instrumentation-http': {
      enabled: true,
      ignoreincomingPaths: ['/health', '/metrics'],
      requestHook: (span, request) => {
        span.setAttributes({
          'qms.request.user_id': request.headers['x-user-id'],
          'qms.request.session_id': request.headers['x-session-id']
        });
      }
    }
  })]
});

sdk.start();
```

**Application Initialization:**
```javascript
// Import tracing first
require('./tracing');

// Then import your application
const app = require('./app');
```

#### Manual Instrumentation

```javascript
const opentelemetry = require('@opentelemetry/api');

// Get tracer
const tracer = opentelemetry.trace.getTracer('qms-service', '1.0.0');

// Create custom spans for business logic
async function processQMSWorkflow(workflowId, userId) {
  return tracer.startActiveSpan('qms.workflow.process', async (span) => {
    try {
      span.setAttributes({
        'qms.workflow.id': workflowId,
        'qms.user.id': userId,
        'qms.operation': 'workflow_processing'
      });

      // Business logic here
      const result = await executeWorkflow(workflowId);
      
      span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
      span.setAttributes({
        'qms.workflow.status': 'completed',
        'qms.workflow.duration_ms': Date.now() - startTime
      });

      return result;
    } catch (error) {
      span.recordException(error);
      span.setStatus({ 
        code: opentelemetry.SpanStatusCode.ERROR, 
        message: error.message 
      });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### Python Setup

#### Automatic Instrumentation

**Installation:**
```bash
pip install opentelemetry-distro[otlp]
pip install opentelemetry-exporter-jaeger
pip install opentelemetry-exporter-prometheus
pip install opentelemetry-instrumentation-django  # For Django
pip install opentelemetry-instrumentation-flask   # For Flask
pip install opentelemetry-instrumentation-fastapi # For FastAPI
```

**Bootstrap auto-instrumentation:**
```bash
opentelemetry-bootstrap --action=install
```

**Configuration (`tracing.py`):**
```python
import os
from opentelemetry import trace, metrics
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.resources import Resource
from opentelemetry.semconv.resource import ResourceAttributes
from opentelemetry.instrumentation.django import DjangoInstrumentor

# Configure resource
resource = Resource.create({
    ResourceAttributes.SERVICE_NAME: os.getenv('SERVICE_NAME', 'qms-python-service'),
    ResourceAttributes.SERVICE_VERSION: os.getenv('SERVICE_VERSION', '1.0.0'),
    ResourceAttributes.DEPLOYMENT_ENVIRONMENT: os.getenv('ENVIRONMENT', 'development'),
    'qms.phase': 'phase_4',
    'qms.component': 'observability'
})

# Configure tracing
trace.set_tracer_provider(TracerProvider(resource=resource))
tracer_provider = trace.get_tracer_provider()

# Configure Jaeger exporter
jaeger_exporter = JaegerExporter(
    agent_host_name=os.getenv('JAEGER_AGENT_HOST', 'localhost'),
    agent_port=int(os.getenv('JAEGER_AGENT_PORT', '6831')),
)

# Add span processor
span_processor = BatchSpanProcessor(jaeger_exporter)
tracer_provider.add_span_processor(span_processor)

# Configure metrics
metrics.set_meter_provider(MeterProvider(
    resource=resource,
    metric_readers=[PrometheusMetricReader(port=9090)]
))

# Enable Django instrumentation
DjangoInstrumentor().instrument()

# Get tracer for manual instrumentation
tracer = trace.get_tracer(__name__)
```

**Django Settings Integration:**
```python
# settings.py
import os
from .tracing import *

# Add OpenTelemetry middleware
MIDDLEWARE = [
    'opentelemetry.instrumentation.django.middleware.OpenTelemetryMiddleware',
    # ... other middleware
]

# QMS-specific configuration
QMS_OBSERVABILITY = {
    'TRACE_USER_REQUESTS': True,
    'AUDIT_TRAIL_ENABLED': True,
    'PERFORMANCE_MONITORING': True,
}
```

#### Manual Instrumentation

```python
import asyncio
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode

tracer = trace.get_tracer(__name__)

async def process_qms_audit_trail(audit_data):
    with tracer.start_as_current_span("qms.audit.process") as span:
        try:
            span.set_attributes({
                "qms.audit.type": audit_data.get('type'),
                "qms.audit.user_id": audit_data.get('user_id'),
                "qms.audit.resource_id": audit_data.get('resource_id'),
                "qms.operation": "audit_processing"
            })
            
            # Process audit data
            result = await process_audit_data(audit_data)
            
            span.set_attributes({
                "qms.audit.status": "processed",
                "qms.audit.record_count": len(result)
            })
            
            span.set_status(Status(StatusCode.OK))
            return result
            
        except Exception as e:
            span.record_exception(e)
            span.set_status(Status(StatusCode.ERROR, str(e)))
            raise
```

### Go Setup

#### Manual Instrumentation (Primary Approach)

**Installation:**
```bash
go get go.opentelemetry.io/otel
go get go.opentelemetry.io/otel/sdk
go get go.opentelemetry.io/otel/exporters/jaeger
go get go.opentelemetry.io/otel/exporters/prometheus
go get go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
go get go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin
```

**Configuration (`tracing.go`):**
```go
package main

import (
    "context"
    "log"
    "os"
    "time"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/exporters/jaeger"
    "go.opentelemetry.io/otel/exporters/prometheus"
    "go.opentelemetry.io/otel/sdk/metric"
    "go.opentelemetry.io/otel/sdk/resource"
    "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func initTracer() (*trace.TracerProvider, error) {
    // Create resource
    res, err := resource.Merge(
        resource.Default(),
        resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName(getEnv("SERVICE_NAME", "qms-go-service")),
            semconv.ServiceVersion(getEnv("SERVICE_VERSION", "1.0.0")),
            semconv.DeploymentEnvironment(getEnv("ENVIRONMENT", "development")),
            attribute.String("qms.phase", "phase_4"),
            attribute.String("qms.component", "observability"),
        ),
    )
    if err != nil {
        return nil, err
    }

    // Create Jaeger exporter
    jaegerExporter, err := jaeger.New(
        jaeger.WithCollectorEndpoint(
            jaeger.WithEndpoint(getEnv("JAEGER_ENDPOINT", "http://localhost:14268/api/traces")),
        ),
    )
    if err != nil {
        return nil, err
    }

    // Create tracer provider
    tp := trace.NewTracerProvider(
        trace.WithBatcher(jaegerExporter),
        trace.WithResource(res),
        trace.WithSampler(trace.TraceIDRatioBased(0.1)), // 10% sampling
    )

    otel.SetTracerProvider(tp)
    return tp, nil
}

func initMeter() (*metric.MeterProvider, error) {
    // Create Prometheus exporter
    prometheusExporter, err := prometheus.New()
    if err != nil {
        return nil, err
    }

    // Create meter provider
    mp := metric.NewMeterProvider(
        metric.WithReader(prometheusExporter),
    )

    otel.SetMeterProvider(mp)
    return mp, nil
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
```

**Gin Framework Integration:**
```go
package main

import (
    "github.com/gin-gonic/gin"
    "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    "go.opentelemetry.io/otel"
)

func main() {
    // Initialize tracing
    tp, err := initTracer()
    if err != nil {
        log.Fatal(err)
    }
    defer func() {
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        if err := tp.Shutdown(ctx); err != nil {
            log.Fatal(err)
        }
    }()

    // Initialize metrics
    mp, err := initMeter()
    if err != nil {
        log.Fatal(err)
    }
    defer func() {
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        if err := mp.Shutdown(ctx); err != nil {
            log.Fatal(err)
        }
    }()

    // Setup Gin with OpenTelemetry middleware
    r := gin.Default()
    r.Use(otelgin.Middleware("qms-go-service"))

    // QMS-specific middleware for audit trails
    r.Use(func(c *gin.Context) {
        span := trace.SpanFromContext(c.Request.Context())
        span.SetAttributes(
            attribute.String("qms.request.user_id", c.GetHeader("X-User-ID")),
            attribute.String("qms.request.session_id", c.GetHeader("X-Session-ID")),
        )
        c.Next()
    })

    r.GET("/api/qms/workflow/:id", handleQMSWorkflow)
    r.Run(":8080")
}

func handleQMSWorkflow(c *gin.Context) {
    tracer := otel.Tracer("qms-workflow")
    ctx := c.Request.Context()
    
    ctx, span := tracer.Start(ctx, "qms.workflow.process")
    defer span.End()
    
    workflowID := c.Param("id")
    span.SetAttributes(
        attribute.String("qms.workflow.id", workflowID),
        attribute.String("qms.operation", "workflow_processing"),
    )

    // Process workflow
    result, err := processWorkflow(ctx, workflowID)
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    span.SetAttributes(attribute.String("qms.workflow.status", "completed"))
    c.JSON(200, result)
}
```

### Java Setup

#### Automatic Instrumentation (Recommended)

**Agent Download:**
```bash
# Download the OpenTelemetry Java agent
curl -L -o opentelemetry-javaagent.jar \
  https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.29.0/opentelemetry-javaagent.jar
```

**JVM Arguments Configuration:**
```bash
java -javaagent:opentelemetry-javaagent.jar \
     -Dotel.service.name=qms-java-service \
     -Dotel.service.version=1.0.0 \
     -Dotel.resource.attributes=deployment.environment=production,qms.phase=phase_4,qms.component=observability \
     -Dotel.exporter.jaeger.endpoint=http://localhost:14268/api/traces \
     -Dotel.metrics.exporter=prometheus \
     -Dotel.exporter.prometheus.port=9090 \
     -Dotel.traces.sampler=traceidratio \
     -Dotel.traces.sampler.arg=0.1 \
     -jar your-application.jar
```

**Spring Boot Application Properties:**
```properties
# application.yml
otel:
  service:
    name: qms-spring-service
    version: 1.0.0
  resource:
    attributes:
      deployment.environment: ${ENVIRONMENT:development}
      qms.phase: phase_4
      qms.component: observability
  exporter:
    jaeger:
      endpoint: ${JAEGER_ENDPOINT:http://localhost:14268/api/traces}
  metrics:
    exporter: prometheus
  traces:
    sampler: traceidratio
    sampler-arg: 0.1

# QMS-specific configuration
qms:
  observability:
    audit-trail-enabled: true
    performance-monitoring: true
    compliance-reporting: true
```

#### Manual Instrumentation

**Dependencies (`pom.xml`):**
```xml
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-api</artifactId>
        <version>1.29.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
        <version>1.29.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-jaeger</artifactId>
        <version>1.29.0</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-prometheus</artifactId>
        <version>1.29.0</version>
    </dependency>
</dependencies>
```

**Configuration Class:**
```java
@Configuration
@ConditionalOnProperty(name = "qms.observability.enabled", havingValue = "true", matchIfMissing = true)
public class OpenTelemetryConfig {
    
    @Bean
    public OpenTelemetry openTelemetry() {
        Resource resource = Resource.getDefault()
                .merge(Resource.builder()
                        .put(ResourceAttributes.SERVICE_NAME, "qms-spring-service")
                        .put(ResourceAttributes.SERVICE_VERSION, "1.0.0")
                        .put(ResourceAttributes.DEPLOYMENT_ENVIRONMENT, 
                             System.getProperty("environment", "development"))
                        .put("qms.phase", "phase_4")
                        .put("qms.component", "observability")
                        .build());

        return OpenTelemetrySdk.builder()
                .setTracerProvider(
                    SdkTracerProvider.builder()
                            .addSpanProcessor(BatchSpanProcessor.builder(
                                JaegerGrpcSpanExporter.builder()
                                    .setEndpoint("http://localhost:14250")
                                    .build())
                                .build())
                            .setResource(resource)
                            .setSampler(Sampler.traceIdRatioBased(0.1))
                            .build())
                .setMeterProvider(
                    SdkMeterProvider.builder()
                            .registerMetricReader(PrometheusHttpServer.builder()
                                .setPort(9090)
                                .build())
                            .setResource(resource)
                            .build())
                .build();
    }
}
```

**Service Implementation with Manual Instrumentation:**
```java
@Service
public class QMSWorkflowService {
    
    private final Tracer tracer;
    private final Meter meter;
    private final Counter workflowProcessedCounter;
    private final Histogram workflowDurationHistogram;
    
    public QMSWorkflowService(OpenTelemetry openTelemetry) {
        this.tracer = openTelemetry.getTracer("qms-workflow-service", "1.0.0");
        this.meter = openTelemetry.getMeter("qms-workflow-service", "1.0.0");
        
        // Create metrics
        this.workflowProcessedCounter = meter.counterBuilder("qms_workflows_processed_total")
                .setDescription("Total number of QMS workflows processed")
                .build();
                
        this.workflowDurationHistogram = meter.histogramBuilder("qms_workflow_duration_seconds")
                .setDescription("QMS workflow processing duration")
                .setUnit("seconds")
                .build();
    }
    
    public WorkflowResult processWorkflow(String workflowId, String userId) {
        Span span = tracer.spanBuilder("qms.workflow.process")
                .setSpanKind(SpanKind.INTERNAL)
                .startSpan();
                
        try (Scope scope = span.makeCurrent()) {
            // Set span attributes for QMS compliance
            span.setAttributes(Attributes.of(
                AttributeKey.stringKey("qms.workflow.id"), workflowId,
                AttributeKey.stringKey("qms.user.id"), userId,
                AttributeKey.stringKey("qms.operation"), "workflow_processing"
            ));
            
            long startTime = System.currentTimeMillis();
            
            // Process workflow business logic
            WorkflowResult result = executeWorkflow(workflowId, userId);
            
            long duration = System.currentTimeMillis() - startTime;
            
            // Update metrics
            workflowProcessedCounter.add(1, Attributes.of(
                AttributeKey.stringKey("workflow.type"), result.getType(),
                AttributeKey.stringKey("workflow.status"), "completed"
            ));
            
            workflowDurationHistogram.record(duration / 1000.0, Attributes.of(
                AttributeKey.stringKey("workflow.type"), result.getType()
            ));
            
            // Set completion attributes
            span.setAttributes(Attributes.of(
                AttributeKey.stringKey("qms.workflow.status"), "completed",
                AttributeKey.longKey("qms.workflow.duration_ms"), duration
            ));
            
            span.setStatus(StatusCode.OK);
            return result;
            
        } catch (Exception e) {
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, e.getMessage());
            
            // Update error metrics
            workflowProcessedCounter.add(1, Attributes.of(
                AttributeKey.stringKey("workflow.status"), "failed"
            ));
            
            throw new QMSWorkflowException("Failed to process workflow", e);
        } finally {
            span.end();
        }
    }
}
```

## Instrumentation Configuration

### Automatic vs Manual Instrumentation Strategy

#### Automatic Instrumentation
**Best for:**
- Popular frameworks (Express, Django, Spring Boot, Gin)
- Database connections (PostgreSQL, MongoDB, Redis)
- HTTP client libraries
- Message queues (RabbitMQ, Apache Kafka)

**Benefits:**
- Zero-code instrumentation
- Comprehensive coverage of common operations
- Consistent span naming and attributes
- Regular updates with framework versions

**Limitations:**
- Limited customization options
- May capture more data than needed
- Less control over sampling decisions
- Generic attribute naming

#### Manual Instrumentation
**Best for:**
- Business logic spans
- QMS-specific operations
- Custom metrics and attributes
- Fine-grained sampling control

**Benefits:**
- Complete control over telemetry data
- QMS-specific attribute naming
- Custom sampling strategies
- Performance optimization opportunities

**Considerations:**
- Requires more development effort
- Must maintain consistency across services
- Need to handle span lifecycle correctly

#### Hybrid Approach (Recommended)
Combine automatic instrumentation for infrastructure concerns with manual instrumentation for business logic:

```javascript
// Node.js example
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// Automatic instrumentation for infrastructure
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-http': { enabled: true },
    '@opentelemetry/instrumentation-express': { enabled: true },
    '@opentelemetry/instrumentation-pg': { enabled: true },
  })]
});

// Manual instrumentation for business logic
const tracer = trace.getTracer('qms-business-logic');

async function processQMSAuditTrail(auditData) {
  return tracer.startActiveSpan('qms.audit.process', async (span) => {
    // Custom business logic instrumentation
    span.setAttributes({
      'qms.audit.type': auditData.type,
      'qms.compliance.required': auditData.complianceRequired
    });
    
    // Business logic here...
  });
}
```

### Context Propagation

#### Cross-Service Trace Propagation

**HTTP Headers:**
OpenTelemetry uses W3C Trace Context specification for cross-service propagation:

```
traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01
tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE
```

**Implementation Examples:**

**Node.js HTTP Client:**
```javascript
const http = require('http');
const { trace, propagation, context } = require('@opentelemetry/api');

// Automatic propagation with instrumented HTTP client
const response = await fetch('http://downstream-service/api/data', {
  headers: {
    'Content-Type': 'application/json',
    // Trace context automatically injected by instrumentation
  }
});
```

**Python Requests:**
```python
import requests
from opentelemetry import trace, propagation
from opentelemetry.instrumentation.requests import RequestsInstrumentor

# Enable automatic instrumentation
RequestsInstrumentor().instrument()

# Trace context automatically propagated
response = requests.get('http://downstream-service/api/data')
```

**Go HTTP Client:**
```go
import (
    "net/http"
    "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

// Create instrumented HTTP client
client := http.Client{
    Transport: otelhttp.NewTransport(http.DefaultTransport),
}

// Trace context automatically injected
resp, err := client.Get("http://downstream-service/api/data")
```

#### Message Queue Propagation

**RabbitMQ Example (Node.js):**
```javascript
const amqp = require('amqplib');
const { trace, propagation, context } = require('@opentelemetry/api');

// Publishing with trace context
async function publishMessage(channel, queue, message) {
  const span = trace.getActiveSpan();
  const headers = {};
  
  // Inject trace context into message headers
  propagation.inject(context.active(), headers);
  
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    headers: headers,
    persistent: true
  });
}

// Consuming with trace context
async function consumeMessage(channel, queue) {
  await channel.consume(queue, (msg) => {
    // Extract trace context from message headers
    const parentContext = propagation.extract(context.active(), msg.properties.headers);
    
    const tracer = trace.getTracer('qms-message-processor');
    const span = tracer.startSpan('qms.message.process', {
      parent: parentContext
    });
    
    // Process message within trace context
    context.with(trace.setSpan(parentContext, span), () => {
      try {
        processMessage(msg.content);
        span.setStatus({ code: SpanStatusCode.OK });
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      } finally {
        span.end();
        channel.ack(msg);
      }
    });
  });
}
```

### Sampling Strategies

#### Probabilistic Sampling
Fixed percentage of traces collected:

```javascript
// Node.js
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  sampler: new TraceIdRatioBasedSampler(0.1), // 10% sampling
});
```

```python
# Python
from opentelemetry.sdk.trace.sampling import TraceIdRatioBased

trace.set_tracer_provider(TracerProvider(
    sampler=TraceIdRatioBased(0.1)  # 10% sampling
))
```

#### Rate Limiting Sampling
Fixed number of traces per second:

```go
// Go
import "go.opentelemetry.io/otel/sdk/trace"

tp := trace.NewTracerProvider(
    trace.WithSampler(trace.AlwaysSample()), // Implement custom rate limiter
)
```

#### Tail-Based Sampling
Decision made after trace completion:

**OpenTelemetry Collector Configuration:**
```yaml
processors:
  tail_sampling:
    decision_wait: 10s
    num_traces: 100
    expected_new_traces_per_sec: 10
    policies:
      [
        {
          name: errors-only,
          type: status_code,
          status_code: {status_codes: [ERROR]}
        },
        {
          name: slow-requests,
          type: latency,
          latency: {threshold_ms: 5000}
        },
        {
          name: qms-critical-operations,
          type: string_attribute,
          string_attribute: {key: qms.operation, values: [workflow_approval, compliance_check]}
        },
        {
          name: probabilistic-sample,
          type: probabilistic,
          probabilistic: {sampling_percentage: 1}
        }
      ]
```

#### QMS-Specific Sampling Strategy

```javascript
// Custom sampler for QMS operations
class QMSSampler {
  shouldSample(context, traceId, spanName, spanKind, attributes, links) {
    // Always sample QMS critical operations
    if (attributes['qms.operation'] === 'compliance_check' ||
        attributes['qms.operation'] === 'audit_trail' ||
        attributes['qms.operation'] === 'quality_gate') {
      return { decision: SamplingDecision.RECORD_AND_SAMPLE };
    }
    
    // Sample errors at higher rate
    if (attributes['error'] === true) {
      return Math.random() < 0.5 ? 
        { decision: SamplingDecision.RECORD_AND_SAMPLE } : 
        { decision: SamplingDecision.NOT_RECORD };
    }
    
    // Standard sampling for everything else
    return Math.random() < 0.1 ? 
      { decision: SamplingDecision.RECORD_AND_SAMPLE } : 
      { decision: SamplingDecision.NOT_RECORD };
  }
}
```

## Trace Collection

### Span Design Principles

#### Span Naming Conventions
Follow semantic conventions and QMS-specific naming:

```
Pattern: {namespace}.{operation}.{action}

Examples:
- qms.workflow.validate
- qms.audit.create
- qms.compliance.check
- qms.quality_gate.evaluate
- qms.deployment.approve
```

#### Span Attributes

**Standard Attributes:**
```javascript
span.setAttributes({
  // Service identification
  'service.name': 'qms-workflow-service',
  'service.version': '1.0.0',
  
  // QMS-specific attributes
  'qms.phase': 'phase_4',
  'qms.component': 'observability',
  'qms.operation': 'workflow_validation',
  'qms.workflow.id': workflowId,
  'qms.workflow.type': 'deployment_approval',
  'qms.user.id': userId,
  'qms.session.id': sessionId,
  
  // Business context
  'qms.compliance.required': true,
  'qms.audit.enabled': true,
  'qms.quality_gate.stage': 'pre_production',
  
  // Performance attributes
  'qms.performance.sla.target_ms': 2000,
  'qms.performance.priority': 'high'
});
```

**HTTP Request Attributes:**
```javascript
span.setAttributes({
  'http.method': 'POST',
  'http.url': 'https://api.qms.company.com/workflows',
  'http.status_code': 200,
  'http.user_agent': request.headers['user-agent'],
  
  // QMS-specific HTTP attributes
  'qms.request.type': 'workflow_submission',
  'qms.request.source': 'web_ui',
  'qms.api.version': 'v2',
});
```

#### Span Events

Record significant events within span lifecycle:

```javascript
// Record QMS workflow checkpoints
span.addEvent('qms.workflow.validation.started', {
  'qms.validation.type': 'schema_validation',
  'qms.validation.rules_count': 15
});

span.addEvent('qms.workflow.validation.completed', {
  'qms.validation.result': 'passed',
  'qms.validation.duration_ms': 450
});

// Record compliance checkpoints
span.addEvent('qms.compliance.check.initiated', {
  'qms.compliance.framework': 'SOC2',
  'qms.compliance.controls': ['AC-1', 'AC-2', 'AC-3']
});
```

#### Error Handling

```javascript
try {
  await processWorkflow(workflowId);
} catch (error) {
  // Record exception details
  span.recordException(error, {
    'qms.error.category': 'validation_failure',
    'qms.error.severity': 'high',
    'qms.error.impact': 'workflow_blocked'
  });
  
  // Set span status
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: `QMS workflow validation failed: ${error.message}`
  });
  
  // Add error event
  span.addEvent('qms.workflow.error', {
    'error.type': error.constructor.name,
    'qms.recovery.action': 'manual_review_required'
  });
  
  throw error;
}
```

### Cross-Service Trace Propagation

#### Service Mesh Integration

**Istio Configuration:**
```yaml
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: qms-tracing
  namespace: qms-namespace
spec:
  metrics:
  - providers:
    - name: prometheus
  tracing:
  - providers:
    - name: jaeger
  accessLogging:
  - providers:
    - name: otel
```

**Envoy Proxy Configuration:**
```yaml
tracing:
  http:
    name: envoy.tracers.opentelemetry
    typed_config:
      "@type": type.googleapis.com/envoy.extensions.tracers.opentelemetry.v3.OpenTelemetryConfig
      grpc_service:
        envoy_grpc:
          cluster_name: opentelemetry_collector
        timeout: 0.250s
      service_name: qms-envoy-proxy
```

#### Database Operations

**PostgreSQL Tracing (Node.js):**
```javascript
// Automatic instrumentation
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

// Manual enhancement for QMS operations
async function executeQMSQuery(pool, query, params) {
  const tracer = trace.getTracer('qms-database');
  
  return tracer.startActiveSpan('qms.database.query', async (span) => {
    span.setAttributes({
      'db.system': 'postgresql',
      'db.statement': query,
      'qms.query.type': 'audit_data',
      'qms.query.sensitive': false
    });
    
    try {
      const result = await pool.query(query, params);
      
      span.setAttributes({
        'db.rows_affected': result.rowCount,
        'qms.query.performance': result.duration < 100 ? 'fast' : 'slow'
      });
      
      return result;
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}
```

**MongoDB Tracing (Python):**
```python
from opentelemetry.instrumentation.pymongo import PymongoInstrumentor

# Enable automatic instrumentation
PymongoInstrumentor().instrument()

# Manual enhancement
async def find_qms_documents(collection, filter_criteria):
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span("qms.mongodb.find") as span:
        span.set_attributes({
            "db.system": "mongodb",
            "db.mongodb.collection.name": collection.name,
            "qms.query.type": "workflow_lookup",
            "qms.query.filters": str(filter_criteria)
        })
        
        cursor = collection.find(filter_criteria)
        documents = await cursor.to_list(length=None)
        
        span.set_attributes({
            "db.documents_found": len(documents),
            "qms.query.result_size": len(documents)
        })
        
        return documents
```

#### Asynchronous Processing

**Queue-based Processing:**
```javascript
// Message publisher
async function publishQMSWorkflowEvent(eventData) {
  const tracer = trace.getTracer('qms-event-publisher');
  
  return tracer.startActiveSpan('qms.event.publish', async (span) => {
    const headers = {};
    propagation.inject(context.active(), headers);
    
    span.setAttributes({
      'messaging.system': 'rabbitmq',
      'messaging.destination': 'qms.workflow.events',
      'messaging.destination_kind': 'queue',
      'qms.event.type': eventData.type,
      'qms.event.priority': eventData.priority
    });
    
    await publishToQueue('qms.workflow.events', {
      ...eventData,
      traceHeaders: headers
    });
    
    span.addEvent('qms.event.published', {
      'qms.event.id': eventData.id,
      'messaging.message.id': eventData.messageId
    });
  });
}

// Message consumer
async function consumeQMSWorkflowEvent(message) {
  const parentContext = propagation.extract(context.active(), message.traceHeaders);
  const tracer = trace.getTracer('qms-event-consumer');
  
  const span = tracer.startSpan('qms.event.process', {
    parent: parentContext
  });
  
  await context.with(trace.setSpan(parentContext, span), async () => {
    try {
      span.setAttributes({
        'messaging.operation': 'process',
        'qms.event.processing_stage': 'validation'
      });
      
      await processWorkflowEvent(message.data);
      
      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error) {
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    } finally {
      span.end();
    }
  });
}
```

## Metrics Collection

### QMS-Specific Metrics

#### DORA Metrics Implementation

**Deployment Frequency:**
```javascript
// Node.js
const meter = metrics.getMeter('qms-dora-metrics');

const deploymentCounter = meter.createCounter('qms_deployments_total', {
  description: 'Total number of deployments',
  unit: '1'
});

const deploymentFrequencyGauge = meter.createObservableGauge('qms_deployment_frequency', {
  description: 'Deployment frequency (deployments per day)',
  unit: 'per_day'
});

// Track deployment
function recordDeployment(environment, service, version) {
  deploymentCounter.add(1, {
    'environment': environment,
    'service': service,
    'version': version,
    'qms.deployment.type': 'automated'
  });
}

// Calculate frequency
deploymentFrequencyGauge.addCallback((measurement) => {
  const frequency = calculateDeploymentFrequency();
  measurement.observe(frequency, {
    'time_period': 'last_7_days',
    'environment': 'production'
  });
});
```

**Lead Time for Changes:**
```python
# Python
from opentelemetry import metrics
from datetime import datetime, timedelta

meter = metrics.get_meter(__name__)

lead_time_histogram = meter.create_histogram(
    "qms_lead_time_changes_seconds",
    description="Lead time for changes from commit to production",
    unit="seconds"
)

def record_lead_time(commit_timestamp, deployment_timestamp, change_type):
    lead_time_seconds = (deployment_timestamp - commit_timestamp).total_seconds()
    
    lead_time_histogram.record(lead_time_seconds, {
        "change_type": change_type,
        "environment": "production",
        "qms.change.category": "feature" if "feat" in change_type else "bugfix"
    })
```

**Mean Time to Recovery (MTTR):**
```go
// Go
var (
    incidentCounter = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "qms_incidents_total",
            Help: "Total number of incidents",
        },
        []string{"severity", "service", "environment"},
    )
    
    mttrHistogram = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "qms_mttr_seconds",
            Help: "Mean time to recovery in seconds",
            Buckets: prometheus.ExponentialBuckets(60, 2, 10), // 1min to ~17hours
        },
        []string{"severity", "service"},
    )
)

func RecordIncidentRecovery(incident Incident) {
    recoveryTime := incident.ResolvedAt.Sub(incident.StartedAt).Seconds()
    
    mttrHistogram.WithLabelValues(
        incident.Severity,
        incident.Service,
    ).Observe(recoveryTime)
}
```

**Change Failure Rate:**
```java
// Java
@Component
public class QMSMetricsCollector {
    
    private final Counter deploymentCounter;
    private final Counter failedDeploymentCounter;
    private final Gauge changeFailureRate;
    
    public QMSMetricsCollector(MeterProvider meterProvider) {
        Meter meter = meterProvider.get("qms-change-metrics");
        
        this.deploymentCounter = meter.counterBuilder("qms_deployments_total")
                .setDescription("Total deployments")
                .build();
                
        this.failedDeploymentCounter = meter.counterBuilder("qms_failed_deployments_total")
                .setDescription("Failed deployments")
                .build();
                
        this.changeFailureRate = meter.gaugeBuilder("qms_change_failure_rate")
                .setDescription("Change failure rate percentage")
                .buildWithCallback(measurement -> {
                    double rate = calculateChangeFailureRate();
                    measurement.record(rate, Attributes.of(
                        AttributeKey.stringKey("time_period"), "last_30_days",
                        AttributeKey.stringKey("environment"), "production"
                    ));
                });
    }
    
    public void recordDeployment(String service, String environment, boolean successful) {
        Attributes attributes = Attributes.of(
            AttributeKey.stringKey("service"), service,
            AttributeKey.stringKey("environment"), environment
        );
        
        deploymentCounter.add(1, attributes);
        
        if (!successful) {
            failedDeploymentCounter.add(1, attributes);
        }
    }
}
```

#### Quality Gate Metrics

```javascript
// Node.js - Quality Gate Metrics
const qualityGateCounter = meter.createCounter('qms_quality_gates_total', {
  description: 'Total quality gate evaluations'
});

const qualityGatePassRate = meter.createObservableGauge('qms_quality_gate_pass_rate', {
  description: 'Quality gate pass rate percentage'
});

const qualityGateDuration = meter.createHistogram('qms_quality_gate_duration_seconds', {
  description: 'Quality gate evaluation duration'
});

function recordQualityGateEvaluation(stage, result, duration, criteria) {
  const attributes = {
    'stage': stage,
    'result': result, // 'passed', 'failed', 'warning'
    'environment': process.env.NODE_ENV,
    'qms.gate.type': criteria.type
  };
  
  qualityGateCounter.add(1, attributes);
  qualityGateDuration.record(duration / 1000, attributes);
  
  // Record individual criteria results
  criteria.checks.forEach(check => {
    qualityGateCounter.add(1, {
      ...attributes,
      'qms.criteria': check.name,
      'qms.criteria.result': check.passed ? 'passed' : 'failed'
    });
  });
}
```

#### Performance Metrics

```python
# Python - Performance Metrics
performance_histogram = meter.create_histogram(
    "qms_request_duration_seconds",
    description="Request processing duration",
    unit="seconds"
)

throughput_counter = meter.create_counter(
    "qms_requests_total",
    description="Total number of requests processed"
)

error_rate_counter = meter.create_counter(
    "qms_errors_total", 
    description="Total number of errors"
)

def record_request_metrics(endpoint, method, status_code, duration, user_id=None):
    attributes = {
        "endpoint": endpoint,
        "method": method,
        "status_code": str(status_code),
        "qms.endpoint.category": classify_endpoint(endpoint)
    }
    
    # Add user context for audit purposes
    if user_id:
        attributes["qms.user.id"] = user_id
    
    # Record duration
    performance_histogram.record(duration, attributes)
    
    # Record throughput
    throughput_counter.add(1, attributes)
    
    # Record errors
    if status_code >= 400:
        error_rate_counter.add(1, {
            **attributes,
            "error_type": "client_error" if status_code < 500 else "server_error"
        })
```

### Custom Business Metrics

#### Workflow Metrics

```go
// Go - Workflow Metrics
var (
    workflowDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "qms_workflow_duration_seconds",
            Help: "Workflow processing duration",
            Buckets: []float64{0.1, 0.5, 1.0, 2.5, 5.0, 10.0, 30.0, 60.0, 300.0},
        },
        []string{"workflow_type", "stage", "environment"},
    )
    
    workflowsActive = promauto.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "qms_workflows_active",
            Help: "Number of active workflows",
        },
        []string{"workflow_type", "priority"},
    )
    
    workflowsProcessed = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "qms_workflows_processed_total",
            Help: "Total workflows processed",
        },
        []string{"workflow_type", "result", "environment"},
    )
)

func RecordWorkflowMetrics(workflowType string, stage string, duration time.Duration, result string) {
    labels := prometheus.Labels{
        "workflow_type": workflowType,
        "stage": stage,
        "environment": os.Getenv("ENVIRONMENT"),
    }
    
    workflowDuration.With(labels).Observe(duration.Seconds())
    
    processedLabels := prometheus.Labels{
        "workflow_type": workflowType,
        "result": result,
        "environment": os.Getenv("ENVIRONMENT"),
    }
    
    workflowsProcessed.With(processedLabels).Inc()
}
```

#### Compliance Metrics

```java
// Java - Compliance Metrics
@Component
public class ComplianceMetrics {
    
    private final Counter complianceChecksCounter;
    private final Histogram complianceCheckDuration;
    private final Gauge complianceScore;
    
    public ComplianceMetrics(MeterProvider meterProvider) {
        Meter meter = meterProvider.get("qms-compliance-metrics");
        
        this.complianceChecksCounter = meter.counterBuilder("qms_compliance_checks_total")
                .setDescription("Total compliance checks performed")
                .build();
                
        this.complianceCheckDuration = meter.histogramBuilder("qms_compliance_check_duration_seconds")
                .setDescription("Compliance check duration")
                .setUnit("seconds")
                .build();
                
        this.complianceScore = meter.gaugeBuilder("qms_compliance_score")
                .setDescription("Current compliance score percentage")
                .buildWithCallback(this::recordComplianceScore);
    }
    
    public void recordComplianceCheck(String framework, String control, boolean passed, 
                                    Duration duration) {
        Attributes attributes = Attributes.of(
            AttributeKey.stringKey("framework"), framework,
            AttributeKey.stringKey("control"), control,
            AttributeKey.booleanKey("passed"), passed,
            AttributeKey.stringKey("environment"), getEnvironment()
        );
        
        complianceChecksCounter.add(1, attributes);
        complianceCheckDuration.record(duration.toMillis() / 1000.0, attributes);
    }
    
    private void recordComplianceScore(ObservableDoubleMeasurement measurement) {
        Map<String, Double> scores = calculateComplianceScores();
        
        scores.forEach((framework, score) -> {
            measurement.record(score, Attributes.of(
                AttributeKey.stringKey("framework"), framework,
                AttributeKey.stringKey("environment"), getEnvironment()
            ));
        });
    }
}
```

### Metric Export Configuration

#### Prometheus Export Configuration

**Node.js:**
```javascript
const { PrometheusRegistry, register } = require('prom-client');
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Configure Prometheus exporter
const prometheusExporter = new PrometheusExporter({
  port: 9090,
  prefix: 'qms_',
  appendTimestamp: false,
}, () => {
  console.log('QMS Prometheus metrics server started on port 9090');
});

// Create meter provider with Prometheus reader
const meterProvider = new MeterProvider({
  readers: [prometheusExporter],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'qms-metrics-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  })
});

metrics.setGlobalMeterProvider(meterProvider);
```

**Python:**
```python
from opentelemetry import metrics
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from opentelemetry.sdk.metrics import MeterProvider
from prometheus_client import start_http_server

# Start Prometheus HTTP server
start_http_server(port=9090)

# Configure Prometheus reader
prometheus_reader = PrometheusMetricReader(prefix="qms_")

# Create meter provider
meter_provider = MeterProvider(
    metric_readers=[prometheus_reader],
    resource=Resource.create({
        ResourceAttributes.SERVICE_NAME: "qms-python-service",
        ResourceAttributes.SERVICE_VERSION: "1.0.0"
    })
)

metrics.set_meter_provider(meter_provider)
```

#### OTLP Export Configuration

**Go:**
```go
import (
    "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
    "go.opentelemetry.io/otel/sdk/metric"
)

func initMetrics() *metric.MeterProvider {
    // Create OTLP exporter
    metricExporter, err := otlpmetricgrpc.New(
        context.Background(),
        otlpmetricgrpc.WithEndpoint("http://otel-collector:4317"),
        otlpmetricgrpc.WithInsecure(),
        otlpmetricgrpc.WithHeaders(map[string]string{
            "qms-service": "observability-metrics",
        }),
    )
    if err != nil {
        log.Fatal(err)
    }
    
    // Create periodic reader
    reader := metric.NewPeriodicReader(
        metricExporter,
        metric.WithInterval(15*time.Second),
    )
    
    // Create meter provider
    mp := metric.NewMeterProvider(
        metric.WithReader(reader),
        metric.WithResource(resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName("qms-go-service"),
            semconv.ServiceVersion("1.0.0"),
            attribute.String("qms.phase", "phase_4"),
        )),
    )
    
    otel.SetMeterProvider(mp)
    return mp
}
```

## Log Integration

### Structured Logging with Trace Correlation

#### Node.js with Winston

**Installation:**
```bash
npm install winston @opentelemetry/instrumentation-winston
```

**Configuration:**
```javascript
const winston = require('winston');
const { trace, context } = require('@opentelemetry/api');

// Custom formatter to include trace context
const traceFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const span = trace.getActiveSpan();
  if (span) {
    const traceId = span.spanContext().traceId;
    const spanId = span.spanContext().spanId;
    return