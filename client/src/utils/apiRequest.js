import axios from 'axios';

const apiRequest = async ({ method, url, data = null, params = null }) => {
    try {
        
        const response = await axios({
            method,
            url: `${import.meta.env.VITE_API_URL}${url}`,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default apiRequest;
