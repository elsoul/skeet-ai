export type QueryType = 'query' | 'mutation';
export type GraphQLResponse<T> = {
    data: {
        [key: string]: T;
    };
};
export declare const sendGraphqlRequest: <T extends Record<string, any>, R extends Record<string, any>>(queryType: QueryType, queryName: string, params: T, returnParams?: string[]) => Promise<GraphQLResponse<R>>;
export declare const graphqlString: <T extends Record<string, any>>(queryType: QueryType, queryName: string, params: T, outputString?: string[]) => string;
