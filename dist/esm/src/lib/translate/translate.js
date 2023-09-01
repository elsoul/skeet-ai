import { v2 } from '@google-cloud/translate';
import { inspect } from 'util';
const googleTranslate = new v2.Translate();
export const translate = async (text, target = 'ja') => {
    try {
        const result = await googleTranslate.translate(text, target);
        const translations = Array.isArray(result[0])
            ? result[0]
            : [result[0]];
        return translations[0];
    }
    catch (error) {
        throw new Error(`Error in translate: ${inspect(error)}`);
    }
};
//# sourceMappingURL=translate.js.map