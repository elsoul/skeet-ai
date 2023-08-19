export function generatePrompt(context, examples, content, ai) {
    var _a;
    if (ai === 'VertexAI') {
        const vertexExamples = [];
        for (let i = 0; i < examples.length; i += 2) {
            vertexExamples.push({
                input: { content: examples[i].input },
                output: { content: ((_a = examples[i + 1]) === null || _a === void 0 ? void 0 : _a.output) || '' },
            });
        }
        return {
            context,
            examples: vertexExamples,
            messages: [
                {
                    author: 'user',
                    content: content,
                },
            ],
        };
    }
    else if (ai === 'OpenAI') {
        const messages = [
            {
                role: 'system',
                content: context,
            },
            ...examples.flatMap((example, index) => [
                {
                    role: index % 2 === 0 ? 'user' : 'assistant',
                    content: index % 2 === 0 ? example.input : example.output,
                },
            ]),
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
//# sourceMappingURL=genPrompt.js.map