import { AIType } from '../../genPrompt';
import { OpenAI } from '../../openai';
import { VertexAI } from '../../vertexai';
export declare const createFineTuningJob: (uploadFileId: string, model: string | undefined, thisAi: AIType, thisAiInstance: VertexAI | OpenAI) => Promise<import("openai/resources/fine-tuning").FineTuningJob | undefined>;
