"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateVertexPromptParams = void 0;
const translate_1 = require("./translate");
const translateVertexPromptParams = async (params, target = 'en') => {
    try {
        params.context = await (0, translate_1.translate)(params.context, target);
        params.examples = await Promise.all(params.examples.map(async (example) => {
            return {
                input: {
                    content: await (0, translate_1.translate)(example.input.content),
                },
                output: {
                    content: await (0, translate_1.translate)(example.output.content),
                },
            };
        }));
        params.messages = await Promise.all(params.messages.map(async (message) => {
            return {
                author: message.author,
                content: await (0, translate_1.translate)(message.content),
            };
        }));
        return params;
    }
    catch (error) {
        throw new Error(`translateVertexPromptParams error: ${error}`);
    }
};
exports.translateVertexPromptParams = translateVertexPromptParams;
//# sourceMappingURL=translateVertexPromptParams.js.map