<template>
  <div id="select-type">
    <label style="height: 40px; line-height: 40px">选择类型&nbsp;&nbsp;</label>
    <el-select v-model="value5" filterable placeholder="请选择" @change="optionClick" >
      <el-option
        v-for="item in options"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <!--<label>搜&nbsp;&nbsp;&nbsp;&nbsp;索&nbsp;&nbsp;&nbsp;&nbsp;</label>-->
    <!--<el-autocomplete-->
      <!--v-model="autocomplete"-->
      <!--:fetch-suggestions="querySearchAsync"-->
      <!--placeholder="请输入内容"-->
      <!--@select="handleSelect"-->
    <!--&gt;</el-autocomplete>-->
  </div>
</template>
<script>
  export default{
    data() {
      return {
        options: [{
          value: 1,
          label: '语音专线'
        }, {
          value: 2,
          label: '400号码'
        }, {
          value: 3,
          label: '呼叫中心'
        }],
        value5: [],
        autocomplete:''
      }
    },
    methods: {
      optionClick(callback){
        if( callback!=''){
            console.log(callback)
            this.$store.commit('RECORD_BUSINESS_TYPE',callback)
        }
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
      }
    }
  }
</script>
