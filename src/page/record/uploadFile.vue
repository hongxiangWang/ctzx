<template ref="upLoad">
    <div id="recordUpload">

        <el-form :model="uploadForm" :rules="rules" ref="uploadForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="证件类型" prop="card_type" label-width="150px">
                        <el-select v-model="uploadForm.card_type" placeholder="请选择">
                            <el-option label="营业执照" value="营业执照"></el-option>
                            <el-option label="组织机构代码（税务登记证无效！）" value="组织机构代码"></el-option>
                            <el-option label="三证合一" value="三证合一"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :push="0">
                    <el-form-item label="证件号码" prop="card_num" label-width="100px">
                        <el-input v-model="uploadForm.card_num" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :push="0">
                    <el-form-item label="有效期" label-width="100px">
                        <el-date-picker
                                v-model="uploadForm.card_validity"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-form-item label="证件附件" prop="card_upfile" label-width="150px">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :on-preview="handlePreview"
                        :on-remove="cardUpfileRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="cardUpfileSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>


            <el-form-item label="呼叫中心资质" prop="call_center_card_upfile" label-width="150px"
                          v-show="isShowCallCenterCardUpfile">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :on-preview="handlePreview"
                        :on-remove="callCenterCardUpfileRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="callCenterCardUpfileSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="呼叫中心许可证号" prop="call_center_code" label-width="150px"
                                  v-show="isShowCallCenterCode">
                        <el-input v-model="uploadForm.call_center_code" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="16">
                    <el-form-item label="经办人身份证附件" prop="write_card_upfile" label-width="150px">
                        <el-upload
                                ref="upload"
                                action="http://135.224.181.52/telecom/admin/pic/picupload"
                                :on-preview="handlePreview"
                                :on-remove="writeCardUpfileRemove"
                                :on-error="error"
                                :multiple="true"
                                :on-success="writeCardUpfileSuccess"
                                list-type="picture-card">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证有效期" label-width="120px" prop="write_card_validity">
                        <el-date-picker
                                v-model="uploadForm.write_card_validity"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-form-item label="客户单位证明" prop="customer_prove" label-width="150px">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :on-preview="handlePreview"
                        :on-remove="customerProveRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="customerProveSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="电信业务许可证拍照上传" prop="customer_value_license_file" label-width="150px">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :on-preview="handlePreview"
                        :on-remove="licenseFileRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="licenseFileSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>


            <el-form-item label="信息安全承诺书" prop="information_safe_file" label-width="150px">
                <el-upload
                        ref="upload"
                        headers="header"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        :on-preview="handlePreview"
                        :on-remove="informationSafeFileRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="informationSafeFileSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>


            <el-form-item label="第一目的码与客户归属关系证明" prop="upload_files" label-width="150px" v-show="showUploadFiles">
                <el-upload
                        ref="upload"
                        action="http://135.224.181.52/telecom/admin/pic/picupload"
                        headers="header"
                        :on-preview="handlePreview"
                        :on-remove="uploadFilesRemove"
                        :on-error="error"
                        :multiple="true"
                        :on-success="uploadFilesSuccess"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>


        </el-form>


    </div>
