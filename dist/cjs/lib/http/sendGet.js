"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGet = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendGet = async (url, params, token) => {
    try {
        let headers = { 'Content-Type': 'application/json' };
        let urlWithParams = url;
        if (params) {
            const queryParams = new URLSearchParams(params).toString();
            urlWithParams = `${url}?${queryParams}`;
        }
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await (0, node_fetch_1.default)(urlWithParams, {
            method: 'GET',
            headers,
        });
        return res;
    }
    catch (e) {
        console.log({ e });
        throw new Error('sendGET failed');
    }
};
exports.sendGet = sendGet;
//# sourceMappingURL=sendGet.js.map