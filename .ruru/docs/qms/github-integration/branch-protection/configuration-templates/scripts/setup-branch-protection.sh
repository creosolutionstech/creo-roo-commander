#!/bin/bash

# QMS Branch Protection Setup Script
# This script automates the setup of GitHub branch protection rules based on QMS configuration

set -euo pipefail

# Script Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="${SCRIPT_DIR}/../"
QMS_CONFIG_FILE="${CONFIG_DIR}/repository-qms-config.yml"
GITHUB_API_BASE="https://api.github.com"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $*" >&2
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $*" >&2
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $*" >&2
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

# Usage information
usage() {
    cat << EOF
QMS Branch Protection Setup Script

USAGE:
    $0 [OPTIONS] OWNER/REPO

DESCRIPTION:
    Sets up GitHub branch protection rules based on QMS configuration.
    Requires GitHub CLI (gh) to be authenticated.

OPTIONS:
    -c, --config FILE       QMS configuration file (default: repository-qms-config.yml)
    -b, --branch BRANCH     Target branch (default: main)
    -d, --dry-run          Show what would be changed without making changes
    -f, --force            Override existing protection rules
    -v, --verbose          Enable verbose output
    -h, --help             Show this help message

EXAMPLES:
    $0 myorg/myrepo
    $0 --config custom-config.yml --branch develop myorg/myrepo
    $0 --dry-run --verbose myorg/myrepo

REQUIREMENTS:
    - GitHub CLI (gh) installed and authenticated
    - yq command-line YAML processor
    - jq command-line JSON processor
    - Appropriate repository permissions

EOF
}

# Default values
CONFIG_FILE="$QMS_CONFIG_FILE"
TARGET_BRANCH="main"
DRY_RUN=false
FORCE=false
VERBOSE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -b|--branch)
            TARGET_BRANCH="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            log_error "Unknown option: $1"
            usage
            exit 1
            ;;
        *)
            if [[ -z "${REPOSITORY:-}" ]]; then
                REPOSITORY="$1"
            else
                log_error "Multiple repositories specified"
                usage
                exit 1
            fi
            shift
            ;;
    esac
done

# Validate required parameters
if [[ -z "${REPOSITORY:-}" ]]; then
    log_error "Repository not specified"
    usage
    exit 1
fi

if [[ ! "$REPOSITORY" =~ ^[^/]+/[^/]+$ ]]; then
    log_error "Repository must be in OWNER/REPO format"
    exit 1
fi

# Check dependencies
check_dependencies() {
    local missing_deps=()
    
    if ! command -v gh &> /dev/null; then
        missing_deps+=("gh (GitHub CLI)")
    fi
    
    if ! command -v yq &> /dev/null; then
        missing_deps+=("yq")
    fi
    
    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi
    
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log_error "Missing required dependencies:"
        for dep in "${missing_deps[@]}"; do
            log_error "  - $dep"
        done
        exit 1
    fi
}

# Validate GitHub authentication
check_github_auth() {
    if ! gh auth status &>/dev/null; then
        log_error "GitHub CLI not authenticated. Run 'gh auth login' first."
        exit 1
    fi
}

# Validate configuration file
validate_config() {
    if [[ ! -f "$CONFIG_FILE" ]]; then
        log_error "Configuration file not found: $CONFIG_FILE"
        exit 1
    fi
    
    # Basic YAML validation
    if ! yq eval '.' "$CONFIG_FILE" &>/dev/null; then
        log_error "Invalid YAML in configuration file: $CONFIG_FILE"
        exit 1
    fi
    
    # Check required fields
    local required_fields=(
        ".repository.tier"
        ".branch_protection.enabled"
        ".branch_protection.required_status_checks"
    )
    
    for field in "${required_fields[@]}"; do
        if [[ "$(yq eval "$field" "$CONFIG_FILE")" == "null" ]]; then
            log_error "Required field missing in config: $field"
            exit 1
        fi
    done
}

