"use strict";
/**
 * `VertexAI` provides an interface to interact with Google's Vertex AI service.
 * This class simplifies the process of making predictions using Vertex AI, allowing
 * for easy configuration and prediction.
 *
 * Usage:
 * ```typescript
 * const vertexService = new VertexAI({
 *   projectId: 'your-project-id',
 *   location: 'your-location',
 *   // ... other options
 * });
 *
 * const prompt = {
 *   //... your prompt data
 * };
 *
 * const response = await vertexService.predict(prompt);
 * console.log(response);
 * ```
 *
 * @remarks
 * Make sure to set the appropriate environment variables or pass them as options to the constructor.
 *
 * @class
 */
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
exports.VertexAI = void 0;
const aiplatform = __importStar(require("@google-cloud/aiplatform"));
const dotenv = __importStar(require("dotenv"));
const util_1 = require("util");
const translateVertexPromptParams_1 = require("../translate/translateVertexPromptParams");
const translate_1 = require("../translate");
const delayedStream_1 = require("./delayedStream");
dotenv.config();
const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;
class VertexAI {
    constructor(options = {}) {
        const defaultConfig = this.parseFirebaseConfig();
        this.options = {
            projectId: options.projectId || process.env.GCLOUD_PROJECT || '',
            location: options.location || defaultConfig.locationId || '',
            apiEndpoint: options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
            model: options.model || 'chat-bison@001',
            publisher: options.publisher || 'google',
            isJapanese: options.isJapanese || false,
            delay: options.delay || 200,
        };
        this.vertexParams = {
            temperature: options.temperature || 0.2,
            maxOutputTokens: options.maxOutputTokens || 256,
            topP: options.topP || 0.95,
            topK: options.topK || 40,
        };
    }
    parseFirebaseConfig() {
        try {
            return JSON.parse(process.env.FIREBASE_CONFIG || '');
        }
        catch (error) {
            return {};
        }
    }
    async prompt(prompt) {
        try {
            if (!this.options.projectId) {
                console.log(`⚠️ Please set projectId in options parameter or GCLOUD_PROJECT in your environment.`);
                return '';
            }
            if (!this.options.location) {
                console.log(`Please set location in options parameter or FIREBASE_CONFIG in your environment.`);
                return '';
            }
            const clientOptions = {
                apiEndpoint: this.options.apiEndpoint,
            };
            const predictionServiceClient = new PredictionServiceClient(clientOptions);
            const endpoint = `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`;
            const instanceValue = this.options.isJapanese
                ? helpers.toValue(await (0, translateVertexPromptParams_1.translateVertexPromptParams)(prompt))
                : helpers.toValue(prompt);
            const instances = [instanceValue];
            const parameters = helpers.toValue(this.vertexParams);
            const request = {
                endpoint,
                instances,
                parameters,
            };
            // Predict request
            const [response] = await predictionServiceClient.predict(request);
            const predictions = this.options.isJapanese
                ? await (0, translate_1.translate)(response.predictions[0].structValue.fields.candidates.listValue
                    .values[0].structValue.fields.content.stringValue)
                : response.predictions[0].structValue.fields.candidates.listValue
                    .values[0].structValue.fields.content.stringValue;
            return String(predictions);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async promptStream(prompt) {
        try {
            if (!this.options.projectId) {
                throw new Error('Please set projectId in options parameter or GCLOUD_PROJECT in your environment');
            }
            if (!this.options.location) {
                throw new Error('Please set location in options parameter or FIREBASE_CONFIG in your environment');
            }
            const clientOptions = {
                apiEndpoint: this.options.apiEndpoint,
            };
            const predictionServiceClient = new aiplatform.PredictionServiceClient(clientOptions);
            const endpoint = `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`;
            const instanceValue = this.options.isJapanese
                ? aiplatform.helpers.toValue(await (0, translateVertexPromptParams_1.translateVertexPromptParams)(prompt))
                : aiplatform.helpers.toValue(prompt);
            const instances = [instanceValue];
            const parameters = aiplatform.helpers.toValue(this.vertexParams);
            const request = {
                endpoint,
                instances,
                parameters,
            };
            // Predict request
            const [response] = await predictionServiceClient.predict(request);
            const predictions = this.options.isJapanese
                ? await (0, translate_1.translate)(response.predictions[0].structValue.fields.candidates.listValue
                    .values[0].structValue.fields.content.stringValue)
                : response.predictions[0].structValue.fields.candidates.listValue
                    .values[0].structValue.fields.content.stringValue;
            const chunkSize = 1;
            const chunks = [];
            for (let i = 0; i < predictions.length; i += chunkSize) {
                chunks.push(predictions.substring(i, i + chunkSize));
            }
            const stream = new delayedStream_1.DelayedStream(chunks, this.options.delay);
            return stream;
        }
        catch (error) {
            throw new Error(`Error in predictStream: ${error}`);
        }
    }
    async generateTitlePrompt(content, isJapanese = false) {
        const res = isJapanese
            ? promptTitleGenerationJa(content)
            : {
                context: "Give a title to the content of the message coming from the user. The maximum number of characters for the title is 50 characters. Please make the title as short and descriptive as possible. Do not ask users questions in interrogative sentences. Be sure to respond with only the title. Don't answer questions from users.",
                examples: [
                    {
                        input: {
                            content: 'I want to start learning Javascript',
                        },
                        output: {
                            content: 'How to start learning Javascript',
                        },
                    },
                    {
                        input: {
                            content: 'Can you write the code to create the file in Javascript?',
                        },
                        output: {
                            content: 'How to create a file with JavaScript',
                        },
                    },
                ],
                messages: [
                    {
                        author: 'user',
                        content,
                    },
                ],
            };
        return res;
    }
    handleError(error) {
        if (typeof error === 'object' &&
            String(error.details).includes('Permission')) {
            console.log(`⚠️ Make sure if you login to your GCP project.`);
        }
        throw new Error(`Error in vertexAi: ${(0, util_1.inspect)(error)}`);
    }
}
exports.VertexAI = VertexAI;
const promptTitleGenerationJa = (content) => {
    const res = {
        context: 'ユーザーから来るメッセージの内容にタイトルをつけます。タイトルの文字数は最大で50文字です。できるだけ短くわかりやすいタイトルをつけてください。疑問文でユーザーには質問しないでください。必ずタイトルのみをレスポンスしてください。ユーザーから来る質問には答えてはいけません。以下にいくつかの例を示します。絶対にユーザーの質問に答えてはいけません。すべて英語でメッセージが来た場合は英語のタイトルを付けてください。',
        examples: [
            {
                input: {
                    content: 'Javascriptの勉強を始めたいのですが、どうすればいいですか?',
                },
                output: {
                    content: 'Javascriptの勉強の始め方',
                },
            },
            {
                input: {
                    content: 'Javascriptでファイルを作成するコードを書いてくれますか?',
                },
                output: {
                    content: 'JavaScriptでファイルを作成する方法',
                },
            },
            {
                input: {
                    content: '今日も1日がんばるぞ!',
                },
                output: {
                    content: '気合表明',
                },
            },
            {
                input: {
                    content: 'あなたの今日の予定は？',
                },
                output: {
                    content: '今日の予定',
                },
            },
        ],
        messages: [
            {
                author: 'user',
                content,
            },
        ],
    };
    return res;
};
//# sourceMappingURL=vertexAI.js.map