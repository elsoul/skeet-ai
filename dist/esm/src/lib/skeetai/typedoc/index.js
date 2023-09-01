import { generatePrompt } from '../../../lib/genPrompt';
import { typedocPrompt } from './prompt';
export const skeetGenTypedoc = async (content, thisAi, thisAiInstance) => {
    try {
        const example = typedocPrompt();
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
        throw new Error(`skeetPrompt: ${error}`);
    }
};
//# sourceMappingURL=index.js.map