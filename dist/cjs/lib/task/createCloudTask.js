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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCloudTask = void 0;
const createGraphqlTask_1 = require("./createGraphqlTask");
const sendGraphqlRequest_1 = require("./sendGraphqlRequest");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const createCloudTask = async (queryName, params, endpoint = 'http://localhost:3000/graphql', returnParams = ['id'], inSeconds = 0) => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            const postResponse = await (0, sendGraphqlRequest_1.sendGraphqlRequest)('mutation', queryName, params);
            const result = {
                data: {
                    cloudTask: {
                        id: postResponse.data[queryName].id,
                        env: 'development',
                    },
                },
            };
            return result;
        }
        else {
            const result = await (0, createGraphqlTask_1.createGraphqlTask)(queryName, params, endpoint, returnParams, inSeconds);
            return result;
        }
    }
    catch (error) {
        throw new Error(`Error in createCloudTask: ${error}`);
    }
};
exports.createCloudTask = createCloudTask;
//# sourceMappingURL=createCloudTask.js.map