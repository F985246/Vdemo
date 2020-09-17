<template>
  <div>
    <el-row class="login_bj">
      <el-col :span="8" class="login_box">
        <el-form :model="formInfo" ref="form" :rules="rules">
          <el-form-item label piop="username">
            <el-input v-model="formInfo.username" placeholder="请您输入账号">
              <template slot="prepend">
                <i class="el-icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label prop="password">
            <el-input v-model="formInfo.password" placeholder="请您输入密码" show-password="true">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="onSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      formInfo: {
        username: "Lyiwen",
        password: "admin",
      },
      rules: {
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.formInfo);
        }
      });
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
.main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #ebeef5;
  background-color: rgba(0, 0, 0, 0.1);
}
.login_bj {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/login_bg.jpg");
  background-size: contain;
}
.login_box {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #ebeef5;
  border-radius: 8px;
  text-align: center;
  padding: 0 30px;
}
.login_box::before {
  content: "小U商城管理系统";
  font-size: 22px;
  line-height: 80px;
  letter-spacing: 0.7rem;
  color: #ff4b00;
}
i {
  font-size: 22px;
}
.login_btn {
  display: block;
  width: 100%;
}
</style>