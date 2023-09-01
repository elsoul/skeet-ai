import { generatePrompt } from '@/lib/genPrompt';
import { migrationNamingPrompt, functionNamingPrompt, modelNamingPrompt, } from './prompt';
import { NamingEnum } from '@/lib/types/skeetaiTypes';
export const skeetNaming = async (content, thisAi, thisAiInstance, namingEnum) => {
    try {
        let example = { context: '', examples: [] };
        if (namingEnum === NamingEnum.MIGRATION) {
            example = migrationNamingPrompt;
        }
        else if (namingEnum === NamingEnum.FUNCTION) {
            example = functionNamingPrompt;
        }
        else if (namingEnum === NamingEnum.MODEL) {
            example = modelNamingPrompt;
        }
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