# Load configuration values
load_config() {
    log_info "Loading configuration from: $CONFIG_FILE"
    
    # Repository configuration
    REPO_TIER=$(yq eval '.repository.tier' "$CONFIG_FILE")
    REPO_CLASSIFICATION=$(yq eval '.repository.classification' "$CONFIG_FILE")
    
    # Branch protection configuration
    BP_ENABLED=$(yq eval '.branch_protection.enabled' "$CONFIG_FILE")
    BP_ENFORCE_ADMINS=$(yq eval '.branch_protection.enforce_admins' "$CONFIG_FILE")
    BP_ALLOW_FORCE_PUSHES=$(yq eval '.branch_protection.allow_force_pushes' "$CONFIG_FILE")
    BP_ALLOW_DELETIONS=$(yq eval '.branch_protection.allow_deletions' "$CONFIG_FILE")
    BP_REQUIRED_LINEAR_HISTORY=$(yq eval '.branch_protection.required_linear_history' "$CONFIG_FILE")
    
    # Status checks configuration
    SC_STRICT=$(yq eval '.branch_protection.required_status_checks.strict' "$CONFIG_FILE")
    SC_CONTEXTS=$(yq eval '.branch_protection.required_status_checks.contexts[]' "$CONFIG_FILE" | tr '\n' ' ')
    
    # Review requirements
    RR_REQUIRED_REVIEWERS=$(yq eval '.review_requirements.required_reviewers' "$CONFIG_FILE")
    RR_DISMISS_STALE=$(yq eval '.review_requirements.dismiss_stale_reviews' "$CONFIG_FILE")
    RR_REQUIRE_CODE_OWNERS=$(yq eval '.review_requirements.require_code_owner_reviews' "$CONFIG_FILE")
    RR_REQUIRED_APPROVING_COUNT=$(yq eval '.review_requirements.required_approving_review_count' "$CONFIG_FILE")
    
    # Restrictions
    REST_PUSH_RESTRICTIONS=$(yq eval '.restrictions.push_restrictions[]' "$CONFIG_FILE" 2>/dev/null | tr '\n' ' ' || echo "")
    REST_BYPASS_PULL_REQUEST=$(yq eval '.restrictions.bypass_pull_request_allowances[]' "$CONFIG_FILE" 2>/dev/null | tr '\n' ' ' || echo "")
    
    if [[ "$VERBOSE" == true ]]; then
        log_info "Configuration loaded:"
        log_info "  Repository Tier: $REPO_TIER"
        log_info "  Branch Protection Enabled: $BP_ENABLED"
        log_info "  Required Status Checks: $SC_CONTEXTS"
        log_info "  Required Reviewers: $RR_REQUIRED_REVIEWERS"
    fi
}

# Get current branch protection settings
get_current_protection() {
    log_info "Checking current branch protection for $REPOSITORY:$TARGET_BRANCH"
    
    local protection_data
    protection_data=$(gh api "repos/$REPOSITORY/branches/$TARGET_BRANCH/protection" 2>/dev/null || echo '{}')
    
    if [[ "$protection_data" == '{}' ]]; then
        log_info "No existing branch protection found"
        return 1
    else
        log_info "Existing branch protection found"
        if [[ "$VERBOSE" == true ]]; then
            echo "$protection_data" | jq '.'
        fi
        return 0
    fi
}

