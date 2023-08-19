import { OpenAIPromptParams, VertexExample, VertexPromptParams } from './types'

/**
 * Represents the AI platforms supported by the generatePrompt function.
 */
export type AIType = 'VertexAI' | 'OpenAI'

/**
 * Represents an example consisting of input and output content.
 */
export type AIExample = {
  /**
   * The input content for the AI platform.
   */
  input: string

  /**
   * The expected output content from the AI platform.
   */
  output: string
}

/**
 * Represents the structure of the AI prompt which includes context and examples.
 */
export interface AIPrompt {
  /**
   * The context or background information for the AI prompt.
   */
  context: string

  /**
   * An array of examples, each consisting of input and output pairs.
   */
  examples: AIExample[]
}

export function generatePrompt(
  context: string,
  examples: AIExample[],
  content: string,
  ai: AIType,
): VertexPromptParams | OpenAIPromptParams {
  if (ai === 'VertexAI') {
    const vertexExamples: VertexExample[] = []
    for (let i = 0; i < examples.length; i += 2) {
      vertexExamples.push({
        input: { content: examples[i].input },
        output: { content: examples[i + 1]?.output || '' },
      })
    }
    return {
      context,
      examples: vertexExamples,
      messages: [
        {
          author: 'user',
          content: content,
        },
      ],
    } as VertexPromptParams
  } else if (ai === 'OpenAI') {
    const messages = [
      {
        role: 'system',
        content: context,
      },
      ...examples.flatMap((example, index) => [
        {
          role: index % 2 === 0 ? 'user' : 'assistant',
          content: index % 2 === 0 ? example.input : example.output,
        },
      ]),
      {
        role: 'user',
        content,
      },
    ]

    return {
      messages,
    } as OpenAIPromptParams
  } else {
    throw new Error('Unsupported AI type')
  }
}
