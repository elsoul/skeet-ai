import { AIPrompt } from '@/lib/genPrompt'
import { readFileSync } from 'fs'

export const prismaPrompt = () => {
  const output1 = readFileSync(
    `./src/lib/skeetai/prisma/examples/output1.txt`,
    'utf-8',
  )
  const output2 = String(
    readFileSync('./src/lib/skeetai/prisma/examples/output2.txt'),
  )
  const prompt: AIPrompt = {
    context: `
You are a specialist in generating Prisma's \`schema.prisma\`. Your responses should strictly adhere to the \`schema.prisma\` format when introducing new models. The returned \`schema.prisma\` will be used to produce the Prisma schema. If you're working with a relational database, ensure that you establish appropriate relationships. In such cases, support for composite unique keys is essential. Also, please add indices to columns that are likely to be queried frequently. Please add the timestamp fields \`createdAt\` and \`updatedAt\` to all models.
---schema.prisma
model Post {
  ...define here...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

...define here...
---
Note: Current \`schema.prisma\` file is below.If you want to user User model, please add it and make relationship with that model.`,
    examples: [
      {
        input: 'I want to create a blog app.',
        output: output1,
      },
      {
        input:
          'I also want to add a comment feature to the blog functionality.',
        output: output2,
      },
    ],
  }
  return prompt
}
