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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateVertexPromptParams = exports.translate = exports.VertexAI = exports.OpenAI = exports.openai = exports.aiplatform = void 0;
const aiplatform_1 = __importDefault(require("@google-cloud/aiplatform"));
exports.aiplatform = aiplatform_1.default;
const openai = __importStar(require("openai"));
exports.openai = openai;
__exportStar(require("./lib/types/vertexaiTypes"), exports);
__exportStar(require("./lib/types/openaiTypes"), exports);
var openai_1 = require("./lib/openai");
Object.defineProperty(exports, "OpenAI", { enumerable: true, get: function () { return openai_1.OpenAI; } });
var vertexai_1 = require("./lib/vertexai");
Object.defineProperty(exports, "VertexAI", { enumerable: true, get: function () { return vertexai_1.VertexAI; } });
var translate_1 = require("./lib/translate");
Object.defineProperty(exports, "translate", { enumerable: true, get: function () { return translate_1.translate; } });
Object.defineProperty(exports, "translateVertexPromptParams", { enumerable: true, get: function () { return translate_1.translateVertexPromptParams; } });
//# sourceMappingURL=index.js.map