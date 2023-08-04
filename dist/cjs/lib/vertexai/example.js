"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vertexAi_1 = require("./vertexAi");
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
                content: 'Tell me about the Skeet framework.',
            },
        ],
    };
    const response = await (0, vertexAi_1.vertexAi)(prompt);
    console.log(response);
};
run();
//# sourceMappingURL=example.js.map