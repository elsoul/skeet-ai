"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedocPrompt = void 0;
const fs_1 = require("fs");
function readTscofigSet() {
    try {
        const exampleDir = `${__dirname}/examples`;
        const tsconfigJson = (0, fs_1.readFileSync)(`${exampleDir}/tsconfig.json`, 'utf8');
        const prettierrcFile = (0, fs_1.readFileSync)(`${exampleDir}/.prettierrc`, 'utf8');
        const eslintrcJson = (0, fs_1.readFileSync)(`${exampleDir}/.eslintrc.json`, 'utf8');
        return {
            tsconfigJson,
            prettierrcFile,
            eslintrcJson,
        };
    }
    catch (error) {
        throw new Error(`readTscofigSet: ${error}`);
    }
}
const typedocPrompt = () => {
    const { tsconfigJson, prettierrcFile, eslintrcJson } = readTscofigSet();
    const prompt = {
        context: `
You are a specialist in adding descriptions to functions for generating TypeDoc. Make sure to include @example in a clear and understandable manner in the TypeDoc comments. Please also consider the following settings.tsconfig.json: ${tsconfigJson}\n.prettierrc: ${prettierrcFile}\n.eslintrc.json:${eslintrcJson}`,
        examples: [
            {
                input: `export const encrypt = (
  data: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const cipher = createCipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
    cipheredData += cipher.final(outputEncoding)
    return cipheredData
  } catch (error) {
    throw new Error(\`encrypt: \${error}\`)
  }
}
`,
                output: `/**
* @module crypto
* @preferred
*/

import { createCipheriv, scryptSync } from 'crypto'
import { algorithm, inputEncoding, outputEncoding } from './crypto'

/**
* Encrypts data using the given parameters.
*
* @param data - The data to be encrypted.
* @param iv - The initialization vector.
* @param password - The password for encryption.
* @param salt - The salt for key derivation.
* @returns The encrypted data.
*
* @example
* const data = 'Sensitive information';
* const iv = '1234567890123456'; // 16 characters
* const password = 'MySecretPassword';
* const salt = 'MySalt';
* const encrypted = encrypt(data, iv, password, salt);
* console.log(encrypted);
*/
export const encrypt = (
  data: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const cipher = createCipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
    cipheredData += cipher.final(outputEncoding)
    return cipheredData
  } catch (error) {
    throw new Error(\`encrypt: \${error}\`)
  }
}`,
            },
            {
                input: `export const decrypt = (
  encryptedData: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const decipher = createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let decryptedData = decipher.update(
      encryptedData,
      outputEncoding,
      inputEncoding,
    )
    decryptedData += decipher.final(inputEncoding)
    return decryptedData
  } catch (error) {
    throw new Error(\`decrypt: \${error}\`)
  }
}`,
                output: `/**
* @module crypto
* @preferred
*/

import { createDecipheriv, scryptSync } from 'crypto'
import { algorithm, inputEncoding, outputEncoding } from './crypto'

/**
* Decrypts data using the given parameters.
*
* @param encryptedData - The encrypted data.
* @param iv - The initialization vector.
* @param password - The password for decryption.
* @param salt - The salt for key derivation.
* @returns The decrypted data.
*
* @example
* const encrypted = 'EncryptedDataHere'; // Encrypted data obtained from the encryption process
* const iv = '1234567890123456'; // Initialization vector used in the encryption process
* const password = 'MySecretPassword'; // Password used in the encryption process
* const salt = 'MySalt'; // Salt used in the encryption process
* const decrypted = decrypt(encrypted, iv, password, salt);
* console.log(decrypted);
*/
export const decrypt = (
  encryptedData: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const decipher = createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let decryptedData = decipher.update(
      encryptedData,
      outputEncoding,
      inputEncoding,
    )
    decryptedData += decipher.final(inputEncoding)
    return decryptedData
  } catch (error) {
    throw new Error(\`decrypt: \${error}\`)
  }
}`,
            },
        ],
    };
    return prompt;
};
exports.typedocPrompt = typedocPrompt;
//# sourceMappingURL=prompt.js.map