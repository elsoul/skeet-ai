"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetAiPrisma = void 0;
const prompt_1 = require("./prompt");
const genPrompt_1 = require("@/lib/genPrompt");
const skeetAiPrisma = async (content, thisAi, thisAiInstance) => {
    try {
        const example = (0, prompt_1.prismaPrompt)();
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
        throw new Error(`skeetAiPrisma: ${error}`);
    }
};
exports.skeetAiPrisma = skeetAiPrisma;
//# sourceMappingURL=prisma.js.map