import { AIType, generatePrompt } from '../../../lib/genPrompt'
import { VertexAI } from '../../../lib/vertexai'
import { OpenAI } from '../../../lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '../../../lib/types'
import { typedocPrompt } from './prompt'

export const skeetGenTypedoc = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  try {
    const example = typedocPrompt()

    const prompt = generatePrompt(
      example.context,
      example.examples,
      content,
      thisAi,
    )

    if (thisAi === 'VertexAI') {
      const aiInstance = thisAiInstance as VertexAI
      return await aiInstance.prompt(prompt as VertexPromptParams)
    } else {
      const aiInstance = thisAiInstance as OpenAI
      return await aiInstance.prompt(prompt as OpenAIPromptParams)
    }
  } catch (error) {
    throw new Error(`skeetPrompt: ${error}`)
  }
}
