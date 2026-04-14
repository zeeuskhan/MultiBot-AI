import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Send, Wand2, Plus, Mic } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isSuperMelaMode, setSuperMelaMode } = useChatStore();

  const handleSend = () => {
    if (content.trim() && !disabled) {
      onSend(content);
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [content]);

  return (
    <div className="p-4 border-t border-border bg-background">
      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-center gap-2 mb-2">
          <Button 
            variant={isSuperMelaMode ? "default" : "outline"} 
            size="sm" 
            className="rounded-full h-8 text-[10px] font-bold uppercase tracking-wider"
            onClick={() => setSuperMelaMode(!isSuperMelaMode)}
          >
            <SparkleIcon className="w-3 h-3 mr-1" />
            Super Mela Mode
          </Button>
          <Button variant="outline" size="sm" className="rounded-full h-8 text-[10px] font-bold uppercase tracking-wider">
            <Wand2 className="w-3 h-3 mr-1" />
            Enhance Prompt
          </Button>
        </div>
        
        <div className="relative glass-card p-2 flex items-end gap-2 focus-within:ring-1 ring-primary/50 transition-all">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full shrink-0 mb-1">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </Button>
          
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI Utsav anything... (Hindi/English supported)"
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-1 text-sm outline-none min-h-[44px]"
            rows={1}
          />
          
          <div className="flex items-center gap-1 shrink-0 pb-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <Mic className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!content.trim() || disabled}
              size="icon" 
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          Made with ❤️ for Indian AI lovers | API costs managed by fair usage limits
        </p>
      </div>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}
