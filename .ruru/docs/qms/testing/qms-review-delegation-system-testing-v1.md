+++
# Document Metadata
id = "qms-review-delegation-system-testing-v1"
title = "QMS Review Delegation System Testing V1.0"
version = "1.0"
created_date = "2025-08-17T06:57:00Z"
updated_date = "2025-08-17T06:57:00Z"
document_type = "testing-procedures"

# Classification and Context
category = "qms-testing"
subcategory = "review-delegation"
context_type = "validation"
scope = "Review delegation algorithms, code analysis, specialist assignment, load balancing"
target_audience = ["qms-testing-specialist", "qms-code-reviewer", "lead-devops", "qms-coordinators"]
granularity = "comprehensive"
status = "active"
importance = "critical"

# Technical Context
[technical_context]
testing_approach = "scenario-based"
coverage_areas = ["code-analysis", "reviewer-assignment", "load-balancing", "escalation", "performance"]
automation_level = "automated"
execution_environment = ["unit-tests", "integration-tests", "performance-tests"]

# QMS Integration
[qms_context]
delegation_components_tested = ["code-analyzer", "reviewer-matcher", "load-balancer", "escalation-engine"]
supported_languages = ["typescript", "python", "go", "java", "rust", "php", "ruby"]
assignment_algorithms = ["expertise-based", "workload-balanced", "availability-aware", "priority-weighted"]

# Dependencies and References
related_docs = [
    ".ruru/docs/qms/delegation/",
    ".ruru/modes/qms-code-reviewer/",
    ".ruru/docs/qms/testing/qms-end-to-end-test-scenarios-v1.md",
    ".ruru/docs/qms/workflows/"
]
+++

# QMS Review Delegation System Testing V1.0

## Executive Summary

