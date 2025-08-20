#!/bin/bash

# QMS Environment Setup Script
# This script initializes the QMS environment for local development and testing
# Compatible with macOS and Linux environments

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
QMS_VERSION="${QMS_VERSION:-latest}"
QMS_CONFIG_DIR="${QMS_CONFIG_DIR:-$HOME/.qms}"
QMS_DASHBOARD_PORT="${QMS_DASHBOARD_PORT:-8080}"
QMS_API_PORT="${QMS_API_PORT:-3000}"

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        "INFO")
            echo -e "${GREEN}[INFO]${NC} ${timestamp} - $message"
            ;;
        "WARN")
            echo -e "${YELLOW}[WARN]${NC} ${timestamp} - $message"
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} ${timestamp} - $message"
            ;;
        "DEBUG")
            if [[ "${QMS_DEBUG:-}" == "true" ]]; then
                echo -e "${BLUE}[DEBUG]${NC} ${timestamp} - $message"
            fi
            ;;
    esac
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
check_requirements() {
    log "INFO" "Checking system requirements..."
    
    local missing_deps=()
    
    # Check for required commands
    if ! command_exists "node"; then
        missing_deps+=("node (Node.js)")
    fi
    
    if ! command_exists "npm"; then
        missing_deps+=("npm")
    fi
    
    if ! command_exists "python3"; then
        missing_deps+=("python3")
    fi
    
    if ! command_exists "pip3"; then
        missing_deps+=("pip3")
    fi
    
    if ! command_exists "docker"; then
        log "WARN" "Docker not found - some features may be limited"
    fi
    
    if ! command_exists "git"; then
        missing_deps+=("git")
    fi
    
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log "ERROR" "Missing required dependencies:"
        for dep in "${missing_deps[@]}"; do
            echo "  - $dep"
        done
        log "ERROR" "Please install missing dependencies and run this script again"
        exit 1
    fi
    
    log "INFO" "✓ All required dependencies found"
}

# Create QMS configuration directory
setup_config_dir() {
    log "INFO" "Setting up QMS configuration directory..."
    
    if [[ ! -d "$QMS_CONFIG_DIR" ]]; then
        mkdir -p "$QMS_CONFIG_DIR"
        log "INFO" "✓ Created QMS config directory: $QMS_CONFIG_DIR"
    else
        log "INFO" "✓ QMS config directory already exists: $QMS_CONFIG_DIR"
    fi
    
    # Create subdirectories
    for subdir in "config" "logs" "data" "reports" "cache"; do
        if [[ ! -d "$QMS_CONFIG_DIR/$subdir" ]]; then
            mkdir -p "$QMS_CONFIG_DIR/$subdir"
            log "INFO" "✓ Created subdirectory: $QMS_CONFIG_DIR/$subdir"
        fi
    done
}

# Install Node.js dependencies
install_node_deps() {
    log "INFO" "Installing Node.js dependencies..."
    
    local package_json="$QMS_CONFIG_DIR/package.json"
    
    if [[ ! -f "$package_json" ]]; then
        cat > "$package_json" << 'EOF'
{
  "name": "qms-local-environment",
  "version": "1.0.0",
  "description": "QMS Local Development Environment",
  "dependencies": {
    "@octokit/rest": "^19.0.0",
    "axios": "^1.6.0",
    "chalk": "^4.1.2",
    "commander": "^9.0.0",
    "inquirer": "^8.2.5",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "winston": "^3.8.2",
    "yaml": "^2.3.4"
  },
  "devDependencies": {
    "@types/node": "^18.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0",
    "typescript": "^4.9.0"
  }
}
EOF
        log "INFO" "✓ Created package.json"
    fi
    
    cd "$QMS_CONFIG_DIR"
    npm install --silent
    log "INFO" "✓ Node.js dependencies installed"
}

