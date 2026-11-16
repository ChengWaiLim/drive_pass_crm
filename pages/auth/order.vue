<template>
<v-card elevation="2" class="ma-8">
    <v-list-item three-line>
        <v-list-item-icon tile size="80">
            <v-icon x-large color="blue darken-2">mdi-list-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">訂單概覽</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    <v-data-table :headers="headers" :items="order" item-key="ID" :search="search" :custom-filter="customSearch" dense sort-by="createdDate" sort-desc>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.totalAmount="{ item }">
            ${{showStripePrice(item.totalAmount)}}
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn fab dark x-small color="cyan" @click="handleView(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <order-form title="訂單詳情" :order="editedItem" @close="handleCloseEdit"/>
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
                var res = await BaseRequest.getOrderAll()
                this.order = res.Order
            }catch(e){
                this.alert(e)
                this.$nuxt.$loading.finish()
            }finally{
                this.$nuxt.$loading.finish()
            }
        },
        handleView(item){
            this.editDialogVisible = true
            this.editedItem = Object.assign({}, item)
            this.editedItem.shippingFee = this.editedItem.shippingFee/100
            this.editedItem.totalAmount = this.editedItem.totalAmount/100
        },
        handleCloseEdit(){
            this.editedItem = {}
            this.editDialogVisible = false
        }
    },
    data(){
        return {
            order: [],
            search: "",
            editDialogVisible: false,
            editedItem: {},
            headers: [
                {
                    text: '訂單號碼',
                    filterable: true,
                    value: 'ID',
                },
                {
                    text: '手機號碼',
                    filterable: true,
                    value: 'mobile',
                },
                {
                    text: '總金額',
                    filterable: true,
                    value: 'totalAmount',
                },
                {
                    text: '創建日期',
                    filterable: true,
                    value: 'createdDate',
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