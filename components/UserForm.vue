<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.mobile" hide-details label="手機" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.password" hide-details label="密碼" outlined type="password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.deliveryAddress" hide-details label="送貨地點" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.districtName" hide-details label="送貨地區" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.firstName" hide-details label="名字" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.lastName" hide-details label="姓氏" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.email" hide-details label="電郵" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="item.memberType" hide-details label="會員種類" outlined :items="userTypeList" item-text="name" item-value="code"></v-select>
                    </v-col>
                </v-row>
                <v-row v-show="item.memberType == 'SUPER'">
                    <v-col cols="6">
                        <v-select v-model="item.isUsedFreeDrinks" hide-details label="是否已贈送會員贈品" outlined :items="YesNoList" item-text="name" item-value="value" disabled></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.freeDrinkUsedDate" hide-details label="贈送日期" outlined disabled></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="item.isAllowMarketing" hide-details label="允許用作推廣用途" outlined :items="YesNoList" item-text="name" item-value="value"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.createdDate" hide-details label="創建日期" outlined disabled></v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="mt-8 mb-8"/>
                <v-container v-show="item.ID != null">
                    <h3>訂單列表</h3>
                    <v-data-table :headers="headers" :items="orderList" item-key="ID" dense sort-by="createdDate" sort-desc single-expand show-expand hide-default-footer>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td colspan="4">
                                <order-form title="訂單" :order="item" class="ma-4"/>
                            </td>
                        </template>
                    </v-data-table>
                </v-container>
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
import BaseMixin from "@/components/mixins/BaseMixin"
export default{
    mixins: [BaseMixin],
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
        orderList: {
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
            this.$emit("confirm")
        }
    },
    data(){
        return {
            headers: [
                {
                    text: '訂單編號',
                    filterable: true,
                    value: 'ID',
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
            ],
            userTypeList: [
                {
                    code: "NORMAL",
                    name: "普通會員"
                },
                {
                    code: "SUPER",
                    name: "至尊會員"
                },
            ],
            YesNoList: [
                {
                    name: "Yes",
                    value: true
                },
                {
                    name: "No",
                    value: false
                },
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
</style>