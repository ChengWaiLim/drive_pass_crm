<template>
  <v-app>
    <div class="cms-container">
        <v-navigation-drawer permanent width="300px" color="#212121" >
            <v-list-item class="header-container"> 
                <v-list-item-content>
                    <img src="~@/assets/company_logo.png" class="logo mt-4"/>
                </v-list-item-content>
            </v-list-item>
            <v-divider color="white"></v-divider>
            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link @click="$router.push(item.route)">
                    <v-list-item-icon>
                        <v-icon color="white">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title><p class="word-white">{{ item.title }}</p></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-btn block color="#B8905D" @click="handleLogout">登出</v-btn>
            </v-list>
        </v-navigation-drawer>
        <div class="inner-container">
            <h1 v-if="testingTitle != null && testingTitle.length > 0">{{testingTitle}}</h1>
            <nuxt/>
        </div>
    </div>
  </v-app>
</template>
<script lang="js">
import Vue from "vue";
import Cookies from 'js-cookie'
import BaseMixin from "@/components/mixins/BaseMixin"
export default{
    mixins: [BaseMixin],
    async mounted(){
        if(!this.isCurrentTokenValid())
            this.$router.push("/")
    },
    methods: {
        handleLogout(){
            Cookies.set("admin-token", null)
            this.$router.push("/")
        }
    },
    data(){
        return {
            items: [
                { title: '師傅', icon: 'mdi-school', route: "/auth/coach" },
                { title: '訂單', icon: 'mdi-list-box', route: "/auth/order" },
                { title: '會員', icon: 'mdi-account', route: "/auth/user" },
            ],
            right: null,
            testingTitle: process.env.testingTitle
        }
    }
}
</script>
<style lang="sass" scoped>
.cms-container
    display: flex
    width: 100%
    height: 100%
    background: #F4F5FA
    .inner-container
        height: 100%
        width: 100%
.logo
    width: 60%
.header-container
    background: #FFFFFF
p
    margin: 0px
.word-white
    color: white
</style>