+++
id = "LIVEKIT-USAGE-GUIDE-V1"
title = "LiveKit AI Agent Framework - Usage and Integration Guide"
context_type = "documentation"
scope = "Comprehensive user guide for working with LiveKit AI Agent modes"
target_audience = ["developers", "architects", "project-managers"]
granularity = "detailed"
status = "active"
last_updated = "2025-08-21"
tags = ["livekit", "real-time", "agents", "documentation", "guide", "integration"]
related_context = [
    ".ruru/modes/livekit-coordinator/livekit-coordinator.mode.md",
    ".ruru/modes/livekit-auth/livekit-auth.mode.md",
    ".ruru/modes/livekit-room/livekit-room.mode.md",
    ".ruru/modes/livekit-track/livekit-track.mode.md",
    ".ruru/modes/livekit-recording/livekit-recording.mode.md",
    ".ruru/modes/livekit-egress/livekit-egress.mode.md",
    ".ruru/modes/livekit-webhook/livekit-webhook.mode.md",
    ".ruru/docs/livekit/interaction-patterns.md",
    ".ruru/docs/livekit/export-utility.md",
    ".ruru/docs/livekit/export-utility-example.js"
]
+++

# LiveKit AI Agent Framework: Usage & Integration Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Initial Setup](#initial-setup)
   - [Configuration Basics](#configuration-basics)
4. [Working with LiveKit Modes](#working-with-livekit-modes)
   - [LiveKit Coordinator](#livekit-coordinator)
   - [LiveKit Auth](#livekit-auth)
   - [LiveKit Room](#livekit-room)
   - [LiveKit Track](#livekit-track)
   - [LiveKit Recording](#livekit-recording)
   - [LiveKit Egress](#livekit-egress)
   - [LiveKit Webhook](#livekit-webhook)
5. [Integration Patterns](#integration-patterns)
   - [Working with Frontend Applications](#working-with-frontend-applications)
   - [Integration with Backend Services](#integration-with-backend-services)
   - [Cross-Mode Communication](#cross-mode-communication)
6. [Configuration Export](#configuration-export)
   - [Available Export Formats](#available-export-formats)
   - [Using the Export Utility](#using-the-export-utility)
   - [Environment-Specific Configurations](#environment-specific-configurations)
7. [Common Use Cases](#common-use-cases)
   - [Video Conferencing](#video-conferencing)
   - [Webinars and Live Streaming](#webinars-and-live-streaming)
   - [Virtual Classrooms](#virtual-classrooms)
   - [Custom Media Applications](#custom-media-applications)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)
10. [Appendix](#appendix)
    - [Quality Gates](#quality-gates)
    - [Security Considerations](#security-considerations)
    - [Performance Optimization](#performance-optimization)

## Introduction

The LiveKit AI Agent Framework is a specialized multi-agent system built on top of the Roo Commander architecture, designed to streamline the development and management of real-time communication applications using the LiveKit platform. This framework provides a structured approach to working with LiveKit's rich feature set, breaking down functionality into specialized agent modes that handle different aspects of the platform.

This guide will help you understand how to leverage the framework's capabilities to build robust real-time applications with features like audio/video communication, room management, recording, content export, and event handling.

## Architecture Overview

The LiveKit AI Agent Framework follows a hub-and-spoke architecture with seven specialized modes:

1. **LiveKit Coordinator (Hub)**: The central orchestrator that routes requests to specialist modes
2. **LiveKit Auth (Spoke)**: Handles authentication, token generation, and permission management
3. **LiveKit Room (Spoke)**: Manages room creation, configuration, and participant operations
4. **LiveKit Track (Spoke)**: Handles media track operations (audio, video, data)
5. **LiveKit Recording (Spoke)**: Manages recording sessions and transcription
6. **LiveKit Egress (Spoke)**: Handles content export and delivery
7. **LiveKit Webhook (Spoke)**: Manages event subscriptions and webhook integrations

Each mode contains domain-specific knowledge, capabilities, and built-in quality gates to ensure implementations meet requirements, architectural standards, and security best practices.

![LiveKit AI Agent Architecture](../diagrams/livekit-agent-architecture.png)

## Getting Started

### Prerequisites

Before using the LiveKit AI Agent Framework, ensure you have:

- A LiveKit server instance (self-hosted or managed service)
- API keys and secrets for your LiveKit instance
- Node.js (v16+) for running the export utility
- Familiarity with Roo Commander's task delegation system

### Initial Setup

1. **Access the LiveKit Coordinator Mode**:
   Start by switching to the LiveKit Coordinator mode, which serves as the entry point to the framework:

   ```
   /switch_mode livekit-coordinator
   ```

2. **Verify Configuration**:
   The coordinator will help you verify your LiveKit configuration:

   ```
   Please verify my LiveKit configuration
   ```

3. **Set Up API Credentials**:
   Configure your LiveKit API keys and secrets:

   ```
   Configure LiveKit API credentials
   ```

### Configuration Basics

Each LiveKit mode is configured through a TOML+Markdown file structure. The configuration parameters are stored in the TOML frontmatter of each mode file.

Key configuration areas include:

- API endpoints and credentials (in `livekit-auth.mode.md`)
- Default room settings (in `livekit-room.mode.md`)
- Media quality presets (in `livekit-track.mode.md`)
- Recording storage options (in `livekit-recording.mode.md`)
- Egress destinations (in `livekit-egress.mode.md`)
- Webhook endpoints (in `livekit-webhook.mode.md`)

## Working with LiveKit Modes

### LiveKit Coordinator

The LiveKit Coordinator is your main interface to the framework. It analyzes your requests and routes them to the appropriate specialist mode.

**Example interactions**:

```
Generate a JWT token for user "alice" with permissions to publish and subscribe
```

The coordinator will route this to the LiveKit Auth mode.

```
Create a new room called "team-meeting" with 10 participant limit
```

The coordinator will route this to the LiveKit Room mode.

### LiveKit Auth

The Auth mode handles authentication and permission management, including JWT token generation with VideoGrant permissions.

**Key capabilities**:
- Generate JWT tokens with customized permissions
- Manage API keys and secrets
- Create temporary access tokens
- Define role-based permission presets

**Example request**:
```
Generate a participant token for user "bob@example.com" with display name "Bob Smith" for room "team-meeting" with permissions to publish audio and video, subscribe to all tracks, and share screen
```

### LiveKit Room

The Room mode manages the full lifecycle of LiveKit rooms, including creation, configuration, and participant management.

**Key capabilities**:
- Create and configure rooms with custom settings
- Manage room metadata
- Control participant access
- Configure room recording settings
- Handle room layouts and displays

**Example request**:
```
Create a new room named "investor-presentation" with max capacity of 100, enabled recording, and disabled screen sharing for participants
```

### LiveKit Track

The Track mode handles media operations, including audio, video, and data track management.

**Key capabilities**:
- Configure audio processing settings (echo cancellation, noise suppression)
- Manage video quality presets
- Handle track subscriptions and publishing
- Configure simulcast settings
- Manage data channels

**Example request**:
```
Define a high-quality video preset with 1080p resolution, 30fps, and high bitrate for presenter tracks
```

### LiveKit Recording

The Recording mode manages session recording, transcription, and storage.

**Key capabilities**:
- Start/stop recording sessions
- Configure recording formats
- Manage transcription settings
- Handle recording storage
- Process and analyze recordings

**Example request**:
```
Start composite recording for room "team-meeting" with speaker-highlighted layout and audio transcription enabled
```

### LiveKit Egress

The Egress mode handles content export, including live streaming and file exports.

**Key capabilities**:
- Configure RTMP streaming endpoints
- Manage file exports (MP4, MP3)
- Handle cloud storage integration
- Process and transform media outputs
- Manage export notifications

**Example request**:
```
Set up RTMP streaming from room "webinar-main" to YouTube with stream key "xxxx-yyyy-zzzz"
```

### LiveKit Webhook

The Webhook mode manages event subscriptions and third-party integrations.

**Key capabilities**:
- Configure webhook endpoints
- Define event subscriptions
- Validate webhook payloads
- Handle event retries and error scenarios
- Test webhook deliveries

**Example request**:
```
Subscribe to participant.joined and participant.left events with delivery to https://example.com/webhooks/livekit
```

## Integration Patterns

### Working with Frontend Applications

The LiveKit AI Agent Framework can generate configuration and code snippets for frontend integration.

**React Integration Example**:
```javascript
// Generated with: Generate React component for basic video call room
import { useRoom, useParticipant, VideoTrack, AudioTrack } from 'livekit-react';

function VideoConferenceRoom({ roomName, token }) {
  const { room, participants } = useRoom({
    adaptiveStream: true,
    dynacast: true,
  });
  
  useEffect(() => {
    room.connect('wss://livekit.example.com', token);
    return () => room.disconnect();
  }, [room, token]);
  
  return (
    <div className="video-grid">
      {participants.map(participant => (
        <ParticipantView key={participant.sid} participant={participant} />
      ))}
    </div>
  );
}

function ParticipantView({ participant }) {
  const { cameraPublication, microphonePublication } = useParticipant(participant);
  
  return (
    <div className="participant-tile">
      <div className="video-container">
        {cameraPublication?.track && (
          <VideoTrack track={cameraPublication.track} />
        )}
      </div>
      {microphonePublication?.track && (
        <AudioTrack track={microphonePublication.track} />
      )}
      <div className="participant-info">{participant.identity}</div>
    </div>
  );
}
```

### Integration with Backend Services

For backend services, the framework can generate server-side code for LiveKit integration.

**Node.js Server Integration Example**:
```javascript
// Generated with: Create Express server for LiveKit token generation
const express = require('express');
const { AccessToken, RoomServiceClient, VideoGrant } = require('livekit-server-sdk');

const app = express();
app.use(express.json());

// LiveKit server configuration (from framework export)
const livekitHost = 'wss://livekit.example.com';
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

// Room service for server-side operations
const roomService = new RoomServiceClient(
  livekitHost,
  apiKey,
  apiSecret
);

// Token generation endpoint
app.post('/token', (req, res) => {
  const { roomName, participantName, permissions } = req.body;
  
  // Create token with specified permissions
  const grant = new VideoGrant({
    roomJoin: true,
    room: roomName,
    canPublish: permissions?.canPublish ?? true,
    canSubscribe: permissions?.canSubscribe ?? true,
    canPublishData: permissions?.canPublishData ?? true,
  });
  
  const token = new AccessToken(apiKey, apiSecret);
  token.identity = participantName;
  token.addGrant(grant);
  
  res.json({ token: token.toJwt() });
});

// Room creation endpoint
app.post('/rooms', async (req, res) => {
  const { roomName, options } = req.body;
  
  try {
    const room = await roomService.createRoom({
      name: roomName,
      emptyTimeout: options?.emptyTimeout ?? 300,
      maxParticipants: options?.maxParticipants ?? 50,
    });
    
    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LiveKit token server running on port ${PORT}`);
});
```

### Cross-Mode Communication

The framework includes standardized interaction patterns for cross-domain functionality. See the [Interaction Patterns documentation](.ruru/docs/livekit/interaction-patterns.md) for detailed examples.

## Configuration Export

### Available Export Formats

The LiveKit AI Agent Framework provides a configuration export utility that can transform mode configurations into various deployable formats:

- **JSON**: Standard configuration format for JavaScript applications
- **YAML**: Human-readable format suitable for configuration files
- **Environment Variables**: For deployment in containerized environments
- **TypeScript Interfaces**: Typed configurations for TypeScript applications
- **JavaScript Modules**: ES modules for direct import in JavaScript applications

### Using the Export Utility

The export utility is available in `.ruru/docs/livekit/export-utility-example.js`. To use it:

1. **Install Dependencies**:
   ```bash
   npm install toml yaml
   ```

2. **Run the Export Utility**:
   ```bash
   node .ruru/docs/livekit/export-utility-example.js
   ```

3. **Custom Export Options**:
   ```javascript
   const { exportLiveKitConfig } = require('./.ruru/docs/livekit/export-utility-example.js');
   
   // Export to JSON with environment-specific overrides
   exportLiveKitConfig({
     format: 'json',
     environment: 'production',
     outputPath: './configs/livekit-config.json'
   });
   
   // Export only auth configuration to TypeScript
   exportLiveKitConfig({
     format: 'ts',
     domain: 'auth',
     outputPath: './src/types/livekit-auth-config.ts'
   });
   ```

### Environment-Specific Configurations

The export utility supports environment-specific configuration overrides:

1. Create environment configuration files in `.ruru/config/` directory:
   - `.ruru/config/livekit.development.json`
   - `.ruru/config/livekit.staging.json`
   - `.ruru/config/livekit.production.json`

2. Specify the environment when exporting:
   ```javascript
   exportLiveKitConfig({
     format: 'json',
     environment: 'production', // Will apply production-specific overrides
     outputPath: './configs/livekit-config.json'
   });
   ```

## Common Use Cases

### Video Conferencing

For video conferencing applications, the framework can help with:

- Room setup with appropriate participant limits
- Token generation with necessary permissions
- Track management for optimal quality
- Recording configuration for meeting archives
- Webhook integration for meeting analytics

**Example Flow**:
1. Use Auth mode to generate participant tokens
2. Use Room mode to create and configure the meeting room
3. Use Track mode to define quality presets for different network conditions
4. Use Recording mode to configure meeting recording
5. Use Webhook mode to track participant join/leave events

### Webinars and Live Streaming

For webinar and live streaming applications:

- Asymmetric room permissions (presenters vs. viewers)
- RTMP streaming configuration via Egress mode
- Composite recording layouts
- Webhook integration for viewer analytics

**Example Flow**:
1. Use Auth mode to generate different tokens for presenters and viewers
2. Use Room mode to create the webinar room with asymmetric permissions
3. Use Egress mode to configure RTMP streaming to platforms like YouTube/Twitch
4. Use Recording mode to capture the webinar with a presenter-focused layout
5. Use Webhook mode to track viewer engagement metrics

### Virtual Classrooms

For educational applications:

- Structured room layouts for teacher/students
- Breakout room management
- Recording with transcript generation
- Screen sharing and whiteboard integration

**Example Flow**:
1. Use Auth mode to generate role-based tokens (teacher, student, assistant)
2. Use Room mode to create the classroom with appropriate layouts
3. Use Track mode to prioritize teacher video/audio quality
4. Use Recording mode to capture lessons with transcription
5. Use Room mode to manage breakout rooms for group activities

### Custom Media Applications

For specialized applications with unique requirements:

- Custom track subscriptions
- Data channel configuration
- Advanced room metadata
- Custom webhook processing

## Troubleshooting

### Common Issues and Solutions

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Token authentication fails | Expired token or incorrect permissions | Generate a new token with the Auth mode, verifying all required permissions are included |
| Cannot connect to room | Room doesn't exist or server configuration issue | Use Room mode to verify the room exists and check your LiveKit server URL |
| Media quality issues | Network limitations or track configuration | Use Track mode to adjust quality settings and enable simulcast for adaptive streaming |
| Recording not working | Storage configuration or permissions issue | Verify recording storage settings in Recording mode and ensure proper permissions |
| Webhook events not received | Endpoint configuration or network issue | Use Webhook mode to test the endpoint and verify event subscriptions |

### Diagnostic Tools

The framework includes several diagnostic capabilities:

- **Configuration Validator**: Verifies your LiveKit configuration
- **Token Debugger**: Decodes and displays JWT token contents
- **Webhook Tester**: Sends test events to your webhook endpoints
- **Connection Diagnostics**: Tests connectivity to your LiveKit server

## Best Practices

### Security

- Store API keys and secrets securely using environment variables
- Use the Auth mode to generate short-lived tokens with minimal required permissions
- Implement webhook signature validation to verify event authenticity
- Regularly rotate API keys and secrets

### Performance

- Enable adaptive streaming (simulcast) for video tracks
- Use appropriate quality presets for different device capabilities
- Implement selective track subscription for large rooms
- Configure appropriate recording quality based on content type

### Reliability

- Implement proper error handling in your application
- Use webhook retries for critical events
- Monitor room and participant metrics
- Implement reconnection logic for client applications

## Appendix

### Quality Gates

Each LiveKit mode includes built-in quality gates to ensure implementations meet requirements, architectural standards, and security best practices. Key quality gates include:

- **Requirements Validation**: Ensures all required configuration parameters are provided
- **Architectural Alignment**: Verifies implementations follow LiveKit best practices
- **Security Review**: Checks for potential security issues in configurations
- **Performance Assessment**: Evaluates potential performance impact of settings

For more details on quality gates, see the mode-specific documentation.

### Security Considerations

Critical security areas to consider:

- **API Key Protection**: Never expose LiveKit API keys in client-side code
- **Token Scope Limitation**: Limit token permissions to only what's needed
- **Webhook Validation**: Always validate webhook signatures
- **Room Access Control**: Implement appropriate room join restrictions
- **Encryption**: Ensure media is encrypted in transit

### Performance Optimization

Tips for optimizing LiveKit applications:

- **Simulcast Configuration**: Tailor simulcast layers to your target devices
- **Track Subscription Management**: Selectively subscribe to needed tracks
- **Server Resources**: Allocate appropriate CPU/memory for your LiveKit server
- **Media Processing**: Balance quality vs. performance for recording/egress
- **Client-Side Optimization**: Implement efficient rendering of video elements