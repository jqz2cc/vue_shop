<template>
  <div class="category_box">
    <el-row>
      <el-button type="primary"
                 plain
                 @click="addCategory">新增分类</el-button>
    </el-row>
    <!--  -->
    <tree-table :data="categoryList"
                :columns="columns"
                :selection-type='false'
                :expand-type="false"
                :show-index='true'>
      <template slot="isok"
                slot-scope="scope">
        <i class="el-icon-circle-check"
           v-if="!scope.row.cat_deleted"></i>
        <i class="el-icon-circle-close"
           v-else></i>
      </template>
      <template slot="leave"
                slot-scope="scope">
        <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
        <el-tag type="success"
                v-else-if="scope.row.cat_level==1">二级</el-tag>
        <el-tag type="warning"
                v-else>三级</el-tag>
      </template>
      <template slot="opt"
                slot-scope="scope">
        <el-button type="primary"
                   icon="el-icon-edit"
                   plain
                   size="mini"
                   @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   plain
                   size="mini"
                   @click="delete(scope.row)">删除</el-button>
      </template>
    </tree-table>
    <!--  -->
    <el-dialog title="新增分类"
               :visible.sync="dialogVisible"
               @close="closeHandle"
               width="30%">
      <div class="dialog_content">
        <el-form :model="addCategoryFrom"
                 :rules="rules"
                 ref="addCategoryFromRef"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="活动名称"
                        prop="cat_name">
            <el-input v-model="addCategoryFrom.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader v-model="pCategoryValue"
                         ref="cascaderRef"
                         :options="twoCategoryList"
                         :props="props"
                         change-on-select
                         @change="handleChange"></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getCatgoryList, addCategories } from './../request/api.js'
  export default {
    data() {
      return {
        categoryList: [],
        columns: [
          { label: '分类名称', prop: 'cat_name', width: 100 },
          { label: '是否有效', prop: '', width: 100, type: 'template', template: "isok" },
          { label: '排序', prop: '', width: 100, type: 'template', template: "leave" },
          { label: '操作', prop: '', width: 100, type: 'template', template: "opt" },
        ],
        dialogVisible: false,
        addCategoryFrom: {
          cat_name: '',
          cat_level: 0,
          cat_pid: 0
        },
        rules: {
          cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
          ],
        },
        twoCategoryList: [],
        pCategoryValue: [],
        props: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        }
      }
    },
    created() {
      this.getgoodCategoryList();
    },
    methods: {
      handleChange() {
        console.log(this.pCategoryValue)
        this.addCategoryFrom.cat_pid = this.pCategoryValue[this.pCategoryValue.length - 1];
        this.addCategoryFrom.cat_level = this.pCategoryValue.length;
      },
      async confirm() {
        if(!this.addCategoryFrom.cat_name) return;
        let { meta } = await addCategories(this.addCategoryFrom)
        if (meta.status == 201) this.$message.success(meta.msg);
        this.getgoodCategoryList();
        this.dialogVisible = false;
      },
      closeHandle() {
        this.$refs.addCategoryFromRef.resetFields();
        this.pCategoryValue=[];
         this.addCategoryFrom.cat_pid = 0;
        this.addCategoryFrom.cat_level = 0;
      },
      async getTwoCategoryList() {
        let { meta, data } = await getCatgoryList({ type: 2 });
        this.twoCategoryList = meta.status == 200 ? data : [];
      },
      async getgoodCategoryList() {
        let { meta, data } = await getCatgoryList({ type: 3, pagenum: 1, pagesize: 5 })
        this.categoryList = meta.status == 200 ? data.result : [];
      },
      addCategory() {
        this.dialogVisible = true;
        this.getTwoCategoryList();
      },
    }
  }
</script>
<style lang="less" scoped>
  .category_box {
    padding-top: 10px;
    .el-row {
      padding: 10px;
      background-color: #ffffff;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .el-cascader {
      width: 100%;
    }
  }
</style>
