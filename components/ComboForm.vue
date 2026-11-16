<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.comboName" hide-details label="套餐名字" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.subTitle" hide-details label="套餐副標題" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.seq" hide-details label="次序" outlined type="number" min="0"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.price" hide-details label="價格" outlined type="number" min="0"></v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="mt-8 mb-8"/>
                <v-container>
                    <h3>Combo Line</h3>
                    <!-- <v-row>
                        <v-spacer/>
                        <v-btn color="primary" @click="handleNewLine">New Line</v-btn>
                    </v-row> -->
                    <v-row v-for="(comboLine, index) in item.comboLineList" :key="index">
                        <v-col cols="6">
                            <v-select v-model="comboLine.categoryIDList" multiple hide-details label="種類" outlined :items="categoryList" item-text="categoryName" item-value="ID"></v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="comboLine.quantity" hide-details label="數量" outlined type="number" min="0"></v-text-field>    
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider/>
                <!-- <v-container>
                    <h3>Free Line</h3>
                    <v-row>
                        <v-spacer/>
                        <v-btn color="primary" @click="handleFreeLine">New Line</v-btn>
                    </v-row>
                    <v-row v-for="(freeLine, index) in item.freeLineList" :key="index">
                        <v-col cols="6">
                            <v-select v-model="freeLine.productIDList" multiple hide-details label="Product" outlined :items="productList" item-text="productName" item-value="ID"></v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="freeLine.quantity" hide-details label="Quantity" outlined type="number"></v-text-field>    
                        </v-col>
                    </v-row>
                </v-container> -->
            </v-container>
            <v-row v-if="imageUrl != null && imageUrl != ''">
                <v-img :aspect-ratio="16/9" max-height="400px" :src="imageUrl"></v-img>
            </v-row>
            <v-row v-else-if="item.path != null && item.path != ''">
                <v-img :aspect-ratio="16/9" max-height="400px" :src="item.path"></v-img>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-file-input v-model="file" counter show-size @change="onFileChange" accept="image/png, image/jpeg" :rules="rules"></v-file-input>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="handleCloseEdit">取消</v-btn>
                <v-btn color="green darken-1" text @click="handleConfirmEdit">確認</v-btn>
            </v-card-actions>
        </v-card>
</template>
<script lang="js">
import Vue from "vue";
export default{
    props: {
        title: {
            type: String,
            required: false,
            default: ""
        },
        item: {
            type: Object,
            required: true,
            default: () => {
                return {}
            }
        },
        categoryList: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        productList: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        }
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        },
        handleConfirmEdit(){
            if(this.file != null &&  this.file.size < 2000000){
                this.$emit("confirm", this.file)
            }else{
                this.$emit("confirm")
            }
            this.file = null
            this.imageUrl = null
        },
        handleNewLine(){
            this.item.comboLineList.push({categoryIDList: [], quantity: 0})
        },
        handleFreeLine(){
            this.item.freeLineList.push({productIDList: [], quantity: 0})
        },
        onFileChange(file) {
            if (!file) {
                return;
            }
            this.createImage(file);
        },
        createImage(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
    },
    data(){
        return {
            imageUrl: null,
            file: null,
        }
    }
}
</script>
<style lang="sass" scoped>
</style>