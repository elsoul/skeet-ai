import { AIType, generatePrompt } from '../../genPrompt'
import { VertexAI } from '../../vertexai'
import { OpenAI } from '../../openai'
import { OpenAIPromptParams, VertexPromptParams } from '../../types'
import { markdownTranslatePrompt, jsonTranslatePrompt } from './prompt'

export const translateDocument = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
  mode: 'markdown' | 'json',
) => {
  try {
    const example =
      mode === 'markdown' ? markdownTranslatePrompt() : jsonTranslatePrompt()

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
    throw new Error(`skeetDocument: ${error}`)
  }
}
