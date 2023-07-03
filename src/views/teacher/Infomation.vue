<script setup>

import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const infomation = reactive({
    name: store.user.name,
    id: store.user.id,
    age: store.user.age,
    password: store.user.password,
    sex: store.user.sex,
    type: store.user.type,
    introduction: store.user.introduction,
    phoneNumber: store.user.phoneNumber,
    img: store.user.img, 
})

const fit = reactive("cover")

const onSubmit = () => {
    router.push('infoEdit')
}

</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card" >
        <el-form :model="infomation" label-width="200px" :size="large" disabled>
            <el-form-item label="头像">
                <el-avatar :size="160"
                    :src="infomation.img" :fit="fit"></el-avatar>
            </el-form-item>
            <el-col>
                <el-form-item label="姓名">
                    <el-input v-model="infomation.name" size="large" style="font-size: 16px;" ></el-input>
                </el-form-item>
            </el-col>

                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-radio-group v-model="infomation.sex" size="large">
                            <el-radio :label="1" size="large">男</el-radio>
                            <el-radio :label="0" size="large">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col >
                    <el-form-item label="年龄">
                        <el-input v-model="infomation.age" size="large" style="font-size: 16px;"></el-input>
                    </el-form-item>
                </el-col>
            <el-col>
                <el-form-item label="电话号码">
                    <el-input v-model="infomation.phoneNumber" size="large" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>

            <el-col>
                <el-form-item label="个人简介">
                    <el-input v-model="infomation.introduction" size="large" type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>

                
        </el-form>

        <el-button type="primary" size="large" @click="onSubmit">修改</el-button>

    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";

.el-form {
    margin: 50px 450px 50px 300px;
}

.el-form-item__label {
    font-size: 18px;
}

.main-card {
    display: block;
    text-align: center;
}
</style>
  