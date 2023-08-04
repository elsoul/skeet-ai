"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utcNow = exports.sleep = void 0;
const date_fns_tz_1 = require("date-fns-tz");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
const utcNow = async () => {
    const now = new Date();
    const timeZone = 'UTC';
    const nowUtc = (0, date_fns_tz_1.utcToZonedTime)(now, timeZone);
    return nowUtc;
};
exports.utcNow = utcNow;
//# sourceMappingURL=time.js.map