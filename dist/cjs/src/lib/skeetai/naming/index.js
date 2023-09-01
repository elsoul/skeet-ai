"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetNaming = void 0;
const genPrompt_1 = require("../../genPrompt");
const prompt_1 = require("./prompt");
const skeetaiTypes_1 = require("../../../lib/types/skeetaiTypes");
const skeetNaming = async (content, thisAi, thisAiInstance, namingEnum) => {
    try {
        let example = { context: '', examples: [] };
        if (namingEnum === skeetaiTypes_1.NamingEnum.MIGRATION) {
            example = prompt_1.migrationNamingPrompt;
        }
        else if (namingEnum === skeetaiTypes_1.NamingEnum.FUNCTION) {
            example = prompt_1.functionNamingPrompt;
        }
        else if (namingEnum === skeetaiTypes_1.NamingEnum.MODEL) {
            example = prompt_1.modelNamingPrompt;
        }
        const prompt = (0, genPrompt_1.generatePrompt)(example.context, example.examples, content, thisAi);
        if (thisAi === 'VertexAI') {
            const aiInstance = thisAiInstance;
            return await aiInstance.prompt(prompt);
        }
        else {
            const aiInstance = thisAiInstance;
            return await aiInstance.prompt(prompt);
        }
    }
    catch (error) {
        throw new Error(`skeetNaming: ${error}`);
    }
};
exports.skeetNaming = skeetNaming;
//# sourceMappingURL=index.js.map