import { AIType } from '@/lib/genPrompt';
import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
import { NamingEnum } from '../../../lib/types/skeetaiTypes';
export declare const skeetNaming: (content: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI, namingEnum: NamingEnum) => Promise<string>;
