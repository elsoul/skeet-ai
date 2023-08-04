"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.Logger = {
    info: (message) => console.log(chalk_1.default.white(message)),
    error: (message) => console.log(chalk_1.default.red(message)),
    success: (message) => {
        const successHex = chalk_1.default.hex('#39A845');
        const check = successHex('✔');
        const plainText = chalk_1.default.white(message);
        const textLog = `${check} ${plainText} 🎉`;
        console.log(textLog);
    },
};
//# sourceMappingURL=logger.js.map