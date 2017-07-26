<template>
    <div id="steps">
        {{stepData}}
        <el-steps direction="vertical" :space="100" :active="stepData.active">
            <el-step v-for="(item,index) in stepData.steps"
                     :title="item.title"
                     :status="item.status">
                <span slot="description">
                    {{item.description}}
                    <el-button type="text" @click="pass" v-if="stepData.passBtn">通过</el-button>
                    <el-button type="text" @click="pass" v-if="stepData.backBtn">退回</el-button>
                </span>
            </el-step>
        </el-steps>

    </div>
</template>
<script>
    const helper = require('../../helper/helper.js');
    import {flowPointName} from './world.js'
    export default{

        data(){
            return {
                editDialog: false,
            }
        },
        props:{
            stepData:{}
        },
        methods: {
            pass(){
                this.$emit('stepPass');
            },
            handleClose(){
                this.$emit('stepEditClose');
            }
        }
    }
</script>

<style lang="less">


</style>