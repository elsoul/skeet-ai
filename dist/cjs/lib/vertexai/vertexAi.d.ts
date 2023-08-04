import { VertexAiOptions, VertexPromptParams } from '../types/vertexaiTypes';
/**
 * This function is used to send a Vertex AI request to the server.

 * Example:
 * ```ts
import { VertexPromptParams } from '../types/vertexaiTypes'
import { vertexAi } from './vertexAi'

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
export declare const vertexAi: (prompt: VertexPromptParams, options?: VertexAiOptions) => Promise<string>;
