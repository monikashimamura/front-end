<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const bindData = reactive({
	type: 1,
	tid: store.user.uid,
	stem: '',
	a: '',
	b: '',
	c: '',
	d: '',
	answer: 1,
	explanation: '',
	multiCheck: []
})

const current_type = reactive(1)

const onCancel = () => {
	router.push('/teacher/itembank')
}

const onAddItem = () => {
	// 如果是多选
	if (bindData.type == 2) {
		bindData.answer == 0
		if (bindData.multiCheck.indexOf('A') > -1) {
			bindData.answer += 8
		}
		if (bindData.multiCheck.indexOf('B') > -1) {
			bindData.answer += 4
		}
		if (bindData.multiCheck.indexOf('C') > -1) {
			bindData.answer += 2
		}
		if (bindData.multiCheck.indexOf('B') > -1) {
			bindData.answer += 1
		}
	}

	//如果是判断
	if (bindData.type == 3) {
		bindData.a = ''
		bindData.b = ''
		bindData.c = ''
		bindData.d = ''
	}

	axios({
		method: "post",
		url: store.url + "/question/add",
		headers: {
			Authorization: store.token
		},
		data: {
			tid: bindData.tid,
			stem: bindData.stem,
			a: bindData.a,
			b: bindData.b,
			c: bindData.c,
			d: bindData.d,
			answer: bindData.answer,
			explanation: bindData.explanation,
			type: bindData.type
		},
	}).then((res) => {
		if (res.data.code == 200) {
			console.log(res.data)
			alert(res.data.message)
			bindData.stem = ''
			bindData.a = ''
			bindData.b = ''
			bindData.c = ''
			bindData.d = ''
			bindData.explanation = ''
			bindData.multiCheck = []
		} else {
			//登录失败
			alert(res.data.message);
		}
	});
}





</script>

<template>
	<div class="bread">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/teacher/itembank' }">题库</el-breadcrumb-item>
			<el-breadcrumb-item>添加试题</el-breadcrumb-item>
		</el-breadcrumb>
	</div>

	<el-card class="main-card">
		<el-form label-width="300px" :size="large">
			<el-form-item label="题型">
				<el-radio-group v-model="bindData.type" class="ml-4" size="large">
					<el-radio label="1" size="large">单选</el-radio>
					<el-radio label="2" size="large">多选</el-radio>
					<el-radio label="3" size="large">判断</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="题干">
				<el-input v-model="bindData.stem" size="large" type="textarea" resize="none" rows="4" maxlength="200"
					show-word-limit style="font-size: 16px;"></el-input>
			</el-form-item>

			<div class="select" v-if="bindData.type == 1 || bindData.type == 2">
				<el-form-item label="选项A">
					<el-input v-model="bindData.a" size="large" type="textarea" resize="none" rows="2" maxlength="100"
						show-word-limit style="font-size: 16px;"></el-input>
				</el-form-item>
				<el-form-item label="选项B">
					<el-input v-model="bindData.b" size="large" type="textarea" resize="none" rows="2" maxlength="100"
						show-word-limit style="font-size: 16px;"></el-input>
				</el-form-item>
				<el-form-item label="选项C">
					<el-input v-model="bindData.c" size="large" type="textarea" resize="none" rows="2" maxlength="100"
						show-word-limit style="font-size: 16px;"></el-input>
				</el-form-item>
				<el-form-item label="选项D">
					<el-input v-model="bindData.d" size="large" type="textarea" resize="none" rows="2" maxlength="100"
						show-word-limit style="font-size: 16px;"></el-input>
				</el-form-item>
			</div>

			<div class="singleSelect" v-if="bindData.type == 1">
				<el-form-item label="答案">
					<el-radio-group v-model="bindData.answer" class="ml-4" size="large">
						<el-radio label="8" size="large">A</el-radio>
						<el-radio label="4" size="large">B</el-radio>
						<el-radio label="2" size="large">C</el-radio>
						<el-radio label="1" size="large">D</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>

			<div class="multiSelect" v-else-if="bindData.type == 2">
				<el-form-item label="答案">
					<el-checkbox-group v-model="bindData.multiCheck">
						<el-checkbox label="A" />
						<el-checkbox label="B" />
						<el-checkbox label="C" />
						<el-checkbox label="D" />
					</el-checkbox-group>
				</el-form-item>
			</div>

			<div class="judge" v-else-if="bindData.type == 3">
				<el-form-item label="答案">
					<el-radio-group v-model="bindData.answer" class="ml-4" size="large">
						<el-radio label="8" size="large">对</el-radio>
						<el-radio label="4" size="large">错</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>





			<el-form-item label="详解">
				<el-input v-model="bindData.explanation" size="large" type="textarea" resize="none" rows="4" maxlength="200"
					show-word-limit style="font-size: 16px;"></el-input>
			</el-form-item>

			<el-button type="default" size="large" style="margin-right: 250px;" @click="onCancel">取消</el-button>

			<el-button type="primary" size="large" @click="onAddItem">添加</el-button>


		</el-form>
	</el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";

.el-form {
	margin-right: 300px;
}

.el-form-item__label {
	font-size: 18px;
	margin-right: 40px;
}

.main-card {
	display: block;
	text-align: center;
}
</style>
  