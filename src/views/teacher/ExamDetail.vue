<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const bindData = reactive({
    exam: {
        eid: 0,
        cid: store.cid,
        startTime: '',
        endTime: '',
        description: ''
    },
    cid: store.cid,
    hasExam: false
})

const getExamByCid = async () => {
    await axios({
        method: 'get',
        url: store.url + '/exam/getExam',
        headers: {
			Authorization: store.token
		},
        params: {
            cid: bindData.cid
        }
    }).then(
        res => {
            if(res.data.code == 200) {
                if (res.data.data == null) {
                    bindData.hasExam = false
                }
                else {
                    bindData.hasExam = true
                    bindData.exam = res.data.data
                }
            } else {
                alert(res.data.message)
            }
        }
    )
}

onMounted(getExamByCid)


</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/coursedetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item>考试详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <div v-if="bindData.hasExam">
            {{ bindData.exam.startTime }}
        </div>
        <div v-else>
            目前还没有考试
            <el-button type="primary" size="large" @click="onNewExam">创建考试</el-button>
        </div>
  </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>
  