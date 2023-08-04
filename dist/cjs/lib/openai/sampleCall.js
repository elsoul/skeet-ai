"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openAi_1 = require("./openAi");
const run = async () => {
    const prompt = {
        messages: [
            {
                role: 'system',
                content: 'You are a human. The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.',
            },
            {
                role: 'user',
                content: 'Hello, who are you?',
            },
        ],
    };
    const result = await (0, openAi_1.openAi)(prompt);
    console.log(result);
};
run();
//# sourceMappingURL=sampleCall.js.map