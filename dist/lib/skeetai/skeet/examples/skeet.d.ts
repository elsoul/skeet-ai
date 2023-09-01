export declare const skeetPromptVertex: (content: string) => {
    context: string;
    examples: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[];
    messages: {
        author: string;
        content: string;
    }[];
};
