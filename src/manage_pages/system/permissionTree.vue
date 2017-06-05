<template>

  <div id="permissionMeunTree">
    <el-tree sytle="boder:none" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          'label': 'remark',
          'id': 'ss'
        }
      };
    },
    methods: {
      handleNodeClick(data, node, nodeData) {
          //alert(JSON.stringify(data.role_code))
        this.$store.dispatch('getRoleFun',data.role_code);
        this.$store.commit('CHANGE_TREENODE_ROLECODE',data.role_code)
        this.$store.commit('CHANGE_PERMISSION_TREE_TITLE',data.remark)
      }
    }, computed: {},
    created(){
      this.$ajax.post('role/rolelist')
        .then((respons) => {
          this.$data.data = respons.data.data
        })
        .catch((error) => {
          this.$message({message: '获取信息失败' + error.message, type: 'error'})
          this.$data.data = []
        })

    }

  };

</script>
