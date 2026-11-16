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
    <v-data-table :headers="headers" :items="product" item-key="ID" :search="search" :custom-filter="customSearch" dense>
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.price="{ item }">
            ${{showStripePrice(item.price)}}
        </template>
        <template v-slot:item.comboPrice="{ item }">
            ${{showStripePrice(item.comboPrice)}}
        </template>
        <template v-slot:item.extraPrice="{ item }">
            ${{showStripePrice(item.extraPrice)}}
        </template>
        <template v-slot:item.categoryID="{ item }">
            <v-chip color="primary">{{getCategoryNameByID(item.categoryID)}}</v-chip> 
        </template>
        <!-- <template v-slot:item.isSoldOut="{ item }">
            <span v-show="item.isSoldOut" style="color: red">Yes</span>
            <span v-show="!item.isSoldOut" style="color: green">No</span>
        </template> -->
        <template v-slot:item.actions="{ item }">
            <v-btn fab dark x-small color="cyan" @click="handleEdit(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-dialog v-model="editDialogVisible" width="80%">
        <product-form title="修改師傅" :item="editedItem" :categoryList="category" @close="handleCloseEdit" @confirm="handleConfirmEdit"/>
    </v-dialog>
    <v-dialog v-model="newDialogVisible" width="80%">
        <product-form title="創建師傅" :item="newItem" :categoryList="category" @close="handleCloseNew" @confirm="handleConfirmNew"/>
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
                var res = await BaseRequest.getProductAll()
                this.product = res.Product
                var res = await BaseRequest.getCategoryAll()
                this.category = res.Category
                this.$nuxt.$loading.finish()
            }catch(e){
                this.$nuxt.$loading.finish()
            }
        },
        handleEdit(item){
            this.editDialogVisible = true
            this.editedItem = Object.assign({}, item)
            this.editedItem.price = this.editedItem.price/100
            this.editedItem.comboPrice = this.editedItem.comboPrice/100
            this.editedItem.extraPrice = this.editedItem.extraPrice/100
        },
        handleCloseEdit(){
            this.editedItem = {}
            this.editDialogVisible = false
        },
        async handleConfirmEdit(file){
            try{
                if(file != null){
                    var imageResult = await BaseRequest.uploadImage({file: file})
                    this.editedItem.path = imageResult.path
                }
                this.checkProductValid(this.editedItem)
                this.editDialogVisible = false
                this.editedItem.price = this.editedItem.price * 100
                this.editedItem.comboPrice = this.editedItem.comboPrice * 100
                this.editedItem.extraPrice = this.editedItem.extraPrice * 100
                this.$nuxt.$loading.start()
                var res = await BaseRequest.updateProduct(this.editedItem)
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
        checkProductValid(product){
            if(product.productName == null || product.productName == "")
                throw new Error("Product Name Invalid")
            else if(product.price == null || product.price == "" || product.price <= 0 || isNaN(product.price))
                throw new Error("Price Invalid")
            else if(product.comboPrice == null || product.comboPrice < 0 || isNaN(product.comboPrice))
                throw new Error("Combo Price Invalid")
            else if(product.extraPrice == null || product.extraPrice < 0 || isNaN(product.extraPrice))
                throw new Error("Additional Price Invalid")
            else if(product.categoryID == null)
                throw new Error("Category Invalid")
            // else if(product.isSoldOut === null)
            //     throw new Error("Sold out Invalid")
        },
        getCategoryNameByID(categoryID){
            var category = this.category.find(f => f.ID == categoryID)
            if(category != null)
                return category.categoryName
        },
        handleNew(){
            this.newDialogVisible = true
            this.newItem = this.newEmptyProduct()
        },
        handleCloseNew(){
            this.newDialogVisible = false
            this.newItem = this.newEmptyProduct()
        },
        async handleConfirmNew(file){
            try{
                if(file != null){
                    var imageResult = await BaseRequest.uploadImage({file: file})
                    this.newItem.path = imageResult.path
                }
                this.checkProductValid(this.newItem)
                this.newDialogVisible = false
                this.newItem.price = this.newItem.price * 100
                this.newItem.comboPrice = this.newItem.comboPrice * 100
                this.newItem.extraPrice = this.newItem.extraPrice * 100
                this.$nuxt.$loading.start()
                var res = await BaseRequest.addProduct(this.newItem)
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
        }
    },
    data(){
        return {
            editedItem: {},
            newItem: {},
            editDialogVisible: false,
            newDialogVisible: false,
            search: "",
            product: [],
            category: [],
            headers: [
                {
                    text: '師傅名稱',
                    filterable: true,
                    value: 'name',
                },
                {
                    text: '價格',
                    filterable: true,
                    value: 'price',
                },
                {
                    text: '追加價格',
                    filterable: true,
                    value: 'comboPrice',
                },
                {
                    text: '額外價格',
                    filterable: true,
                    value: 'extraPrice',
                },
                {
                    text: '種類',
                    filterable: true,
                    value: 'categoryID',
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
</style>