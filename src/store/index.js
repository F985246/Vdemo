import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导入模块！！
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"
import category from "./modules/category"
import specs from "./modules/specs"
import goods from "./modules/goods"

export default new Vuex.Store({
    state: {
        isCollapse: false  // 侧边栏是否折叠   默认不折叠
    },
    mutations: {
        TOGGLE(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    modules: {
        menu, role, user, category, specs, goods
    }












})
