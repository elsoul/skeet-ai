"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vertexAi_1 = require("./vertexAi");
const run = async () => {
    const prompt = {
        context: 'あなたは、Web アプリケーションを構築するためのフレームワークである Skeet フレームワークに精通している開発者です。',
        examples: [
            {
                input: {
                    content: 'Skeet フレームワークとは何ですか?また、それがアプリ開発にどのようなメリットをもたらしますか?',
                },
                output: {
                    content: 'Skeet フレームワークは、アプリケーションの開発および運用コストを削減することを目的とした、オープンソースのフルスタック アプリケーション開発ソリューションです。これにより、開発者はインフラストラクチャについて心配する必要がなくなり、アプリケーション ロジックに集中できるようになります。このフレームワークは、SQL と NoSQL を組み合わせて構築できます。',
                },
            },
        ],
        messages: [
            {
                author: 'user',
                content: 'Skeet フレームワークについて教えてください。',
            },
        ],
    };
    const options = {
        isJapanese: true,
    };
    const response = await (0, vertexAi_1.vertexAi)(prompt, options);
    console.log(response);
};
run();
//# sourceMappingURL=exampleJa.js.map