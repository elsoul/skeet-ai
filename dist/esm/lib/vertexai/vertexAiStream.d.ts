/// <reference types="node" />
import { VertexAiOptions, VertexPromptParams } from '../types/vertexaiTypes';
export declare const vertexAiStream: (prompt: VertexPromptParams, options?: VertexAiOptions) => Promise<import("fs").ReadStream>;
