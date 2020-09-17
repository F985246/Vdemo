<template>
  <div class="table-bg">
    <el-table :data="specslist">
      <el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" align="center"></el-table-column>
      <el-table-column prop="username" label="规格值" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="(item,index) in scope.row.attrs"
            :key="index"
            type="success"
            style="margin-right:6px"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
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
    <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delSpecs } from "@/request/specs";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specslist: "specs/specslist",
      page: "specs/page",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  methods: {
    ...mapMutations({
      SET_PAGE: "specs/SET_PAGE",
    }),
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      set_page: "specs/set_page",
      set_size: "specs/set_size",
    }),

    async del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delSpecs(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 如果本页只有1条数据！！且不是第一页！
            if (this.specslist.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            this.get_specs_list(); // 重新获取列表！！
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
    if (!this.specslist.length) {
      this.get_specs_list();
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