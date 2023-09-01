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
 * @example
 * VertexAI
 * ```typescript
 * import { VertexAI } from '@skeet-framework/ai'
 *
 * const vertexAi = new VertexAI()
 * const result = await vertexAi.chat('Hello')
 * console.log(result)
 * ```
 *
 * OpenAI
 * ```typescript
 * import { OpenAI } from '@skeet-framework/ai'
 *
 * const openAi = new OpenAI()
 * const result = await openAi.chat('Hello')
 * console.log(result)
 * ```
 */
/// <reference types="node" />
import { VertexAiOptions, VertexParameterParams, VertexPromptParams } from '../types/vertexaiTypes';
import { AIPromptable } from '@/lib/skeetai';
export declare class VertexAI implements AIPromptable {
    protected options: VertexAiOptions;
    protected vertexParams: VertexParameterParams;
    constructor(options?: VertexAiOptions);
    private initializeOptions;
    private initializeVertexParams;
    private getEndpoint;
    prompt(prompt: any): Promise<string>;
    promptStream(prompt: any): Promise<import("stream").Readable>;
    chat(content: string): Promise<string>;
    private validateOptions;
    private preparePredictRequest;
    private processPredictions;
    generateTitlePrompt(content: string, isJapanese?: boolean): Promise<VertexPromptParams>;
    private handleError;
}
