/**
 * Translates the provided text into the specified target language.
 *
 * @param text - The text to be translated.
 * @param target - The target language code for the translation (defaults to 'ja' for Japanese).
 * @returns A promise that resolves with the translated string.
 * @throws Will throw an error if the translation fails.
 *
 * @example
 * ```typescript
 * import { translate } from "@skeet-framework/ai"
 *
 * const translatedText = await translate("Hello", "es")
 * console.log(translatedText);  // Outputs: "Hola"
 * ```
 */
export declare const translate: (text: string, target?: string) => Promise<string>;
