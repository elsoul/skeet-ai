import { AIType } from '../../genPrompt';
import { OpenAI } from '../../openai';
import { VertexAI } from '../../vertexai';
export declare const uploadJsonlFile: (filePath: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<import("openai/resources").FileObject | undefined>;
