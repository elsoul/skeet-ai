import { AIType } from '../../../lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
export declare const skeetGenTypedoc: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<string>;
