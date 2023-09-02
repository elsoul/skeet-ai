import { AIType } from '@/lib/genPrompt'
import { functionPrompt } from './prompt'
import { commonPrompt } from '../commonPrompt'
import { AiInstance } from '@/lib/types/skeetaiTypes'

export const skeetFunction = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
) => {
  try {
    const example = functionPrompt()
    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
