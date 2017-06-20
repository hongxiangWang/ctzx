<template>
  <div id="cell">
    <el-row :gutter="0">
      <el-col :span="8" class="title">{{title}}</el-col>
      <el-col :span="16" class="value" v-show="isText">{{dataValue}}</el-col>
      <el-col :span="16" class="value" v-show="isFile">
        <el-button v-for="item,index in realName" type="text" @click="fileCilck(index)">
          {{item}}
        </el-button>
        <el-dialog v-model="dialogVisible" size="tiny"  :modal="false" :modal-append-to-body="false">
          <img width="100%" :src="dialogImageUrl" alt="">
          <span slot="title">{{fileName}}</span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        realName:[],
        realUrl:[],
        dialogImageUrl:'',
        dialogVisible:false,
        fileName:'',
      }
    },
    props: {
      id: Number,
      title: String,
      dataJson: {},
      value: String
    },
    computed: {
      dataValue(){
        let s = this.value;
        return isFile(this.dataJson[s],this);
      },
      isFile(){
        let s = this.dataJson[this.value];
        return s != null && s.indexOf("/static/upload/") > 0 ? true : false;

      },
      isText(){
        let s = this.dataJson[this.value];
        return s != null && s.indexOf("/static/upload/") > 0 ? false : true;
      }
    },
    methods:{
      fileCilck(index){
        let u = this.realUrl[index];
        let token = localStorage.getItem('token');
        this.dialogImageUrl = require('../../value/string.js').fileread+ u+"&token="+token;
        console.log('-----',this.dialogImageUrl);
        this.fileName = this.realName[index];
        this.dialogVisible = true;

      }
    }
  }

  function isFile(s,_this) {
      console.log('-----ttttt',this.dialogImageUrl);
    if (s != null && s.indexOf("/static/upload/") > 0) {
      let arr = s.split('|');
      arr.forEach((value) => {
          if(_this.$jquery.trim(value)!=""){
            let sub = value.substring(value.indexOf('_') + 1);
            _this.realName.push(sub);
            _this.realUrl.push(value.replace('undefined',''));
          }
      })
    } else {
      return s;
    }
  }
</script>
<style lang="less">

</style>
