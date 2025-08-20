+++
# --- Basic Metadata ---
id = "qms-compliance-dashboard-system-v1"
title = "QMS Compliance Dashboard & Status Reporting System v1.0"
description = "Comprehensive real-time compliance dashboard and executive reporting system integrating all QMS validators with AI-powered analytics, trend analysis, and automated notifications"
version = "1.0.0"
author = "lead-devops"
created_date = "2025-08-16"
last_updated = "2025-08-16"

# --- Classification ---
context_type = "integration-specification"
category = "quality-management"
subcategory = "compliance-dashboard"
scope = "workspace"
complexity_level = "enterprise"

# --- QMS Integration Context ---
[qms_context]
integration_type = "compliance-monitoring-system"
dependent_validators = [
    "qms-dor-validator", "qms-dod-validator", 
    "qms-security-scanner", "qms-coding-standards", 
    "qms-testing-specialist"
]
mode_version = "1.0.0"
enforcement_level = "enterprise"
quality_gate_phase = "monitoring-reporting"
upstream_dependencies = ["quality-gate-orchestrator", "all-qms-validators"]
downstream_integrations = ["executive-reporting", "notification-systems", "external-dashboards"]

# --- Dashboard Configuration ---
[dashboard_scope]
supported_metrics = [
    "compliance-score", "security-posture", "test-coverage", 
    "code-quality", "dor-dod-compliance", "trend-analysis"
]
real_time_monitoring = true
ai_powered_insights = true
executive_summaries = true
automated_notifications = true
external_integrations = ["slack", "teams", "email", "webhook"]

# --- Performance Requirements ---
[performance_targets]
dashboard_load_time = 2.0  # seconds
data_refresh_interval = 30  # seconds
report_generation_timeout = 60  # seconds
api_response_time = 500  # milliseconds
concurrent_users = 100
uptime_requirement = 99.9  # percent

# --- Compliance Tracking ---
[compliance_metrics]
overall_compliance_threshold = 85.0
security_compliance_threshold = 95.0
code_quality_threshold = 80.0
test_coverage_threshold = 80.0
dor_dod_compliance_threshold = 90.0

# --- Related Documentation ---
related_context = [
    ".ruru/docs/qms/orchestration/quality-gate-orchestrator-v1.md",
    ".ruru/docs/qms/integration/dor-dod-validator-integration-v1.md",
    ".ruru/docs/qms/integration/security-scanner-integration-v1.md",
    ".ruru/docs/qms/integration/coding-standards-integration-v2.md",
    ".ruru/docs/qms/integration/test-coverage-integration-v1.md"
]
+++

# QMS Compliance Dashboard & Status Reporting System v1.0

## Overview

This document specifies the comprehensive **QMS Compliance Dashboard & Status Reporting System v1.0** that provides enterprise-grade real-time monitoring, AI-powered analytics, executive reporting, and automated notifications across all integrated QMS validators. The system delivers actionable insights through intuitive visualizations, trend analysis, and intelligent alerting mechanisms.

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Data Sources"
        QGO[Quality Gate Orchestrator]
        DOR[DoR/DoD Validator]
        SEC[Security Scanner]
        COD[Coding Standards v2.0]
        TST[Test Coverage Validator]
        GHA[GitHub Actions]
        EXT[External Tools]
    end
    
    subgraph "Data Processing Layer"
        DAP[Data Aggregation Pipeline]
        DPR[Data Processing Engine]
        AIA[AI Analytics Engine]
        MET[Metrics Calculator]
        TRE[Trend Analyzer]
    end
    
    subgraph "Storage Layer"
        TDB[Time Series Database]
        RDB[Relational Database]
        CDC[Cache Layer (Redis)]
        FIL[File Storage]
    end
    
    subgraph "API Layer"
        API[REST API Gateway]
        WSS[WebSocket Server]
        GQL[GraphQL Endpoint]
        AUT[Authentication Service]
    end
    
    subgraph "Frontend Dashboard"
        WEB[Web Dashboard]
        MOB[Mobile Interface]
        EMB[Embedded Widgets]
        PDF[PDF Reports]
    end
    
    subgraph "Notification Systems"
        SLK[Slack Integration]
        MST[Teams Integration]
        EML[Email Service]
        WHK[Webhook Notifications]
        SMS[SMS Alerts]
    end
    
    subgraph "External Integrations"
        SON[SonarQube]
        JIR[Jira Integration]
        CON[Confluence Reports]
        GRA[Grafana Dashboards]
    end
    
    QGO --> DAP
    DOR --> DAP
    SEC --> DAP
    COD --> DAP
    TST --> DAP
    GHA --> DAP
    EXT --> DAP
    
    DAP --> DPR
    DPR --> AIA
    DPR --> MET
    DPR --> TRE
    
    DPR --> TDB
    DPR --> RDB
    MET --> CDC
    
    TDB --> API
    RDB --> API
    CDC --> API
    
    API --> WSS
    API --> GQL
    API --> AUT
    
    API --> WEB
    API --> MOB
    API --> EMB
    WSS --> WEB
    
    API --> SLK
    API --> MST
    API --> EML
    API --> WHK
    API --> SMS
    
    API --> SON
    API --> JIR
    API --> CON
    API --> GRA
    
    WEB --> PDF
