"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gravatarIconUrl = void 0;
const crypto_1 = require("crypto");
const gravatarIconUrl = (email) => {
    try {
        const md5Hash = (0, crypto_1.createHash)('md5');
        const trimmedEmail = email.trim().toLowerCase();
        const hash = md5Hash.update(trimmedEmail).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}?d=retro&s=256`;
    }
    catch (error) {
        throw new Error(`gravatarIconUrl: ${error}`);
    }
};
exports.gravatarIconUrl = gravatarIconUrl;
//# sourceMappingURL=placeholder.js.map