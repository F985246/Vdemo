<template>
  <div>
    <div class="welcome"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style scoped>
.welcome {
  height: 520px;
  line-height: 520px;
  font-size: 22px;
  text-align: center;
  background-image: url("../../assets/images/welcome_bj.svg");
  background-size: contain;
}
.welcome::before {
  content: "小U欢迎您！";
}
</style>

