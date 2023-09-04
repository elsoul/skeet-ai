import { typescriptFunctionPrompt } from './prompt'
import { commonPrompt } from '../commonPrompt'
import SkeetAI from '@/lib/skeetai'

export const skeetFunction = async (
  content: string,
  skeetAi: SkeetAI,
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingFunctions: string,
  existingModels: string,
) => {
  try {
    const example = typescriptFunctionPrompt(
      tsconfig,
      packageJson,
      prettierrc,
      existingFunctions,
      existingModels,
    )
    const result = await commonPrompt(
      example,
      content,
      skeetAi.ai,
      skeetAi.aiInstance,
    )
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
