/**
 * GitHub Branch Protection API Implementation
 * 
 * Provides programmatic control over GitHub branch protection rules for QMS
 * quality enforcement, coordinating with repository security settings and
 * status check requirements.
 * 
 * @fileoverview Branch protection management for QMS integration
 * @version 1.0.0
 * @since 2025-08-18
 */

import {
  BranchProtectionRequest,
  BranchProtectionResponse,
  BranchProtectionConfig,
  ProtectionRuleUpdateRequest,
  RepositoryTier,
  QualityGateType,
  LogEntry,
  GitHubActionsConfig
} from '../types/index.js';

/**
 * Main API class for managing GitHub branch protection rules and QMS quality enforcement
 * Integrates with GitHub's branch protection API and existing QMS infrastructure
 */
export class BranchProtectionAPI {
  private readonly config: GitHubActionsConfig;
  private readonly apiBaseUrl: string;
  private readonly ruleCache = new Map<string, BranchProtectionConfig>(); // branch -> config

  constructor(config: GitHubActionsConfig) {
    this.config = config;
    this.apiBaseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  }

  /**
   * Apply branch protection rules based on repository tier and QMS requirements
   * 
   * @param request - Branch protection configuration request
   * @returns Promise resolving to protection rule setup result
   */
  async applyProtectionRules(request: BranchProtectionRequest): Promise<BranchProtectionResponse> {
    const logs: LogEntry[] = [];
    const appliedRules: string[] = [];
    const errors: string[] = [];

    try {
      // Validate request
      this.validateProtectionRequest(request);

      logs.push({
        timestamp: new Date(),
        level: 'info',
        message: `Applying branch protection rules for branch: ${request.branch}`,
        source: 'BranchProtectionAPI',
        metadata: {
          branch: request.branch,
          tier: request.tier,
          qualityGatesCount: request.requiredQualityGates.length
        }
      });

      // Generate protection configuration based on repository tier
      const protectionConfig = this.generateProtectionConfig(request);

      // Apply the protection rules via GitHub API
      const response = await this.updateBranchProtection(request.branch, protectionConfig);

      if (response.success) {
        appliedRules.push(`Branch protection enabled for ${request.branch}`);
        appliedRules.push(`Required status checks: ${protectionConfig.requiredStatusChecks?.contexts?.join(', ') || 'none'}`);
        appliedRules.push(`Required reviews: ${protectionConfig.requiredPullRequestReviews?.requiredApprovingReviewCount || 0}`);
        appliedRules.push(`Dismiss stale reviews: ${protectionConfig.requiredPullRequestReviews?.dismissStaleReviews || false}`);
        appliedRules.push(`Restrict pushes: ${protectionConfig.restrictions ? 'enabled' : 'disabled'}`);

        // Cache the applied configuration
        this.ruleCache.set(request.branch, protectionConfig);

        logs.push({
          timestamp: new Date(),
          level: 'info',
          message: `Branch protection rules successfully applied to ${request.branch}`,
          source: 'BranchProtectionAPI',
          metadata: {
            branch: request.branch,
            rulesApplied: appliedRules.length
          }
        });
      } else {
        errors.push(`Failed to apply branch protection: ${response.error}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      
      logs.push({
        timestamp: new Date(),
        level: 'error',
        message: `Branch protection rule application failed: ${errorMessage}`,
        source: 'BranchProtectionAPI',
        metadata: { error: errorMessage, branch: request.branch }
      });
    }

    const success = errors.length === 0;
    
    return {
      success,
      branch: request.branch,
      appliedRules: success ? appliedRules : [],
      bypassEnabled: request.allowBypass || false,
      errors: errors.length > 0 ? errors : undefined,
      logs
    };
  }

  /**
   * Update specific branch protection rules
   * 
   * @param request - Rule update configuration
   * @returns Promise resolving to update result
   */
  async updateProtectionRules(request: ProtectionRuleUpdateRequest): Promise<{
    success: boolean;
    updatedRules: string[];
    logs: LogEntry[];
  }> {
    try {
      const logs: LogEntry[] = [];
      const updatedRules: string[] = [];

      // Get current protection configuration
      const currentConfig = await this.getBranchProtection(request.branch);
      
      if (!currentConfig) {
        throw new Error(`No protection rules found for branch: ${request.branch}`);
      }

      // Apply updates to configuration
      const updatedConfig = this.applyRuleUpdates(currentConfig, request);

      // Update the protection rules
      const response = await this.updateBranchProtection(request.branch, updatedConfig);

      if (response.success) {
        // Track what was updated
        if (request.requiredStatusChecks) {
          updatedRules.push('Updated required status checks');
        }
        if (request.requiredReviews !== undefined) {
          updatedRules.push('Updated required review count');
        }
        if (request.dismissStaleReviews !== undefined) {
          updatedRules.push('Updated stale review dismissal');
        }
        if (request.restrictPushes !== undefined) {
          updatedRules.push('Updated push restrictions');
        }

        // Update cache
        this.ruleCache.set(request.branch, updatedConfig);

        logs.push({
          timestamp: new Date(),
          level: 'info',
          message: `Branch protection rules updated for ${request.branch}`,
          source: 'BranchProtectionAPI',
          metadata: {
            branch: request.branch,
            updatesApplied: updatedRules.length
          }
        });
      }

      return {
        success: response.success,
        updatedRules: response.success ? updatedRules : [],
        logs
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        updatedRules: [],
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to update protection rules: ${errorMessage}`,
            source: 'BranchProtectionAPI',
            metadata: { error: errorMessage, branch: request.branch }
          }
        ]
      };
    }
  }

  /**
   * Get current branch protection status
   * 
   * @param branch - Branch name to check
   * @returns Promise resolving to current protection configuration
   */
  async getBranchProtectionStatus(branch: string): Promise<{
    isProtected: boolean;
    config?: BranchProtectionConfig;
    compliance: {
      hasRequiredChecks: boolean;
      hasRequiredReviews: boolean;
      enforceAdmins: boolean;
    };
    logs: LogEntry[];
  }> {
    try {
      const config = await this.getBranchProtection(branch);
      const isProtected = config !== null;

      const compliance = {
        hasRequiredChecks: Boolean(config?.requiredStatusChecks?.contexts?.length),
        hasRequiredReviews: Boolean(config?.requiredPullRequestReviews?.requiredApprovingReviewCount),
        enforceAdmins: Boolean(config?.enforceAdmins)
      };

      return {
        isProtected,
        config: config || undefined,
        compliance,
        logs: [
          {
            timestamp: new Date(),
            level: 'info',
            message: `Branch protection status retrieved for ${branch}: ${isProtected ? 'isProtected' : 'unisProtected'}`,
            source: 'BranchProtectionAPI',
            metadata: { branch, isProtected, compliance }
          }
        ]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        isProtected: false,
        compliance: {
          hasRequiredChecks: false,
          hasRequiredReviews: false,
          enforceAdmins: false
        },
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to get branch protection status: ${errorMessage}`,
            source: 'BranchProtectionAPI',
            metadata: { error: errorMessage, branch }
          }
        ]
      };
    }
  }

  /**
   * Enable bypass permissions for administrative overrides
   * 
   * @param branch - Branch to configure
   * @param usernames - GitHub usernames to grant bypass access
   * @param reason - Reason for enabling bypass (for audit trail)
   * @returns Promise resolving to bypass configuration result
   */
  async enableBypassPermissions(
    branch: string, 
    usernames: string[], 
    reason: string
  ): Promise<{
    success: boolean;
    bypassUsers: string[];
    logs: LogEntry[];
  }> {
    try {
      const logs: LogEntry[] = [];

      // Get current protection configuration
      const currentConfig = await this.getBranchProtection(branch);
      
      if (!currentConfig) {
        throw new Error(`No protection rules found for branch: ${branch}`);
      }

      // Add bypass permissions by updating restrictions
      const updatedConfig: BranchProtectionConfig = {
        ...currentConfig,
        restrictions: {
          users: usernames,
          teams: [], // Could be extended to support team-based bypass
          apps: []
        }
      };

      // Update the protection rules
      const response = await this.updateBranchProtection(branch, updatedConfig);

      if (response.success) {
        // Update cache
        this.ruleCache.set(branch, updatedConfig);

        logs.push({
          timestamp: new Date(),
          level: 'warn', // Use warn level for bypass operations
          message: `Bypass permissions enabled for ${usernames.length} users on branch ${branch}`,
          source: 'BranchProtectionAPI',
          metadata: {
            branch,
            bypassUsers: usernames,
            reason,
            auditTrail: true
          }
        });
      }

      return {
        success: response.success,
        bypassUsers: response.success ? usernames : [],
        logs
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        bypassUsers: [],
        logs: [
          {
            timestamp: new Date(),
            level: 'error',
            message: `Failed to enable bypass permissions: ${errorMessage}`,
            source: 'BranchProtectionAPI',
            metadata: { error: errorMessage, branch }
          }
        ]
      };
    }
  }

  /**
   * Remove branch protection rules
   * 
   * @param branch - Branch to remove protection from
   * @param reason - Reason for removal (for audit trail)
   * @returns Promise resolving to removal result
   */
  async removeProtectionRules(branch: string, reason: string): Promise<{
    success: boolean;
    logs: LogEntry[];
  }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/branches/${branch}/protection`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      const success = response.ok;

      if (success) {
        // Clear from cache
        this.ruleCache.delete(branch);
      }

      return {
        success,
        logs: [
          {
            timestamp: new Date(),
            level: success ? 'warn' : 'error',
            message: success 
              ? `Branch protection rules removed from ${branch}`
              : `Failed to remove branch protection rules from ${branch}`,
            source: 'BranchProtectionAPI',
            metadata: {
              branch,
              reason,
              auditTrail: true,
              responseStatus: response.status
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
            message: `Failed to remove branch protection: ${errorMessage}`,
            source: 'BranchProtectionAPI',
            metadata: { error: errorMessage, branch }
          }
        ]
      };
    }
  }

  /**
   * Private method to validate protection request
   */
  private validateProtectionRequest(request: BranchProtectionRequest): void {
    if (!request.branch) {
      throw new Error('Branch name is required');
    }

    if (!request.tier) {
      throw new Error('Repository tier is required');
    }

    if (!request.requiredQualityGates || request.requiredQualityGates.length === 0) {
      throw new Error('At least one quality gate must be specified');
    }
  }

  /**
   * Generate branch protection configuration based on repository tier and requirements
   */
  private generateProtectionConfig(request: BranchProtectionRequest): BranchProtectionConfig {
    const config: BranchProtectionConfig = {
      requiredStatusChecks: {
        strict: true, // Require branches to be up to date before merging
        contexts: this.generateRequiredStatusChecks(request.requiredQualityGates)
      },
      enforceAdmins: request.enforceAdmins ?? true,
      requiredPullRequestReviews: {
        dismissStaleReviews: true,
        requireCodeOwnerReviews: false,
        requiredApprovingReviewCount: this.getRequiredReviewCount(request.tier)
      },
      restrictions: request.allowBypass ? null : {
        users: [],
        teams: [],
        apps: []
      }
    };

    // Additional restrictions for high-tier repositories
    if (request.tier === 'mission_critical' || request.tier === 'business_critical') {
      config.requiredPullRequestReviews!.requireCodeOwnerReviews = true;
      config.requiredPullRequestReviews!.dismissStaleReviews = true;
    }

    return config;
  }

  /**
   * Generate required status check contexts for quality gates
   */
  private generateRequiredStatusChecks(qualityGates: QualityGateType[]): string[] {
    const statusChecks = qualityGates.map(gate => `qms/${gate}`);
    
    // Always include the overall compliance check
    statusChecks.push('qms/compliance-status');

    return statusChecks;
  }

  /**
   * Get required review count based on repository tier
   */
  private getRequiredReviewCount(tier: RepositoryTier): number {
    switch (tier) {
      case 'mission_critical': return 2;
      case 'business_critical': return 2;
      case 'standard': return 1;
      case 'experimental': return 1;
      default: return 1;
    }
  }

  /**
   * Update branch protection via GitHub API
   */
  private async updateBranchProtection(
    branch: string, 
    config: BranchProtectionConfig
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/branches/${branch}/protection`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(config)
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { message?: string };
        return {
          success: false,
          error: `GitHub API error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
        };
      }

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network or parsing error'
      };
    }
  }

  /**
   * Get current branch protection configuration
   */
  private async getBranchProtection(branch: string): Promise<BranchProtectionConfig | null> {
    try {
      // Check cache first
      if (this.ruleCache.has(branch)) {
        return this.ruleCache.get(branch)!;
      }

      const response = await fetch(
        `${this.apiBaseUrl}/branches/${branch}/protection`,
        {
          headers: {
            'Authorization': `token ${this.config.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (response.status === 404) {
        // Branch protection not enabled
        return null;
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as any;
      
      // Convert GitHub API response to our internal format
      const config: BranchProtectionConfig = {
        requiredStatusChecks: data.requiredStatusChecks ? {
          strict: data.requiredStatusChecks.strict,
          contexts: data.requiredStatusChecks.contexts
        } : null,
        enforceAdmins: data.enforceAdmins?.enabled ?? false,
        requiredPullRequestReviews: data.requiredPullRequestReviews ? {
          dismissStaleReviews: data.requiredPullRequestReviews.dismissStaleReviews,
          requireCodeOwnerReviews: data.requiredPullRequestReviews.requireCodeOwnerReviews,
          requiredApprovingReviewCount: data.requiredPullRequestReviews.requiredApprovingReviewCount
        } : null,
        restrictions: data.restrictions ? {
          users: data.restrictions.users?.map((u: any) => u.login) || [],
          teams: data.restrictions.teams?.map((t: any) => t.slug) || [],
          apps: data.restrictions.apps?.map((a: any) => a.slug) || []
        } : null
      };

      // Cache the result
      this.ruleCache.set(branch, config);
      
      return config;

    } catch (error) {
      // If there's an error fetching, assume no protection
      return null;
    }
  }

  /**
   * Apply rule updates to existing configuration
   */
  private applyRuleUpdates(
    currentConfig: BranchProtectionConfig,
    updates: ProtectionRuleUpdateRequest
  ): BranchProtectionConfig {
    const updatedConfig: BranchProtectionConfig = { ...currentConfig };

    // Update required status checks
    if (updates.requiredStatusChecks) {
      updatedConfig.requiredStatusChecks = {
        strict: updates.requiredStatusChecks.strict ?? currentConfig.requiredStatusChecks?.strict ?? true,
        contexts: updates.requiredStatusChecks.contexts || currentConfig.requiredStatusChecks?.contexts || []
      };
    }

    // Update review requirements
    if (updates.requiredReviews !== undefined || updates.dismissStaleReviews !== undefined) {
      updatedConfig.requiredPullRequestReviews = {
        ...currentConfig.requiredPullRequestReviews,
        requiredApprovingReviewCount: updates.requiredReviews ?? currentConfig.requiredPullRequestReviews?.requiredApprovingReviewCount ?? 1,
        dismissStaleReviews: updates.dismissStaleReviews ?? currentConfig.requiredPullRequestReviews?.dismissStaleReviews ?? true,
        requireCodeOwnerReviews: currentConfig.requiredPullRequestReviews?.requireCodeOwnerReviews ?? false
      };
    }

    // Update push restrictions
    if (updates.restrictPushes !== undefined) {
      if (updates.restrictPushes === false) {
        updatedConfig.restrictions = null;
      } else {
        updatedConfig.restrictions = currentConfig.restrictions || {
          users: [],
          teams: [],
          apps: []
        };
      }
    }

    return updatedConfig;
  }
}