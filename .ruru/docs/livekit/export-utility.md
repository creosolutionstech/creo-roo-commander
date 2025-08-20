# LiveKit Configuration Export Utility

This document describes the utility for exporting LiveKit mode configurations to deployable formats, allowing users to extract and use configuration settings in various environments.

## 1. Overview

The LiveKit Mode Ecosystem stores configuration in structured TOML+Markdown files. However, when deploying LiveKit implementations, these configurations need to be exported to standard formats like JSON, YAML, or environment variables. This utility facilitates this conversion process.

## 2. Export Formats

The utility supports exporting to the following formats:

| Format | File Extension | Use Case |
|--------|----------------|----------|
| JSON | `.json` | Client-side configuration, serverless functions |
| YAML | `.yaml`, `.yml` | Kubernetes deployments, Docker Compose |
| Environment Variables | `.env` | Server deployments, CI/CD pipelines |
| TypeScript Interfaces | `.ts` | Type-safe client applications |
| JavaScript Config | `.js` | Node.js applications |

## 3. Configuration Schema

The exported configuration schema includes:

```json
{
  "livekit": {
    "api": {
      "url": "https://your-livekit-server.example.com",
      "key": "API_KEY",
      "secret": "API_SECRET"
    },
    "room": {
      "defaultSettings": {
        "maxParticipants": 50,
        "emptyTimeout": 300,
        "participantPermissions": {
          "canPublish": true,
          "canSubscribe": true,
          "canPublishData": true,
          "hidden": false
        }
      }
    },
    "track": {
      "defaultSettings": {
        "audio": {
          "echoCancellation": true,
          "noiseSuppression": true,
          "autoGainControl": true
        },
        "video": {
          "width": 1280,
          "height": 720,
          "frameRate": 30,
          "facingMode": "user"
        }
      }
    },
    "recording": {
      "enabled": true,
      "storage": {
        "type": "s3",
        "bucket": "recordings-bucket",
        "region": "us-west-2"
      }
    },
    "egress": {
      "enabled": false
    },
    "webhook": {
      "endpoints": [
        {
          "url": "https://your-webhook-handler.example.com/livekit-events",
          "events": ["room.created", "room.deleted", "participant.joined", "participant.left"]
        }
      ],
      "signingKey": "WEBHOOK_SIGNING_KEY"
    }
  }
}
```

## 4. Export Utility Usage

### 4.1 Command-Line Interface

The utility can be invoked via the command line:

```bash
# Export all configurations to JSON
npx livekit-export --format json --output ./config/livekit-config.json

# Export only auth configurations
npx livekit-export --domain auth --format env --output ./.env.livekit

# Export with environment-specific overrides
npx livekit-export --env production --format yaml --output ./k8s/livekit-config.yaml
```

### 4.2 Programmatic Usage

The utility can also be used programmatically:

```typescript
import { exportLiveKitConfig } from '@livekit/config-export';

// Export all configurations
const config = await exportLiveKitConfig({
  format: 'json',
  outputPath: './config/livekit-config.json'
});

// Export specific domain with environment override
const authConfig = await exportLiveKitConfig({
  domain: 'auth',
  format: 'env',
  environment: 'staging',
  outputPath: './.env.livekit'
});
```

## 5. Configuration Source Resolution

The utility uses the following resolution order to locate configuration values:

1. Environment-specific overrides (`config.[environment].json`)
2. User-provided overrides (via CLI or API)
3. Mode file default values (extracted from `.mode.md` files)
4. LiveKit standard defaults

## 6. Security Considerations

### 6.1 Sensitive Information Handling

The utility provides several options for handling sensitive information:

- **Environment Variable References**: Replaces actual values with environment variable references
  ```json
  {
    "api": {
      "key": "${LIVEKIT_API_KEY}",
      "secret": "${LIVEKIT_API_SECRET}"
    }
  }
  ```

- **Secret Masking**: Replaces sensitive values with placeholder text
  ```json
  {
    "api": {
      "key": "[API_KEY_MASKED]",
      "secret": "[API_SECRET_MASKED]"
    }
  }
  ```

