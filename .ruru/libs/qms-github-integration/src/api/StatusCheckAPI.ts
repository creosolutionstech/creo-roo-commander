/**
 * GitHub Status Check API Implementation
 * 
 * Provides programmatic control over GitHub status checks for QMS quality gates
 * and validation processes, coordinating with GitHub's commit status API.
 * 
 * @fileoverview Status check coordination and management for QMS integration
 * @version 1.0.0
 * @since 2025-08-18
 */

import {
  StatusCheckInitRequest,
  QualityGateStatusUpdate,
  StatusCheckState,
  QualityGateType,
  BatchUpdateResult,
  LogEntry,
  GitHubActionsConfig,
  ComplianceStatusRequest,
  ComplianceStatus
} from '../types/index.js';

/**
 * Main API class for managing GitHub status checks and QMS quality gate coordination
 * Integrates with GitHub's commit status API and existing QMS infrastructure
 */
export class StatusCheckAPI {
  private readonly config: GitHubActionsConfig;
  private readonly apiBaseUrl: string;
  private readonly activeChecks = new Map<string, Set<string>>(); // sha -> check names

  constructor(config: GitHubActionsConfig) {
    this.config = config;
    this.apiBaseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  }

  /**
   * Initialize status checks for a commit/PR
   * Sets up all required status checks based on repository tier and quality gates
   * 
   * @param request - Status check initialization configuration
   * @returns Promise resolving to initialization result
   */
  async initializeStatusChecks(request: StatusCheckInitRequest): Promise<{
    success: boolean;
    initializedChecks: string[];
    errors?: string[];
    logs: LogEntry[];
  }> {
    const logs: LogEntry[] = [];
    const initializedChecks: string[] = [];
    const errors: string[] = [];

    try {
      // Validate request
      this.validateInitRequest(request);

      // Determine required checks based on repository tier and quality gates
      const requiredChecks = this.determineRequiredChecks(
        request.requiredChecks,
        request.classification
      );

      logs.push({
        timestamp: new Date(),
        level: 'info',
        message: `Initializing ${requiredChecks.length} status checks for ${request.sha}`,
        source: 'StatusCheckAPI',
        metadata: { 
          sha: request.sha, 
          prNumber: request.prNumber,
          trackingId: request.trackingId 
        }
      });

      // Initialize each required check as "pending"
      for (const checkType of requiredChecks) {
        try {
          const checkName = this.generateCheckName(checkType);
          
          await this.updateSingleStatusCheck({
            repository: request.repository,
            sha: request.sha,
            checkName,
            state: 'pending',
            description: `${checkType} validation queued`,
            details: {
              gateType: checkType,
              executedChecks: [],
              recommendations: []
            }
          });

          initializedChecks.push(checkName);

          // Track active check
          if (!this.activeChecks.has(request.sha)) {
            this.activeChecks.set(request.sha, new Set());
          }
          this.activeChecks.get(request.sha)!.add(checkName);

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          errors.push(`Failed to initialize ${checkType}: ${errorMessage}`);
          
          logs.push({
            timestamp: new Date(),
            level: 'error',
            message: `Failed to initialize status check for ${checkType}`,
            source: 'StatusCheckAPI',
            metadata: { error: errorMessage, checkType }
          });
        }
      }

      const success = errors.length === 0;
      logs.push({
        timestamp: new Date(),
        level: success ? 'info' : 'warn',
        message: `Status check initialization ${success ? 'completed' : 'completed with errors'}: ${initializedChecks.length}/${requiredChecks.length} checks initialized`,
        source: 'StatusCheckAPI',
        metadata: { 
          initializedCount: initializedChecks.length,
          totalCount: requiredChecks.length,
          errorCount: errors.length
        }
      });

      return {
        success,
        initializedChecks,
        errors: errors.length > 0 ? errors : undefined,
        logs
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        initializedChecks: [],
        errors: [errorMessage],
        logs: [
          ...logs,
          {
            timestamp: new Date(),
            level: 'error',
            message: `Status check initialization failed: ${errorMessage}`,
            source: 'StatusCheckAPI',
            metadata: { error: errorMessage }
          }
        ]
      };
    }
  }

