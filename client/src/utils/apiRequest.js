import axios from 'axios';

const apiRequest = async ({ method, url, data = null, params = null }) => {
    try {
        console.log(`${import.meta.env.VITE_API_URL}${url}`)
        const response = await axios({
            method,
            url: `${import.meta.env.VITE_API_URL}${url}`,
            data,
            params,
        });
        console.log("response data")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default apiRequest;
