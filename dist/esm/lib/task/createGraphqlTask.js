import { v2beta3 } from '@google-cloud/tasks';
import { graphqlString } from './sendGraphqlRequest';
import * as dotenv from 'dotenv';
dotenv.config();
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '';
const region = process.env.EVENTARC_CLOUD_EVENT_SOURCE
    ? process.env.EVENTARC_CLOUD_EVENT_SOURCE.split('/')[3]
    : process.env.SKEET_GCP_REGION || 'europe-west6';
export const createGraphqlTask = async (queryName, params, endpoint, returnParams = ['id'], inSeconds = 0) => {
    try {
        const client = new v2beta3.CloudTasksClient();
        const parent = client.queuePath(projectId, region, queryName);
        const graphql = graphqlString('mutation', queryName, params, returnParams);
        const body = Buffer.from(graphql).toString('base64');
        const serviceAccountEmail = `${projectId}@${projectId}.iam.gserviceaccount.com`;
        const oidcToken = {
            serviceAccountEmail,
            audience: 'skeet-graphql',
        };
        const task = {
            httpRequest: {
                headers: {
                    'Content-Type': 'application/json',
                },
                httpMethod: 'POST',
                url: endpoint,
                oidcToken,
                body,
            },
            scheduleTime: {},
        };
        if (inSeconds) {
            task.scheduleTime = {
                seconds: parseInt(String(inSeconds)) + Date.now() / 1000,
            };
        }
        const request = { parent, task };
        const [response] = await client.createTask(request);
        console.log(`Created task ${response.name}`);
        const result = {
            data: {
                cloudTask: {
                    id: response.name || '',
                    env: 'production',
                },
            },
        };
        return result;
    }
    catch (error) {
        throw new Error(`createGraphqlTask: ${error}`);
    }
};
//# sourceMappingURL=createGraphqlTask.js.map