# Build branch protection configuration JSON
build_protection_config() {
    log_info "Building branch protection configuration"
    
    # Convert YAML arrays to JSON arrays
    local contexts_json
    contexts_json=$(echo "$SC_CONTEXTS" | tr ' ' '\n' | grep -v '^$' | jq -R . | jq -s .)
    
    local push_restrictions_json='[]'
    if [[ -n "$REST_PUSH_RESTRICTIONS" ]]; then
        push_restrictions_json=$(echo "$REST_PUSH_RESTRICTIONS" | tr ' ' '\n' | grep -v '^$' | jq -R . | jq -s .)
    fi
    
    local bypass_restrictions_json='[]'
    if [[ -n "$REST_BYPASS_PULL_REQUEST" ]]; then
        bypass_restrictions_json=$(echo "$REST_BYPASS_PULL_REQUEST" | tr ' ' '\n' | grep -v '^$' | jq -R . | jq -s .)
    fi
    
    # Build the complete configuration
    cat << EOF
{
  "required_status_checks": {
    "strict": $SC_STRICT,
    "contexts": $contexts_json
  },
  "enforce_admins": $BP_ENFORCE_ADMINS,
  "required_pull_request_reviews": {
    "required_approving_review_count": $RR_REQUIRED_APPROVING_COUNT,
    "dismiss_stale_reviews": $RR_DISMISS_STALE,
    "require_code_owner_reviews": $RR_REQUIRE_CODE_OWNERS,
    "bypass_pull_request_allowances": {
      "users": [],
      "teams": $bypass_restrictions_json
    }
  },
  "restrictions": {
    "users": [],
    "teams": $push_restrictions_json
  },
  "allow_force_pushes": $BP_ALLOW_FORCE_PUSHES,
  "allow_deletions": $BP_ALLOW_DELETIONS,
  "required_linear_history": $BP_REQUIRED_LINEAR_HISTORY
}
EOF
}

# Apply branch protection settings
apply_protection() {
    local config_json="$1"
    
    log_info "Applying branch protection to $REPOSITORY:$TARGET_BRANCH"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "DRY RUN - Branch protection configuration that would be applied:"
        echo "$config_json" | jq '.'
        return 0
    fi
    
    # Apply the protection
    local result
    if result=$(echo "$config_json" | gh api "repos/$REPOSITORY/branches/$TARGET_BRANCH/protection" --method PUT --input - 2>&1); then
        log_success "Branch protection applied successfully"
        if [[ "$VERBOSE" == true ]]; then
            echo "$result" | jq '.'
        fi
        return 0
    else
        log_error "Failed to apply branch protection:"
        log_error "$result"
        return 1
    fi
}

# Setup status check webhooks (if needed)
setup_status_check_webhooks() {
    log_info "Checking status check webhook configuration"
    
    # Check if repository has QMS webhook configured
    local webhooks
    webhooks=$(gh api "repos/$REPOSITORY/hooks" --jq '.[] | select(.config.url | contains("qms"))')
    
    if [[ -z "$webhooks" ]]; then
        log_warning "No QMS webhook found. Status checks may not work properly."
        log_info "Consider setting up QMS webhook for automated status checks"
    else
        log_success "QMS webhook is configured"
    fi
}

# Verify protection settings
verify_protection() {
    log_info "Verifying applied branch protection settings"
    
    local current_protection
    if current_protection=$(gh api "repos/$REPOSITORY/branches/$TARGET_BRANCH/protection" 2>/dev/null); then
        log_success "Branch protection is active"
        
        # Verify key settings
        local status_checks_count
        status_checks_count=$(echo "$current_protection" | jq '.required_status_checks.contexts | length')
        
        local required_reviews
        required_reviews=$(echo "$current_protection" | jq '.required_pull_request_reviews.required_approving_review_count')
        
        log_info "Protection summary:"
        log_info "  - Status checks required: $status_checks_count"
        log_info "  - Required approving reviews: $required_reviews"
        log_info "  - Enforce for administrators: $(echo "$current_protection" | jq '.enforce_admins.enabled')"
        
        if [[ "$VERBOSE" == true ]]; then
            echo "$current_protection" | jq '.'
        fi
        
        return 0
    else
        log_error "Failed to verify branch protection"
        return 1
    fi
}