- **Vault Integration**: Supports HashiCorp Vault for secure storage and retrieval

### 6.2 Secure Storage Recommendations

1. **Never commit secrets to version control**
2. **Use environment variables or secret management solutions in production**
3. **Implement proper access controls for configuration files**
4. **Rotate API keys and secrets regularly**

## 7. Integration with Build Tools

The export utility integrates with common build tools:

### 7.1 Webpack

```javascript
// webpack.config.js
const { LiveKitConfigPlugin } = require('@livekit/config-export/webpack');

module.exports = {
  // ...
  plugins: [
    new LiveKitConfigPlugin({
      format: 'js',
      environment: process.env.NODE_ENV,
      outputPath: './src/livekit-config.js'
    })
  ]
};
```

### 7.2 Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { liveKitConfig } from '@livekit/config-export/vite';

export default defineConfig({
  // ...
  plugins: [
    liveKitConfig({
      format: 'ts',
      environment: process.env.NODE_ENV,
      outputPath: './src/types/livekit-config.ts'
    })
  ]
});
```

## 8. Environment-Specific Configuration

The utility supports different environments (development, staging, production) through:

1. **Environment-specific files**:
   - `livekit.dev.json`
   - `livekit.staging.json`
   - `livekit.prod.json`

2. **Configuration merging**:
   - Base configuration is loaded first
   - Environment-specific overrides are applied
   - User-provided overrides take highest precedence

## 9. Configuration Validation

The utility validates configurations against JSON schemas:

```javascript
// Schema validation in action
const { validate } = require('@livekit/config-export/validation');

const validationResult = validate(config);
if (!validationResult.valid) {
  console.error('Configuration validation errors:', validationResult.errors);
  process.exit(1);
}
```

## 10. Examples

### 10.1 Basic JSON Export

```json
// livekit-config.json
{
  "livekit": {
    "api": {
      "url": "https://livekit.example.com",
      "key": "${LIVEKIT_API_KEY}",
      "secret": "${LIVEKIT_API_SECRET}"
    },
    "room": {
      "defaultSettings": {
        "maxParticipants": 50,
        "emptyTimeout": 300
      }
    }
  }
}
```

### 10.2 Environment Variables Export

```
# .env.livekit
LIVEKIT_API_URL=https://livekit.example.com
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
LIVEKIT_ROOM_MAX_PARTICIPANTS=50
LIVEKIT_ROOM_EMPTY_TIMEOUT=300
LIVEKIT_RECORDING_ENABLED=true
LIVEKIT_RECORDING_STORAGE_TYPE=s3
LIVEKIT_RECORDING_STORAGE_BUCKET=recordings-bucket
```

### 10.3 TypeScript Interface Export

```typescript
// livekit-config.ts
export interface LiveKitConfig {
  api: {
    url: string;
    key: string;
    secret: string;
  };
  room: {
    defaultSettings: {
      maxParticipants: number;
      emptyTimeout: number;
      participantPermissions: {
        canPublish: boolean;
        canSubscribe: boolean;
        canPublishData: boolean;
        hidden: boolean;
      };
    };
  };
  track: {
    defaultSettings: {
      audio: {
        echoCancellation: boolean;
        noiseSuppression: boolean;
        autoGainControl: boolean;
      };
      video: {
        width: number;
        height: number;
        frameRate: number;
        facingMode: string;
      };
    };
  };
  recording: {
    enabled: boolean;
    storage: {
      type: string;
      bucket: string;
      region: string;
    };
  };
  egress: {
    enabled: boolean;
  };
  webhook: {
    endpoints: Array<{
      url: string;
      events: string[];
    }>;
    signingKey: string;
  };
}

export const config: LiveKitConfig = {
  // Configuration values here
};
```

## 11. Implementation Notes

The export utility:

1. **Parses TOML+Markdown files** to extract configuration values
2. **Transforms** the configuration into the requested format
3. **Validates** the output against schema definitions
4. **Writes** the result to the specified location
5. **Logs** the export operation details

The implementation follows a modular approach to allow for extension with additional export formats or validation rules.