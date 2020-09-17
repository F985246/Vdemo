<template>
  <div>
    <el-button type="primary" @click="add">添加角色</el-button>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加/修改组件 -->
    <v-info :info="info" ref="dialog"></v-info>
  </div>
</template>

<script>
import vInfo from "./roleInfo";
import vList from "./rolelist";
export default {
  components: { vInfo, vList },
  data() {
    return {
      info: {
        // 这是组件的info变量！！
        isAdd: false,
        isShow: false,
      },
    };
  },
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      // 调用弹框组件的setinfo方法！！
      this.$refs.dialog.setinfo(val);
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
</style>