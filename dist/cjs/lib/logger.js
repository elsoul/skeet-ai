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
exports.Logger = void 0;
const chalk = __importStar(require("chalk"));
const chalkInst = new chalk.Chalk();
var Logger;
(function (Logger) {
    Logger.successHex = chalkInst.hex('#39A845');
    Logger.warningHex = chalkInst.hex('#FFD02E');
    Logger.errorHex = chalkInst.hex('#B5332E');
    Logger.syncHex = chalkInst.hex('#3073B7');
    Logger.greyHex = chalkInst.hex('#BEBDBD');
    Logger.indigoHex = chalkInst.hex('#3950A0');
    Logger.pinkHex = chalkInst.hex('#D8A1C4');
    Logger.normal = (text) => {
        console.log(chalkInst.white(text));
    };
    Logger.success = (text) => {
        console.log(Logger.successHex(text));
    };
    Logger.warning = (text) => {
        console.log(Logger.warningHex(text));
    };
    Logger.errorString = (text) => {
        return Logger.errorHex(text);
    };
    Logger.sync = (text) => {
        console.log(Logger.syncHex(text));
    };
    Logger.grey = (text) => {
        console.log(Logger.greyHex(text));
    };
    Logger.successCheck = (text) => {
        const check = Logger.successHex('✔');
        const plainText = chalkInst.white(text);
        const textLog = `${check} ${plainText} 🎉`;
        console.log(textLog);
    };
    Logger.error = (text) => {
        const check = Logger.errorHex('✔');
        const plainText = chalkInst.white(text);
        const textLog = `${check} ${plainText} ⚠️`;
        console.log(textLog);
    };
    Logger.dnsSetupLog = (nameServerAddresses) => {
        Logger.warning('🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸\n');
        const exportLog = `${nameServerAddresses.join('\n')}\n`;
        Logger.normal(exportLog);
        // Logger.warning('🚸 =========           END           ========= 🚸\n\n')
        Logger.warning('👷 === https will be ready in about an hour after your DNS settings === 👷\n');
        Logger.successCheck(`You are all set`);
        Logger.normal(`\n📗 Doc: https://skeet.dev`);
    };
})(Logger || (exports.Logger = Logger = {}));
//# sourceMappingURL=logger.js.map