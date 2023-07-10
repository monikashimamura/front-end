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
    hasExam: false,
    isStart: false,
    isEnd: false,
    isOnEdit: false
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

const onEdit = () => {
    bindData.isOnEdit = !bindData.isOnEdit
}

const onCancel = () => {
    bindData.isOnEdit = !bindData.isOnEdit
    getExamByCid()
}

const onUpdate = () => {
    axios({
        method: 'post',
        url: store.url + '/exam/updateExam',
        headers: {
            Authorization: store.token
        },
        data: bindData.exam
    }).then(
        res => {
            if (res.data.code == 200) {
                alert(res.data.message)
                bindData.isOnEdit = !bindData.isOnEdit
            }
            else {
                alert(res.data.message)
            }
        }
    )
}

const onDelete = () => {
    var confirmMsg = confirm('确定删除吗？')
    if (confirmMsg == true) {
        axios({
            method: 'get',
            url: store.url + '/exam/deleteExam',
            headers: {
                Authorization: store.token
            },
            params: {
                eid: bindData.exam.eid
            }
        }).then(
            res => {
                if (res.data.code == 200) {
                    alert(res.data.message)
                }
                else {
                    alert(res.data.message)
                }
            }
        )
        router.push('/teacher/coursedetail')
    }

}

const onNewExam = () => {
    router.push('/teacher/addexam')
}


</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/mycourse' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/coursedetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item>考试详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <div v-if="bindData.hasExam">
            <div v-if="bindData.isEnd">
                考试已经结束
            </div>
            <div v-else-if="bindData.isStart">
                考试正在进行中
            </div>
            <div v-else>
                考试还未开始!
                <el-card shadow="hover">
                    <el-form label-width="200px" :size="large" :disabled="!bindData.isOnEdit">
                        <el-form-item label="考试名称">
                            <el-input v-model="bindData.exam.name"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <el-date-picker v-model="bindData.exam.startTime" type="datetime" placeholder="Pick a Date"
                                format="YYYY/MM/DD HH:mm:ss" value-format="YYYY/MM/DD HH:mm:ss"/>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker v-model="bindData.exam.endTime" type="datetime" placeholder="Pick a Date"
                                format="YYYY/MM/DD HH:mm:ss" value-format="YYYY/MM/DD HH:mm:ss"/>
                        </el-form-item>
                        <el-form-item label="考试描述">
                            <el-input v-model="bindData.exam.description" type="textarea" rows="3"></el-input>
                        </el-form-item>
                    </el-form>

                    <div v-if="bindData.isOnEdit">
                        <el-button type="default" size="large" @click="onCancel">取消</el-button>
                        <el-button type="success" size="large" @click="onUpdate">保存</el-button>
                    </div>
                    <div v-else>
                        <el-button type="primary" size="large" @click="onEdit">编辑</el-button>
                        <el-button type="success" size="large" @click="onCancel">查看试题</el-button>
                        <el-button type="danger" size="large" @click="onDelete">删除</el-button>
                    </div>

                </el-card>
            </div>
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
  