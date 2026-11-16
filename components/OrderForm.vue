<template>
        <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.ID" hide-details label="訂單號碼" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.totalAmount" hide-details label="總金額" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.firstName" hide-details label="名字" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.lastName" hide-details label="姓氏" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.mobile" hide-details label="手機號碼" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.email" hide-details label="電郵" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.districtName" hide-details label="運送地區" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.deliveryAddress" hide-details label="地址" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.shippingFee" hide-details label="運費" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.note" hide-details label="特別要求" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="order.deliveryDate" hide-details label="運送日期" disabled outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="order.deliveryTime" hide-details label="運送時間" disabled outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="order.userType" hide-details label="會同種類" outlined :items="userTypeList" item-text="name" item-value="code" disabled></v-select>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-container>
                <h3>單點</h3>
                <v-data-table :headers="headers" :items="order.orderLineList" dense hide-default-footer>
                    <template v-slot:item.price="{ item }">
                        ${{showStripePrice(item.price)}}
                    </template>
                </v-data-table>
                <h3>套餐</h3>
                <v-data-table :headers="comboHeader" :items="order.orderComboList" single-expand show-expand hide-default-footer>
                    <template v-slot:item.price="{ item }">
                        ${{showStripePrice(item.price)}}
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <h4>套餐項目</h4>
                            <v-simple-table>
                                <thead>
                                    <tr>
                                    <th class="text-left">名字</th>
                                    <th class="text-left">額外價格</th>
                                    <th class="text-left">數量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in item.orderComboItemList" :key="item.name">
                                    <td>{{ item.productName }}</td>
                                    <td> +${{ showStripePrice(item.price) }}</td>
                                    <td> {{ item.quantity }}</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            <h4>Free Items</h4>
                            <v-simple-table>
                                <thead>
                                    <tr>
                                    <th class="text-left">免費項目</th>
                                    <th class="text-left">額外價錢</th>
                                    <th class="text-left">數量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in item.orderFreeItemList" :key="item.name">
                                    <td>{{ item.name }}</td>
                                    <td> Free</td>
                                    <td> {{ item.quantity }}</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </td>
                    </template>
                </v-data-table>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="handleCloseEdit">取消</v-btn>
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
        order: {
            type: Object,
            required: true,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        }
    },
    data(){
        return {
            comboHeader: [
                {
                    text: '套餐名字',
                    align: 'start',
                    sortable: true,
                    value: 'comboName',
                },
                {
                    text: '價格',
                    align: 'start',
                    sortable: true,
                    value: 'price',
                }
            ],
            headers: [
                {
                    text: '師傅名字',
                    align: 'start',
                    sortable: true,
                    value: 'productName',
                },
                {
                    text: '價格',
                    align: 'start',
                    sortable: true,
                    value: 'price',
                },
                {
                    text: '數量',
                    align: 'start',
                    sortable: true,
                    value: 'quantity',
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
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
</style>