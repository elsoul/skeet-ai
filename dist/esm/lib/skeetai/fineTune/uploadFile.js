import * as dotenv from 'dotenv';
dotenv.config();
export const uploadJsonlFile = async (filePath, thisAi, thisAiInstance) => {
    try {
        if (thisAi === 'VertexAI') {
            console.log(`Coming soon...`);
            return;
        }
        else {
            const openai = thisAiInstance;
            return await openai.uploadFile(filePath);
        }
    }
    catch (error) {
        throw new Error(`uploadFile: ${error}`);
    }
};
//# sourceMappingURL=uploadFile.js.map