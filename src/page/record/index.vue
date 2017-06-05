<template>
  <div id="record-contect">
    <div id="step">
      <steps></steps>
    </div>
    <hr>
    <div>
      <router-view ref="recordCon"></router-view>
    </div>
    <hr>
    <div id="next-button">
      <el-button type="primary" v-show='preButtonShow' @click="preButton" class="pre_button">上一步</el-button>
      <el-button type="primary" v-show='nextButtonShow' @click="nextButton">下一步</el-button>
      <el-button type="primary" v-show='submitButton' @click="submit">提交</el-button>
    </div>

  </div>
</template>


<script>
  import steps from './steps.vue';
  import chooseType from './chooseType.vue';
  import  uploadFile from './uploadFile.vue';
  import  fillTable from './filltable.vue';
  let fillTableData = {};
  let uploadData ={};
  let ajaxData = {};
  export default {

    data() {
      return {}
    },
    components: {
      steps, chooseType, uploadFile,fillTable
    },
    mounted(){
      this.$router.replace('/home/record/chooseType')
    },
    methods: {
      optionClick(callback){
        //alert(callback);
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      nextButton(){
        let step = this.$store.state.recored_step;
        switch (step) {
          case 1:
            if (this.$store.state.recordTable.business_type > -1 && this.$store.state.recordTable.business_type != '') {
              this.$store.commit('ADD_RECORD_STEP');
              this.$router.replace('/home/record/filltable');
              window.scrollTo(0,0);
            } else {
              this.$message({message: '请先选择类型', type: 'warning'})
            }
            break;
          case 2:
//            this.$store.commit('ADD_RECORD_STEP');
//            this.$router.replace('/home/record/uploadFile');
//            fillTableData = this.$refs.recordCon.ruleForm;
//            this.$store.commit('RECORD_FILLTABLE',fillTableData);
//                break;
//            return;
            console.log('表单提交数据---',this.$refs.recordCon);//表单提交数据
            this.$refs.recordCon.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                fillTableData = this.$refs.recordCon.ruleForm;
                this.$store.commit('ADD_RECORD_STEP');
                this.$store.commit('RECORD_FILLTABLE',fillTableData);
                this.$router.replace('/home/record/uploadFile');
                window.scrollTo(0,50);
              } else {
               // console.log( this.$children[3].$refs['ruleForm'])
                this.$message({message:'表单未填写完整，请检查',type:'warning'})
              }
            });
            break;

        }

        //this.$router.replace('/home/record/filltable')
      },
      preButton(){
        this.$store.commit('SUB_RECORD_STEP');
        let step = this.$store.state.recored_step;
        switch (step) {
          case 1:
            this.$router.replace('/home/record/chooseType');
            break;
          case 2:
            this.$router.replace('/home/record/filltable');
            break;
        }
      },
      submit(){
        uploadData = this.$refs.recordCon.uploadForm;
        this.$refs.recordCon.$refs['uploadForm'].validate((valid) => {
          if (valid) {
            ajaxData = Object.assign(fillTableData,uploadData);
            dealBeloo(ajaxData);
            console.log('businesstype----',this.$store.state.business_type)
            let params = {
              businesstype:this.$store.state.recordTable.business_type,
              businessdata:ajaxData
            }
            console.log('params-----',JSON.stringify(params));

            this.$ajax.post('/business/addbusiness',params).then(response=>{
              console.log(response.data)
                if(Number(response.data.data.flg)==0){
                    this.$message({message:'添加成功，3秒后跳转',type:'success'});
                    setTimeout(()=>{
                      this.$router.replace('/home');
                    },3000)
                }else {
                    this.$message({message:'添加失败',type:'error'})
                }
            }).catch(error=>{
                console.log(error)
            })

          } else {
            // console.log( this.$children[3].$refs['ruleForm'])
            console.log('error submit!!');
          }
        });
      }

    },
    computed: {
      preButtonShow(){
        return this.$store.state.recored_step <= 1 ? false : true;
      },
      nextButtonShow(){
        return this.$store.state.recored_step >= 3 ? false : true;
      },
      submitButton(){
        return this.$store.state.recored_step == 3 ? true : false;


      }

    }
  }
  import '../../style/step.css'
  import '../../style/record.less'

  function dealTelNum(json) {
    let newtel='';
    if(json.tel_number instanceof Array){
      json.tel_number.forEach( (value,index,self)=> {

        if(value.value!=undefined) {
          newtel = newtel + value.value + ',';
        }

      })

    }
    return newtel;


  }
  function dealBeloo(json) {
    json.touchuan = json.touchuan?'是':'否';
    json.zhuanjie = json.zhuanjie?'是':'否';
  }
</script>
