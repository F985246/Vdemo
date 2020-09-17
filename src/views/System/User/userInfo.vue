<template>
  <el-dialog
    :title="info.isAdd?'添加管理员':'修改管理员'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="50%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="180px" :rules="rules">
      <el-form-item label="管理员角色" prop="roleid">
        <el-select v-model="forminfo.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称" prop="username">
        <el-input placeholder="请输入管理员名称" v-model="forminfo.username"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input :placeholder="info.isAdd?'请输入管理员密码':'密码留空表示不修改！！'" v-model="forminfo.password"></el-input>
      </el-form-item>
      <el-form-item label="管理员状态">
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  roleid: "",
  username: "",
  password: "",
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
        roleid: [{ required: true, message: "必填", trigger: "blur" }],
        username: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    // 将数据赋值给默认的 defaultItem  赋给表单
    setinfo(val) {
      val.password = "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      if (this.isAdd && !this.forminfo.password) {
        this.$message.warning("请输入密码");
        return;
      }
      // 表单验证！！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！！
          let res;
          if (this.info.isAdd) {
            // 添加、修改
            res = await addUser(this.forminfo);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_user_list(); // 重新获取角色列表
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
    },
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
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