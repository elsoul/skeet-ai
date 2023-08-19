import { AIType, generatePrompt } from '../../../lib/genPrompt'
import { readFileSync } from 'fs'
import { VertexAI } from '../../../lib/vertexai'
import { OpenAI } from '../../../lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '../../../lib/types'

export const skeetPrompt = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  try {
    const json = JSON.parse(
      readFileSync(`${__dirname}/examples/skeetExamples.json`, 'utf8'),
    )

    const prompt = generatePrompt(json.context, json.examples, content, thisAi)

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
