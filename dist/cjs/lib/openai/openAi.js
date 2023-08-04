"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAi = void 0;
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const organization = process.env.CHAT_GPT_ORG || '';
const apiKey = process.env.CHAT_GPT_KEY || '';
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
const openAi = async (prompt, options = {}) => {
    try {
        const openaiConfig = {
            model: options.model || 'gpt-3.5-turbo',
            temperature: options.temperature || 0.2,
            max_tokens: options.maxTokens || 256,
            top_p: options.topP || 0.95,
            n: options.n || 1,
            stream: options.stream || false,
            messages: prompt.messages,
        };
        const openaiKeys = {
            organization: options.organizationKey || organization,
            apiKey: options.apiKey || apiKey,
        };
        if (openaiKeys.organization === '')
            throw new Error('Please set organizationKey in options parameter or CHAT_GPT_ORG in your environment');
        if (openaiKeys.apiKey === '')
            throw new Error('Please set apiKey in options parameter or CHAT_GPT_KEY in your environment');
        const configuration = new openai_1.Configuration({
            organization: openaiKeys.organization,
            apiKey: openaiKeys.apiKey,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const completion = await openai.createChatCompletion(openaiConfig);
        const result = completion.data.choices[0].message;
        if (result === undefined)
            throw new Error('openAi error: result is undefined');
        return String(result.content);
    }
    catch (error) {
        throw new Error(`openAi error: ${error}`);
    }
};
exports.openAi = openAi;
//# sourceMappingURL=openAi.js.map