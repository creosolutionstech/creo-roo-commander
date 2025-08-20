/**
 * GitHub Actions Workflow Trigger API Implementation
 * 
 * Provides programmatic control over GitHub Actions workflow execution
 * for QMS quality gates and validation processes.
 * 
 * @fileoverview Core implementation for triggering and managing GitHub Actions workflows
 * @version 1.0.0
 * @since 2025-08-18
 */

import {
  WorkflowTriggerRequest,
  WorkflowTriggerResponse,
  WorkflowStatusValue,
  WorkflowConclusion,
  LogEntry,
  WorkflowStep,
  GitHubActionsConfig
} from '../types/index.js';

/**
 * Main API class for triggering and managing GitHub Actions workflows
 * Integrates with existing QMS infrastructure and quality gate orchestration
 */
export class WorkflowTriggerAPI {
  private readonly config: GitHubActionsConfig;
  private readonly apiBaseUrl: string;

  constructor(config: GitHubActionsConfig) {
    this.config = config;
    this.apiBaseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  }

  /**
   * Trigger a GitHub Actions workflow with QMS quality gate context
   * 
   * @param request - Workflow trigger configuration and context
   * @returns Promise resolving to workflow execution details
   */
  async triggerWorkflow(request: WorkflowTriggerRequest): Promise<WorkflowTriggerResponse> {
    try {
      // Validate request parameters
      this.validateTriggerRequest(request);

      // Prepare workflow inputs with QMS context
      const workflowInputs = this.prepareWorkflowInputs(request);

      // Execute GitHub API call to trigger workflow
      const response = await this.executeWorkflowDispatch(request.workflowId, workflowInputs);

      // Return structured response
      return {
        workflowRunId: response.id,
        status: 'queued' as WorkflowStatusValue,
        triggeredAt: new Date(),
        context: request.context,
        qualityGates: request.qualityGates,
        estimatedDuration: this.estimateWorkflowDuration(request),
        logs: [
          {
            timestamp: new Date(),
            level: 'info',
            message: `Workflow ${request.workflowId} triggered successfully`,
            source: 'WorkflowTriggerAPI',
            metadata: {
              workflowRunId: response.id,
              qualityGates: request.qualityGates.map(qg => qg.type).join(', ')
            }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        workflowRunId: '',
        status: 'failure' as WorkflowStatusValue,
        conclusion: 'failure' as WorkflowConclusion,
        triggeredAt: new Date(),
        context: request.context,
        qualityGates: request.qualityGates,
        error: errorMessage,
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to trigger workflow: ${errorMessage}`,
            source: 'WorkflowTriggerAPI',
            metadata: { error: errorMessage }
          }
        ]
      };
    }
  }

  /**
   * Get the current status of a workflow run
   * 
   * @param workflowRunId - GitHub workflow run ID
   * @returns Promise resolving to current workflow status
   */
  async getWorkflowStatus(workflowRunId: string): Promise<{
    status: WorkflowStatusValue;
    conclusion?: WorkflowConclusion;
    steps: WorkflowStep[];
    logs: LogEntry[];
  }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/actions/runs/${workflowRunId}`,
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

      const runData = await response.json() as any;
      const jobsResponse = await this.getWorkflowJobs(workflowRunId);

      return {
        status: this.mapGitHubStatus(runData.status),
        conclusion: runData.conclusion ? this.mapGitHubConclusion(runData.conclusion) : undefined,
        steps: this.parseWorkflowSteps(jobsResponse.jobs),
        logs: [
          {
            timestamp: new Date(runData.updated_at),
            level: 'info',
            message: `Workflow status: ${runData.status}`,
            source: 'WorkflowTriggerAPI',
            metadata: {
              workflowRunId,
              githubStatus: runData.status,
              conclusion: runData.conclusion
            }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        status: 'failure' as WorkflowStatusValue,
        conclusion: 'failure' as WorkflowConclusion,
        steps: [],
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to get workflow status: ${errorMessage}`,
            source: 'WorkflowTriggerAPI',
            metadata: { error: errorMessage, workflowRunId }
          }
        ]
      };
    }
  }

  /**
   * Cancel a running workflow
   * 
   * @param workflowRunId - GitHub workflow run ID to cancel
   * @returns Promise resolving to cancellation result
   */
  async cancelWorkflow(workflowRunId: string): Promise<{
    success: boolean;
    message: string;
    logs: LogEntry[];
  }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/actions/runs/${workflowRunId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return {
        success: true,
        message: `Workflow ${workflowRunId} cancelled successfully`,
        logs: [
          {
            timestamp: new Date(),
            level: 'info',
            message: `Workflow ${workflowRunId} cancelled`,
            source: 'WorkflowTriggerAPI',
            metadata: { workflowRunId }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        message: `Failed to cancel workflow: ${errorMessage}`,
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to cancel workflow: ${errorMessage}`,
            source: 'WorkflowTriggerAPI',
            metadata: { error: errorMessage, workflowRunId }
          }
        ]
      };
    }
  }

  /**
   * Validate workflow trigger request parameters
   */
  private validateTriggerRequest(request: WorkflowTriggerRequest): void {
    if (!request.workflowId) {
      throw new Error('Workflow ID is required');
    }

    if (!request.ref) {
      throw new Error('Git reference (ref) is required');
    }

    if (!request.qualityGates || request.qualityGates.length === 0) {
      throw new Error('At least one quality gate must be specified');
    }

    // Validate quality gate configurations
    for (const qg of request.qualityGates) {
      if (!qg.type || !qg.config) {
        throw new Error(`Invalid quality gate configuration: ${JSON.stringify(qg)}`);
      }
    }
  }

  /**
   * Prepare workflow inputs with QMS context and quality gate configuration
   */
  private prepareWorkflowInputs(request: WorkflowTriggerRequest): Record<string, any> {
    return {
      // Core workflow inputs
      ref: request.ref,
      repository_tier: request.context.repositoryTier,
      
      // Quality gate configuration
      quality_gates: JSON.stringify(request.qualityGates.map(qg => ({
        type: qg.type,
        enabled: qg.config.enabled,
        blocking: qg.config.blocking,
        timeout: qg.config.timeoutMinutes,
        metadata: qg.config.metadata
      }))),
      
      // QMS context
      qms_context: JSON.stringify({
        triggeredBy: 'QMS-API',
        timestamp: new Date().toISOString(),
        repositoryTier: request.context.repositoryTier,
        environment: request.context.environment,
        pr_number: request.context.pullRequestNumber,
        commit_sha: request.context.commitSha
      }),

      // Additional inputs
      ...request.inputs
    };
  }

  /**
   * Execute GitHub Actions workflow dispatch API call
   */
  private async executeWorkflowDispatch(workflowId: string, inputs: Record<string, any>): Promise<any> {
    const response = await fetch(
      `${this.apiBaseUrl}/actions/workflows/${workflowId}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: inputs.ref,
          inputs: inputs
        })
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // GitHub workflow dispatch returns 204 with no content
    // We need to fetch the most recent workflow run for this workflow
    return await this.getMostRecentWorkflowRun(workflowId);
  }

  /**
   * Get the most recent workflow run for a given workflow
   */
  private async getMostRecentWorkflowRun(workflowId: string): Promise<any> {
    const response = await fetch(
      `${this.apiBaseUrl}/actions/workflows/${workflowId}/runs?per_page=1`,
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

    const data = await response.json() as any;
    return (data as any).workflow_runs[0];
  }

  /**
   * Get workflow jobs for a given run
   */
  private async getWorkflowJobs(workflowRunId: string): Promise<any> {
    const response = await fetch(
      `${this.apiBaseUrl}/actions/runs/${workflowRunId}/jobs`,
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

    return await response.json();
  }

  /**
   * Map GitHub status to our internal status enum
   */
  private mapGitHubStatus(githubStatus: string): WorkflowStatusValue {
    switch (githubStatus) {
      case 'queued': return 'queued';
      case 'in_progress': return 'in_progress';
      case 'completed': return 'completed';
      default: return 'queued';
    }
  }

  /**
   * Map GitHub conclusion to our internal conclusion enum
   */
  private mapGitHubConclusion(githubConclusion: string): WorkflowConclusion {
    switch (githubConclusion) {
      case 'success': return 'success';
      case 'failure': return 'failure';
      case 'cancelled': return 'cancelled';
      case 'timed_out': return 'timed_out';
      case 'skipped': return 'skipped';
      default: return 'failure';
    }
  }

  /**
   * Parse GitHub workflow jobs into our WorkflowStep format
   */
  private parseWorkflowSteps(jobs: any[]): WorkflowStep[] {
    return jobs.map(job => ({
      name: job.name,
      status: this.mapGitHubStatus(job.status),
      conclusion: job.conclusion ? this.mapGitHubConclusion(job.conclusion) : undefined,
      startedAt: new Date(job.started_at),
      completedAt: job.completed_at ? new Date(job.completed_at) : undefined,
      logs: [
        {
          timestamp: new Date(job.started_at),
          level: 'info',
          message: `Job ${job.name} started`,
          source: 'GitHub',
          metadata: { jobId: job.id }
        }
      ]
    }));
  }

  /**
   * Estimate workflow duration based on repository tier and quality gates
   */
  private estimateWorkflowDuration(request: WorkflowTriggerRequest): number {
    const baseTime = 5; // 5 minutes base
    const tierMultiplier = {
      'mission_critical': 2.0,
      'business_critical': 1.5,
      'standard': 1.0,
      'experimental': 0.7
    }[request.context.repositoryTier] || 1.0;

    const qualityGateTime = request.qualityGates.length * 3; // 3 minutes per quality gate
    
    return Math.round(baseTime * tierMultiplier + qualityGateTime);
  }
}