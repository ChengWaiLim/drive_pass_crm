<template>
<v-card elevation="2" class="ma-8">
    <v-list-item three-line>
        <v-list-item-icon tile size="80">
            <v-icon x-large color="blue darken-2">mdi-certificate</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">牌照概覽</v-list-item-title>
        </v-list-item-content>
        <v-btn color="primary" @click="handleNew">創建牌照</v-btn>
    </v-list-item>
    <v-data-table :headers="headers" :items="license" item-key="ID" :search="search" :custom-filter="customSearch" dense>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.name_cn="{ item }">
            {{formatNameCn(item.name_cn)}}
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
        <license-form title="修改牌照" :item="editedItem" @close="handleCloseEdit" @confirm="handleConfirmEdit"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <license-form title="創建牌照" :item="newItem" @close="handleCloseNew" @confirm="handleConfirmNew"/>
    </v-dialog>
</v-card>
</template>
<script lang="js">
import Vue from "vue";
import BaseMixin from "@/components/mixins/BaseMixin"
import BaseRequest from "@/static/BaseRequest";
import LicenseError from "@/static/LicenseError";
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
                var res = await BaseRequest.getLicenseAll()
                this.license = res.License
                this.$nuxt.$loading.finish()
            }catch(e){
                this.$nuxt.$loading.finish()
            }
        },
        formatNameCn(nameCn){
            if(nameCn == null)
                return ""
            if(Array.isArray(nameCn))
                return nameCn.join(", ")
            return String(nameCn)
        },
        copyLicense(item){
            var copied = Object.assign({}, item)
            copied.name_cn = Array.isArray(item.name_cn) ? item.name_cn.slice() : []
            return copied
        },
        handleEdit(item){
            this.editDialogVisible = true
            this.editedItem = this.copyLicense(item)
        },
        handleCloseEdit(){
            this.editedItem = {}
            this.editDialogVisible = false
        },
        async handleConfirmEdit(){
            try{
                this.checkLicenseValid(this.editedItem)
                this.editDialogVisible = false
                this.$nuxt.$loading.start()
                await BaseRequest.updateLicense(this.editedItem)
                await this.init()
                this.successAlert("更新成功")
            }catch(e){
                this.alertLicenseError(e)
            }finally{
                this.editDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.editedItem = {}
            }
        },
        alertLicenseError(error){
            if(error instanceof RequestError){
                this.alert(error)
                return
            }
            var code = error instanceof Error ? error.message : error
            this.alert(LicenseError.text(code))
        },
        checkLicenseValid(license){
            if(license.code == null || String(license.code).trim() == "")
                throw new Error(LicenseError.CODE_INVALID)
            else if(license.name_zh == null || String(license.name_zh).trim() == "")
                throw new Error(LicenseError.NAME_ZH_INVALID)
            else if(license.name_cn == null || String(license.name_cn).trim() == "")
                throw new Error(LicenseError.NAME_CN_INVALID)
            else if(license.name_en == null || String(license.name_en).trim() == "")
                throw new Error(LicenseError.NAME_EN_INVALID)
        },
        handleNew(){
            this.newDialogVisible = true
            this.newItem = this.newEmptyLicense()
        },
        handleCloseNew(){
            this.newDialogVisible = false
            this.newItem = this.newEmptyLicense()
        },
        async handleConfirmNew(){
            try{
                this.checkLicenseValid(this.newItem)
                this.newDialogVisible = false
                this.$nuxt.$loading.start()
                await BaseRequest.addLicense(this.newItem)
                await this.init()
                this.successAlert("創建成功")
            }catch(e){
                this.alertLicenseError(e)
            }finally{
                this.newDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.newItem = this.newEmptyLicense()
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
            license: [],
            headers: [
                {
                    text: '代碼',
                    filterable: true,
                    value: 'code',
                },
                {
                    text: '繁體名稱',
                    filterable: true,
                    value: 'name_zh',
                },
                // {
                //     text: '簡體名稱',
                //     filterable: true,
                //     value: 'name_cn',
                // },
                // {
                //     text: '英文名稱',
                //     filterable: true,
                //     value: 'name_en',
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
