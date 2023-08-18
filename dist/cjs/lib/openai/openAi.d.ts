/// <reference types="node" />
import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes';
import { IncomingMessage } from 'http';
export declare class OpenAI {
    private options;
    constructor(options?: OpenAIOptions);
    prompt(promptParams: OpenAIPromptParams): Promise<string>;
    chat(content: string): Promise<string>;
    generateTitle(content: string): Promise<string>;
    promptStream(prompt: OpenAIPromptParams): Promise<IncomingMessage>;
}
