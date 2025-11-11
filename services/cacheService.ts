import { ChatSession } from '../types';

const HISTORY_KEY = 'cognito-coder-chat-history';

export const getChatHistory = (): ChatSession[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    const sessions = historyJson ? JSON.parse(historyJson) : [];
    // Backwards compatibility for sessions saved before new properties were added
    return sessions.map((session: any) => ({
      ...session,
      model: session.model || 'gemini-2.5-flash',
      systemInstruction: session.systemInstruction || undefined,
    }));
  } catch (error) {
    console.error('Error reading chat history from localStorage:', error);
    return [];
  }
};

export const saveChatSession = (session: ChatSession): ChatSession[] => {
  const history = getChatHistory();
  const sessionIndex = history.findIndex(s => s.id === session.id);

  let updatedHistory;
  if (sessionIndex > -1) {
    // Update existing session
    history[sessionIndex] = session;
    updatedHistory = history;
  } else {
    // Add new session to the top
    updatedHistory = [session, ...history];
  }
  
  const finalHistory = updatedHistory.slice(0, 50); // Keep latest 50 sessions

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(finalHistory));
  } catch (error) {
    console.error('Error saving chat history to localStorage:', error);
  }
  return finalHistory;
};

export const deleteChatSession = (id: string): ChatSession[] => {
  const history = getChatHistory();
  const updatedHistory = history.filter(s => s.id !== id);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error deleting chat session from localStorage:', error);
  }
  return updatedHistory;
}