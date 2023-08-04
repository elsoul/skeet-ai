import { OpenAIPromptParams } from '../types/openaiTypes'
import { openAi } from './openAi'

const run = async () => {
  const prompt: OpenAIPromptParams = {
    messages: [
      {
        role: 'system',
        content:
          'You are a human. The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.',
      },
      {
        role: 'user',
        content: 'Hello, who are you?',
      },
    ],
  }
  const result = await openAi(prompt)
  console.log(result)
}

run()
