import { useChatStore } from '../../store/useChatStore';
import { Message, AIModel } from '../../types';
import { SUPPORTED_MODELS } from '../../constants/models';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function MessageList() {
  const { currentChatId, messages, selectedModelIds } = useChatStore();
  const currentMessages = currentChatId ? messages[currentChatId] || [] : [];

  // Group messages by user prompt
  const groupedMessages: { user: Message, assistants: Record<string, Message> }[] = [];
  
  let currentGroup: { user: Message, assistants: Record<string, Message> } | null = null;
  
  currentMessages.forEach(msg => {
    if (msg.role === 'user') {
      if (currentGroup) groupedMessages.push(currentGroup);
      currentGroup = { user: msg, assistants: {} };
    } else if (msg.role === 'assistant' && currentGroup) {
      currentGroup.assistants[msg.model_id] = msg;
    }
  });
  if (currentGroup) groupedMessages.push(currentGroup);

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="max-w-7xl mx-auto py-8 flex flex-col gap-12">
        {groupedMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 max-w-md"
            >
              <h2 className="text-3xl font-display font-bold mb-4">Welcome to the Mela!</h2>
              <p className="text-muted-foreground mb-6">
                Select your favorite AI models above and start a conversation. Everything is free, forever.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">ChatGPT-5</span>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Claude 3.5</span>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Gemini 2.5</span>
              </div>
            </motion.div>
          </div>
        )}

        {groupedMessages.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg">
                <p className="text-sm leading-relaxed">{group.user.content}</p>
              </div>
            </div>

            {/* Assistant Responses (Side-by-Side) */}
            <div className={`grid gap-4 ${
              selectedModelIds.length === 1 ? 'grid-cols-1' : 
              selectedModelIds.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {selectedModelIds.map(modelId => {
                const model = SUPPORTED_MODELS.find(m => m.id === modelId);
                const response = group.assistants[modelId];
                
                if (!model) return null;

                return (
                  <motion.div
                    key={modelId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card flex flex-col h-full"
                  >
                    <div className="p-3 border-b border-border flex items-center justify-between bg-secondary/30 rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={model.icon} referrerPolicy="no-referrer" />
                          <AvatarFallback>{model.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold tracking-tight">{model.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      {response ? (
                        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                          {response.content}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground italic text-xs">
                          <div className="flex gap-1">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                          Thinking...
                        </div>
                      )}
                    </div>

                    <div className="p-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{response?.tokens_count || 0} tokens</span>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-3 h-3 cursor-pointer hover:text-primary" />
                        <ThumbsDown className="w-3 h-3 cursor-pointer hover:text-primary" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
