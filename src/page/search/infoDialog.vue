<template>
    <div id='searchInfo' ref="searchInfo">
        <el-dialog id='cellDialog' :visible="dialogTableVisible" @click="closeDialog" :close-on-press-escape="false"
                   size="large">
      <span slot="title">
        {{title}}
        <el-button
                v-if="account[2]==0"
                @click="entryEditModel"
                style="margin-left: 3rem"
                :class="entryEditModelClass">{{isEntryEditModelText}}</el-button>
          <span v-if="isEntryEditModel" style="color:#ff7e7e;margin-left: 2rem">点击每项的标题，弹出修改窗口</span>
       <small style="display: block;margin: 1rem 0; color:#8492A6">1、带*表示的项为必填项，若为空，请添加。2、若语音中继的使用用途为"呼叫中心"，请上传附件"呼叫中心资质"。</small>
      </span>

            <cell
                    v-for="(item,index) in itemTitle"
                    :title="item"
                    :id='index'
                    :value=itemValue[index]
                    :dataJson='info'
                    @cellFileOpen='cellFileOpen'
                    @editInfo="editInfo"></cell>
            <h4 v-if="(info!='' && info.sundata.length>0)">线路信息：共计<span
                    style="color:orangered;">{{info.sundata.length}}</span>条线路
            </h4>
            <div v-for="(v,i) in info.sundata" id="sundata">
                <cell
                        v-for="(item,index) in itemSonTitle"
                        :title="item"
                        :id='i'
                        :sonId="v.id"
                        :value=itemSonValue[index]
                        :dataJson='v'
                        @editInfo="editInfo"></cell>
            </div>

            <div v-show="businessType=='2'">
                <cell
                        v-for="(item,index) in item400Title"
                        :title="item"
                        :id='index'
                        :value=item400Value[index]
                        :dataJson='info'
                        @cellFileOpen='cellFileOpen'
                        @editInfo="editInfo"></cell>
            </div>
            <!--<p> {{info}}</p>-->
        </el-dialog>
        <!--<el-dialog id="formDialog" :visible.sync="dialogFormVisible" :modal="false" :modal-append-to-body="false"-->
        <!--@close="formDialogClose">-->
        <!--<p>sadsad</p>-->
        <!--</el-dialog>-->
        <cellConDialog
                :cellData="celldata"
                :cellDialogVisible="cellDialogVisible"
                @cellDialogClose="cellDialogCloseParent"
                @editSuccess="editSuccess">
        </cellConDialog>
    </div>
