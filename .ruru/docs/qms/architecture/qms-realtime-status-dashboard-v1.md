+++
# --- Basic Metadata ---
id = "QMS-ARCH-DASHBOARD-FRAMEWORK-V1"
title = "QMS Real-time Status Dashboard Framework"
context_type = "architecture"
scope = "Comprehensive real-time monitoring and visualization system for QMS operations"
target_audience = ["lead-devops", "lead-frontend", "qms-quality-coordinator", "managers"]
granularity = "detailed"
status = "active"
last_updated = "2025-08-17"
version = "1.0"
tags = ["qms", "dashboard", "real-time", "monitoring", "visualization", "ui", "websocket"]
related_context = [
    ".ruru/docs/qms/architecture/qms-process-orchestration-engine-v1.md",
    ".ruru/docs/qms/architecture/qms-intelligent-decision-engine-v1.md",
    ".ruru/docs/qms/observability/structured-logging-standards.md",
    ".ruru/docs/qms/observability/jaeger-tracing-configuration.md"
]
template_schema_doc = ".ruru/templates/toml-md/08_technical_spec.README.md"
relevance = "Critical: Provides operational visibility for QMS Phase 2.3 Step 7"
+++

# QMS Real-time Status Dashboard Framework V1

## Executive Summary

The QMS Real-time Status Dashboard Framework provides comprehensive operational visibility into the End-to-End QMS Review Process Integration. This system delivers real-time monitoring capabilities through interactive web-based dashboards, enabling stakeholders to track workflow progress, monitor agent performance, analyze quality metrics, and maintain system health awareness across the entire QMS ecosystem.

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              QMS Real-time Dashboard Framework                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │  Dashboard  │  │ WebSocket    │  │    Data                │ │
│  │   Engine    │  │ Gateway      │  │ Aggregator             │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │   Widget    │  │  Alert       │  │   Visualization        │ │
│  │  Manager    │  │  System      │  │    Engine              │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │   User      │  │  Theme       │  │     Cache              │ │
│  │ Management  │  │  Engine      │  │   Manager              │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Core Components

#### Dashboard Engine
- **Purpose**: Central orchestration of dashboard functionality and state management
- **Responsibilities**: Layout management, component coordination, user session handling
- **Technology**: React/Vue.js with real-time state management

#### WebSocket Gateway
- **Purpose**: Real-time bidirectional communication between backend services and frontend
- **Responsibilities**: Event streaming, connection management, data synchronization
- **Technology**: WebSocket API with fallback to Server-Sent Events

#### Data Aggregator
- **Purpose**: Collects, processes, and formats data from multiple QMS components
- **Responsibilities**: Data fusion, metric calculation, time-series processing
- **Technology**: Event-driven data processing with Redis/message queues

#### Widget Manager
- **Purpose**: Dynamic widget system for customizable dashboard layouts
- **Responsibilities**: Widget lifecycle, configuration persistence, plugin system
- **Technology**: Modular architecture with drag-and-drop capabilities

#### Alert System
- **Purpose**: Proactive notification and alerting for critical system events
- **Responsibilities**: Threshold monitoring, notification routing, alert lifecycle
- **Technology**: Rule-based alerting with multiple delivery channels

#### Visualization Engine
- **Purpose**: High-performance charting and data visualization capabilities
- **Responsibilities**: Chart rendering, data transformation, interactive features
- **Technology**: D3.js, Chart.js, or custom WebGL-based rendering

## 2. Dashboard Categories and Views

### 2.1 Executive Dashboard

#### Key Performance Indicators (KPIs)
```yaml
executive_kpis:
  quality_metrics:
    - overall_quality_score: 87.3%
    - defect_detection_rate: 92.1%
    - false_positive_rate: 8.4%
    - compliance_adherence: 94.7%
    
  efficiency_metrics:
    - average_review_cycle_time: "2.3 hours"
    - workflow_completion_rate: 89.2%
    - agent_utilization_rate: 76.8%
    - sla_adherence: 91.5%
    
  business_impact:
    - cost_per_review: "$47.20"
    - time_to_merge: "4.2 hours"
    - developer_satisfaction: 4.1/5.0
    - process_adoption_rate: 88.6%
```

