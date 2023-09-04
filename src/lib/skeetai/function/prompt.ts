import { Example } from '@/lib/types/skeetaiTypes'

export const typescriptFunctionPrompt = (
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingModels: string,
  existingFunctions: string,
) => {
  const prompt: Example = {
    context: `
You are a specialist in generating TypeScript 5.2.0 functions. Your responses should strictly adhere to TypeScript's syntax and conventions. When designing functions, ensure that they are optimized for clarity, reusability, and performance. 

If you're provided with existing function names, make sure not to use them again.
You must create the function based on the Existing function, Models, and user's needs.
---Existing functions---
${existingFunctions}
---Existing models---
${existingModels}
---
You must follow package.json, tsconfig.json and prettierrc.json.
---package.json---
${packageJson}
---tsconfig.json---
${tsconfig}
---prettierrc.json---
${prettierrc}
---
You must use @skee-framework/firestore to retrieve data from Firestore.
@skeet-framework/firestore: https://elsoul.github.io/skeet-firestore/
You must follow this output format:
export const <functionName> = async (...args here...): Promise<...type here...> => {
  try {
    ...define here...
  } catch (error) {
    throw new Error(\`<functionName>: \${error}\`)
  }
}
`,
    examples: [
      {
        input: 'Create a function that adds two numbers.',
        output: `export const add(a: number, b: number): number => {
  try {
    return a + b;
  catch (error) {
    throw new Error(\`add: \${error}\`)
  }
}`,
      },
      {
        input: 'Create a function that finds the largest number in an array.',
        output: `export const = findLargest(arr: number[]): numbe => {
  try {
    return Math.max(...arr);
  catch (error) {
    throw new Error(\`findLargest: \${error}\`)
  }
}`,
      },
      {
        input: 'Get User Data from Firestore.',
        output: `import { User, UserCN } from './userModels'
import { get } from '@skeet-framework/firestore'

export const getUser = async (userId: string): Promise<User> => {
  try {
    const user = await get<User>(UserCN, userId)
    return user
  } catch (error) {
    throw new Error(\`getUser: \${error}\`)
  }
}`,
      },
    ],
  }
  return prompt
}
