<template>
  <div class="params_box">
    <el-card class="box-card">
      <el-alert title="注意:只允许为第三级分类设置相关阐述!"
                type="warning"
                :closable="false"
                show-icon>
      </el-alert>
      选择分类 : <el-cascader v-model="pCategoryValue"
                   ref="cascaderRef"
                   :options="categoryList"
                   :props="props"
                   clearable
                   @change="handleChange">
      </el-cascader>
    </el-card>

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="动态参数"
                   name="dynamic">
        <el-row>
          <el-button type="primary"
                     :disabled="isBtnDisabled"
                     plain
                     @click="addAttrBtn">添加参数</el-button>
        </el-row>

        <!-- 动态参数 -->
        <el-table :data="dynamicData">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag :key="tag"
                      v-for="(tag,index) in scope.row.attr_vals"
                      closable
                      @close="deleteSingAttr(scope.row,index)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag"
                        v-if="scope.row.inputVisible"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput(scope.row)">+ New Tag</el-button>

            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称"
                           prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         icon="el-icon-edit"
                         plain
                         size="mini"
                         @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         plain
                         size="mini"
                         @click="deleteAttr(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性"
                   name="static">
        <el-row>
          <el-button type="primary"
                     :disabled="isBtnDisabled"
                     plain
                     @click="addAttrBtn">添加属性</el-button>
        </el-row>
        <el-table :data="staticData">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag :key="tag"
                      v-for="(tag,index) in scope.row.attr_vals"
                      closable
                      @close="deleteSingAttr(scope.row,index)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag"
                        v-if="scope.row.inputVisible"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput(scope.row)">+ New Tag</el-button>

            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称"
                           prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         icon="el-icon-edit"
                         plain
                         size="mini"
                         @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         plain
                         size="mini"
                         @click="deleteAttr(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增dialog -->
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <div class="dialog_content">
        <el-form :model="newAttrValue"
                 :rules="rules"
                 ref="newAttrValueRef"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="属性名称"
                        prop="attr_name">
            <el-input v-model="newAttrValue.attr_name"
                      placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getCatgoryList, getAttributes, addNewAttr, deleteAttrVal, editAttrVal, editParams } from './../request/api.js'
  export default {
    data() {
      return {
        categoryList: [],
        pCategoryValue: [],
        activeName: 'dynamic',
        dynamicData: null,
        staticData: null,
        props: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        dialogVisible: false,
        newAttrValue: {
          attr_name: ''
        },
        rules: {
          attr_name: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ]
        },
        currentSelectAttr: null,
        inputVisible: false,
      }
    },
    created() {
      this.getgoodCategoryList();
    },
    computed: {
      isBtnDisabled() {
        return this.pCategoryValue.length !== 3
      },
      title() {
        return this.activeName == 'dynamic' ? '新增动态属性' : '新增静态属性'
      },
    },
    methods: {
      deleteSingAttr(row, index) {
        console.log(row)
        row.attr_vals.splice(index, 1);
        let ids = { id: this.pCategoryValue[this.pCategoryValue.length - 1], attrId: row.attr_id }
        let params = { attr_sel: this.activeName == 'dynamic' ? 'many' : 'only', attr_name: row.attr_name, attr_vals: row.attr_vals.join(' ') }
        editParams(ids, params).then(res => {
          let { meta } = res
          if (meta.status == 200) this.$message.success(meta.msg)
        })
      },
      showInput(data) {
        data.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm(data) {
        let inputValue = data.inputValue.trim();
        if (inputValue) {
          console.log(data)
          data.attr_vals.push(inputValue);
          let ids = { id: this.pCategoryValue[this.pCategoryValue.length - 1], attrId: data.attr_id }
          let params = { attr_sel: this.activeName == 'dynamic' ? 'many' : 'only', attr_name: data.attr_name, attr_vals: data.attr_vals.join(' ') }
          editParams(ids, params).then(res => {
            let { meta } = res
            if (meta.status == 200) this.$message.success(meta.msg)
          })
        }
        data.inputVisible = false;
        data.inputValue = '';
      },
      addAttrBtn() {
        this.dialogVisible = true;
      },
      async confirmAdd() {
        let params = { ...this.newAttrValue, attr_sel: this.activeName == 'dynamic' ? 'many' : 'only' };
        let res = null
        if (this.newAttrValue.attr_name && !this.currentSelectAttr) {
          res = await addNewAttr(this.pCategoryValue[this.pCategoryValue.length - 1], params)
        } else {
          let ids = { id: this.pCategoryValue[this.pCategoryValue.length - 1], attrId: this.currentSelectAttr.attr_id }
          res = await editAttrVal(ids, params)
        }
        if (res.meta.status == 200) this.$message.success(res.meta.msg);
        this.dialogVisible = false;
        this.getAttributeInfo();
      },
      handleClose() {
        this.$refs.newAttrValueRef.resetFields();
        this.dialogVisible = false;
      },
      handleChange() {
        console.log(this.pCategoryValue);
        if (this.pCategoryValue.length < 3) {
          this.pCategoryValue = [];
          this.staticData = null;
          this.dynamicData = null;
        }
        if (!this.isBtnDisabled) this.getAttributeInfo();
      },
      edit(data) {
        this.dialogVisible = true;
        this.currentSelectAttr = data;
        this.newAttrValue.attr_name = data.attr_name;

      },
      deleteAttr(data) {
        this.$confirm('确认删除?').then(() => {
          deleteAttrVal(this.pCategoryValue[2], data.attr_id).then(res => {
            let { meta } = res;
            if (meta.status == 200) this.$message.success(meta.msg);
            this.getAttributeInfo();
          })
        }).catch(() => {
          this.$message('取消删除操作')
        })
      },
      handleClick() {
        if (!this.isBtnDisabled) this.getAttributeInfo();
      },
      async getAttributeInfo() {
        let { meta, data } = await getAttributes(this.pCategoryValue[this.pCategoryValue.length - 1], { sel: this.activeName == 'dynamic' ? 'many' : 'only' })
        if (meta.status == 200) {
          data.forEach(item => {
            item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(' ') : []
            item.inputValue = '';
            item.inputVisible = false;
          });
          if (this.activeName == 'dynamic') {
            this.dynamicData = data;
          } else {
            this.staticData = data;
          }
        } else {
          this.$message.error(meta.msg)
        }
      },
      async getgoodCategoryList() {
        let { meta, data } = await getCatgoryList({ type: 3, pagenum: 1, pagesize: 5 })
        this.categoryList = meta.status == 200 ? data.result : [];
      },
    }
  }
</script>
<style lang="less" scoped>
  .params_box {
    padding-top: 10px;
    .el-alert {
      margin-bottom: 10px;
    }
    .el-cascader {
      width: 350px;
    }
    .el-tabs {
      background-color: #ffffff;
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px;
      min-height: 500px;
      border-radius: 5px;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
</style>
