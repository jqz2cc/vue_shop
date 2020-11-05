<template>
  <div class="roles_box">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary"
                     plain>新增角色</el-button>
        </el-col>

      </el-row>
    </el-card>
    <el-table :data="rolerList"
              border
              max-height="750"
              style="width: 100%;margin-top:10px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item,i1) in scope.row.children"
                  :key="item.index"
                  class="role_row"
                  :class="[i1==0?'btborder':'']">
            <!-- 一级 -->
            <el-col :span="5">
              <el-tag closable
                      type='warning'
                      @close="closeRightById(scope.row,item)"> {{item.authName}}</el-tag>
            </el-col>
            <!-- 二级权限 & 三级权限 -->
            <el-col :span="19">
              <el-row v-for="(item2,i2) in  item.children"
                      :key="item2.id"
                      :class="[i2!==item.children.length-1?'role_row':'']">
                <el-col :span="6">
                  <el-tag closable
                          type='success'
                          @close="closeRightById(scope.row,item2)">{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag closable
                          v-for="(item3) in item2.children"
                          :key="item3.id"
                          @close="closeRightById(scope.row,item3)">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column prop="roleName"
                       label="角色名称">
      </el-table-column>
      <el-table-column prop="roleDesc"
                       label="角色描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     plain
                     @click="editHandler(scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     plain
                     @click="deletehandler(scope.row)"></el-button>
          <el-tooltip class="item"
                      effect="dark"
                      :enterable='false'
                      content="分配角色"
                      placement="top">
            <el-button type="warning"
                       icon="el-icon-setting"
                       size="mini"
                       plain
                       @click="selectRoleHandler(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <rightsTreeDialog :defaultCheckedKeys="defaultCheckedKeys"
                      @close="close"
                      @confirm='confirm'
                      :dialogVisible="dialogVisible" />
  </div>
</template>
<script>
  import { getRolersList, deleteRight, rolesrights } from './../request/api.js'
  import rightsTreeDialog from './../components/rightsTree.vue'
  export default {
    components: {
      rightsTreeDialog
    },
    data() {
      return {
        rolerList: [],
        defaultCheckedKeys: [],
        dialogVisible: false,
        currentRole: null,
      }
    },
    created() {
      this.queryRolesList();
    },
    methods: {
      editHandler(data) {
        console.log(data)
       },
      deletehandler(data) {
        console.log(data)
        
       },
      selectRoleHandler(data) {
        this.defaultCheckedKeys = [];
        this.currentRole = data;
        this.getLeafKeys(data, this.defaultCheckedKeys);
        this.dialogVisible = true;
      },
      async confirm(ids) {
        let {meta} = await rolesrights(this.currentRole.id,{rids: ids })
        if(meta.status == 200) this.$message.success(meta.msg)
        this.dialogVisible=false;
        this.queryRolesList();
      },
      close() {
        this.dialogVisible = false;
      },
      getLeafKeys(node, arr) {
        if (!node.children) {
          return arr.push(node.id)
        } else {
          node.children.forEach(item => {
            this.getLeafKeys(item, arr)
          })
        }
      },
      closeRightById(roledata, data) {
        this.$confirm('确认删除吗?').then(() => {
          console.log(deleteRight)
          deleteRight({ rightId: data.id, roleId: roledata.id }).then(res => {
            if (res.meta.status == 200) this.$message.success(res.meta.msg)
            roledata.children = res.data;
          })
        }).catch(() => {
          this.$message('取消了删除操作')
        })
      },
      queryRolesList() {
        getRolersList().then(res => {
          console.log(res)
          let { data, meta } = res;
          this.rolerList = meta.status == 200 ? data : [];
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .roles_box {
    padding-top: 10px;
    .role_row {
      padding: 5px 0;
      border-bottom: 1px solid #f5f5f5;
    }
    .btborder {
      border-top: 1px solid #f5f5f5;
    }
    .el-tag {
      margin-right: 5px;
    }
    .el-row {
      display: flex;
      align-items: center;
    }
  }
</style>
