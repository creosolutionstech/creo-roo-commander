/**
 * QMS GitHub Actions API Integration - Core Type Definitions
 * Based on design document: github-actions-api-integration-design-v1.md
 */

// Quality Gate Types
export type QualityGateType =
  | 'dor'
  | 'security'
  | 'coding_standards'
  | 'dod'
  | 'overall'
  | 'code_quality'
  | 'security_scan'
  | 'unit_tests'
  | 'integration_tests'
  | 'performance_tests'
  | 'dod_validation'
  | 'compliance_audit'
  | 'security_review'
  | 'documentation_check';



export type RepositoryClassification = 'mission_critical' | 'business_critical' | 'standard' | 'experimental';
export type RepositoryTier = RepositoryClassification;

export type RiskLevel = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';

// GitHub Workflow Types
export type WorkflowStatusValue = 'queued' | 'in_progress' | 'completed' | 'cancelled' | 'failure';

export type WorkflowConclusion = 'success' | 'failure' | 'cancelled' | 'timed_out' | 'skipped';

export type QMSStage = 'initialization' | 'dor' | 'security_coding' | 'dod' | 'aggregation';

export type StatusCheckState = 'pending' | 'success' | 'failure' | 'error';

export type ComplianceStatus = 'passed' | 'failed' | 'pending';

// Workflow Request Types
export interface QualityGatesWorkflowRequest {
  repository: string;
  prNumber: number;
  headSha: string;
  baseBranch: string;
  forcedValidations?: QualityGateType[];
  bypassControls?: BypassConfiguration;
  trackingId: string;
  priority: ValidationPriority;
}

export interface EmergencyWorkflowRequest {
  repository: string;
  incident: IncidentDetails;
  authorizationLevel: 1 | 2 | 3 | 4;
  approver: string;
  justification: string;
}

export interface IncidentDetails {
  type: 'security' | 'production_down' | 'data_breach' | 'compliance';
  severity: 'critical' | 'high' | 'medium';
  description: string;
  affectedSystems: string[];
}



// Workflow Response Types
export interface WorkflowRun {
  id: number;
  status: WorkflowStatus;
  conclusion?: WorkflowConclusion;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStatus {
  id: number;
  status: WorkflowStatusValue;
  conclusion?: WorkflowConclusion;
  startedAt: Date;
  completedAt?: Date;
  qmsStage: QMSStage;
  progress: WorkflowProgress;
}

export interface WorkflowProgress {
  total: number;
  completed: number;
  failed: number;
  skipped: number;
}

export interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  source: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
}

// QMS Quality Gate Coordinator interfaces
export interface QualityValidationRequest {
  repository: string;
  prNumber: number;
  pullRequestNumber?: number;
  headSha: string;
  sha: string; // Alternative reference to headSha used in code
  baseBranch: string;
  branch?: string; // Target branch, defaults to 'main' if not provided
  tier: RepositoryTier; // Repository classification tier
  environment?: string; // Environment context, defaults to 'development'
  gateTypes: QualityGateType[];
  qualityGates: QualityGateDetails[]; // Quality gate configurations
  requiredGates?: QualityGateType[]; // Required quality gates for this request
  priority: ValidationPriority;
  forcedValidations?: QualityGateType[];
  skipValidations?: QualityGateType[];
}

export interface ValidationPlan {
  phases: ValidationPhase[];
  estimatedDuration: number;
  dependencies: Record<string, string[]>;
  parallelizable: boolean;
}

export interface ValidationPhase {
  id: string;
  name: string;
  gateTypes: QualityGateType[];
  order: number;
  dependencies: string[];
  canRunInParallel: boolean;
  estimatedDuration: number;
}

export interface ValidationResult {
  gateType: QualityGateType;
  status: StatusCheckState;
  score?: number;
  details: string;
  timestamp: Date;
  duration: number;
  metadata?: Record<string, any>;
}

export interface FallbackStrategy {
  trigger: 'timeout' | 'failure' | 'error';
  action: 'skip' | 'retry' | 'downgrade' | 'abort';
  maxRetries?: number;
  fallbackGateType?: QualityGateType;
  reason: string;
}

export interface WorkflowStep {
  name: string;
  status: WorkflowStatusValue;
  conclusion?: WorkflowConclusion;
  startedAt: Date;
  completedAt?: Date;
  logs: LogEntry[];
}

// Status Check Types
export interface StatusCheckInitRequest {
  repository: string;
  sha: string;
  prNumber: number;
  requiredChecks: QualityGateType[];
  classification: RiskLevel;
  trackingId: string;
}

export interface QualityGateStatusUpdate {
  repository: string;
  sha: string;
  checkName: string;
  state: StatusCheckState;
  description: string;
  targetUrl?: string;
  details?: QualityGateDetails;
  bypassAvailable?: boolean;
}

export interface QualityGateDetails {
  gateType: QualityGateType;
  executedChecks: string[];
  failedChecks?: FailedCheck[];
  timestamp?: string;
  recommendations?: string[];
  metrics?: QualityMetrics;
}

