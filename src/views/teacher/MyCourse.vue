<script setup>

import { reactive, onMounted, onUpdated } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const courses = reactive([
  {
    'cid': 3,
    'description': "金庸的武侠小说，你真的读懂了吗？",
'image': "../src/assets/jinyong.jpg",
'name': "金庸解读",
'scoreRule': "全部满分",
'startTime': "2023-07-03 16:29:48",
'status': 0,
'studentCount': 0,
'teacher': 2
  },
]);

const viewCourseDetails = (courseId) => {
      console.log("查看课程详情：" + courseId);

}

const getAllCourse = async () => {
    await axios({
        method: 'get',
        url: store.url + '/course/getCourseByTid/' + store.user.uid ,
    }).then(
        res => {
            if(res.data.code == 200) {
                courses.splice(0, courses.length, ...res.data.data);
            } else {
                alert(res.data.message)
            }
        }
    )
}

onMounted(getAllCourse);

</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的课程</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>{{ courses }}</div>


    <div class="main-card">
    <el-row>
      <el-col :span="24">
        <el-card v-for="(course, index) in courses" :key="index" class="course-card">
          <div class="card-content">
            <h3 class="card-title">{{ course.name }}</h3>
            <p class="card-description">{{ course.description }}</p>
          </div>
          <div class="card-actions">
            <el-button type="primary" @click="viewCourseDetails(course.id)">
              查看详情
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
@import "default.scss";
@import "template.scss";

.course-card {
  margin-bottom: 10px;
}

.card-content {
  padding: 10px;
}

.card-actions {
  text-align: right;
  padding: 10px 10px;
}
</style>
