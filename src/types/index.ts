export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  chat_id: string;
  role: Role;
  content: string;
  model_id: string;
  tokens_count: number;
  created_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  daily_tokens_used: number;
  last_reset_date: string;
  created_at: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  isFree: boolean;
}

export interface UsageLimit {
  dailyLimit: number;
  tokensUsed: number;
  requestsPerMinute: number;
}
