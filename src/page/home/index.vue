<template>
    <div id='home'>
        <div id="top">
            <topMeun></topMeun>
        </div>
        <el-row>
            <el-col :span="3">
                <div class="left-meun">
                    <leftMeun></leftMeun>
                </div>
            </el-col>
            <el-col :span="21">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import leftMeun from './leftMeun.vue'
    import topMeun from './top.vue'
    export default {
        name: 'home',
        components: {
            leftMeun, topMeun
        },

        created(){
            this.$router.replace('/home/record')
        },
        mounted(){
            this.$ajax.interceptors.request.use(function (config) {
                //在请求发出之前进行一些操作
                let token = this.$localStore.get('token');
                if (token) {
                    config.headers.token =token;
                }
                return config;
            }, function (err) {
                //Do something with request error
                return Promise.reject(error);
            });

            this.$ajax.interceptors.response.use(function (res) {
                //在这里对返回的数据进行处理
                if (Number(res.data.errno) == 1000) {
                    this.$router.replace('/')
                    return;
                }
                return res;
            }, function (err) {
                //Do something with response error
                this.$message({message:'等待无应答',type:'warning'})
                return Promise.reject(error);
            })
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
