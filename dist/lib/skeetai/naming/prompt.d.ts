export declare const migrationNamingPrompt: {
    context: string;
    examples: {
        input: string;
        output: string;
    }[];
};
export declare const functionNamingPrompt: (functionNames: string[]) => {
    context: string;
    examples: {
        input: string;
        output: string;
    }[];
};
export declare const modelNamingPrompt: () => {
    context: string;
    examples: {
        input: string;
        output: string;
    }[];
};
