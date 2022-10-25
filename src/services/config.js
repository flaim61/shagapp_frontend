
export const baseUrl = 'http://127.0.0.1:8000/';
export const baseUrlApi = baseUrl + 'api';
export const baseUrlStorage = baseUrl + 'storage/';
export const token_key = 'token';

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
    },
    user: {
        register: baseUrlApi + '/register',
        isAuthorisated: baseUrlApi + '/user-check',
        login: baseUrlApi + "/login",
        resertPassword: baseUrlApi + '/resert-password',
        getInfo: baseUrlApi + '/get-info'
    }
}

export default api;