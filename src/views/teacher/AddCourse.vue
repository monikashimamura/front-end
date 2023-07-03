<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';



</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>申请开课</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";
</style>
  