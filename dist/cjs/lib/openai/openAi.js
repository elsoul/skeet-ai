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
exports.OpenAI = void 0;
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
const sytemContexts_1 = require("./sytemContexts");
const randomChat_1 = require("./randomChat");
dotenv.config();
const organization = process.env.CHAT_GPT_ORG || '';
const apiKey = process.env.CHAT_GPT_KEY || '';
class OpenAI {
    constructor(options = {}) {
        this.options = {
            model: options.model || 'gpt-3.5-turbo',
            temperature: options.temperature || 0.2,
            maxTokens: options.maxTokens || 256,
            topP: options.topP || 0.95,
            n: options.n || 1,
            stream: options.stream || false,
            organizationKey: options.organizationKey || organization,
            apiKey: options.apiKey || apiKey,
        };
        if (!this.options.organizationKey) {
            throw new Error('Please set organizationKey in options or CHAT_GPT_ORG in your environment');
        }
        if (!this.options.apiKey) {
            throw new Error('Please set apiKey in options or CHAT_GPT_KEY in your environment');
        }
    }
    async prompt(promptParams) {
        try {
            const openaiConfig = {
                model: this.options.model,
                temperature: this.options.temperature,
                max_tokens: this.options.maxTokens,
                top_p: this.options.topP,
                n: this.options.n,
                stream: this.options.stream,
                messages: promptParams.messages,
            };
            const configuration = new openai_1.Configuration({
                organization: this.options.organizationKey,
                apiKey: this.options.apiKey,
            });
            const openai = new openai_1.OpenAIApi(configuration);
            const completion = await openai.createChatCompletion(openaiConfig);
            const result = completion.data.choices[0].message;
            if (result === undefined) {
                throw new Error('openAi error: result is undefined');
            }
            return String(result.content);
        }
        catch (error) {
            console.error(`openAi error: ${error}`);
            process.exit(1);
        }
    }
    async chat(content) {
        try {
            const prompt = (0, randomChat_1.randomChat)(content);
            const response = await this.prompt(prompt);
            return response;
        }
        catch (error) {
            throw new Error(`chat: ${error}`);
        }
    }
    async generateTitle(content) {
        try {
            const systemContent = sytemContexts_1.systemContentJA;
            const openAiPrompt = {
                messages: [
                    {
                        role: 'system',
                        content: systemContent,
                    },
                    {
                        role: 'user',
                        content,
                    },
                ],
            };
            const result = await this.prompt(openAiPrompt);
            return result;
        }
        catch (error) {
            throw new Error(`generateChatRoomTitle: ${error}`);
        }
    }
    async promptStream(prompt) {
        try {
            const openaiConfig = {
                model: 'gpt-3.5-turbo',
                temperature: this.options.temperature,
                max_tokens: this.options.maxTokens,
                top_p: this.options.topP,
                n: this.options.n,
                stream: true,
                messages: prompt.messages,
            };
            if (!this.options.organizationKey)
                throw new Error('Please set organizationKey in options parameter or CHAT_GPT_ORG in your environment');
            if (!this.options.apiKey)
                throw new Error('Please set apiKey in options parameter or CHAT_GPT_KEY in your environment');
            const configuration = new openai_1.Configuration({
                organization: this.options.organizationKey,
                apiKey: this.options.apiKey,
            });
            const openai = new openai_1.OpenAIApi(configuration);
            const result = await openai.createChatCompletion(openaiConfig, {
                responseType: 'stream',
            });
            const stream = result.data;
            return stream;
        }
        catch (error) {
            throw new Error(`openAiStream error: ${error}`);
        }
    }
}
exports.OpenAI = OpenAI;
//# sourceMappingURL=openAI.js.map