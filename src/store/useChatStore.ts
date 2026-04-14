import { create } from 'zustand';
import { Chat, Message, AIModel } from '../types';
import { SUPPORTED_MODELS, DAILY_TOKEN_LIMIT } from '../constants/models';

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  messages: Record<string, Message[]>;
  selectedModelIds: string[];
  isSuperMelaMode: boolean;
  tokensUsedToday: number;
  
  // Actions
  setChats: (chats: Chat[]) => void;
  setCurrentChatId: (id: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  setMessages: (chatId: string, messages: Message[]) => void;
  toggleModel: (modelId: string) => void;
  setSuperMelaMode: (enabled: boolean) => void;
  updateTokensUsed: (tokens: number) => void;
  resetTokens: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  currentChatId: null,
  messages: {},
  selectedModelIds: [SUPPORTED_MODELS[0].id],
  isSuperMelaMode: false,
  tokensUsedToday: 0,

  setChats: (chats) => set({ chats }),
  setCurrentChatId: (currentChatId) => set({ currentChatId }),
  addMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  })),
  setMessages: (chatId, messages) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: messages
    }
  })),
  toggleModel: (modelId) => set((state) => {
    const isSelected = state.selectedModelIds.includes(modelId);
    if (isSelected && state.selectedModelIds.length > 1) {
      return { selectedModelIds: state.selectedModelIds.filter(id => id !== modelId) };
    } else if (!isSelected) {
      return { selectedModelIds: [...state.selectedModelIds, modelId] };
    }
    return state;
  }),
  setSuperMelaMode: (isSuperMelaMode) => set({ isSuperMelaMode }),
  updateTokensUsed: (tokens) => set((state) => ({ tokensUsedToday: state.tokensUsedToday + tokens })),
  resetTokens: () => set({ tokensUsedToday: 0 }),
}));
