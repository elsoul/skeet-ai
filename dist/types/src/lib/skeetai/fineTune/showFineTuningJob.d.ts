import { AIType } from '@/lib/genPrompt';
import { OpenAI } from '@/lib/openai';
import { VertexAI } from '@/lib/vertexai';
export declare const showFineTuningJob: (jobId: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<import("openai/resources/fine-tuning").FineTuningJob | undefined>;
