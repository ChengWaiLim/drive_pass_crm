<template>
    <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.districtName" hide-details label="地區名字" outlined disabled></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.shippingFee" hide-details label="運費" outlined type="number" min="0"></v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="mt-4 mb-4"/>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            地點
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-spacer/>
                                <v-btn color="primary" @click="handleNewDistrict">創建地址</v-btn>
                            </v-row>
                            <v-row>
                                <v-col cols="3" v-for="(line, index) in item.detail" :key="index">
                                    <v-container>
                                        <v-row>
                                            <v-text-field v-model="line.name" hide-details label="地點名字" outlined></v-text-field>
                                            <v-btn class="mx-2" fab dark small color="red" @click="handleDelete(line)">
                                                <v-icon dark>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            運費優惠條件
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-spacer/>
                                <v-btn color="primary" @click="handleNewCondition">創建優惠條件</v-btn>
                            </v-row>
                            <v-row v-for="(line, index) in item.conditionList" :key="index">
                                <v-col cols="3">
                                    <v-text-field v-model="line.displayName" hide-details label="顯示名字" outlined></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field v-model="line.conditionPrice" hide-details label="觸發條件價格" outlined type="number" min="0"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select v-model="line.code" hide-details label="優惠種類" outlined :items="typeList" item-text="name" item-value="code"></v-select>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="line.shippingFee" hide-details label="優惠價格" outlined type="number" min="0"></v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn class="mx-2" fab dark small color="red" @click="handleDeleteCondition(line)">
                                        <v-icon dark>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
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
import { v4 as uuidv4 } from 'uuid';
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
        }
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        },
        handleConfirmEdit(){
            this.$emit("confirm")
        },
        handleDelete(line){
            this.item.detail = this.item.detail.filter(f => f.name != line.name)
        },
        handleDeleteCondition(line){
            this.item.conditionList = this.item.conditionList.filter(f => f.displayName != line.displayName)
        },
        handleNewDistrict(){
            this.item.detail = this.prepend({
                name: "New District",
                code: uuidv4()
            }, this.item.detail)
        },
        handleNewCondition(){
            this.item.conditionList.push({
                displayName: "New Condition",
                conditionPrice: 0,
                code: "PARTLY_FREE",
                shippingFee: 0
            })
        },
        prepend(value, array){
            var newArray = array.slice();
            newArray.unshift(value);
            return newArray;
        }
    },
    data(){
        return {
            typeList: [
                {
                    code: "PARTLY_FREE",
                    name: "減免"
                },
                {
                    code: "FREE",
                    name: "改作"
                }
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
</style>