#### Executive Widgets
- **Quality Trends**: Time-series charts showing quality metrics over time
- **Cost Analysis**: Review cost breakdowns and optimization opportunities
- **Team Performance**: High-level team productivity and satisfaction metrics
- **Risk Assessment**: Current system risks and mitigation status
- **ROI Dashboard**: Return on investment analysis for QMS implementation

### 2.2 Operational Dashboard

#### Real-time Operations Monitor
```yaml
operational_widgets:
  active_workflows:
    - total_active_reviews: 47
    - pending_dor_validations: 12
    - in_progress_reviews: 23
    - awaiting_dod_validation: 8
    - final_approvals_needed: 4
    
  agent_status:
    - total_agents: 15
    - active_agents: 12
    - overloaded_agents: 2
    - idle_agents: 1
    - agents_in_training: 3
    
  queue_depths:
    - dor_validation_queue: 8
    - code_review_queue: 15
    - security_scan_queue: 3
    - performance_test_queue: 6
    - final_review_queue: 4
```

#### Operational Widgets
- **Workflow Pipeline**: Visual representation of the 4-step QMS process with real-time counts
- **Agent Workload**: Real-time agent capacity and assignment status
- **Queue Management**: Queue depths and processing times for each step
- **System Health**: Infrastructure status and performance metrics
- **Error Tracking**: Recent errors, their frequency, and resolution status

### 2.3 Developer Dashboard

#### Developer-Focused Metrics
```yaml
developer_dashboard:
  my_reviews:
    - pending_reviews: 3
    - completed_today: 7
    - average_feedback_time: "1.2 hours"
    - quality_score_trend: "+2.3%"
    
  team_metrics:
    - team_velocity: "12.4 stories/sprint"
    - code_quality_trend: "stable"
    - review_efficiency: "+15%"
    - knowledge_sharing_score: 78%
    
  learning_opportunities:
    - suggested_reviews: 4
    - skill_development_areas: ["security", "performance"]
    - mentorship_opportunities: 2
    - training_recommendations: 3
```

#### Developer Widgets
- **My Review Queue**: Personal review assignments and deadlines
- **Skill Development**: Progress tracking and learning recommendations
- **Team Collaboration**: Peer review interactions and knowledge sharing
- **Code Quality Insights**: Personal and team code quality trends
- **Achievement Tracker**: Gamification elements and milestone tracking

### 2.4 Quality Assurance Dashboard

#### QA-Specific Views
```yaml
qa_dashboard:
  quality_gates:
    - total_gates_executed: 1247
    - gates_passed: 1089
    - gates_failed: 158
    - average_gate_time: "3.2 minutes"
    
  defect_tracking:
    - defects_found_today: 23
    - critical_defects: 2
    - defect_resolution_time: "4.7 hours"
    - defect_prevention_rate: 84.2%
    
  compliance_monitoring:
    - compliance_checks_passed: 94.1%
    - audit_readiness_score: 91.7%
    - policy_violations: 6
    - remediation_pending: 3
```

#### QA Widgets
- **Quality Gate Performance**: Success rates and timing for each quality gate
- **Defect Analytics**: Defect trends, categorization, and root cause analysis
- **Compliance Status**: Real-time compliance monitoring and audit preparation
- **Test Coverage**: Code coverage metrics and testing effectiveness
- **Risk Matrix**: Quality risk assessment and mitigation tracking

## 3. Real-time Data Architecture

### 3.1 Event Streaming System