// Missing interfaces for QualityGateCoordinator
export interface QualityValidationRequest {
  repository: string;
  sha: string;
  baseBranch: string;
  forcedValidations?: QualityGateType[];
  bypassControls?: BypassConfiguration;
  trackingId: string;
  priority: ValidationPriority;
}

export interface OrchestrationResponse {
  orchestrationId: string;
  success: boolean;
  status: 'success' | 'failure' | 'pending';
  message: string;
  summary: string;
  results: ValidationResult[];
  qualityGates: ValidationPhase[];
  complianceStatus: ComplianceStatus;
  branchProtection: any;
  logs: any[];
  statusChecks?: any[];
  errors?: string[];
  recommendations?: string[];
}

export interface ValidationPlan {
  phases: ValidationPhase[];
  requiredGates: QualityGateType[];
  fallbackStrategy: FallbackStrategy;
}


export interface BatchUpdateResult {
  batchId: string;
  processedCount: number;
  successCount: number;
  failureCount: number;
  errors: BatchError[];
}

export interface BatchError {
  gateType: QualityGateType;
  repository: string;
  message: string;
}

export interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
  metrics?: QualityMetrics;
  recommendations?: string[];
}

// Additional missing interfaces for QualityGateCoordinator
export type ValidationPriority = 'low' | 'normal' | 'high' | 'critical' | 'emergency' | 'medium';

export interface BypassConfiguration {
  allowedGates?: QualityGateType[];
  requireApproval?: boolean;
  approvers?: string[];
}


export interface WorkflowTriggerRequest {
  repository: string;
  workflow: string;
  workflowId: string;
  ref: string;
  inputs?: Record<string, any>;
  context: {
    repositoryTier: RepositoryClassification;
    environment?: string;
    pullRequestNumber?: number;
    commitSha?: string;
    triggeredBy: string;
  };
  qualityGates: QualityGateConfig[];
  priority?: ValidationPriority;
}

export interface BranchProtectionRequest {
  repository: string;
  branch: string;
  statusChecks?: string[];
  reviewRequirements?: {
    requiredReviewers?: number;
    dismissStaleReviews?: boolean;
    requireCodeOwners?: boolean;
  };
  restrictions?: {
    users?: string[];
    teams?: string[];
  };
  allowForcePushes?: boolean;
  allowDeletions?: boolean;
}

export interface BranchProtectionResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: string[];
}

export interface FailedCheck {
  check: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  fixSuggestion?: string;
}

export interface QualityMetrics {
  codeQuality?: number;
  testCoverage?: number;
  securityScore?: number;
  performanceScore?: number;
}

export interface ComplianceStatusRequest {
  repository: string;
  sha: string;
  overallStatus: ComplianceStatus;
  summary: ComplianceSummary;
  actionRequired?: string;
}

export interface ComplianceSummary {
  totalGates: number;
  passedGates: number;
  failedGates: number;
  skippedGates: number;
  bypassedGates: number;
  overallScore: number;
}

// Branch Protection Types
export interface BranchProtectionRequest {
  branch: string;
  tier: RepositoryTier;
  requiredQualityGates: QualityGateType[];
  enforceAdmins?: boolean;
  allowBypass?: boolean;
}

export interface CustomProtectionRules {
  allowForcePushes?: boolean;
  allowDeletions?: boolean;
  requiredLinearHistory?: boolean;
  requiredConversationResolution?: boolean;
  additionalStatusChecks?: string[];
}

export interface StatusCheckUpdateRequest {
  repository: string;
  branch: string;
  requiredChecks: string[];
  dismissStaleReviews: boolean;
  requireBranchesToBeUpToDate: boolean;
}

export interface ReviewRequirementRequest {
  repository: string;
  branch: string;
  requiredApprovals: number;
  requireCodeOwners: boolean;
  dismissStaleReviews: boolean;
  requireLastPushApproval: boolean;
}

export interface EmergencyBypassRequest {
  repository: string;
  branch: string;
  requestor: string;
  justification: string;
  duration: number; // minutes
  authorizedBy: string;
}

// Validation Types
export interface QMSValidationRequest {
  repository: string;
  prNumber: number;
  requestedBy: string;
  priority: ValidationPriority;
  customValidations?: CustomValidationConfig[];
  skipValidations?: QualityGateType[];
  deadlines?: ValidationDeadlines;
}

export interface CustomValidationConfig {
  name: string;
  type: QualityGateType;
  config: Record<string, any>;
  timeout: number;
}

export interface ValidationDeadlines {
  softDeadline?: Date;
  hardDeadline?: Date;
  timeZone: string;
}

export interface QMSValidationOrchestration {
  orchestrationId: string;
  trackingId: string;
  workflowRunId: number;
  expectedCompletion: Date;
  validationPlan: ValidationExecutionPlan;
  progressCallback: (update: ValidationProgress) => void;
}

export interface ValidationExecutionPlan {
  phases: ValidationPhase[];
  parallelExecution: boolean;
  fallbackStrategies: FallbackStrategy[];
}

