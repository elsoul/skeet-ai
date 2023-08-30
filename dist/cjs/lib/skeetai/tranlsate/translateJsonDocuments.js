"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateJsonDocuments = exports.splitContentIntoChunks = void 0;
const fs_1 = require("fs");
const translateDocument_1 = require("./translateDocument");
const splitContentIntoChunks = (content, linesPerChunk) => {
    const lines = content.split('\n');
    const chunks = [];
    for (let i = 0; i < lines.length; i += linesPerChunk) {
        chunks.push(lines.slice(i, i + linesPerChunk).join('\n'));
    }
    return chunks;
};
exports.splitContentIntoChunks = splitContentIntoChunks;
const translateJsonDocuments = async (paths, langFrom = 'ja', langTo = 'en', ai, aiInstance) => {
    let i = 0;
    console.log(`From ${langFrom} to ${langTo}`);
    const outputPaths = [];
    for (const path of paths) {
        console.log(`Translating document: ${i + 1}/${paths.length} paths`);
        const content = (0, fs_1.readFileSync)(path, 'utf-8');
        const chunks = (0, exports.splitContentIntoChunks)(content, 20);
        console.log(`Split into ${chunks.length} chunks`);
        const translatedChunks = [];
        let j = 0;
        for (const chunk of chunks) {
            console.log(`Translating chunk: ${j + 1}/${chunks.length} chunks`);
            const translatedChunk = await (0, translateDocument_1.translateDocument)(chunk, ai, aiInstance, 'json', langFrom, langTo);
            translatedChunks.push(translatedChunk);
            j++;
        }
        const outputPath = path.replace('.json', `-${langTo}.json`);
        outputPaths.push(outputPath);
        const combinedTranslatedContent = translatedChunks.join('\n');
        (0, fs_1.writeFileSync)(outputPath, combinedTranslatedContent);
        i++;
    }
    console.log('Generated documents: ', outputPaths);
};
exports.translateJsonDocuments = translateJsonDocuments;
//# sourceMappingURL=translateJsonDocuments.js.map