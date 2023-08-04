type QueryType = 'query' | 'mutation';
export declare const toGraphqlQuery: <T extends {
    [key: string]: any;
}>(queryType: QueryType, queryName: string, query: T) => string;
export {};
