<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { computeHash } from './mysha256';

function encryptPassword(password: string) {
  return computeHash(password);
}

// use router
const router = useRouter();

interface RegisterForm {
  name: string,
  is_teacher: boolean,
  is_male: boolean,
  age: number,
  tele: string,
  introduction: string,
  reg_code: string,
  password: string,
  cfm_password: string,
}

interface reqData {
  name: string,
  sex: number,
  age: number,
  phone_number: string,
  introduction: string,
  password: string,
  type: number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const register = reactive({
  name: "",
  is_teacher: "",
  is_male: "",
  age: "",
  tele: "",
  introduction: "",
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

// submit register info

const formReqData = (regInfo) => {
  return <reqData> <unknown> {
    name: regInfo.name,
    sex: regInfo.is_male ? 1 : 0,
    age: regInfo.age,
    phone_number: regInfo.tele,
    introduction: regInfo.introduction,
    password: encryptPassword(regInfo.password),
    type: regInfo.is_teacher ? 2 : 1
  }
}

let reqdata = formReqData(register);

const genReq = () => {
  reqdata = formReqData(register);
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

const strIsTele = (s: string) => {
  if (s.length == 0) {
    return false;
  }
  let reg = /^1[3-9]\d{9}$/;
  if (reg.test(s)) {
    return true;
  }
}

const checkTele = (rule: any, value: string, callback: any) => {
  if (!strIsTele(value)) {
    return callback(new Error('请输入正确手机号'))
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
    { validator: checkAge, trigger: 'blur' }
  ],
  is_male: [
    { required: true, message: '请选择性别' }
  ],
  tele: [
    { required: true, message: '请输入手机号码' },
    { validator: checkTele, trigger: 'blur' }
  ]

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
        <el-input v-model.number="register.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="is_male">
        <el-select v-model="register.is_male" placeholder="请选择性别">
          <el-option label="男" value=1></el-option>
          <el-option label="女" value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="tele">
        <el-input v-model.number="register.tele" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="register.password" placeholder="请设置您的密码"></el-input>
      </el-form-item>

    </el-form>

    <div class="gap" />
    <div class="show-register-info">
      <div> Register Info </div>
      <div>{{ register }}</div>
    </div>
    <div class="gap" />
    <div class="show-req-info">
      <div> Req Data </div>
      <div>{{ formReqData(register) }}</div>
    </div>


    <button class="m-btn" @click="toRegister">注册</button>
    <button class="u-btn" @click="backToLogin">返回登录</button>


  </div>
</template>

<style>
@import "login.scss";
.gap{
	height: 50px;
}
</style>