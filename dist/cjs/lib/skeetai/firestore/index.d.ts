import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const skeetFirestore: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<string>;
