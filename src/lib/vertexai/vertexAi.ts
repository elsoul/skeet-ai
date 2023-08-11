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
 */

import * as aiplatform from '@google-cloud/aiplatform'
import * as dotenv from 'dotenv'
import { inspect } from 'util'
import {
  VertexAiOptions,
  VertexParameterParams,
  VertexPromptParams,
} from '../types/vertexaiTypes'
import { translateVertexPromptParams } from '../translate/translateVertexPromptParams'
import { translate } from '../translate'
import { ReadStream, createReadStream } from 'fs'
import { Readable } from 'stream'
import { DelayedStream } from './delayedStream'

dotenv.config()

const { PredictionServiceClient } = aiplatform.v1
const { helpers } = aiplatform

export class VertexAI {
  protected options: VertexAiOptions
  protected vertexParams: VertexParameterParams

  constructor(options: VertexAiOptions = {}) {
    const defaultConfig = this.parseFirebaseConfig()

    this.options = {
      projectId: options.projectId || process.env.GCLOUD_PROJECT || '',
      location: options.location || defaultConfig.locationId || '',
      apiEndpoint:
        options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
      model: options.model || 'chat-bison@001',
      publisher: options.publisher || 'google',
      isJapanese: options.isJapanese || false,
      delay: options.delay || 200,
    }

    this.vertexParams = {
      temperature: options.temperature || 0.2,
      maxOutputTokens: options.maxOutputTokens || 256,
      topP: options.topP || 0.95,
      topK: options.topK || 40,
    }
  }

  private parseFirebaseConfig() {
    try {
      return JSON.parse(process.env.FIREBASE_CONFIG || '')
    } catch (error) {
      return {}
    }
  }

  async prompt(prompt: VertexPromptParams): Promise<string> {
    try {
      if (!this.options.projectId) {
        console.log(
          `⚠️ Please set projectId in options parameter or GCLOUD_PROJECT in your environment.`,
        )
        return ''
      }

      if (!this.options.location) {
        console.log(
          `Please set location in options parameter or FIREBASE_CONFIG in your environment.`,
        )
        return ''
      }

      const clientOptions = {
        apiEndpoint: this.options.apiEndpoint,
      }
      const predictionServiceClient: any = new PredictionServiceClient(
        clientOptions,
      )
      const endpoint: string = `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`
      const instanceValue: any = this.options.isJapanese
        ? helpers.toValue(await translateVertexPromptParams(prompt))
        : helpers.toValue(prompt)

      const instances: any[] = [instanceValue]
      const parameters: any = helpers.toValue(this.vertexParams)

      const request: any = {
        endpoint,
        instances,
        parameters,
      }

      // Predict request
      const [response] = await predictionServiceClient.predict(request)
      const predictions = this.options.isJapanese
        ? await translate(
            response.predictions[0].structValue.fields.candidates.listValue
              .values[0].structValue.fields.content.stringValue,
          )
        : response.predictions[0].structValue.fields.candidates.listValue
            .values[0].structValue.fields.content.stringValue

      return String(predictions)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async promptStream(
    this: VertexAI,
    prompt: VertexPromptParams,
  ): Promise<NodeJS.ReadableStream> {
    try {
      if (!this.options.projectId) {
        throw new Error(
          'Please set projectId in options parameter or GCLOUD_PROJECT in your environment',
        )
      }
      if (!this.options.location) {
        throw new Error(
          'Please set location in options parameter or FIREBASE_CONFIG in your environment',
        )
      }

      const clientOptions = {
        apiEndpoint: this.options.apiEndpoint,
      }
      const predictionServiceClient: any =
        new aiplatform.PredictionServiceClient(clientOptions)
      const endpoint: string = `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`
      const instanceValue: any = this.options.isJapanese
        ? aiplatform.helpers.toValue(await translateVertexPromptParams(prompt))
        : aiplatform.helpers.toValue(prompt)

      const instances: any[] = [instanceValue]
      const parameters: any = aiplatform.helpers.toValue(this.vertexParams)

      const request: any = {
        endpoint,
        instances,
        parameters,
      }

      // Predict request
      const [response] = await predictionServiceClient.predict(request)
      const predictions: string = this.options.isJapanese
        ? await translate(
            response.predictions[0].structValue.fields.candidates.listValue
              .values[0].structValue.fields.content.stringValue,
          )
        : response.predictions[0].structValue.fields.candidates.listValue
            .values[0].structValue.fields.content.stringValue
      const chunkSize = 1
      const chunks = []

      for (let i = 0; i < predictions.length; i += chunkSize) {
        chunks.push(predictions.substring(i, i + chunkSize))
      }

      const stream = new DelayedStream(chunks, this.options.delay!)
      return stream
    } catch (error) {
      throw new Error(`Error in predictStream: ${error}`)
    }
  }

  async generateTitlePrompt(content: string, isJapanese = false) {
    const res: VertexPromptParams = isJapanese
      ? promptTitleGenerationJa(content)
      : {
          context:
            "Give a title to the content of the message coming from the user. The maximum number of characters for the title is 50 characters. Please make the title as short and descriptive as possible. Do not ask users questions in interrogative sentences. Be sure to respond with only the title. Don't answer questions from users.",
          examples: [
            {
              input: {
                content: 'I want to start learning Javascript',
              },
              output: {
                content: 'How to start learning Javascript',
              },
            },
            {
              input: {
                content:
                  'Can you write the code to create the file in Javascript?',
              },
              output: {
                content: 'How to create a file with JavaScript',
              },
            },
          ],
          messages: [
            {
              author: 'user',
              content,
            },
          ],
        }
    return res
  }

  private handleError(error: any): never {
    if (
      typeof error === 'object' &&
      String(error.details).includes('Permission')
    ) {
      console.log(`⚠️ Make sure if you login to your GCP project.`)
    }
    throw new Error(`Error in vertexAi: ${inspect(error)}`)
  }
  predictStream?(prompt: VertexPromptParams): Promise<NodeJS.ReadableStream>
}

const promptTitleGenerationJa = (content: string) => {
  const res: VertexPromptParams = {
    context:
      'ユーザーから来るメッセージの内容にタイトルをつけます。タイトルの文字数は最大で50文字です。できるだけ短くわかりやすいタイトルをつけてください。疑問文でユーザーには質問しないでください。必ずタイトルのみをレスポンスしてください。ユーザーから来る質問には答えてはいけません。以下にいくつかの例を示します。絶対にユーザーの質問に答えてはいけません。すべて英語でメッセージが来た場合は英語のタイトルを付けてください。',
    examples: [
      {
        input: {
          content: 'Javascriptの勉強を始めたいのですが、どうすればいいですか?',
        },
        output: {
          content: 'Javascriptの勉強の始め方',
        },
      },
      {
        input: {
          content: 'Javascriptでファイルを作成するコードを書いてくれますか?',
        },
        output: {
          content: 'JavaScriptでファイルを作成する方法',
        },
      },
      {
        input: {
          content: '今日も1日がんばるぞ!',
        },
        output: {
          content: '気合表明',
        },
      },
      {
        input: {
          content: 'あなたの今日の予定は？',
        },
        output: {
          content: '今日の予定',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content,
      },
    ],
  }
  return res
}
