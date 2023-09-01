import { generatePrompt } from '@/lib/genPrompt';
import { debugPrompt } from './prompt';
import { readFileSync } from 'fs';
export const skeetDebug = async (content, thisAi, thisAiInstance, debugFile) => {
    try {
        const tsconfigJson = readFileSync('tsconfig.json', 'utf8');
        const packageJson = readFileSync('package.json', 'utf8');
        const debugFileContent = readFileSync(debugFile, 'utf8');
        const example = debugPrompt(tsconfigJson, packageJson, debugFileContent);
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
        throw new Error(`skeetDebug: ${error}`);
    }
};
//# sourceMappingURL=index.js.map