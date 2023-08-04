import { utcToZonedTime } from 'date-fns-tz';
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export const utcNow = async () => {
    const now = new Date();
    const timeZone = 'UTC';
    const nowUtc = utcToZonedTime(now, timeZone);
    return nowUtc;
};
//# sourceMappingURL=time.js.map