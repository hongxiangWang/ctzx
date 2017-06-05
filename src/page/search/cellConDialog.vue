<template>
    <el-dialog
            id="cellConDialog"
            size="tiny"
            @close="closeDialog"
            :visible="cellDialogVisible"
            :modal="false"
            :modal-append-to-body="false">
    <span slot="title">
      <span v-show="cellData.fileName!= undefined">{{cellData.fileName}}</span>
      <span v-show="cellData.title!= undefined">{{cellData.title}}</span>
    </span>
        <div v-show="cellData.url!= undefined">
            <img width="100%" :src=cellData.url alt="">
        </div>

        <el-form :model="cellData" ref="ruleForm" label-width="0px">
            <div v-if="cellData.type!= undefined && cellData.type == 1">
                <el-input v-model="cellData.value" placeholder="请输入内容"></el-input>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 2">
                <p><span style="color: #ff7e7e">[不可更改]</span>{{cellData.value}} </p>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 3">
                <el-date-picker
                        v-model="cellData.value"
                        type="date"
                        placeholder="选择日期时间">
                </el-date-picker>
            </div>

            <div v-if="cellData.type!= undefined && cellData.type == 4">
                <el-select v-model="cellData.value" placeholder="请选择用途" :width="200">
                    <el-option v-if="cellData.key!='city'" v-for='item in selectItemOption[cellData.key]'
                               :value='item'></el-option>

                    <div v-show="cellData.key==='city'">
                        <el-option v-for='item in city'
                                   :value='item.name'></el-option>
                    </div>

                </el-select>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 5">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :file-list="cellData.value"
                        :on-success="fileUploadfSuccess"
                        :on-remove="fileRemove"
                        list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>


            <el-switch
                    v-if="cellData.type!= undefined && cellData.type == 6"
                    v-model="cellData.value"
                    on-text="是"
                    off-text="否">
            </el-switch>

        </el-form>
        <div slot="footer" class="dialog-footer" v-if="cellData.type!= undefined ">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {city} from '../../asstes/city.js';
    import {selectItemOption} from './searchCon.js'
    const base = require('../../value/string.js');
    let isClearAll = false;
    export default{
        data(){
            return {
                selectItemOption: selectItemOption,
                fileList: [],
                city: city.sub,
                uploadUrl: 'http://135.224.181.52/admin/pic/picupload',
                rules: [],
            }
        },
        props: {
            cellDialogVisible: Boolean,
            cellData: {},

        },
        methods: {
            close(){
                this.fileList = [];
                this.$emit('cellDialogClose');
            },
            closeDialog(){
                this.$emit('cellDialogCloseParent');
            },
            edit(call){
                if (this.cellData.type == 5) {
                    if (isClearAll) {
                        this.cellData.files = [];
                        isClearAll = false;
                        this.$emit('editSuccess', this.cellData);
                        return;
                    }
                    if (this.fileList.length < 1) {
                        this.cellData.value.forEach(value => {
                            this.fileList.push(value.url);
                        });
                    }

                    this.cellData.files = this.fileList;
                    this.$emit('editSuccess', this.cellData);
                } else {
                    this.$emit('editSuccess', this.cellData);
                }

            },
            fileUploadfSuccess(response){
                //this.cellData.value.push(response.data);
                isClearAll = false;
                if (this.fileList.length == 0) {
                    this.cellData.value.forEach(value => {
                        this.fileList.push(value.url);
                    });
                }
                this.fileList.push(response.data);
            },
            fileRemove(filelist){

                if (this.fileList.length == 0) {
                    this.cellData.value.forEach(value => {
                        this.fileList.push(value.url)
                    })
                }
                let newArr = this.fileList.filter((value) => {
                    return value != filelist.url;
                })
                this.fileList = newArr;

                isClearAll = true;
                console.log('newArr---', this.fileList)


            }

        },
        mounted(){



        },
        computed: {
            editValueInput(){
                return this.cellData.value;
            }
        }
    }
</script>
