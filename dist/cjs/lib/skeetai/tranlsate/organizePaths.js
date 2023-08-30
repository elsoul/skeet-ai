"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizeFilesByExtension = void 0;
const organizeFilesByExtension = (paths) => {
    const mdFiles = [];
    const jsonFiles = [];
    for (const path of paths) {
        if (path.endsWith('.md')) {
            mdFiles.push(path);
        }
        else if (path.endsWith('.json')) {
            jsonFiles.push(path);
        }
    }
    return {
        mdFiles,
        jsonFiles,
    };
};
exports.organizeFilesByExtension = organizeFilesByExtension;
//# sourceMappingURL=organizePaths.js.map