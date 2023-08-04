import { OpenAIOptions, OpenAIPromptParams } from '../types/openaiTypes';
/**
 * This function is used to send a ChatGPT AI request to the server.

 * Example:
 * ```ts
import { OpenAIPromptParams } from '../types/openaiTypes'
import { openAi } from './openAi'

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
  const result = await openAi(prompt)
  console.log(result)
}

run()
* ```
* @remarks Both `options.organizationKey` and `options.apiKey` are required, unless you have `CHAT_GPT_ORG` and `CHAT_GPT_KEY` set in your environment variables. Please note that values in options will override these environment variables.

* e.g. `.env`
* ```bash
* CHAT_GPT_ORG="org-your-org-id"
* CHAT_GPT_KEY="key-your-key"
* ```
* @param prompt the message to send to the server.
* @param options the options to use when sending the request.
* @returns the response from the ChatGPT AI server.
*
*/
export declare const openAi: (prompt: OpenAIPromptParams, options?: OpenAIOptions) => Promise<string>;
