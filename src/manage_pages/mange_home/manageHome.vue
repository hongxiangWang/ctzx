<template>
  <div id='home'>
    <div id="top">
      <topMeun></topMeun>
    </div>
    <el-row>
      <el-col :span="3">
        <div class="left-meun">
          <leftMeunStystem v-show="stystem"></leftMeunStystem>
          <leftMeunProcess v-show="process"></leftMeunProcess>
        </div>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import leftMeunStystem from './manageLeftMeunSystem.vue'
  import leftMeunProcess from './manageLeftMeunProcess.vue'
  import topMeun from './manageTop.vue'
  export default {
    data(){
      return {}
    },
    name: 'home',
    components: {
      leftMeunStystem, topMeun, leftMeunProcess
    },
    created(){
      //this.$router.replace('/home/record')
    },
    computed: {
      stystem(){
        return this.$store.state.manage_system_meun;
      },
      process(){
        return this.$store.state.manage_process_meun;
      }
    }

  }
</script>

<style lang="less" scoped>
  #home {
    padding: 0;
    margin: 0;
  }

  .left-meun {
    min-height: 93vh;
    overflow: hidden;
    display: block;
    background-color: #003366;
    border-top: 1px solid #A6BACE;
    min-width: 120px;
  }
</style>
