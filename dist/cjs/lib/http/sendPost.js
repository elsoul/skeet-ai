"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPost = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendPost = async (url, body, token) => {
    try {
        let headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await (0, node_fetch_1.default)(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
        return response;
    }
    catch (e) {
        console.log({ e });
        throw new Error(`sendPost failed: ${body}`);
    }
};
exports.sendPost = sendPost;
//# sourceMappingURL=sendPost.js.map