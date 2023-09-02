import { AIPrompt, AIType } from '@/lib/genPrompt'
import {
  migrationNamingPrompt,
  functionNamingPrompt,
  modelNamingPrompt,
} from './prompt'
import { AiInstance, NamingEnum } from '@/lib/types/skeetaiTypes'
import { commonPrompt } from '../commonPrompt'

export const skeetNaming = async (
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
  namingEnum: NamingEnum,
) => {
  try {
    let example: AIPrompt = { context: '', examples: [] }
    if (namingEnum === NamingEnum.MIGRATION) {
      example = migrationNamingPrompt
    } else if (namingEnum === NamingEnum.FUNCTION) {
      example = functionNamingPrompt
    } else if (namingEnum === NamingEnum.MODEL) {
      example = modelNamingPrompt()
    }

    const result = await commonPrompt(example, content, thisAi, thisAiInstance)
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
