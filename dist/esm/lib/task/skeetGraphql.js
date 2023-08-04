import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { graphqlString } from './sendGraphqlRequest';
dotenv.config();
const skeetEnv = process.env.NODE_ENV || 'development';
export const skeetGraphql = async (accessToken, endpoint, queryType, queryName, params, returnParams = ['id']) => {
    try {
        const body = graphqlString(queryType, queryName, params, returnParams);
        let baseUrl = 'http://localhost:3000/graphql';
        if (skeetEnv === 'production') {
            baseUrl = endpoint;
        }
        console.log({ graphqlString: body });
        const res = await fetch(baseUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const result = await res.json();
        return result;
    }
    catch (error) {
        throw new Error(`skeetGraphql failed: ${error}`);
    }
};
//# sourceMappingURL=skeetGraphql.js.map