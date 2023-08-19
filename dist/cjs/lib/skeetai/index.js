"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeetAI = void 0;
const openai_1 = require("../openai");
const vertexai_1 = require("../vertexai");
const prisma_1 = require("./prisma/prisma");
const skeet_1 = require("./skeet");
/**
 * The main SkeetAI class for handling AI interactions.
 */
class SkeetAI {
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
            this.aiInstance = new vertexai_1.VertexAI({
                model: this.model,
                maxOutputTokens: this.maxTokens,
            });
        }
        else {
            this.aiInstance = new openai_1.OpenAI({
                model: this.model,
                maxTokens: this.maxTokens,
            });
        }
    }
    async prisma(content) {
        try {
            return await (0, prisma_1.skeetAiPrisma)(content, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async skeet(content) {
        try {
            return await (0, skeet_1.skeetPrompt)(content, this.ai, this.aiInstance);
        }
        catch (error) {
            throw new Error(`skeet: ${error}`);
        }
    }
    handleError(error) {
        console.error('Error:', error);
    }
}
exports.SkeetAI = SkeetAI;
SkeetAI.PRISMA_SCHEMA_PATH = './graphql/prisma/schema.prisma';
exports.default = SkeetAI;
//# sourceMappingURL=index.js.map