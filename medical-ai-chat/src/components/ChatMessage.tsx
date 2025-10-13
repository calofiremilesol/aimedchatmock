import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { ChatMessage as ChatMessageType } from "@/types/patient";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.type === 'ai';
  
  return (
    <div className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAI && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-blue-100">
            <Bot className="w-4 h-4 text-blue-600" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <Card className={`max-w-[80%] ${isAI ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
        <CardContent className="p-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.context && (
            <p className="text-xs opacity-70 mt-2 italic">Context: {message.context}</p>
          )}
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
      
      {!isAI && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-green-100">
            <User className="w-4 h-4 text-green-600" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}