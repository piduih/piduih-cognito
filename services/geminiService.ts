import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const defaultSystemInstruction = `You are Cognito Coder, an expert coding agent.
- Your primary goal is to provide accurate, efficient, and well-explained code.
- Always wrap code blocks in triple backticks (\`\`\`).
- Specify the language after the opening backticks (e.g., \`\`\`javascript).
- Provide a clear, concise explanation of what the code does, its dependencies, and how to use it.
- If the user asks a non-coding question, politely decline and state your purpose as a coding assistant.
- Your responses should be in markdown format.`;

export const getChat = (history: Message[], model: string, systemInstructionOverride?: string): Chat => {
  const geminiHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  // The history passed to `create` should not include the latest user message
  // if we are about to send it via `sendMessageStream`.
  const historyForChat = geminiHistory.length > 0 && geminiHistory[geminiHistory.length-1].role === 'user'
    ? geminiHistory.slice(0, -1)
    : geminiHistory;
  
  const systemInstruction = systemInstructionOverride || defaultSystemInstruction;

  return ai.chats.create({
    model,
    config: { systemInstruction },
    history: historyForChat
  });
};

export const sendMessageAndGetStream = async (
  chat: Chat,
  message: string,
): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>> => {
  try {
    return chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Error streaming from Gemini:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    throw new Error(`Failed to get response from AI: ${errorMessage}`);
  }
};

export const generateChatTitle = async (userMessage: string, modelResponse: string, model: string): Promise<string> => {
    try {
        const prompt = `Generate a very short, concise title (4-5 words max) for the following conversation. The title should be suitable for a sidebar history. Respond with only the title and nothing else.\n\nUSER: ${userMessage}\n\nASSISTANT: ${modelResponse}`;
        const response = await ai.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        return response.text.trim().replace(/"/g, ''); // Clean up quotes
    } catch (error) {
        console.error("Error generating title:", error);
        return "Untitled Chat";
    }
}