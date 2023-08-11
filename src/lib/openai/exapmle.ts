import { OpenAIPromptParams } from '../types/openaiTypes'
import { OpenAI } from './openAI'

const run = async () => {
  const prompt: OpenAIPromptParams = {
    messages: [
      {
        role: 'system',
        content:
          'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
      },
      {
        role: 'user',
        content:
          'What is the Skeet framework and what benefits does it offer for app development?',
      },
      {
        role: 'assistant',
        content:
          'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
      },
      {
        role: 'user',
        content: 'Tell me about the Skeet framework.',
      },
    ],
  }
  const openAi = new OpenAI()
  const result = await openAi.prompt(prompt)
  console.log('Question:\n', prompt.messages[3].content)
  console.log('\nAnswer:\n', result)
  const content =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const title = await openAi.generateTitle(content)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
}

run()
