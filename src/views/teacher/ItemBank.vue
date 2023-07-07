<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const bindData = reactive({
	// 查询条件
	queryInfo: {
		pageNum: 0,
		pageSize: 10,
		tid: -1,
		query: ""
	},
	// 试题列表
	itemList: [

	],
	// 总试题数
	totalNum: 0,
	myItem: false
})

onMounted(() => {
	console.log('mounted!');
	getPage()
});

const getPage = async () => {
	if (bindData.myItem == true) {
		bindData.queryInfo.tid == store.user.uid
	}
	else {
		bindData.queryInfo.tid == -1
	}

	await axios(store.url + '/question/getPage', {
		headers: {
			Authorization: store.token
		},
		params: {
			pageNum: bindData.queryInfo.pageNum,
			pageSize: bindData.queryInfo.pageSize,
			tid: bindData.queryInfo.tid,
			query: bindData.queryInfo.query
		}
	}).then(
		res => {
			if (res.data.code == 200) {
				console.log(res.data);
				bindData.itemList = res.data.data.records
				bindData.totalNum = res.data.data.total
				console.log(bindData.itemList)
				console.log(bindData.totalNum)
			}
			else {
				alert(res.message)
			}
		}
	)
} 

const addItem = () => {
	router.push('/teacher/addItem')
}

const handlehCurrentChange = (val) => {
	bindData.queryInfo.pageNum = Math.ceil(val)
	console.log(bindData.queryInfo.pageNum)

	getPage()
}

const itemTypeChange = (row) => {
	if (row.type == 1) {
		return '单选题'
	}
	if (row.type == 2) {
		return '多选题'
	}
	if (row.type == 3) {
		return '判断题'
	}
}

const itemAnswerChange =(row) => {
	if (row.type == 1) {
		if (row.answer == 8) {
			return 'A'
		}
		if (row.answer == 4) {
			return 'B'
		}
		if (row.answer == 2) {
			return 'C'
		}
		if (row.answer == 1) {
			return 'D'
		}
	}
	if (row.type == 2) {
		var answerInt = row.answer
		console.log()
		console.log("answerInt " + answerInt)
		var answerStr = ''
		var isA = Math.floor(answerInt / 8)
		answerInt = answerInt % 8
		var isB = Math.floor(answerInt / 4)
		answerInt = answerInt % 4
		var isC = Math.floor(answerInt / 2)
		answerInt = answerInt % 2
		var isD = Math.floor(answerInt / 1)
		answerInt = answerInt % 1

		if (isA == 1) {
			answerStr += 'A'
		}
		if (isB == 1) {
			answerStr += 'B'
		}
		if (isC == 1) {
			answerStr += 'C'
		}
		if (isD == 1) {
			answerStr += 'D'
		}
		console.log(isA + "" + isB + "" + isC + "" + isD)
		console.log(answerStr)
		return answerStr
	}
	if (row.type == 3) {
		if (row.answer == 8) {
			return '对'
		}
		if (row.answer == 4) {
			return '错'
		}
	}
} 


</script>

<template>
	<div class="bread">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>题库</el-breadcrumb-item>
		</el-breadcrumb>
	</div>

	<el-card class="main-card">
		<!-- 搜索区域 -->
		<el-row :gutter="20">
			<el-col :span="8">
				<!-- 搜索与添加区域 -->
				<el-input v-model="bindData.queryInfo.query" placeholder="请输入内容" size="large">
					<template #append>
						<el-icon>
							<search />
						</el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="2">
				<el-button type="primary" size="large" @click="getPage">查找</el-button>
			</el-col>

			<el-col :span="4">
				<el-checkbox v-model="bindData.myItem" label="我的题库" size="large" />
			</el-col>

			<el-col :span="2">
				<el-button type="success" size="large" @click="addItem">添加试题</el-button>
			</el-col>
		</el-row>

		<!-- 列表区域 -->
		<el-table :data="bindData.itemList" border stripe size="large">
			<el-table-column label="题号" prop="qid"></el-table-column>
			<el-table-column label="类型" prop="type" :formatter="itemTypeChange"></el-table-column>
			<el-table-column label="题干" prop="stem"></el-table-column>
			<el-table-column label="选项1" prop="a"></el-table-column>
			<el-table-column label="选项2" prop="b"></el-table-column>
			<el-table-column label="选项3" prop="c"></el-table-column>
			<el-table-column label="选项4" prop="d"></el-table-column>
			<el-table-column label="正确答案" prop="answer" :formatter="itemAnswerChange"></el-table-column>
			<el-table-column label="答案解析" prop="explanation"></el-table-column>

		</el-table>

		<div class="pagination">

			<el-pagination @current-change="handlehCurrentChange" :page-size="bindData.queryInfo.pageSize" :current-page="bindData.queryInfo.pageNum" layout="prev, pager, next" :total="bindData.totalNum" size="large"/>
		</div>
	</el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";

.el-table {
	margin-top: 40px;
}

.pagination {
	display: block;
	text-align: center;
}

.el-pagination {
	position: fixed;
	bottom: 100px;
	width: 400px;
	margin-left: 600px;
	margin-right: 600px;
}
</style>
  