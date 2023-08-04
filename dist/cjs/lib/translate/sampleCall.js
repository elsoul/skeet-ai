"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translate_1 = require("./translate");
const run = async () => {
    const text = 'Hello, world!How are you? What are you up for today?';
    const target = 'ja';
    const response = await (0, translate_1.translate)(text, target);
    console.log(response);
};
run();
//# sourceMappingURL=sampleCall.js.map