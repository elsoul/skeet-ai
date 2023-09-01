import { OpenAI as OpenAIApi } from 'openai';
import { OpenAIOptions, OpenAIPromptParams } from '@/lib/types/openaiTypes';
import { AIPromptable } from '@/lib/skeetai';
import { Stream } from 'openai/streaming';
export declare class OpenAI implements AIPromptable {
    private options;
    aiInstance: OpenAIApi;
    constructor(options?: OpenAIOptions);
    prompt(promptParams: any): Promise<string>;
    chat(content: string): Promise<string>;
    generateTitle(content: string): Promise<string>;
    promptStream(prompt: OpenAIPromptParams): Promise<Stream<OpenAIApi.Chat.Completions.ChatCompletionChunk>>;
    uploadFile(filePath: string): Promise<OpenAIApi.Files.FileObject>;
    createFineTuningJob(fileId: string, model?: string): Promise<OpenAIApi.FineTuning.Jobs.FineTuningJob>;
    showFineTuningJob(jobId: string): Promise<OpenAIApi.FineTuning.Jobs.FineTuningJob>;
}