</template>
<script>
    import {telNum, agencyIdCard} from './inputRule.js';
    let base = require('../../value/string')
    export default {
        data() {
            return {
                params: {},
                header:{
                    token:localStorage.getItem('token').replace(/(^\")|(\"$)/g, '')
                },
                uploadForm: {
                    card_type: "",//*证件类型
                    card_num: '',//*证件号码
                    card_upfile: [],//*上传附件
                    customer_prove: [],//客户单位证明
                    information_safe_file: [],//信息安全承诺书
                    call_center_card_upfile: [],//呼叫中心资质附件
                    call_center_code: '',//呼叫中心许可证编码
                    card_validity: "",//证件有效期
                    write_card_validity: "",//经办人身份证有效期
                    write_card_upfile: [],//经办人身份证
                    upload_files: [],//上传：第一目的码与客户归属关系证明
                    customer_value_license_file: [],//电信业务许可证拍照上传（客户申请资源经营电信业务时必填）
                },
                rules: {
                    card_type: [{required: true, message: '请选择', trigger: 'change'}],
                    card_num: telNum,
                    write_card_upfile: [{required: true, message: '请上传经办人身份证附件'}],
                    card_upfile: [{required: true, message: '请上传份证附件'}],
                    call_center_card_upfile: [],
                    customer_prove: [{required: true, message: '请上传客户单位证明'}],
                    information_safe_file: [{required: true, message: '请上传信息安全承诺书'}],
                    write_card_validity: [{required: true, message: '请选择有效期'}],
                    customer_value_license_file:[{required: true, message: '请上传电信业务许可证'}]
                },
                dialogVisible: false,
                dialogImageUrl: '',
                // fileList: [{name: 'food.jpeg', url: 'http://135.224.85.35:8360/static/upload/20174/2017-04-27-18-19-51_新闻.png'},]
                showUploadFiles: false,
            }
        },
        computed: {
            isShowCallCenterCardUpfile(){
                console.log(this.$store.state.recordTable.fillTable);
                return this.$store.state.recordTable.fillTable.where_use === "经营呼叫中心" ? true : false;
            },
            isShowCallCenterCode(){
                return this.$store.state.recordTable.fillTable.where_use === "经营呼叫中心" ? true : false;
            },


        },
        methods: {
            submitUpload()
            {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList)
            {
                console.log(file, fileList);
            },
            cardUpfileRemove(file, fileList){
                this.uploadForm.card_upfile = getRealArrayFile(fileList);
            },
            callCenterCardUpfileRemove(file, fileList){
                this.uploadForm.call_center_card_upfile = getRealArrayFile(fileList);
            },
            writeCardUpfileRemove(file, fileList){
                this.uploadForm.write_card_upfile = getRealArrayFile(fileList);
            },
            customerProveRemove(file, fileList){
                this.uploadForm.customer_prove = getRealArrayFile(fileList);
            },
            informationSafeFileRemove(file, fileList){
                this.uploadForm.information_safe_file = getRealArrayFile(fileList);
            },
            uploadFilesRemove(file, fileList){
                this.uploadForm.upload_files = getRealArrayFile(fileList);
            },
            licenseFileRemove(file, fileList){
                this.uploadForm.customer_value_license_file = getRealArrayFile(fileList);
            },

            handlePreview(file)
            {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            error(error)
            {
                console.log('error---', error);
            },
            callCenterCardUpfileSuccess(response){
                console.log('error---', response);
                this.uploadForm.call_center_card_upfile.push(response.data);

            },
            cardUpfileSuccess(response, fileList){
                this.uploadForm.card_upfile.push(response.data);

            },
            writeCardUpfileSuccess(response){
                this.uploadForm.write_card_upfile.push(response.data);
            },
            customerProveSuccess(response){
                this.uploadForm.customer_prove.push(response.data);
            },
            informationSafeFileSuccess(response){

                this.uploadForm.information_safe_file.push(response.data);
            },
            uploadFilesSuccess(response){

                this.uploadForm.upload_files.push(response.data);
            },
            licenseFileSuccess(response){
                this.uploadForm.customer_value_license_file.push(response.data)
            }
        },
        mounted(){

            console.log(this.uploadUrl)
            let clentData = this.$store.state.recordTable.clientData;
            if (clentData.value != undefined) {
                this.uploadForm.card_num = clentData.card_num;
                this.uploadForm.card_type = clentData.card_type;
            }
            let fillTable = this.$store.state.recordTable.fillTable;
            if (fillTable.where_use != undefined && fillTable.where_use == '经营呼叫中心') {
                this.rules.call_center_card_upfile = [{required: true, message: '请上传呼叫中心资质'}];
            }

            let type = this.$store.state.recordTable.business_type;
            if (type > 0) {
                switch (type) {
                    case 1:
                        this.showUploadFiles = false;
                        break;
                    case 2:
                        this.showUploadFiles = true;
                        break;
                    case 3:
                        this.showUploadFiles = false;
                        break;

                }
            }
        }
    }

    function getRealArrayFile(arr) {
        let a = [];
        arr.forEach(function (value, index, self) {
            a.push(value.response.data)
        });
        return a;
    }
</script>

<style lang="less">

</style>
