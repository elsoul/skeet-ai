import { AIType } from '../../genPrompt';
import { VertexAI } from '../../vertexai';
import { OpenAI } from '../../openai';
import { NamingEnum } from '@/lib/types/skeetaiTypes';
export declare const skeetNaming: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, namingEnum: NamingEnum) => Promise<string>;
