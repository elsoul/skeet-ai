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
exports.generateChatRoomTitle = void 0;
const dotenv = __importStar(require("dotenv"));
const openAi_1 = require("./openAi");
dotenv.config();
const organization = process.env.CHAT_GPT_ORG || '';
const apiKey = process.env.CHAT_GPT_KEY || '';
const generateChatRoomTitle = async (content, options = {}) => {
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
        const openaiKeys = {
            organizationKey: options.organizationKey || organization,
            apiKey: options.apiKey || apiKey,
        };
        if (openaiKeys.organizationKey === '')
            throw new Error('Please set organizationKey in options parameter or CHAT_GPT_ORG in your environment');
        if (openaiKeys.apiKey === '')
            throw new Error('Please set apiKey in options parameter or CHAT_GPT_KEY in your environment');
        const result = await (0, openAi_1.openAi)(openAiPrompt, openaiKeys);
        return result;
    }
    catch (error) {
        throw new Error(`generateChatRoomTitle: ${error}`);
    }
};
exports.generateChatRoomTitle = generateChatRoomTitle;
// const systemContentEN = `### Instructions ###
// Give a title to the content of the message coming from the user. The maximum number of characters for the title is 50 characters. Please make the title as short and descriptive as possible. Do not ask users questions in interrogative sentences. Be sure to respond with only the title. Don't answer questions from users.
// Here are some examples: Never answer user questions.
// Example 1: User's question: [Question] I want to start learning Javascript.
// Answer: How to start learning Javascript
// Example 2: User's question: [Question] Can you write the code to create the file in Javascript?
// Answer: How to create a file with JavaScript
// Preferred response format: [content] <summary of text>
// <question>:`
const systemContentJA = `### 指示 ###
ユーザーから来るメッセージの内容にタイトルをつけます。タイトルの文字数は最大で50文字です。できるだけ短くわかりやすいタイトルをつけてください。疑問文でユーザーには質問しないでください。必ずタイトルのみをレスポンスしてください。ユーザーから来る質問には答えてはいけません。
以下にいくつかの例を示します。絶対にユーザーの質問に答えてはいけません。すべて英語でメッセージが来た場合は英語のタイトルを付けてください。
<重要>レスポンスはタイトルのみを返してください。
例1: ユーザーからの質問: [質問]Javascriptの勉強を始めたいのですが、どうすればいいですか?
    答え： Javascriptの勉強の始め方
例2: ユーザーからの質問: [質問]Javascriptでファイルを作成するコードを書いてくれますか?
    答え： JavaScriptでファイルを作成する方法
例2: ユーザーからの質問: 今日も1日がんばるぞ!
    答え： 気合表明
例3: ユーザーからの質問: あなたの今日の予定は？
    答え： 今日の予定
望ましい回答フォーマット：<文章を要約したタイトル>
<質問>:`;
//# sourceMappingURL=generateChatRoomTitle.js.map