<template>
  <div class="header">
    <div class="lt">
      <el-button v-if="isCollapse" type="primary" @click="TOGGLE" size="mini">
        <i class="el-icon-s-unfold btn"></i>
      </el-button>
      <el-button v-else type="primary" @click="TOGGLE" size="mini">
        <i class="el-icon-s-fold btn"></i>
      </el-button>

      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-left:15px;margin-right:15px;"
      >
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        size="mini"
        icon="el-icon-back"
        circle
        v-if="$route.path!='/index/welcome'"
        @click="$router.back()"
      ></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link" style="cursor: pointer;">
          <i class="el-icon-loading"></i>
          {{username}}，您好！
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="togglescreenfull">
            <i class="el-icon-full-screen"></i>
            {{isfull ? '退出全屏':'全屏操作'}}
          </el-dropdown-item>
          <el-dropdown-item @click.native="QUIT">
            <i class="el-icon-switch-button"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
// 全屏插件
import screenfull from "screenfull";
export default {
  components: {},
  data() {
    return {
      isfull: false,
    };
  },
  methods: {
    ...mapMutations({
      TOGGLE: "TOGGLE",
      QUIT: "user/QUIT",
    }),
    togglescreenfull() {
      if (!screenfull.isEnabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      this.isfull = !this.isfull;
      screenfull.toggle();
    },
  },
  computed: {
    ...mapState(["isCollapse"]),
    ...mapGetters({
      username: "user/username",
    }),
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .lt {
  display: flex;
  align-items: center;
}
.btn {
  font-size: 18px;
}
</style>