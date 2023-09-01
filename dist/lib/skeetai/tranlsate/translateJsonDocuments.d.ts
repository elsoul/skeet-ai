import { AIType } from '@/lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
export declare const splitContentIntoChunks: (content: string, linesPerChunk: number) => string[];
export declare const translateJsonDocuments: (paths: string[], langFrom: string | undefined, langTo: string | undefined, ai: AIType, aiInstance: VertexAI | OpenAI) => Promise<void>;
