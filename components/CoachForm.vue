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
                        <v-select v-model="item.license" multiple hide-details label="牌照" outlined :items="licenseList" item-text="name_zh" item-value="code"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="item.area" multiple hide-details label="地區" outlined :items="areaList" item-text="name_zh" item-value="code"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="item.language" hide-details label="語言" outlined :items="languageList" item-text="name" item-value="code"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.price" hide-details label="價格" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select v-model="item.examAddress" multiple hide-details label="考試地址" outlined :items="examAddressList" item-text="address_zh" item-value="addressCode"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-switch v-model="item.isEnable" hide-details label="啟用"></v-switch>
                    </v-col>
                    <v-col v-if="!isCreateMode" cols="6">
                        <v-switch v-model="item.isSetPassword" hide-details label="設定密碼"></v-switch>
                    </v-col>
                </v-row>
                <v-divider class="mt-4 mb-4"/>
                <v-form v-if="item.isSetPassword || isCreateMode" ref="form" lazy-validation>
                    <div class="text-subtitle-1 mb-2">設定密碼</div>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="password" hide-details label="密碼" outlined type="password"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="confirmPassword" label="確認密碼" outlined type="password" :error-messages="passwordError"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
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
//TODO addressList switch should have group
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
        areaList: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        licenseList: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        examAddressList: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        isCreateMode: {
            type: Boolean,
            required: true,
            default: () => {
                return false
            }
        },
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        },
        handleConfirmEdit(){
            var password = this.password == null ? "" : String(this.password)
            var confirmPassword = this.confirmPassword == null ? "" : String(this.confirmPassword)
            if(password == "" && confirmPassword == ""){
                this.passwordError = ""
                this.$emit("confirm")
                return
            }
            if(password == "" || password != confirmPassword){
                this.passwordError = "密碼不一致"
                return
            }
            this.passwordError = ""
            this.item.password = password
            this.$emit("confirm")
        }
    },
    watch: {
        item(){
            this.password = ""
            this.confirmPassword = ""
            this.passwordError = ""
        }
    },
    data(){
        return {
            password: "",
            confirmPassword: "",
            passwordError: "",
            isSetPassword: false,
            languageList: [
                { name: "中文繁體", code: "ZH" },
                { name: "中文簡體", code: "CN" },
                { name: "英文", code: "EN" },
            ]
        }
    }
}
</script>
<style lang="sass" scoped>
</style>