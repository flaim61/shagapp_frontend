
export const baseUrl = 'http://127.0.0.1:8000/';
export const baseUrlApi = baseUrl + 'api';
export const baseUrlStorage = baseUrl + 'storage/';

const api = {
    category: {
        get: baseUrlApi + "/category",
    },
    product: {
        get: baseUrlApi + "/products",
        getInfo: baseUrlApi + "/product"
    },
    banner: {
        get: baseUrlApi + "/banner"
    }
}

export default api;