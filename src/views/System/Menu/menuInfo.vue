<template>
  <el-dialog
    :title="info.isAdd?'添加菜单':'修改菜单'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="50%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="180px" :rules="rules">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="forminfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="forminfo.type==2" label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <!-- v-if="item.type==1"   是用来筛选菜单里面的后台首页，我这里面没有，到最后再删除 -->
          <el-option
            v-for="item in menulist"
            v-if="item.type==1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input placeholder="请输入图标" v-model="forminfo.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-if="forminfo.type==2" prop="url">
        <el-input v-model="forminfo.url" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="选择状态">
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
import { addMenu, editMenu } from "../../../request/menu";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1, // 1目录2菜单
  url: "",
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
        title: [{ required: true, message: "必填", trigger: "blur" }],
        url: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      // 将数据赋值给默认的 defaultItem  赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 表单验证！！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！！
          let res;
          if (this.info.isAdd) {
            // 添加、修改
            res = await addMenu(this.forminfo);
          } else {
            res = await editMenu(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_menu_list(); // 再次获取列表，让仓库里面的数据是最新的
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
      // this.forminfo = { ...defaultItem };
    },
    cancel() {
      // 无论是修改成功还是添加成功,都应该让表单为空！！或者弹框关闭的时候！！
      this.forminfo = { ...resetItem };
    },
  },
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
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