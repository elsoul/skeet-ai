import { AIType } from '@/lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
export declare const skeetDebug: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, debugFile: string) => Promise<string>;
