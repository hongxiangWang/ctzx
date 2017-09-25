<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    label="日期"
                    width="120">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 0px">{{ scope.row.make_date.substr(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="client_name"
                    label="客户名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    v-if="require('store').get('account').role_code == '4444'"
                    prop="city"
                    label="地区"
                    width="180">
            </el-table-column>
            <el-table-column
                    v-if="require('store').get('account').role_code == '4444'"
                    prop="business_type_name"
                    class-name="typeClass"
                    label="语音类型"
                    width="100">
            </el-table-column>
            <el-table-column
                    v-if="require('store').get('account').role_code == '4444'"
                    prop="process_status"
                    class-name="processClass"
                    label="节点"
                    width="80">
            </el-table-column>
            <el-table-column
                    v-if="require('store').get('account').role_code == '4444'"
                    prop="edit_people_card"
                    label="发起人账号"
                    width="180">
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right"
                             :min-width="320">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="flowOpen(scope.$index, scope.row)">查看流程
                    </el-button>
                    <el-button
                            size="small"
                            @click="handleInfo(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button
                            size="small"
                            type="info"
                            @click="handleSend(scope.$index, scope.row)">发起审批流程
                    </el-button>

                </template>
            </el-table-column>
        </el-table>


        <infoDialog
                :info="infoData"
                :dialogTableVisible="tableInfoDialog"
                :title="infoTitle"
                @close="closeDialog"
                :showEditBtn="true"
                :businessType="selectBusinessType"></infoDialog>

        <el-dialog
                id="approveTable"
                title="流程"
                :visible.sync="flowDialog"
                size="small"
                :before-close="flowClose">
            <steps
                    @stepClose="stepEditClose"
                    @stepPass="stepPass"
                    :stepData="stepDatas"></steps>
        </el-dialog>

        <el-dialog
                id="stepEdit"
                title="sure"
                :visible="stepEditDialog"
                size="tiny"
                :before-close="stepEditClose">
            <p>asdkljhasjdhsajk</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="stepEditDialog = false">取 消</el-button>
                <el-button type="primary" @click="stepEditDialog = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                id="chooseUser"
                title="sure"
                :visible="chooseUserDialog"
                size="tiny"
                :before-close="chooseUserClose">
            <el-form>
                <el-form-item label="选择审批人">
                    <el-cascader
                            :options="chooseUserOptions"
                            v-model="selectedOptions"
                            expand-trigger="hover"
                            :props="chooseUserProps"
                            @change="handleChange"
                    ></el-cascader>
                    <p>{{selectedOptions}}</p>
                </el-form-item>
                <el-form-item label="填写建议">
                    <el-input type="textarea" v-model="suggest"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chooseUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="chooseUserDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import steps from './steps.vue'
    import infoDialog from '../search/infoDialog.vue'
    import  '../../style/search.less'
    import {chooseUser,flowPointName} from './world.js'
    export default {
        data() {
            return {
                tableInfoDialog: false,
                infoData: [],
                infoTitle: '',
                selectBusinessType: '1',

                stepEditDialog: false,
                chooseUserDialog: false,
                chooseUserOptions: chooseUser,
                chooseUserProps: {
                    value: 'dept_id',
                    label: 'dept_name',
                    children: 'children'
                },
                selectedOptions: [],
                suggest: "",
                typeClass: true,

                process_status:'222',

                //Flow
                flowDialog: false,
                stepDatas:{}
            }
        },
        props: {
            tableData: Array
        },
        methods: {

            handleInfo(index, row) {
                this.tableInfoDialog = true;
                this.infoData = row;
                this.infoTitle = row.client_name;
                this.selectBusinessType = row.business_type.toString();
                console.log(index, row);
            },
            //Choose User
            handleSend(index, row){
                this.chooseUserDialog = true;
                let params = {
                    business_type:row.business_type,
                    process_status:row.process_status
                }
                this.$ajax.post('/people/getdeptlistinfo',params).then(res=>{
                   // console.log(res.data)
                    getChoooseUerList(this,res.data.data.data)
                }).catch(err=>{
                    console.log(err.message)
                })
            },


            chooseUserClose(){
                this.chooseUserDialog = false;
            },
            closeDialog(){
                this.tableInfoDialog = false;
            },
            handleChange(value){
                alert(value)
            },

            //Flow
            flowOpen(index, row) {
                let params = {
                    business_type:row.business_type,
                    process_code:'001',
                    business_serial_number:row.serial_number
                }
                this.$ajax.post('/process/processlogshow',params).then(res=>{
                    console.log(JSON.stringify(res.data.data.data));
                    if(JSON.stringify(res.data.data.data)=='{}'){
                        this.$message({message:'抱歉，没有流程信息',type:'warning'});
                        return;
                    }
                    let {process_code} = res.data.data.data[0];
                    let flowType = flowPointName[Number(process_code)-1];
                    let steps = [];
                    flowType.forEach(value=>{
                        let item = {};
                        item.title = value;
                        steps.push(item);
                    })
                    res.data.data.data.forEach((V,I,S)=>{
                        let {process_now_status,memo,process_code} = V;
                        this.stepDatas.active = Number(process_now_status);
                        if(I==(S.length-1)){
                            steps[ Number(process_now_status)-1].passBtn = true;
                            steps[ Number(process_now_status)-1].backBtn = true;
                        }
                        steps[ Number(process_now_status)-1].description = memo;
                    })
                    this.stepDatas.steps = steps;
                    this.flowDialog = true;
                }).catch(err=>{
                    console.log(err.message)
                })

            },
            flowClose(){
                this.flowDialog = false;
            },
            //Flow action
            stepEditClose(){
                this.stepEditDialog = false;
            },
            stepPass(){
                this.stepEditDialog = true;
            },

        },
        components: {
            steps, infoDialog
        },

        computed: {
            business(){
                return 'sss'
            }
        }
    }

    function getChoooseUerList(vm,arr) {

        arr.forEach(value=>{
            if(value.children.length!=0){
                if(value.children.children.length!=0){
                    console.log('------',arr)
                }
            }else{

            }
        })

    }


</script>

<style lang="less">
    .el-table td.typeClass .cell{
        text-align: center;
        color: orangered;
    }
    .el-table td.processClass .cell{
        text-align: center;
        color: mediumseagreen;    
    }


</style>

