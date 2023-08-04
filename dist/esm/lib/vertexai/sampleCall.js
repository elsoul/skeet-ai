import { vertexAi } from './vertexAi';
const run = async () => {
    const prompt = {
        context: 'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
        examples: [
            {
                input: {
                    content: 'What is the Skeet framework and what benefits does it offer for app development?',
                },
                output: {
                    content: 'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
                },
            },
        ],
        messages: [
            {
                author: 'user',
                content: 'Are you ok?',
            },
        ],
    };
    const project = 'figaro-cloud-387909';
    const location = 'europe-west3';
    const model = 'chat-bison@001';
    const options = {
        projectId: project,
        location,
        model,
        temperature: 0.2,
        maxOutputTokens: 256,
        topP: 0.95,
        topK: 40,
    };
    const response = await vertexAi(prompt, options);
    console.log(response);
};
run();
//# sourceMappingURL=sampleCall.js.map