<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const bindData = reactive({
    exam: {
        eid: 0,
        cid: store.cid,
        name: '',
        startTime: '',
        endTime: '',
        description: ''
    },
    cid: store.cid,
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
            if (res.data.code == 200) {
                if (res.data.data == null) {
                    bindData.hasExam = false
                }
                else {
                    bindData.hasExam = true
                    bindData.exam = res.data.data
                    var startTime = new Date(bindData.exam.startTime)
                    var endTime = new Date(bindData.exam.endTime)
                    var currentTime = new Date()
                    if (startTime < currentTime) {
                        bindData.isStart = true
                    }
                    if (endTime < currentTime) {
                        bindData.isEnd = true
                    }

                }
            } else {
                alert(res.data.message)
            }
        }
    )
}

onMounted(getExamByCid)

const onCancel = () => {
    router.push('/teacher/examdetail')
}

const onInsert = () => {
    axios({
        method: 'post',
        url: store.url + '/exam/insertExam',
        headers: {
            Authorization: store.token
        },
        data: bindData.exam
    }).then(
        res => {
            if (res.data.code == 200) {
                alert(res.data.message)
                router.push('/teacher/examdetail')
            }
            else {
                alert(res.data.message)
            }

        }
    )
}

const onEditQuestions = () => {
    router.push({
        path: '/teacher/editquestions',
        query: {
            eid: bindData.exam.eid
        }
    })
}


</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/mycourse' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/coursedetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item>创建考试</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-card shadow="hover">
            <el-form label-width="200px" :size="large">
                <el-form-item label="考试名称">
                    <el-input v-model="bindData.exam.name"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="bindData.exam.startTime" type="datetime" placeholder="Pick a Date"
                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="bindData.exam.endTime" type="datetime" placeholder="Pick a Date"
                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                </el-form-item>
                <el-form-item label="考试描述">
                    <el-input v-model="bindData.exam.description" type="textarea" rows="3"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="danger" size="large" @click="onCancel">取消</el-button>
                <el-button type="primary" size="large" @click="onInsert">创建</el-button>
                <el-button type="success" size="large" @click="onEditQuestions">编辑试题</el-button>
            </div>

        </el-card>
    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>
  