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
 * FIREBASE_CONFIG={ "locationId": "us-central1" }
 * ```
 * @param prompt the message to send to the server.
 * @param options the options to use when sending the request.
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
    if (endpointParams.projectId === '')
      throw new Error(
        'Please set projectId in options parameter or GCLOUD_PROJECT in your environment',
      )
    if (endpointParams.location === '')
      throw new Error(
        'Please set location in options parameter \nor FIREBASE_CONFIG in your environment. e.g. { "locationId": "us-central1" }',
      )

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
    const predictions: string = options.isJapanese
      ? await translate(
          response.predictions[0].structValue.fields.candidates.listValue
            .values[0].structValue.fields.content.stringValue,
        )
      : response.predictions[0].structValue.fields.candidates.listValue
          .values[0].structValue.fields.content.stringValue
    return predictions
  } catch (error) {
    throw new Error(`Error in vertexAi: ${inspect(error)}`)
  }
}
