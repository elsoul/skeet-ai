import { AIType } from '../../genPrompt'
import * as dotenv from 'dotenv'
import { OpenAI } from '../../openai'
import { VertexAI } from '../../vertexai'
dotenv.config()

export const showFineTuningJob = async (
  jobId: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  if (thisAi === 'VertexAI') {
    console.log(`Coming soon...`)
    return
  } else {
    const openai = thisAiInstance as OpenAI
    const fineTune = await openai.showFineTuningJob(jobId)

    console.log(fineTune)
    return fineTune
  }
}
