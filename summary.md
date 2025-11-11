# Cognito Coder: Application Summary

## Core Purpose

**Cognito Coder** is a sophisticated, AI-powered conversational coding assistant designed to be a collaborative partner for developers. It leverages the Google Gemini API to help users write, understand, and debug code efficiently through a real-time, interactive chat interface.

## Key Features

- **Conversational Chat UI**: An intuitive, message-based interface for natural, context-aware dialogue with the AI.
- **Smart & Persistent History**: Chat sessions are automatically saved to `localStorage`. New chats are intelligently titled, and users can easily revisit, delete, and search past conversations.
- **Searchable Chat History**: A real-time search bar allows for quick filtering and retrieval of past chat sessions.
- **Enhanced Error Handling**: API errors are handled gracefully with an inline error message and a "Try Again" button, preventing workflow disruption.
- **Customizable System Prompts**: Users can edit the AI's core instructions for each chat, tailoring its expertise and personality to specific tasks.
- **Fully Responsive Design**: The application is mobile-first, featuring a collapsible overlay sidebar that ensures a seamless experience on any device, from phones to desktops.
- **Advanced Code Rendering**: The AI's responses are intelligently parsed to separate explanations from code. Code snippets are displayed in dedicated blocks with syntax highlighting and a one-click "Copy" button.
- **User-Centric Controls**:
    - **Stop Generation**: Users can interrupt the AI mid-response.
    - **Regenerate Response**: Users can request a new answer for their last prompt.
- **Context Awareness Meter**: A visual meter in the header provides real-time feedback on the size of the current conversation's context, helping users manage the AI's "memory" for optimal performance.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **AI Model**: Google Gemini API (`gemini-2.5-flash` and `gemini-2.5-pro`)
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: `react-syntax-highlighter`
- **Client-Side Storage**: Browser `localStorage`

## Future Vision (Roadmap Highlights)

The project has a clear roadmap to evolve from a powerful tool into a proactive AI partner:
- **Phase 1 (Foundation)**: Implement enhanced error handling, history search, and customizable system prompts.
- **Phase 2 (Workflow Integration)**: Add features like shareable chat links, file uploads for codebase context, and user feedback mechanisms.
- **Phase 3 (Autonomous Agent)**: The long-term vision includes tool integration (function calling), a dedicated VS Code extension, and proactive code analysis.