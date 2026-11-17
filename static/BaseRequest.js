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
    static async getCoachAll(){
        var res = await axios.get(serverUrl + "/admin/coach", {})
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async updateCoach(parameters){
        var res = await axios.put(serverUrl + "/admin/coach", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async addCoach(parameters){
        var res = await axios.post(serverUrl + "/admin/coach", parameters)
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
    static async deleteCoach(parameters){
        var res = await axios.delete(serverUrl + "/admin/coach", { data: parameters })
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
    static async updateUser(parameters){
        var res = await axios.put(serverUrl + "/admin/user", parameters)
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
    static async deleteUser(parameters){
        var res = await axios.delete(serverUrl + "/admin/user", { data: parameters })
        if(res.data.code != 0)
            throw new Error(res.data.status)
        return res.data.data
    }
}

export default BaseRequest