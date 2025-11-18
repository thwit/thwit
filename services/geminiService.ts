import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const apiKey = process.env.API_KEY;

export const getChatSession = (): Chat => {
  if (chatSession) return chatSession;

  if (!apiKey) {
    console.error("API_KEY is missing.");
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: AI_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getChatSession();
  return chat.sendMessageStream({ message });
};
