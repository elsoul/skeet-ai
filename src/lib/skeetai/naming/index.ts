import { AIPrompt, AIType, generatePrompt } from '@/lib/genPrompt'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '@/lib/types'
import {
  migrationNamingPrompt,
  functionNamingPrompt,
  modelNamingPrompt,
} from './prompt'
import { NamingEnum } from '@/lib/types/skeetaiTypes'

export const skeetNaming = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
  namingEnum: NamingEnum,
) => {
  try {
    let example: AIPrompt = { context: '', examples: [] }
    if (namingEnum === NamingEnum.MIGRATION) {
      example = migrationNamingPrompt
    } else if (namingEnum === NamingEnum.FUNCTION) {
      example = functionNamingPrompt
    } else if (namingEnum === NamingEnum.MODEL) {
      example = modelNamingPrompt
    }

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
