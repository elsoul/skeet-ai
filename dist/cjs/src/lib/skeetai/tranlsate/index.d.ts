import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const skeetAiTranslates: (paths: string[], langFrom: string, langTo: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<void>;
