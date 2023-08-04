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
const openAi = async (prompt, options = {}) => {
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
        const configuration = new openai_1.Configuration({
            organization: openaiKeys.organization,
            apiKey: openaiKeys.apiKey,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const completion = await openai.createChatCompletion(openaiConfig);
        return completion.data.choices[0].message;
    }
    catch (error) {
        throw new Error(`openAi error: ${error}`);
    }
};
exports.openAi = openAi;
//# sourceMappingURL=openAi.js.map