<script setup>
import { reactive,onMounted } from 'vue';
import axios from 'axios';
import { UserFilled, Lock } from '@element-plus/icons-vue';
const login = reactive({
  id: "",
  password: "",
  defaultId: "请输入ID",
  defaultPassword: "请输入密码",
  logoSrc: "src/assets/logo.jpg"

});

const toLogin = () => {
  
};


const toRegister = async () => {
  const res = await axios.get('http://127.0.0.1:10100/test/test');
  login.message = res.data;
}

</script>


<template>
  <div class="center">
      <div class="leftMove">
          <el-image :src="login.logoSrc" style="height: 100px;width: 100px;">
          </el-image>
		  <p class="logo">煤老板</p>
      </div>

      <div>
          <div class="list">
				<div class="list-cell">
					<el-input class="u-input" type="text" :prefix-icon="UserFilled"
						v-model="login.id" maxlength="32" :placeholder="defaultId" />
				</div>
				<div class="list-cell">
					<el-input class="u-input" type="password" :prefix-icon="Lock"
						v-model="login.password" maxlength="32" :placeholder="defaultPassword" />
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