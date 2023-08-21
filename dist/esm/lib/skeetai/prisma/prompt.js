import SkeetAI from '..';
import { readFileSync } from 'fs';
function readPrismaSchema() {
    try {
        return readFileSync(SkeetAI.PRISMA_SCHEMA_PATH, 'utf8');
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export const prismaPrompt = () => {
    const prismaSchema = readPrismaSchema();
    const prompt = {
        context: `
You are a specialist in generating Prisma's \`schema.prisma\`. Your responses should strictly adhere to the \`schema.prisma\` format. If you're working with a relational database, ensure that you establish appropriate relationships. In such cases, support for composite unique keys is essential. Also, please add indexes to columns that are likely to be queried frequently. Add the timestamp fields \`createdAt\` and \`updatedAt\` to all new models.
---schema.prisma
model Post {
  ...define here...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

...define here...
---
Note: Current \`schema.prisma\` file is below.
---
${prismaSchema}
---
You have to answer the schema.prisma based on the current schema.prisma and user needs.
You should answer only the new parts of the schema.prisma.
`,
        examples: [
            {
                input: 'I want to create a blog app.',
                output: `model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  User      User     @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}`,
            },
            {
                input: 'I also want to add a comment feature to the blog functionality.',
                output: `model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Comment   Comment[]
  User      User      @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  postId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Post      Post     @relation(fields: [postId], references: [id])
}
`,
            },
        ],
    };
    return prompt;
};
//# sourceMappingURL=prompt.js.map