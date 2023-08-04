import { v2 } from '@google-cloud/translate'
import { inspect } from 'util'

const googleTranslate: v2.Translate = new v2.Translate()

export const translate = async (
  text: string,
  target = 'ja',
): Promise<string> => {
  try {
    const result = await googleTranslate.translate(text, target)
    const translations: string[] = Array.isArray(result[0])
      ? result[0]
      : [result[0]]
    return translations[0]
  } catch (error) {
    throw new Error(`Error in translate: ${inspect(error)}`)
  }
}
