import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
export declare const splitContentIntoChunks: (content: string, linesPerChunk: number) => string[];
export declare const translateJsonDocuments: (paths: string[], langFrom: string | undefined, langTo: string | undefined, ai: AIType, aiInstance: VertexAI | OpenAI) => Promise<void>;
