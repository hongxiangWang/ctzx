<template>
  <el-menu default-active='activeIndex' class="el-menu-vertical-demo">
    <el-menu-item index="1" @click="meunFunSet">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meun-set"></use>
      </svg>&nbsp;&nbsp;菜单功能设置
    </el-menu-item>
    <el-menu-item index="2" @click="roleManage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-use-rmanage"></use>
      </svg>&nbsp;&nbsp;角色管理
    </el-menu-item>
    <el-menu-item index="3" @click="permissionSet">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-permission_set"></use>
      </svg>&nbsp;&nbsp;权限管理
    </el-menu-item>
    <el-menu-item index="4" @click="userSet">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-user_set"></use>
      </svg>&nbsp;&nbsp;用户管理
    </el-menu-item>
  </el-menu>
</template>

<script>

  import '../../style/tree.css'
  import '../../style/system.less'
  import '../../style/button.css'
  export default {
    data(){
      return {
        activeIndex: 1
      }
    },
    methods: {
      meunFunSet(){
        this.$router.replace('/mange_home/meunFunSet')
      },
      userSet(){
        this.$router.replace('/mange_home/userSet')
      },
      permissionSet(){
        this.$router.replace('/mange_home/permissionSet')
      },
      roleManage(){
        this.$router.replace('/mange_home/roleManage')
      }
    }
  }


</script>

