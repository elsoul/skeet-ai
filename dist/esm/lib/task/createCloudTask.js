import { createGraphqlTask } from './createGraphqlTask';
import { sendGraphqlRequest } from './sendGraphqlRequest';
import * as dotenv from 'dotenv';
dotenv.config();
export const createCloudTask = async (queryName, params, endpoint = 'http://localhost:3000/graphql', returnParams = ['id'], inSeconds = 0) => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            const postResponse = await sendGraphqlRequest('mutation', queryName, params);
            const result = {
                data: {
                    cloudTask: {
                        id: postResponse.data[queryName].id,
                        env: 'development',
                    },
                },
            };
            return result;
        }
        else {
            const result = await createGraphqlTask(queryName, params, endpoint, returnParams, inSeconds);
            return result;
        }
    }
    catch (error) {
        throw new Error(`Error in createCloudTask: ${error}`);
    }
};
//# sourceMappingURL=createCloudTask.js.map