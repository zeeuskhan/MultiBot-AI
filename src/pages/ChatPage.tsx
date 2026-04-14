import { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Message, Role } from '../types';
import ModelSelector from '../components/chat/ModelSelector';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import { ai } from '../lib/gemini';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function ChatPage() {
  const { 
    currentChatId, 
    setCurrentChatId, 
    addMessage, 
    selectedModelIds, 
    isSuperMelaMode,
    tokensUsedToday,
    updateTokensUsed
  } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentChatId) {
      setCurrentChatId(uuidv4());
    }
  }, [currentChatId, setCurrentChatId]);

  const handleSendMessage = async (content: string) => {
    if (!currentChatId) return;

    // Check usage limit
    if (tokensUsedToday >= 100000) {
      toast.error("Daily limit reached", {
        description: "You've used your 100,000 free tokens for today. Resetting tomorrow!"
      });
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      chat_id: currentChatId,
      role: 'user',
      content,
      model_id: 'user',
      tokens_count: content.length / 4, // Rough estimate
      created_at: new Date().toISOString()
    };

    addMessage(currentChatId, userMessage);
    setIsLoading(true);

    try {
      // Call each selected model
      const modelPromises = selectedModelIds.map(async (modelId) => {
        try {
          let responseText = "";
          let tokens = 0;

          // For demo, we use Gemini for all models if they are "proxied"
          // In production, these would be separate API calls via backend
          const modelName = modelId.includes('gemini') ? modelId : 'gemini-3-flash-preview';
          
          const result = await ai.models.generateContent({
            model: modelName,
            contents: content,
            config: {
              systemInstruction: isSuperMelaMode 
                ? "You are part of AI Utsav's Super Mela Mode. Provide a highly accurate, unified response."
                : "You are a helpful AI assistant on AI Utsav."
            }
          });

          responseText = result.text || "No response received.";
          tokens = responseText.length / 4; // Rough estimate

          const assistantMessage: Message = {
            id: uuidv4(),
            chat_id: currentChatId,
            role: 'assistant',
            content: responseText,
            model_id: modelId,
            tokens_count: tokens,
            created_at: new Date().toISOString()
          };

          addMessage(currentChatId, assistantMessage);
          updateTokensUsed(tokens);
        } catch (err) {
          console.error(`Error calling ${modelId}:`, err);
          toast.error(`Failed to get response from ${modelId}`);
        }
      });

      await Promise.all(modelPromises);
    } catch (err) {
      console.error("Chat error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pt-16">
      <ModelSelector />
      <MessageList />
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
