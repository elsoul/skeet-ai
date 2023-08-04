/// <reference types="node" />
import { IncomingMessage } from 'http';
import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes';
export declare const openAiStream: (prompt: OpenAIPromptParams, options?: OpenAIOptions) => Promise<IncomingMessage>;
