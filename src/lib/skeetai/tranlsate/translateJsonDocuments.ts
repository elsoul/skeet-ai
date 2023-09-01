import { readFileSync, writeFileSync } from 'fs'
import { translateDocument } from './translateDocument'
import { AIType } from '@/lib/genPrompt'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'

export const splitContentIntoChunks = (
  content: string,
  linesPerChunk: number,
): string[] => {
  const lines = content.split('\n')
  const chunks: string[] = []

  for (let i = 0; i < lines.length; i += linesPerChunk) {
    chunks.push(lines.slice(i, i + linesPerChunk).join('\n'))
  }
  return chunks
}

export const translateJsonDocuments = async (
  paths: string[],
  langFrom = 'ja',
  langTo = 'en',
  ai: AIType,
  aiInstance: VertexAI | OpenAI,
) => {
  let i = 0
  console.log(`From ${langFrom} to ${langTo}`)
  const outputPaths = []
  for (const path of paths) {
    console.log(`Translating document: ${i + 1}/${paths.length} paths`)
    const content = readFileSync(path, 'utf-8')
    const chunks = splitContentIntoChunks(content, 20)
    console.log(`Split into ${chunks.length} chunks`)
    const translatedChunks = []
    let j = 0
    for (const chunk of chunks) {
      console.log(`Translating chunk: ${j + 1}/${chunks.length} chunks`)
      const translatedChunk = await translateDocument(
        chunk,
        ai,
        aiInstance,
        'json',
        langFrom,
        langTo,
      )
      translatedChunks.push(translatedChunk)
      j++
    }

    const outputPath = path.replace('.json', `-${langTo}.json`)
    outputPaths.push(outputPath)
    const combinedTranslatedContent = translatedChunks.join('\n')
    writeFileSync(outputPath, combinedTranslatedContent)
    i++
  }
  console.log('Generated documents: ', outputPaths)
}
