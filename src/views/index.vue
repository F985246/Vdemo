<template>
  <div>
    <el-container class="page">
      <el-aside :width="isCollapse?'64px':'220px'" class="page_left">
        <v-left></v-left>
      </el-aside>
      <el-container class="page_content">
        <el-header height class="page_header">
          <v-header></v-header>
        </el-header>
        <el-main height class="page_main">
          <!-- 显示区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vHeader from "../views/Layout/page_header";
import vLeft from "../views/Layout/page_left";

import { mapState } from "vuex";
export default {
  components: { vHeader, vLeft },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(["isCollapse"]),
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page_left {
  background-color: #212226;
}
.page_content {
  height: 100%;
  background-color: #f7f7f7;
}
.page_content .page_header {
  height: 60px;
  line-height: 60px;
  background-color: white;
  box-shadow: 0 0 6px -2px rgba(0, 0, 0, 0.5);
}
.page_header {
  position: relative;
  z-index: 999;
}
</style>