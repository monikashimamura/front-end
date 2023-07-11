<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const bindData = reactive({
    isEditLecture: true
})

</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>申请开课</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-form :model="course.course" label-width="200px" :size="large" :disabled="course.isDisabled">
            <el-form-item label="课程封面">
                <el-image class="imageCourse" :src="course.course.image"></el-image>
                <el-upload v-if="!course.isDisabled" action="http://127.0.0.1:10100/user/uploadImg" :show-file-list="false"
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

        <div class="buttons" v-if="course.isDisabled">
            <el-button type="primary" size="large" @click="onEdit" style="margin-right: 40px;">编辑</el-button>
            <el-button type="success" size="large" @click="onLectureDetail" style="margin-right: 40px;">章节详情</el-button>
            <el-button type="danger" size="large" @click="onExamDetail" style="margin-right: 40px;">考试详情</el-button>
        </div>
        <div class="buttons" v-else>
            <el-button type="default" size="large" @click="onCancel">取消</el-button>
            <el-button type="primary" size="large" @click="onUpdate">保存</el-button>
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
  