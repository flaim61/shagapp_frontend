import axios from 'axios';
import api from './config.js';
import { baseUrl, baseUrlApi, token_key } from './config.js';

const $api = axios.create({
    withCredentials: false,
    baseURL: baseUrlApi
});

export const getCategories = async function() {
    return await $api.get(api.category.get);
}

export const getProducts = async function(categoryId) {
    if(categoryId != null){
        return await $api.get(api.product.get + "/" + categoryId);
    }else{
        return await $api.get(api.product.get);
    }
}

export const getBanners = async function(bannerId) {
    if (bannerId != null){
        return await $api.get(api.banner.get + "/" + bannerId);
    }else{
        return await $api.get(api.banner.get);
    }
}

export const getInfoProduct = async function (id) {
    return await $api.get(api.product.getInfo + "/" + id);
}

export const register = async function(user){
    return await $api.post(api.user.register, user);
}

export const login = async function(user){
    return await $api.post(api.user.login, user);
}

export const isAuthorisated = async function(){
    const token = localStorage.getItem(token_key);

    if(token == null || token === ""){
        return false;
    }
    
    return await $api.post(api.user.isAuthorisated, {
        "token" : localStorage.getItem(token_key)
    });
}

export const resertPassword = async function(oldPassword, newPassword){
    return await $api.post(api.user.resertPassword, {
        "password" : newPassword,
        "oldPassword" : oldPassword,
        "token" : localStorage.getItem(token_key)
    });
}

export const getUserInfo = async function () {
    return await $api.post(api.user.getInfo, {
        "token" : localStorage.getItem(token_key)
    })
}