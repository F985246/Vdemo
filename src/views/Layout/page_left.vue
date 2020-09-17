<template>
  <div>
    <h1>{{isCollapse?'小U':'小U商城后台系统'}}</h1>
    <div>
      <el-menu
        style="border:none"
        background-color="#212226"
        router
        :default-active="$route.path"
        text-color="#fff"
        active-text-color="#FF4B00"
        :collapse="isCollapse"
      >
        <el-menu-item index="/index">
          <i class="el-icon-house"></i>
          <span slot="title">小U欢迎您</span>
        </el-menu-item>
        <template v-for="(item,index) in menus">
          <el-menu-item v-if="item.type==2" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="index+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item
              :index="val.url"
              v-for="(val,idx) in item.children"
              :key="idx"
            >{{val.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["isCollapse"]),
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style scoped>
h1 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #212226;
  color: white;
  letter-spacing: 0.25rem;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
</style>