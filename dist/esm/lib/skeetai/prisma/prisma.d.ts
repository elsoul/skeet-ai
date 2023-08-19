import { OpenAI } from 'src/lib/openai/openAI';
import { VertexAI } from 'src/lib/vertexai';
import { AIType } from 'src/lib/genPrompt';
export declare const skeetAiPrisma: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<string>;
