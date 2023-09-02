import { AIType } from '@/lib/genPrompt'
import { debugPrompt } from './prompt'
import { readFileSync } from 'fs'
import { commonPrompt } from '../commonPrompt'
import { AiInstance } from '@/lib/types/skeetaiTypes'

export const skeetDebug = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
  debugFile: string,
) => {
  try {
    const tsconfigJson = readFileSync('tsconfig.json', 'utf8')
    const packageJson = readFileSync('package.json', 'utf8')

    const debugFileContent = readFileSync(debugFile, 'utf8')
    const example = debugPrompt(tsconfigJson, packageJson, debugFileContent)
    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetDebug: ${error}`)
  }
}
