import { Readable } from 'stream';
export class DelayedStream extends Readable {
    data;
    delay;
    currentIndex;
    constructor(data, delay, options = { highWaterMark: 1 }) {
        super(options);
        this.data = data;
        this.delay = delay;
        this.currentIndex = 0;
    }
    _read() {
        if (this.currentIndex >= this.data.length) {
            this.push(null); // End of stream
            return;
        }
        setTimeout(() => {
            // Send the current word followed by a space to keep words separated when read
            this.push(this.data[this.currentIndex] + ' ');
            this.currentIndex += 1;
            this._read();
        }, this.delay);
    }
}
//# sourceMappingURL=delayedStream.js.map