import SkeetAI from '@/lib/skeetai';
export declare const splitContentIntoChunks: (content: string, linesPerChunk: number) => string[];
export declare const translateJsonDocuments: (paths: string[], langFrom: string | undefined, langTo: string | undefined, skeetAi: SkeetAI) => Promise<void>;
