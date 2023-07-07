<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const bindData = reactive({
	// 查询条件
	myCourse: [],
    totalNum: 0,
    pageNum: 0,
    pageSize: 3
})

onMounted(() => {
	getMyCourse();
});

const getMyCourse = async () => {

    await axios(store.url + '/course/getByTidPage', {
		headers: {
			Authorization: store.token
		},
        params: {
            tid: store.user.uid,
            page: bindData.pageNum,
            size: bindData.pageSize
        }
	}).then(
		res => {
			if (res.data.code == 200) {
				console.log(res.data);
				bindData.myCourse = res.data.data.records
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

const handlehCurrentChange = (val) => {
	bindData.pageNum = Math.ceil(val)
	console.log(bindData.pageNum)

	getMyCourse()
}


</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的课程</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-card class="main-card">

        <el-table :data="bindData.myCourse" border stripe size="large">
            <el-table-column label="课程号" prop="cid"></el-table-column>
            <el-table-column label="课程名" prop="name"></el-table-column>
            <el-table-column label="简介" prop="description"></el-table-column>
            <el-table-column label="审核状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <el-button type="primary" size="large" @click="onCancel">详情</el-button>
                <el-button type="danger" size="large" @click="onSave">申请结课</el-button>

            </el-table-column>
        </el-table>

		<div class="pagination">

			<el-pagination @current-change="handlehCurrentChange" :page-size="bindData.pageSize" :current-page="bindData.pageNum" layout="prev, pager, next" :total="bindData.totalNum" size="large"/>
		</div>
	</el-card>
  </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>