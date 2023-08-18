import { Configuration, OpenAIApi } from 'openai'
import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes'
import * as dotenv from 'dotenv'
import { systemContentJA } from './sytemContexts'
import { IncomingMessage } from 'http'
import { randomChat } from './randomChat'

dotenv.config()

const organization = process.env.CHAT_GPT_ORG || ''
const apiKey = process.env.CHAT_GPT_KEY || ''

export class OpenAI {
  private options: OpenAIOptions

  constructor(options: OpenAIOptions = {}) {
    this.options = {
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.2,
      maxTokens: options.maxTokens || 256,
      topP: options.topP || 0.95,
      n: options.n || 1,
      stream: options.stream || false,
      organizationKey: options.organizationKey || organization,
      apiKey: options.apiKey || apiKey,
    }

    if (!this.options.organizationKey) {
      throw new Error(
        'Please set organizationKey in options or CHAT_GPT_ORG in your environment',
      )
    }
    if (!this.options.apiKey) {
      throw new Error(
        'Please set apiKey in options or CHAT_GPT_KEY in your environment',
      )
    }
  }

  async prompt(promptParams: OpenAIPromptParams): Promise<string> {
    try {
      const openaiConfig = {
        model: this.options.model!,
        temperature: this.options.temperature!,
        max_tokens: this.options.maxTokens!,
        top_p: this.options.topP!,
        n: this.options.n!,
        stream: this.options.stream!,
        messages: promptParams.messages,
      }

      const configuration = new Configuration({
        organization: this.options.organizationKey,
        apiKey: this.options.apiKey,
      })

      const openai = new OpenAIApi(configuration)
      const completion = await openai.createChatCompletion(openaiConfig)
      const result = completion.data.choices[0].message

      if (result === undefined) {
        throw new Error('openAi error: result is undefined')
      }

      return String(result.content)
    } catch (error) {
      console.error(`openAi error: ${error}`)
      process.exit(1)
    }
  }

  async chat(content: string): Promise<string> {
    try {
      const prompt: OpenAIPromptParams = randomChat(content)
      const response = await this.prompt(prompt)
      return response
    } catch (error) {
      throw new Error(`chat: ${error}`)
    }
  }

  async generateTitle(content: string): Promise<string> {
    try {
      const systemContent = systemContentJA
      const openAiPrompt: OpenAIPromptParams = {
        messages: [
          {
            role: 'system',
            content: systemContent,
          },
          {
            role: 'user',
            content,
          },
        ],
      }

      const result = await this.prompt(openAiPrompt)
      return result
    } catch (error) {
      throw new Error(`generateChatRoomTitle: ${error}`)
    }
  }

  async promptStream(prompt: OpenAIPromptParams): Promise<IncomingMessage> {
    try {
      const openaiConfig = {
        model: 'gpt-3.5-turbo',
        temperature: this.options.temperature!,
        max_tokens: this.options.maxTokens!,
        top_p: this.options.topP!,
        n: this.options.n!,
        stream: true,
        messages: prompt.messages,
      }

      if (!this.options.organizationKey)
        throw new Error(
          'Please set organizationKey in options parameter or CHAT_GPT_ORG in your environment',
        )

      if (!this.options.apiKey)
        throw new Error(
          'Please set apiKey in options parameter or CHAT_GPT_KEY in your environment',
        )

      const configuration = new Configuration({
        organization: this.options.organizationKey,
        apiKey: this.options.apiKey,
      })
      const openai = new OpenAIApi(configuration)
      const result = await openai.createChatCompletion(openaiConfig, {
        responseType: 'stream',
      })
      const stream = result.data as unknown as IncomingMessage
      return stream
    } catch (error) {
      throw new Error(`openAiStream error: ${error}`)
    }
  }
}
