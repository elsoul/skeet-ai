import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const skeetNaming: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, isMigration?: boolean) => Promise<string>;
