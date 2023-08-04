import { VertexAiOptions, VertexPromptParams } from '../types/vertexaiTypes';
import { IncomingMessage } from 'http';
export declare const vertexAiStream: (prompt: VertexPromptParams, options?: VertexAiOptions) => Promise<IncomingMessage>;
