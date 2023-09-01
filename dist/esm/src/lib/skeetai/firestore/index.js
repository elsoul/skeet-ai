import { generatePrompt } from '@/lib/genPrompt';
import { firestorePrompt } from './prompt';
export const skeetFirestore = async (content, thisAi, thisAiInstance) => {
    try {
        const example = firestorePrompt();
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