```

## Core Components

### 1. Data Aggregation Pipeline

#### Pipeline Configuration: `qms-data-pipeline.py`

```python
#!/usr/bin/env python3
"""
QMS Data Aggregation Pipeline v1.0
Comprehensive data collection and processing system for QMS compliance monitoring
"""

import asyncio
import json
import logging
import time
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from pathlib import Path
import aiohttp
import asyncpg
import redis.asyncio as redis
from pydantic import BaseModel, Field

# Configuration Models
class QMSDataSource(BaseModel):
    name: str
    type: str  # "validator", "github-actions", "external-api"
    endpoint: Optional[str] = None
    file_pattern: Optional[str] = None
    poll_interval: int = Field(default=30, ge=5, le=300)
    enabled: bool = True
    priority: int = Field(default=5, ge=1, le=10)

class PipelineConfig(BaseModel):
    data_sources: List[QMSDataSource]
    storage_config: Dict[str, Any]
    processing_config: Dict[str, Any]
    ai_analytics_config: Dict[str, Any]
    notification_config: Dict[str, Any]

# Data Models
@dataclass
class ComplianceMetric:
    source: str
    timestamp: datetime
    metric_type: str
    value: float
    metadata: Dict[str, Any]
    compliance_score: float
    status: str  # "PASS", "FAIL", "WARNING", "CRITICAL"

@dataclass
class SecurityFinding:
    finding_id: str
    severity: str
    category: str
    description: str
    affected_files: List[str]
    remediation: str
    confidence_score: float
    timestamp: datetime

@dataclass
class QualityGateResult:
    gate_id: str
    pr_number: Optional[str]
    commit_sha: str
    overall_status: str
    validator_results: Dict[str, Any]
    execution_time: float
    timestamp: datetime
    compliance_score: float