This document defines comprehensive testing procedures for the Quality Management System (QMS) Review Delegation System, ensuring accurate code analysis, intelligent reviewer assignment, effective load balancing, and proper escalation handling. The review delegation system is the core intelligence layer that matches code changes with the most appropriate reviewers based on expertise, availability, and workload distribution.

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Code Analysis Engine Testing](#code-analysis-engine-testing)
3. [Reviewer Assignment Algorithm Testing](#reviewer-assignment-algorithm-testing)
4. [Load Balancing System Validation](#load-balancing-system-validation)
5. [Escalation Procedure Testing](#escalation-procedure-testing)
6. [Multi-Language Support Testing](#multi-language-support-testing)
7. [Performance and Scale Testing](#performance-and-scale-testing)
8. [Conflict Resolution Testing](#conflict-resolution-testing)
9. [Integration Testing Scenarios](#integration-testing-scenarios)
10. [Metrics and Reporting Validation](#metrics-and-reporting-validation)

---

## System Architecture Overview

### Core Components

#### Review Delegation System Architecture
```yaml
Review Delegation System:
  code_analyzer:
    purpose: "Analyze code changes and extract relevant metadata"
    responsibilities:
      - "File type detection"
      - "Change complexity analysis"
      - "Domain/feature detection"
      - "Security impact assessment"
      - "Performance impact detection"
    
  reviewer_matcher:
    purpose: "Match code changes with appropriate reviewers"
    responsibilities:
      - "Expertise mapping"
      - "Historical performance analysis"
      - "Availability checking"
      - "Conflict of interest detection"
    
  load_balancer:
    purpose: "Distribute review workload fairly"
    responsibilities:
      - "Current workload tracking"
      - "Review velocity monitoring"
      - "Capacity planning"
      - "Burnout prevention"
    
  escalation_engine:
    purpose: "Handle complex or blocked reviews"
    responsibilities:
      - "Timeout detection"
      - "Complexity escalation"
      - "Senior reviewer assignment"
      - "Emergency review handling"
```

### Key Algorithms

#### Assignment Algorithm Types
```yaml
Assignment Algorithms:
  expertise_based:
    weight: 40
    factors: ["domain_knowledge", "language_proficiency", "historical_accuracy"]
    
  workload_balanced:
    weight: 30
    factors: ["current_reviews", "review_velocity", "capacity_limits"]
    
  availability_aware:
    weight: 20
    factors: ["timezone", "working_hours", "vacation_status", "current_load"]
    
  priority_weighted:
    weight: 10
    factors: ["pr_priority", "security_impact", "deadline_urgency"]
```

---

## Code Analysis Engine Testing

### Test Framework Setup

#### Code Analysis Test Harness
```python
#!/usr/bin/env python3
"""
QMS Code Analysis Engine Testing Framework
"""

import pytest
import json
import tempfile
import shutil
from typing import Dict, List, Any, Tuple
from pathlib import Path
from datetime import datetime
import subprocess

class CodeAnalysisTestHarness:
    def __init__(self, qms_analyzer_path: str = "./qms-code-analyzer"):
        self.qms_analyzer = qms_analyzer_path
        self.test_repositories = {}
        self.analysis_results = []
    
    def setup_test_repository(self, repo_name: str, language: str, 
                             complexity: str = "medium") -> Path:
        """Create a test repository with realistic code patterns"""
        repo_path = Path(tempfile.mkdtemp()) / repo_name
        repo_path.mkdir(parents=True)
        
        # Generate language-specific test files
        if language == "typescript":
            self._create_typescript_test_files(repo_path, complexity)
        elif language == "python":
            self._create_python_test_files(repo_path, complexity)
        elif language == "go":
            self._create_go_test_files(repo_path, complexity)
        elif language == "java":
            self._create_java_test_files(repo_path, complexity)
        
        self.test_repositories[repo_name] = {
            "path": repo_path,
            "language": language,
            "complexity": complexity
        }
        
        return repo_path
    
    def _create_typescript_test_files(self, repo_path: Path, complexity: str):
        """Create TypeScript test files with varying complexity"""
        
        # Simple component
        (repo_path / "src" / "components").mkdir(parents=True)
        simple_component = '''
import React from 'react';

interface Props {
  title: string;
  onClick?: () => void;
}

export const SimpleButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="btn-primary">
      {title}
    </button>
  );
};
'''
        (repo_path / "src" / "components" / "SimpleButton.tsx").write_text(simple_component)
        
        # Complex service
        if complexity in ["medium", "high"]:
            (repo_path / "src" / "services").mkdir(parents=True)
            complex_service = '''
import axios, { AxiosResponse } from 'axios';
import { Logger } from '../utils/logger';
import { CacheManager } from '../cache/CacheManager';
import { RateLimiter } from '../utils/RateLimiter';

interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export class ApiService {
  private logger = new Logger('ApiService');
  private cache = new CacheManager();
  private rateLimiter = new RateLimiter();
  
  constructor(private config: ApiConfig) {}
  
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const cacheKey = this.generateCacheKey(endpoint, params);
    
    // Check cache first
    const cached = await this.cache.get<T>(cacheKey);
    if (cached) {
      this.logger.debug('Cache hit for endpoint:', endpoint);
      return cached;
    }
    
    // Rate limiting
    await this.rateLimiter.waitForToken();
    
    try {
      const response = await this.makeRequest<T>('GET', endpoint, params);
      await this.cache.set(cacheKey, response, 300); // 5 min cache
      return response;
    } catch (error) {
      this.logger.error('API request failed:', error);
      throw error;
    }
  }
  
  private async makeRequest<T>(
    method: string, 
    endpoint: string, 
    data?: any
  ): Promise<ApiResponse<T>> {
    // Complex retry logic with exponential backoff
    let retries = 0;
    while (retries < this.config.retries) {
      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url: `${this.config.baseURL}${endpoint}`,
          data,
          timeout: this.config.timeout,
        });
        
        return {
          data: response.data,
          status: response.status,
          headers: response.headers as Record<string, string>
        };
      } catch (error) {
        retries++;
        if (retries >= this.config.retries) throw error;
        
        const backoffTime = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
    
    throw new Error('Max retries exceeded');
  }
  
  private generateCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `api:${endpoint}:${paramString}`;
  }
}
'''
            (repo_path / "src" / "services" / "ApiService.ts").write_text(complex_service)
        
        # Security-critical authentication
        if complexity == "high":
            (repo_path / "src" / "auth").mkdir(parents=True)
            auth_service = '''
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  roles: string[];
  lastLogin?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly BCRYPT_ROUNDS = 12;
  
  async authenticateUser(email: string, password: string): Promise<AuthToken> {
    const user = await this.getUserByEmail(email);
    
    if (!user) {
      // Prevent timing attacks
      await bcrypt.compare(password, '$2b$12$dummy.hash.to.prevent.timing.attacks');
      throw new Error('Invalid credentials');
    }
    
    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new Error('Account temporarily locked');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      await this.handleFailedLogin(user);
      throw new Error('Invalid credentials');
    }
    
    // Reset login attempts on successful login
    await this.resetLoginAttempts(user.id);
    await this.updateLastLogin(user.id);
    
    return this.generateTokens(user);
  }
  
  private async handleFailedLogin(user: User): Promise<void> {
    const attempts = user.loginAttempts + 1;
    
    if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
      await this.lockAccount(user.id, new Date(Date.now() + this.LOCK_TIME));
    } else {
      await this.incrementLoginAttempts(user.id, attempts);
    }
  }
  
  private generateTokens(user: User): AuthToken {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles
    };
    
    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256'
    });
    
    const refreshToken = jwt.sign({ id: user.id }, this.JWT_SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256'
    });
    
    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60 // 15 minutes
    };
  }
  
  // Additional security-critical methods...
  private async getUserByEmail(email: string): Promise<User | null> {
    // Database query implementation
    return null;
  }
  
  private async resetLoginAttempts(userId: string): Promise<void> {
    // Reset attempts in database
  }
  
  private async updateLastLogin(userId: string): Promise<void> {
    // Update last login timestamp
  }
  
  private async lockAccount(userId: string, lockUntil: Date): Promise<void> {
    // Lock account implementation
  }
  
  private async incrementLoginAttempts(userId: string, attempts: number): Promise<void> {
    // Increment attempts counter
  }
}
'''
            (repo_path / "src" / "auth" / "AuthService.ts").write_text(auth_service)
    
    def _create_python_test_files(self, repo_path: Path, complexity: str):
        """Create Python test files with varying complexity"""
        
        # Simple utility function
        (repo_path / "src" / "utils").mkdir(parents=True)
        simple_util = '''
from typing import List, Optional
import re

def validate_email(email: str) -> bool:
    """Validate email address format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def format_currency(amount: float, currency: str = 'USD') -> str:
    """Format amount as currency"""
    symbols = {'USD': '$', 'EUR': '€', 'GBP': '£'}
    symbol = symbols.get(currency, currency)
    return f"{symbol}{amount:.2f}"

def chunk_list(items: List[any], chunk_size: int) -> List[List[any]]:
    """Split list into chunks of specified size"""
    return [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]
'''
        (repo_path / "src" / "utils" / "helpers.py").write_text(simple_util)
        
        # Medium complexity data processor
        if complexity in ["medium", "high"]:
            (repo_path / "src" / "processors").mkdir(parents=True)
            data_processor = '''
import asyncio
import aiohttp
import pandas as pd
from typing import Dict, List, Any, Optional, AsyncGenerator
from dataclasses import dataclass
from datetime import datetime, timedelta
import logging
from concurrent.futures import ThreadPoolExecutor
import numpy as np

logger = logging.getLogger(__name__)

@dataclass
class DataSource:
    name: str
    url: str
    format: str  # 'json', 'csv', 'xml'
    headers: Optional[Dict[str, str]] = None
    auth_token: Optional[str] = None
    rate_limit: int = 10  # requests per second

@dataclass
class ProcessingResult:
    source: str
    records_processed: int
    errors: List[str]
    execution_time: float
    success: bool

class DataProcessor:
    def __init__(self, max_workers: int = 4):
        self.max_workers = max_workers
        self.session: Optional[aiohttp.ClientSession] = None
        self.rate_limiters: Dict[str, asyncio.Semaphore] = {}
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            connector=aiohttp.TCPConnector(limit=100)
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
        self.executor.shutdown(wait=True)
    
    async def process_sources(self, sources: List[DataSource]) -> List[ProcessingResult]:
        """Process multiple data sources concurrently"""
        # Initialize rate limiters
        for source in sources:
            self.rate_limiters[source.name] = asyncio.Semaphore(source.rate_limit)
        
        # Create processing tasks
        tasks = [self._process_source(source) for source in sources]
        
        # Execute with progress tracking
        results = []
        for i, task in enumerate(asyncio.as_completed(tasks)):
            try:
                result = await task
                results.append(result)
                logger.info(f"Completed processing source {i+1}/{len(sources)}")
            except Exception as e:
                logger.error(f"Failed to process source {i+1}: {str(e)}")
                results.append(ProcessingResult(
                    source=f"source_{i+1}",
                    records_processed=0,
                    errors=[str(e)],
                    execution_time=0.0,
                    success=False
                ))
        
        return results
    
    async def _process_source(self, source: DataSource) -> ProcessingResult:
        """Process a single data source"""
        start_time = datetime.now()
        errors = []
        records_processed = 0
        
        try:
            # Fetch data with rate limiting
            raw_data = await self._fetch_data(source)
            
            # Parse based on format
            parsed_data = await self._parse_data(raw_data, source.format)
            
            # Process in CPU-intensive thread
            processed_data = await asyncio.get_event_loop().run_in_executor(
                self.executor, 
                self._cpu_intensive_processing, 
                parsed_data
            )
            
            # Validate and clean data
            validated_data = self._validate_data(processed_data)
            records_processed = len(validated_data)
            
            # Store results (would typically write to database/file)
            await self._store_results(source.name, validated_data)
            
        except Exception as e:
            logger.error(f"Error processing {source.name}: {str(e)}")
            errors.append(str(e))
        
        execution_time = (datetime.now() - start_time).total_seconds()
        
        return ProcessingResult(
            source=source.name,
            records_processed=records_processed,
            errors=errors,
            execution_time=execution_time,
            success=len(errors) == 0
        )
    
    async def _fetch_data(self, source: DataSource) -> bytes:
        """Fetch data from source with rate limiting and retries"""
        async with self.rate_limiters[source.name]:
            headers = source.headers or {}
            if source.auth_token:
                headers['Authorization'] = f'Bearer {source.auth_token}'
            
            retries = 3
            for attempt in range(retries):
                try:
                    async with self.session.get(source.url, headers=headers) as response:
                        response.raise_for_status()
                        return await response.read()
                except Exception as e:
                    if attempt == retries - 1:
                        raise
                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
    
    async def _parse_data(self, raw_data: bytes, format: str) -> List[Dict[str, Any]]:
        """Parse raw data based on format"""
        if format == 'json':
            import json
            return json.loads(raw_data.decode())
        elif format == 'csv':
            # Run pandas in thread to avoid blocking
            return await asyncio.get_event_loop().run_in_executor(
                self.executor,
                self._parse_csv,
                raw_data
            )
        else:
            raise ValueError(f"Unsupported format: {format}")
    
    def _parse_csv(self, raw_data: bytes) -> List[Dict[str, Any]]:
        """Parse CSV data using pandas"""
        import io
        df = pd.read_csv(io.BytesIO(raw_data))
        return df.to_dict(orient='records')
    
    def _cpu_intensive_processing(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Perform CPU-intensive processing on data"""
        processed = []
        
        for record in data:
            # Simulate complex calculations
            if 'values' in record and isinstance(record['values'], list):
                # Statistical analysis
                values = np.array(record['values'])
                record['statistics'] = {
                    'mean': float(np.mean(values)),
                    'std': float(np.std(values)),
                    'median': float(np.median(values)),
                    'percentile_95': float(np.percentile(values, 95))
                }
            
            # Text processing
            if 'description' in record:
                record['word_count'] = len(record['description'].split())
                record['char_count'] = len(record['description'])
            
            processed.append(record)
        
        return processed
    
    def _validate_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Validate and clean processed data"""
        validated = []
        
        for record in data:
            # Basic validation
            if not record or not isinstance(record, dict):
                continue
            
            # Required field validation
            if 'id' not in record or not record['id']:
                record['id'] = f"generated_{len(validated)}"
            
            # Data type validation and conversion
            if 'timestamp' in record:
                try:
                    if isinstance(record['timestamp'], str):
                        record['timestamp'] = datetime.fromisoformat(record['timestamp'])
                except ValueError:
                    record['timestamp'] = datetime.now()
            
            validated.append(record)
        
        return validated
    
    async def _store_results(self, source_name: str, data: List[Dict[str, Any]]) -> None:
        """Store processed results (placeholder implementation)"""
        logger.info(f"Storing {len(data)} records from {source_name}")
        # In real implementation, would write to database/file
        pass

# Usage example and testing helpers
async def create_test_scenario():
    """Create test data sources for validation"""
    sources = [
        DataSource(
            name="api_source_1",
            url="https://api.example.com/data1",
            format="json",
            headers={"Content-Type": "application/json"},
            rate_limit=5
        ),
        DataSource(
            name="csv_source_1",
            url="https://data.example.com/export.csv",
            format="csv",
            rate_limit=10
        )
    ]
    
    async with DataProcessor(max_workers=2) as processor:
        results = await processor.process_sources(sources)
        return results
'''
            (repo_path / "src" / "processors" / "data_processor.py").write_text(data_processor)
        
        # High complexity machine learning module
        if complexity == "high":
            (repo_path / "src" / "ml").mkdir(parents=True)
            ml_module = '''
import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from typing import Dict, List, Tuple, Any, Optional, Union
import joblib
import logging
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

logger = logging.getLogger(__name__)

class AdvancedFeatureEngineer(BaseEstimator, TransformerMixin):
    """Advanced feature engineering transformer with domain-specific logic"""
    
    def __init__(self, 
                 categorical_features: Optional[List[str]] = None,
                 numerical_features: Optional[List[str]] = None,
                 create_interactions: bool = True,
                 create_polynomial: bool = False,
                 polynomial_degree: int = 2):
        self.categorical_features = categorical_features or []
        self.numerical_features = numerical_features or []
        self.create_interactions = create_interactions
        self.create_polynomial = create_polynomial
        self.polynomial_degree = polynomial_degree
        self.label_encoders = {}
        self.feature_names = []
    
    def fit(self, X: pd.DataFrame, y: Optional[pd.Series] = None):
        """Learn feature engineering parameters from training data"""
        # Detect feature types if not provided
        if not self.categorical_features and not self.numerical_features:
            self.categorical_features = X.select_dtypes(include=['object', 'category']).columns.tolist()
            self.numerical_features = X.select_dtypes(include=[np.number]).columns.tolist()
        
        # Fit label encoders for categorical features
        for feature in self.categorical_features:
            if feature in X.columns:
                le = LabelEncoder()
                le.fit(X[feature].astype(str).fillna('missing'))
                self.label_encoders[feature] = le
        
        # Store original feature names
        self.feature_names = X.columns.tolist()
        
        return self
    
    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        """Apply feature engineering transformations"""
        X_transformed = X.copy()
        
        # Handle categorical features
        for feature in self.categorical_features:
            if feature in X_transformed.columns:
                le = self.label_encoders.get(feature)
                if le:
                    # Handle unseen categories
                    def safe_transform(val):
                        try:
                            return le.transform([str(val)])[0]
                        except ValueError:
                            return -1  # Unknown category
                    
                    X_transformed[f'{feature}_encoded'] = X_transformed[feature].fillna('missing').apply(safe_transform)
        
        # Create interaction features
        if self.create_interactions and len(self.numerical_features) >= 2:
            for i, feat1 in enumerate(self.numerical_features):
                for feat2 in self.numerical_features[i+1:]:
                    if feat1 in X_transformed.columns and feat2 in X_transformed.columns:
                        X_transformed[f'{feat1}_x_{feat2}'] = (
                            X_transformed[feat1] * X_transformed[feat2]
                        )
                        X_transformed[f'{feat1}_div_{feat2}'] = (
                            X_transformed[feat1] / (X_transformed[feat2] + 1e-8)
                        )
        
        # Create polynomial features
        if self.create_polynomial:
            for feature in self.numerical_features:
                if feature in X_transformed.columns:
                    for degree in range(2, self.polynomial_degree + 1):
                        X_transformed[f'{feature}_pow_{degree}'] = (
                            X_transformed[feature] ** degree
                        )
        
        # Create statistical features
        numerical_cols = [col for col in X_transformed.columns 
                         if X_transformed[col].dtype in [np.int64, np.float64]]
        
        if len(numerical_cols) >= 3:
            # Rolling statistics (if we have enough features)
            X_transformed['feature_sum'] = X_transformed[numerical_cols[:5]].sum(axis=1)
            X_transformed['feature_mean'] = X_transformed[numerical_cols[:5]].mean(axis=1)
            X_transformed['feature_std'] = X_transformed[numerical_cols[:5]].std(axis=1)
        
        return X_transformed

class ModelEnsemble:
    """Advanced ensemble model with automatic model selection and hyperparameter tuning"""
    
    def __init__(self, 
                 models: Optional[Dict[str, Any]] = None,
                 use_stacking: bool = True,
                 cv_folds: int = 5,
                 scoring: str = 'accuracy'):
        
        self.models = models or {
            'rf': RandomForestClassifier(random_state=42),
            'gb': GradientBoostingClassifier(random_state=42),
            'lr': LogisticRegression(random_state=42, max_iter=1000)
        }
        
        self.use_stacking = use_stacking
        self.cv_folds = cv_folds
        self.scoring = scoring
        
        self.best_models = {}
        self.feature_engineer = AdvancedFeatureEngineer()
        self.scaler = StandardScaler()
        self.is_fitted = False
        
        # Hyperparameter grids
        self.param_grids = {
            'rf': {
                'n_estimators': [100, 200, 300],
                'max_depth': [10, 20, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            },
            'gb': {
                'n_estimators': [100, 200],
                'learning_rate': [0.01, 0.1, 0.2],
                'max_depth': [3, 5, 7],
                'subsample': [0.8, 0.9, 1.0]
            },
            'lr': {
                'C': [0.001, 0.01, 0.1, 1, 10, 100],
                'penalty': ['l1', 'l2', 'elasticnet'],
                'solver': ['liblinear', 'saga']
            }
        }
    
    def fit(self, X: pd.DataFrame, y: pd.Series) -> 'ModelEnsemble':
        """Fit ensemble with automatic hyperparameter tuning"""
        logger.info("Starting ensemble training...")
        
        # Feature engineering
        X_engineered = self.feature_engineer.fit_transform(X)
        
        # Scale features
        X_scaled = pd.DataFrame(
            self.scaler.fit_transform(X_engineered),
            columns=X_engineered.columns,
            index=X_engineered.index
        )
        
        # Train individual models with hyperparameter tuning
        for model_name, model in self.models.items():
            logger.info(f"Tuning {model_name}...")
            
            # Grid search with cross-validation
            param_grid = self.param_grids.get(model_name, {})
            
            if param_grid:
                grid_search = GridSearchCV(
                    model, 
                    param_grid, 
                    cv=self.cv_folds,
                    scoring=self.scoring,
                    n_jobs=-1,
                    verbose=0
                )
                grid_search.fit(X_scaled, y)
                self.best_models[model_name] = grid_search.best_estimator_
                logger.info(f"Best {model_name} score: {grid_search.best_score_:.4f}")
            else:
                # Train with default parameters
                model.fit(X_scaled, y)
                self.best_models[model_name] = model
        
        # Create stacking ensemble if requested
        if self.use_stacking:
            self._create_stacking_ensemble(X_scaled, y)
        
        self.is_fitted = True
        logger.info("Ensemble training completed")
        return self
    
    def _create_stacking_ensemble(self, X: pd.DataFrame, y: pd.Series):
        """Create stacking ensemble using trained models as base learners"""
        from sklearn.ensemble import StackingClassifier
        
        # Use the best models as base estimators
        base_estimators = [(name, model) for name, model in self.best_models.items()]
        
        # Meta-learner (final estimator)
        meta_learner = LogisticRegression(random_state=42)
        
        self.stacking_model = StackingClassifier(
            estimators=base_estimators,
            final_estimator=meta_learner,
            cv=self.cv_folds,
            stack_method='predict_proba',
            n_jobs=-1
        )
        
        self.stacking_model.fit(X, y)
    
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """Make predictions using the ensemble"""
        if not self.is_fitted:
            raise ValueError("Model must be fitted before making predictions")
        
        # Apply same preprocessing
        X_engineered = self.feature_engineer.transform(X)
        X_scaled = pd.DataFrame(
            self.scaler.transform(X_engineered),
            columns=X_engineered.columns,
            index=X_engineered.index
        )
        
        if self.use_stacking and hasattr(self, 'stacking_model'):
            return self.stacking_model.predict(X_scaled)
        else:
            # Simple voting ensemble
            predictions = {}
            for name, model in self.best_models.items():
                predictions[name] = model.predict(X_scaled)
            
            # Majority vote
            pred_df = pd.DataFrame(predictions)
            return pred_df.mode(axis=1)[0].values
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """Get prediction probabilities"""
        if not self.is_fitted:
            raise ValueError("Model must be fitted before making predictions")
        
        # Apply same preprocessing
        X_engineered = self.feature_engineer.transform(X)
        X_scaled = pd.DataFrame(
            self.scaler.transform(X_engineered),
            columns=X_engineered.columns,
            index=X_engineered.index
        )
        
        if self.use_stacking and hasattr(self, 'stacking_model'):
            return self.stacking_model.predict_proba(X_scaled)
        else:
            # Average probabilities
            probabilities = []
            for name, model in self.best_models.items():
                if hasattr(model, 'predict_proba'):
                    probabilities.append(model.predict_proba(X_scaled))
            
            if probabilities:
                return np.mean(probabilities, axis=0)
            else:
                raise ValueError("No models support probability prediction")
    
    def evaluate(self, X: pd.DataFrame, y: pd.Series) -> Dict[str, Any]:
        """Comprehensive model evaluation"""
        predictions = self.predict(X)
        probabilities = self.predict_proba(X)
        
        # Classification metrics
        report = classification_report(y, predictions, output_dict=True)
        confusion_mat = confusion_matrix(y, predictions)
        
        # Individual model performance
        X_engineered = self.feature_engineer.transform(X)
        X_scaled = pd.DataFrame(
            self.scaler.transform(X_engineered),
            columns=X_engineered.columns,
            index=X_engineered.index
        )
        
        individual_scores = {}
        for name, model in self.best_models.items():
            scores = cross_val_score(model, X_scaled, y, cv=self.cv_folds, scoring=self.scoring)
            individual_scores[name] = {
                'mean_score': scores.mean(),
                'std_score': scores.std(),
                'scores': scores.tolist()
            }
        
        return {
            'classification_report': report,
            'confusion_matrix': confusion_mat.tolist(),
            'individual_model_scores': individual_scores,
            'ensemble_accuracy': report['accuracy'],
            'macro_avg_f1': report['macro avg']['f1-score'],
            'weighted_avg_f1': report['weighted avg']['f1-score']
        }
    
    def get_feature_importance(self) -> pd.DataFrame:
        """Get feature importance from tree-based models"""
        importances = {}
        
        for name, model in self.best_models.items():
            if hasattr(model, 'feature_importances_'):
                importances[name] = model.feature_importances_
        
        if importances:
            feature_names = self.feature_engineer.transform(pd.DataFrame()).columns.tolist()
            importance_df = pd.DataFrame(importances, index=feature_names)
            importance_df['mean_importance'] = importance_df.mean(axis=1)
            return importance_df.sort_values('mean_importance', ascending=False)
        else:
            return pd.DataFrame()
    
    def save_model(self, filepath: str) -> None:
        """Save the trained ensemble model"""
        if not self.is_fitted:
            raise ValueError("Model must be fitted before saving")
        
        model_data = {
            'best_models': self.best_models,
            'feature_engineer': self.feature_engineer,
            'scaler': self.scaler,
            'use_stacking': self.use_stacking,
            'is_fitted': self.is_fitted
        }
        
        if hasattr(self, 'stacking_model'):
            model_data['stacking_model'] = self.stacking_model
        
        joblib.dump(model_data, filepath)
        logger.info(f"Model saved to {filepath}")
    
    @classmethod
    def load_model(cls, filepath: str) -> 'ModelEnsemble':
        """Load a saved ensemble model"""
        model_data = joblib.load(filepath)
        
        ensemble = cls()
        ensemble.best_models = model_data['best_models']
        ensemble.feature_engineer = model_data['feature_engineer']
        ensemble.scaler = model_data['scaler']
        ensemble.use_stacking = model_data['use_stacking']
        ensemble.is_fitted = model_data['is_fitted']
        
        if 'stacking_model' in model_data:
            ensemble.stacking_model = model_data['stacking_model']
        
        logger.info(f"Model loaded from {filepath}")
        return ensemble

# Example usage and testing
def create_sample_dataset() -> Tuple[pd.DataFrame, pd.Series]:
    """Create a sample dataset for testing"""
    np.random.seed(42)
    n_samples = 1000
    
    # Generate synthetic features
    X = pd.DataFrame({
        'feature_1': np.random.normal(0, 1, n_samples),
        'feature_2': np.random.exponential(2, n_samples),
        'feature_3': np.random.uniform(-1, 1, n_samples),
        'categorical_1': np.random.choice(['A', 'B', 'C'], n_samples),
        'categorical_2': np.random.choice(['X', 'Y', 'Z'], n_samples, p=[0.5, 0.3, 0.2])
    })
    
    # Generate target with some realistic relationships
    y = (
        (X['feature_1'] > 0) & 
        (X['feature_2'] < 2) & 
        (X['categorical_1'] == 'A')
    ).astype(int)
    
    # Add some noise
    noise_indices = np.random.choice(n_samples, size=int(0.1 * n_samples), replace=False)
    y.iloc[noise_indices] = 1 - y.iloc[noise_indices]
    
    return X, y

# Example training and evaluation
async def run_ml_example():
    """Example of training and evaluating the ensemble model"""
    logger.info("Creating sample dataset...")
    X, y = create_sample_dataset()
    
    # Split data
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train ensemble
    logger.info("Training ensemble model...")
    ensemble = ModelEnsemble(use_stacking=True, cv_folds=3)  # Reduced CV for faster training
    ensemble.fit(X_train, y_train)
    
    # Evaluate
    logger.info("Evaluating model...")
    evaluation = ensemble.evaluate(X_test, y_test)
    
    logger.info(f"Ensemble Accuracy: {evaluation['ensemble_accuracy']:.4f}")
    logger.info(f"Macro F1-Score: {evaluation['macro_avg_f1']:.4f}")
    
    # Feature importance
    importance_df = ensemble.get_feature_importance()
    logger.info("Top 10 Most Important Features:")
    logger.info(importance_df.head(10))
    
    return ensemble, evaluation
'''
            (repo_path / "src" / "ml" / "ensemble_model.py").write_text(ml_module)
    
    def _create_go_test_files(self, repo_path: Path, complexity: str):
        """Create Go test files with varying complexity"""
        # Simple handler
        (repo_path / "handlers").mkdir(parents=True)
        simple_handler = '''
package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UserHandler struct {
	users map[int]User
}

func NewUserHandler() *UserHandler {
	return &UserHandler{
		users: make(map[int]User),
	}
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr, exists := vars["id"]
	if !exists {
		http.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	user, exists := h.users[id]
	if !exists {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Simple validation
	if user.Name == "" || user.Email == "" {
		http.Error(w, "Name and email are required", http.StatusBadRequest)
		return
	}

	// Generate ID
	user.ID = len(h.users) + 1
	h.users[user.ID] = user

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
'''
        (repo_path / "handlers" / "user.go").write_text(simple_handler)
        
        if complexity in ["medium", "high"]:
            # Complex service with database and caching
            (repo_path / "services").mkdir(parents=True)
            complex_service = '''
package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"go.uber.org/zap"
)

type UserService struct {
	db          *sqlx.DB
	redis       *redis.Client
	logger      *zap.Logger
	cache       *sync.Map
	rateLimiter *RateLimiter
	metrics     *Metrics
}

type User struct {
	ID        int       `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Email     string    `json:"email" db:"email"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	IsActive  bool      `json:"is_active" db:"is_active"`
}

type UserFilter struct {
	Name     string
	Email    string
	IsActive *bool
	Limit    int
	Offset   int
	SortBy   string
	SortDesc bool
}

type RateLimiter struct {
	requests map[string][]time.Time
	mutex    sync.RWMutex
	limit    int
	window   time.Duration
}

type Metrics struct {
	TotalRequests      int64
	SuccessfulRequests int64
	FailedRequests     int64
	CacheHits          int64
	CacheMisses        int64
	mutex              sync.RWMutex
}

func NewUserService(db *sqlx.DB, redis *redis.Client, logger *zap.Logger) *UserService {
	return &UserService{
		db:     db,
		redis:  redis,
		logger: logger,
		cache:  &sync.Map{},
		rateLimiter: &RateLimiter{
			requests: make(map[string][]time.Time),
			limit:    100,
			window:   time.Hour,
		},
		metrics: &Metrics{},
	}
}

func (s *UserService) GetUser(ctx context.Context, id int, clientIP string) (*User, error) {
	s.metrics.mutex.Lock()
	s.metrics.TotalRequests++
	s.metrics.mutex.Unlock()

	// Rate limiting
	if !s.rateLimiter.Allow(clientIP) {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return nil, fmt.Errorf("rate limit exceeded")
	}

	// Try memory cache first
	cacheKey := fmt.Sprintf("user:%d", id)
	if cached, ok := s.cache.Load(cacheKey); ok {
		s.metrics.mutex.Lock()
		s.metrics.CacheHits++
		s.metrics.SuccessfulRequests++
		s.metrics.mutex.Unlock()
		
		s.logger.Debug("Cache hit for user", zap.Int("id", id))
		return cached.(*User), nil
	}

	// Try Redis cache
	userJSON, err := s.redis.Get(ctx, cacheKey).Result()
	if err == nil {
		var user User
		if json.Unmarshal([]byte(userJSON), &user) == nil {
			// Store in memory cache too
			s.cache.Store(cacheKey, &user)
			
			s.metrics.mutex.Lock()
			s.metrics.CacheHits++
			s.metrics.SuccessfulRequests++
			s.metrics.mutex.Unlock()
			
			s.logger.Debug("Redis cache hit for user", zap.Int("id", id))
			return &user, nil
		}
	}

	// Database lookup
	var user User
	query := `SELECT id, name, email, created_at, updated_at, is_active 
	          FROM users WHERE id = $1 AND is_active = true`
	
	err = s.db.GetContext(ctx, &user, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			s.metrics.mutex.Lock()
			s.metrics.FailedRequests++
			s.metrics.mutex.Unlock()
			return nil, fmt.Errorf("user not found")
		}
		
		s.logger.Error("Failed to get user from database", 
			zap.Int("id", id), 
			zap.Error(err))
		
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return nil, err
	}

	// Cache the result
	go s.cacheUser(&user)

	s.metrics.mutex.Lock()
	s.metrics.CacheMisses++
	s.metrics.SuccessfulRequests++
	s.metrics.mutex.Unlock()

	s.logger.Debug("Database lookup for user", zap.Int("id", id))
	return &user, nil
}

func (s *UserService) CreateUser(ctx context.Context, user *User, clientIP string) error {
	s.metrics.mutex.Lock()
	s.metrics.TotalRequests++
	s.metrics.mutex.Unlock()

	// Rate limiting
	if !s.rateLimiter.Allow(clientIP) {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return fmt.Errorf("rate limit exceeded")
	}

	// Validation
	if err := s.validateUser(user); err != nil {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return err
	}

	// Begin transaction
	tx, err := s.db.BeginTxx(ctx, nil)
	if err != nil {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return err
	}
	defer tx.Rollback()

	// Check for duplicate email
	var count int
	err = tx.GetContext(ctx, &count, "SELECT COUNT(*) FROM users WHERE email = $1", user.Email)
	if err != nil {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return err
	}
	
	if count > 0 {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return fmt.Errorf("email already exists")
	}

	// Insert user
	query := `INSERT INTO users (name, email, created_at, updated_at, is_active) 
	          VALUES ($1, $2, $3, $4, $5) RETURNING id`
	
	now := time.Now()
	err = tx.GetContext(ctx, &user.ID, query, user.Name, user.Email, now, now, true)
	if err != nil {
		s.logger.Error("Failed to create user", 
			zap.String("email", user.Email), 
			zap.Error(err))
		
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return err
	}

	// Set timestamps
	user.CreatedAt = now
	user.UpdatedAt = now
	user.IsActive = true

	// Commit transaction
	if err = tx.Commit(); err != nil {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return err
	}

	// Cache the new user
	go s.cacheUser(user)

	// Async notifications
	go s.sendWelcomeEmail(user)

	s.metrics.mutex.Lock()
	s.metrics.SuccessfulRequests++
	s.metrics.mutex.Unlock()

	s.logger.Info("User created successfully", 
		zap.Int("id", user.ID), 
		zap.String("email", user.Email))
	
	return nil
}

func (s *UserService) ListUsers(ctx context.Context, filter UserFilter, clientIP string) ([]User, int, error) {
	s.metrics.mutex.Lock()
	s.metrics.TotalRequests++
	s.metrics.mutex.Unlock()

	// Rate limiting
	if !s.rateLimiter.Allow(clientIP) {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return nil, 0, fmt.Errorf("rate limit exceeded")
	}

	// Build dynamic query
	query, args, err := s.buildListQuery(filter)
	if err != nil {
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return nil, 0, err
	}

	// Execute query
	var users []User
	err = s.db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		s.logger.Error("Failed to list users", zap.Error(err))
		s.metrics.mutex.Lock()
		s.metrics.FailedRequests++
		s.metrics.mutex.Unlock()
		return nil, 0, err
	}

	// Get total count
	countQuery, countArgs, _ := s.buildCountQuery(filter)
	var total int
	err = s.db.GetContext(ctx, &total, countQuery, countArgs...)
	if err != nil {
		s.logger.Warn("Failed to get total count", zap.Error(err))
	}

	s.metrics.mutex.Lock()
	s.metrics.SuccessfulRequests++
	s.metrics.mutex.Unlock()

	return users, total, nil
}

func (s *UserService) cacheUser(user *User) {
	cacheKey := fmt.Sprintf("user:%d", user.ID)
	
	// Store in memory cache
	s.cache.Store(cacheKey, user)
	
	// Store in Redis with TTL
	userJSON, err := json.Marshal(user)
	if err == nil {
		ctx := context.Background()
		s.redis.SetEX(ctx, cacheKey, userJSON, time.Hour).Result()
	}
}

func (s *UserService) validateUser(user *User) error {
	if user.Name == "" {
		return fmt.Errorf("name is required")
	}
	
	if user.Email == "" {
		return fmt.Errorf("email is required")
	}
	
	// Email format validation (simplified)
	if !contains(user.Email, "@") {
		return fmt.Errorf("invalid email format")
	}
	
	return nil
}

func (s *UserService) buildListQuery(filter UserFilter) (string, []interface{}, error) {
	query := "SELECT id, name, email, created_at, updated_at, is_active FROM users WHERE 1=1"
	args := []interface{}{}
	argIndex := 1

	if filter.Name != "" {
		query += fmt.Sprintf(" AND name ILIKE $%d", argIndex)
		args = append(args, "%"+filter.Name+"%")
		argIndex++
	}

	if filter.Email != "" {
		query += fmt.Sprintf(" AND email ILIKE $%d", argIndex)
		args = append(args, "%"+filter.Email+"%")
		argIndex++
	}

	if filter.IsActive != nil {
		query += fmt.Sprintf(" AND is_active = $%d", argIndex)
		args = append(args, *filter.IsActive)
		argIndex++
	}

	// Sorting
	if filter.SortBy != "" {
		direction := "ASC"
		if filter.SortDesc {
			direction = "DESC"
		}
		query += fmt.Sprintf(" ORDER BY %s %s", filter.SortBy, direction)
	} else {
		query += " ORDER BY created_at DESC"
	}

	// Pagination
	if filter.Limit > 0 {
		query += fmt.Sprintf(" LIMIT $%d", argIndex)
		args = append(args, filter.Limit)
		argIndex++
	}

	if filter.Offset > 0 {
		query += fmt.Sprintf(" OFFSET $%d", argIndex)
		args = append(args, filter.Offset)
	}

	return query, args, nil
}

func (s *UserService) buildCountQuery(filter UserFilter) (string, []interface{}, error) {
	query := "SELECT COUNT(*) FROM users WHERE 1=1"
	args := []interface{}{}
	argIndex := 1

	if filter.Name != "" {
		query += fmt.Sprintf(" AND name ILIKE $%d", argIndex)
		args = append(args, "%"+filter.Name+"%")
		argIndex++
	}

	if filter.Email != "" {
		query += fmt.Sprintf(" AND email ILIKE $%d", argIndex)
		args = append(args, "%"+filter.Email+"%")
		argIndex++
	}

	if filter.IsActive != nil {
		query += fmt.Sprintf(" AND is_active = $%d", argIndex)
		args = append(args, *filter.IsActive)
	}

	return query, args, nil
}

func (s *UserService) sendWelcomeEmail(user *User) {
	// Simulate email sending
	s.logger.Info("Sending welcome email", 
		zap.String("email", user.Email),
		zap.Int("user_id", user.ID))
	
	// In real implementation, would integrate with email service
}

func (rl *RateLimiter) Allow(clientIP string) bool {
	rl.mutex.Lock()
	defer rl.mutex.Unlock()

	now := time.Now()
	
	// Clean old requests
	requests := rl.requests[clientIP]
	validRequests := []time.Time{}
	
	for _, req := range requests {
		if now.Sub(req) < rl.window {
			validRequests = append(validRequests, req)
		}
	}

	// Check limit
	if len(validRequests) >= rl.limit {
		return false
	}

	// Add current request
	validRequests = append(validRequests, now)
	rl.requests[clientIP] = validRequests

	return true
}

func (s *UserService) GetMetrics() Metrics {
	s.metrics.mutex.RLock()
	defer s.metrics.mutex.RUnlock()
	
	return Metrics{
		TotalRequests:      s.metrics.TotalRequests,
		SuccessfulRequests: s.metrics.SuccessfulRequests,
		FailedRequests:     s.metrics.FailedRequests,
		CacheHits:          s.metrics.CacheHits,
		CacheMisses:        s.metrics.CacheMisses,
	}
}

// Helper function
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || 
		(len(s) > len(substr) && 
		(s[:len(substr)] == substr || s[len(s)-len(substr):] == substr || 
		 containsAt(s, substr, 1))))
}

func containsAt(s, substr string, start int) bool {
	for i := start; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}
'''
            (repo_path / "services" / "user_service.go").write_text(complex_service)
    
    def _create_java_test_files(self, repo_path: Path, complexity: str):
        """Create Java test files with varying complexity"""
        # Simple utility class
        (repo_path / "src" / "main" / "java" / "com" / "qms" / "utils").mkdir(parents=True)
        simple_util = '''
package com.qms.utils;

import java.util.List;
import java.util.ArrayList;
import java.util.regex.Pattern;

public class ValidationUtils {
    
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    public static boolean isNotEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }
    
    public static <T> List<List<T>> partition(List<T> list, int size) {
        List<List<T>> partitions = new ArrayList<>();
        
        for (int i = 0; i < list.size(); i += size) {
            partitions.add(list.subList(i, Math.min(i + size, list.size())));
        }
        
        return partitions;
    }
    
    public static String sanitizeInput(String input) {
        if (input == null) {
            return "";
        }
        
        return input.replaceAll("[<>\"'&]", "")
                   .trim();
    }
}
'''
        (repo_path / "src" / "main" / "java" / "com" / "qms" / "utils" / "ValidationUtils.java").write_text(simple_util)
        
        if complexity in ["medium", "high"]:
            # Complex service with Spring Framework
            (repo_path / "src" / "main" / "java" / "com" / "qms" / "service").mkdir(parents=True)
            complex_service = '''
package com.qms.service;

import com.qms.model.User;
import com.qms.repository.UserRepository;
import com.qms.dto.