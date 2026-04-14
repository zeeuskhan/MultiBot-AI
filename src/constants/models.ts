import { AIModel } from '../types';

export const SUPPORTED_MODELS: AIModel[] = [
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    description: 'Most capable model for complex reasoning and coding.',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v2_71f2043734160.png',
    isFree: true,
  },
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'Fast and efficient for general tasks.',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v2_71f2043734160.png',
    isFree: true,
  },
  {
    id: 'gpt-4o',
    name: 'ChatGPT-5 (Proxy)',
    provider: 'OpenAI',
    description: 'Next-gen intelligence for creative and analytical tasks.',
    icon: 'https://openai.com/favicon.ico',
    isFree: true,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    description: 'Balanced performance and speed for professional work.',
    icon: 'https://www.anthropic.com/favicon.ico',
    isFree: true,
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    description: 'High-performance open-weights model.',
    icon: 'https://deepseek.com/favicon.ico',
    isFree: true,
  },
  {
    id: 'qwen-max',
    name: 'Qwen 3 Max',
    provider: 'Alibaba',
    description: 'Powerful multilingual model.',
    icon: 'https://www.alibabacloud.com/favicon.ico',
    isFree: true,
  }
];

export const DAILY_TOKEN_LIMIT = 100000;
export const REQUESTS_PER_MINUTE_LIMIT = 10;
