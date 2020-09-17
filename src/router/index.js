import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)


// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



// 一级
const Register = () => import("@/views/register");
const Login = () => import("@/views/login");
const Error404 = () => import("@/views/404");
const Index = () => import("@/views/index");
// 二级
const Welcome = () => import("../views/Layout/welcome")
const Menu = () => import("../views/System/Menu/menu");
const Role = () => import("../views/System/Role/role");
const User = () => import("../views/System/User/user");
const Category = () => import("../views/Shop/Category/category");
const Specs = () => import("../views/Shop/Specs/specs");
const Goods = () => import("../views/Shop/Goods/goods");
const Member = () => import("../views/Shop/Member/member");
const Lunbo = () => import("../views/Shop/Banner/lunbo");
const Seckill = () => import("../views/Shop/Seckill/seckill");

let router = new Router({
  routes: [
    {
      path: "/",
      component: Index,
      redirect: "/index"
    },
    {
      path: "/register",
      component: Register,
      meta: { title: "小U注册" }
    },
    {
      path: "/login",
      component: Login,
      meta: { title: "小U登录" }
    },
    {
      path: "/index",
      component: Index,
      meta: { title: "小U管理系统后台" },
      children: [
        { path: "/menu", component: Menu, meta: { title: "菜单管理" } },
        { path: "/role", component: Role, meta: { title: "角色管理" } },
        { path: "/user", component: User, meta: { title: "管理员管理" } },
        { path: "/category", component: Category, meta: { title: "商品分类管理" } },
        { path: "/specs", component: Specs, meta: { title: "商品规格管理" } },
        { path: "/goods", component: Goods, meta: { title: "商品管理" } },
        { path: "/member", component: Member, meta: { title: "会员管理" } },
        { path: "/lunbo", component: Lunbo, meta: { title: "轮播图管理" } },
        { path: "/seckill", component: Seckill, meta: { title: "秒杀管理" } },
        { path: "/", component: Welcome, meta: { title: "小U欢迎您" } }
      ]
    },
    {
      path: "*",
      component: Error404
    }
  ]
})

// 全局守卫
// router.beforeEach((to, from, next) => {
//   // 要去的地址是登录页面
//   if (to.path == "/login") {
//     document.title = to.meta.title;
//     next()
//   } else {
//     // 登录了
//     if (localStorage.getItem("userinfo")) {
//       // 允许用户访问的地址
//       let whiteList = store.getters["user/menus_url"];
//       // 访问的地址，在该用户可以访问的地址池中
//       if (whiteList.includes(to.path)) {
//         document.title = to.meta.title
//         next()
//       }
//     } else {
//       // 没有登录就想访问是直接跳转到登录页面
//       next("/login")
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})


export default router;