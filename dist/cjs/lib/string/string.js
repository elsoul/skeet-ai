"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowerCase = exports.toUpperCase = exports.toCamelCase = exports.toPascalCase = exports.convertFromKebabCaseToLowerCase = exports.convertToKebabCase = void 0;
const convertToKebabCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
exports.convertToKebabCase = convertToKebabCase;
const convertFromKebabCaseToLowerCase = (str) => {
    return str.replace(/-/g, '').toLowerCase();
};
exports.convertFromKebabCaseToLowerCase = convertFromKebabCaseToLowerCase;
const toPascalCase = (str) => {
    return str
        .split(/(?=[A-Z])|[-_\s]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};
exports.toPascalCase = toPascalCase;
const toCamelCase = (str) => {
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
exports.toCamelCase = toCamelCase;
const toUpperCase = async (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.toUpperCase = toUpperCase;
const toLowerCase = async (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
exports.toLowerCase = toLowerCase;
//# sourceMappingURL=string.js.map