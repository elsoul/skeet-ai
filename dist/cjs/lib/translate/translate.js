"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const translate_1 = require("@google-cloud/translate");
const util_1 = require("util");
const googleTranslate = new translate_1.v2.Translate();
const translate = async (text, target = 'ja') => {
    try {
        const result = await googleTranslate.translate(text, target);
        const translations = Array.isArray(result[0])
            ? result[0]
            : [result[0]];
        return translations[0];
    }
    catch (error) {
        throw new Error(`Error in translate: ${(0, util_1.inspect)(error)}`);
    }
};
exports.translate = translate;
//# sourceMappingURL=translate.js.map