/// <reference types="node" />
import { IncomingMessage } from 'http';
import { OpenAIOptions, OpenAIPromptParams } from '@/lib/types/openaiTypes';
export declare const openAiStream: (prompt: OpenAIPromptParams, options?: OpenAIOptions) => Promise<IncomingMessage>;
