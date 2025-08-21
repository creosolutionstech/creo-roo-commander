# LiveKit Agent Interaction Patterns

This document defines the standardized interaction patterns between the LiveKit Coordinator mode and the specialized LiveKit agent modes. It also covers interaction patterns between specialist modes when cross-domain functionality is required.

## 1. Coordinator-to-Specialist Interaction

### 1.1 Request Analysis & Routing

The LiveKit Coordinator is the primary entry point for all LiveKit-related functionality. It implements a decision tree routing logic to analyze user requests and delegate them to the appropriate specialist mode:

```
User Request → LiveKit Coordinator → [Decision Tree Analysis] → Appropriate Specialist Mode
```

#### Routing Decision Tree

The Coordinator uses the following decision tree to route requests:

1. **Authentication-Related?** → `livekit-auth`
   - JWT token generation/validation
   - API key management
   - Authentication strategies

2. **Room-Related?** → `livekit-room`
   - Room creation/deletion
   - Room configuration
   - Participant management
   - Room permissions

3. **Media Track-Related?** → `livekit-track`
   - Audio/video tracks
   - Track subscriptions
   - Track publication
   - Quality settings

4. **Recording-Related?** → `livekit-recording`
   - Session recording
   - Recording configuration
   - Recording storage
   - Recording access

5. **Egress-Related?** → `livekit-egress`
   - Content export
   - Streaming to external platforms
   - Transcoding
   - Compositing

6. **Webhook-Related?** → `livekit-webhook`
   - Event handling
   - External integrations
   - Callbacks
   - Webhook security

### 1.2 Delegation Protocol

When the Coordinator identifies the appropriate specialist mode, it follows this delegation protocol:

1. **Simple Requests (Single Domain):**
   - Use direct delegation via `new_task` with clear context
   - Include all necessary information for the specialist to execute the task independently

2. **Complex Requests (Multi-Domain):**
   - Create an MDTM task file with well-defined checklist items
   - Delegate the primary task to the most relevant specialist
   - Include instructions for cross-mode collaboration when needed
   - Monitor progress and coordinate handoffs between specialists

### 1.3 Standard Delegation Message Format

```
Process LiveKit [domain] request:

Goal: [Clear description of what needs to be accomplished]

Context:
- Implementation Language: [JavaScript/TypeScript, Python, etc.]
- Environment: [Node.js, Browser, etc.]
- SDK Version: [If applicable]

Requirements:
- [Specific requirement 1]
- [Specific requirement 2]

[Additional domain-specific details as needed]

[Reference to MDTM task file if complex]

Coordinator Task ID: [If applicable]
```

### 1.4 Completion Reporting

Specialists report task completion back to the Coordinator using the `attempt_completion` tool with a standardized format:

```
✅ Completed [domain] task:
- Implemented [specific functionality]
- Created/Modified files: [file paths]
- [Any important notes about the implementation]

[For complex tasks with MDTM]: Task file updated at [path]
```

## 2. Specialist-to-Specialist Interaction

Certain LiveKit implementations require collaboration between specialist modes due to interdependencies between functional domains.

### 2.1 Auth-Room Interaction Pattern

Room operations often require authentication tokens with specific permissions.

**Dependency Flow:**
```
User Request → LiveKit Coordinator → LiveKit Room → [Need Auth] → LiveKit Auth
```

**Collaboration Protocol:**

1. When the LiveKit Room mode needs authentication tokens:
   ```
   Room Mode → Request Token → Auth Mode → Generate Token → Return to Room Mode
   ```

2. Standard Auth Request Format:
   ```
   Generate authentication token for room operation:
   
   Room: [room name]
   Identity: [participant identity]
   Permissions:
   - [permission 1]
   - [permission 2]
   TTL: [token lifetime]
   ```

3. Standard Auth Response Format:
   ```
   Token generated:
   
   JWT: [token string]
   Expiration: [expiration time]
   Permissions: [included permissions]
   ```

### 2.2 Room-Track Interaction Pattern

Room and Track modes frequently collaborate for participant media management.

**Dependency Flow:**
```
User Request → LiveKit Coordinator → LiveKit Room → [Media Management] → LiveKit Track
```

**Collaboration Protocol:**

