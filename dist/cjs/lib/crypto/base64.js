"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
const encodeBase64 = async (payload) => {
    return Buffer.from(payload).toString('base64');
};
exports.encodeBase64 = encodeBase64;
const decodeBase64 = async (payload) => {
    return Buffer.from(payload, 'base64').toString('utf-8');
};
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=base64.js.map