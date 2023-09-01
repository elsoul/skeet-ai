import { AIType } from '../../genPrompt';
import { OpenAI } from '../../openai';
import { VertexAI } from '../../vertexai';
export declare const showFineTuningJob: (jobId: string, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<import("openai/resources/fine-tuning").FineTuningJob | undefined>;
