"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetPrompt = void 0;
const genPrompt_1 = require("@/lib/genPrompt");
const fs_1 = require("fs");
const skeetPrompt = async (content, thisAi, thisAiInstance) => {
    try {
        const json = JSON.parse((0, fs_1.readFileSync)(`${__dirname}/examples/skeetExamples.json`, 'utf8'));
        const prompt = (0, genPrompt_1.generatePrompt)(json.context, json.examples, content, thisAi);
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
        throw new Error(`skeetPrompt: ${error}`);
    }
};
exports.skeetPrompt = skeetPrompt;
//# sourceMappingURL=index.js.map