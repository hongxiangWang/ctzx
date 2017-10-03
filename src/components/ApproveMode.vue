<template>
    <div>
        <approve-form
        :params="params"
        @approveCascaderChange = "approveCascaderChange">
        </approve-form>
    </div>
</template>
<script>
    import ApproveForm from './ApproveForm.vue';
    export default {
        data() {
            return {
                params:{
                    business_type:1,
                    process_status:2,
                    process_code:'001'
                },
                label:''
            }
        },
        methods:{
            approveCascaderChange(call,label){
                console.log(call)
                this.label = label
            }
        },
        components:{
            ApproveForm
        }
    }
</script>