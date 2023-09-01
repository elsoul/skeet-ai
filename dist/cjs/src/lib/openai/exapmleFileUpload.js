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
const skeetai_1 = __importDefault(require("@/lib/skeetai"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const run = async () => {
    const ai = new skeetai_1.default({
        ai: 'OpenAI',
    });
    const filePath = `${__dirname}/skeetExamplesAll.json`;
    const outputPath = `${__dirname}/skeetExamplesAll.jsonl`;
    // const json = JSON.parse(readFileSync(filePath, 'utf8'))
    // const jsonl = []
    // const context = json.context
    // for await (const example of json.examples) {
    //   const line = {
    //     messages: [
    //       {
    //         role: 'system',
    //         content: context,
    //       },
    //       {
    //         role: 'user',
    //         content: example.input,
    //       },
    //       {
    //         role: 'assistant',
    //         content: example.output,
    //       },
    //     ],
    //   }
    //   jsonl.push(line)
    // }
    // const jsonlString = jsonl.map((obj) => JSON.stringify(obj)).join('\n')
    // writeFileSync(outputPath, jsonlString)
    const result = await ai.uploadFile(outputPath);
    console.log(result);
};
run();
//# sourceMappingURL=exapmleFileUpload.js.map