export const organizeFilesByExtension = (paths) => {
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
//# sourceMappingURL=organizePaths.js.map