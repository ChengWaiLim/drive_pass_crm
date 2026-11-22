<template>
<v-overlay :value="isLoading">
    <v-progress-circular indeterminate size="128"/>
  </v-overlay>
</template>
<script lang="js">
import Vue from "vue";
import Swal from 'sweetalert2'
import jwt from "jsonwebtoken"
import moment from "moment"
import Cookies from 'js-cookie'
import RequestError from "@/static/RequestError"
export default{
    methods: {
        customSearch (currentValue, search, item) {
            for (const [key, value] of Object.entries(item)) {
                if(value != null && value.toString().includes(search))
                    return true
            }
            return false
        },
        newEmptyCoach(){
            return {
                coachName: null,
                password: null,
                phone: null,
                license: [],
                area: [],
                examAddress: [],
                language: null,
                price: null,
                isEnable: false,
                createdDate: null,
            }
        },
        newEmptyLicense(){
            return {
                ID: null,
                code: null,
                name_zh: null,
                name_cn: null,
                name_en: null,
                isEnable: false,
                createdDate: null,
            }
        },
        newEmptyUser(){
            return {
                username: null,
                phone: null,
                hkid: null,
                address: null,
            }
        },
        newEmptyExamAddress(){
            return {
                addressCode: null,
                district_zh: null,
                district_cn: null,
                district_en: null,
                address_zh: null,
                address_cn: null,
                address_en: null,
                isEnable: null,
            }
        },
        languageCodeToName(code){
            if(code == "ZH")
                return "中文繁體"
            else if(code == "CN")
                return "中文簡體"
            else if(code == "EN")
                return "英文"
            else
                return code
        },
        areaToName(code){
            if(code == "KW&NT")
                return "九龍及新界"
            else if(code == "HK")
                return "香港"
            else
                return code
        },
        isCurrentTokenValid(){
            var token = Cookies.get("admin-token")
            if(token == null || token == "null")
                return false
            var decoded = jwt.verify(token, this.$store.state.jwtSecret)
            return moment(decoded.expiryDate).isAfter(moment())
        },
        alert(title, content, icon, callback = function() {}) {
            if(title instanceof RequestError)
                title = title.message
            Swal.fire({
                icon: icon != null ? icon : 'error',
                title: title,
                text: content != null ? content : ""
            }).then((result) => {
                callback()
            });
        },
        successAlert(title, content, callback = () => {}){
            Swal.fire({
                icon: "success",
                title: title,
                text: content != null ? content : ""
            }).then((result) => {
                callback()
            });
        },
        showStripePrice(price){
            return price/100
        },
    },
    data(){
        return {
            isLoading: true
        }
    }
}
</script>
<style lang="sass" scoped>
</style>