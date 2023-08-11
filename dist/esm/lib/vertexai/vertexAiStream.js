import { VertexAI } from './vertexAI';
import * as aiplatform from '@google-cloud/aiplatform';
import { createReadStream } from 'fs';
import { translate, translateVertexPromptParams } from '../translate';
/**
 * @class VertexAI
 *
 *
 */
VertexAI.prototype.predictStream = async function (prompt) {
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
            ? aiplatform.helpers.toValue(await translateVertexPromptParams(prompt))
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
            ? await translate(response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue)
            : response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue;
        const readableStream = createReadStream(predictions, {
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