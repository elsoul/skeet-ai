import aiplatform from '@google-cloud/aiplatform'
export { aiplatform }
import * as openai from 'openai'
import SkeetAI from './lib/skeetai'
export { openai }
export * from './lib/types/vertexaiTypes'
export * from './lib/types/openaiTypes'
export { OpenAI } from './lib/openai'
export { VertexAI } from './lib/vertexai'
export { translate } from './lib/translate'
export { generatePrompt } from './lib/genPrompt'
export { SkeetAI } from './lib/skeetai'

const run = async () => {
  const ai = new SkeetAI({ ai: 'OpenAI' })
  const res = await ai.prisma('I need to make app for hair salon.')
  console.log(res)
}
run()
