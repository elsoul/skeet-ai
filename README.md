<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/ai">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/ai">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/ai">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/ai">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-ai/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-ai/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## Skeet Framework Plugin - AI

Skeet AI Plugin for Multile Chat Models.

Build generative AI apps quickly and responsibly with Model API, a simple, secure, and multiple AI models are available.

This plugin wraps the following AI models.

- [Vertex AI(Google Cloud)](https://cloud.google.com/vertex-ai/)
- [Open AI(ChatGPT)](https://openai.com/)

Fast and easy to deploy with Skeet Framework.

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0

## Installation

```bash
$ yarn add @skeet-framework/ai
```

with Skeet Framework CLI

```bash
$ skeet yarn add -p @skeet-framework/ai
```

# Initial Setup - Vertex AI (Google Cloud)

Enable API and Permissions on GCP.

if you havent installed Skeet CLI, install it.

```bash
$ gcloud auth application-default
$ npm i -g @skeet-framework/cli
```

and run `skeet iam ai` command.

```bash
$ skeet iam ai
? What's your GCP Project ID your-project-id
? Select Regions to deploy asia-east1
✔ Successfully created ./skeet-cloud.config.json 🎉
🚸 === Copy & Paste below command to your terminal === 🚸

export GCLOUD_PROJECT=your-project-id
export REGION="us-central1"

🚸 =========           END           ========= 🚸
```

And set environment variables following the console's output.

**Note: options overwrite the environment variables**

## Quick Start

VertexAI

```ts
import { VertexAI } from '@skeet-framework/ai'

const vertexAi = new VertexAI()
const result = await vertexAi.chat('Hello')
console.log(result)
```

OpenAI

**Note: You need finished [Initial Setup - Open AI (ChatGPT)](/README.md#initial-setup---open-ai-chatgpt) to use OpenAI API**

```ts
import { OpenAI } from '@skeet-framework/ai'

const openAi = new OpenAI()
const result = await openAi.chat('Hello')
console.log(result)
```

## Vertex AI - Prompt Example

Example `app.ts`

```ts
import { VertexAI, VertexPromptParams } from '@skeet-framework/ai'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    examples: [
      {
        input: {
          content:
            'What is the Skeet framework and what benefits does it offer for app development?',
        },
        output: {
          content:
            'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Tell me about the Skeet framework.',
      },
    ],
  }

  const vertexAi = new VertexAI()
  const response = await vertexAi.prompt(prompt)
  console.log('Question:\n', prompt.messages[0].content)
  console.log('Answer:\n', response)

  const content =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const promptTitle = await vertexAi.generateTitlePrompt(content)
  const title = await vertexAi.prompt(promptTitle)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
}

run()
```

Run

```bash
$ npx ts-node app.ts
```

## Vertex AI - Japanese (日本語) プロンプトの例

```ts
import { VertexAI, VertexPromptParams } from '@skeet-framework/ai'

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

  const vertexAi = new VertexAI()
  const response = await vertexAi.prompt(prompt)
  console.log('AIへの質問:\n', prompt.messages[0].content)
  console.log('\nAIの回答:\n', response)

  const content =
    '"Skeet framework"は、アプリケーションの開発および運用コストを削減することを目的としたオープンソースのフルスタックアプリケーション開発ソリューションです。これにより、開発者はアプリケーションロジックにもっと集中し、インフラストラクチャについての心配を減少させることができます。このフレームワークは、SQLとNoSQLの組み合わせで組み立てることができます。'
  const promptTitle = await vertexAi.generateTitlePrompt(content)
  console.log('\n要約する前の文章:\n', content)
  const title = await vertexAi.prompt(promptTitle)
  console.log('\nAIがつけたタイトル:\n', title)
}

run()
```

Run (実行)

```bash
$ npx ts-node app.ts
```

# Initial Setup - Open AI (ChatGPT)

## Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![OpenAI ChatGPT API](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

# Usage

## OpenAI

set environment variables

```bash
$ export CHAT_GPT_ORG=org-id
$ export CHAT_GPT_KEY=your-api-key
```

Example `app.ts`

```ts
import { OpenAI, OpenAIPromptParams } from '@skeet-framework/ai'

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
```

Run

```bash
$ npx ts-node app.ts
```

# Skeet AI Docs

- [Skeet AI TypeDoc](https://elsoul.github.io/skeet-ai/)

## Skeet Framework Document

- [https://skeet.dev](https://skeet.dev)

## Skeet TypeScript Serverless Framework

GraphQL, CloudSQL, Cloud Functions, TypeScript, Jest Test, Google Cloud Load Balancer, Cloud Armor

## What's Skeet?

TypeScript Serverless Framework 'Skeet'.

The Skeet project was launched with the goal of reducing software development, operation, and maintenance costs.

Build Serverless Apps faster.
Powered by TAI, Cloud Functions, Typesaurus, Jest, Prettier, and Google Cloud.

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [GitHub CLI](https://cli.github.com/)

```bash
$ npm i -g @skeet-framework/cli
$ skeet create web-app
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
