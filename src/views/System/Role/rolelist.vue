<template>
  <div class="table-bg">
    <el-table :data="rolelist">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
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
import { delRole } from "@/request/role";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
    }),

    async del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delRole(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list(); // 重新获取列表！！
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
    if (!this.rolelist.length) {
      this.get_role_list();
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