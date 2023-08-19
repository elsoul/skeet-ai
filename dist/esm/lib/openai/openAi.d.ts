/// <reference types="node" />
import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes';
import { IncomingMessage } from 'http';
import { AIPromptable } from '../skeetai';
export declare class OpenAI implements AIPromptable {
    private options;
    constructor(options?: OpenAIOptions);
    prompt(promptParams: any): Promise<string>;
    chat(content: string): Promise<string>;
    generateTitle(content: string): Promise<string>;
    promptStream(prompt: OpenAIPromptParams): Promise<IncomingMessage>;
}
