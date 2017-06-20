<template>
    <div id="search">
        <div id='searchInput' @keyup.enter="searchResult">
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
                                <el-option label="发起时间" value="2"></el-option>
                                <el-option label="发起人" value="3"></el-option>
                                <el-option label="客户名称" value="4"></el-option>
                                <el-option label="流水号" value="5"></el-option>
                            </el-select>
                        </div>
                        <el-button slot="append" icon="search" @click="searchResult"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button v-if="account[4]==0" type="primary" :disabled="excelDisable" @click="exportEXCEL">
                        导出EXCEL
                    </el-button>
                </el-col>
            </el-row>

        </div>

        <h5 style="margin: 0.5rem 0;padding: 0" v-show="searchTime!=null">搜索结果：共计<span style="color: red;">&nbsp;{{tableData3.length}}&nbsp;</span>条&nbsp;&nbsp;&nbsp;&nbsp;
            搜索结果时间：{{searchTime}}</h5>

        <el-table
                :data="tableData3"
                max-height="500"
                v-loading="tableLoading"
                element-loading-text="拼命加载中"
                border
                @row-click="rowClick"
                style="width: 100%">
            <el-table-column
                    class-name="tableIndex"
                    type="index"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="serial_number"
                    label="流水号"
                    width="190">
            </el-table-column>
            <el-table-column
                    prop="client_name"
                    label="客户名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="create_people_dept"
                    label="申请部门"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="make_date"
                    label="拟稿时间">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="本地网">
            </el-table-column>
        </el-table>

        <infoDialog
                :info="infoData"
                :dialogTableVisible="dialogTableVisible"
                @close="closeDialog"
                :title="infoTitle"
                :businessType="selectBusinessType"></infoDialog>
    </div>
</template>


<script>
    import  '../../style/search.less'
    import infoDialog from './infoDialog.vue'
    import {infoCon, sonCon, sonCon400} from './searchCon.js'
    export default {
        data(){
            return {
                account: {},
                ajaxdata: {},
                searchCon: '',
                selectBusinessType: '',
                selectConType: '',
                infoData: [],
                infoTitle: '',
                dialogTableVisible: false,
                tableData3: [],
                excelDisable: true,
                searchTime: null,
                tableLoading:false
            }
        },
        methods: {
            exportEXCEL(){
                let params = {
                    business_type: this.selectBusinessType,
                    search_type: this.selectConType,
                    search_content: this.searchCon
                }
                this.$ajax.post('/business/businessexportexcel', params).then(response => {
                    console.log(response.data);
                    let u = response.data.data.url.replace('/app/project/telecom/www', '');
                    let token = this.$localStore.get('token');
                    //window.open("http://135.224.181.52/telecom/admin/file/fileread?url="+ u+"&token="+token)

                    downloadFile(encodeURI(require('../../value/string.js').fileread + u + "&token=" + token));
                }).catch(error => {
                    console.log(error.message)
                })
            },
            rowClick(row, event, column){
                this.infoData = row;
                this.dialogTableVisible = true;
                this.infoTitle = row.client_name;
            },
            closeDialog(){
                this.dialogTableVisible = false;
            },
            selectConTypeChange(call){
                console.log(call)
                if (call == 2) {
                    this.$message({message: '请按照年-月格式，如2017-05-01', type: 'warning'})
                }
            },
            searchResult(){
                let params = {
                    business_type: this.selectBusinessType,
                    search_type: this.selectConType,
                    search_content: this.searchCon
                }
                if (this.selectBusinessType == '') {
                    this.$message({message: '请选择语音类型', type: 'error'});
                    return;
                }
                if (this.selectConType == '') {
                    this.$message({message: '请选择语音搜索类型', type: 'error'});
                    return;
                }
                if (this.searchCon == '') {
                    this.$message({message: '请选择搜索内容', type: 'error'});
                    return;
                }
                let date = new Date();
                let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "    " + dealNumber(date.getHours()) + ":" + dealNumber(date.getMinutes())
                this.tableLoading = true;
                this.$ajax.post('business/searchbusinessbyall', params).then(response => {
                    console.log('55555---', response.data)
                    this.tableLoading = false;
                    this.tableData3 = response.data.data.data;
                    this.searchTime = time;
                    if (response.data.data.data.length > 0) {
                        this.excelDisable = false;
                    } else {
                        this.excelDisable = true;
                    }
                }).catch((error) => {
                    this.tableLoading = false;
                    this.searchTime = time;
                    console.log('error---', error)
                })
            }

        },
        computed: {},
        mounted(){
            this.account = require('store').get('account');
        },
        components: {
            infoDialog
        }

    }

    function downloadFile(url) {
        try {
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        } catch (e) {

        }
    }

    function dealNumber(n) {
        if(Number(n)<10){
            return '0'+n;
        }
        return n;

    }


</script>

<style lang="less">

</style>
