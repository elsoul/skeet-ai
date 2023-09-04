import { VertexAI } from '@/lib/vertexai';
import { OpenAI } from '@/lib/openai';
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
export type AiInstance = VertexAI | OpenAI;
export declare enum SkeetAiMode {
    Function = "function",
    Firestore = "firestore",
    Method = "method",
    Prisma = "prisma",
    Skeet = "skeet",
    Translate = "translate",
    Typedoc = "typedoc",
    YesOrNo = "yesOrNo"
}
export declare enum InstanceType {
    AUTH = "auth",
    FIRESTORE = "firestore",
    PUBSUB = "pubsub",
    SCHEDULE = "schedule",
    HTTP = "http"
}
