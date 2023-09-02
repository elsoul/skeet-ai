import { AIType } from '@/lib/genPrompt'
import { commonPrompt } from '../commonPrompt'
import { firestorePrompt } from './prompt'
import { AiInstance } from '@/lib/types/skeetaiTypes'

export const skeetFirestore = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
) => {
  try {
    const example = firestorePrompt()

    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
