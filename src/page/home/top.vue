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
                    <p id="accout">{{name}}，您好 &nbsp;&nbsp;
                        <el-button
                                type="text"
                                @click="backstage"
                        v-if="account[7]==0">进入后台管理</el-button>
                        &nbsp;&nbsp;
                        <u id="exit" @click="exit">[注销]</u>

                    </p>
                </div>
            </el-col>
        </el-row>
        <el-dialog
                title="注销"
                :visible.sync="exitDialog"
                size="tiny">
            <span>确定要注销该用户吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="exitDialog = false">取 消</el-button>
            <el-button type="primary" @click="exitSure">确 定</el-button>
        </span>
        </el-dialog>
    </div>

</template>
<script>
    export default{
        data(){
            return {
                exitDialog: false,
                account:require('store').get('account')
            }
        },
        computed: {
            name(){
                return require('store').get('account').name;
            }
        },
        methods: {
            exit(){
                this.exitDialog = true;
            },
            exitSure(){
                this.exitDialog = false;
                this.$localStore.remove('token');
                this.$router.replace('/')
            },
            backstage(){
                this.$router.push('/mangeHome');
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
