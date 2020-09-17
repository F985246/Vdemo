<template>
  <el-dialog
    :title="info.isAdd?'添加规格':'修改规格'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="50%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="180px" :rules="rules">
      <el-form-item label="属性名" prop="specsname">
        <el-input placeholder="请输入属性名" v-model="forminfo.specsname" style="width:330px"></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="username">
        <label v-for="(item,index) in list" :key="index">
          <el-input
            v-model="item.value"
            placeholder="请输入属性值"
            style="display:inline-block;width:200px;margin-bottom:10px;"
          ></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttrs">添加属性</el-button>
          <el-button type="danger" v-else @click="delAttrs(index)">删除属性</el-button>
        </label>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 导入该菜单模块添加和修改的 请求封装方法
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  specsname: "",
  attrs: "",
  status: 1, // 1正常2禁用
};

let resetItem = { ...defaultItem };

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  components: {},
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！！
        specsname: [{ required: true, message: "必填", trigger: "blur" }],
      },
      list: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
    }),
    // 将数据赋值给默认的 defaultItem  赋给表单
    setinfo(val) {
      this.list = val.attrs.map((v) => ({
        value: v,
      }));
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(idx) {
      this.list.splice(idx, 1);
    },
    async submit() {
      if (!this.list.every((val) => val.value)) {
        this.$message.warning("请输入规格值");
        return;
      }
      this.forminfo.attrs = this.list.map((val) => val.value);
      this.forminfo.attrs = this.forminfo.attrs.join(",");
      // 表单验证！！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！！
          let res;
          if (this.info.isAdd) {
            // 添加、修改
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_specs_list(); // 重新获取角色列表
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
      this.list = [{ value: "" }];
    },
  },

  watch: {},
};
</script>

<style scoped>
.el-dialog__header {
  border-bottom: 1px solid #ddd;
  padding: 15px 20px 10px;
}
</style>