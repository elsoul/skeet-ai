import * as chalk from 'chalk';
export declare module Logger {
    const successHex: chalk.ChalkInstance;
    const warningHex: chalk.ChalkInstance;
    const errorHex: chalk.ChalkInstance;
    const syncHex: chalk.ChalkInstance;
    const greyHex: chalk.ChalkInstance;
    const indigoHex: chalk.ChalkInstance;
    const pinkHex: chalk.ChalkInstance;
    const normal: (text: string) => void;
    const success: (text: string) => void;
    const warning: (text: string) => void;
    const errorString: (text: string) => string;
    const sync: (text: string) => void;
    const grey: (text: string) => void;
    const successCheck: (text: string) => void;
    const error: (text: string) => void;
    const dnsSetupLog: (nameServerAddresses: Array<string>) => void;
}
