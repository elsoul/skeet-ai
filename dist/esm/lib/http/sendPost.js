import fetch from 'node-fetch';
export const sendPost = async (url, body, token) => {
    try {
        let headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
        return response;
    }
    catch (e) {
        console.log({ e });
        throw new Error(`sendPost failed: ${body}`);
    }
};
//# sourceMappingURL=sendPost.js.map