<template>
    <div>
        <el-row>
            <el-col :span="8">
                <label style="height: 40px; line-height: 40px">选择类型&nbsp;&nbsp;</label>
                <el-select v-model="types" filterable placeholder="请选择" @change="optionClick" >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-upload
                        ref="importExcelEl"
                        class="upload-demo"
                        :action="url"
                        :multiple="true"
                        :on-error="error"
                        accept=".xlsx"
                        :before-upload="beforeUpload"
                        :on-success="success">
                    <el-button  type="primary">  导入excel</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
                </el-upload>
            </el-col>
            <el-col :span="8">
                <el-button  type="primary" @click="submit">提交</el-button>
            </el-col>
        </el-row>


    </div>
</template>


<script>
    export default {
        data(){
            return {
                url: "http://10.60.59.37/telecom/admin/pic/picupload",
                type: 0,
                types:'',
                filepath:'',
                options: [{
                    value: 1,
                    label: '语音专线'
                }, {
                    value: 2,
                    label: '400号码'
                }, {
                    value: 3,
                    label: '呼叫中心'
                }],
            }
        },
        methods: {
            success(res){

            },
            error(err){
                console.log(err);
            },
            beforeUpload(file){
                console.log('8888-----', this.type);
                let ex = file.name.substring(file.name.indexOf('.')+1);
                console.log(this.$refs.importExcelEl);
                if(ex!='xlsx'){
                    this.$message({message:'文件格式错误，仅支持excel的.xlsx'})
                    return false;
                }
            },
            optionClick(callback){
                if( callback!=''){
                    console.log(callback)
                   this.type = callback
                }
            },
            submit(){
                if(this.type==0){
                    this.$message({message:'请先选择语音类型',type:'warning'});
                    return;
                }

            }
        }
    }
</script>