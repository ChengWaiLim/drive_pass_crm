<template>
<v-card elevation="2" class="ma-8">
    <v-list-item three-line>
        <v-list-item-icon tile size="80">
            <v-icon x-large color="blue darken-2">mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">師傅概覽</v-list-item-title>
        </v-list-item-content>
        <v-btn color="primary" @click="handleNew">創建師傅</v-btn>
    </v-list-item>
    <v-data-table :headers="headers" :items="coach" item-key="ID" :search="search" :custom-filter="customSearch" dense>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.price="{ item }">
            ${{showStripePrice(item.price)}}
        </template>
        <template v-slot:item.area="{ item }">
            {{areaToName(item.area)}}
        </template>
        <template v-slot:item.language="{ item }">
            {{languageCodeToName(item.language)}}
        </template>
        <template v-slot:item.isEnable="{ item }">
            <span :class="item.isEnable ? 'text-success' : 'text-error'">{{item.isEnable ? '是' : '否'}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn fab dark x-small color="cyan" @click="handleEdit(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <v-btn fab dark x-small color="red" @click="handleDelete(item)">
                <v-icon dark> mdi-delete </v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <coach-form title="修改師傅" :item="editedItem" :areaList="areaList" :licenseList="licenseList" @close="handleCloseEdit" @confirm="handleConfirmEdit"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <coach-form title="創建師傅" :item="newItem" :areaList="areaList" :licenseList="licenseList" @close="handleCloseNew" @confirm="handleConfirmNew"/>
    </v-dialog>
</v-card>
</template>
<script lang="js">
import Vue from "vue";
import BaseMixin from "@/components/mixins/BaseMixin"
import BaseRequest from "@/static/BaseRequest";
import CoachError from "@/static/CoachError";
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
                var coachResult = await BaseRequest.getCoachAll()
                var areaResult = await BaseRequest.getAreaAll()
                var licenseResult = await BaseRequest.getLicenseAll()
                this.coach = coachResult.Coach
                this.areaList = areaResult.Area
                this.licenseList = licenseResult.License
                this.$nuxt.$loading.finish()
            }catch(e){
                this.$nuxt.$loading.finish()
            }
        },
        handleEdit(item){
            this.editDialogVisible = true
            this.editedItem = Object.assign({}, item)
            this.editedItem.price = this.editedItem.price/100
        },
        handleCloseEdit(){
            this.editedItem = {}
            this.editDialogVisible = false
        },
        async handleConfirmEdit(file){
            try{
                this.checkCoachValid(this.editedItem)
                this.editDialogVisible = false
                this.editedItem.price = this.editedItem.price * 100
                this.$nuxt.$loading.start()
                var res = await BaseRequest.updateCoach(this.editedItem)
                await this.init()
                this.successAlert("更新成功")
            }catch(e){
                this.alertCoachError(e)
            }finally{
                this.editDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.editedItem = {}
            }
        },
        alertCoachError(error){
            if(error instanceof RequestError){
                this.alert(error)
                return
            }
            var code = error instanceof Error ? error.message : error
            this.alert(CoachError.text(code))
        },
        checkCoachValid(coach){
            if(coach.coachName == null || String(coach.coachName).trim() == "")
                throw new Error(CoachError.COACH_NAME_INVALID)
            else if(coach.phone == null || coach.phone === "" || isNaN(coach.phone) || Number(coach.phone) <= 0)
                throw new Error(CoachError.PHONE_INVALID)
            else if(coach.license == null || String(coach.license).trim() == "")
                throw new Error(CoachError.LICENSE_INVALID)
            else if(coach.area == null || String(coach.area).trim() == "")
                throw new Error(CoachError.AREA_INVALID)
            else if(coach.language == null || coach.language === "")
                throw new Error(CoachError.LANGUAGE_INVALID)
            else if(coach.price == null || coach.price === "" || isNaN(coach.price) || Number(coach.price) <= 0)
                throw new Error(CoachError.PRICE_INVALID)
        },
        handleNew(){
            this.newDialogVisible = true
            this.newItem = this.newEmptyCoach()
        },
        handleCloseNew(){
            this.newDialogVisible = false
            this.newItem = this.newEmptyCoach()
        },
        async handleConfirmNew(file){
            try{
                this.checkCoachValid(this.newItem)
                this.newDialogVisible = false
                this.newItem.price = this.newItem.price * 100
                this.$nuxt.$loading.start()
                var res = await BaseRequest.addCoach(this.newItem)
                await this.init()
                this.successAlert("創建成功")
            }catch(e){
                this.alertCoachError(e)
            }finally{
                this.newDialogVisible = false
                await this.init()
                this.$nuxt.$loading.finish()
                this.newItem = this.newEmptyCoach()
            }
        },
        async handleDelete(item){
            if(confirm("確認刪除?")){
                try{
                    await BaseRequest.deleteCoach({ID: item.ID})
                    this.successAlert("刪除成功")
                    await this.init()
                }catch(e){
                    this.alert(e)
                }
            }
        }
    },
    data(){
        return {
            editedItem: {},
            newItem: {},
            editDialogVisible: false,
            newDialogVisible: false,
            search: "",
            coach: [],
            areaList: [],
            licenseList: [],
            headers: [
                {
                    text: '師傅名稱',
                    filterable: true,
                    value: 'coachName',
                },
                {
                    text: '電語號碼',
                    filterable: true,
                    value: 'phone',
                },
                {
                    text: '價格',
                    filterable: true,
                    value: 'price',
                },
                {
                    text: '牌照',
                    filterable: true,
                    value: 'license',
                },
                {
                    text: '地區',
                    filterable: true,
                    value: 'area',
                },
                {
                    text: '語言',
                    filterable: true,
                    value: 'language',
                },
                {
                    text: '啟用',
                    filterable: true,
                    value: 'isEnable',
                },
                // {
                //     text: 'Sold Out',
                //     filterable: true,
                //     value: 'isSoldOut',
                // },
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