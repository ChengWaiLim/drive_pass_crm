import axios from "axios";
import store from "@/store/index.js"
import Cookies from 'js-cookie'
import RequestError from "@/static/RequestError"

var serverUrl = store().state.serverUrl
axios.defaults.headers = {
    "Api-Key": "4BiuoxcKJ0iiK0zfXbtXzILlvHCTKrgW",
    "token": Cookies.get("admin-token") || null
}
class BaseRequest {
    static result(res){
        if(res.data.code != 0)
            throw new RequestError(res.data.code, res.data.status, res.data.message)
        return res.data.data
    }
    static async login(account, password) {
        var res = await axios.post(serverUrl + "/unauth/login", {"account": account, "password": password})
        return BaseRequest.result(res)
    }
    static getLocalStorage(key){
        var cached = localStorage.getItem(key)
        if(cached == null)
            return null
        try{
            var parsed = JSON.parse(cached)
            if(parsed != null && parsed.expiryDate > new Date().getTime())
                return parsed.data
        }catch(e){}
        localStorage.removeItem(key)
        return null
    }
    static setLocalStorage(key, data){
        localStorage.setItem(key, JSON.stringify({
            data: data,
            expiryDate: new Date().getTime() + BaseRequest.ttl
        }))
    }
    static clearLocalStorage(){
        localStorage.clear()
    }
    static async getAreaAll(){
        var cached = BaseRequest.getLocalStorage(BaseRequest.areaAllKey)
        if(cached != null)
            return cached
        var res = await axios.get(serverUrl + "/admin/area", {})
        var data = BaseRequest.result(res)
        BaseRequest.setLocalStorage(BaseRequest.areaAllKey, data)
        return data
    }
    static async getCoachAll(){
        var res = await axios.get(serverUrl + "/admin/coach", {})
        return BaseRequest.result(res)
    }
    static async updateCoach(parameters){
        var res = await axios.put(serverUrl + "/admin/coach", parameters)
        return BaseRequest.result(res)
    }
    static async addCoach(parameters){
        var res = await axios.post(serverUrl + "/admin/coach", parameters)
        return BaseRequest.result(res)
    }
    static async deleteCoach(parameters){
        var res = await axios.delete(serverUrl + "/admin/coach", { data: parameters })
        return BaseRequest.result(res)
    }
    static async getUserAll(){
        var res = await axios.get(serverUrl + "/admin/user", {})
        return BaseRequest.result(res)
    }
    static async updateUser(parameters){
        var res = await axios.put(serverUrl + "/admin/user", parameters)
        return BaseRequest.result(res)
    }
    static async addUser(parameters){
        var res = await axios.post(serverUrl + "/admin/user", parameters)
        return BaseRequest.result(res)
    }
    static async deleteUser(parameters){
        var res = await axios.delete(serverUrl + "/admin/user", { data: parameters })
        return BaseRequest.result(res)
    }
    static async getLicenseAll(){
        var res = await axios.get(serverUrl + "/admin/license", {})
        return BaseRequest.result(res)
    }
    static async updateLicense(parameters){
        var res = await axios.put(serverUrl + "/admin/license", parameters)
        return BaseRequest.result(res)
    }
    static async addLicense(parameters){
        var res = await axios.post(serverUrl + "/admin/license", parameters)
        return BaseRequest.result(res)
    }
    static async getExamAddressAll(){
        var res = await axios.get(serverUrl + "/admin/examAddress", {})
        return BaseRequest.result(res)
    }
    static async updateExamAddress(parameters){
        var res = await axios.put(serverUrl + "/admin/examAddress", parameters)
        return BaseRequest.result(res)
    }
    static async addExamAddress(parameters){
        var res = await axios.post(serverUrl + "/admin/examAddress", parameters)
        return BaseRequest.result(res)
    }
}

BaseRequest.areaAllKey = "BaseRequest_areaAll"
BaseRequest.ttl = 24 * 60 * 60 * 1000

export default BaseRequest