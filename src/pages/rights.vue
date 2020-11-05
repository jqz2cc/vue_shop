<template>
  <div class="rights_box">
    <el-table :data="rightsList"
              border
              max-height="750"
              style="width: 100%">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column prop="authName"
                       label="权限名称">
      </el-table-column>
      <el-table-column prop="path"
                       label="路径">
      </el-table-column>
      <el-table-column prop="level"
                       label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level==0">标签一</el-tag>
          <el-tag type="success"
                  v-else-if="scope.row.level==1">标签二</el-tag>
          <el-tag type="warning"
                  v-else>标签四</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getRightsList } from './../request/api.js'
  export default {
    data() {
      return {
        rightsList: []
      }
    },
    created() {
      this.queryRightsList();
    },
    methods: {
      queryRightsList() {
        getRightsList().then(res => {
          let { data, meta } = res;
          this.rightsList = meta.status == 200 ? data : [];
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .rights_box {
    padding-top: 10px;
  }
</style>
