"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDiscord = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendDiscord = async (content, webhookUrl) => {
    try {
        const body = {
            content,
            username: 'Skeet Notifier',
        };
        const res = await (0, node_fetch_1.default)(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(`Discord result status: ${res.status}`);
        if (res.status !== 204)
            return false;
        return true;
    }
    catch (e) {
        console.log({ error: `Skeet sendDiscord Error - ${content}` });
        return false;
    }
};
exports.sendDiscord = sendDiscord;
//# sourceMappingURL=sendDiscord.js.map