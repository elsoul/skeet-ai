import * as aiplatform from '@google-cloud/aiplatform';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
import { translateVertexPromptParams } from '../translate/translateVertexPromptParams';
import { translate } from '../translate';
dotenv.config();
const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;
const project = process.env.GCLOUD_PROJECT || '';
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || '';
export const vertexAi = async (prompt, options = {}) => {
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
            ? helpers.toValue(await translateVertexPromptParams(prompt))
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
            ? await translate(response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue)
            : response.predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue;
        return predictions;
    }
    catch (error) {
        throw new Error(`Error in vertexAi: ${inspect(error)}`);
    }
};
//# sourceMappingURL=vertexAi.js.map