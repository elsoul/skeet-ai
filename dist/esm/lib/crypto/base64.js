export const encodeBase64 = async (payload) => {
    return Buffer.from(payload).toString('base64');
};
export const decodeBase64 = async (payload) => {
    return Buffer.from(payload, 'base64').toString('utf-8');
};
//# sourceMappingURL=base64.js.map