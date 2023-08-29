import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const skeetDebug: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, debugFile: string) => Promise<string>;
