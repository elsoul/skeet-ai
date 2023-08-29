import { OpenAI as OpenAIApi } from 'openai';
import { systemContentJA } from './sytemContexts';
import { randomChat } from './randomChat';
import * as dotenv from 'dotenv';
import { createReadStream } from 'fs';
dotenv.config();
const organization = process.env.CHAT_GPT_ORG || '';
const apiKey = process.env.CHAT_GPT_KEY || '';
export class OpenAI {
    options;
    aiInstance;
    constructor(options = {}) {
        this.options = {
            model: options.model || 'gpt-4',
            temperature: options.temperature || 0,
            maxTokens: options.maxTokens || 256,
            topP: options.topP || 0.95,
            n: options.n || 1,
            stream: options.stream || false,
            organizationKey: options.organizationKey || organization,
            apiKey: options.apiKey || apiKey,
        };
        this.aiInstance = new OpenAIApi({
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
            const prompt = randomChat(content);
            const response = await this.prompt(prompt);
            return response;
        }
        catch (error) {
            throw new Error(`chat: ${error}`);
        }
    }
    async generateTitle(content) {
        try {
            const systemContent = systemContentJA;
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
                model: this.options.model,
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
            file: createReadStream(filePath),
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
//# sourceMappingURL=openAi.js.map