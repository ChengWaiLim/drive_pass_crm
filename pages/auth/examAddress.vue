<template>
<v-card elevation="2" class="ma-8">
    <v-list-item three-line>
        <v-list-item-icon tile size="80">
            <v-icon x-large color="blue darken-2">mdi-map-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">考試地址概覽</v-list-item-title>
        </v-list-item-content>
        <v-btn color="primary" @click="handleNew">創建考試地址</v-btn>
    </v-list-item>
    <v-data-table :headers="headers" :items="examAddress" item-key="addressCode" :search="search" :custom-filter="customSearch" dense>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.isEnable="{ item }">
            <span :class="item.isEnable ? 'text-success' : 'text-error'">{{item.isEnable ? '是' : '否'}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn fab dark x-small color="cyan" @click="handleEdit(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <exam-address-form title="修改考試地址" :item="editedItem" @close="handleCloseEdit" @confirm="handleConfirmEdit"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <exam-address-form title="創建考試地址" :item="newItem" @close="handleCloseNew" @confirm="handleConfirmNew"/>
    </v-dialog>
</v-card>
</template>
<script lang="js">
import Vue from "vue";
import BaseMixin from "@/components/mixins/BaseMixin"
import BaseRequest from "@/static/BaseRequest";
import ExamAddressError from "@/static/ExamAddressError";
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
                var res = await BaseRequest.getExamAddressAll()
                this.examAddress = res.ExamAddress
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
                this.checkExamAddressValid(this.editedItem)
                this.editDialogVisible = false
                this.$nuxt.$loading.start()
                await BaseRequest.updateExamAddress(this.editedItem)
                await this.init()
                this.successAlert("更新成功")
            }catch(e){
                this.alertExamAddressError(e)
            }finally{
                this.editDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.editedItem = {}
            }
        },
        alertExamAddressError(error){
            if(error instanceof RequestError){
                this.alert(error)
                return
            }
            var code = error instanceof Error ? error.message : error
            this.alert(ExamAddressError.text(code))
        },
        checkExamAddressValid(examAddress){
            if(examAddress.addressCode == null || String(examAddress.addressCode).trim() == "")
                throw new Error(ExamAddressError.ADDRESS_CODE_INVALID)
            else if(examAddress.district_zh == null || String(examAddress.district_zh).trim() == "")
                throw new Error(ExamAddressError.DISTRICT_ZH_INVALID)
            else if(examAddress.district_cn == null || String(examAddress.district_cn).trim() == "")
                throw new Error(ExamAddressError.DISTRICT_CN_INVALID)
            else if(examAddress.district_en == null || String(examAddress.district_en).trim() == "")
                throw new Error(ExamAddressError.DISTRICT_EN_INVALID)
            else if(examAddress.address_zh == null || String(examAddress.address_zh).trim() == "")
                throw new Error(ExamAddressError.ADDRESS_ZH_INVALID)
            else if(examAddress.address_cn == null || String(examAddress.address_cn).trim() == "")
                throw new Error(ExamAddressError.ADDRESS_CN_INVALID)
            else if(examAddress.address_en == null || String(examAddress.address_en).trim() == "")
                throw new Error(ExamAddressError.ADDRESS_EN_INVALID)
        },
        handleNew(){
            this.newDialogVisible = true
            this.newItem = this.newEmptyExamAddress()
        },
        handleCloseNew(){
            this.newDialogVisible = false
            this.newItem = this.newEmptyExamAddress()
        },
        async handleConfirmNew(){
            try{
                this.checkExamAddressValid(this.newItem)
                this.newDialogVisible = false
                this.$nuxt.$loading.start()
                await BaseRequest.addExamAddress(this.newItem)
                await this.init()
                this.successAlert("創建成功")
            }catch(e){
                this.alertExamAddressError(e)
            }finally{
                this.newDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.newItem = this.newEmptyExamAddress()
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
            examAddress: [],
            headers: [
                {
                    text: '地址代碼',
                    filterable: true,
                    value: 'addressCode',
                },
                {
                    text: '繁體地區',
                    filterable: true,
                    value: 'district_zh',
                },
                // {
                //     text: '簡體地區',
                //     filterable: true,
                //     value: 'district_cn',
                // },
                // {
                //     text: '英文地區',
                //     filterable: true,
                //     value: 'district_en',
                // },
                {
                    text: '繁體地址',
                    filterable: true,
                    value: 'address_zh',
                },
                // {
                //     text: '簡體地址',
                //     filterable: true,
                //     value: 'address_cn',
                // },
                // {
                //     text: '英文地址',
                //     filterable: true,
                //     value: 'address_en',
                // },
                {
                    text: '啟用',
                    filterable: true,
                    value: 'isEnable',
                },
                { text: '修改', value: 'actions', sortable: false },
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
.text-success
    color: #4CAF50 !important
    font-weight: bold
.text-error
    color: #F44336 !important
    font-weight: bold
</style>
