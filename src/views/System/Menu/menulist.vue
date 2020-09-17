<template>
  <div class="table-bg">
    <el-table :data="menulist" row-key="id" :tree-props="{children:'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
      <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改/删除" align="center">
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
import { delMenu } from "../../../request/menu";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),

    async del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delMenu(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list(); // 重新获取列表！！
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
    if (!this.menulist.length) {
      this.get_menu_list();
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