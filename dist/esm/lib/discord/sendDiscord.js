import fetch from 'node-fetch';
export const sendDiscord = async (content, webhookUrl) => {
    try {
        const body = {
            content,
            username: 'Skeet Notifier',
        };
        const res = await fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(`Discord result status: ${res.status}`);
        if (res.status !== 204)
            return false;
        return true;
    }
    catch (e) {
        console.log({ error: `Skeet sendDiscord Error - ${content}` });
        return false;
    }
};
//# sourceMappingURL=sendDiscord.js.map