#### Event Categories
```yaml
event_streams:
  workflow_events:
    - pr_created
    - review_started
    - quality_gate_executed
    - agent_assigned
    - workflow_completed
    
  system_events:
    - agent_status_changed
    - queue_depth_updated
    - performance_threshold_exceeded
    - error_occurred
    - configuration_changed
    
  user_events:
    - dashboard_accessed
    - widget_configured
    - alert_acknowledged
    - filter_applied
    - export_requested
```

#### WebSocket Event Protocol
```json
{
  "event": {
    "id": "evt-20250817-062314-001",
    "type": "workflow.quality_gate_passed",
    "timestamp": "2025-08-17T06:23:14Z",
    "source": "qms-orchestrator",
    "data": {
      "workflow_id": "WF-PR-12345-20250817",
      "gate_name": "code-coverage-gate",
      "pr_number": 12345,
      "repository": "creo/creo-roo-commander",
      "agent_id": "qms-testing-specialist",
      "metrics": {
        "coverage_percentage": 87.5,
        "threshold": 80.0,
        "execution_time": 45
      }
    },
    "metadata": {
      "priority": "normal",
      "tags": ["quality", "testing", "coverage"],
      "correlation_id": "corr-12345-001"
    }
  }
}
```

### 3.2 Data Processing Pipeline

#### Real-time Aggregation
```python
class RealTimeAggregator:
    def __init__(self):
        self.metric_calculators = {
            'workflow_metrics': WorkflowMetricCalculator(),
            'agent_metrics': AgentMetricCalculator(),
            'quality_metrics': QualityMetricCalculator(),
            'performance_metrics': PerformanceMetricCalculator()
        }
        
    async def process_event(self, event: DashboardEvent):
        # Calculate real-time metrics
        metrics = {}
        for calculator_name, calculator in self.metric_calculators.items():
            if calculator.should_process(event):
                metric_updates = await calculator.calculate(event)
                metrics[calculator_name] = metric_updates
        
        # Update caches
        await self.update_metric_caches(metrics)
        
        # Broadcast updates to connected clients
        await self.broadcast_updates(metrics, event.get_affected_dashboards())
        
        return metrics
```

#### Time Series Data Management
```yaml
time_series_config:
  retention_policies:
    high_frequency: # 1-minute intervals
      retention: "24 hours"
      metrics: ["active_workflows", "agent_status", "queue_depths"]
      
    medium_frequency: # 5-minute intervals
      retention: "7 days"
      metrics: ["quality_scores", "completion_rates", "error_rates"]
      
    low_frequency: # 1-hour intervals
      retention: "90 days"
      metrics: ["trend_analysis", "capacity_planning", "cost_metrics"]
```

## 4. Widget System Architecture

### 4.1 Widget Framework

#### Base Widget Interface
```typescript
interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  config: WidgetConfig;
  data: WidgetData;
  
  // Lifecycle methods
  initialize(container: HTMLElement): Promise<void>;
  render(data: WidgetData): Promise<void>;
  update(data: Partial<WidgetData>): Promise<void>;
  destroy(): Promise<void>;
  
  // Event handling
  onEvent(event: DashboardEvent): Promise<void>;
  onConfigChange(config: Partial<WidgetConfig>): Promise<void>;
}
```

#### Widget Categories
```yaml
widget_types:
  metrics_widgets:
    - kpi_card
    - metric_trend
    - gauge_chart
    - progress_bar
    - comparison_chart
    
  workflow_widgets:
    - pipeline_visualizer
    - workflow_status
    - queue_monitor
    - timeline_view
    - kanban_board
    
  agent_widgets:
    - agent_status_grid
    - workload_heatmap
    - performance_radar
    - capacity_planning
    - skill_matrix
    
  quality_widgets:
    - quality_trends
    - defect_distribution
    - gate_performance
    - compliance_status
    - risk_assessment
    
  system_widgets:
    - system_health
    - resource_utilization
    - error_log_viewer
    - alert_summary
    - audit_log
```

### 4.2 Widget Configuration System

