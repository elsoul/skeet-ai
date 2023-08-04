export const convertToKebabCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
export const convertFromKebabCaseToLowerCase = (str) => {
    return str.replace(/-/g, '').toLowerCase();
};
export const toPascalCase = (str) => {
    return str
        .split(/(?=[A-Z])|[-_\s]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};
export const toCamelCase = (str) => {
    return str
        .split(/(?=[A-Z])|[-_\s]/)
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
};
export const toUpperCase = async (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const toLowerCase = async (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
//# sourceMappingURL=string.js.map