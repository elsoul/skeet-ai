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
 * @example
 * VertexAI
 * ```typescript
 * import { VertexAI } from '@skeet-framework/ai'
 *
 * const vertexAi = new VertexAI()
 * const result = await vertexAi.chat('Hello')
 * console.log(result)
 * ```
 *
 * OpenAI
 * ```typescript
 * import { OpenAI } from '@skeet-framework/ai'
 *
 * const openAi = new OpenAI()
 * const result = await openAi.chat('Hello')
 * console.log(result)
 * ```
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
const randomChat_1 = require("./randomChat");
const genTitle_1 = require("./genTitle");
const fs_1 = require("fs");
dotenv.config();
const { PredictionServiceClient } = aiplatform.v1;
class VertexAI {
    constructor(options = {}) {
        this.options = this.initializeOptions(options);
        this.vertexParams = this.initializeVertexParams(options);
    }
    initializeOptions(options) {
        return {
            projectId: options.projectId || process.env.GCLOUD_PROJECT || '',
            location: options.location || process.env.REGION || '',
            apiEndpoint: options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
            model: options.model || 'chat-bison@001',
            publisher: options.publisher || 'google',
            delay: options.delay || 200,
        };
    }
    initializeVertexParams(options) {
        return {
            temperature: options.temperature || 0,
            maxOutputTokens: options.maxOutputTokens || 256,
            topP: options.topP || 0.95,
            topK: options.topK || 40,
        };
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
            const predictionServiceClient = new PredictionServiceClient({
                apiEndpoint: this.options.apiEndpoint,
            });
            const { endpoint, instanceValue, parameters } = await this.preparePredictRequest(prompt);
            const [response] = await predictionServiceClient.predict({
                endpoint,
                instances: [instanceValue],
                parameters,
            });
            const result = await this.processPredictions(response);
            const stream = fs_1.ReadStream.from(result);
            return stream;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async chat(content) {
        try {
            const prompt = (0, randomChat_1.randomChat)(content);
            const response = await this.prompt(prompt);
            return response;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    validateOptions() {
        if (!this.options.projectId) {
            console.log('⚠️ Please set projectId in options parameter or GCLOUD_PROJECT in your environment ⚠️');
            return;
        }
        if (!this.options.location) {
            console.log('⚠️ Please set location in options parameter or REGION in your environment ⚠️');
            return;
        }
    }
    async preparePredictRequest(prompt) {
        const endpoint = this.getEndpoint();
        const instanceValue = aiplatform.helpers.toValue(prompt);
        const parameters = aiplatform.helpers.toValue(this.vertexParams);
        return { endpoint, instanceValue, parameters };
    }
    async processPredictions(response) {
        const rawPrediction = response.predictions[0].structValue.fields.candidates.listValue.values[0]
            .structValue.fields.content.stringValue;
        return String(rawPrediction);
    }
    async generateTitlePrompt(content, isJapanese = false) {
        const res = isJapanese
            ? (0, genTitle_1.promptTitleGenerationJa)(content)
            : (0, genTitle_1.promptTitleGenerationEn)(content);
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
//# sourceMappingURL=vertexAi.js.map