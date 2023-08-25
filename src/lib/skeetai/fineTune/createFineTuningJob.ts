import { AIType } from '../../genPrompt'
import * as dotenv from 'dotenv'
import { OpenAI } from '../../openai'
import { VertexAI } from '../../vertexai'
dotenv.config()

export const createFineTuningJob = async (
  uploadFileId: string,
  model = 'gpt-3.5-turbo-0613',
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  if (thisAi === 'VertexAI') {
    console.log(`Coming soon...`)
    return
  } else {
    const openai = thisAiInstance as OpenAI
    const fineTune = await openai.createFineTuningJob(uploadFileId, model)

    console.log(fineTune)
    return fineTune
  }
}
