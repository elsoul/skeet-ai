import aiplatform from '@google-cloud/aiplatform';
export { aiplatform };
import * as openai from 'openai';
export type { ChatCompletionMessageParam } from 'openai/resources';
export type { ChatCompletionChunk, ChatCompletion } from 'openai/resources/chat';
export { Stream } from 'openai/streaming';
export { openai };
export * from './lib/types/vertexaiTypes';
export * from './lib/types/openaiTypes';
export { OpenAI } from './lib/openai';
export { VertexAI } from './lib/vertexai';
export { translate } from './lib/translate';
export { generatePrompt } from './lib/genPrompt';
export { SkeetAI, type SkeetAIOptions } from './lib/skeetai';
export type { AIPrompt, AIType, AIExample } from './lib/genPrompt';
export type { Example, InputOutput, AiInstance } from './lib/types/skeetaiTypes';
export { NamingEnum, SkeetAiMode, InstanceType } from './lib/types/skeetaiTypes';
