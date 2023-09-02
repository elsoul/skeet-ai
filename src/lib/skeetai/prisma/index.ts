import { prismaPrompt } from './prompt'
import { AIType } from '@/lib/genPrompt'
import { commonPrompt } from '../commonPrompt'
import { AiInstance } from '@/lib/types/skeetaiTypes'

export const skeetAiPrisma = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
) => {
  try {
    const example = prismaPrompt()
    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetAiPrisma: ${error}`)
  }
}
