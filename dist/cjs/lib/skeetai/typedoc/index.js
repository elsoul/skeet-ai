"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetGenTypedoc = void 0;
const genPrompt_1 = require("../../../lib/genPrompt");
const prompt_1 = require("./prompt");
const skeetGenTypedoc = async (content, thisAi, thisAiInstance) => {
    try {
        const example = (0, prompt_1.typedocPrompt)();
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
        throw new Error(`skeetPrompt: ${error}`);
    }
};
exports.skeetGenTypedoc = skeetGenTypedoc;
//# sourceMappingURL=index.js.map