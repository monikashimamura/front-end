<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import store from '../../store/store.js';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { computeHash } from './mysha256.js';

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
  invite_code: string,
  password: string,
  cfm_password: string,
}

interface reqData {
  name: string,
  password: string,
  age: number,
  sex: number,
  phoneNumber: string,
  type: number,
  invite_code: string,
}

const formSize = ref('default')
let registerRef;

const register = reactive({
  name: "",
  is_teacher: false,
  is_male: false,
  age: "",
  tele: "",
  introduction: "",
  invite_code: "",
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

// submit register info

const formReqData = (regInfo) => {
  return <reqData> <unknown> {
    name: regInfo.name,
    password: encryptPassword(regInfo.password),
    age: regInfo.age,
    sex: regInfo.is_male ? 1 : 0,
    phoneNumber: regInfo.tele,
    // introduction: regInfo.introduction,
    type: regInfo.is_teacher ? 2 : 1,
    invite_code: register.invite_code,
  }
}

let reqdata = formReqData(register);

const genReq = () => {
  reqdata = formReqData(register);
}

// form rule validators
const checkName =  (rule: any, value: string, callback: any) => {
  let reg = /^[\u4e00-\u9fa5a-zA-Z0-9\_]{2,32}$/;
  if (!reg.test(value)) {
    callback(new Error('用户名不能包含除下划线以外的特殊字符'));
  }
}

const checkAge = (rule: any, value: number, callback: any) => {
  if (!value) {
    return callback(new Error('请输入年龄'));
  } else if (value < 16 || value > 65) {
    return callback(new Error('年龄应在16到65岁之间'));
  } else
    return callback();
}

const checkUserType = (rule: any, value: any, callback: any) => {
  if ("" === value) {
    return callback(new Error('请选择用户类型'));
  }
  return callback();
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
  } else
    return callback();
}

const checkPassword = (rule: any, value: string, callback: any) => {
  const reg = /[0-9a-zA-Z\*\-\+\_]+$/;
  if (value.length < 6) {
    return callback(new Error('密码长度不能小于6'));
  }

  if (reg.test(value)) {
    return callback();
  } else {
    return callback(new Error('密码不能包含除 *、-、+、_ 以外的特殊字符'));
  }
}

const checkConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value != register.password) {
    return callback(new Error('两次密码不一致'));
  }
  return callback();
}

const checkInviteCode = (rule: any, value: string, callback: any) => {
  const reg = /^[0-9a-zA-Z]+$/;

  if (reg.test(value)) {
    return callback();
  } else {
    return callback(new Error('请输入正确格式的注册码'));
  }
}

// register form rules
const rules = reactive<FormRules<typeof register>>({
  name: [
    { type: 'string', required: true, message: '请输入用户名' },
    { min: 2, max: 32, message: '长度在 2 到 32 个字符' },
    { validator: checkName, trigger: 'change' }
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
  ],
  password: [
    { required: true, validator: checkPassword, trigger: 'change'}
  ],
  cfm_password: [
    { required: true, validator: checkConfirmPassword, trigger: 'change'}
  ],
  invite_code: [
    { required: true, validator: checkInviteCode, trigger: 'change'}
  ]
})

// SUBMIT

const register_is_valid = (): boolean => {

  // check rules
  registerRef.validate((valid) => {
    if (!valid) {
      alert("请正确填写注册信息！")
      return false;
    }
  })

  // remove invite code when type is student
  if (!register.is_teacher) {
    register.invite_code = "";
  }

  return true;
}

const toRegister = async () => {
  console.log("register try");
  let data;
  if (register_is_valid()) {
    data = formReqData(register);
  } else {
    console.log("register fail");
    return;
  }
  await axios({
    method: 'post',
    url: store.url + '/user/register',
    data: data,
  }).then(
    res => {
      if(res.data.code == 200){
        console.log("register success");
        router.push('login');
      } else {
        console.log("register fail");
        alert(res.data.message)
      }
    }
  )
}

</script>


<template>
  <div class="center">
    <div class="leftMove">
      <el-image :src="login.logoSrc" style="height: 100px;width: 100px;">
      </el-image>
      <p class="logo">煤老板</p>
    </div>

    <el-form
      ref="registerRef"
      :model="register"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" prop="is_teacher">
        <el-select v-model.boolean="register.is_teacher" placeholder="请选择用户类型">
          <el-option label="教师账号" :value=true></el-option>
          <el-option label="学生账号" :value=false></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="register.is_teacher" label="注册码" prop="invite_code">
        <el-input v-model="register.invite_code" placeholder="教师用户需要输入注册码"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="register.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="is_male">
        <el-select v-model="register.is_male" placeholder="请选择性别">
          <el-option label="男" :value=true></el-option>
          <el-option label="女" :value=false></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="tele">
        <el-input v-model="register.tele" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="register.password" type="password" placeholder="请设置您的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cfm_password">
        <el-input v-model="register.cfm_password" type="password" placeholder="请确认您的密码"></el-input>
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