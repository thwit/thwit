import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { GenerateContentResponse } from "@google/genai";

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Hi! I'm Alex's AI Assistant. Ask me anything about his experience, skills, or projects."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for the streaming model response
    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMessageId,
      role: MessageRole.MODEL,
      text: '',
      isStreaming: true
    }]);

    try {
      const streamResult = await sendMessageStream(userMessage.text);
      
      let fullText = '';
      
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        fullText += textChunk;

        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: fullText } 
            : msg
        ));
      }

      // Finalize message
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          role: MessageRole.MODEL, 
          text: "Sorry, I'm having trouble connecting right now. Please try again later." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-lg z-50 flex items-center gap-2 group"
      >
        <Sparkles size={20} className="text-yellow-300" />
        <span className="font-medium">Ask AI about me</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] max-w-[380px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-900 rounded-t-2xl text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          <h3 className="font-medium text-sm">Alex's Assistant</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === MessageRole.USER
                  ? 'bg-slate-900 text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
              {msg.isStreaming && (
                <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-slate-400 animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-100 bg-white rounded-b-2xl">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, skills..."
            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-1.5 text-slate-400 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};