import { VertexPromptParams } from '../types/vertexaiTypes'
import { VertexAI } from './vertexAI'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'あなたは、Web アプリケーションを構築するためのフレームワークである Skeet フレームワークに精通している開発者です。',
    examples: [
      {
        input: {
          content:
            'Skeet フレームワークとは何ですか?また、それがアプリ開発にどのようなメリットをもたらしますか?',
        },
        output: {
          content:
            'Skeet フレームワークは、アプリケーションの開発および運用コストを削減することを目的とした、オープンソースのフルスタック アプリケーション開発ソリューションです。これにより、開発者はインフラストラクチャについて心配する必要がなくなり、アプリケーション ロジックに集中できるようになります。このフレームワークは、SQL と NoSQL を組み合わせて構築できます。',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Skeet フレームワークについて教えてください。',
      },
    ],
  }

  const options = {
    isJapanese: true,
  }
  const vertexAi = new VertexAI(options)
  const stream = await vertexAi.promptStream(prompt)
  console.log('AIへの質問:\n', prompt.messages[0].content)
  const result: any = []
  stream.on('data', (chunk) => {
    console.log('chunk', chunk.toString())
    result.push(chunk.toString())
  })

  stream.on('end', () => {
    console.log('\nAIの回答:\n', result.join('').replace(/ /g, ''))
  })
}

run()
