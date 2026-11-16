<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.productName" hide-details label="師傅名稱" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="item.categoryID" hide-details label="種類" outlined :items="categoryList" item-text="categoryName" item-value="ID"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.price" hide-details label="價格" outlined type="number" min="0"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.comboPrice" hide-details label="追加價格" outlined type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.extraPrice" hide-details label="額外價格" outlined type="number" min="0"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.createdDate" hide-details label="創建日期" outlined disabled></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <!-- <v-switch v-model="item.isSoldOut" label="是否允許出售?"></v-switch> -->
                        <v-select v-model="item.isSoldOut" hide-details label="是否允許出售" outlined :items="soldOutList" item-text="name" item-value="value"></v-select>
                    </v-col>
                </v-row>
                <v-divider class="mt-4 mb-4"/>
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
            </v-container>
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
            required: true,
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
            soldOutList: [
                {
                    name: "是",
                    value: false
                },
                {
                    name: "否",
                    value: true
                }
            ],
            imageUrl: null,
            file: null,
        }
    }
}
</script>
<style lang="sass" scoped>
</style>