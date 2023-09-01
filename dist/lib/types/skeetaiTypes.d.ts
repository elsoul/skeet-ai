export type Example = {
    context: string;
    examples: InputOutput[];
};
export type InputOutput = {
    input: string;
    output: string;
};
export declare enum NamingEnum {
    MIGRATION = "migration",
    FUNCTION = "function",
    MODEL = "model"
}
export declare const MODEL_PATH = "./functions/skeet/src/models";
