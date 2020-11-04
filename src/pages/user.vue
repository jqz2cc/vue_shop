<template>
  <div class="user_boxs">
    <el-col :span="24"
            class="card">
      <el-card shadow="hover">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容"
                        v-model="searchText"
                        clearable
                        @clear='clearUserList'
                        class="input-with-select">
                <el-button slot="append"
                           @click="searchHandler"
                           icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary"
                         plain
                         @click="dialogVisible=true">新增用户</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <!-- table -->
    <el-table :data="userList"
              border
              stripe
              style="width: 100%">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column prop="username"
                       label="名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="email"
                       label="email"
                       width="180">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="手机号码"
                       width="180">
      </el-table-column>
      <el-table-column prop="role_name"
                       label="角色">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     @change="switchStatus(scope.row)"
                     active-color="#409EFF"
                     inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="180">
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
    <div class="pagination_warp">
      <el-pagination background
                     layout="prev, pager, next"
                     :current-page="pagenum"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>

    <!-- 新增用戶 -->
    <el-dialog title="新增用戶"
               :visible.sync="dialogVisible"
               :show-close='false'
               width="30%">
      <el-form label-width="80px"
               :rules="formLabelAlignRules"
               ref="formLabelAlignRef"
               :model="formLabelAlign">
        <el-form-item label="用户名称"
                      v-if="this.currentSelectId==''"
                      prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码"
                      v-if="this.currentSelectId==''"
                      prop="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱号码"
                      prop="email">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="mobile">
          <el-input v-model="formLabelAlign.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import { getUsers, switchUserStatus, addNewUser, editUserInfo, deleteUser, getRolersList } from './../request/api.js'
  export default {
    data() {
      return {
        searchText: '',
        userList: [],
        total: 0,
        pagenum: 1,
        dialogVisible: false,
        formLabelAlign: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        formLabelAlignRules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在  6 到 16 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮件地址', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
        },
        currentSelectId: '',
        rolesList: [],
      }
    },
    created() {
      this.getUsersList();
      this.queryRolersList();
    },
    methods: {
      queryRolersList() {
        getRolersList().then(res => {
          if (res.meta.status == 200) {
            this.rolesList = res.data
          }
        })
      },
      submitForm() {
        this.$refs.formLabelAlignRef.validate((valid) => {
          if (valid) {
            if (this.currentSelectId) {
              this.edit();
            } else {
              this.addUser();
            }
          } else {
            return false;
          }
        });
      },
      deletehandler(data) {
        this.$confirm('确认删除吗?').then(() => {
          deleteUser({ id: data.id }).then(res => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.getUsersList();
            }
          })
        }).catch(() => { });
      },
      selectRoleHandler(data) {
        this.currentSelectId = data.id
      },
      addUser() {
        addNewUser(this.formLabelAlign).then(res => {
          let { meta } = res;
          if (meta.status == 201) {
            this.$message.success(meta.msg);
            this.dialogVisible = false;
            this.getUsersList();
          }
        })
      },
      edit() {
        let obj = { email: this.formLabelAlign.email, mobile: this.formLabelAlign.mobile, id: this.currentSelectId }
        editUserInfo(obj).then(res => {
          let { meta } = res;
          if (meta.status == 200) {
            this.$message.success(meta.msg);
            this.dialogVisible = false;
            this.getUsersList();
          }
        })
      },
      close() {
        this.dialogVisible = false;
        if (this.currentSelectId) {
          this.formLabelAlign.email = '';
          this.formLabelAlign.mobile = '';
        }
        this.currentSelectId = '';
      },
      editHandler(data) {
        this.currentSelectId = data.id;
        this.dialogVisible = true;
        this.formLabelAlign.email = data.email;
        this.formLabelAlign.mobile = data.mobile;
        console.log(data)
      },
      searchHandler() {
        this.getUsersList();
      },
      handleCurrentChange(val) {
        this.pagenum = val;
        console.log(`当前页: ${val}`);
        this.getUsersList();
      },
      switchStatus(data) {
        console.log(data)
        switchUserStatus(data).then(res => {
          console.log(res)
          let { data, meta } = res;
          if (meta.status == 200) {
            this.$message.success(meta.msg)
          } {
            data.mg_state = !data.mg_state
          }
        })
      },
      clearUserList() {
        this.getUsersList();
      },
      getUsersList() {
        getUsers({ pagenum: this.pagenum, pagesize: 10, query: this.searchText }).then(res => {
          let { data, meta } = res;
          if (meta.status == 200) {
            this.userList = data.users;
            this.total = data.total;
          }
        })
      },
    },

  }
</script>
<style lang="less" scoped>
  .user_boxs {
    padding-top: 10px;
  }
  .card {
    margin-bottom: 10px;
  }
  .pagination_warp {
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>
