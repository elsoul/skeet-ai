import { OpenAI } from '../openai'
import { VertexAI } from '../vertexai'
import {
  createFineTuningJob,
  showFineTuningJob,
  uploadJsonlFile,
} from './fineTune'
import { skeetAiPrisma } from './prisma/prisma'
import { skeetPrompt } from './skeet'
import * as dotenv from 'dotenv'
dotenv.config()

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
        apiKey: process.env.CHAT_GPT_KEY || '',
        organizationKey: process.env.CHAT_GPT_ORG || '',
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

  async skeet(content: string) {
    try {
      return await skeetPrompt(content, this.ai, this.aiInstance)
    } catch (error: any) {
      throw new Error(`skeet: ${error}`)
    }
  }

  async uploadFile(filePath: string) {
    try {
      return await uploadJsonlFile(filePath, this.ai, this.aiInstance)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async createFineTuningJob(fileId: string, model = 'gpt-3.5-turbo-0613') {
    try {
      return await createFineTuningJob(fileId, model, this.ai, this.aiInstance)
    } catch (error) {
      this.handleError(error)
    }
  }

  async showFineTuningJob(jobId: string) {
    try {
      return await showFineTuningJob(jobId, this.ai, this.aiInstance)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: any) {
    console.error('Error:', error)
  }
}

export default SkeetAI
