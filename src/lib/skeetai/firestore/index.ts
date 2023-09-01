import { AIPrompt, AIType, generatePrompt } from '../../genPrompt'
import { VertexAI } from '../../vertexai'
import { OpenAI } from '../../openai'
import { OpenAIPromptParams, VertexPromptParams } from '../../types'
import { firestorePrompt } from './prompt'

export const skeetFirestore = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  try {
    const example = firestorePrompt()

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
    throw new Error(`skeetNaming: ${error}`)
  }
}
