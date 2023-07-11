<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()

const course = reactive({
    course: {
        cid: store.cid,
        name: "",
        description: "",
        start_time: "",
        teacher: "",
        scoreRule: "",
        status: 1,
        image: "",
    },
    isDisabled: true
});



const onEdit = () => {
    course.isDisabled = !course.isDisabled
    console.log(course.isDisabled)
}

const onCancel = () => {
    course.isDisabled = !course.isDisabled
    init()
}

const onUpdate = () => {
    axios({
        method: 'post',
        url: store.url + '/course/updateCourse',
        data: {
            cid: course.course.cid,
            name: course.course.name,
            description: course.course.description,
            teacher: store.user.uid,
            score_rule: course.course.scoreRule,
            status: course.course.status,
            image: course.course.image
        },
    }).then(
        res => {
            if (res.data.code == 200) { //更改成功
                alert(res.data.message)
                course.isDisabled = !course.isDisabled
            }
            else {
                //保存失败
                alert(res.data.message)
            }
        }
    )
}

const onLectureDetail = () => {
    router.push('/teacher/lecturedetail')
}

const onExamDetail = () => {
    router.push('/teacher/examdetail')
}

const uploadImg = (res, file) => {
    // 将后端传递给前端的url保存
    if (res.code == 200) {
        course.course.image = res.data
        console.log(res.message)
        alert(res.message)
    }
    else {
        alert(res.message)
    }
}

</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>申请开课</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-form :model="course.course" label-width="200px" :size="large">
            <el-form-item label="课程封面">
                <el-image class="imageCourse" :src="course.course.image"></el-image>
                <el-upload action="http://127.0.0.1:10100/user/uploadImg" :show-file-list="false"
                    :on-success="uploadImg">
                    <el-button type="primary" style="margin-left: 50px;">上传文件</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="课程名">
                <el-input v-model="course.course.name" size="large" style="font-size: 16px;"></el-input>
            </el-form-item>

            <el-form-item label="课程简介">
                <el-input v-model="course.course.description" size="large" type="textarea" resize="none" rows="4"
                    style="font-size: 16px;"></el-input>
            </el-form-item>

            <el-form-item label="评分标准">
                <el-input v-model="course.course.scoreRule" size="large" type="textarea" resize="none" rows="4"
                    style="font-size: 16px;"></el-input>
            </el-form-item>
        </el-form>

        <div class="buttons">
            <el-button type="default" size="large" @click="onCancel">取消</el-button>
            <el-button type="primary" size="large" @click="onUpdate">保存</el-button>
            <el-button type="success" size="large" @click="onLectureDetail" style="margin-right: 40px;">章节详情</el-button>
        </div>
        
    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";

.imageCourse {
    height: 220px;
    width: 450px;
}

.el-form {
    width: 800px;
    margin-top: 50px;
    margin-left: 300px;
}

.buttons {
    margin-top: 50px;
   
}
</style>
  