import chalk from 'chalk'

export const Logger = {
  info: (message: string) => console.log(chalk.white(message)),
  error: (message: string) => console.log(chalk.red(message)),
  success: (message: string) => {
    const successHex = chalk.hex('#39A845')
    const check = successHex('✔')
    const plainText = chalk.white(message)
    const textLog = `${check} ${plainText} 🎉`
    console.log(textLog)
  },
}
