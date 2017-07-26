<template>
    <el-dialog
            :close-on-click-modal="true"
            @before-close="beforeClose"
            id="cellConDialog"
            size="tiny"
            @close="closeDialog"
            :visible="cellDialogVisible"
            :modal="false"
            :modal-append-to-body="false">
    <span slot="title">
      <span v-show="cellData.fileName!= undefined">{{cellData.fileName}} <el-button type="text" style="padding: 0; margin: 0 10px; font-size: 12px" @click="imgDownload(cellData.url)">下载</el-button></span>
      <span v-show="cellData.title!= undefined">{{cellData.title}}</span>
    </span>
        <div v-show="cellData.url!= undefined">
            <img width="100%" :src=cellData.url alt="" >
        </div>

        <el-form :model="cellData" ref="ruleForm" label-width="0px">
            <div v-if="cellData.type!= undefined && cellData.type == 1">
                <el-input v-model="cellData.value" placeholder="请输入内容"></el-input>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 2">
                <p>{{cellData.value}} <span style="color: #ff7e7e">[不可更改]</span></p>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 3">
                <el-date-picker
                        v-model="cellData.value"
                        type="date"
                        :editable="false"
                        placeholder="选择日期时间">
                </el-date-picker>
            </div>

            <div v-if="cellData.type!= undefined && cellData.type == 4">
                <el-select v-model="cellData.value" placeholder="请选择用途" :width="200">
                    <el-option v-if="cellData.key!='city'" v-for='item in selectItemOption[cellData.key]'
                               :value='item'></el-option>

                    <div v-show="cellData.key==='city'">
                        <el-option v-for='item in city'
                                   :value='item.area_name'></el-option>
                    </div>

                </el-select>
            </div>


            <div v-if="cellData.type!= undefined && cellData.type == 5">
                <el-upload
                        ref="upload"
                        :action="uploadUrl"
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

        <p style="color:red" v-show="requestTips">此选项不可为空</p>
        <div slot="footer" class="dialog-footer" v-if="cellData.type!= undefined ">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {city} from '../../assets/city.js';
    import {selectItemOption, dateItem, requiredItem} from './searchCon.js'
    const base = require('../../value/string.js');
    let isClearAll = false;
    let localFileRrl = [];
    export default{
        data(){
            return {
                selectItemOption: selectItemOption,
                fileList: [],
                city: require('store').get('areaArr'),
                uploadUrl: base.uploadUrl,
                rules: [],
                requestTips: false
            }
        },
        props: {
            cellDialogVisible: Boolean,
            cellData: {},

        },
        methods: {
            close(){
                this.$emit('cellDialogClose');
            },
            closeDialog(){
                this.requestTips = false;
                this.fileList = [];
                localFileRrl = [];
                this.$emit('cellDialogCloseParent');
            },
            beforeClose(){
                alert('dddddd')
            },
            edit(call){

                switch (this.cellData.type) {
                    case 1:
                        let value = this.cellData.value.replace(/(^\s+)|(\s+$)/g, "");
                        if (requiredItem.indexOf(this.cellData.key) >= 0 && value =="") {
                            this.requestTips = true;
                            break;
                        }
                        this.$emit('editSuccess', this.cellData);
                        break;
                    case 2:
                        this.$emit('editSuccess', this.cellData);
                        break;
                    case 3:
                        dealDataType(this.cellData);
                        if (requiredItem.indexOf(this.cellData.key) >= 0 && (this.cellData.value == null || this.cellData.value.replace(/(^\s+)|(\s+$)/g, "") == "")) {
                            this.requestTips = true;
                            break;
                        }
                        this.$emit('editSuccess', this.cellData);
                        break;
                    case 4:
                        this.$emit('editSuccess', this.cellData);
                        break;
                    case 5:
                        if (isClearAll) {
                            this.cellData.files = [];
                            isClearAll = false;
                            if (requiredItem.indexOf(this.cellData.key) >= 0) {
                                this.requestTips = true;
                                break;
                            }
                            this.$emit('editSuccess', this.cellData);
                            break;
                        }
                        if (this.fileList.length < 1) {
                            this.cellData.value.forEach(value => {
                                this.fileList.push(value.url);
                            });
                        }
                        console.log('edit----', this.fileList)
                        this.cellData.files = this.fileList;
                        this.$emit('editSuccess', this.cellData);
                        break;
                    case 6:
                        this.cellData.value = this.cellData.value? '是': '否';
                        this.$emit('editSuccess', this.cellData);
                        break;
                }

                if (this.cellData.type != 6) {

                }
                else {

                }

            },
            fileUploadfSuccess(response, file){
                //this.cellData.value.push(response.data);
                if (this.fileList.length == 0 && !isClearAll) {
                    this.cellData.value.forEach(value => {
                        this.fileList.push(value.url);
                    });
                }
                isClearAll = false;

                this.fileList.push(response.data);
                let localFile = {
                    url: file.url,
                    response: response.data
                }
                this.requestTips = false;
                localFileRrl.push(localFile);
            },
            fileRemove(filelist){
                let newArr = [];
                if (this.fileList.length == 0) {
                    this.cellData.value.forEach(value => {
                        this.fileList.push(value.url)
                    })
                }

                newArr = this.fileList.filter((value) => {
                    return value != filelist.url;
                });
                //因为本地上传，删除文件url不是list有的，需要记录上传对应的url与response，然后过滤
                localFileRrl.forEach(value => {
                    if (value.url == filelist.url) {
                        newArr = newArr.filter(v => {
                            return v != value.response;
                        })
                    }
                    ;

                })
                this.fileList = newArr;
                if (this.fileList.length == 0) {
                    isClearAll = true;
                }


            },
            imgDownload(call){
                downloadFile(call);
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


    function dealDataType(json) {
        if (json.value instanceof Date) {
            let dateString = json.value.getFullYear() + '-' + (json.value.getMonth() + 1) + '-' + json.value.getDate();
            json.value = dateString;
        }

        return json;
    }

    function downloadFile(url) {
        try {
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            console.log('----encodeURI-6666--', url)
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        } catch (e) {

        }
    }
</script>
