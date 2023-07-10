<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const bindData = reactive({
    questions: [
        {
            qid: 0,
            orde: 0,
            score: 0,
            eid: 0
        }
    ]
})



</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/mycourse' }">我的课程</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/coursedetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/examdetail' }">考试详情</el-breadcrumb-item>
            <el-breadcrumb-item>考试编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>