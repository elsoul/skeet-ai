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
import { Logger } from '../logger'
dotenv.config()

const { PredictionServiceClient } = aiplatform.v1
const { helpers } = aiplatform
const project = process.env.GCLOUD_PROJECT || ''
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || ''
/**
 * This function is used to send a Vertex AI request to the server.

 * Example:
 * ```ts
import { vertexAi, VertexPromptParams } from '@skeet-framework/ai'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    examples: [
      {
        input: {
          content:
            'What is the Skeet framework and what benefits does it offer for app development?',
        },
        output: {
          content:
            'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Tell me about the Skeet framework.',
      },
    ],
  }

  const response = await vertexAi(prompt)
  console.log(response)
}

run()
 * ```
 * @remarks Both `options.projectId` and `options.location` are required, unless you have `GCLOUD_PROJECT` and `FIREBASE_CONFIG` set in your environment variables. Please note that values in options will override these environment variables.
 
 * e.g. `.env`
 * ```bash
 * GCLOUD_PROJECT="my-project-id"
 * FIREBASE_CONFIG='{ "locationId": "us-central1" }'
 * ```
 * @param prompt the message to send to the server.
 * ```ts
 * type VertexPromptParams {
 *  context: string
 *  examples: VertexExample[]
 *  messages: VertexMessage[]
 * }
 * 
 * type VertexExample {
 *  input: VertexParameterParams
 *  output: VertexParameterParams
 * }
 * 
 * type VertexParameterParams {
 *  content: string
 * }
 * ```
 * @param options the options to use when sending the request.
 * ```ts
 * type VertexAiOptions {
 *  projectId?: string
 *  location?: string
 *  apiEndpoint?: string
 *  model?: string
 *  publisher?: string
 *  isJapanese?: boolean
 * }
 * ```
 * @returns the response from the Vertex AI server.
 *
 */
export const vertexAi = async (
  prompt: VertexPromptParams,
  options: VertexAiOptions = {},
): Promise<string> => {
  try {
    if (!options.location) {
      try {
        const { locationId } = JSON.parse(FIREBASE_CONFIG)
        options.location = locationId
      } catch (error) {
        options.location = ''
      }
    }
    if (!options.isJapanese) options.isJapanese = false

    const endpointParams = {
      projectId: options.projectId || project,
      location: options.location,
      apiEndpoint:
        options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
      model: options.model || 'chat-bison@001',
      publisher: options.publisher || 'google',
    }
    if (endpointParams.projectId === '') {
      Logger.info(
        `⚠️ Please set projectId in options parameter or GCLOUD_PROJECT in your environment. \n\nexample:\n\n$ export GCLOUD_PROJECT="my-project-id"`,
      )
      return ''
    }

    if (endpointParams.location === '') {
      Logger.info(
        `Please set location in options parameter or FIREBASE_CONFIG in your environment. \n\nexample:\n\n$ export FIREBASE_CONFIG='{ "locationId": "us-central1" }'`,
      )
      return ''
    }

    const vertexParameterParams: VertexParameterParams = {
      temperature: options.temperature || 0.2,
      maxOutputTokens: options.maxOutputTokens || 256,
      topP: options.topP || 0.95,
      topK: options.topK || 40,
    }

    const clientOptions = {
      apiEndpoint: endpointParams.apiEndpoint,
    }
    const predictionServiceClient: any = new PredictionServiceClient(
      clientOptions,
    )
    const endpoint: string = `projects/${endpointParams.projectId}/locations/${endpointParams.location}/publishers/${endpointParams.publisher}/models/${endpointParams.model}`
    const instanceValue: any = options.isJapanese
      ? helpers.toValue(await translateVertexPromptParams(prompt))
      : helpers.toValue(prompt)

    const instances: any[] = [instanceValue]
    const parameters: any = helpers.toValue(vertexParameterParams)
    const request: any = {
      endpoint,
      instances,
      parameters,
    }

    // Predict request
    const [response] = await predictionServiceClient.predict(request)
    const predictions = options.isJapanese
      ? await translate(
          response.predictions[0].structValue.fields.candidates.listValue
            .values[0].structValue.fields.content.stringValue,
        )
      : response.predictions[0].structValue.fields.candidates.listValue
          .values[0].structValue.fields.content.stringValue

    return String(predictions)
  } catch (error: any) {
    try {
      if (typeof error === 'object') {
        const errorLog = String(error.details)
        if (errorLog.includes('Permission')) {
          Logger.info(
            `⚠️ Make sure if you login to your GCP project.\n\nexample:\n\n$ gcloud auth application-default login\n\nOr\n\n$ skeet iam ai \n\nTo activate service account.`,
          )
          return ''
        }
        throw new Error(`Error in vertexAi: ${inspect(error)}`)
      } else {
        throw new Error(`Error in vertexAi: ${inspect(error)}`)
      }
    } catch (error) {
      throw new Error(`Error in vertexAi: ${inspect(error)}`)
    }
  }
}
