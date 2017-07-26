<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     theme="dark">
                <el-menu-item
                        index="1"
                        @click="recode"
                        v-if="account[3]==0">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-record"></use>
                    </svg>
                    &nbsp;录入
                </el-menu-item>
                <el-menu-item
                        index="2"
                        @click="search"
                        v-if="account[1]==0">
                    <i class="el-icon-search"></i>查询
                </el-menu-item>
                <el-menu-item index="3" @click="approve" v-show="isok">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-approve"></use>
                    </svg>
                    &nbsp;审批
                </el-menu-item>
                <el-menu-item index="4" @click="modelDownload" v-show="isok">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-model-download"></use>
                    </svg>
                    &nbsp;模板下载
                </el-menu-item>
                <el-menu-item index="5" @click="statistics" >
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-stat"></use>
                    </svg>
                    &nbsp;统计
                </el-menu-item>
                <el-menu-item index="6" @click="importExcrl" v-show="false">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-stat"></use>
                    </svg>
                    &nbsp;一键导入
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    import '../../style/menu.css'
    export default {
        data() {
            return {
                account:{}
            }
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            recode(key){
                this.$store.commit('RECORD_STEP_1');
                this.$store.commit('RECORD_BUSINESS_TYPE', -1)
                this.$router.replace('/home/record/chooseType');
            },
            search(key){
                this.$router.replace('/home/search')
            },
            approve(key){
                this.$router.replace('/home/approve')
            },
            modelDownload(key){
                this.$router.replace('/home/modeldownload')
            },
            statistics(){
                this.$router.replace('/home/statistics')
            },
            importExcrl(){
                this.$router.replace('/home/importExcel')
            }

        },
        computed: {
            isok(){
                return this.$store.state.permission != 0
            },
        },
        mounted(){
            this.account = require('store').get('account');
        }
    }


</script>

<style>
    .icon {
        font-size: 1.2em;
    }
</style>
