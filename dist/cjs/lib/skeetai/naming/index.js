"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetNaming = void 0;
const genPrompt_1 = require("../../genPrompt");
const prompt_1 = require("./prompt");
const skeetNaming = async (content, thisAi, thisAiInstance, isMigration = false) => {
    try {
        const example = isMigration ? prompt_1.migrationPrompt : prompt_1.namingPrompt;
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