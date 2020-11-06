<template>
  <div class="goods_box">
    <el-row>
      <el-button type="primary"
                 plain
                 @click="addCategory">新增分类</el-button>
    </el-row>
    <el-table :data="goodList"
              stripe
              border
              style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column v-for="(item,index) in propsText"
                       :prop="item.prop"
                       :label="item.label"
                       :key="index"
                       :width="item.width">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     @click="editGoods(scope.row)">編輯</el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     @click="deleteGoods(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getGoodsList, deleteGood } from './../request/api.js'
  export default {
    data() {
      return {
        goodList: [],
        propsText: [
          { prop: 'goods_name', label: '商品名稱', width: 180 },
          { prop: 'goods_number', label: '商品數量', width: 180 },
          { prop: 'goods_price', label: '商品價格', width: 180 },
        ]
      }
    },
    created() {
      this.queryGoodsList();
    },
    methods: {
      editGoods() { },
      // 刪除商品
      async deleteGoods(row) {
        let { meta } = await deleteGood(row.goods_id);
        if (meta.status == 200) this.$message.success(meta.msg);
        this.queryGoodsList();
      },
      async queryGoodsList() {
        let { meta, data } = await getGoodsList({ pagenum: 1, pagesize: 10 });
        console.log(data, meta);
        if (meta.status == 200) {
          this.goodList = data.goods;
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .goods_box {
    .el-row {
      padding: 10px;
      margin: 10px 0;
      background-color: #ffffff;
      border-radius: 5px;
    }
  }
</style>
