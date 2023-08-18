import { OpenAI } from '../openai';
import { VertexAI } from '../vertexai';
import { skeetAiPrisma } from './prisma/prisma';
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
    handleError(error) {
        console.error('Error:', error);
    }
}
SkeetAI.PRISMA_SCHEMA_PATH = './graphql/prisma/schema.prisma';
export default SkeetAI;
//# sourceMappingURL=index.js.map