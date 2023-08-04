import { GraphQLResponse, QueryType } from './sendGraphqlRequest';
export declare const skeetGraphql: <T extends Record<string, any>, R extends Record<string, any>>(accessToken: string, endpoint: string, queryType: QueryType, queryName: string, params: T, returnParams?: string[]) => Promise<GraphQLResponse<R>>;
