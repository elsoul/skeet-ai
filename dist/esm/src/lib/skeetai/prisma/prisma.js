import { prismaPrompt } from './prompt';
import { generatePrompt } from '../../genPrompt';
export const skeetAiPrisma = async (content, thisAi, thisAiInstance) => {
    try {
        const example = prismaPrompt();
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
        throw new Error(`skeetAiPrisma: ${error}`);
    }
};
//# sourceMappingURL=prisma.js.map