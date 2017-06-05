<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           :unique-opened="true">
    <el-submenu index="1">
      <template slot="title">78787</template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-menu-item index="1-4">sjkjkj</el-menu-item>
    </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">导航二</template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-menu-item index="1-4">选项1</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">导航二</template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-menu-item index="1-4">选项1</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data(){
      return {}
    },
    methods: {
      addNewTodo: function () {
        this.todos.push(this.newTodoText)
        this.newTodoText = ''
      }
    }
  }


</script>

