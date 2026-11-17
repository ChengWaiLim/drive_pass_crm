<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.username" hide-details label="會員名稱" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.phone" hide-details label="電話號碼" outlined type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.hkid" hide-details label="身份證號碼" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.address" hide-details label="地址" outlined></v-text-field>
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
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        },
        handleConfirmEdit(){
            this.$emit("confirm")
        },
    },
}
</script>
<style lang="sass" scoped>
</style>
