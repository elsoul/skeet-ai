import { generatePrompt } from '../../genPrompt';
import { migrationPrompt, namingPrompt } from './prompt';
export const skeetNaming = async (content, thisAi, thisAiInstance, isMigration = false) => {
    try {
        const example = isMigration ? migrationPrompt : namingPrompt;
        const prompt = generatePrompt(example.context, example.examples, content, thisAi);
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
//# sourceMappingURL=index.js.map