# Install Python dependencies
install_python_deps() {
    log "INFO" "Installing Python dependencies..."
    
    local requirements_txt="$QMS_CONFIG_DIR/requirements.txt"
    
    if [[ ! -f "$requirements_txt" ]]; then
        cat > "$requirements_txt" << 'EOF'
# QMS Python Dependencies
requests>=2.28.0
pyyaml>=6.0
jinja2>=3.1.0
click>=8.1.0
matplotlib>=3.6.0
seaborn>=0.12.0
pandas>=1.5.0
numpy>=1.24.0
plotly>=5.17.0
kaleido>=0.2.1
reportlab>=3.6.0
openpyxl>=3.1.0
python-dotenv>=1.0.0
colorama>=0.4.6
tabulate>=0.9.0
EOF
        log "INFO" "✓ Created requirements.txt"
    fi
    
    # Create virtual environment if it doesn't exist
    if [[ ! -d "$QMS_CONFIG_DIR/venv" ]]; then
        python3 -m venv "$QMS_CONFIG_DIR/venv"
        log "INFO" "✓ Created Python virtual environment"
    fi
    
    # Activate virtual environment and install dependencies
    source "$QMS_CONFIG_DIR/venv/bin/activate"
    pip install --upgrade pip --quiet
    pip install -r "$requirements_txt" --quiet
    log "INFO" "✓ Python dependencies installed"
}

# Create QMS configuration files
create_config_files() {
    log "INFO" "Creating QMS configuration files..."
    
    local config_file="$QMS_CONFIG_DIR/config/qms-config.yaml"
    
    if [[ ! -f "$config_file" ]]; then
        cat > "$config_file" << EOF
# QMS Configuration
qms:
  version: "${QMS_VERSION}"
  environment: "local"
  debug: false
  
dashboard:
  enabled: true
  port: ${QMS_DASHBOARD_PORT}
  host: "localhost"
  auth:
    enabled: false
    
api:
  enabled: true
  port: ${QMS_API_PORT}
  host: "localhost"
  rate_limit: 1000
  
database:
  type: "sqlite"
  path: "${QMS_CONFIG_DIR}/data/qms.db"
  
logging:
  level: "info"
  file: "${QMS_CONFIG_DIR}/logs/qms.log"
  max_size: "10MB"
  max_files: 5
  
quality_gates:
  default_thresholds:
    code_coverage: 80
    security_issues: 0
    code_quality: 8.0
    performance_score: 90
    
integrations:
  github:
    enabled: true
    token: ""  # Set via QMS_GITHUB_TOKEN environment variable
    
  slack:
    enabled: false
    webhook_url: ""  # Set via QMS_SLACK_WEBHOOK environment variable
    
  email:
    enabled: false
    smtp_server: ""
    smtp_port: 587
    username: ""
    password: ""  # Set via QMS_EMAIL_PASSWORD environment variable
    
notifications:
  channels:
    - console
  suppress_success: false
  
reporting:
  output_dir: "${QMS_CONFIG_DIR}/reports"
  formats:
    - html
    - json
  retention_days: 30
  
monitoring:
  health_check_interval: 30
  metrics_collection: true
  alert_thresholds:
    response_time: 5000
    error_rate: 0.05
EOF
        log "INFO" "✓ Created QMS configuration file"
    fi
    
    # Create environment file
    local env_file="$QMS_CONFIG_DIR/.env"
    if [[ ! -f "$env_file" ]]; then
        cat > "$env_file" << EOF
# QMS Environment Variables
QMS_CONFIG_FILE=${config_file}
QMS_DATA_DIR=${QMS_CONFIG_DIR}/data
QMS_LOG_DIR=${QMS_CONFIG_DIR}/logs
QMS_REPORT_DIR=${QMS_CONFIG_DIR}/reports

# GitHub Integration (optional)
# QMS_GITHUB_TOKEN=your_github_token_here

# Slack Integration (optional)
# QMS_SLACK_WEBHOOK=your_slack_webhook_here

# Email Integration (optional)
# QMS_EMAIL_PASSWORD=your_email_password_here

# Debug mode
# QMS_DEBUG=true
EOF
        log "INFO" "✓ Created environment file"
    fi
}

