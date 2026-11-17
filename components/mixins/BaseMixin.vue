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
                phone: null,
                license: null,
                area: null,
                language: null,
                price: null,
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
        isCurrentTokenValid(){
            var token = Cookies.get("admin-token")
            if(token == null || token == "null")
                return false
            var decoded = jwt.verify(token, this.$store.state.jwtSecret)
            return moment(decoded.expiryDate).isAfter(moment())
        },
        alert(title, content, icon, callback = function() {}) {
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