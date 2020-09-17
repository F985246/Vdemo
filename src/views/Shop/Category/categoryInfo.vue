<template>
  <el-dialog
    :title="info.isAdd?'添加分类':'修改分类'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="50%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="180px" :rules="rules">
      <el-form-item label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <!-- v-if="item.type==1"   是用来筛选菜单里面的后台首页，我这里面没有，到最后再删除 -->
          <el-option
            v-for="item in catelist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input placeholder="请输入分类名" v-model="forminfo.catename"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload
          action
          :auto-upload="false"
          list-type="picture-card"
          :limit="1"
          :on-preview="see"
          :on-change="change"
          :on-remove="remove"
          :file-list="filelist"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="选择状态">
        <el-switch
          v-model="forminfo.status"
          :active-value="1"
          :inactive-value="2"
          :on-preview="see"
        ></el-switch>
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
import { addCategory, editCategory } from "../../../request/category";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  pid: 0,
  catename: "",
  img: "",
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
      dialogVisible: false,
      dialogImageUrl: "",
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！！
        catename: [{ required: true, message: "必填", trigger: "blur" }],
      },
      filelist: [], // [{name:'',url:''}]
    };
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
    }),
    see(file) {
      // console.log(file);
      //this.forminfo.img=file.raw;   // 原生文件信息
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; // JS生成的预览地址
    },
    change(file, fileLists) {
      // console.log(file);
      this.forminfo.img = file.raw; // 是原生文件信息
      // console.log(fileLists);
    },
    remove(file, fileLists) {
      this.forminfo.img = "";
    },
    setinfo(val) {
      // 将数据赋值给默认的 defaultItem  赋给表单
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      val.children ? delete val.children : "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 表单验证！！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！！
          let res;
          // 提交FormData类型！！
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            // 添加、修改
            res = await addCategory(fd);
          } else {
            res = await editCategory(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_category_list(); // 再次获取列表，让仓库里面的数据是最新的
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
      this.filelist = [];
    },
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },

  computed: {
    ...mapGetters({
      catelist: "category/catelist",
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