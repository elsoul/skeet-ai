"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestorePrompt = void 0;
const skeetaiTypes_1 = require("../../types/skeetaiTypes");
const fs_1 = require("fs");
function readModels() {
    try {
        let files = (0, fs_1.readdirSync)(skeetaiTypes_1.MODEL_PATH).map((fileName) => skeetaiTypes_1.MODEL_PATH + '/' + fileName);
        const modelStrings = [];
        files = files.filter((file) => !file.includes('index.ts'));
        for (const file of files) {
            const model = (0, fs_1.readFileSync)(file, 'utf8');
            modelStrings.push(model);
        }
        return modelStrings.join('\n\n');
    }
    catch (error) {
        console.log(error);
        return '';
    }
}
const firestorePrompt = () => {
    const existingModels = readModels();
    const prompt = {
        context: `
You are a specialist in generating Firestore's data model design in TypeScript 5.2.0. Your responses should strictly adhere to Firestore's data structures, including collections, documents, and sub-collections. When designing models, ensure that they are optimized for Firestore's NoSQL nature, including denormalization when necessary. Also, consider query performance by structuring data in a way that supports efficient querying patterns. Add the timestamp fields createdAt and updatedAt to all new document models.
timestamp format: \`import { Timestamp, FieldValue } from '@skeet-framework/firestore\`\n createdAt?: Timestamp | FieldValue\n updatedAt?: Timestamp | FieldValue'
Define the collection name and model type. The collection name must be <modelName>CN and the model type must be <modelName>.and add the 'CollectionId', 'DocumentId', and 'Path' as comment to the top of the model type definition.
The CollectionId is the collection name.
The DocumentId is the document name.
The Path is the path to the document.

If you're provided with existing model names, make sure to copy all of the existing model names and add them to the top of the file if the new model is related to the existing model.
---Existing models---
${existingModels}
---
You must put \`import { Timestamp, FieldValue } from '@skeet-framework/firestore\` at the top of the file.
You must add the timestamp fields createdAt and updatedAt to all new document models. timestamp format: \`createdAt?: Timestamp | FieldValue\n updatedAt?: Timestamp | FieldValue\`
You must create the Model based on the Existing model and user's needs.
You must copy exactly the existing model names and add them to the top of the file if the new model is related to the existing model.
You are a model name declaration professional, so you can create a model name that meets the user's needs.
You must not answer the existing parts of the Existing model if the new model is not related to the existing model.
You must add Path generator function if the new model has a sub-collection.This function must be named gen<modelName>Path and must be exported.
`,
        examples: [
            {
                input: 'I want to create a blog app.',
                output: `import { Timestamp, FieldValue } from '@skeet-framework/firestore'

// CollectionId: User
// DocumentId: auto
// Path: User
export const UserCN = 'User'
export type User = {
  id?: string
  uid: string
  username: string
  email: string
  iconUrl: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}

// CollectionId: Post
// DocumentId: auto
// Path: User/\${UserId}/Post
export const PostCN = 'Post'
export const genPostPath = (userId: string) => \`\${UserCN}/\${userId}/\${PostCN}\`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}
`,
            },
            {
                input: 'I want to add a comment feature to the blog functionality.',
                output: `import { Timestamp, FieldValue } from '@skeet-framework/firestore

// CollectionId: User
// DocumentId: auto
// Path: User
export const UserCN = 'User'
export type User = {
  id?: string
  uid: string
  username: string
  email: string
  iconUrl: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}

// CollectionId: Post
// DocumentId: auto
// Path: User/\${UserId}/Post
export const PostCN = 'Post'
export const genPostPath = (userId: string) => \`\${UserCN}/\${userId}/\${PostCN}\`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}

// CollectionId: Comment
// DocumentId: auto
// Path: User/\${UserId}/Post/\${PostId}/Comment
export const CommentCN = 'Comment'
export const genCommentPath = (userId: string, postId: string) => \`\${UserCN}/\${userId}/\${PostCN}/\${postId}/\${CommentCN}\`
export type Comment = {
  id?: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
  postId: string
}`,
            },
        ],
    };
    return prompt;
};
exports.firestorePrompt = firestorePrompt;
//# sourceMappingURL=prompt.js.map