import aiplatform from '@google-cloud/aiplatform';
export { aiplatform };
import * as openai from 'openai';
export { openai };
export * from './lib/types/vertexaiTypes';
export * from './lib/types/openaiTypes';
export { OpenAI } from './lib/openai';
export { VertexAI } from './lib/vertexai';
export { translate, translateVertexPromptParams } from './lib/translate';
//# sourceMappingURL=index.js.map