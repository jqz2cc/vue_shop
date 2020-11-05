<template>
  <div class="rights_tree">
    <el-dialog title="角色分配"
               :visible.sync="dialogVisible"
               :before-close="handleClose"
               width="30%"
               >
      <div class="dialog_content">
        <el-tree :data="rightsTree"
                 show-checkbox
                 node-key="id"
                 default-expand-all
                 :default-checked-keys="defaultCheckedKeys"
                 @check="nodeCheckHandle"
                 :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
   
  </div>
</template>
<script>
  import { getRightsTree } from "./../request/api.js"
  export default {
    data() {
      return {
        rightsTree: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        checkedNodeList:[]
      }
    },
    props:{
      dialogVisible:{
        tyepe:Boolean,
        default:true
      },
      defaultCheckedKeys:{
        type:Array,
        default:()=>{
          return []
        }
      },
    },
    created() {
      this.queryRightsTree();
    },
    methods: {
      handleClose(){
        this.$emit('close');
      },
      confirm(){
        console.log(this.checkedNodeList.join(','))
        this.$emit('confirm',this.checkedNodeList.join(','))
      },
      nodeCheckHandle(data1,data2){
        console.log(data2,data1);
         this.checkedNodeList = [...data2.halfCheckedKeys,...data2.checkedKeys]
      },
      queryRightsTree() {
        getRightsTree().then(res => {
          console.log(res)
          if (res.meta.status == 200) this.rightsTree = res.data;
        })
      },
    },
  }
</script>
<style lang="less" scoped>
</style>
