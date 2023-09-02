import { AIType } from '@/lib/genPrompt'
import { typedocPrompt } from './prompt'
import { commonPrompt } from '../commonPrompt'
import { AiInstance } from '@/lib/types/skeetaiTypes'

export const skeetGenTypedoc = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
) => {
  try {
    const example = typedocPrompt()
    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetPrompt: ${error}`)
  }
}
