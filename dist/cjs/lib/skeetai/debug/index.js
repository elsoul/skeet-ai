"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetDebug = void 0;
const genPrompt_1 = require("../../genPrompt");
const prompt_1 = require("./prompt");
const fs_1 = require("fs");
const skeetDebug = async (content, thisAi, thisAiInstance, debugFile) => {
    try {
        const tsconfigJson = (0, fs_1.readFileSync)('tsconfig.json', 'utf8');
        const packageJson = (0, fs_1.readFileSync)('package.json', 'utf8');
        const debugFileContent = (0, fs_1.readFileSync)(debugFile, 'utf8');
        const example = (0, prompt_1.debugPrompt)(tsconfigJson, packageJson, debugFileContent);
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
        throw new Error(`skeetDebug: ${error}`);
    }
};
exports.skeetDebug = skeetDebug;
//# sourceMappingURL=index.js.map