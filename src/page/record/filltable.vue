<template>
  <div id="record_filltable">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px">

      <div v-if="showItem.show400">
        <el-row>
          <el-col :span="12">
            <el-form-item label="400号码" prop="tel_number" :rules="rules.notEmptyRule">
              <el-input v-model="ruleForm.tel_number" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="1" prop="is_telephone_numberi" :rules="rules.notEmptyRule">
            <el-form-item label="第一目的码是否电信号码" label-width="190px">
              <el-switch
                v-model="ruleForm.is_telephone_numberi"
                on-text="是"
                off-text="否">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="第一目的码" prop="first_purpose_code" :rules="rules.notEmptyRule">
              <el-input v-model="ruleForm.first_purpose_code" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="1">
            <el-form-item label="其余目的码" label-width="100px">
              <el-input v-model="ruleForm.other_purpose_code" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div width="100%" v-if="showItem.showTable">
        <item
          ref="allItem"
          v-for="(item,index) in ruleForm.son"
          :sonfrom=item
          @sonClick="clickS"
          :rules="rules"
          :id="index"
          :ruleForm="ruleForm"
          @delClick="clickdel">
        </item>
      </div>

      <el-row>
        <el-col :span="12">
          <el-form-item label="省">
            <el-input
              placeholder="新疆维吾尔自治区"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="地市" prop="city" label-width="100px" :rules="rules.needSelectRule">
            <el-select v-model="ruleForm.city" placeholder="请选择">
              <el-option
                v-for="item in cities"
                :label="item.area_name"
                :value="item.area_name">
                <span style="float: left">{{ item.area_name }}</span>
                <span style="float: right; color: #8492a6; font-size:10px">{{ item.area_code }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="client_name" :rules="rules.notEmptyRule">
            <el-autocomplete
              v-model="ruleForm.client_name"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="联系人姓名" label-width="100px">
            <el-input v-model="ruleForm.contact_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="公司注册地址">
            <el-input v-model="ruleForm.company_address" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="公司联系电话" label-width="100px">
            <el-input v-model="ruleForm.company_phone" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人姓名" prop="write_name" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.write_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :push="0">
          <el-form-item label="经办人身份证码" prop="write_card_num" label-width="135px" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.write_card_num" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="经办人联系电话" prop="write_tel" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.write_tel" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="使用用途" prop="where_use" label-width="100px" :rules="rules.needSelectRule">
            <el-select v-model="ruleForm.where_use" placeholder="请选择用途">
            <el-option label="自用" value="自用"></el-option>
            <el-option label="经营呼叫中心" value="经营呼叫中心"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发展人类型" prop="developer_type" :rules="rules.needSelectRule">
            <el-select v-model="ruleForm.developer_type" placeholder="请选择类型">
              <el-option label="直销" value="直销"></el-option>
              <el-option label="代理商" value="代理商"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="发展人名称" prop="developer_name" label-width="100px" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.developer_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row>
        <el-col :span="12">
          <el-form-item label="修改内容" prop="edit_content">
            <el-input v-model="ruleForm.edit_content" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="代理商名称" prop="agents" label-width="100px">
            <el-input v-model="ruleForm.agents" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="contract_number" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.contract_number" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="0">
          <el-form-item label="合同签署日期" prop="contract_maketime" label-width="135px" :rules="rules.notEmptyRule">
            <el-date-picker
              v-model="ruleForm.contract_maketime"
              type="date"
              :editable="false"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="CRM受理号" prop="crm_order_number" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.crm_order_number" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="证件有效期" prop="card_validity_time" label-width="100px" :rules="rules.notEmptyRule">
            <el-date-picker
                    v-model="ruleForm.card_validity_time"
                    type="date"
                    :editable="false"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="电信业务许可证名称" prop="customer_value_license_name" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.customer_value_license_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="电信业务许可证编码" prop="customer_value_license_code" label-width="150px" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.customer_value_license_code" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="客户经理姓名" prop="accounts_manager_name" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.accounts_manager_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="客户经理联系电话" prop="accounts_manager_mobile" label-width="150px" :rules="rules.notEmptyRule">
            <el-input v-model="ruleForm.accounts_manager_mobile" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="编辑人工号" prop="edit_people_card" :rules="rules.notEmptyRule" >
            <el-input v-model="ruleForm.edit_people_card" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1" :rules="rules.notEmptyRule">
          <el-form-item label="编辑时间" prop="edit_time" label-width="100px">
            <el-date-picker
                    v-model="ruleForm.edit_time"
                    type="date"
                    :editable="false"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="拟稿日期">
            <el-input v-model="ruleForm.make_date" placeholder="请输入日期" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="申请部门" label-width="100px">
            <el-input v-model="ruleForm.create_people_dept" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人姓名" label-width="190px">
            <el-input v-model="ruleForm.create_people_name" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="坐席数量" v-if="showItem.show_seats" label-width="100px">
            <el-input v-model="ruleForm.seats_num" placeholder="请输入内容" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>
<script>
  import {telNum, agencyIdCard, notEmpty, needSelect} from './inputRule.js';
  import {fillCon, isShowType1, isShowType2, isShowType3} from './fillTable.js';
  import item from './formItem.vue'
  import {city} from '../../assets/city.js';
  import  '../../style/filltable.less'
  export default {
    data() {
      return {
        ruleForm: fillCon,
        rules: {
          notEmptyRule: notEmpty,
          tableNotEmptyRule: null,
          needSelectRule: needSelect,
          tableNeedSelectRule: null,
          agencyIdCardRule: agencyIdCard,
        },
        cities: this.$localStore.get('areaArr'),
        showItem: [],
        son: [
          {tel: ''},
        ],
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.ruleForm.tel_number.indexOf(item)
        if (index !== 0) {
          this.ruleForm.tel_number.splice(index, 1)
        }
      },
      addDomain(index) {
        this.ruleForm.tel_number.push({
          value: '',
          key: Date.now()
        });
        this.$nextTick(function () {
          this.$refs.numNode[index + 1].$refs.input.focus();
          let preValue = this.ruleForm.tel_number[index].value;
          this.ruleForm.tel_number[index + 1].value = preValue.toString().substr(0, preValue.length - 3)
        })

      },
      querySearchAsync(queryString, callback){
        console.log(queryString)
        this.$ajax.post('/business/searchbusiness', {clientname: queryString}).then(response => {
          callback(getClientName(response.data.data.data));
        }).catch(error => {
          console.log(error)
        })
      },
      handleSelect(item) {
        this.ruleForm.contact_name = item.contact_name;
        this.ruleForm.company_address = item.company_address;
        this.ruleForm.company_phone = item.company_phone;
        this.$store.commit('RECORD_CLENTDATE', item)
      },
      clickS(){
        let s = {
          circuit_bussines_number: '',//*电路业务号码
          circuit_bussines_name: '',//*电路业务名称
          tel_number: '',//*中继号码/计费号码
          xianlu_type: '',//*线路类型
          allow_cellnumber: '',//*允许传送的主叫号码
          relay_access_number: '',//中继接入号码
          jieruweizhi: '',//*接入位置
          shebei_type: '',//*对端接入设备类型
          touchuan: false,//*是否透传
          zhuanjie: false,//*是否转接
          relay_call_permiss: '',//*中继呼叫权限
          business_status: '',//*业务状态
          network_system_business_status: '',//*智能网系统业务状态
        }
        this.ruleForm.son.push(s)
      },
      submit(){
        this.$refs.allItem.forEach(function (value, index, self) {
          console.log(value.form)
        })
      },
      clickdel(index){
        this.ruleForm.son.splice(index, 1)
      },
    },
    computed: {
      telNumDetBtn(){
        return true
      },
      telNumAddBtn(call){
        console.log('call', call)
        let n = this.ruleForm.tel_number.length;

      }
    },
    components: {
      item
    },
    mounted(){
//      this.$nextTick(function () {
//        this.$refs.numNode[0].$refs.input.focus();
//      })
      let type = this.$store.state.recordTable.business_type;
      if (type > 0) {
        switch (type) {
          case 1:
            this.showItem = isShowType1;
            this.ruleForm.tel_number = '';
            this.ruleForm.first_purpose_code = '';
            this.rules.tableNotEmptyRule = notEmpty;
            this.rules.tableNeedSelectRule = needSelect;
            break;
          case 2:
            this.showItem = isShowType2;
            this.rules.tableNotEmptyRule = null;
            this.rules.tableNeedSelectRule = null;
            break;
          case 3:
            this.showItem = isShowType3;
            this.ruleForm.tel_number = '';
            this.ruleForm.first_purpose_code = '';
            this.rules.tableNotEmptyRule = notEmpty;
            this.rules.tableNeedSelectRule = needSelect;
            break;
        }
      }
      let nowDate = new Date();
      this.ruleForm.make_date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() ;
    }
  }

  function getClientName(data) {
    data.forEach(function (value, index, self) {
      value.value = value.client_name;
    })
    return data;
  }
</script>
<style lang="less">


</style>
