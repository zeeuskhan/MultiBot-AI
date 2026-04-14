import { useChatStore } from '../../store/useChatStore';
import { SUPPORTED_MODELS } from '../../constants/models';
import { Badge } from '../ui/badge';
import { buttonVariants } from '../ui/button';
import { Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

export default function ModelSelector() {
  const { selectedModelIds, toggleModel } = useChatStore();

  return (
    <div className="flex flex-wrap gap-2 p-4 border-b border-border bg-secondary/20">
      {SUPPORTED_MODELS.map((model) => {
        const isSelected = selectedModelIds.includes(model.id);
        return (
          <div key={model.id}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: isSelected ? "default" : "outline", size: "sm" }),
                  "rounded-full h-9 px-4 transition-all cursor-pointer",
                  isSelected ? 'shadow-lg shadow-primary/20' : ''
                )}
                onClick={() => toggleModel(model.id)}
              >
                <div className="flex items-center gap-2">
                  <img src={model.icon} alt={model.name} className="w-4 h-4 rounded-sm" referrerPolicy="no-referrer" />
                  <span className="text-xs font-medium">{model.name}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
              <div className="flex flex-col gap-1 max-w-xs">
                <span className="font-bold">{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
                <Badge variant="secondary" className="w-fit text-[10px] mt-1">Free Forever</Badge>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        );
      })}
    </div>
  );
}
