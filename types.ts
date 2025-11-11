export interface Message {
  role: 'user' | 'model';
  content: string;
  error?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  systemInstruction?: string;
}