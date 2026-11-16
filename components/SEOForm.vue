<template>
    <v-card>
        <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.page" hide-details label="頁面" outlined disabled></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.title" hide-details label="Meta Title" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="item.description" hide-details label="Meta Description" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="item.keyword" hide-details label="Meta Keyword" outlined></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="handleCloseEdit">取消</v-btn>
                <v-btn color="green darken-1" text @click="handleConfirmEdit">確定</v-btn>
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
        }
    },
    methods: {
        handleCloseEdit(){
            this.$emit("close")
        },
        handleConfirmEdit(){
            this.$emit("confirm")
        }
    }
}
</script>
<style lang="sass" scoped>
</style>