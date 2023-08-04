import { createHash } from 'crypto';
export const gravatarIconUrl = (email) => {
    try {
        const md5Hash = createHash('md5');
        const trimmedEmail = email.trim().toLowerCase();
        const hash = md5Hash.update(trimmedEmail).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}?d=retro&s=256`;
    }
    catch (error) {
        throw new Error(`gravatarIconUrl: ${error}`);
    }
};
//# sourceMappingURL=placeholder.js.map