# Create status check documentation
create_documentation() {
    local doc_file="${CONFIG_DIR}/branch-protection-setup.md"
    
    log_info "Creating documentation: $doc_file"
    
    cat << EOF > "$doc_file"
# QMS Branch Protection Setup Report

**Repository:** $REPOSITORY  
**Branch:** $TARGET_BRANCH  
**Tier:** $REPO_TIER  
**Setup Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Configuration File:** $CONFIG_FILE  

## Applied Settings

### Branch Protection
- **Enforce for administrators:** $BP_ENFORCE_ADMINS
- **Allow force pushes:** $BP_ALLOW_FORCE_PUSHES
- **Allow branch deletions:** $BP_ALLOW_DELETIONS
- **Require linear history:** $BP_REQUIRED_LINEAR_HISTORY

### Status Checks
- **Strict mode:** $SC_STRICT
- **Required contexts:**
$(echo "$SC_CONTEXTS" | tr ' ' '\n' | grep -v '^$' | sed 's/^/  - /')

### Pull Request Reviews
- **Required approving reviews:** $RR_REQUIRED_APPROVING_COUNT
- **Dismiss stale reviews:** $RR_DISMISS_STALE
- **Require code owner reviews:** $RR_REQUIRE_CODE_OWNERS

### Access Restrictions
$(if [[ -n "$REST_PUSH_RESTRICTIONS" ]]; then
    echo "- **Push restrictions:**"
    echo "$REST_PUSH_RESTRICTIONS" | tr ' ' '\n' | grep -v '^$' | sed 's/^/  - /'
else
    echo "- **Push restrictions:** None"
fi)

$(if [[ -n "$REST_BYPASS_PULL_REQUEST" ]]; then
    echo "- **Bypass allowances:**"
    echo "$REST_BYPASS_PULL_REQUEST" | tr ' ' '\n' | grep -v '^$' | sed 's/^/  - /'
else
    echo "- **Bypass allowances:** None"
fi)

## Next Steps

1. **Verify Status Checks**: Ensure all required status check services are properly configured
2. **Test Protection**: Create a test PR to verify all protection rules are working
3. **Team Training**: Ensure development team understands new protection requirements
4. **Monitor**: Review protection effectiveness and adjust as needed

## Troubleshooting

If status checks are not appearing:
1. Verify GitHub Actions workflows are properly configured
2. Check webhook configuration for external status check services
3. Ensure required contexts match exactly with actual check names

For emergency bypass procedures, refer to:
- QMS Emergency Bypass Documentation
- Repository-specific bypass contacts in \`.qms/contacts.yml\`

## Support

For issues with QMS branch protection:
- Review QMS documentation
- Check GitHub repository settings
- Contact QMS administrators for escalation
EOF

    log_success "Documentation created: $doc_file"
}

# Main execution function
main() {
    log_info "QMS Branch Protection Setup"
    log_info "Repository: $REPOSITORY"
    log_info "Target Branch: $TARGET_BRANCH"
    log_info "Configuration: $CONFIG_FILE"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_warning "DRY RUN MODE - No changes will be made"
    fi
    
    # Pre-flight checks
    check_dependencies
    check_github_auth
    validate_config
    
    # Load configuration
    load_config
    
    # Check if branch protection should be enabled
    if [[ "$BP_ENABLED" != "true" ]]; then
        log_warning "Branch protection is disabled in configuration"
        exit 0
    fi
    
    # Check current protection status
    local has_protection=false
    if get_current_protection; then
        has_protection=true
        if [[ "$FORCE" != true ]]; then
            log_warning "Branch protection already exists. Use --force to override."
            exit 0
        fi
    fi
    
    # Build and apply protection configuration
    local protection_config
    protection_config=$(build_protection_config)
    
    if [[ "$VERBOSE" == true ]]; then
        log_info "Protection configuration:"
        echo "$protection_config" | jq '.'
    fi
    
    # Apply the protection
    if apply_protection "$protection_config"; then
        # Additional setup tasks
        setup_status_check_webhooks
        
        # Verify the setup
        if verify_protection; then
            # Create documentation
            if [[ "$DRY_RUN" != true ]]; then
                create_documentation
            fi
            
            log_success "QMS branch protection setup completed successfully"
        else
            log_error "Branch protection setup completed but verification failed"
            exit 1
        fi
    else
        log_error "Failed to apply branch protection"
        exit 1
    fi
}

# Execute main function if script is run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi