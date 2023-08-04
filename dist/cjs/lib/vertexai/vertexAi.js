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
exports.vertexAi = void 0;
const aiplatform = __importStar(require("@google-cloud/aiplatform"));
const dotenv = __importStar(require("dotenv"));
const util_1 = require("util");
const translateVertexPromptParams_1 = require("../translate/translateVertexPromptParams");
const translate_1 = require("../translate");
dotenv.config();
const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;
const project = process.env.GCLOUD_PROJECT || '';
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || '';
/**
 * This function is used to send a Vertex AI request to the server.

 * Example:
 * ```ts
import { VertexPromptParams } from '../types/vertexaiTypes'
import { vertexAi } from './vertexAi'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    examples: [
      {
        input: {
          content:
            'What is the Skeet framework and what benefits does it offer for app development?',
        },
        output: {
          content:
            'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Tell me about the Skeet framework.',
      },
    ],
  }

  const response = await vertexAi(prompt)
  console.log(response)
}

run()
 * ```
 * @remarks Both `options.projectId` and `options.location` are required, unless you have `GCLOUD_PROJECT` and `FIREBASE_CONFIG` set in your environment variables. Please note that values in options will override these environment variables.
 
 * e.g. `.env`
 * ```bash
 * GCLOUD_PROJECT="my-project-id"
 * FIREBASE_CONFIG={ "locationId": "us-central1" }
 * ```
 * @param prompt the message to send to the server.
 * @param options the options to use when sending the request.
 * @returns the response from the Vertex AI server.
 *
 */
const vertexAi = async (prompt, options = {}) => {
    try {
        if (!options.location) {
            const { locationId } = JSON.parse(FIREBASE_CONFIG);
            options.location = locationId;
        }
        if (!options.isJapanese)
            options.isJapanese = false;
        const endpointParams = {
            projectId: options.projectId || project,
            location: options.location,
            apiEndpoint: options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
            model: options.model || 'chat-bison@001',
            publisher: options.publisher || 'google',
        };
        if (endpointParams.projectId === '')
            throw new Error('Please set projectId in options parameter or GCLOUD_PROJECT in your environment');
        if (endpointParams.location === '')
            throw new Error('Please set location in options parameter \nor FIREBASE_CONFIG in your environment. e.g. { "locationId": "us-central1" }');
        const vertexParameterParams = {
            temperature: options.temperature || 0.2,
            maxOutputTokens: options.maxOutputTokens || 256,
            topP: options.topP || 0.95,
            topK: options.topK || 40,
        };
        const clientOptions = {
            apiEndpoint: endpointParams.apiEndpoint,
        };
        const predictionServiceClient = new PredictionServiceClient(clientOptions);
        const endpoint = `projects/${endpointParams.projectId}/locations/${endpointParams.location}/publishers/${endpointParams.publisher}/models/${endpointParams.model}`;
        const instanceValue = options.isJapanese
            ? helpers.toValue(await (0, translateVertexPromptParams_1.translateVertexPromptParams)(prompt))
            : helpers.toValue(prompt);
        const instances = [instanceValue];
        const parameters = helpers.toValue(vertexParameterParams);
        const request = {
            endpoint,
            instances,
            parameters,
        };
        // Predict request
        const [response] = await predictionServiceClient.predict(request);
        const predictions = options.isJapanese
            ? await (0, translate_1.translate)(response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue)
            : response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue;
        return predictions;
    }
    catch (error) {
        throw new Error(`Error in vertexAi: ${(0, util_1.inspect)(error)}`);
    }
};
exports.vertexAi = vertexAi;
//# sourceMappingURL=vertexAi.js.map