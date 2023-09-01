/// <reference types="node" />
import { Readable, ReadableOptions } from 'stream';
export declare class DelayedStream extends Readable {
    data: string[];
    delay: number;
    currentIndex: number;
    constructor(data: string[], delay: number, options?: ReadableOptions);
    _read(): void;
}
