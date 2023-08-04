"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlString = exports.sendGraphqlRequest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const sendGraphqlRequest = async (queryType, queryName, params, returnParams = ['id']) => {
    const body = (0, exports.graphqlString)(queryType, queryName, params, returnParams);
    try {
        const baseUrl = 'http://localhost:3000/graphql';
        const res = await (0, node_fetch_1.default)(baseUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        const result = await res.json();
        console.log(`graphql body: ${body}`);
        return result;
    }
    catch (error) {
        console.log(`graphql body: ${body}`);
        throw new Error(`sendGraphqlRequest failed: ${error}`);
    }
};
exports.sendGraphqlRequest = sendGraphqlRequest;
const escapeGraphQLString = (str) => {
    return str
        .replace(/\\`/g, '`') // replace \` with `
        .replace(/\\/g, '\\\\') // replace \ with \\
        .replace(/"/g, '\\"') // replace " with \"
        .replace(/\n/g, '\\n'); // replace newline with \n
};
const graphqlString = (queryType, queryName, params, outputString = ['id']) => {
    try {
        const inputString = Object.entries(params)
            .map(([key, value]) => {
            if (value === undefined || value === null) {
                return `${key}: ""`;
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                return `${key}: ${value}`;
            }
            else {
                // Escape special characters in the string
                const escapedValue = escapeGraphQLString(value);
                return `${key}: \"${escapedValue}\"`;
            }
        })
            .join(', ');
        const returnParams = outputString.join(' ');
        const graphql = JSON.stringify({
            query: `${queryType} { ${queryName}(${inputString}) { ${returnParams} } }`,
            variables: {},
        });
        return graphql;
    }
    catch (error) {
        throw new Error(`graphqlString failed: ${error}`);
    }
};
exports.graphqlString = graphqlString;
//# sourceMappingURL=sendGraphqlRequest.js.map