  /**
   * Update a single quality gate status check
   * 
   * @param update - Status check update configuration
   * @returns Promise resolving to update result
   */
  async updateStatusCheck(update: QualityGateStatusUpdate): Promise<{
    success: boolean;
    checkName: string;
    previousState?: StatusCheckState;
    logs: LogEntry[];
  }> {
    try {
      // Get current state for comparison
      const currentCheck = await this.getCurrentCheckStatus(update.repository, update.sha, update.checkName);
      const previousState = currentCheck?.state;

      // Update the status check via GitHub API
      await this.updateSingleStatusCheck(update);

      // Update local tracking
      if (update.state === 'success' || update.state === 'failure') {
        this.activeChecks.get(update.sha)?.delete(update.checkName);
      }

      const logs: LogEntry[] = [
        {
          timestamp: new Date(),
          level: 'info',
          message: `Status check updated: ${update.checkName} -> ${update.state}`,
          source: 'StatusCheckAPI',
          metadata: {
            repository: update.repository,
            sha: update.sha,
            checkName: update.checkName,
            previousState,
            newState: update.state,
            bypassAvailable: update.bypassAvailable
          }
        }
      ];

      return {
        success: true,
        checkName: update.checkName,
        previousState,
        logs
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        checkName: update.checkName,
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to update status check: ${errorMessage}`,
            source: 'StatusCheckAPI',
            metadata: { 
              error: errorMessage,
              checkName: update.checkName,
              sha: update.sha
            }
          }
        ]
      };
    }
  }

  /**
   * Update multiple status checks in batch
   * 
   * @param updates - Array of status check updates
   * @returns Promise resolving to batch update results
   */
  async batchUpdateStatusChecks(updates: QualityGateStatusUpdate[]): Promise<BatchUpdateResult> {
    const results: BatchUpdateResult = {
      successful: 0,
      failed: 0,
      errors: []
    };

    for (const update of updates) {
      try {
        await this.updateStatusCheck(update);
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          checkName: update.checkName,
          error: error instanceof Error ? error.message : 'Unknown error',
          retryable: this.isRetryableError(error)
        });
      }
    }

    return results;
  }

  /**
   * Get the current status of all checks for a commit
   * 
   * @param repository - Repository name
   * @param sha - Commit SHA
   * @returns Promise resolving to current status summary
   */
  async getCommitStatusSummary(repository: string, sha: string): Promise<{
    overallStatus: ComplianceStatus;
    checks: Array<{
      name: string;
      state: StatusCheckState;
      description: string;
      targetUrl?: string;
    }>;
    pendingCount: number;
    successCount: number;
    failureCount: number;
    logs: LogEntry[];
  }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/commits/${sha}/status`,
        {
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const statusData = await response.json();
      const checks = (statusData as any).statuses || [];

      let pendingCount = 0;
      let successCount = 0;
      let failureCount = 0;

      const checkSummary = checks.map((check: any) => {
        const state = this.mapGitHubStatusState(check.state);
        
        switch (state) {
          case 'pending': pendingCount++; break;
          case 'success': successCount++; break;
          case 'failure': case 'error': failureCount++; break;
        }

        return {
          name: check.context,
          state,
          description: check.description || '',
          targetUrl: check.target_url
        };
      });

      // Determine overall status
      let overallStatus: ComplianceStatus;
      if (failureCount > 0) {
        overallStatus = 'failure';
      } else if (pendingCount > 0) {
        overallStatus = 'pending';
      } else {
        overallStatus = 'success';
      }

      return {
        overallStatus,
        checks: checkSummary,
        pendingCount,
        successCount,
        failureCount,
        logs: [
          {
            timestamp: new Date(),
            level: 'info',
            message: `Commit status summary retrieved: ${successCount} success, ${failureCount} failed, ${pendingCount} pending`,
            source: 'StatusCheckAPI',
            metadata: {
              repository,
              sha,
              overallStatus,
              totalChecks: checks.length
            }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        overallStatus: 'failure',
        checks: [],
        pendingCount: 0,
        successCount: 0,
        failureCount: 0,
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to get commit status summary: ${errorMessage}`,
            source: 'StatusCheckAPI',
            metadata: { error: errorMessage, repository, sha }
          }
        ]
      };
    }
  }

  /**
   * Update overall compliance status for a commit
   * 
   * @param request - Compliance status update request
   * @returns Promise resolving to update result
   */
  async updateComplianceStatus(request: ComplianceStatusRequest): Promise<{
    success: boolean;
    logs: LogEntry[];
  }> {
    try {
      const description = this.generateComplianceDescription(request);
      
      await this.updateSingleStatusCheck({
        repository: request.repository,
        sha: request.sha,
        checkName: 'qms/compliance-status',
        state: this.mapComplianceToStatusState(request.overallStatus),
        description,
        targetUrl: undefined, // Could link to QMS dashboard
        details: {
          gateType: 'overall',
          executedChecks: [],
          metrics: {
            codeQuality: request.summary.overallScore
          },
          recommendations: request.actionRequired ? [request.actionRequired] : []
        }
      });

      return {
        success: true,
        logs: [
          {
            timestamp: new Date(),
            level: 'info',
            message: `Compliance status updated: ${request.overallStatus}`,
            source: 'StatusCheckAPI',
            metadata: {
              repository: request.repository,
              sha: request.sha,
              overallStatus: request.overallStatus,
              score: request.summary.overallScore
            }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to update compliance status: ${errorMessage}`,
            source: 'StatusCheckAPI',
            metadata: { error: errorMessage }
          }
        ]
      };
    }
  }

  /**
   * Private method to update a single status check via GitHub API
   */
  private async updateSingleStatusCheck(update: QualityGateStatusUpdate): Promise<void> {
    const payload = {
      state: update.state,
      target_url: update.targetUrl,
      description: update.description,
      context: update.checkName
    };

    const response = await fetch(
      `${this.apiBaseUrl}/statuses/${update.sha}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
  }

  /**
   * Get current status of a specific check
   */
  private async getCurrentCheckStatus(_repository: string, sha: string, checkName: string): Promise<{
    state: StatusCheckState;
    description?: string;
  } | null> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/commits/${sha}/status`,
        {
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const check = (data as any).statuses?.find((status: any) => status.context === checkName);
      
      if (!check) {
        return null;
      }

      return {
        state: this.mapGitHubStatusState(check.state),
        description: check.description
      };

    } catch {
      return null;
    }
  }

  /**
   * Validate status check initialization request
   */
  private validateInitRequest(request: StatusCheckInitRequest): void {
    if (!request.repository) {
      throw new Error('Repository is required');
    }

    if (!request.sha) {
      throw new Error('Commit SHA is required');
    }

    if (!request.requiredChecks || request.requiredChecks.length === 0) {
      throw new Error('At least one required check must be specified');
    }

    if (!request.trackingId) {
      throw new Error('Tracking ID is required');
    }
  }

  /**
   * Determine required checks based on repository tier and quality gates
   */
  private determineRequiredChecks(
    requestedChecks: QualityGateType[],
    classification: string
  ): QualityGateType[] {
    // Base checks for all repositories
    const baseChecks: QualityGateType[] = ['dor', 'coding_standards', 'dod'];

    // Additional checks based on classification
    const additionalChecks: QualityGateType[] = [];
    
    if (classification === 'HIGH_RISK' || classification === 'MEDIUM_RISK') {
      additionalChecks.push('security');
    }

    // Combine and deduplicate
    const allChecks = [...new Set([...baseChecks, ...additionalChecks, ...requestedChecks])];
    
    return allChecks;
  }

  /**
   * Generate standardized check name for quality gate type
   */
  private generateCheckName(gateType: QualityGateType): string {
    return `qms/${gateType}`;
  }

  /**
   * Map GitHub status state to our internal state enum
   */
  private mapGitHubStatusState(githubState: string): StatusCheckState {
    switch (githubState) {
      case 'pending': return 'pending';
      case 'success': return 'success';
      case 'failure': return 'failure';
      case 'error': return 'error';
      default: return 'pending';
    }
  }

  /**
   * Map compliance status to GitHub status state
   */
  private mapComplianceToStatusState(complianceStatus: ComplianceStatus): StatusCheckState {
    switch (complianceStatus) {
      case 'success': return 'success';
      case 'failure': return 'failure';
      case 'pending': return 'pending';
      default: return 'pending';
    }
  }

  /**
   * Generate compliance status description
   */
  private generateComplianceDescription(request: ComplianceStatusRequest): string {
    const { summary } = request;
    
    
    if (request.overallStatus === 'success') {
      return `✅ All quality gates passed (${summary.passedGates}/${summary.totalGates}) - Score: ${summary.overallScore}%`;
    } else if (request.overallStatus === 'failure') {
      return `❌ Quality gates failed (${summary.failedGates} failed, ${summary.passedGates} passed) - Score: ${summary.overallScore}%`;
    } else {
      return `⏳ Quality validation in progress (${summary.passedGates}/${summary.totalGates} completed)`;
    }
  }

  /**
   * Check if an error is retryable
   */
  private isRetryableError(error: any): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return message.includes('timeout') || 
             message.includes('network') || 
             message.includes('503') || 
             message.includes('502');
    }
    return false;
  }
}