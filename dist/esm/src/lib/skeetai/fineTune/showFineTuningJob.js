import * as dotenv from 'dotenv';
dotenv.config();
export const showFineTuningJob = async (jobId, thisAi, thisAiInstance) => {
    if (thisAi === 'VertexAI') {
        console.log(`Coming soon...`);
        return;
    }
    else {
        const openai = thisAiInstance;
        const fineTune = await openai.showFineTuningJob(jobId);
        console.log(fineTune);
        return fineTune;
    }
};
//# sourceMappingURL=showFineTuningJob.js.map