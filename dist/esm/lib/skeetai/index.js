import { OpenAI } from '../openai';
import { VertexAI } from '../vertexai';
import { createFineTuningJob, showFineTuningJob, uploadJsonlFile, } from './fineTune';
import { skeetAiPrisma } from './prisma/prisma';
import { skeetPrompt } from './skeet';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * The main SkeetAI class for handling AI interactions.
 */
export class SkeetAI {
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
    constructor(options = {}) {
        this.ai = options.ai || 'VertexAI';
        this.model =
            options.model || (this.ai === 'VertexAI' ? 'chat-bison@001' : 'gpt-4');
        this.maxTokens = options.maxTokens || 1000;
        if (this.ai === 'VertexAI') {
            this.aiInstance = new VertexAI({
                model: this.model,
                maxOutputTokens: this.maxTokens,
            });
        }
        else {
            this.aiInstance = new OpenAI({
                model: this.model,
                maxTokens: this.maxTokens,
                apiKey: process.env.CHAT_GPT_KEY || '',
                organizationKey: process.env.CHAT_GPT_ORG || '',
            });
        }
    }
    async prisma(content) {
        try {
            return await skeetAiPrisma(content, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async skeet(content) {
        try {
            return await skeetPrompt(content, this.ai, this.aiInstance);
        }
        catch (error) {
            throw new Error(`skeet: ${error}`);
        }
    }
    async uploadFile(filePath) {
        try {
            return await uploadJsonlFile(filePath, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async createFineTuningJob(fileId, model = 'gpt-3.5-turbo-0613') {
        try {
            return await createFineTuningJob(fileId, model, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async showFineTuningJob(jobId) {
        try {
            return await showFineTuningJob(jobId, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        console.error('Error:', error);
    }
}
SkeetAI.PRISMA_SCHEMA_PATH = './graphql/prisma/schema.prisma';
export default SkeetAI;
//# sourceMappingURL=index.js.map