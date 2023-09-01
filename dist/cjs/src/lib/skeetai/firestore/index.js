"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetFirestore = void 0;
const genPrompt_1 = require("@/lib/genPrompt");
const prompt_1 = require("./prompt");
const skeetFirestore = async (content, thisAi, thisAiInstance) => {
    try {
        const example = (0, prompt_1.firestorePrompt)();
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
exports.skeetFirestore = skeetFirestore;
//# sourceMappingURL=index.js.map