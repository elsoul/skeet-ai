"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeetAI = void 0;
const openai_1 = require("../openai");
const vertexai_1 = require("../vertexai");
const fineTune_1 = require("./fineTune");
const prisma_1 = require("./prisma/prisma");
const skeet_1 = require("./skeet");
const dotenv = __importStar(require("dotenv"));
const typedoc_1 = require("./typedoc");
dotenv.config();
/**
 * The main SkeetAI class for handling AI interactions.
 */
class SkeetAI {
    ai;
    model;
    maxTokens;
    static PRISMA_SCHEMA_PATH = './graphql/prisma/schema.prisma';
    aiInstance;
    /**
     * Creates an instance of SkeetAI.
     * @param options - Configuration options for initializing the SkeetAI.
     * @example
     * ```typescript
     * // Using default settings:
     * const defaultSkeet = new SkeetAI();
     *
     * // Specifying the AI platform and model:
     * const customSkeet = new SkeetAI({
     *   ai: 'OpenAI',
     *   model: 'gpt-4',
     *   maxTokens: 500
     * });
     * ```
     */
    constructor(options = {}) {
        this.ai = options.ai || 'VertexAI';
        this.model =
            options.model || (this.ai === 'VertexAI' ? 'chat-bison@001' : 'gpt-4');
        this.maxTokens = options.maxTokens || 1000;
        if (this.ai === 'VertexAI') {
            this.aiInstance = new vertexai_1.VertexAI({
                model: this.model,
                maxOutputTokens: this.maxTokens,
            });
        }
        else {
            this.aiInstance = new openai_1.OpenAI({
                model: this.model,
                maxTokens: this.maxTokens,
                apiKey: process.env.CHAT_GPT_KEY || '',
                organizationKey: process.env.CHAT_GPT_ORG || '',
            });
        }
    }
    async prisma(content) {
        try {
            return await (0, prisma_1.skeetAiPrisma)(content, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async skeet(content) {
        try {
            return await (0, skeet_1.skeetPrompt)(content, this.ai, this.aiInstance);
        }
        catch (error) {
            throw new Error(`skeet: ${error}`);
        }
    }
    async uploadFile(filePath) {
        try {
            return await (0, fineTune_1.uploadJsonlFile)(filePath, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async createFineTuningJob(fileId, model = 'gpt-3.5-turbo-0613') {
        try {
            return await (0, fineTune_1.createFineTuningJob)(fileId, model, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async showFineTuningJob(jobId) {
        try {
            return await (0, fineTune_1.showFineTuningJob)(jobId, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async typedoc(content) {
        try {
            return await (0, typedoc_1.skeetGenTypedoc)(content, this.ai, this.aiInstance);
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        console.error('Error:', error);
    }
}
exports.SkeetAI = SkeetAI;
exports.default = SkeetAI;
//# sourceMappingURL=index.js.map