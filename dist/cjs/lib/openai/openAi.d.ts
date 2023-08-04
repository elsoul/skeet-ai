import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes';
export declare const openAi: (prompt: OpenAIPromptParams, options?: OpenAIOptions) => Promise<import("openai").ChatCompletionResponseMessage | undefined>;
