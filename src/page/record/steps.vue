<template>
  <div>
    <el-steps :space="200" :active="activeStep">
      <el-step title="选择类型" description="根据类选不同会有不同模板"></el-step>
      <el-step title="填写信息" description="按照需求填写必备的信息"></el-step>
      <el-step title="上传附件" description="上传相关的附件"></el-step>
    </el-steps>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      }
    },
    created() {

    },
    methods: {

    },
    computed: {
      activeStep(){
        return  this.$store.state.recored_step
      }
    }
  }

</script>
