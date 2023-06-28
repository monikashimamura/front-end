<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const register = reactive({
  name: "",
  age: 0,
  gender: 0,
  tele: "",
  email: "",
  is_teacher: "",
  reg_code: "",
  password: "",
  cfm_password: "",
});

const login = reactive({
  id: "",
  password: "",
  defaultId: "请输入ID",
  defaultPassword: "请输入密码",
  logoSrc: "src/assets/logo.jpg"

});

const backToLogin = () => {
  router.push('login');
};


const toRegister = async () => {
  const res = await axios.get('http://127.0.0.1:10100/test/test');
  login.message = res.data;
}

let rules = {
  name: [
    { type: 'string', required: true, message: '请输入姓名', trigger: 'change' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
  ],
  is_teacher: { type: 'number', required: true, message: '请选择账号类型' },
  age: { type: 'number', required: true, message: '请输入年龄' }
}

</script>


<template>
  <div class="center">
    <div class="leftMove">
      <el-image :src="login.logoSrc" style="height: 100px;width: 100px;">
      </el-image>
      <p class="logo">煤老板</p>
    </div>

    <el-form :model="register" :rules="rules" ref="register" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" prop="is_teacher">
        <el-select v-model="register.is_teacher" placeholder="账号类型">
          <el-option label="教师账号" value=1></el-option>
          <el-option label="学生账号" value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="register.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
    </el-form>


    <button class="m-btn" @click="toRegister">注册</button>
    <button class="u-btn" @click="backToLogin">返回登录</button>


  </div>
</template>

<style>
@import "login.scss";
</style>