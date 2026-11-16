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
        newEmptyProduct(){
            return {
                categoryID: null,
                productName: null,
                price: null,
                comboPrice: null,
                extraPrice: null,
                isSoldOut: false
            }
        },
        newEmptyCombo(){
            return {
                comboName: null,
                categoryIDList: [],
                price: null,
                comboLineList: [],
                freeLineList: []
            }
        },
        newEmptyShipping(){
            return {
                districtName: null,
                shippingFee: null,
                conditionList: [],
                detail:[]
            }
        },
        newEmptyUser(){
            return {
                mobile: null,
                password: null,
                deliveryAddress: null,
                shippingDistrictID: null,
                districtName: null,
                firstName: null,
                lastName: null,
                email: null,
                isSoldOut: false,
                memberType: null,
                isUsedFreeDrinks: false,
                freeDrinkUsedDate: null,
                isAllowMarketing: false,

            }
        },
        newEmptyHomePageBanner(){
            return {
                name: null,
                path: null,
                file: null,
                type: "Home"
            }
        },
        newEmptyWeddingBanner(){
            return {
                name: null,
                path: null,
                file: null,
                type: "Wedding"
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