<template>
    <div>
        <el-table
                :data="tableData"
                border
                max-height="530"
                v-loading.body="tableLoading"
                style="width: 100%; margin: 0 20px">
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
                            @click="info(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button
                            v-if="spilctIndex==1"
                            size="small"
                            type="info"
                            @click="sendFlow(scope.$index, scope.row)">发起审批流程
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
        <!--流程详情-->
        <el-dialog
                id="approveTable"
                title="业务流程审批详情"
                :visible.sync="flowDialog"
                size="small"
                :before-close="flowClose">
            <steps
                    @stepClose="stepEditClose"
                    @stepPass="stepPass"
                    @stepBack="stepBack"
                    :stepData="stepDatas"
                    :rowData="rowDatas">
            </steps>
        </el-dialog>
        <!--点击同意或是退回弹出的界面-->
        <el-dialog
                id="stepEdit"
                title="业务流程流程审批"
                :visible="stepEditDialog"
                size="tiny"
                :before-close="stepEditClose">

            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请填写意见"
                    v-model="suggest_textarea">
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="stepEditDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleAgree(1)">确 定</el-button>
            </span>
        </el-dialog>

        <!--发起流程-->
        <el-dialog
                id="chooseUser"
                title="流程审批"
                :visible="chooseUserDialog"
                :before-close="chooseUserClose">
            <approve-form
                    :isShsowCascader="isShsowCascader"
                    :params="cascderParmas"
                    :approveform="approveform"
                    @approveCascaderChange="approveCascaderChange">

            </approve-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chooseUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureSendFlow">确 定</el-button>
            </span>
        </el-dialog>
        <!--流程退回-->
        <el-dialog title="退回" :visible.sync="approveBackDialog" :before-close="approveBackClose">
            <el-form>
                <el-form-item label="退回原因">
                    <el-input type="textarea" v-model="backSuggest" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="approveBackDialog = false">取 消</el-button>
                <el-button type="primary" @click="approveBackSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import steps from './steps.vue'
    import infoDialog from '../search/infoDialog.vue'
    import '../../style/search.less'
    import {chooseUser, flowPointName} from './world.js'
    import ApproveForm from '../../components/ApproveForm.vue'

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

                process_status: '222',
                suggest_textarea: '',
                //Flow
                flowDialog: false,
                stepDatas: {},
                select_row: {},
                select_people_id: '',
                rowDatas: {},
                handle_btn_value: '',
                cascderParmas: {},
                approveform: {
                    suggest: ''
                },
                isShsowCascader: true,
                accout: require('store').get('account'),
                approveBackDialog: false,
                backSuggest: '',
                backData: {},
            }
        },
        props: {
            tableData: Array,
            spilctIndex: Number,
            tableLoading:{
                type:Boolean,
                default:false
            }
        },
        methods: {

            info(index, row) {
                this.tableInfoDialog = true;
                this.infoData = row;
                this.infoTitle = row.client_name;
                this.selectBusinessType = row.business_type.toString();
                console.log(index, row);
            },
            //Choose User
            sendFlow(index, row) {
                this.select_row = row;
                this.select_row.index = index;
                this.cascderParmas = {
                    business_type: row.business_type,
                    process_status: row.process_status,
                    process_code: "001",
                    business_serial_number: row.serial_number,
                    business_type: row.business_type
                }
                this.chooseUserDialog = true;
            },

            //确定发送审批
            sureSendFlow() {
                if ((this.select_people_id == '' || this.select_people_id == undefined) && this.isShsowCascader) {
                    this.$message({message: '请选择审批人'});
                    return;
                }
                if (!this.isShsowCascader) {
                    this.select_people_id = this.accout.people_code;
                    if (this.approveform.suggest == '') {
                        this.$message({message: '请填写建议'});
                        return;
                    }
                }
                let params = {
                    people_id: this.select_people_id,
                    suggest: this.approveform.suggest,
                    business_serial_number: this.select_row.serial_number,
                    business_type: this.select_row.business_type,
                    process_now_status: this.select_row.process_status,
                    process_code: '001',

                }
                console.log('params---', params)

                this.$ajax.post('/process/makeprocesstransition', params).then(res => {
                    console.log('params---', res.data)
                    if (res.data.errno == 0) {
                        this.$message({message: '提交审批成功', type: 'success'});
                        if (this.flowDialog) {
                            this.flowDialog = false;
                        }
                        ;
                        this.tableData.splice(this.select_row.index, 1);
                    } else {
                        this.$message({message: '提交审批失败', type: 'error'})
                    }
                }).catch(err => {
                    this.$message({message: '提交审批失败', type: 'error'})
                })
                this.chooseUserDialog = false;
            },
            chooseUserClose() {
                console.log('chooseUserClose');
                this.chooseUserDialog = false;
            },
            closeDialog() {
                this.tableInfoDialog = false;
            },
            handleChange(value) {
                //console.log(value,'----->value');
                var select_result = value[value.length - 1];
                this.select_people_id = select_result;
            },

            //Flow，业务流程详情展示
            flowOpen(index, row) {
                let params = {
                    business_type: row.business_type,
                    process_code: '001',
                    business_serial_number: row.serial_number,
                }
                this.select_row = row;
                this.select_row.index = index;
                this.rowDatas = row;
                this.$ajax.post('/process/processlogshow', params).then(res => {
                    //清空内存里的数据
                    this.stepDatas = {};
                    let show_data = res.data.data.data;
                    let flowType = flowPointName[0];
                    let steps = [];
                    //console.log('presss---', res.data);
                    flowType.forEach((value, index) => {
                        let item = {};
                        item.title = value;
                        if (show_data.length > 0) {
                            show_data.forEach((v, i) => {
                                if (v.process_now_status - 2 == index && v.process_before_status == '') {
                                    item.memo = v.memo;
                                }
//                                if (v.process_now_status == 1 && index == 0) {
//                                    item.memo = v.memo;
//                                }

                                if (v.process_before_status != ''  && v.process_before_status - 1 == index) {
                                    item.memo = v.memo;
                                }
                                if (show_data[show_data.length - 1].process_now_status == index + 1 && this.spilctIndex == 2) {
                                    item.passBtn = true;
                                    item.backBtn = true;
                                }
                            });
                        } else {
                            this.stepDatas.active = 0;
                        }
                        steps.push(item);
                    });
                    if (show_data.length > 0) {
                        this.stepDatas.active = show_data[show_data.length - 1].process_now_status;
                    } else {
                        this.stepDatas.active = 0;
                    }


                    this.stepDatas.steps = steps;
                    this.flowDialog = true;
                }).catch(err => {
                    console.log(err.message)
                })

            },
            flowClose() {
                this.flowDialog = false;
            },
            stepEditClose() {
                this.stepEditDialog = false;
            },
            stepPass(row, steps) {
                this.chooseUserDialog = true;
                if (steps.active == 6) {
                    this.isShsowCascader = false;
                } else {
                    this.isShsowCascader = true;
                }
                this.cascderParmas = {
                    business_type: row.business_type,
                    process_status: row.process_status,
                    process_code: "001",
                    business_serial_number: row.serial_number,
                    business_type: row.business_type
                }
            },
            handleAgree() {//点击确定按钮
                let business_type = this.rowDatas['business_type'];
                let serial_number = this.rowDatas['serial_number'];
                let handle_btn_value = this.handle_btn_value;
                let handle_suggest = this.suggest_textarea;
                let params = {
                    business_type: business_type,
                    serial_number: serial_number,
                    handle_btn_value: handle_btn_value,
                    handle_suggest: handle_suggest

                }
                console.log(JSON.stringify(params), "----->param")
                this.$ajax.post('/process/handleprocesstrans', params).then(res => {
                    console.log(JSON.stringify(res), "----->res")

                }).catch(err => {
                    console.log(err.message)
                })
                this.tableInfoDialog = false;
            },
            approveCascaderChange(call) {
                this.select_people_id = call[call.length - 1];
            },
            stepBack(row, steps) {
                this.approveBackDialog = true;
                this.backData = {
                    process_code: '001',
                    business_serial_number: row.serial_number,
                    business_type: row.business_type,
                    process_now_status: steps.active,
                    people_account_next: row.edit_people_card
                }
            },
            approveBackClose() {
                this.approveBackDialog = false;
            },
            approveBackSure() {
                console.log('makeprocessback---params---', this.backData);
                this.backData.suggest = this.backSuggest;
                if (this.backSuggest == '') {
                    this.$message({message: '请填写退回原因'});
                    return;
                }
                this.$ajax.post('/process/makeprocessback', this.backData).then(res => {
                    if (res.data.errno == 0) {
                        this.$message({message: '已退回到发起人', type: 'success'});
                        this.approveBackDialog = false;
                        this.flowDialog = false;
                        this.tableData.splice(this.select_row.index, 1);
                    } else {
                        this.$message({message: '操作失败，请重试', type: 'error'});
                    }
                }).catch(err => {
                    console.log('makeprocessback----', err)
                    this.$message({message: '操作失败，请重试', type: 'error'});
                })
            }

        },
        components: {
            steps, infoDialog, ApproveForm
        },

        computed: {}
    }

    function getChoooseUerList(vm, arr) {
        //console.log('------111',JSON.stringify(arr))
        vm.chooseUserOptions = arr;

    }


</script>

<style lang="less">
    .el-table td.typeClass .cell {
        text-align: center;
        color: orangered;
    }

    .el-table td.processClass .cell {
        text-align: center;
        color: mediumseagreen;
    }


</style>

