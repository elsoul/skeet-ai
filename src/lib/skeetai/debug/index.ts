import { AIType, generatePrompt } from '@/lib/genPrompt'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '@/lib/types'
import { debugPrompt } from './prompt'
import { readFileSync } from 'fs'

export const skeetDebug = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
  debugFile: string,
) => {
  try {
    const tsconfigJson = readFileSync('tsconfig.json', 'utf8')
    const packageJson = readFileSync('package.json', 'utf8')

    const debugFileContent = readFileSync(debugFile, 'utf8')
    const example = debugPrompt(tsconfigJson, packageJson, debugFileContent)

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
    throw new Error(`skeetDebug: ${error}`)
  }
}
