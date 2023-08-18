export function generatePrompt(context, examples, content, ai) {
    if (ai === 'VertexAI') {
        return {
            context,
            examples: examples.map((example) => ({
                input: { content: example.input },
                output: { content: example.output },
            })),
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
            ...examples.flatMap((example) => [
                { role: 'user', content: example.input },
                { role: 'assistant', content: example.output },
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