#### Configuration Schema
```json
{
  "widget_config": {
    "id": "workflow-pipeline-viz",
    "type": "pipeline_visualizer",
    "title": "QMS Workflow Pipeline",
    "position": {"x": 0, "y": 0, "width": 6, "height": 4},
    "refresh_interval": 30,
    "data_sources": [
      {
        "source": "orchestrator-api",
        "endpoint": "/api/workflows/active",
        "filters": {"status": ["active", "pending"]},
        "transform": "aggregate_by_step"
      }
    ],
    "display_options": {
      "theme": "default",
      "color_scheme": "status_based",
      "animation": "enabled",
      "interactions": ["click", "hover", "drill_down"]
    },
    "alert_thresholds": {
      "queue_depth_warning": 10,
      "queue_depth_critical": 20,
      "cycle_time_threshold": 120
    }
  }
}
```

#### Dynamic Widget Loading
```typescript
class WidgetManager {
  private widgets: Map<string, DashboardWidget> = new Map();
  private registry: WidgetRegistry = new WidgetRegistry();
  
  async loadWidget(config: WidgetConfig): Promise<DashboardWidget> {
    const WidgetClass = await this.registry.getWidget(config.type);
    const widget = new WidgetClass(config);
    
    await widget.initialize(this.getContainer(config.id));
    this.widgets.set(config.id, widget);
    
    // Set up data subscriptions
    this.subscribeToDataSources(widget, config.data_sources);
    
    return widget;
  }
  
  async updateWidget(widgetId: string, data: WidgetData): Promise<void> {
    const widget = this.widgets.get(widgetId);
    if (widget) {
      await widget.update(data);
    }
  }
}
```

## 5. User Interface Design

### 5.1 Responsive Layout System

#### Grid-Based Layout
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 16px;
  padding: 20px;
}

.widget {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: var(--widget-bg);
  padding: 16px;
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
```

#### Theme System
```typescript
interface DashboardTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    sizes: Record<string, string>;
    weights: Record<string, number>;
  };
  spacing: Record<string, string>;
  borders: Record<string, string>;
  shadows: Record<string, string>;
}

const themes: Record<string, DashboardTheme> = {
  light: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b'
    },
    // ... other theme properties
  },
  dark: {
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9'
    },
    // ... other theme properties
  }
};
```

### 5.2 Interactive Components

#### Custom Chart Components
```typescript
interface ChartProps {
  data: ChartData;
  type: ChartType;
  options: ChartOptions;
  onInteraction?: (event: ChartInteractionEvent) => void;
}

const QMSChart: React.FC<ChartProps> = ({ data, type, options, onInteraction }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChart = new Chart(ctx, {
          type,
          data,
          options: {
            ...options,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: options.showLegend,
                position: 'top'
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff'
              }
            },
            onClick: onInteraction
          }
        });
        setChart(newChart);
      }
    }
    
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, type, options]);
  
  return <canvas ref={chartRef} />;
};
```

## 6. Alert and Notification System

### 6.1 Alert Engine

#### Alert Rule Configuration
```yaml
alert_rules:
  workflow_alerts:
    - name: "High Queue Depth"
      condition: "queue_depth > 15"
      severity: "warning"
      duration: "5m"
      channels: ["dashboard", "slack"]
      
    - name: "Workflow Failure Rate High"
      condition: "failure_rate > 10%"
      severity: "critical"
      duration: "2m"
      channels: ["dashboard", "email", "pagerduty"]
      
  agent_alerts:
    - name: "Agent Overload"
      condition: "agent_load > 90%"
      severity: "warning"
      duration: "10m"
      channels: ["dashboard", "slack"]
      
    - name: "Agent Unavailable"
      condition: "agent_status = 'down'"
      severity: "critical"
      duration: "1m"
      channels: ["dashboard", "email", "sms"]
      
  quality_alerts:
    - name: "Quality Score Drop"
      condition: "quality_score < 80%"
      severity: "warning"
      duration: "15m"
      channels: ["dashboard", "email"]
      
    - name: "Critical Defect Detected"
      condition: "defect_severity = 'critical'"
      severity: "critical"
      duration: "0s"
      channels: ["dashboard", "slack", "email"]
