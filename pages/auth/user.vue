<template>
<v-card elevation="2" class="ma-8">
    <v-list-item three-line>
        <v-list-item-icon tile size="80">
            <v-icon x-large color="blue darken-2">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">會員概覽</v-list-item-title>
        </v-list-item-content>
        <v-btn color="primary" @click="handleNew">創建會員</v-btn>
    </v-list-item>
    <v-data-table :headers="headers" :items="user" item-key="ID" :search="search" :custom-filter="customSearch" dense>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn fab dark x-small color="cyan" @click="handleEdit(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <v-btn fab dark x-small color="red" class="ml-2" @click="handleDelete(item)">
                <v-icon dark> mdi-delete </v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <user-form title="修改會員" :item="editedItem" @close="handleCloseEdit" @confirm="handleConfirmEdit"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <user-form title="創建會員" :item="newItem" @close="handleCloseNew" @confirm="handleConfirmNew"/>
    </v-dialog>
</v-card>
</template>
<script lang="js">
import Vue from "vue";
import Swal from "sweetalert2"
import BaseMixin from "@/components/mixins/BaseMixin"
import BaseRequest from "@/static/BaseRequest";
import UserError from "@/static/UserError";
import RequestError from "@/static/RequestError";
export default{
    layout: "cmsLayout",
    mixins: [BaseMixin],
    async mounted(){
        this.$nextTick(async () => {
            this.init()
        })
    },
    methods: {
        async init(){
            try{
                this.$nuxt.$loading.start()
                var res = await BaseRequest.getUserAll()
                this.user = res.User
                this.$nuxt.$loading.finish()
            }catch(e){
                this.$nuxt.$loading.finish()
            }
        },
        handleEdit(item){
            this.editDialogVisible = true
            this.editedItem = Object.assign({}, item)
        },
        handleCloseEdit(){
            this.editedItem = {}
            this.editDialogVisible = false
        },
        async handleConfirmEdit(){
            try{
                this.checkUserValid(this.editedItem)
                this.editDialogVisible = false
                this.$nuxt.$loading.start()
                var res = await BaseRequest.updateUser(this.editedItem)
                await this.init()
                this.successAlert("更新成功")
            }catch(e){
                this.alertUserError(e)
            }finally{
                this.editDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.editedItem = {}
            }
        },
        alertUserError(error){
            if(error instanceof RequestError){
                this.alert(error)
                return
            }
            var code = error instanceof Error ? error.message : error
            this.alert(UserError.text(code))
        },
        checkUserValid(user){
            if(user.username == null || String(user.username).trim() == "")
                throw new Error(UserError.USERNAME_INVALID)
            else if(user.phone == null || user.phone === "" || isNaN(user.phone) || Number(user.phone) <= 0)
                throw new Error(UserError.PHONE_INVALID)
            else if(user.hkid == null || String(user.hkid).trim() == "")
                throw new Error(UserError.HKID_INVALID)
            else if(user.address == null || String(user.address).trim() == "")
                throw new Error(UserError.ADDRESS_INVALID)
        },
        handleNew(){
            this.newDialogVisible = true
            this.newItem = this.newEmptyUser()
        },
        handleCloseNew(){
            this.newDialogVisible = false
            this.newItem = this.newEmptyUser()
        },
        async handleConfirmNew(){
            try{
                this.checkUserValid(this.newItem)
                this.newDialogVisible = false
                this.$nuxt.$loading.start()
                var res = await BaseRequest.addUser(this.newItem)
                await this.init()
                this.successAlert("創建成功")
            }catch(e){
                this.alertUserError(e)
            }finally{
                this.newDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.newItem = this.newEmptyUser()
            }
        },
        async handleDelete(item){
            var result = await Swal.fire({
                icon: "warning",
                title: "確認刪除？",
                showCancelButton: true,
                confirmButtonText: "刪除",
                cancelButtonText: "取消",
            })
            if(!result.isConfirmed)
                return
            try{
                this.$nuxt.$loading.start()
                await BaseRequest.deleteUser(item)
                await this.init()
                this.successAlert("刪除成功")
            }catch(e){
                this.alertUserError(e)
            }finally{
                this.$nuxt.$loading.finish()
            }
        },
    },
    data(){
        return {
            editedItem: {},
            newItem: {},
            editDialogVisible: false,
            newDialogVisible: false,
            search: "",
            user: [],
            headers: [
                {
                    text: '會員名稱',
                    filterable: true,
                    value: 'username',
                },
                {
                    text: '電話號碼',
                    filterable: true,
                    value: 'phone',
                },
                {
                    text: '身份證號碼',
                    filterable: true,
                    value: 'hkid',
                },
                {
                    text: '地址',
                    filterable: true,
                    value: 'address',
                },
                { text: '修改', value: 'actions', sortable: false },
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
</style>
