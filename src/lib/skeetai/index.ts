import { OpenAI } from '../openai'
import { VertexAI } from '../vertexai'
import { skeetAiPrisma } from './prisma/prisma'

/**
 * Configuration options for initializing a SkeetAI instance.
 */
interface SkeetAIOptions {
  /**
   * AI platform type (either 'VertexAI' or 'OpenAI'). Default is 'VertexAI'.
   */
  ai?: 'VertexAI' | 'OpenAI'

  /**
   * Model name to be used by the chosen AI platform. Defaults are 'chat-bison@001' for VertexAI and 'gpt-4' for OpenAI.
   */
  model?: string

  /**
   * Maximum number of tokens to be returned in the response. Default is 1000.
   */
  maxTokens?: number
}

export interface AIPromptable {
  prompt(input: string): Promise<any>
}

/**
 * The main SkeetAI class for handling AI interactions.
 */
export class SkeetAI {
  ai: 'VertexAI' | 'OpenAI'
  model: string
  maxTokens: number

  static readonly PRISMA_SCHEMA_PATH: string = './graphql/prisma/schema.prisma'
  aiInstance: VertexAI | OpenAI

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
  constructor(options: SkeetAIOptions = {}) {
    this.ai = options.ai || 'VertexAI'
    this.model =
      options.model || (this.ai === 'VertexAI' ? 'chat-bison@001' : 'gpt-4')
    this.maxTokens = options.maxTokens || 1000

    if (this.ai === 'VertexAI') {
      this.aiInstance = new VertexAI({
        model: this.model,
        maxOutputTokens: this.maxTokens,
      })
    } else {
      this.aiInstance = new OpenAI({
        model: this.model,
        maxTokens: this.maxTokens,
      })
    }
  }

  async prisma(content: string) {
    try {
      return await skeetAiPrisma(content, this.ai, this.aiInstance)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private handleError(error: any) {
    console.error('Error:', error)
  }
}

export default SkeetAI
