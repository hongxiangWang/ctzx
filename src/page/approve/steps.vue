<template>
    <div id="steps">
        <!--{{stepData}}-->

        {{rowData}}
        <el-steps direction="vertical" :space="100" :active="stepData.active">
            <el-step v-for="(item,index) in stepData.steps"
                     :title="item.title"
                     :status="item.status">
                <span slot="description">
                    {{item.description}}
                    <el-button type="text" @click="pass_agree" v-if="item.passBtn">通过</el-button>
                    <el-button type="text" @click="pass_back" v-if="item.backBtn">退回</el-button>
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
            stepData:{},
            rowData:{}
        },
        methods: {
            pass_agree(){
                this.$emit('stepPass',1);//确定按钮
            },
            pass_back(){
                this.$emit('stepPass',0);//取消按钮
            },
            handleClose(){
                this.$emit('stepEditClose');
            }
        }
    }
</script>

<style lang="less">


</style>