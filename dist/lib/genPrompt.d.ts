import { OpenAIPromptParams, VertexPromptParams } from './types';
/**
 * Represents the AI platforms supported by the generatePrompt function.
 */
export type AIType = 'VertexAI' | 'OpenAI';
/**
 * Represents an example consisting of input and output content.
 */
export type AIExample = {
    /**
     * The input content for the AI platform.
     */
    input: string;
    /**
     * The expected output content from the AI platform.
     */
    output: string;
};
/**
 * Represents the structure of the AI prompt which includes context and examples.
 */
export interface AIPrompt {
    /**
     * The context or background information for the AI prompt.
     */
    context: string;
    /**
     * An array of examples, each consisting of input and output pairs.
     */
    examples: AIExample[];
}
export declare function generatePrompt(context: string, examples: AIExample[], content: string, ai: AIType): VertexPromptParams | OpenAIPromptParams;
export declare const migrationPrompt: {
    context: string;
    examples: {
        input: string;
        output: string;
    }[];
};
export declare const namingPrompt: {
    context: string;
    examples: {
        input: string;
        output: string;
    }[];
};
