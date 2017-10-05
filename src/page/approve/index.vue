<template>
    <div ref="approve" id="approve">
        <div class="spilct">
            <el-button type="primary"
                       :class="{active:item.isCilck}"
                       v-for="(item,index) in btnArr"
                       :key="item"
                       @click="btnClick(index)">{{item.title}}
            </el-button>
            <span v-show="account.role_code == '4444'" style="color:orangered;margin-left: 30px">
                结果为所有本地网
            </span>
        </div>
        <div id='searchInput' @keyup.enter="searchResult" v-if="searchInputShow">
            <el-row>
                <el-col :span="20">
                    <el-input placeholder="请输入内容" v-model="searchCon">
                        <div slot="prepend">
                            <el-select v-model="selectBusinessType" placeholder="请选择">
                                <el-option label="语音中继" value="1"></el-option>
                                <el-option label="400号码" value="2"></el-option>
                                <el-option label="呼叫中心" value="3"></el-option>
                            </el-select>
                            <el-select v-model="selectConType" placeholder="请选择" id="second"
                                       @change="selectConTypeChange">
                                <el-option label="本地网" value="1"></el-option>
                                <el-option label="发起人" value="2"></el-option>
                                <el-option label="客户名称" value="3"></el-option>
                                <el-option label="流水号" value="4"></el-option>
                            </el-select>
                        </div>
                        <el-button slot="append" icon="search" @click="searchResult"></el-button>
                    </el-input>
                </el-col>
            </el-row>

        </div>
        <!--<router-view ref="approve"></router-view>-->
        <h5 style="margin: 0.5rem 0;padding: 0">搜索结果：共计<span style="color: red;">&nbsp;{{tableData.length}}&nbsp;</span>条&nbsp;&nbsp;&nbsp;&nbsp;
        </h5>
        <table-data
                :tableData="tableData"
                :tableLoading="tableLoading"
                :spilctIndex="spilctIndex"></table-data>
    </div>

</template>


<script>
    import '../../style/approve.less'
    import steps from './steps.vue'
    import tableData from './tableData.vue'

    export default {
        data() {
            return {
                btnArr: [
                    {title: '待发起', isCilck: true, id: 1},
                    {title: '待审批', isCilck: false, id: 2},
                    {title: '发起中', isCilck: false, id: 3},
                    {title: '归档', isCilck: false, id: 4},
                ],
                clickType: 1,
                tableData: [],
                spilctIndex: 0,
                account: {},
                tableLoading: false,
                searchCon: '',
                selectConType: '',
                selectBusinessType: ''

            }
        },
        methods: {
            btnClick(i) {
                this.btnArr.forEach((value, index) => {
                    if (i == index) {
                        value.isCilck = true;
                        this.tableData = [];
                        let select_title = value.id;
                        this.spilctIndex = value.id;
                        getAjaxClickData(this, select_title);

                    } else {
                        value.isCilck = false;
                    }
                })
            },
            searchResult() {
                if (this.selectConType == '' || this.searchCon == '' || this.selectBusinessType == '') {
                    this.$message({message:'请将查询条件填写完整'});
                    return;
                }
                getAjaxClickData(this, this.spilctIndex)
            }
        },
        computed:{
            searchInputShow(){
                return true;
            }
        },
        components: {
            steps, tableData
        },
        mounted() {
            let account = require('store').get('account');
            let title_arr = [];
            switch (account.role_code) {
                case '3333'://分公司业务员
                    title_arr = [
                        {title: '待发起', isCilck: true, id: 1},
                        {title: '发起中', isCilck: false, id: 3},
                        {title: '归档', isCilck: false, id: 4},
                    ];
                    this.btnArr = title_arr;
                    getAjaxClickData(this, 1);
                    this.spilctIndex = 1;
                    break;
                case '4444'://超级管理员
                    title_arr = [
                        {title: '待发起', isCilck: true, id: 1},
                        {title: '待审批', isCilck: false, id: 2},
                        {title: '发起中', isCilck: false, id: 3},
                        {title: '归档', isCilck: false, id: 4},
                    ];
                    this.btnArr = title_arr;
                    getAjaxClickData(this, 1);
                    this.spilctIndex = 1;
                    break;
                default:
                    title_arr = [
                        {title: '待审批', isCilck: true, id: 2},
                    ]
                    this.btnArr = title_arr;
                    getAjaxClickData(this, 2);
                    this.spilctIndex = 2;
                    break;
            }

        }
    }


    function changeTableDataBusinessType(arr, type) {
        arr.forEach(item => {
            item.business_type = type;
        })
    }

    function getAjaxData(vm, process, type) {
        let params = {
            select_title: process,
            business_type: type,
            search_type: vm.selectConType,
            search_content: vm.searchCon
        }
        let account = require('store').get('account');
        vm.account = account;
        let url = '/process/getsomeprocessinfobyrolecode/';
        if (account.role_code == '4444') {
            url = '/process/getprocessinfo';
        }
        console.log('params----', params, url);
        vm.$ajax.post(url, params).then(res => {
            changeTableDataBusinessType(res.data.data.data, type);
            let arr = res.data.data.data;
            if (arr.length > 0) {
                arr.forEach(item => {
                    setBusinessTypeName(item.business_type, item)
                    vm.tableData.push(item);
                })
            }
            vm.tableLoading = false;
        }).catch(err => {
            console.log(err);
            vm.$message({message: '有些数据获取失败了' + err.message, type: 'warning'})
             vm.tableLoading = false;
        })
    }

    //
    function getAjaxClickData(vm, select_title) {
        vm.tableData = [];
        vm.tableLoading = true;
        if (vm.selectBusinessType != '') {
            getAjaxData(vm, select_title, vm.selectBusinessType);
            return;
        }
        //获取语音中继,流程状态为1的
        getAjaxData(vm, select_title, 1);
        //获取400
        getAjaxData(vm, select_title, 2);
        //获取呼叫中心
        getAjaxData(vm, select_title, 3);
    }

    function setBusinessTypeName(n, item) {
        switch (Number(n)) {
            case 1:
                item.business_type_name = '语音中继'
                break;
            case 2:
                item.business_type_name = '400号码'
                break;
            case 3:
                item.business_type_name = '呼叫中心'
                break;
        }
    }
</script>

