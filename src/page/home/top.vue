<template>
  <div class="top-meun">
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <p id="top-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ctlogo"></use>
            </svg>
            新疆电信特殊号码备案管理平台
            <small>v1.0 OBT</small>
          </p>
        </div>
      </el-col>

      <el-col :span="8" :push="0">
        <div class="grid-content bg-purple">
          <p id="accout">{{name}}，下午好 &nbsp;&nbsp;&nbsp;&nbsp;<u id="exit">[注销]</u></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
      computed:{
          name(){
              return this.account = require('../../helper/helper').account.name;
          }
      }
  }
  import '../../font/iconfont.js'
</script>
<style lang="less">

  .top-meun {
    background-color: #003366;

  p#top-title {
    color: #A6BACE;
    margin-left: 20px;
    font-size: 1.4rem;
    line-height: 1.4rem;
  }

  #accout {
    color: white;
    line-height: 2.8rem;
    text-align: right;
  }

  }
</style>
