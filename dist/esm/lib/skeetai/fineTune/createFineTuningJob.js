import * as dotenv from 'dotenv';
dotenv.config();
export const createFineTuningJob = async (uploadFileId, model = 'gpt-3.5-turbo-0613', thisAi, thisAiInstance) => {
    if (thisAi === 'VertexAI') {
        console.log(`Coming soon...`);
        return;
    }
    else {
        const openai = thisAiInstance;
        const fineTune = await openai.createFineTuningJob(uploadFileId, model);
        console.log(fineTune);
        return fineTune;
    }
};
//# sourceMappingURL=createFineTuningJob.js.map