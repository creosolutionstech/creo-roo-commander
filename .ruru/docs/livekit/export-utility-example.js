// LiveKit Configuration Export Utility
// This is a sample implementation to demonstrate the functionality

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const toml = require('toml');

/**
 * Main export function
 * @param {Object} options - Export options
 * @param {string} options.format - Output format (json, yaml, env, ts, js)
 * @param {string} options.domain - Optional domain filter (auth, room, track, etc.)
 * @param {string} options.environment - Environment name (development, staging, production)
 * @param {string} options.outputPath - Path to write the output file
 * @returns {Promise<Object>} The exported configuration
 */
async function exportLiveKitConfig(options) {
  const { format, domain, environment, outputPath } = options;
  
  // Step 1: Parse all mode files to extract configuration
  const config = await extractConfigFromModeFiles(domain);
  
  // Step 2: Apply environment-specific overrides
  const configWithEnv = applyEnvironmentOverrides(config, environment);
  
  // Step 3: Transform to requested format
  const formattedConfig = transformToFormat(configWithEnv, format);
  
  // Step 4: Validate the configuration
  const validationResult = validateConfig(formattedConfig);
  if (!validationResult.valid) {
    throw new Error(`Configuration validation failed: ${JSON.stringify(validationResult.errors)}`);
  }
  
  // Step 5: Write to output file
  await writeConfigToFile(formattedConfig, format, outputPath);
  
  // Return the config object
  return configWithEnv;
}

/**
 * Extract configuration from LiveKit mode files
 * @param {string} domainFilter - Optional domain to filter by
 * @returns {Promise<Object>} Extracted configuration
 */
async function extractConfigFromModeFiles(domainFilter) {
  const modesDir = '.ruru/modes';
  const livekitModes = [
    'livekit-auth',
    'livekit-room',
    'livekit-track',
    'livekit-recording',
    'livekit-egress',
    'livekit-webhook'
  ];
  
  // Filter modes by domain if specified
  const modesToProcess = domainFilter 
    ? livekitModes.filter(mode => mode === `livekit-${domainFilter}` || mode === 'livekit-coordinator')
    : livekitModes;
  
  let config = {
    livekit: {}
  };
  
  // Process each mode file
  for (const mode of modesToProcess) {
    const modePath = path.join(modesDir, mode, `${mode}.mode.md`);
    
    try {
      // Read the mode file
      const modeContent = fs.readFileSync(modePath, 'utf8');
      
      // Extract TOML frontmatter
      const tomlMatch = modeContent.match(/^\+\+\+([\s\S]*?)\+\+\+/);
      if (!tomlMatch) continue;
      
      // Parse TOML content
      const modeConfig = toml.parse(tomlMatch[1]);
      
      // Extract configuration from mode-specific sections
      if (mode === 'livekit-auth' && (!domainFilter || domainFilter === 'auth')) {
        config.livekit.api = extractAuthConfig(modeConfig);
      } else if (mode === 'livekit-room' && (!domainFilter || domainFilter === 'room')) {
        config.livekit.room = extractRoomConfig(modeConfig);
      } else if (mode === 'livekit-track' && (!domainFilter || domainFilter === 'track')) {
        config.livekit.track = extractTrackConfig(modeConfig);
      } else if (mode === 'livekit-recording' && (!domainFilter || domainFilter === 'recording')) {
        config.livekit.recording = extractRecordingConfig(modeConfig);
      } else if (mode === 'livekit-egress' && (!domainFilter || domainFilter === 'egress')) {
        config.livekit.egress = extractEgressConfig(modeConfig);
      } else if (mode === 'livekit-webhook' && (!domainFilter || domainFilter === 'webhook')) {
        config.livekit.webhook = extractWebhookConfig(modeConfig);
      }
    } catch (error) {
      console.warn(`Error processing ${mode} mode file:`, error.message);
    }
  }
  
  return config;
}

/**
 * Extract authentication configuration from mode config
 */
function extractAuthConfig(modeConfig) {
  // Here we would parse the auth mode's config section to extract API settings
  return {
    url: modeConfig.api?.url || "https://your-livekit-server.example.com",
    key: "${LIVEKIT_API_KEY}",
    secret: "${LIVEKIT_API_SECRET}"
  };
}

/**
 * Extract room configuration from mode config
 */
function extractRoomConfig(modeConfig) {
  return {
    defaultSettings: {
      maxParticipants: modeConfig.room?.maxParticipants || 50,
      emptyTimeout: modeConfig.room?.emptyTimeout || 300,
      participantPermissions: {
        canPublish: modeConfig.room?.permissions?.canPublish !== false,
        canSubscribe: modeConfig.room?.permissions?.canSubscribe !== false,
        canPublishData: modeConfig.room?.permissions?.canPublishData !== false,
        hidden: modeConfig.room?.permissions?.hidden || false
      }
    }
  };
}

/**
 * Extract track configuration from mode config
 */
function extractTrackConfig(modeConfig) {
  return {
    defaultSettings: {
      audio: {
        echoCancellation: modeConfig.track?.audio?.echoCancellation !== false,
        noiseSuppression: modeConfig.track?.audio?.noiseSuppression !== false,
        autoGainControl: modeConfig.track?.audio?.autoGainControl !== false
      },
      video: {
        width: modeConfig.track?.video?.width || 1280,
        height: modeConfig.track?.video?.height || 720,
        frameRate: modeConfig.track?.video?.frameRate || 30,
        facingMode: modeConfig.track?.video?.facingMode || "user"
      }
    }
  };
}

