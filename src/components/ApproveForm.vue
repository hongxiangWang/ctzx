<template>
    <div id="approveCascader">
        <el-form form="form">
            <el-form-item label="选择审批人"  v-if = 'isShsowCascader'>
                <el-cascader
                        ref="cascader"
                        :options="chooseUserOptions"
                        v-model="selectedOptions"
                        expand-trigger="hover"
                        :props="props"
                        :changeOnSelect="changeOnSelect"
                        filterable
                        clearable
                        @change="cascaderChange"
                ></el-cascader>
            </el-form-item>
            <div v-if="label"><label >您选择审批人是：</label>{{label}}<br></div>
            <el-form-item label="填写建议">
                <el-input type="textarea" v-model="approveform.suggest"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chooseUserOptions:[],
                selectedOptions:[],
                props:{
                    value:'dept_id',
                    label:'dept_name'
                },
                label:''
            }
        },
        props:{
            params:{},
            changeOnSelect:{
                type:Boolean,
                default:false
            },
            approveform:{},
            isShsowCascader:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            cascaderChange(call){
                this.$nextTick(_=>{
                    let $ = this.$jquery;
                    let label = $('#approveCascader .el-cascader__label').text().replaceAll(/\s+/g, "");
                    this.label = label;
                    this.$emit('approveCascaderChange',call,label)
                })


            }
        },
        mounted(){
           if(this.params!=undefined) {
               console.log('params----',this.params)
               this.$ajax.post('people/getdeptlistinfo',this.params).then(res=>{
                    console.log('res-----',res.data.data.data);
                    if(res.data.errno==0){
                        this.chooseUserOptions=res.data.data.data;
                    }

               }).catch(err=>{
                   console.log('err-----',err);
               })
           }
        }
    }
</script>