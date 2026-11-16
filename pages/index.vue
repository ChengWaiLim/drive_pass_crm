<template>
  <div id="background">
    <div class="base-row">
      <div class="container-left center-item">
        <img src="~@/assets/company_logo.png" class="logo mt-4"/>
        <h1 v-if="testingTitle != null && testingTitle.length > 0">{{testingTitle}}</h1>
        <div class="login-container-box">
          <p class="title main-color">登入</p>
          <div class="login-input-div mt-4">
            <login-input class="mb-8" placeholder="Username" v-model="account"></login-input>
            <login-input type="password" class="mb-12" placeholder="Password" v-model="password"></login-input>
          </div>
          <v-btn color="primary" class="login-button" @click="handleLogin">登入</v-btn>
        </div>
        <div/>
      </div>
      <div class="container-right center-item">
        <div class="cover-image"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/static/BaseRequest";
import BaseMixin from "@/components/mixins/BaseMixin"
import Cookies from 'js-cookie'
export default {
  mixins: [BaseMixin],
  mounted(){
    if(this.isCurrentTokenValid())
      this.$router.push("/auth/coach")
  },
  methods: {
    async handleLogin(){
      try{
        this.$nuxt.$loading.start()
        var res = await BaseRequest.login(this.account, this.password)
        Cookies.set("admin-token", res.token)
        this.successAlert("登入成功")
        this.$nuxt.$loading.finish()
        this.$router.push("/auth/coach")
      }catch(e){
        this.$nuxt.$loading.finish()
        this.alert(e)
      }
    }
  },
  data(){
    return {
      account: null,
      password: null,
      testingTitle: process.env.testingTitle
    }
  }
}
</script>
<style lang="sass" scoped>
.center-item
  display: flex
  justify-content: space-between
  align-items: center
  flex-direction: column
#background
  position: absolute
  width: 100%
  height: 100%
  background: white
  .base-row
    display: flex
    width: 100%
    height: 100%
    .container-left
      height: 100%
      width: 40%
      .logo
        width: 60%
      .login-container-box
        width: 60%
        position: relative
        animation: login-container-box-animation 2s ease
        border-radius: 32px
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14)
        display: flex
        flex-direction: column
        align-items: center
        padding-top: 2em
        padding-bottom: 2em
        .title
          font-size: .7rem !important
        .login-input-div
          width: 76%
          display: flex
          flex-direction: column
          justify-content: center
        .login-button
          font-size: .5rem
    .container-right
      height: 100%
      width: 60%
      .cover-image
        width: 100%
        height: 100%
        background-image: url("~@/assets/login-background.jpeg")
        background-position: center center
        background-repeat: no-repeat
        background-size: cover
</style>