</template>
<script>
    import cell from  './infoCell.vue'
    import cellConDialog  from  './cellConDialog.vue'
    import {
        infoCon,
        sonCon,
        sonCon400,
        switchArr,
        inputItem,
        noEditItem,
        dateItem,
        selectItem,
        fileItem,
        switchItem,
        itemType,
        selectItemOption
    } from './searchCon.js'

    const helper = require('../../helper/helper.js');
    export default{
        data(){
            return {
                account: {},
                titles: this.title,
                infoData: [],
                itemTitle: [],
                itemValue: [],
                itemSonTitle: [],
                itemSonValue: [],
                item400Title: [],
                item400Value: [],
                cellDialogVisible: false,
                editCellValue: '',
                celldata: {},
                isEntryEditModel: false,
                isEntryEditModelText: '进入编辑模式'
            }
        },
        props: {
            info: {},
            dialogTableVisible: Boolean,
            title: String,
            businessType: String,
        },
        computed: {
            entryEditModelClass(){
                return {
                    entryEditModel: this.isEntryEditModel
                };
            },
        },
        methods: {
            //父
            closeDialog(){
                this.$emit('close');
            },
            cellDialogCloseParent(){

                this.cellData = {};
                this.cellDialogVisible = false;
                helper.resolveDialogNest('cellDialog', this);
            },
            cellFileOpen(data){
                console.log('00000----',data)
                this.cellDialogVisible = true;
                this.celldata = data;
                helper.resolveDialogNest('cellDialog', this);
            },
            entryEditModel(){
                if (!this.isEntryEditModel) {
                    this.isEntryEditModelText = '退出编辑'
                    this.$message({message: '进入编辑模式', type: 'success'})
                } else {
                    this.isEntryEditModelText = '进入编辑模式'
                    this.$message({message: '退出编辑模式', type: 'warning'})
                }
                return this.isEntryEditModel = !this.isEntryEditModel;
            },
            editInfo(call){
                if (this.isEntryEditModel) {
                    let allTitle = infoCon.concat(sonCon).concat(sonCon400);
                    allTitle.forEach(v => {
                        for (let o in v) {
                            o == call.key ? call.title = v[o] : null;
                        }
                    });
                    if(Number(this.businessType)!=2 && call.key =='tel_number'){
                        call.title = '中继号码/计费号码'
                    }
                    if (call.sonId != undefined) {
                        call.value = this.info.sundata[call.sonIndex][call.key];
                        call.type = getType(call.key, call.value, this);
                        call.value = reviseValue(call.value, call.type, call);
                    } else {

                        call.value = this.info[call.key];
                        call.type = getType(call.key, call.value, this);
                        call.value = reviseValue(call.value, call.type, call);
                    }
                    this.cellFileOpen(call);
                }
            },
            editSuccess(call){

                let params = {
                    serial_number: this.info.serial_number,
                    edit_people_card: this.info.edit_people_card,
                    change_name: call.key,
                    change_data: call.value,
                    son_id: 0,
                    client_id: this.info.client_id,
                    business_type: this.businessType,
                }
                if (call.value instanceof Array && call.files != undefined) {
                    console.log('----', JSON.stringify(call))
                    let files = "";
                    call.files.forEach((value) => {
                        files += value + '|'
                    })
                    params.change_data = files;
                }

                if (call.sonId != undefined) {
                    params.son_id = call.sonId;
                    this.$ajax.post('/business/editbusiness', params).then(response => {
                        if (Number(response.data.data.flg) == 0) {
                            this.info.sundata[call.sonIndex][call.key] = call.value;
                            this.$message({message: '修改成功', type: 'success'});
                        } else {
                            this.$message({message: '修改失败，请稍后重试', type: 'error'});
                        }
                    }).catch(error => {
                        this.$message({message: '无法获取数据', type: 'error'});
                    })

                } else {
                    console.log('----', JSON.stringify(params))

                    this.$ajax.post('/business/editbusiness', params).then(response => {
                        if (Number(response.data.data.flg) == 0) {
                            console.log('---editbusiness-----success--', this.info[call.key]);
                            console.log('---editbusiness-----3333--', params.change_data);
                            this.info[call.key] = params.change_data;
                            this.$message({message: '修改成功', type: 'success'});
                        } else {
                            this.$message({message: '修改失败，请稍后重试', type: 'error'});
                        }
                    }).catch(error => {
                        this.$message({message: '无法获取数据' + error, type: 'error'});
                    })

                }
                this.cellDialogCloseParent();

            }
        },
        components: {
            cell, cellConDialog
        },
        mounted(){
            this.account = require('store').get('account');
            this.$nextTick(() => {
                this.$jquery('#cellDialog .el-dialog__headerbtn').click(() => {
                    this.$emit('close');
                });
                this.$jquery('#cellConDialog .el-dialog__headerbtn').click(() => {
                    this.cellDialogCloseParent();
                });
                infoCon.forEach((value, index, self) => {
                    for (let o in value) {
                        this.itemValue.push(o);
                        this.itemTitle.push(value[o]);
                    }
                });
                sonCon.forEach((value, index, self) => {
                    for (let o in value) {
                        this.itemSonValue.push(o);
                        this.itemSonTitle.push(value[o]);
                    }
                });
                sonCon400.forEach((value, index, self) => {
                    for (let o in value) {
                        this.item400Value.push(o);
                        this.item400Title.push(value[o]);
                    }
                });

            })
        }

    }

    function getType(key, value, vm) {
        console.log(value)
        if ((vm.account[6] === undefined || vm.account[6] != 0) && (value!=null && value.replace(/(^\s+)|(\s+$)/g, "") != '')) {
            return itemType['noEdit']
        }
        if (inputItem.indexOf(key) >= 0) {
            return itemType['input']
        }
        if (noEditItem.indexOf(key) >= 0) {
            return itemType['noEdit']
        }
        if (dateItem.indexOf(key) >= 0) {
            return itemType['date']
        }
        if (selectItem.indexOf(key) >= 0) {
            return itemType['select']
        }
        if (fileItem.indexOf(key) >= 0) {
            return itemType['file']
        }
        if (switchItem.indexOf(key) >= 0) {
            return itemType['switch']
        }
    }
    function reviseValue(value, type, call) {

        switch (Number(type)) {
            case 3:
                if (value == undefined || value == "") {
                    return new Date();
                }
                return new Date(value.replace(/-/g, "/"));
                break;
            case 6:
                return Number(value) == 1 ? true : false;
                break;
            case 5:
                if (value == undefined || value == "") {
                    return [];
                }
                let arr = value.split('|');
                let fileList = [];

                arr.forEach((v) => {
                    if (v != "") {
                        let file = {}
                        let sub = v.substring(v.indexOf('_') + 1);
                        file.name = sub;
                        file.url = v;
                        fileList.push(file);
                    }
                })
                return fileList;
                break;
            default:
                return value;
                break;
        }
    }
</script>