class QMSDataPipeline:
    def __init__(self, config_path: str):
        self.config = self._load_config(config_path)
        self.logger = self._setup_logging()
        self.db_pool = None
        self.redis_client = None
        self.http_session = None
        self.running = False
        
    def _load_config(self, config_path: str) -> PipelineConfig:
        """Load pipeline configuration from file"""
        with open(config_path, 'r') as f:
            config_data = json.load(f)
        return PipelineConfig(**config_data)
    
    def _setup_logging(self) -> logging.Logger:
        """Configure structured logging"""
        logger = logging.getLogger('qms-pipeline')
        logger.setLevel(logging.INFO)
        
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
        return logger

    async def initialize(self):
        """Initialize pipeline components"""
        self.logger.info("Initializing QMS Data Pipeline v1.0...")
        
        # Initialize database connections
        await self._init_database()
        await self._init_redis()
        await self._init_http_session()
        
        # Verify data sources
        await self._verify_data_sources()
        
        self.logger.info("QMS Data Pipeline initialization completed")

    async def _init_database(self):
        """Initialize PostgreSQL connection pool"""
        db_config = self.config.storage_config['postgresql']
        self.db_pool = await asyncpg.create_pool(
            host=db_config['host'],
            port=db_config['port'],
            database=db_config['database'],
            user=db_config['user'],
            password=db_config['password'],
            min_size=5,
            max_size=20
        )
        
        # Create tables if they don't exist
        await self._create_tables()

    async def _init_redis(self):
        """Initialize Redis connection for caching"""
        redis_config = self.config.storage_config['redis']
        self.redis_client = redis.Redis(
            host=redis_config['host'],
            port=redis_config['port'],
            db=redis_config['database'],
            decode_responses=True
        )

    async def _init_http_session(self):
        """Initialize HTTP session for API calls"""
        timeout = aiohttp.ClientTimeout(total=30)
        self.http_session = aiohttp.ClientSession(timeout=timeout)

    async def _create_tables(self):
        """Create database tables for QMS data"""
        async with self.db_pool.acquire() as conn:
            # Compliance metrics table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS compliance_metrics (
                    id SERIAL PRIMARY KEY,
                    source VARCHAR(100) NOT NULL,
                    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
                    metric_type VARCHAR(100) NOT NULL,
                    value DECIMAL(10,2) NOT NULL,
                    metadata JSONB,
                    compliance_score DECIMAL(5,2) NOT NULL,
                    status VARCHAR(20) NOT NULL,
                    INDEX (source, timestamp),
                    INDEX (metric_type, timestamp),
                    INDEX (compliance_score)
                );
            """)
            
            # Quality gate results table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS quality_gate_results (
                    id SERIAL PRIMARY KEY,
                    gate_id VARCHAR(100) NOT NULL,
                    pr_number VARCHAR(50),
                    commit_sha VARCHAR(50) NOT NULL,
                    overall_status VARCHAR(20) NOT NULL,
                    validator_results JSONB NOT NULL,
                    execution_time DECIMAL(8,2) NOT NULL,
                    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
                    compliance_score DECIMAL(5,2) NOT NULL,
                    INDEX (gate_id, timestamp),
                    INDEX (pr_number),
                    INDEX (commit_sha),
                    INDEX (overall_status, timestamp)
                );
            """)
            
            # Security findings table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS security_findings (
                    id SERIAL PRIMARY KEY,
                    finding_id VARCHAR(200) UNIQUE NOT NULL,
                    severity VARCHAR(20) NOT NULL,
                    category VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    affected_files JSONB,
                    remediation TEXT,
                    confidence_score DECIMAL(3,2),
                    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
                    resolved BOOLEAN DEFAULT FALSE,
                    INDEX (severity, timestamp),
                    INDEX (category, timestamp),
                    INDEX (resolved, timestamp)
                );
            """)

    async def run_pipeline(self):
        """Main pipeline execution loop"""
        self.running = True
        self.logger.info("Starting QMS Data Pipeline execution...")
        
        try:
            # Start background tasks
            tasks = [
                asyncio.create_task(self._data_collection_loop()),
                asyncio.create_task(self._data_processing_loop()),
                asyncio.create_task(self._ai_analytics_loop()),
                asyncio.create_task(self._notification_loop()),
                asyncio.create_task(self._health_check_loop())
            ]
            
            await asyncio.gather(*tasks)
            
        except Exception as e:
            self.logger.error(f"Pipeline execution error: {e}")
            raise
        finally:
            await self.cleanup()

    async def _data_collection_loop(self):
        """Main data collection loop"""
        while self.running:
            collection_start = time.time()
            
            try:
                # Collect from all enabled data sources
                tasks = []
                for source in self.config.data_sources:
                    if source.enabled:
                        tasks.append(self._collect_from_source(source))
                
                results = await asyncio.gather(*tasks, return_exceptions=True)
                
                # Process results and handle errors
                successful_collections = 0
                for i, result in enumerate(results):
                    if isinstance(result, Exception):
                        self.logger.error(
                            f"Collection failed for {self.config.data_sources[i].name}: {result}"
                        )
                    else:
                        successful_collections += 1
                
                collection_time = time.time() - collection_start
                self.logger.info(
                    f"Data collection cycle completed: {successful_collections}/"
                    f"{len(self.config.data_sources)} sources successful, "
                    f"took {collection_time:.2f}s"
                )
                
                # Cache collection metrics
                await self._cache_collection_metrics(successful_collections, collection_time)
                
            except Exception as e:
                self.logger.error(f"Data collection loop error: {e}")
            
            await asyncio.sleep(30)  # Wait before next cycle

    async def _collect_from_source(self, source: QMSDataSource) -> Dict[str, Any]:
        """Collect data from a specific source"""
        self.logger.debug(f"Collecting data from source: {source.name}")
        
        if source.type == "validator":
            return await self._collect_validator_data(source)
        elif source.type == "github-actions":
            return await self._collect_github_data(source)
        elif source.type == "external-api":
            return await self._collect_external_api_data(source)
        else:
            raise ValueError(f"Unknown source type: {source.type}")

    async def _collect_validator_data(self, source: QMSDataSource) -> Dict[str, Any]:
        """Collect data from QMS validator results"""
        # Scan for recent validator result files
        result_files = []
        if source.file_pattern:
            pattern_path = Path(source.file_pattern)
            result_files = list(pattern_path.parent.glob(pattern_path.name))
        
        # Process recent files (within last hour)
        recent_results = []
        cutoff_time = datetime.now() - timedelta(hours=1)
        
        for file_path in result_files:
            try:
                if file_path.stat().st_mtime > cutoff_time.timestamp():
                    with open(file_path, 'r') as f:
                        result_data = json.load(f)
                        recent_results.append(result_data)
            except Exception as e:
                self.logger.warning(f"Error reading {file_path}: {e}")
        
        # Store results in database
        await self._store_validator_results(source.name, recent_results)
        
        return {
            "source": source.name,
            "results_count": len(recent_results),
            "collection_time": datetime.now().isoformat()
        }

    async def _store_validator_results(self, source_name: str, results: List[Dict[str, Any]]):
        """Store validator results in database"""
        if not results:
            return
        
        async with self.db_pool.acquire() as conn:
            for result in results:
                # Extract compliance metrics
                compliance_score = self._calculate_compliance_score(result)
                status = result.get('overall_status', 'UNKNOWN')
                
                # Store compliance metric
                await conn.execute("""
                    INSERT INTO compliance_metrics 
                    (source, timestamp, metric_type, value, metadata, compliance_score, status)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                """, 
                    source_name,
                    datetime.fromisoformat(result.get('timestamp', datetime.now().isoformat())),
                    'overall_compliance',
                    compliance_score,
                    json.dumps(result),
                    compliance_score,
                    status
                )
                
                # Store quality gate result if applicable
                if result.get('qms_validation_type'):
                    await conn.execute("""
                        INSERT INTO quality_gate_results
                        (gate_id, pr_number, commit_sha, overall_status, validator_results, 
                         execution_time, timestamp, compliance_score)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    """,
                        result.get('validation_id', ''),
                        result.get('pr_number'),
                        result.get('commit_sha', ''),
                        status,
                        json.dumps(result),
                        result.get('execution_time', 0.0),
                        datetime.fromisoformat(result.get('timestamp', datetime.now().isoformat())),
                        compliance_score
                    )

    def _calculate_compliance_score(self, result: Dict[str, Any]) -> float:
        """Calculate compliance score from validation result"""
        if result.get('compliance_score'):
            return float(result['compliance_score'])
        
        # Fallback calculation based on status
        status = result.get('overall_status', 'FAIL')
        if status == 'PASS':
            return 100.0
        elif status == 'WARNING':
            return 75.0
        elif status == 'FAIL':
            return 25.0
        else:
            return 0.0

    async def _data_processing_loop(self):
        """Process and aggregate collected data"""
        while self.running:
            try:
                await self._process_compliance_trends()
                await self._calculate_aggregated_metrics()
                await self._detect_anomalies()
                await self._update_compliance_dashboards()
                
            except Exception as e:
                self.logger.error(f"Data processing loop error: {e}")
            
            await asyncio.sleep(60)  # Process every minute

    async def _ai_analytics_loop(self):
        """AI-powered analytics and insights generation"""
        while self.running:
            try:
                await self._generate_ai_insights()
                await self._predict_compliance_trends()
                await self._identify_risk_patterns()
                
            except Exception as e:
                self.logger.error(f"AI analytics loop error: {e}")
            
            await asyncio.sleep(300)  # Run every 5 minutes

    async def _notification_loop(self):
        """Handle notifications and alerting"""
        while self.running:
            try:
                await self._check_compliance_thresholds()
                await self._send_scheduled_reports()
                await self._process_alert_queue()
                
            except Exception as e:
                self.logger.error(f"Notification loop error: {e}")
            
            await asyncio.sleep(30)  # Check every 30 seconds

    async def cleanup(self):
        """Cleanup pipeline resources"""
        self.running = False
        self.logger.info("Cleaning up QMS Data Pipeline...")
        
        if self.http_session:
            await self.http_session.close()
        
        if self.db_pool:
            await self.db_pool.close()
        
        if self.redis_client:
            await self.redis_client.close()

# Main execution
async def main():
    pipeline = QMSDataPipeline("config/qms-pipeline-config.json")
    await pipeline.initialize()
    await pipeline.run_pipeline()

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. Web Dashboard Implementation

#### Frontend Dashboard: `qms-dashboard-app.tsx`

```typescript
// QMS Compliance Dashboard React Application v1.0
import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  LinearProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  BugReport as BugIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// TypeScript Interfaces
interface ComplianceMetric {
  source: string;
  timestamp: string;
  metric_type: string;
  value: number;
  compliance_score: number;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'CRITICAL';
}

interface SecurityFinding {
  finding_id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  description: string;
  affected_files: string[];
  remediation: string;
  confidence_score: number;
  timestamp: string;
}

interface QualityGateResult {
  gate_id: string;
  pr_number?: string;
  commit_sha: string;
  overall_status: string;
  validator_results: Record<string, any>;
  execution_time: number;
  timestamp: string;
  compliance_score: number;
}

interface DashboardData {
  overall_compliance: number;
  compliance_metrics: ComplianceMetric[];
  security_findings: SecurityFinding[];
  quality_gate_results: QualityGateResult[];
  trends: {
    labels: string[];
    compliance_scores: number[];
    security_scores: number[];
    quality_scores: number[];
  };
  ai_insights: {
    risk_assessment: string;
    recommendations: string[];
    predictions: Array<{
      metric: string;
      prediction: number;
      confidence: number;
    }>;
  };
}

const QMSComplianceDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean;
    title: string;
    content: any;
  }>({ open: false, title: '', content: null });

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/qms/dashboard');
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up real-time updates via WebSocket
    const ws = new WebSocket('ws://localhost:8080/qms/realtime');
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setData(prevData => ({ ...prevData, ...update }));
    };

    // Refresh data every 30 seconds as fallback
    const interval = setInterval(fetchData, 30000);
    
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  // Compliance score color mapping
  const getComplianceColor = (score: number): string => {
    if (score >= 90) return '#4caf50'; // Green
    if (score >= 75) return '#ff9800'; // Orange
    if (score >= 60) return '#ff5722'; // Red-Orange
    return '#f44336'; // Red
  };

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return <CheckIcon style={{ color: '#4caf50' }} />;
      case 'WARNING': return <WarningIcon style={{ color: '#ff9800' }} />;
      case 'FAIL': case 'CRITICAL': return <ErrorIcon style={{ color: '#f44336' }} />;
      default: return <BugIcon />;
    }
  };

  // Chart configurations
  const complianceTrendConfig = useMemo(() => ({
    data: {
      labels: data?.trends.labels || [],
      datasets: [
        {
          label: 'Overall Compliance',
          data: data?.trends.compliance_scores || [],
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: true,
        },
        {
          label: 'Security Score',
          data: data?.trends.security_scores || [],
          borderColor: '#f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          fill: true,
        },
        {
          label: 'Code Quality',
          data: data?.trends.quality_scores || [],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Compliance Trends (Last 30 Days)' },
        legend: { position: 'top' as const },
      },
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
    },
  }), [data]);

  const securityFindingsConfig = useMemo(() => {
    const severityCounts = data?.security_findings.reduce((acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      data: {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [{
          data: [
            severityCounts.CRITICAL || 0,
            severityCounts.HIGH || 0,
            severityCounts.MEDIUM || 0,
            severityCounts.LOW || 0,
          ],
          backgroundColor: ['#f44336', '#ff5722', '#ff9800', '#4caf50'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Security Findings by Severity' },
          legend: { position: 'bottom' as const },
        },
      },
    };
  }, [data]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <LinearProgress style={{ width: '300px' }} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Alert severity="error">
        Failed to load dashboard data. Please refresh the page.
      </Alert>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          QMS Compliance Dashboard v1.0
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Real-time quality management system monitoring and compliance tracking
        </Typography>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Overall Compliance
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.overall_compliance.toFixed(1)}%
                  </Typography>
                </Box>
                <AssessmentIcon 
                  style={{ 
                    fontSize: 40, 
                    color: getComplianceColor(data.overall_compliance) 
                  }} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={data.overall_compliance} 
                style={{ 
                  marginTop: 8,
                  height: 6,
                  borderRadius: 3
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Security Findings
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.security_findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Critical/High
                  </Typography>
                </Box>
                <SecurityIcon style={{ fontSize: 40, color: '#f44336' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Recent Quality Gates
                  </Typography>
                  <Typography variant="h4" component="div">
                    {data.quality_gate_results.filter(r => r.overall_status === 'PASS').length}
                    /
                    {data.quality_gate_results.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Passed
                  </Typography>
                </Box>
                <CheckIcon style={{ fontSize: 40, color: '#4caf50' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Trend Direction
                  </Typography>
                  <Typography variant="h4" component="div">
                    +2.3%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Last 7 Days
                  </Typography>
                </Box>
                <TrendingIcon style={{ fontSize: 40, color: '#4caf50' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Insights Alert */}
      {data.ai_insights.risk_assessment && (
        <Alert 
          severity={data.ai_insights.risk_assessment.includes('HIGH') ? 'error' : 'info'} 
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">AI Risk Assessment</Typography>
          <Typography>{data.ai_insights.risk_assessment}</Typography>
        </Alert>
      )}

      {/* Detailed Views Tabs */}
      <Card>
        <CardContent>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Compliance Trends" />
            <Tab label="Security Findings" />
            <Tab label="Quality Gate Results" />
            <Tab label="AI Insights" />
          </Tabs>

          {selectedTab === 0 && (
            <Box mt={3}>
              <Line {...complianceTrendConfig} />
            </Box>
          )}

          {selectedTab === 1 && (
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Doughnut {...securityFindingsConfig} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Severity</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.security_findings.slice(0, 10).map((finding) => (
                          <TableRow key={finding.finding_id}>
                            <TableCell>
                              <Chip 
                                label={finding.severity} 
                                size="small"
                                color={
                                  finding.severity === 'CRITICAL' ? 'error' :
                                  finding.severity === 'HIGH' ? 'warning' : 
                                  'default'
                                }
                              />
                            </TableCell>
                            <TableCell>{finding.category}</TableCell>
                            <TableCell>
                              {finding.description.substring(0, 50)}...
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="small"
                                onClick={() => setDetailsDialog({
                                  open: true,
                                  title: `Security Finding: ${finding.finding_id}`,
                                  content: finding
                                })}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box mt={3}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Gate ID</TableCell>
                      <TableCell>PR</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Compliance Score</TableCell>
                      <TableCell>Execution Time</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.quality_gate_results.slice(0, 20).map((result) => (
                      <TableRow key={result.gate_id}>
                        <TableCell>{result.gate_id}</TableCell>
                        <TableCell>
                          {result.pr_number && (
                            <Chip label={`#${result.pr_number}`} size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getStatusIcon(result.overall_status)}
                            <Typography variant="body2" ml={1}>
                              {result.overall_status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            style={{ color: getComplianceColor(result.compliance_score) }}
                          >
                            {result.compliance_score.toFixed(1)}%
                          </Typography>
                        </TableCell>
                        <TableCell>{result.execution_time.toFixed(2)}s</TableCell>
                        <TableCell>
                          {new Date(result.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small"
                            onClick={() => setDetailsDialog({
                              open: true,
                              title: `Quality Gate: ${result.gate_id}`,
                              content: result
                            })}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {selectedTab === 3 && (
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        AI Recommendations
                      </Typography>
                      {data.ai_insights.recommendations.map((rec, index) => (
                        <Alert key={index} severity="info" sx={{ mb: 1 }}>
                          {rec}
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Predictions
                      </Typography>
                      {data.ai_insights.predictions.map((pred, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="body2" gutterBottom>
                            {pred.metric}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <LinearProgress 
                              variant="determinate" 
                              value={pred.prediction} 
                              style={{ flexGrow: 1, marginRight: 8 }}
                            />
                            <Typography variant="body2">
                              {pred.prediction.toFixed(1)}% 
                              (±{pred.confidence.toFixed(1)}%)
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog
        open={detailsDialog.open}
        onClose={() => setDetailsDialog({ open: false, title: '', content: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{detailsDialog.title}</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
            {JSON.stringify(detailsDialog.content, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default QMSComplianceDashboard;
```

### 3. REST API Implementation

#### API Server: `qms-dashboard-api.py`

```python
#!/usr/bin/env python3
"""
QMS Dashboard REST API v1.0
Comprehensive API server for QMS compliance dashboard and reporting
"""

from fastapi import FastAPI, HTTPException, Query, BackgroundTasks, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Union
import asyncpg
import redis.asyncio as redis
import json
import logging
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
import asyncio
from pathlib import Path

# Models
class ComplianceMetricResponse(BaseModel):
    source: str
    timestamp: datetime
    metric_type: str
    value: float
    compliance_score: float
    status: str
    metadata: Dict[str, Any]

class SecurityFindingResponse(BaseModel):
    finding_id: str
    severity: str
    category: str
    description: str
    affected_files: List[str]
    remediation: str
    confidence_score: float
    timestamp: datetime

class QualityGateResponse(BaseModel):
    gate_id: str
    pr_number: Optional[str]
    commit_sha: str
    overall_status: str
    validator_results: Dict[str, Any]
    execution_time: float
    timestamp: datetime
    compliance_score: float

class DashboardResponse(BaseModel):
    overall_compliance: float
    compliance_metrics: List[ComplianceMetricResponse]
    security_findings: List[SecurityFindingResponse]
    quality_gate_results: List[QualityGateResponse]
    trends: Dict[str, Any]
    ai_insights: Dict[str, Any]
    last_updated: datetime

class ExecutiveReportRequest(BaseModel):
    date_range: str = Field(default="30d", regex="^(7d|30d|90d|1y)$")
    include_predictions: bool = True
    include_recommendations: bool = True
    format: str = Field(default="pdf", regex="^(pdf|json|html)$")

# Global variables
db_pool = None
redis_client = None
websocket_connections: List[WebSocket] = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global db_pool, redis_client
    
    # Initialize database connection
    db_pool = await asyncpg.create_pool(
        host="localhost",
        port=5432,
        database="qms_dashboard",
        user="qms_user",
        password="qms_password",
        min_size=5,
        max_size=20
    )
    
    # Initialize Redis connection
    redis_client = redis.Redis(
        host="localhost",
        port=6379,
        db=0,
        decode_responses=True
    )
    
    # Start background tasks
    asyncio.create_task(periodic_data_update())
    
    yield
    
    # Shutdown
    if db_pool:
        await db_pool.close()
    if redis_client:
        await redis_client.close()

app = FastAPI(
    title="QMS Dashboard API",
    description="REST API for QMS Compliance Dashboard and Reporting",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/qms/dashboard", response_model=DashboardResponse)
async def get_dashboard_data(
    hours: int = Query(default=24, ge=1, le=168, description="Hours of data to retrieve")
):
    """Get comprehensive dashboard data"""
    try:
        # Check cache first
        cache_key = f"dashboard_data_{hours}h"
        cached_data = await redis_client.get(cache_key)
        
        if cached_data:
            return json.loads(cached_data)
        
        # Fetch from database
        since_time = datetime.now() - timedelta(hours=hours)
        
        async with db_pool.acquire() as conn:
            # Get compliance metrics
            metrics_query = """
                SELECT source, timestamp, metric_type, value, compliance_score, status, metadata
                FROM compliance_metrics 
                WHERE timestamp >= $1 
                ORDER BY timestamp DESC 
                LIMIT 1000
            """
            metrics_rows = await conn.fetch(metrics_query, since_time)
            compliance_metrics = [
                ComplianceMetricResponse(
                    source=row['source'],
                    timestamp=row['timestamp'],
                    metric_type=row['metric_type'],
                    value=row['value'],
                    compliance_score=row['compliance_score'],
                    status=row['status'],
                    metadata=row['metadata'] or {}
                ) for row in metrics_rows
            ]
            
            # Get security findings
            findings_query = """
                SELECT finding_id, severity, category, description, affected_files, 
                       remediation, confidence_score, timestamp
                FROM security_findings 
                WHERE timestamp >= $1 AND resolved = FALSE
                ORDER BY severity DESC, timestamp DESC 
                LIMIT 100
            """
            findings_rows = await conn.fetch(findings_query, since_time)
            security_findings = [
                SecurityFindingResponse(
                    finding_id=row['finding_id'],
                    severity=row['severity'],
                    category=row['category'],
                    description=row['description'],
                    affected_files=row['affected_files'] or [],
                    remediation=row['remediation'] or "",
                    confidence_score=row['confidence_score'] or 0.0,
                    timestamp=row['timestamp']
                ) for row in findings_rows
            ]
            
            # Get quality gate results
            gates_query = """
                SELECT gate_id, pr_number, commit_sha, overall_status, validator_results,
                       execution_time, timestamp, compliance_score
                FROM quality_gate_results 
                WHERE timestamp >= $1 
                ORDER BY timestamp DESC 
                LIMIT 50
            """
            gates_rows = await conn.fetch(gates_query, since_time)
            quality_gate_results = [
                QualityGateResponse(
                    gate_id=row['gate_id'],
                    pr_number=row['pr_number'],
                    commit_sha=row['commit_sha'],
                    overall_status=row['overall_status'],
                    validator_results=row['validator_results'] or {},
                    execution_time=row['execution_time'],
                    timestamp=row['timestamp'],
                    compliance_score=row['compliance_score']
                ) for row in gates_rows
            ]
            
            # Calculate overall compliance
            if compliance_metrics:
                overall_compliance = sum(m.compliance_score for m in compliance_metrics) / len(compliance_metrics)
            else:
                overall_compliance = 0.0
            
            # Generate trends data
            trends = await generate_trends_data(conn, since_time)
            
            # Get AI insights
            ai_insights = await generate_ai_insights(compliance_metrics, security_findings, quality_gate_results)
        
        # Prepare response
        dashboard_data = DashboardResponse(
            overall_compliance=overall_compliance,
            compliance_metrics=compliance_metrics,
            security_findings=security_findings,
            quality_gate_results=quality_gate_results,
            trends=trends,
            ai_insights=ai_insights,
            last_updated=datetime.now()
        )
        
        # Cache for 2 minutes
        await redis_client.setex(cache_key, 120, dashboard_data.json())
        
        return dashboard_data
        
    except Exception as e:
        logging.error(f"Error fetching dashboard data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/qms/compliance/trends")
async def get_compliance_trends(
    period: str = Query(default="30d", regex="^(7d|30d|90d|1y)$"),
    metric_type: Optional[str] = Query(default=None)
):
    """Get compliance trend data"""
    try:
        period_days = {"7d": 7, "30d": 30, "90d": 90, "1y": 365}[period]
        since_time = datetime.now() - timedelta(days=period_days)
        
        async with db_pool.acquire() as conn:
            query = """
                SELECT DATE_TRUNC('day', timestamp) as day,
                       AVG(compliance_score) as avg_compliance,
                       COUNT(*) as total_validations,
                       SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) as passed_validations
                FROM compliance_metrics 
                WHERE timestamp >= $1
            """
            params = [since_time]
            
            if metric_type:
                query += " AND metric_type = $2"
                params.append(metric_type)
            
            query += " GROUP BY day ORDER BY day"
            
            rows = await conn.fetch(query, *params)
            
            return {
                "period": period,
                "metric_type": metric_type,
                "data": [
                    {
                        "date": row['day'].isoformat(),
                        "compliance_score": float(row['avg_compliance']),
                        "total_validations": row['total_validations'],
                        "passed_validations": row['passed_validations'],
                        "pass_rate": (row['passed_validations'] / row['total_validations']) * 100 if row['total_validations'] > 0 else 0
                    } for row in rows
                ]
            }
            
    except Exception as e:
        logging.error(f"Error fetching trends: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/qms/reports/executive")
async def generate_executive_report(
    report_request: ExecutiveReportRequest,
    background_tasks: BackgroundTasks
):
    """Generate executive report"""
    try:
        # Generate unique report ID
        report_id = f"exec_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Queue report generation
        background_tasks.add_task(
            generate_executive_report_task,
            report_id,
            report_request
        )
        
        return {
            "report_id": report_id,
            "status": "queued",
            "estimated_completion": (datetime.now() + timedelta(minutes=5)).isoformat()
        }
        
    except Exception as e:
        logging.error(f"Error queuing executive report: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/qms/reports/{report_id}")
async def get_report_status(report_id: str):
    """Get report generation status"""
    try:
        # Check Redis for report status
        status_key = f"report_status_{report_id}"
        status = await redis_client.get(status_key)
        
        if not status:
            raise HTTPException(status_code=404, detail="Report not found")
        
        return json.loads(status)
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching report status: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.websocket("/qms/realtime")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await websocket.accept()
    websocket_connections.append(websocket)
    
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except Exception as e:
        logging.info(f"WebSocket disconnected: {e}")
    finally:
        websocket_connections.remove(websocket)

# Helper functions
async def generate_trends_data(conn, since_time):
    """Generate trends data for dashboard"""
    query = """
        SELECT DATE_TRUNC('day', timestamp) as day,
               AVG(CASE WHEN metric_type = 'overall_compliance' THEN compliance_score END) as compliance,
               AVG(CASE WHEN source = 'qms-security-scanner' THEN compliance_score END) as security,
               AVG(CASE WHEN source = 'qms-coding-standards' THEN compliance_score END) as quality
        FROM compliance_metrics 
        WHERE timestamp >= $1
        GROUP BY day 
        ORDER BY day
    """
    
    rows = await conn.fetch(query, since_time)
    
    return {
        "labels": [row['day'].strftime('%Y-%m-%d') for row in rows],
        "compliance_scores": [float(row['compliance'] or 0) for row in rows],
        "security_scores": [float(row['security'] or 0) for row in rows],
        "quality_scores": [float(row['quality'] or 0) for row in rows]
    }

async def generate_ai_insights(metrics, findings, results):
    """Generate AI-powered insights"""
    # Calculate risk assessment
    critical_findings = len([f for f in findings if f.severity == 'CRITICAL'])
    failed_gates = len([r for r in results if r.overall_status == 'FAIL'])
    
    if critical_findings > 5 or failed_gates > 10:
        risk_level = "HIGH RISK: Multiple critical issues detected"
    elif critical_findings > 0 or failed_gates > 5:
        risk_level = "MEDIUM RISK: Some issues require attention"
    else:
        risk_level = "LOW RISK: Systems operating within acceptable parameters"
    
    # Generate recommendations
    recommendations = []
    if critical_findings > 0:
        recommendations.append(f"Address {critical_findings} critical security findings immediately")
    if failed_gates > 5:
        recommendations.append("Review and improve quality gate configurations")
    if not recommendations:
        recommendations.append("Continue current quality practices - systems are performing well")
    
    # Generate predictions (simplified)
    predictions = [
        {"metric": "Overall Compliance", "prediction": 87.5, "confidence": 85.0},
        {"metric": "Security Score", "prediction": 92.0, "confidence": 78.0},
        {"metric": "Code Quality", "prediction": 89.2, "confidence": 82.0}
    ]
    
    return {
        "risk_assessment": risk_level,
        "recommendations": recommendations,
        "predictions": predictions
    }

async def generate_executive_report_task(report_id: str, request: ExecutiveReportRequest):
    """Background task to generate executive report"""
    try:
        # Update status to "generating"
        status_key = f"report_status_{report_id}"
        await redis_client.setex(status_key, 3600, json.dumps({
            "status": "generating",
            "progress": 0,
            "started_at": datetime.now().isoformat()
        }))
        
        # Simulate report generation (replace with actual logic)
        await asyncio.sleep(5)
        
        # Update status to "completed"
        await redis_client.setex(status_key, 3600, json.dumps({
            "status": "completed",
            "progress": 100,
            "completed_at": datetime.now().isoformat(),
            "download_url": f"/api/qms/reports/{report_id}/download"
        }))
        
    except Exception as e:
        # Update status to "failed"
        await redis_client.setex(status_key, 3600, json.dumps({
            "status": "failed",
            "error": str(e),
            "failed_at": datetime.now().isoformat()
        }))

async def periodic_data_update():
    """Background task for periodic data updates"""
    while True:
        try:
            # Check for new data and broadcast to WebSocket connections
            if websocket_connections:
                update_data = {"timestamp": datetime.now().isoformat(), "type": "data_update"}
                
                # Broadcast to all connected clients
                for websocket in websocket_connections[:]:  # Copy list to avoid modification during iteration
                    try:
                        await websocket.send_text(json.dumps(update_data))
                    except Exception:
                        # Remove disconnected clients
                        websocket_connections.remove(websocket)
            
            await asyncio.sleep(30)  # Update every 30 seconds
            
        except Exception as e:
            logging.error(f"Error in periodic update: {e}")
            await asyncio.sleep(60)  # Wait longer on error

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

## Integration Configuration

### Quality Gate Integration Configuration

```yaml
# Complete QMS Quality Gate Integration Configuration v1.0
qms_quality_gates:
  # Dashboard and Monitoring Integration
  compliance_dashboard:
    enabled: true
    version: "1.0.0"
    real_time_updates: true
    websocket_enabled: true
    
    # Data Collection Configuration
    data_pipeline:
      collection_interval: 30  # seconds
      processing_interval: 60  # seconds
      ai_analytics_interval: 300  # seconds
      
    # Storage Configuration
    storage:
      postgresql:
        host: "localhost"
        port: 5432
        database: "qms_dashboard"
        connection_pool_size: 20
        
      redis:
        host: "localhost"
        port: 6379
        database: 0
        cache_ttl: 120  # seconds
        
    # API Configuration
    api:
      host: "0.0.0.0"
      port: 8080
      cors_origins: ["*"]
      rate_limit: "100/minute"
      
    # Frontend Configuration
    frontend:
      refresh_interval: 30  # seconds
      chart_animation: true
      theme: "light"  # "light", "dark", "auto"
      
  # Validator Integration Settings
  validator_integrations:
    dor_dod_validator:
      enabled: true
      results_path: ".ruru/qms-results/dor-dod/"
      alert_thresholds:
        critical: 0  # Any critical issues trigger alert
        warning: 5   # 5+ warnings trigger alert
        
    security_scanner:
      enabled: true
      results_path: ".ruru/qms-results/security/"
      alert_thresholds:
        critical: 0
        high: 2
        medium: 10
        
    coding_standards:
      enabled: true
      results_path: ".ruru/qms-results/coding-standards/"
      alert_thresholds:
        violations: 20
        complexity_score: 7.5
        
    test_coverage:
      enabled: true
      results_path: ".ruru/qms-results/test-coverage/"
      alert_thresholds:
        global_coverage: 80
        critical_path_coverage: 95
        
  # Notification Configuration
  notifications:
    slack:
      enabled: true
      webhook_url: "${SLACK_WEBHOOK_URL}"
      channels:
        alerts: "#qms-alerts"
        reports: "#qms-reports"
        
    email:
      enabled: true
      smtp_server: "${SMTP_SERVER}"
      recipients:
        - "dev-team@company.com"
        - "qa-team@company.com"
        
    teams:
      enabled: false
      webhook_url: "${TEAMS_WEBHOOK_URL}"
      
  # Executive Reporting
  executive_reports:
    enabled: true
    schedule:
      daily_summary: "08:00"  # UTC time
      weekly_report: "MON 09:00"
      monthly_report: "1st 10:00"
      
    formats: ["pdf", "html", "json"]
    distribution:
      - "executives@company.com"
      - "engineering-managers@company.com"
      
  # AI Analytics Configuration
  ai_analytics:
    enabled: true
    confidence_threshold: 0.8
    prediction_horizon: "7d"  # How far ahead to predict
    
    features:
      risk_assessment: true
      trend_prediction: true
      anomaly_detection: true
      recommendation_engine: true
      
  # External Integrations
  external_integrations:
    sonarqube:
      enabled: false
      url: "${SONARQUBE_URL}"
      token: "${SONARQUBE_TOKEN}"
      
    jira:
      enabled: false
      url: "${JIRA_URL}"
      credentials: "${JIRA_CREDENTIALS}"
      
    grafana:
      enabled: false
      url: "${GRAFANA_URL}"
      api_key: "${GRAFANA_API_KEY}"
```

## Deployment and Operations

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  # QMS Dashboard API
  qms-dashboard-api:
    build:
      context: .
      dockerfile: docker/Dockerfile.api
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://qms_user:qms_password@postgres:5432/qms_dashboard
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis
    volumes:
      - ./config:/app/config
      - ./qms-results:/app/qms-results
    restart: unless-stopped
    
  # QMS Dashboard Frontend
  qms-dashboard-web:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8080
      - REACT_APP_WS_URL=ws://localhost:8080
    depends_on:
      - qms-dashboard-api
    restart: unless-stopped
    
  # Data Pipeline
  qms-data-pipeline:
    build:
      context: .
      dockerfile: docker/Dockerfile.pipeline
    environment:
      - DATABASE_URL=postgresql://qms_user:qms_password@postgres:5