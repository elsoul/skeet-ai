import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const translateDocument: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, mode: 'markdown' | 'json') => Promise<string>;
