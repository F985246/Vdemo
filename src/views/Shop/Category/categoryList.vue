<template>
  <div class="table-bg">
    <el-table :data="catelist" row-key="id" :tree-props="{children:'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
      <el-table-column label="分类图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img | picImg()" v-if="scope.row.img" style="width:80px" />
          <span v-else>暂无照片</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" circle @click="edit(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" size="small" circle @click="del(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delCategory } from "../../../request/category";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
    }),
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
    }),

    async del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delCategory(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_category_list(); // 重新获取列表！！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },

    edit(val) {
      this.$emit("edit", { ...val });
    },
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },
  watch: {},
};
</script>

<style scoped>
i {
  font-size: 18px;
}
</style>