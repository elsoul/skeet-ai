import chalk from 'chalk';
export const Logger = {
    info: (message) => console.log(chalk.white(message)),
    error: (message) => console.log(chalk.red(message)),
    success: (message) => {
        const successHex = chalk.hex('#39A845');
        const check = successHex('✔');
        const plainText = chalk.white(message);
        const textLog = `${check} ${plainText} 🎉`;
        console.log(textLog);
    },
};
//# sourceMappingURL=logger.js.map