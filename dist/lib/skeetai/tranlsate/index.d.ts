import { AIType } from '@/lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
export declare const skeetAiTranslates: (paths: string[], langFrom: string, langTo: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<void>;
