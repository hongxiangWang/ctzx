<template>
  <div id="formItem">
    <table>

      <thead>
      <th width="14%">电路业务号码</th>
      <th width="14%">电路业务名称</th>
      <th width="14%">中继号码/计费号码</th>
      <th width="14%">线路类型</th>
      <th width="14%">中继接入号码</th>

      <th width="14%">允许传送的主叫号码</th>
      <th width="16%">接入位置</th>
      </thead>

      <tr>
        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.circuit_bussines_number'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.circuit_bussines_number" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.circuit_bussines_name'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.circuit_bussines_name" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.circuit_bussines_name'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.tel_number" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.xianlu_type'" :rules="rules.tableNeedSelectRule">
            <el-select v-model="sonfrom.xianlu_type" placeholder="请选择用途">
              <el-option label="N7" value="N7"></el-option>
              <el-option label="RPA" value="RPA"></el-option>
              <el-option label="R2" value="R2"></el-option>
            </el-select>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.allow_cellnumber'">
            <el-input v-model="sonfrom.allow_cellnumber" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.relay_access_number'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.relay_access_number" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.jieruweizhi'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.jieruweizhi" placeholder="必填"></el-input>
          </el-form-item>
        </td>

      </tr>


      <thead>
      <th width="14%">对端接入设备类型</th>
      <th width="14%">是否透传</th>
      <th width="14%">是否转接</th>
      <th width="14%">中继呼叫权限</th>
      <th width="14%">业务状态</th>
      <th width="14%">智能网系统业务状态</th>
      <th width="16%">操作</th>
      </thead>

      <tr>
        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.shebei_type'" :rules=rules.tableNotEmptyRule>
            <el-input v-model="sonfrom.shebei_type" placeholder="必填"></el-input>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px">
            <el-switch
              v-model="sonfrom.touchuan"
              on-text="是"
              off-text="否">
            </el-switch>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px">
            <el-switch
              v-model="sonfrom.zhuanjie"
              on-text="是"
              off-text="否">
            </el-switch>
          </el-form-item>
        </td>

        <td width="14%">
          <el-form-item label-width="0px" :prop="'son.' + id + '.relay_call_permiss'" :rules=rules.tableNeedSelectRule>
            <el-select v-model="sonfrom.relay_call_permiss" placeholder="请选择">
              <el-option label="呼入呼出双向" value="呼入呼出双向"></el-option>
              <el-option label="仅呼入" value="仅呼入"></el-option>
            </el-select>
          </el-form-item>
        </td>

        <td width="14%">
          <el-select v-model="sonfrom.business_status" placeholder="请选择类型">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="违规关停" value="违规关停"></el-option>
            <el-option label="暂停使用" value="暂停使用"></el-option>
            <el-option label="正常注销" value="正常注销"></el-option>
          </el-select>
        </td>

        <td width="14%">
          <el-select v-model="sonfrom.network_system_business_status" placeholder="请选择类型">
            <el-option label="激活" value="激活"></el-option>
            <el-option label="加载" value="加载"></el-option>
            <el-option label="去激活" value="去激活"></el-option>
            <el-option label="卸载" value="卸载"></el-option>
            <el-option label="删除" value="删除"></el-option>
          </el-select>
        </td>

        <td width="14%">
          <el-button type="primary" @click="sonClick">添加</el-button>

          <el-button type="warning" @click="delClick" v-show="isFirst">删除</el-button>
        </td>

      </tr>

    </table>
  </div>

</template>


<script>
  export default {
    data(){
      return {}
    },
    props: {
      sonfrom: {},
      id: Number,
      rules: {},
      ruleForm: {}
    },
    computed: {
      isFirst(){
        return this.id == 0 ? false : true;
      }
    },
    methods: {
      sonClick(){
        this.$emit('sonClick')
      },
      selectItem(){

      },
      delClick(){
        this.$emit('delClick', this.id)
      }
    },
    mounted(){
      this.$nextTick(() => {

      })
    }

  }
</script>

<style lang="less">


</style>
