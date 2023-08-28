"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrompt = void 0;
function generatePrompt(context, examples, content, ai) {
    if (ai === 'VertexAI') {
        const vertexExamples = [];
        for (let i = 0; i < examples.length; i += 2) {
            vertexExamples.push({
                input: { content: examples[i].input },
                output: { content: examples[i + 1]?.output || '' },
            });
        }
        return {
            context,
            examples: vertexExamples,
            messages: [
                {
                    author: 'user',
                    content,
                },
            ],
        };
    }
    else if (ai === 'OpenAI') {
        const exampleMessages = [];
        for (const example of examples) {
            if (example.input)
                exampleMessages.push({
                    role: 'user',
                    content: example.input,
                });
            if (!example.output)
                continue;
            exampleMessages.push({
                role: 'assistant',
                content: example.output,
            });
        }
        const messages = [
            {
                role: 'system',
                content: context,
            },
            ...exampleMessages,
            {
                role: 'user',
                content,
            },
        ];
        return {
            messages,
        };
    }
    else {
        throw new Error('Unsupported AI type');
    }
}
exports.generatePrompt = generatePrompt;
//# sourceMappingURL=genPrompt.js.map