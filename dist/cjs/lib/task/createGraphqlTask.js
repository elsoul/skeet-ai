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
exports.createGraphqlTask = void 0;
const tasks_1 = require("@google-cloud/tasks");
const sendGraphqlRequest_1 = require("./sendGraphqlRequest");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '';
const region = process.env.EVENTARC_CLOUD_EVENT_SOURCE
    ? process.env.EVENTARC_CLOUD_EVENT_SOURCE.split('/')[3]
    : process.env.SKEET_GCP_REGION || 'europe-west6';
const createGraphqlTask = async (queryName, params, endpoint, returnParams = ['id'], inSeconds = 0) => {
    try {
        const client = new tasks_1.v2beta3.CloudTasksClient();
        const parent = client.queuePath(projectId, region, queryName);
        const graphql = (0, sendGraphqlRequest_1.graphqlString)('mutation', queryName, params, returnParams);
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
exports.createGraphqlTask = createGraphqlTask;
//# sourceMappingURL=createGraphqlTask.js.map