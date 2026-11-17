<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.coachName" hide-details label="師傅名稱" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.phone" hide-details label="電語號碼" outlined type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.license" hide-details label="牌照" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.area" hide-details label="地區" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.language" hide-details label="語言" outlined min="0"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.price" hide-details label="價格" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="mt-4 mb-4"/>
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