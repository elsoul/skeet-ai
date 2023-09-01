import { AIType } from '@/lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
export declare const translateDocument: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, mode: 'markdown' | 'json', langFrom?: string, langTo?: string) => Promise<string>;
