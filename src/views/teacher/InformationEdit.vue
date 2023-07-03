<script setup>

import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const information = reactive({
    user: {
        name: store.user.name,
        uid: store.user.id,
        age: store.user.age,
        password: store.user.password,
        sex: store.user.sex,
        type: store.user.type,
        introduction: store.user.introduction,
        phoneNumber: store.user.phoneNumber,
        img: store.user.img,
    }

})

const fit = reactive("cover")

const onCancel = () => {
    var confirmMsg = confirm('确定取消修改吗？')
    if (confirmMsg == true) {
        router.push('infomation')
    }
    
}

const onSave = () => {
    console.log(information.user.name)
    axios({
        method: 'post',
        url: store.url + '/user/updateUser',
        data: information.user,
    }).then(
        res => {
            if (res.data.code == 200) { //更改成功
                // 将更改值放到store中
                store.user.name = information.user.name
                store.user.age = information.user.age
                store.user.sex = information.user.sex
                store.user.introduction = information.user.introduction
                store.user.phoneNumber = information.user.phoneNumber
                store.user.img = information.user.img
                alert(res.data.message)

                router.push('infomation')
            }
            else {
                //保存失败
                alert(res.data.message)
            }
        }
    )
}

const uploadImg = (res, file) => {
    // 将后端传递给前端的url保存
    if (res.code == 200) {
        information.user.img = res.data
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
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        <el-form :model="information" label-width="200px" :size="large">
            <el-form-item label="头像">
                <el-avatar :size="160" :src="information.user.img" :fit="fit"></el-avatar>
                <el-upload action="http://127.0.0.1:10100/user/uploadImg" :show-file-list="false" :on-success="uploadImg">
                    <el-button type="primary" style="margin-left: 50px;">上传文件</el-button>
                </el-upload>
            </el-form-item>
            <el-col>
                <el-form-item label="姓名">
                    <el-input v-model="information.user.name" size="large" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="性别">
                    <el-radio-group v-model="information.user.sex" size="large">
                        <el-radio :label="1" size="large">男</el-radio>
                        <el-radio :label="0" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="年龄">
                    <el-input v-model="information.user.age" size="large" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="电话号码">
                    <el-input v-model="information.user.phoneNumber" size="large" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>

            <el-col>
                <el-form-item label="个人简介">
                    <el-input v-model="information.user.introduction" size="large" type="textarea"
                        :autosize="{ minRows: 6, maxRows: 8 }" style="font-size: 16px;"></el-input>
                </el-form-item>
            </el-col>
        </el-form>

        <el-button type="default" size="large" @click="onCancel">取消</el-button>
        <el-button type="primary" size="large" @click="onSave">保存</el-button>

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
  