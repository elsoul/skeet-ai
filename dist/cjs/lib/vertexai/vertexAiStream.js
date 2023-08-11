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
const vertexAI_1 = require("./vertexAI");
const aiplatform = __importStar(require("@google-cloud/aiplatform"));
const fs_1 = require("fs");
const translate_1 = require("../translate");
/**
 * @class VertexAI
 *
 *
 */
vertexAI_1.VertexAI.prototype.predictStream = async function (prompt) {
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
            ? aiplatform.helpers.toValue(await (0, translate_1.translateVertexPromptParams)(prompt))
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
        const readableStream = (0, fs_1.createReadStream)(predictions, {
            encoding: 'utf8',
            highWaterMark: 6,
        });
        return readableStream;
    }
    catch (error) {
        throw new Error(`Error in predictStream: ${error}`);
    }
};
//# sourceMappingURL=vertexAiStream.js.map