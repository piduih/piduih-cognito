# Cognito Coder 💻

Cognito Coder is an intelligent, conversational coding assistant powered by the Google Gemini API. It's designed to be a collaborative partner for developers, helping them write, understand, and debug code more efficiently through an interactive chat interface.

## ✨ Features

- **Conversational Interface**: Engage in a continuous dialogue with the AI. Ask follow-up questions and get context-aware answers, just like chatting with a human expert.
- **Smart Chat History**: All your conversations are automatically saved. New chats are intelligently titled based on their content, making it easy to find and resume past discussions.
- **Collapsible Sidebar**: Maximize your coding workspace by toggling the history sidebar.
- **Syntax Highlighting**: Code blocks are automatically rendered with beautiful syntax highlighting for dozens of languages.
- **Dedicated Code Blocks**: Responses are intelligently parsed to separate explanations from code, each presented in its own distinct UI component.
- **One-Click Copy**: Every code block has a convenient "Copy" button to instantly grab the snippet.
- **Real-time Streaming**: Responses are streamed in real-time for a dynamic, fluid conversation.
- **Developer-Focused UI**: Features a clean, light-themed, and responsive UI built with React and Tailwind CSS.
- **Suggested Prompts**: Provides a set of common coding tasks to help users get started on a new chat.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`) with Chat support.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Syntax Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- **Client-side Storage**: Browser `localStorage` for persistent chat history.

## 🚀 How It Works

1.  **Start a Chat**: The user starts a new conversation or selects a previous one from the history.
2.  **Send a Message**: The developer types a coding-related query and sends it.
3.  **Contextual Prompting**: The application sends the new message along with the previous conversation history to the Gemini API. This provides the AI with the necessary context to have a meaningful dialogue.
4.  **Stream Processing**: The application receives the response as a stream. It intelligently parses the incoming text, identifying natural language and code blocks (wrapped in Markdown fences).
5.  **Dynamic Rendering**: The new response from the AI is appended to the chat view, with code blocks rendered in a syntax-highlighted component.
6.  **Auto-Titling & History**: If it's the first message in a new chat, a separate API call is made after the response is complete to generate a concise title. The entire conversation is then saved to `localStorage`.