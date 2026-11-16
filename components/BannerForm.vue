<template>
  <v-card>
    <v-card-title class="text-h5">{{ title }}</v-card-title>
    <v-container>
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
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="item.name" hide-details label="顯示名稱" outlined></v-text-field>
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
            if(this.file.size < 2000000 ){
                this.$emit("confirm", this.file)   
            }
            this.file = null
            this.imageUrl = null
        },
        createImage(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onFileChange(file) {
            if (!file) {
                return;
            }
            this.createImage(file);
        }
    },
    data(){
        return {
            file: null,
            imageUrl: null,
            rules: [
                value => !value || value.size < 2000000 || 'Upload size should be less than 2 MB!',
            ],
        }
    }
}
</script>
<style lang="sass" scoped>
</style>