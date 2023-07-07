<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computeHash } from "./mysha256.js";

const router = useRouter();

const login = reactive({
  login: {
    name: "",
    password: "",
  },
  token: store.token,
  defaultName: "请输入用户名",
  defaultPassword: "请输入密码",
  logoSrc: "../src/assets/logo.jpg",
});

const updateStore = (user) => {
  store.user = user;
  store.user.image = user.img;
};


const formReqData = (data) => {
  return {
    name: data.name,
    password: computeHash(data.password),
  };
};

const toLogin = async () => {
  console.log("login try");
  await axios({
    method: "post",
    url: store.url + "/user/login",
    data: formReqData(login.login),
  }).then((res) => {
    if (res.data.code == 200) {
      //登录成功
      store.token = res.data.data.token;
      console.log("login success");
      console.log("token: " + store.token);

      // 更新store
      updateStore(res.data.data.user);

      if (res.data.data.user.type == 1) {
        //成功登录学员主页面
        router.push("student");
      } else if (res.data.data.user.type == 2) {
        //成功登录教师主页面
        router.push("teacher");
      } else if (res.data.data.user.type == 0) {
        //成功登录管理员主页面
        router.push("admin");
      }
    } else {
      //登录失败
      alert(res.data.message);
    }
  });
};

const toRegister = async () => {
  router.push("register");
};
</script>


<template>
  <div class="center">
    <div class="leftMove">
      <el-image :src="login.logoSrc" style="height: 100px; width: 100px">
      </el-image>
      <p class="logo">煤作业</p>
    </div>

    <div>
      <div class="list">
        <div class="list-cell">
          <el-input
            class="u-input"
            type="text"
            :prefix-icon="UserFilled"
            v-model="login.login.name"
            maxlength="32"
            :placeholder="login.defaultName"
          />
        </div>
        <div class="list-cell">
          <el-input
            class="u-input"
            type="password"
            :prefix-icon="Lock"
            v-model="login.login.password"
            maxlength="32"
            :placeholder="login.defaultPassword"
          />
        </div>
      </div>
    </div>

    <button class="u-btn" @click="toLogin">登录</button>
    <button class="m-btn" @click="toRegister">注册</button>
  </div>
</template>

<style>
@import "login.scss";
</style>