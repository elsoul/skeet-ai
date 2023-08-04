import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();
const organization = process.env.CHAT_GPT_ORG || '';
const apiKey = process.env.CHAT_GPT_KEY || '';
export const openAi = async (prompt, options = {}) => {
    try {
        const openaiConfig = {
            model: options.model || 'gpt-3.5-turbo',
            temperature: options.temperature || 0,
            max_tokens: options.maxTokens || 500,
            top_p: options.topP || 1,
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
        const configuration = new Configuration({
            organization: openaiKeys.organization,
            apiKey: openaiKeys.apiKey,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion(openaiConfig);
        return completion.data.choices[0].message;
    }
    catch (error) {
        throw new Error(`openAi error: ${error}`);
    }
};
//# sourceMappingURL=openAi.js.map