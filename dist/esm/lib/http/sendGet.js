import fetch from 'node-fetch';
export const sendGet = async (url, params, token) => {
    try {
        let headers = { 'Content-Type': 'application/json' };
        let urlWithParams = url;
        if (params) {
            const queryParams = new URLSearchParams(params).toString();
            urlWithParams = `${url}?${queryParams}`;
        }
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(urlWithParams, {
            method: 'GET',
            headers,
        });
        return res;
    }
    catch (e) {
        console.log({ e });
        throw new Error('sendGET failed');
    }
};
//# sourceMappingURL=sendGet.js.map