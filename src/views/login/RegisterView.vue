<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'

// use router
const router = useRouter();

// element plus

interface RegisterForm {
  name: string,
  age: number,
  gender: number,
  tele: string,
  email: string,
  is_teacher: boolean,
  reg_code: string,
  password: string,
  cfm_password: string,
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const register = reactive({
  name: "",
  age: "",
  gender: "",
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

const toRegister = () => {

}

// form rule validators
const checkAge = (rule: any, value: number, callback: any) => {
  if (!value) {
    return callback(new Error('请输入年龄'));
  }
  if (value < 16 || value > 65) {
    return callback(new Error('年龄应在16到65岁之间'))
  }
}

const checkUserType = (rule: any, value: any, callback: any) => {
  if ("" == value) {
    return callback(new Error('请选择用户类型'))
  }
}


// register form rules
const rules = reactive<FormRules<RegisterForm>>({
  name: [
    { type: 'string', required: true, message: '请输入姓名' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
  ],
  is_teacher: [
    { required: true, message: '请选择账号类型', trigger: 'blur' },
    { validator: checkUserType, trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { type: 'number', message: '请输入阿拉伯数字' },
    { validator: checkAge, trigger: 'blur'}
  ],

})

</script>


<template>
  <div class="center">
    <div class="leftMove">
      <el-image :src="login.logoSrc" style="height: 100px;width: 100px;">
      </el-image>
      <p class="logo">煤老板</p>
    </div>

    <el-form
      :model="register"
      :ref="ruleFormRef"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" prop="is_teacher">
        <el-select v-model="register.is_teacher" placeholder="请选择用户类型">
          <el-option label="教师账号" value=1></el-option>
          <el-option label="学生账号" value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number ="register.age" placeholder="请输入年龄"></el-input>
      </el-form-item>

    </el-form>

    <div class="show-register-info">
      <div>{{ register }}</div>
    </div>


    <button class="m-btn" @click="toRegister">注册</button>
    <button class="u-btn" @click="backToLogin">返回登录</button>


  </div>
</template>

<style>
@import "login.scss";
</style>