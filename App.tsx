import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getChat, sendMessageAndGetStream, generateChatTitle } from './services/geminiService';
import { getChatHistory, saveChatSession, deleteChatSession } from './services/cacheService';
import HistorySidebar from './components/HistorySidebar';
import ChatView from './components/ChatView';
import SearchBar from './components/SearchBar';
import SidebarToggle from './components/SidebarToggle';
import { ChatSession, Message } from './types';
import ContextMeter from './components/ContextMeter';

const App: React.FC = () => {
  const [history, setHistory] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => window.innerWidth >= 1024);
  const [lastUsedModel, setLastUsedModel] = useState<string>('gemini-2.5-flash');
  const stopGenerationRef = useRef(false);

  useEffect(() => {
    const savedHistory = getChatHistory();
    setHistory(savedHistory);
    if (savedHistory.length > 0) {
      setActiveSession(savedHistory[0]);
      setLastUsedModel(savedHistory[0].model);
    } else {
      handleNewChat();
    }
  }, []);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      model: lastUsedModel
    };
    setActiveSession(newSession);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  const handleSelectSession = (id: string) => {
    const session = history.find(s => s.id === id);
    if (session) {
      setActiveSession(session);
      setLastUsedModel(session.model);
    }
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this chat? This action cannot be undone.")) {
      return;
    }

    const updatedHistory = deleteChatSession(id);
    setHistory(updatedHistory);

    if (activeSession?.id === id) {
      if (updatedHistory.length > 0) {
        setActiveSession(updatedHistory[0]);
      } else {
        handleNewChat();
      }
    }
  };
  
  const handleSendMessage = useCallback(async (message: string) => {
    if (!activeSession) return;

    setIsLoading(true);
    setError(null);
    stopGenerationRef.current = false;

    const updatedMessages: Message[] = [...activeSession.messages, { role: 'user', content: message }];
    let currentSession = { ...activeSession, messages: updatedMessages };
    setActiveSession(currentSession);
    
    const isNewSession = !history.some(s => s.id === currentSession.id);

    try {
        const chat = getChat(currentSession.messages, currentSession.model);
        const responseStream = await sendMessageAndGetStream(chat, message);
        
        let fullResponse = '';
        const modelMessagePlaceholder: Message = { role: 'model', content: '' };
        currentSession.messages.push(modelMessagePlaceholder);

        for await (const chunk of responseStream) {
            if (stopGenerationRef.current) {
                break;
            }
            const text = chunk.text;
            if (text) {
                fullResponse += text;
                setActiveSession(prev => {
                    if (!prev) return null;
                    const newMessages = [...prev.messages];
                    newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content: fullResponse };
                    return { ...prev, messages: newMessages };
                });
            }
        }
        
        const finalModelMessage: Message = { role: 'model', content: fullResponse };
        currentSession.messages[currentSession.messages.length - 1] = finalModelMessage;

        if (isNewSession && currentSession.messages.length > 1) {
            const title = await generateChatTitle(message, fullResponse, currentSession.model);
            currentSession.title = title;
        }

        const updatedHistory = saveChatSession(currentSession);
        setHistory(updatedHistory);
        setActiveSession(currentSession);

    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
        setIsLoading(false);
        stopGenerationRef.current = false;
    }
  }, [activeSession, history]);
  
  const handleStopGeneration = () => {
    stopGenerationRef.current = true;
  };
  
  const handleRegenerate = useCallback(async () => {
    if (!activeSession || isLoading) return;
    
    const lastUserMessage = [...activeSession.messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    // Remove the last model response if it exists
    const historyWithoutLastAnswer = activeSession.messages.filter((m, i) => 
      !(m.role === 'model' && i === activeSession.messages.length - 1)
    );
    
    const sessionForRegen = {
      ...activeSession,
      messages: historyWithoutLastAnswer,
    };

    setActiveSession(sessionForRegen);
    await handleSendMessage(lastUserMessage.content);

  }, [activeSession, isLoading, handleSendMessage]);


  return (
    <div className="h-screen bg-slate-50 flex text-slate-800 overflow-hidden">
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <HistorySidebar
        sessions={history}
        activeSessionId={activeSession?.id ?? null}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <header className="flex items-center justify-between p-2 border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-10">
            <div className="flex items-center flex-1 min-w-0">
                <SidebarToggle isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
                <h1 className="text-lg font-semibold text-slate-800 ml-4 truncate">
                    {activeSession?.title || 'Cognito Coder'}
                </h1>
            </div>
            {activeSession && (
                <div className="pr-2 flex-shrink-0 flex items-center gap-4">
                    {activeSession.messages.length > 0 && <ContextMeter messages={activeSession.messages} />}
                </div>
            )}
        </header>

        <main className="flex-1 flex flex-col overflow-hidden">
             {error && (
                <div className="text-center my-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg max-w-4xl mx-auto w-full">
                <p className="font-bold">An error occurred</p>
                <p>{error}</p>
                </div>
            )}
            {activeSession ? (
                <ChatView 
                    messages={activeSession.messages} 
                    isLoading={isLoading}
                    onSuggestionClick={handleSendMessage}
                    onRegenerate={handleRegenerate}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500">
                    Select a chat or start a new one.
                </div>
            )}
            <SearchBar onSendMessage={handleSendMessage} isLoading={isLoading} onStop={handleStopGeneration}/>
        </main>
      </div>
    </div>
  );
};

export default App;