import { translate } from './translate';
const run = async () => {
    const text = 'Hello, world!How are you? What are you up for today?';
    const target = 'ja';
    const response = await translate(text, target);
    console.log(response);
};
run();
//# sourceMappingURL=example.js.map