export interface ValidationPhase {
  id: string;
  name: string;
  gateTypes: QualityGateType[];
  order: number;
  dependencies: string[];
  canRunInParallel: boolean;
  estimatedDuration: number;
}


export interface ValidationProgress {
  phase: string;
  completedGates: QualityGateType[];
  failedGates: QualityGateType[];
  currentGate?: QualityGateType;
  estimatedCompletion: Date;
}

// Bypass and Emergency Types
export interface BypassRequest {
  repository: string;
  sha: string;
  checkName: string;
  requestor: string;
  justification: string;
  approver?: string;
}

export interface BypassResponse {
  approved: boolean;
  reason?: string;
  approver?: string;
  expiresAt?: Date;
  conditions?: string[];
}

export interface QualityGateFailure {
  gateType: QualityGateType;
  repository: string;
  prNumber: number;
  failureDetails: FailedCheck[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  escalationRequired: boolean;
}

export interface FailureResolution {
  action: 'retry' | 'bypass' | 'escalate' | 'block';
  reason: string;
  approver?: string;
  nextSteps: string[];
}

// Batch Operations
export interface BatchUpdateResult {
  successful: number;
  failed: number;
  errors: BatchError[];
}

export interface BatchError {
  checkName: string;
  error: string;
  retryable: boolean;
}

// Validator Results
export interface ValidatorResults {
  gateType: QualityGateType;
  status: StatusCheckState;
  details: QualityGateDetails;
  trackingId: string;
  executionTime: number;
  timestamp: Date;
}

// Parallel Validation Types
export interface ParallelValidationRequest {
  gateType: QualityGateType;
  config: CustomValidationConfig;
  priority: ValidationPriority;
}

export interface ParallelValidationResults {
  results: ValidatorResults[];
  overallStatus: StatusCheckState;
  executionTime: number;
  parallelismAchieved: number;
}

// Event and Callback Types
export interface StatusEventCallback {
  (event: StatusEvent): void;
}

export interface StatusEvent {
  type: 'status_update' | 'workflow_complete' | 'validation_failed';
  repository: string;
  sha: string;
  data: any;
  timestamp: Date;
}

export interface TimeoutContext {
  repository: string;
  sha: string;
  checkName: string;
  timeoutDuration: number;
  lastUpdate: Date;
}

// Configuration Types
export interface GitHubActionsConfig {
  owner: string;
  repo: string;
  token: string;
  baseUrl?: string;
  apiVersion?: string;
  timeoutMs?: number;
  workflows?: {
    qms_quality_gates: string;
    emergency_response: string;
  };
  statusChecks?: {
    requiredContexts: string[];
    timeoutMinutes: number;
    retryAttempts: number;
  };
  branchProtection?: Record<string, BranchProtectionConfig>;
}

export interface BranchProtectionConfig {
  requiredStatusChecks: {
    strict: boolean;
    contexts: string[];
  } | null;
  requiredPullRequestReviews: {
    requiredApprovingReviewCount: number;
    dismissStaleReviews: boolean;
    requireCodeOwnerReviews?: boolean;
  } | null;
  enforceAdmins: boolean;
  restrictions?: {
    users: string[];
    teams: string[];
    apps: string[];
  } | null;
}

// Rerun Options
export interface RerunOptions {
  failedJobsOnly?: boolean;
  specificJobs?: string[];
  reason?: string;
}

// Workflow Context and Configuration
export interface WorkflowContext {
  repositoryTier: RepositoryTier;
  environment: string;
  pullRequestNumber?: number;
  commitSha: string;
  branch?: string;
  triggeredBy: string;
  metadata?: Record<string, any>;
}

export interface QualityGateConfig {
  type: QualityGateType;
  config: {
    enabled: boolean;
    blocking: boolean;
    timeoutMinutes: number;
    metadata?: Record<string, any>;
  };
}


export interface WorkflowTriggerResponse {
  workflowRunId: string;
  status: WorkflowStatusValue;
  conclusion?: WorkflowConclusion;
  triggeredAt: Date;
  context: WorkflowContext;
  qualityGates: QualityGateConfig[];
  estimatedDuration?: number;
  error?: string;
  logs: LogEntry[];
}

// QMS Validation Results
export interface QMSValidationResults {
  trackingId: string;
  overallResult: StatusCheckState;
  gateResults: Map<QualityGateType, ValidatorResults>;
  summary: ComplianceSummary;
  executionTime: number;
  recommendations: string[];
}

// Additional Branch Protection Interfaces
export interface BranchProtectionResponse {
  success: boolean;
  branch: string;
  appliedRules: string[];
  bypassEnabled: boolean;
  errors?: string[];
  logs: LogEntry[];
}

export interface ProtectionRuleUpdateRequest {
  branch: string;
  requiredStatusChecks?: {
    strict?: boolean;
    contexts?: string[];
  };
  requiredReviews?: number;
  dismissStaleReviews?: boolean;
  restrictPushes?: boolean;
}
