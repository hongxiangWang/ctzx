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
      <el-col :span="2 ">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import '../../style/manageHome.less'
  import '../../style/manage-top-meun.less'
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
        let _this = this;
        this.$ajax.interceptors.request.use(function (config) {
            //在请求发出之前进行一些操作
            let token = _this.$localStore.get('token');
            if (token) {
                config.headers.token = token;
            }
            return config;
        }, function (err) {
            //Do something with request error
            return Promise.reject(err);
        });

        this.$ajax.interceptors.response.use(function (res) {
            //在这里对返回的数据进行处理
            if (Number(res.data.errno) == 1000) {
                _this.$router.replace('/')
                return;
            }
            return res;
        }, function (err) {
            //Do something with response error
            return Promise.reject(err);
        })
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

</style>
