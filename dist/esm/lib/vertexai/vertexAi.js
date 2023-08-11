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
import * as aiplatform from '@google-cloud/aiplatform';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
import { translateVertexPromptParams } from '../translate/translateVertexPromptParams';
import { translate } from '../translate';
import { DelayedStream } from './delayedStream';
dotenv.config();
const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;
export class VertexAI {
    constructor(options = {}) {
        this.promptTitleGenerationJa = (content) => {
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
        this.options = this.initializeOptions(options);
        this.vertexParams = this.initializeVertexParams(options);
    }
    initializeOptions(options) {
        const defaultConfig = this.parseFirebaseConfig();
        return {
            projectId: options.projectId || process.env.GCLOUD_PROJECT || '',
            location: options.location || defaultConfig.locationId || '',
            apiEndpoint: options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
            model: options.model || 'chat-bison@001',
            publisher: options.publisher || 'google',
            isJapanese: options.isJapanese || false,
            delay: options.delay || 200,
        };
    }
    initializeVertexParams(options) {
        return {
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
    getEndpoint() {
        return `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`;
    }
    async prompt(prompt) {
        try {
            this.validateOptions();
            const predictionServiceClient = new PredictionServiceClient({
                apiEndpoint: this.options.apiEndpoint,
            });
            const { endpoint, instanceValue, parameters } = await this.preparePredictRequest(prompt);
            const [response] = await predictionServiceClient.predict({
                endpoint,
                instances: [instanceValue],
                parameters,
            });
            return this.processPredictions(response);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async promptStream(prompt) {
        try {
            this.validateOptions();
            const predictionServiceClient = new aiplatform.PredictionServiceClient({
                apiEndpoint: this.options.apiEndpoint,
            });
            const { endpoint, instanceValue, parameters } = await this.preparePredictRequest(prompt);
            const [response] = await predictionServiceClient.predict({
                endpoint,
                instances: [instanceValue],
                parameters,
            });
            const predictions = await this.processPredictions(response);
            return this.createDelayedStream(predictions);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    validateOptions() {
        if (!this.options.projectId) {
            throw new Error('Please set projectId in options parameter or GCLOUD_PROJECT in your environment');
        }
        if (!this.options.location) {
            throw new Error('Please set location in options parameter or FIREBASE_CONFIG in your environment');
        }
    }
    async preparePredictRequest(prompt) {
        const endpoint = this.getEndpoint();
        const instanceValue = this.options.isJapanese
            ? aiplatform.helpers.toValue(await translateVertexPromptParams(prompt))
            : aiplatform.helpers.toValue(prompt);
        const parameters = aiplatform.helpers.toValue(this.vertexParams);
        return { endpoint, instanceValue, parameters };
    }
    async processPredictions(response) {
        const rawPrediction = response.predictions[0].structValue.fields.candidates.listValue.values[0]
            .structValue.fields.content.stringValue;
        return this.options.isJapanese
            ? await translate(rawPrediction)
            : String(rawPrediction);
    }
    createDelayedStream(predictions) {
        let chunks;
        if (this.options.isJapanese) {
            // 日本語の場合、3文字ごとに分割
            chunks = this.splitIntoChunks(predictions, 3);
        }
        else {
            // 英語の場合、スペースで分割
            chunks = predictions.split(' ');
        }
        return new DelayedStream(chunks, this.options.delay);
    }
    splitIntoChunks(text, chunkSize) {
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }
        return chunks;
    }
    async generateTitlePrompt(content, isJapanese = false) {
        const res = isJapanese
            ? this.promptTitleGenerationJa(content)
            : this.promptTitleGenerationEn(content);
        return res;
    }
    promptTitleGenerationEn(content) {
        const res = {
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
        throw new Error(`Error in vertexAi: ${inspect(error)}`);
    }
}
//# sourceMappingURL=vertexAI.js.map