<template>
    <div id='home'>
        <div id="top">
            <topMeun></topMeun>
        </div>
        <el-row type="flex"  justify="center" style="height: 100%">
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
        created() {
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
        mounted(){
            //获取地州列表
            this.$ajax.post('area/arealist', '').then(response => {

                if (response.data.errno != 0) {
                    return;
                }
                this.$localStore.set("areaArr", response.data.data);
            }).catch(error => {
                console.log(error)
            })
        }

    }
</script>

<style lang="less">
    html,body{
        height: 100%;
    }
    #home {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    .left-meun {
        height: 100%;
        flex-direction:column;
        background-color: #003366;
        min-width: 120px;
        box-shadow: 5px 0px 20px rgba(0,0,0,.2);
    }
</style>
