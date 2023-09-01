import { generatePrompt } from '@/lib/genPrompt';
import { markdownTranslatePrompt, jsonTranslatePrompt } from './prompt';
export const translateDocument = async (content, thisAi, thisAiInstance, mode, langFrom = 'ja', langTo = 'en') => {
    try {
        const example = mode === 'markdown'
            ? markdownTranslatePrompt(langFrom, langTo)
            : jsonTranslatePrompt(langFrom, langTo);
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
        throw new Error(`skeetDocument: ${error}`);
    }
};
//# sourceMappingURL=translateDocument.js.map