1. When Room operations involve track management:
   ```
   Room Mode → Delegate Track Operations → Track Mode → Manage Tracks → Return to Room Mode
   ```

2. Standard Track Request Format:
   ```
   Manage tracks for room operation:
   
   Room: [room name]
   Participant: [participant identity]
   Operation: [publish/subscribe/mute/etc.]
   Track Details:
   - Type: [audio/video/data]
   - [Additional track parameters]
   ```

3. Standard Track Response Format:
   ```
   Track operation completed:
   
   Operation: [operation performed]
   Track ID: [track identifier]
   Status: [success/failure]
   ```

### 2.3 Room-Recording Interaction Pattern

Room recording operations require coordination between Room and Recording modes.

**Dependency Flow:**
```
User Request → LiveKit Coordinator → LiveKit Room → [Recording Request] → LiveKit Recording
```

**Collaboration Protocol:**

1. Standard Recording Request Format:
   ```
   Start recording for room:
   
   Room: [room name]
   Configuration:
   - Format: [mp4/webm/etc.]
   - Layout: [grid/active/etc.]
   - Storage: [storage configuration]
   ```

2. Standard Recording Response Format:
   ```
   Recording started:
   
   Recording ID: [recording identifier]
   Room: [room name]
   Storage Location: [where recording will be stored]
   ```

## 3. Error Handling & Escalation

### 3.1 Specialist Mode Error Reporting

When a specialist encounters an error, it reports back to the Coordinator with:

```
❌ Error in [domain] task:
- Error Type: [authentication/configuration/runtime/etc.]
- Error Message: [specific error message]
- Context: [what operation was being attempted]
- Recommended Action: [if available]
```

### 3.2 Error Handling Protocol

1. **Specialist-Level Handling:**
   - Specialists attempt to handle domain-specific errors
   - Implement retry logic for transient issues
   - Validate inputs before operations

2. **Coordinator-Level Handling:**
   - Coordinator receives error reports
   - Analyzes error patterns
   - May route to another specialist if appropriate
   - Escalates to the user with clear explanations and options

### 3.3 Escalation Path

```
Specialist Error → Coordinator → [Analysis] → Retry/Reroute or User Escalation
```

## 4. Implementation Guidelines

### 4.1 MDTM Usage

For complex implementations that span multiple LiveKit domains:

1. Create a dedicated MDTM task file
2. Define clear checklist items for each specialist's responsibilities
3. Use the task file as the central coordination mechanism
4. Update status fields as work progresses

### 4.2 Context Sharing

When delegating tasks that involve multiple specialists:

1. Include all relevant context in the initial delegation
2. Store shared configuration in a central location
3. Pass context explicitly between specialists
4. Avoid assumptions about what context is available

### 4.3 Documentation

All specialist modes should document:

1. APIs and methods implemented
2. Configuration options used
3. Dependencies on other specialists
4. Any custom implementations or extensions

## 5. Example Interaction Flows

### 5.1 Complete Video Chat Implementation

```
User Request: "Implement a basic video chat using LiveKit in React"

1. LiveKit Coordinator analyzes request
2. Creates MDTM task with checklist
3. Delegates to specialists in sequence:
   a. LiveKit Auth: Generate tokens for room access
   b. LiveKit Room: Set up room creation and configuration
   c. LiveKit Track: Implement audio/video track management
4. Each specialist updates MDTM task as they complete items
5. Coordinator monitors progress and handles handoffs
6. Final implementation returned to user
```

### 5.2 Room Recording Implementation

```
User Request: "Add recording functionality to LiveKit rooms"

1. LiveKit Coordinator analyzes request
2. Determines this requires Room and Recording specialists
3. Creates MDTM task file
4. Delegates initial setup to LiveKit Room
5. Room specialist implements base functionality, then requests Recording specialist for recording features
6. Recording specialist implements recording capability and updates MDTM
7. Room specialist integrates recording controls
8. Coordinator monitors and ensures cohesive implementation
```

## 6. Conclusion

These interaction patterns establish a standardized approach for collaboration between LiveKit modes, ensuring consistent, efficient, and reliable implementation of LiveKit functionality. By following these patterns, the LiveKit AI Agent Framework can deliver comprehensive real-time communication solutions while maintaining clear separation of concerns and specialized expertise.