```

#### Alert Management System
```typescript
class AlertManager {
  private activeAlerts: Map<string, Alert> = new Map();
  private notificationChannels: Map<string, NotificationChannel> = new Map();
  
  async processAlert(rule: AlertRule, data: AlertData): Promise<void> {
    const alertId = this.generateAlertId(rule, data);
    
    if (this.shouldTriggerAlert(rule, data)) {
      const alert = new Alert({
        id: alertId,
        rule: rule,
        data: data,
        timestamp: new Date(),
        status: 'active'
      });
      
      this.activeAlerts.set(alertId, alert);
      
      // Send notifications through configured channels
      for (const channelName of rule.channels) {
        const channel = this.notificationChannels.get(channelName);
        if (channel) {
          await channel.send(alert);
        }
      }
      
      // Update dashboard
      await this.updateDashboardAlerts();
    }
  }
  
  async acknowledgeAlert(alertId: string, userId: string): Promise<void> {
    const alert = this.activeAlerts.get(alertId);
    if (alert) {
      alert.acknowledge(userId);
      await this.updateDashboardAlerts();
    }
  }
}
```

### 6.2 Notification Channels

#### Channel Implementations
```typescript
interface NotificationChannel {
  name: string;
  send(alert: Alert): Promise<void>;
}

class SlackChannel implements NotificationChannel {
  name = 'slack';
  
  async send(alert: Alert): Promise<void> {
    const message = this.formatSlackMessage(alert);
    await this.slackClient.postMessage({
      channel: this.config.channel,
      text: message.text,
      attachments: message.attachments
    });
  }
  
  private formatSlackMessage(alert: Alert): SlackMessage {
    return {
      text: `QMS Alert: ${alert.rule.name}`,
      attachments: [{
        color: this.getSeverityColor(alert.rule.severity),
        fields: [
          {
            title: 'Severity',
            value: alert.rule.severity,
            short: true
          },
          {
            title: 'Description',
            value: alert.data.description,
            short: false
          }
        ]
      }]
    };
  }
}
```

## 7. Performance Optimization

### 7.1 Data Optimization Strategies

#### Caching Architecture
```typescript
interface CacheLayer {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  invalidate(pattern: string): Promise<void>;
}

class MultiLevelCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private redisCache: Redis;
  
  async get<T>(key: string): Promise<T | null> {
    // Check memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      return memoryEntry.value as T;
    }
    
    // Check Redis cache
    const redisValue = await this.redisCache.get(key);
    if (redisValue) {
      const value = JSON.parse(redisValue) as T;
      // Update memory cache
      this.memoryCache.set(key, {
        value,
        timestamp: Date.now(),
        ttl: 300 // 5 minutes
      });
      return value;
    }
    
    return null;
  }
}
```

#### Data Compression
```typescript
class DataCompressor {
  static compressMetrics(metrics: DashboardMetrics): CompressedMetrics {
    // Remove redundant data points
    const compressed = {
      ...metrics,
      timeSeries: this.compressTimeSeries(metrics.timeSeries),
      distributions: this.compressDistributions(metrics.distributions)
    };
    
    return compressed;
  }
  