/**
 * Extract recording configuration from mode config
 */
function extractRecordingConfig(modeConfig) {
  return {
    enabled: modeConfig.recording?.enabled !== false,
    storage: {
      type: modeConfig.recording?.storage?.type || "s3",
      bucket: modeConfig.recording?.storage?.bucket || "recordings-bucket",
      region: modeConfig.recording?.storage?.region || "us-west-2"
    }
  };
}

/**
 * Extract egress configuration from mode config
 */
function extractEgressConfig(modeConfig) {
  return {
    enabled: modeConfig.egress?.enabled || false
  };
}

/**
 * Extract webhook configuration from mode config
 */
function extractWebhookConfig(modeConfig) {
  return {
    endpoints: modeConfig.webhook?.endpoints || [
      {
        url: "https://your-webhook-handler.example.com/livekit-events",
        events: ["room.created", "room.deleted", "participant.joined", "participant.left"]
      }
    ],
    signingKey: "${WEBHOOK_SIGNING_KEY}"
  };
}

/**
 * Apply environment-specific overrides to the configuration
 */
function applyEnvironmentOverrides(config, environment) {
  if (!environment) return config;
  
  try {
    const envConfigPath = `.ruru/config/livekit.${environment}.json`;
    if (fs.existsSync(envConfigPath)) {
      const envConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));
      
      // Deep merge the environment config with the base config
      return deepMerge(config, envConfig);
    }
  } catch (error) {
    console.warn(`Error loading environment overrides for ${environment}:`, error.message);
  }
  
  return config;
}

/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Check if value is an object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Transform configuration to the requested format
 */
function transformToFormat(config, format) {
  switch (format.toLowerCase()) {
    case 'json':
      return config;
    case 'yaml':
    case 'yml':
      return yaml.dump(config);
    case 'env':
      return transformToEnvVars(config);
    case 'ts':
      return transformToTypeScript(config);
    case 'js':
      return `module.exports = ${JSON.stringify(config, null, 2)};`;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

/**
 * Transform configuration to environment variables format
 */
function transformToEnvVars(config) {
  const vars = [];
  
  function processObject(obj, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}_${key.toUpperCase()}` : key.toUpperCase();
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processObject(value, newKey);
      } else if (Array.isArray(value)) {
        // For arrays, create indexed env vars
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            processObject(item, `${newKey}_${index}`);
          } else {
            vars.push(`${newKey}_${index}=${item}`);
          }
        });
      } else {
        vars.push(`${newKey}=${value}`);
      }
    });
  }
  
  processObject(config.livekit, 'LIVEKIT');
  return vars.join('\n');
}

/**
 * Transform configuration to TypeScript interface and instance
 */
function transformToTypeScript(config) {
  // Generate TypeScript interface
  const interfaceContent = generateTypeScriptInterface(config.livekit);
  
  // Generate config instance
  const configContent = `export const config: LiveKitConfig = ${JSON.stringify(config.livekit, null, 2)};`;
  
  return `${interfaceContent}\n\n${configContent}`;
}

/**
 * Generate TypeScript interface from configuration object
 */
function generateTypeScriptInterface(obj, interfaceName = 'LiveKitConfig') {
  let interfaceContent = `export interface ${interfaceName} {\n`;
  
  function processProperty(value, indent = '  ') {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const props = Object.entries(value).map(([k, v]) => {
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
          return `${k}: {\n${processProperty(v, indent + '  ')}\n${indent}}`;
        } else if (Array.isArray(v)) {
          if (v.length > 0 && typeof v[0] === 'object') {
            return `${k}: Array<{\n${processProperty(v[0], indent + '  ')}\n${indent}}>`;
          } else {
            return `${k}: ${typeof v[0] === 'string' ? 'string[]' : 'any[]'}`;
          }
        } else {
          return `${k}: ${typeof v}`;
        }
      });
      
      return props.join(`;\n${indent}`);
    } else if (Array.isArray(value)) {
      // Handle array types
      return 'any[]';
    } else {
      return typeof value;
    }
  }
  
  interfaceContent += processProperty(obj);
  interfaceContent += ';\n}';
  
  return interfaceContent;
}

/**
 * Validate the configuration against schema
 */
function validateConfig(config) {
  // This would use a JSON schema validator in a real implementation
  return { valid: true };
}

/**
 * Write configuration to file
 */
async function writeConfigToFile(config, format, outputPath) {
  try {
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Determine content based on format
    let content;
    if (typeof config === 'string') {
      content = config;
    } else if (format === 'json') {
      content = JSON.stringify(config, null, 2);
    } else {
      content = config;
    }
    
    // Write to file
    fs.writeFileSync(outputPath, content);
    console.log(`Configuration exported to ${outputPath}`);
    
    return true;
  } catch (error) {
    console.error('Error writing configuration file:', error);
    throw error;
  }
}

// Export the main function
module.exports = {
  exportLiveKitConfig
};

// Example usage
if (require.main === module) {
  exportLiveKitConfig({
    format: 'json',
    environment: 'production',
    outputPath: './livekit-config.json'
  }).then(() => {
    console.log('Export completed successfully');
  }).catch(err => {
    console.error('Export failed:', err);
  });
}