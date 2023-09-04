import { AIType } from '@/lib/genPrompt';
import { AiInstance, Example } from '@/lib/types/skeetaiTypes';
export declare const commonPrompt: (example: Example, content: string, thisAi: AIType, thisAiInstance: AiInstance) => Promise<string>;
