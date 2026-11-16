import axios from "axios";
import store from "@/store/index.js"
import Cookies from 'js-cookie'

var serverUrl = store().state.serverUrl
axios.defaults.headers = {
    "Api-Key": "4BiuoxcKJ0iiK0zfXbtXzILlvHCTKrgW",
    "token": Cookies.get("admin-token") || null
}
class BaseRequest {
    static async login(account, password) {
        var res = await axios.post(serverUrl + "/unauth/login", {"account": account, "password": password})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getProductAll(){
        var res = await axios.get(serverUrl + "/admin/product", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getCategoryAll(){
        var res = await axios.get(serverUrl + "/admin/category", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateProduct(parameters){
        var res = await axios.put(serverUrl + "/admin/product", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addProduct(parameters){
        var res = await axios.post(serverUrl + "/admin/product", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getComboAll(){
        var res = await axios.get(serverUrl + "/admin/combo", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateCombo(parameters){
        var res = await axios.put(serverUrl + "/admin/combo", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addCombo(parameters){
        var res = await axios.post(serverUrl + "/admin/combo", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getShippingAll(){
        var res = await axios.get(serverUrl + "/admin/shippingDistrict", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateShipping(parameters){
        var res = await axios.put(serverUrl + "/admin/shippingDistrict", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addShipping(parameters){
        var res = await axios.post(serverUrl + "/admin/shippingDistrict", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getOrderAll(){
        var res = await axios.get(serverUrl + "/admin/order", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getOrderByUserID(userID){
        var res = await axios.get(serverUrl + "/admin/order/userID/" + userID, {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getUserAll(){
        var res = await axios.get(serverUrl + "/admin/user", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addUser(parameters){
        var res = await axios.post(serverUrl + "/admin/user", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateUser(parameters){
        var res = await axios.put(serverUrl + "/admin/user", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getSEOAll(){
        var res = await axios.get(serverUrl + "/admin/seo", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateSEO(parameters){
        var res = await axios.put(serverUrl + "/admin/seo", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getBannerAll(){
        var res = await axios.get(serverUrl + "/admin/banner", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addBanner(parameters){
        var config = {'Content-Type': "multipart/form-data"}
        var formData = new FormData()
        Object.entries(parameters).forEach(([key, value]) => {
            formData.append(key, value);
        });
        var res = await axios.post(serverUrl + "/admin/banner", formData, config)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateBanner(parameters){
        var config = {'Content-Type': "multipart/form-data"}
        var formData = new FormData()
        Object.entries(parameters).forEach(([key, value]) => {
            formData.append(key, value);
        });
        var res = await axios.put(serverUrl + "/admin/banner", formData, config)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async deleteBanner(parameters){
        var res = await axios.delete(serverUrl + "/admin/banner", {data: parameters})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async getContentAll(){
        var res = await axios.get(serverUrl + "/admin/content", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateContent(parameters){
        var res = await axios.put(serverUrl + "/admin/content", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async uploadImage(parameters){
        var config = {'Content-Type': "multipart/form-data"}
        var formData = new FormData()
        Object.entries(parameters).forEach(([key, value]) => {
            formData.append(key, value);
        });
        var res = await axios.post(serverUrl + "/admin/uploadImage", formData, config)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
}

export default BaseRequest