  private static compressTimeSeries(series: TimeSeries[]): TimeSeries[] {
    return series.map(s => ({
      ...s,
      data: this.downsample(s.data, 100) // Limit to 100 points max
    }));
  }
}
```

### 7.2 Frontend Performance

#### Virtual Scrolling for Large Datasets
```typescript
const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ 
  data, 
  height = 400,
  rowHeight = 40 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = height;
  const totalHeight = data.length * rowHeight;
  
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / rowHeight) + 1,
    data.length
  );
  
  const visibleData = data.slice(startIndex, endIndex);
  
  return (
    <div 
      className="virtualized-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: startIndex * rowHeight,
            width: '100%'
          }}
        >
          {visibleData.map((item, index) => (
            <div 
              key={startIndex + index}
              style={{ height: rowHeight }}
              className="table-row"
            >
              {/* Row content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## 8. Security and Access Control

### 8.1 Authentication and Authorization

#### Role-Based Access Control
```yaml
rbac_config:
  roles:
    executive:
      permissions:
        - view:executive_dashboard
        - view:all_metrics
        - view:cost_analysis
        - export:reports
        
    qa_lead:
      permissions:
        - view:qa_dashboard
        - view:quality_metrics
        - view:compliance_status
        - manage:quality_gates
        - acknowledge:quality_alerts
        
    developer:
      permissions:
        - view:developer_dashboard
        - view:own_reviews
        - view:team_metrics
        - update:personal_settings
        
    operations:
      permissions:
        - view:operational_dashboard
        - view:system_health
        - manage:alerts
        - view:audit_logs
```

#### JWT-Based Authentication
```typescript
class AuthenticationService {
  async authenticate(token: string): Promise<UserContext | null> {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret) as JWTPayload;
      
      const user = await this.userService.getUser(decoded.sub);
      if (!user || !user.isActive) {
        return null;
      }
      
      const permissions = await this.permissionService.getUserPermissions(user.id);
      
      return {
        user,
        permissions,
        roles: user.roles,
        accessLevel: this.calculateAccessLevel(user.roles)
      };
    } catch (error) {
      this.logger.warn('Authentication failed', { error: error.message });
      return null;
    }
  }
}
```

### 8.2 Data Privacy and Compliance

#### Data Sanitization
```typescript
class DataSanitizer {
  static sanitizeForRole(data: DashboardData, userRole: string): DashboardData {
    const sensitiveFields = this.getSensitiveFields(userRole);
    
    return {
      ...data,
      workflows: data.workflows.map(w => this.sanitizeWorkflow(w, sensitiveFields)),
      agents: data.agents.map(a => this.sanitizeAgent(a, sensitiveFields)),
      metrics: this.sanitizeMetrics(data.metrics, sensitiveFields)
    };
  }
  
  private static sanitizeWorkflow(workflow: Workflow, sensitiveFields: string[]): Workflow {
    const sanitized = { ...workflow };
    
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        delete sanitized[field];
      }
    });
    
    // Anonymize user data if required
    if (sensitiveFields.includes('user_details')) {
      sanitized.author = this.anonymizeUser(sanitized.author);
    }
    
    return sanitized;
  }
}
```

## 9. API Design

### 9.1 REST API Endpoints

#### Dashboard Data API
```yaml
api_endpoints:
  dashboard_data:
    - path: /api/dashboard/executive
      method: GET
      description: "Executive dashboard data"
      parameters:
        - timeframe: "1h|4h|24h|7d|30d"
        - metrics: "quality|efficiency|business"
      response: ExecutiveDashboardData
      
    - path: /api/dashboard/operational
      method: GET
      description: "Operational dashboard data"
      parameters:
        - refresh: boolean
        - filters: object
      response: OperationalDashboardData
      
  widgets:
    - path: /api/widgets/{widget_id}/data
      method: GET
      description: "Widget-specific data"
      parameters:
        - timeframe: string
        - config: object
      response: WidgetData
      
    - path: /api/widgets/{widget_id}/config
      method: PUT
      description: "Update widget configuration"
      body: WidgetConfig
      response: WidgetConfig
      
  alerts:
    - path: /api/alerts
      method: GET
      description: "Active alerts"
      parameters:
        - severity: "info|warning|critical"
        - status: "active|acknowledged|resolved"
      response: Alert[]
      
    - path: /api/alerts/{alert_id}/acknowledge
      method: POST
      description: "Acknowledge alert"
      response: Alert
```

#### API Response Format
```json
{
  "response": {
    "status": "success",
    "timestamp": "2025-08-17T06:23:14Z",
    "data": {
      "dashboard_id": "executive",
      "last_updated": "2025-08-17T06:23:10Z",
      "widgets": [
        {
          "id": "quality-overview",
          "type": "kpi_card",
          "data": {
            "current_value": 87.3,
            "previous_value": 85.1,
            "trend": "up",
            "unit": "percentage"
          }
        }
      ]
    },
    "metadata": {
      "cache_status": "hit",
      "processing_time": 45,
      "data_freshness": 30
    }
  }
}
```

### 9.2 WebSocket Event API

#### Connection Management
```typescript
class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private subscriptions: Map<string, Set<string>> = new Map();
  
  onConnection(ws: WebSocket, userId: string): void {
    this.connections.set(userId, ws);
    
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      this.handleMessage(userId, message);
    });
    
    ws.on('close', () => {
      this.onDisconnection(userId);
    });
  }
  
  handleMessage(userId: string, message: WebSocketMessage): void {
    switch (message.type) {
      case 'subscribe':
        this.subscribe(userId, message.channels);
        break;
      case 'unsubscribe':
        this.unsubscribe(userId, message.channels);
        break;
      case 'ping':
        this.sendPong(userId);
        break;
    }
  }
  
  broadcast(channel: string, data: any): void {
    const subscribers = this.subscriptions.get(channel) || new Set();
    
    subscribers.forEach(userId => {
      const connection = this.connections.get(userId);
      if (connection && connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify({
          type: 'data_update',
          channel,
          data,
          timestamp: Date.now()
        }));
      }
    });
  }
}
```

## 10. Deployment and Infrastructure

### 10.1 Container Architecture

#### Docker Configuration
```dockerfile
# Dashboard Frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

#### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: qms-dashboard
spec:
  replicas: 3
  selector:
    matchLabels:
      app: qms-dashboard
  template:
    metadata:
      labels:
        app: qms-dashboard
    spec:
      containers:
      - name: dashboard
        image: qms-dashboard:v1.0.0
        ports:
        - containerPort: 80
        env:
        - name: API_BASE_URL
          value: "http://qms-api:8080"
        - name: WEBSOCKET_URL
          value: "ws://qms-websocket:8081"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: qms-dashboard
spec:
  selector:
    app: qms-dashboard
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

### 10.2 Monitoring and Observability

#### Metrics Collection
```yaml
dashboard_metrics:
  performance_metrics:
    - response_time_p95: "< 200ms"
    - page_load_time: "< 2s"
    - websocket_latency: "< 50ms"
    - error_rate: "< 1%"
    
  usage_metrics:
    - concurrent_users: gauge
    - page_views: counter
    - widget_interactions: counter
    - api_requests: counter
    
  business_metrics:
    - dashboard_adoption_rate: percentage
    - user_engagement_score: ratio
    - feature_usage_distribution: histogram
    - session_duration: histogram
```

#### Health Checks
```typescript
class HealthCheckService {
  async performHealthCheck(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabaseConnection(),
      this.checkRedisConnection(),
      this.checkWebSocketServer(),
      this.checkExternalAPIs(),
      this.checkMemoryUsage(),
      this.checkDiskSpace()
    ]);
    
    const results = checks.map((check, index) => ({
      name: this.checkNames[index],
      status: check.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      details: check.status === 'fulfilled' ? check.value : check.reason
    }));
    
    const overallStatus = results.every(r => r.status === 'healthy') 
      ? 'healthy' 
      : 'degraded';
    
    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks: results
    };
  }
}
```

## 11. Testing Strategy

### 11.1 Frontend Testing

#### Component Testing
```typescript
describe('QMSChart Component', () => {
  test('renders chart with provided data', () => {
    const mockData = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Quality Score',
        data: [85, 87, 89]
      }]
    };
    
    render(<QMSChart data={mockData} type="line" />);
    
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  
  test('updates chart when data changes', async () => {
    const { rerender } = render(
      <QMSChart data={initialData} type="line" />
    );
    
    rerender(<QMSChart data={updatedData} type="line" />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('90')).toBeInTheDocument();
    });
  });
});
```

#### Integration Testing
```typescript
describe('Dashboard Integration', () => {
  test('loads and displays executive dashboard', async () => {
    const mockApi = new MockAPIClient();
    mockApi.setup('/api/dashboard/executive', executiveDashboardData);
    
    render(<ExecutiveDashboard apiClient={mockApi} />);
    
    await waitFor(() => {
      expect(screen.getByText('Quality Score: 87.3%')).toBeInTheDocument();
      expect(screen.getByText('Defect Rate: 8.4%')).toBeInTheDocument();
    });
  });
});
```

### 11.2 Performance Testing

#### Load Testing
```typescript
const loadTest = async () => {
  const concurrentUsers = 100;
  const testDuration = 300; // 5 minutes
  
  const results = await Promise.all(
    Array.from({ length: concurrentUsers }, (_, i) => 
      simulateUser(i, testDuration)
    )
  );
  
  const metrics = analyzeResults(results);
  
  expect(metrics.averageResponseTime).toBeLessThan(500); // ms
  expect(metrics.errorRate).toBeLessThan(0.01); // 1%
};
```

## 12. Implementation Roadmap

### Phase 1: Core Dashboard Framework (2 weeks)
- [ ] Dashboard engine and widget system
- [ ] Basic UI framework and theme system
- [ ] WebSocket gateway for real-time updates
- [ ] Essential widget types (KPI, charts, tables)
- [ ] Basic authentication and RBAC

### Phase 2: Dashboard Views (2 weeks)
- [ ] Executive dashboard implementation
- [ ] Operational dashboard implementation
- [ ] Developer dashboard implementation
- [ ] QA dashboard implementation
- [ ] Mobile-responsive design

### Phase 3: Advanced Features (1.5 weeks)
- [ ] Alert system and notifications
- [ ] Advanced visualizations and interactions
- [ ] Widget customization and configuration
- [ ] Data export and reporting capabilities
- [ ] Performance optimization

### Phase 4: Integration and Polish (1.5 weeks)
- [ ] Integration with orchestration engine
- [ ] Integration with decision engine
- [ ] Comprehensive testing suite
- [ ] Documentation and training materials
- [ ] Production deployment preparation

## 13. Success Metrics

### Technical Metrics
- **Performance**: < 2s page load time, < 200ms API response time
- **Availability**: 99.9% uptime SLA
- **Scalability**: Support 500+ concurrent users
- **Real-time Updates**: < 100ms WebSocket latency
- **Mobile Compatibility**: 95%+ mobile compatibility score

### User Experience Metrics
- **User Adoption**: > 90% active user adoption within 30 days
- **User Satisfaction**: > 4.2/5.0 user satisfaction score
- **Feature Utilization**: > 80% core feature usage rate
- **Session Duration**: > 5 minutes average session time
- **Error Rate**: < 1% user-reported errors

### Business Impact Metrics
- **Operational Efficiency**: 25% reduction in issue resolution time
- **Decision Making Speed**: 40% faster quality-related decisions
- **Process Transparency**: 95% stakeholder visibility satisfaction
- **Cost Savings**: 15% reduction in manual monitoring overhead
- **Quality Improvement**: 10% improvement in overall quality metrics

## Conclusion

The QMS Real-time Status Dashboard Framework provides comprehensive operational visibility into the entire Quality Management System. Through real-time data streaming, interactive visualizations, intelligent alerting, and role-based access control, this system enables all stakeholders to monitor, analyze, and optimize the QMS processes effectively.

The modular, scalable architecture ensures the dashboard system can evolve with organizational needs while maintaining high performance and user satisfaction. This framework is essential for achieving complete operational transparency and enabling data-driven decision making in the QMS ecosystem.