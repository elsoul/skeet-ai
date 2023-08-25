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
const sytemContexts_1 = require("./sytemContexts");
const randomChat_1 = require("./randomChat");
const dotenv = __importStar(require("dotenv"));
const fs_1 = require("fs");
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
        this.aiInstance = new openai_1.OpenAI({
            apiKey: this.options.apiKey,
            organization: this.options.organizationKey,
        });
        if (!this.options.organizationKey) {
            console.log('Please set organizationKey in options or CHAT_GPT_ORG in your environment');
            return;
        }
        if (!this.options.apiKey) {
            console.log('Please set apiKey in options or CHAT_GPT_KEY in your environment');
            return;
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
                stream: false,
                messages: promptParams.messages,
            };
            const completion = (await this.aiInstance.chat.completions.create(openaiConfig));
            const result = completion.choices[0].message;
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
            const stream = (await this.aiInstance.chat.completions.create(openaiConfig));
            return stream;
        }
        catch (error) {
            throw new Error(`openAiStream error: ${error}`);
        }
    }
    async uploadFile(filePath) {
        return await this.aiInstance.files.create({
            file: (0, fs_1.createReadStream)(filePath),
            purpose: 'fine-tune',
        });
    }
    async createFineTuningJob(fileId, model) {
        const fileTuneOptions = {
            training_file: fileId,
            model: model || 'gpt-3.5-turbo-0613',
        };
        return await this.aiInstance.fineTuning.jobs.create(fileTuneOptions);
    }
    async showFineTuningJob(jobId) {
        return await this.aiInstance.fineTuning.jobs.retrieve(jobId);
    }
}
exports.OpenAI = OpenAI;
//# sourceMappingURL=openAi.js.map