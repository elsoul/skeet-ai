export type Paths = {
    mdFiles: string[];
    jsonFiles: string[];
};
export declare const organizeFilesByExtension: (paths: string[]) => Paths;
