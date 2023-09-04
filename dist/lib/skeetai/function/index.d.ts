import { InstanceType } from '@/lib/types/skeetaiTypes';
import SkeetAI from '..';
export declare const skeetFunction: (content: string, skeetAi: SkeetAI, tsconfig: string, packageJson: string, prettierrc: string, existingFunctions: string, existingModels: string, instanceType: InstanceType) => Promise<string>;
