"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeetAiTranslates = void 0;
const extractSectionsFromMd_1 = require("./extractSectionsFromMd");
const translateDocument_1 = require("./translateDocument");
const fs_1 = require("fs");
const translateJsonDocuments_1 = require("./translateJsonDocuments");
const organizePaths_1 = require("./organizePaths");
const skeetAiTranslates = async (paths, langFrom, langTo, thisAi, thisAiInstance) => {
    try {
        const organizedPaths = (0, organizePaths_1.organizeFilesByExtension)(paths);
        if (organizedPaths.mdFiles.length !== 0)
            await translateMarkdownDocuments(organizedPaths.mdFiles, langFrom, langTo, thisAi, thisAiInstance);
        if (organizedPaths.jsonFiles.length !== 0)
            await (0, translateJsonDocuments_1.translateJsonDocuments)(organizedPaths.jsonFiles, langFrom, langTo, thisAi, thisAiInstance);
    }
    catch (error) {
        throw new Error(`skeetDocument: ${error}`);
    }
};
exports.skeetAiTranslates = skeetAiTranslates;
const translateMarkdownDocuments = async (paths, langFrom = 'ja', langTo = 'en', ai, aiInstance) => {
    let i = 0;
    console.log(`From ${langFrom} to ${langTo}`);
    const outputPaths = [];
    for (const path of paths) {
        console.log(`\nTranslating document: ${i + 1}/${paths.length} paths`);
        const sections = (0, extractSectionsFromMd_1.extractSectionsFromMd)(path);
        let j = 0;
        const outputPath = path.replace('.md', `-${langTo}.md`);
        outputPaths.push(outputPath);
        const mdContents = [];
        for (const section of sections) {
            console.log(`\nTranslating section: ${j + 1}/${sections.length}`);
            const translatedContent = await (0, translateDocument_1.translateDocument)(section, ai, aiInstance, 'markdown', langFrom, langTo);
            mdContents.push(translatedContent);
            console.log(translatedContent);
            j++;
        }
        (0, fs_1.writeFileSync)(outputPath, mdContents.join('\n\n'));
        i++;
    }
    console.log('Generated documents: ', outputPaths);
};
//# sourceMappingURL=index.js.map