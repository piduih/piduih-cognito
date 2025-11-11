# Cognito Coder: Development Roadmap

This document outlines the planned features and long-term vision for Cognito Coder, evolving it from a powerful coding assistant into an indispensable AI partner for developers.

---

### **Phase 1: Solidifying the Foundation (Now)**

This phase is about polishing the current experience and adding high-value features that make the app more robust and user-friendly.

1.  **Enhanced Error Handling & Retry:** Right now, an API error is a dead end. We will implement inline error messages within the chat, preserving the user's prompt and adding a "Try Again" button. This makes the app feel more resilient.
2.  **Search Chat History:** As the history grows, finding a specific conversation becomes difficult. We will add a simple search bar within the sidebar to quickly filter past chats by title or content.
3.  **Customizable System Prompts:** Power users may want to tweak the AI's "personality" or instructions. We will add a settings modal where users can edit the system prompt (e.g., "You are an expert in Python and Django," "Always respond in a very terse style"). This setting will be saved per-chat.

---

### **Phase 2: Enhancing Developer Workflow (Next)**

This phase focuses on integrating Cognito Coder more deeply into the actual day-to-day workflow of a developer, moving beyond a simple Q&A tool.

1.  **Shareable Chat Links:** A developer's work is collaborative. We will implement a feature to generate a unique, shareable link for any conversation. This allows users to send a link to a colleague to show them exactly how a solution was derived.
2.  **File Upload for Codebase Context:** This is a game-changer. We will add the ability to upload one or more files (e.g., `App.tsx`, `package.json`). The AI will then be able to read those files and answer questions *about your specific code*, making its advice dramatically more relevant and powerful.
3.  **Response Feedback (Thumbs Up/Down):** To improve the quality of responses over time, we will add simple feedback buttons to each AI message. This provides a mechanism for users to signal what a helpful (or unhelpful) response looks like.

---

### **Phase 3: Becoming an Autonomous Agent (Later/Future)**

This is the long-term vision: transforming Cognito Coder from a reactive assistant into a proactive, agent-like partner.

1.  **Tool Integration & Function Calling:** We will leverage Gemini's function calling capabilities. Imagine asking the AI to "refactor this code and run the linter." The AI could be given a "linting tool" and would call it, see the output, and then fix the code based on the results, all within one turn.
2.  **VS Code Extension:** The ultimate goal for a developer tool is to live where the developer lives. We will build a VS Code extension that brings the entire Cognito Coder chat experience directly into the editor, complete with access to the entire project's context.
3.  **Proactive Code Analysis & Suggestions:** The final step is for Cognito Coder to become proactive. The extension could analyze open files in the background and offer unsolicited, helpful suggestions—spotting potential bugs, suggesting performance improvements, or identifying outdated dependencies before you even ask.
