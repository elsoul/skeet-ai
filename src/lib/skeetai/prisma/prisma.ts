import { OpenAI } from 'src/lib/openai/openAI'
import { VertexAI } from 'src/lib/vertexai'
import { prismaPrompt } from './prompt'
import { AIType, generatePrompt } from 'src/lib/genPrompt'
import { OpenAIPromptParams, VertexPromptParams } from 'src/lib/types'

export const skeetAiPrisma = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  try {
    const example = prismaPrompt()
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
    throw new Error(`skeetAiPrisma: ${error}`)
  }
}
