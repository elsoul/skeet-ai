import { OpenAI } from '../openai';
import { VertexAI } from '../vertexai';
/**
 * Configuration options for initializing a SkeetAI instance.
 */
export interface SkeetAIOptions {
    /**
     * AI platform type (either 'VertexAI' or 'OpenAI'). Default is 'VertexAI'.
     */
    ai?: 'VertexAI' | 'OpenAI';
    /**
     * Model name to be used by the chosen AI platform. Defaults are 'chat-bison@001' for VertexAI and 'gpt-4' for OpenAI.
     */
    model?: string;
    /**
     * Maximum number of tokens to be returned in the response. Default is 1000.
     */
    maxTokens?: number;
    /**
     * Temperature parameter for the AI platform. Default is 0.2.
     * @see https://beta.openai.com/docs/api-reference/completions/create#temperature
     */
    temperature?: number;
}
export interface AIPromptable {
    prompt(input: string): Promise<any>;
}
/**
 * The main SkeetAI class for handling AI interactions.
 */
export declare class SkeetAI {
    ai: 'VertexAI' | 'OpenAI';
    model: string;
    maxTokens: number;
    temperature: number;
    private _initOptions;
    static readonly PRISMA_SCHEMA_PATH: string;
    aiInstance: VertexAI | OpenAI;
    /**
     * Creates an instance of SkeetAI.
     * @param options - Configuration options for initializing the SkeetAI.
     * @example
     * ```typescript
     * // Using default settings:
     * const defaultSkeet = new SkeetAI();
     *
     * // Specifying the AI platform and model:
     * const customSkeet = new SkeetAI({
     *   ai: 'OpenAI',
     *   model: 'gpt-4',
     *   maxTokens: 500
     * });
     * ```
     */
    constructor(options?: SkeetAIOptions);
    get initOptions(): SkeetAIOptions;
    prisma(content: string): Promise<string | undefined>;
    skeet(content: string): Promise<string>;
    uploadFile(filePath: string): Promise<import("openai/resources").FileObject | undefined>;
    createFineTuningJob(fileId: string, model?: string): Promise<import("openai/resources/fine-tuning").FineTuningJob | undefined>;
    showFineTuningJob(jobId: string): Promise<import("openai/resources/fine-tuning").FineTuningJob | undefined>;
    typedoc(content: string): Promise<string | undefined>;
    private handleError;
}
export default SkeetAI;
