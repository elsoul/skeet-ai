import { generatePrompt } from '../../../lib/genPrompt';
import { readFileSync } from 'fs';
export const skeetPrompt = async (content, thisAi, thisAiInstance) => {
    try {
        const json = JSON.parse(readFileSync(`${__dirname}/examples/skeetExamples.json`, 'utf8'));
        const prompt = generatePrompt(json.context, json.examples, content, thisAi);
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
//# sourceMappingURL=index.js.map