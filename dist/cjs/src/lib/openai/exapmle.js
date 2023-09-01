"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const genPrompt_1 = require("@/lib/genPrompt");
const skeetai_1 = __importDefault(require("@/lib/skeetai"));
const exampleJosn = JSON.parse((0, fs_1.readFileSync)('./src/lib/examplePrompt.json', 'utf8'));
const run = async () => {
    const content = 'Tell me about the Skeet framework.';
    const prompt = (0, genPrompt_1.generatePrompt)(exampleJosn.context, exampleJosn.examples, content, 'OpenAI');
    const openAi = new skeetai_1.default({
        ai: 'OpenAI',
    }).aiInstance;
    const result = await openAi.prompt(prompt);
    console.log(JSON.stringify(result, null, 2));
    console.log('Question:\n', prompt.messages[3].content);
    console.log('\nAnswer:\n', result);
    const content2 = 'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.';
    const title = await openAi.generateTitle(content2);
    console.log('\nOriginal content:\n', content);
    console.log('\nGenerated title:\n', title);
};
run();
//# sourceMappingURL=exapmle.js.map