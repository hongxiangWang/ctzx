<template>
    <div ref="approve" id="approve">
        <div class="spilct">
            <el-button type="primary"
                       :class="{active:item.isCilck}"
                       v-for="(item,index) in btnArr"
                       @click="btnClick(index)">{{item.title}}
            </el-button>
            <span v-show="account.role_code == '4444'" style="color:orangered;margin-left: 30px">
                结果为所有本地网
            </span>
        </div>
        <!--<router-view ref="approve"></router-view>-->
        <h5 style="margin: 0.5rem 0;padding: 0" >搜索结果：共计<span style="color: red;">&nbsp;{{tableData.length}}&nbsp;</span>条&nbsp;&nbsp;&nbsp;&nbsp;
            </h5>
        <table-data
        :tableData="tableData"></table-data>
    </div>

</template>


<script>
    import '../../style/approve.less'
    import steps from './steps.vue'
    import tableData from './tableData.vue'
    export default {
        data(){
            return {
                btnArr: [
                    {title: '待发起', isCilck: true,id:1},
                    {title: '待审批', isCilck: false,id:2},
                    {title: '发起中', isCilck: false,id:3},
                    {title: '归档', isCilck: false,id:4},
                ],
                clickType:1,
                tableData:[],
                account:{},

            }
        },
        methods: {
            btnClick(i){
                this.btnArr.forEach((value, index) => {

                    if (i == index) {
                        value.isCilck = true;
                        this.tableData = [];
                        let select_title=value.id;
                        getAjaxClickData(this,select_title);

                    } else {
                        value.isCilck = false;
                    }
                })

            }
        },
        components:{
            steps,tableData
        },
        mounted(){
            let account = require('store').get('account');
            let title_arr=[];
            switch(account.role_code){
                case '3333'://分公司业务员
                    title_arr=[
                        {title: '待发起', isCilck: true,id:1},
                        {title: '发起中', isCilck: false,id:3},
                        {title: '归档', isCilck: false,id:4},
                    ];
                    this.btnArr=title_arr;
                    getAjaxClickData(this,1);
                    break;
                case '4444'://超级管理员
                    title_arr=[
                        {title: '待发起', isCilck: true,id:1},
                        {title: '待审批', isCilck: false,id:2},
                        {title: '发起中', isCilck: false,id:3},
                        {title: '归档', isCilck: false,id:4},
                    ];
                    this.btnArr=title_arr;
                    getAjaxClickData(this,1);
                    break;
                default:
                    title_arr=[
                        {title: '待审批', isCilck: true,id:2},
                    ]
                    this.btnArr=title_arr;
                    getAjaxClickData(this,2);
                    break;
            }
            //getAjaxTableDate(this,1);//获取待发起的业务

        }
    }
    function getAjaxTableDate(vm,chooseProcessStatus) {
        vm.tableData = [];
        //获取语音中继,流程状态为1的
        getAjaxData(vm,chooseProcessStatus,1);
        //获取400
        getAjaxData(vm,chooseProcessStatus,2);
        //获取呼叫中心
        getAjaxData(vm,chooseProcessStatus,3);
    }
    function changeTableDataBusinessType(arr,type) {
        arr.forEach(item=>{
            item.business_type = type;
        })
    }

    function getAjaxData(vm,process,type) {
        let params = {
            process_status:process,
            business_type:type,
        }
        let account = require('store').get('account');
        vm.account = account;
        let url = '/process/getprocessinfobyrolecode/';
        if(account.role_code=='4444'){
            url = '/process/getprocessinfo';
        }
        vm.$ajax.post(url,params).then(res=>{
            changeTableDataBusinessType(res.data.data.data,type);
            let arr = res.data.data.data;
            if(arr.length>0){
                arr.forEach(item=>{
                    setBusinessTypeName(item.business_type,item)
                    vm.tableData.push(item);
                })
               // console.log(JSON.stringify(vm.tableData,"---->vm.tableData"))
            }
        }).catch(err=>{
            console.log(err);
             vm.$message({message:'有些数据获取失败了'+err.message,type:'warning'})
        })
    }

    //
    function getAjaxClickData(vm,select_title) {
        vm.tableData = [];
        //获取语音中继,流程状态为1的
        getClickData(vm,select_title,1);
        //获取400
        getClickData(vm,select_title,2);
        //获取呼叫中心
        getClickData(vm,select_title,3);
    }

    //点击标头，显示不同信息
    function getClickData(vm,select_title,type) {
        let params = {
            select_title:select_title,
            business_type:type,
        }
        let account = require('store').get('account');
        vm.account = account;
        let  url = '/process/getsomeprocessinfobyrolecode';

        vm.$ajax.post(url,params).then(res=>{
            changeTableDataBusinessType(res.data.data.data,type);
            let arr = res.data.data.data;
            if(arr.length>0){
                arr.forEach(item=>{
                    setBusinessTypeName(item.business_type,item)
                    vm.tableData.push(item);
                })
                // console.log(JSON.stringify(vm.tableData,"---->vm.tableData"))
            }
        }).catch(err=>{
            console.log(err);
            vm.$message({message:'有些数据获取失败了'+err.message,type:'warning'})
        })
    }

    function setBusinessTypeName(n,item) {
        switch(Number(n)){
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

