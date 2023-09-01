"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateDocument = void 0;
const genPrompt_1 = require("@/lib/genPrompt");
const prompt_1 = require("./prompt");
const translateDocument = async (content, thisAi, thisAiInstance, mode, langFrom = 'ja', langTo = 'en') => {
    try {
        const example = mode === 'markdown'
            ? (0, prompt_1.markdownTranslatePrompt)(langFrom, langTo)
            : (0, prompt_1.jsonTranslatePrompt)(langFrom, langTo);
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
        throw new Error(`skeetDocument: ${error}`);
    }
};
exports.translateDocument = translateDocument;
//# sourceMappingURL=translateDocument.js.map