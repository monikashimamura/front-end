<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const teacherHome = reactive({
	information: {
		name: store.user.name,
		sex: store.user.sex,
		age: store.user.age,
		phoneNumber: store.user.phoneNumber,
		email: store.user.email
	}
})



</script>

<template>
	<div class="common-layout">
		<!-- 布局容器 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="250px">
				<!-- 个人信息 -->
				<div class="information">
					<!-- logo -->

					<el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
					<h4 style="color: white; margin-bottom: 10px;">{{ teacherHome.information.name }}</h4>
					<span style="display: inline-block; color: white; font-size: 14px;">{{ teacherHome.information.sex == 1 ? '男' : '女' }}</span>
					<el-divider direction='vertical'/>
					<span style="display: inline-block; color: white; margin-bottom: 10px; font-size: 14px;">{{ teacherHome.information.age }}</span>
					<span style="color: white; display: block; font-size: 14px; margin-bottom: 10px; margin-top: 10px">
						<el-icon><PhoneFilled /></el-icon>
						{{ teacherHome.information.phoneNumber }}
					</span>
					

				</div>

				<el-divider />

				<!-- 导航栏 -->
				<el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
					text-color="#fff" @open="handleOpen" @close="handleClose"
					:router="true">
					<el-menu-item index="/teacher/infomation">
						<el-icon>
							<User />
						</el-icon>
						<span>个人信息</span>
					</el-menu-item>
					<el-menu-item index="/teacher/mycourse">
						<el-icon>
							<Notebook />
						</el-icon>
						<span>我的课程</span>
					</el-menu-item>
					<el-menu-item index="/teacher/addcourse">
						<el-icon>
							<Plus />
						</el-icon>
						<span>申请开课</span>
					</el-menu-item>
					<el-menu-item index="/teacher/itembank">
						<el-icon>
							<List />
						</el-icon>
						<span>题库</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 主界面 -->
			<el-main>

				<RouterView/>
			</el-main>
		</el-container>
	</div>
</template>

<style>
@import "default.scss";

body {
	height: 100vh;
}

.el-aside {
	background-color: #545c64;
	height: 100vh
}

.information {
	margin-top: 20px;
	height: 250px;
	display: block;
	text-align: center;
}

.el-avatar {
	margin-top: 20px;
	margin-bottom: 10px;
}

.el-menu-item {
	height: 80px;
}

.el-menu-item .el-icon {
	margin-left: 25px;
}

.el-menu-item span {

	font-size: 20px;
	height: 80px;
	line-height: 80px;
}</style>
  