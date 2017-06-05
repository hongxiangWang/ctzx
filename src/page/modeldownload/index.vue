<template>
  <div id="modelDownload">
    <el-row>
      <el-col :span="8" >
        <svg class="icon" aria-hidden="true" @click="anquanshu">
          <use xlink:href="#icon-word"></use>
        </svg>
        <p>信息安全承若书下载</p>
      </el-col>
      <!--<el-col :span="8">-->
        <!--<svg class="icon" aria-hidden="true">-->
          <!--<use xlink:href="#icon-word"></use>-->
        <!--</svg>-->
        <!--<p>信息安全承若书下载</p>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
        <!--<svg class="icon" aria-hidden="true">-->
          <!--<use xlink:href="#icon-word"></use>-->
        <!--</svg>-->
        <!--<p>信息安全承若书下载</p>-->
      <!--</el-col>-->
    </el-row>

  </div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    methods:{
      anquanshu(){
          let u ='/static/examplefile/safe_file.doc';
          let token =  localStorage.getItem('token');
          window.open("http://135.224.181.52/telecom/admin/file/fileread?url="+ u+"&token="+token)
      }
    }
  }

</script>

<style lang="less">
  #modelDownload{
    width: 80%;
    margin: 50px auto;
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .el-col svg{
    font-size: 8rem;
  }
  .el-col{
    text-align: center;
  }
  }
</style>
