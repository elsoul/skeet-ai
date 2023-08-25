import { AIType, generatePrompt } from '../../genPrompt'
import OpenAI from 'openai'
import { createReadStream } from 'fs'

export const uploadFile = async (filePath: string, thisAi: AIType) => {
  try {
    if (thisAi === 'VertexAI') {
      console.log(`Coming soon...`)
      return
    } else {
      const openai = new OpenAI()
      return await openai.files.create({
        file: createReadStream(filePath),
        purpose: 'fine-tune',
      })
    }
  } catch (error) {
    throw new Error(`uploadFile: ${error}`)
  }
}
