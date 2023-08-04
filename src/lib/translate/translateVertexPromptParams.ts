import { VertexPromptParams } from '../types/vertexaiTypes'
import { translate } from './translate'

export const translateVertexPromptParams = async (
  params: VertexPromptParams,
  target = 'en',
) => {
  try {
    params.context = await translate(params.context, target)
    params.examples = await Promise.all(
      params.examples.map(async (example) => {
        return {
          input: {
            content: await translate(example.input.content, target),
          },
          output: {
            content: await translate(example.output.content, target),
          },
        }
      }),
    )
    params.messages = await Promise.all(
      params.messages.map(async (message) => {
        return {
          author: message.author,
          content: await translate(message.content, target),
        }
      }),
    )
    return params
  } catch (error) {
    throw new Error(`translateVertexPromptParams error: ${error}`)
  }
}
