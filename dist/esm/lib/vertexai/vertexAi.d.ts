/**
 * `VertexAI` provides an interface to interact with Google's Vertex AI service.
 * This class simplifies the process of making predictions using Vertex AI, allowing
 * for easy configuration and prediction.
 *
 * Usage:
 * ```typescript
 * const vertexService = new VertexAI({
 *   projectId: 'your-project-id',
 *   location: 'your-location',
 *   // ... other options
 * });
 *
 * const prompt = {
 *   //... your prompt data
 * };
 *
 * const response = await vertexService.predict(prompt);
 * console.log(response);
 * ```
 *
 * @remarks
 * Make sure to set the appropriate environment variables or pass them as options to the constructor.
 *
 * @class
 */
/// <reference types="node" />
import { VertexAiOptions, VertexParameterParams, VertexPromptParams } from '../types/vertexaiTypes';
export declare class VertexAI {
    protected options: VertexAiOptions;
    protected vertexParams: VertexParameterParams;
    constructor(options?: VertexAiOptions);
    private parseFirebaseConfig;
    prompt(prompt: VertexPromptParams): Promise<string>;
    promptStream(this: VertexAI, prompt: VertexPromptParams): Promise<NodeJS.ReadableStream>;
    generateTitlePrompt(content: string, isJapanese?: boolean): Promise<VertexPromptParams>;
    private handleError;
    predictStream?(prompt: VertexPromptParams): Promise<NodeJS.ReadableStream>;
}
