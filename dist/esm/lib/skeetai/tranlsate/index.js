import { extractSectionsFromMd } from './extractSectionsFromMd';
import { translateDocument } from './translateDocument';
import { writeFileSync } from 'fs';
import { translateJsonDocuments } from './translateJsonDocuments';
export const skeetAiTranslates = async (paths, langFrom, langTo, thisAi, thisAiInstance, mode) => {
    try {
        mode === 'markdown'
            ? await translateMarkdownDocuments(paths, langFrom, langTo, thisAi, thisAiInstance)
            : await translateJsonDocuments(paths, langFrom, langTo, thisAi, thisAiInstance);
    }
    catch (error) {
        throw new Error(`skeetDocument: ${error}`);
    }
};
const translateMarkdownDocuments = async (paths, langFrom = 'ja', langTo = 'en', ai, aiInstance) => {
    let i = 0;
    console.log(`From ${langFrom} to ${langTo}`);
    const outputPaths = [];
    for (const path of paths) {
        console.log(`Translating document: ${i + 1}/${paths.length} paths`);
        const sections = extractSectionsFromMd(path);
        let j = 0;
        const outputPath = path.replace('.md', `-${langTo}.md`);
        outputPaths.push(outputPath);
        const mdContents = [];
        for (const section of sections) {
            console.log(`Translating section: ${j + 1}/${sections.length}`);
            const translatedContent = await translateDocument(section, ai, aiInstance, 'markdown');
            mdContents.push(translatedContent);
            console.log(translatedContent);
            j++;
        }
        writeFileSync(outputPath, mdContents.join('\n\n'));
        i++;
    }
    console.log('Generated documents: ', outputPaths);
};
//# sourceMappingURL=index.js.map