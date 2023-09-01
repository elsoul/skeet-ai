export type Example = {
  context: string
  examples: InputOutput[]
}

export type InputOutput = {
  input: string
  output: string
}

export enum NamingEnum {
  MIGRATION = 'migration',
  FUNCTION = 'function',
  MODEL = 'model',
}

export const MODEL_PATH = `./functions/skeet/src/models`
