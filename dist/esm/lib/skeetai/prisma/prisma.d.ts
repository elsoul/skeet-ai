import { OpenAI } from '../../../lib/openai/openAI';
import { VertexAI } from '../../../lib/vertexai';
import { AIType } from '../../genPrompt';
export declare const skeetAiPrisma: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<string>;
