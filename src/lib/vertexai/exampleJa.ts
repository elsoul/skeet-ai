import { VertexAiOptions, VertexPromptParams } from '../types/vertexaiTypes'
import { vertexAi } from './vertexAi'

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

  const options: VertexAiOptions = {
    isJapanese: true,
  }

  const response = await vertexAi(prompt, options)
  console.log(response)
}

run()