import { GraphQLResponse } from './sendGraphqlRequest';
export type CloudTaskResponse = {
    id: string;
    env: string;
};
export declare const createCloudTask: <T extends {
    [key: string]: any;
}>(queryName: string, params: T, endpoint?: string, returnParams?: string[], inSeconds?: number) => Promise<GraphQLResponse<CloudTaskResponse>>;