# Create helper scripts
create_helper_scripts() {
    log "INFO" "Creating helper scripts..."
    
    # QMS CLI script
    local qms_cli="$QMS_CONFIG_DIR/bin/qms"
    mkdir -p "$QMS_CONFIG_DIR/bin"
    
    cat > "$qms_cli" << 'EOF'
#!/bin/bash
# QMS Command Line Interface

QMS_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
source "$QMS_DIR/.env"
source "$QMS_DIR/venv/bin/activate"

case "$1" in
    "start")
        echo "Starting QMS services..."
        # Add QMS service start logic here
        ;;
    "stop")
        echo "Stopping QMS services..."
        # Add QMS service stop logic here
        ;;
    "status")
        echo "Checking QMS status..."
        # Add QMS status check logic here
        ;;
    "validate")
        echo "Running QMS validation..."
        python3 "$QMS_DIR/../../../scripts/qms-integration/utilities/qms-validator.py" "$@"
        ;;
    "report")
        echo "Generating QMS report..."
        python3 "$QMS_DIR/../../../scripts/qms-integration/reporting/qms-reporter.py" "$@"
        ;;
    *)
        echo "QMS CLI Tool"
        echo "Usage: $0 {start|stop|status|validate|report}"
        echo ""
        echo "Commands:"
        echo "  start      Start QMS services"
        echo "  stop       Stop QMS services"
        echo "  status     Check QMS status"
        echo "  validate   Run QMS validation"
        echo "  report     Generate QMS report"
        exit 1
        ;;
esac
EOF
    
    chmod +x "$qms_cli"
    log "INFO" "✓ Created QMS CLI script"
    
    # Create symlink if not exists
    local symlink_target="/usr/local/bin/qms"
    if [[ ! -L "$symlink_target" && -w "/usr/local/bin" ]]; then
        ln -sf "$qms_cli" "$symlink_target"
        log "INFO" "✓ Created symlink: $symlink_target"
    fi
}

# Validate installation
validate_installation() {
    log "INFO" "Validating QMS installation..."
    
    # Check configuration files
    if [[ ! -f "$QMS_CONFIG_DIR/config/qms-config.yaml" ]]; then
        log "ERROR" "QMS configuration file not found"
        exit 1
    fi
    
    # Check Python environment
    if ! source "$QMS_CONFIG_DIR/venv/bin/activate" 2>/dev/null; then
        log "ERROR" "Python virtual environment activation failed"
        exit 1
    fi
    
    # Test Python dependencies
    if ! python3 -c "import requests, yaml, jinja2" 2>/dev/null; then
        log "ERROR" "Python dependencies validation failed"
        exit 1
    fi
    
    # Check Node.js dependencies
    if [[ ! -d "$QMS_CONFIG_DIR/node_modules" ]]; then
        log "ERROR" "Node.js dependencies not installed"
        exit 1
    fi
    
    log "INFO" "✓ QMS installation validation passed"
}

# Print setup summary
print_summary() {
    echo ""
    echo -e "${GREEN}=================================${NC}"
    echo -e "${GREEN}QMS Environment Setup Complete!${NC}"
    echo -e "${GREEN}=================================${NC}"
    echo ""
    echo "Configuration directory: $QMS_CONFIG_DIR"
    echo "QMS CLI tool: $QMS_CONFIG_DIR/bin/qms"
    echo ""
    echo "Next steps:"
    echo "1. Review configuration: $QMS_CONFIG_DIR/config/qms-config.yaml"
    echo "2. Set environment variables: $QMS_CONFIG_DIR/.env"
    echo "3. Start QMS services: qms start"
    echo ""
    echo "For more information, visit: https://github.com/your-org/qms-docs"
    echo ""
}

# Main function
main() {
    echo -e "${BLUE}QMS Environment Setup${NC}"
    echo -e "${BLUE}=====================${NC}"
    echo ""
    
    check_requirements
    setup_config_dir
    install_node_deps
    install_python_deps
    create_config_files
    create_helper_scripts
    validate_installation
    print_summary
    
    log "INFO" "QMS environment setup completed successfully!"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi