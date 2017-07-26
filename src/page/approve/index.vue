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
                    {title: '待发起', isCilck: true},
                    {title: '待审批', isCilck: false},
                    {title: '发起中', isCilck: false},
                    {title: '归档', isCilck: false},
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
            getAjaxTableDate(this,1)
        }
    }
    function getAjaxTableDate(vm,chooseType) {
        vm.tableData = [];
        //获取语音中继
        getAjaxData(vm,chooseType,1);
        //获取400
        getAjaxData(vm,chooseType,2);
        //获取呼叫中心
        getAjaxData(vm,chooseType,3);
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

