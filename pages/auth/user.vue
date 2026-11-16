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
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <user-form title="修改會員" :item="editedItem" @close="handleCloseEdit" @confirm="handleConfirmEdit" :orderList="orderList"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <user-form title="創建會員" :item="newItem" @close="handleCloseNew" @confirm="handleConfirmNew" :orderList="orderList"/>
    </v-dialog>
</v-card>
</template>
<script lang="js">
import Vue from "vue";
import BaseMixin from "@/components/mixins/BaseMixin"
import BaseRequest from "@/static/BaseRequest";
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
                this.user.forEach(f => {
                    if(f.memberType == 'NORMAL'){
                        f.code = "N-" + f.code
                    }
                    else if(f.memberType == 'SUPER')
                        f.code = "P-" + f.code
                })
            }catch(e){
                this.alert(e)
                this.$nuxt.$loading.finish()
            }finally{
                this.$nuxt.$loading.finish()
            }
        },
        async handleEdit(item){
            this.$nuxt.$loading.start()
            var res = await BaseRequest.getOrderByUserID(item.ID)
            this.orderList = res.Order
            this.orderList.forEach(f => {
                f.shippingFee = f.shippingFee/100
                f.totalAmount = f.totalAmount/100
            })
            this.editedItem = Object.assign({}, item)
            this.editDialogVisible = true
            this.$nuxt.$loading.finish()
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
                this.alert(e)
            }finally{
                this.editDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.editedItem = {}
            }
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
                this.alert(e)
            }finally{
                this.newDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.newItem = this.newEmptyProduct()
            }
        },
        checkUserValid(user){
            if(user.mobile === null || user.mobile == "")
                throw new Error("請填寫手機號碼")
            else if(user.password === null || user.password == "")
                throw new Error("請填寫密碼")
            else if(user.firstName === null || user.firstName == "")
                throw new Error("請填寫名字")
            else if(user.lastName === null || user.lastName == "")
                throw new Error("請填寫姓氏")
            else if(user.email === null || user.email == "")
                throw new Error("請填寫電郵")
            else if(user.memberType === null || user.memberType == "")
                throw new Error("請填寫會員種類")
        }
    },
    data(){
        return {
            user: [],
            search: "",
            dialogVisible: false,
            newDialogVisible: false,
            editDialogVisible: false,
            editedItem: {},
            newItem: {},
            orderList: [],
            headers: [
                {
                    text: '會員號碼',
                    filterable: true,
                    value: 'code',
                },
                {
                    text: '手機',
                    filterable: true,
                    value: 'mobile',
                },
                {
                    text: '名字',
                    filterable: true,
                    value: 'firstName',
                },
                {
                    text: '姓氏',
                    filterable: true,
                    value: 'lastName',
                },
                {
                    text: '電郵',
                    filterable: true,
                    value: 'email',
                },
                { text: '修改', value: 'actions', sortable: false },
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
::v-deep .v-input__slot fieldset 
    color: black !important
::v-deep input
    color: black !important
::v-deep .v-label
    color: black !important


</style>