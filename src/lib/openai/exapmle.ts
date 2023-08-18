import { readFileSync } from 'fs'
import { OpenAIPromptParams } from '../types/openaiTypes'
import { OpenAI } from './openAI'
import { generatePrompt } from '../genPrompt'
const exampleJosn = JSON.parse(
  readFileSync('./src/lib/examplePrompt.json', 'utf8'),
)

const run = async () => {
  const content = 'Tell me about the Skeet framework.'
  const prompt = generatePrompt(
    exampleJosn.context,
    exampleJosn.examples,
    content,
    'OpenAI',
  ) as OpenAIPromptParams
  const openAi = new OpenAI()
  const result = await openAi.prompt(prompt)

  console.log(JSON.stringify(result, null, 2))
  console.log('Question:\n', prompt.messages[3].content)
  console.log('\nAnswer:\n', result)
  const content2 =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const title = await openAi.generateTitle(content2)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
}

run()
