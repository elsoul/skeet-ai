import { OpenAI as OpenAIApi } from 'openai'
import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes'
import { systemContentJA } from './sytemContexts'
import { randomChat } from './randomChat'
import { AIPromptable } from '../skeetai'
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat'
import { Stream } from 'openai/streaming'
import * as dotenv from 'dotenv'
dotenv.config()

const organization = process.env.CHAT_GPT_ORG || ''
const apiKey = process.env.CHAT_GPT_KEY || ''

export class OpenAI implements AIPromptable {
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
      console.log(
        'Please set organizationKey in options or CHAT_GPT_ORG in your environment',
      )
      return
    }
    if (!this.options.apiKey) {
      console.log(
        'Please set apiKey in options or CHAT_GPT_KEY in your environment',
      )
      return
    }
  }

  async prompt(promptParams: any): Promise<string> {
    try {
      const openaiConfig = {
        model: this.options.model!,
        temperature: this.options.temperature!,
        max_tokens: this.options.maxTokens!,
        top_p: this.options.topP!,
        n: this.options.n!,
        stream: false,
        messages: promptParams.messages,
      }

      const openai = new OpenAIApi({
        apiKey: this.options.apiKey,
        organization: this.options.organizationKey,
      })
      const completion = (await openai.chat.completions.create(
        openaiConfig,
      )) as ChatCompletion
      const result = completion.choices[0].message

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

  async promptStream(prompt: OpenAIPromptParams) {
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

      const openai = new OpenAIApi({ apiKey: this.options.apiKey })
      const stream = (await openai.chat.completions.create(
        openaiConfig,
      )) as Stream<ChatCompletionChunk>
      return stream
    } catch (error) {
      throw new Error(`openAiStream error: ${error}`)
    }
  }
}
