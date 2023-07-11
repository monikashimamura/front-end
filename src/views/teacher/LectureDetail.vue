<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import displayChapters from "./CourseDetailEdit/DisplayChapters.vue";


</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/courseDetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item>章节详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <displayChapters />
    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>
