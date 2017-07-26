<template>
  <div class="manage-top">
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

      <el-col :span="8">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" id="meunTop">
          <el-button type="text" @click="$router.push('/home')" style="color:white;margin-top: 1rem">回到前台</el-button>
          <el-menu-item index="1" @click="systemMeun">系统管理</el-menu-item>
          <el-menu-item index="2"@click="processMeun">流程管理</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeIndex: '1'
      }
    }, methods: {
      systemMeun(){
          this.$store.commit('SHOW_STYSTEM_MEUN');
          this.$store.commit('HIDE_PROCESS_MEUN');
      },
      processMeun(){
        this.$store.commit('HIDE_STYSTEM_MEUN');
        this.$store.commit('SHOW_PROCESS_MEUN');
      }
    }
  }

</script>

<style lang="less">

</style>
