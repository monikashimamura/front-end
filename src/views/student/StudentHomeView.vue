<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
import { Search, Medal, Trophy, Reading } from "@element-plus/icons-vue";
import coursePreview from "@/component/CoursePreview.vue";
import Ad from "@/component/Advertisement.vue";
const router = useRouter();

const stuHome = reactive({
  stu: {
    name: store.user.name,
    uid: store.user.uid,
    age: store.user.age,
    password: store.user.password,
    sex: store.user.sex,
    type: store.user.type,
    introduction: store.user.introduction,
    phoneNumber: store.user.phoneNumber,
    image: store.user.image,
  },
  coursePre: [
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
    {
      teacher: "孙笑川",
      course: {
        image: "../src/assets/jingjixue.jpg",
        description: "快速掌握计量经济学概念，解决现实经济管理问题！",
        teacher: 1,
        cid: 1,
      },
    },
  ],
  ad: [
    {
      image: "../src/assets/ad1.png",
      link: "https://www.baidu.com",
    },
    {
      image: "../src/assets/ad2.png",
      link: "https://www.baidu.com",
    },
    {
      image: "../src/assets/ad3.png",
      link: "https://www.baidu.com",
    },
    {
      image: "../src/assets/ad4.png",
      link: "https://www.baidu.com",
    },
  ],
  isLogin: false,
  searchText: "",
  defaultSearch: "搜索课程",
  ifHaveCourse: false,
  courseRecommend: false,
});

const init = () => {
  // 是否已经登录
  if (stuHome.stu.name == "") {
  } else {
    stuHome.isLogin = true;
  }

  // 是否有课
  stuHome.ifHaveCourse = false;

  // 推荐课程
  axios(store.url + "/course/getCourseRand", {
    headers: {
      Authorization: store.token,
    },
    params: {
      num: 6,
    },
  }).then((res) => {
    if (res.data.code == 200) {
      console.log(res.data);
      stuHome.coursePre = res.data.data;

    } else {
      console.log("请求课程推荐信息错误");
      console.log(res.data);
    }
  });
};
onMounted(init);

const toCourse = () => {
  if (!stuHome.isLogin) {
    router.push("/login");
    return;
  }
  stuHome.courseRecommend = true;
};

const toExam = () => {
  if (!stuHome.isLogin) {
    router.push("/login");
    return;
  }
  router.push("/student/exam");
};

const toGame = () => {
  if (!stuHome.isLogin) {
    router.push("/login");
    return;
  }
  router.push("/student/game");
};

const toLogin = () => {
  router.push("/login");
};

const search = () => {
  // 搜索功能
  if (!stuHome.isLogin) {
    router.push("/login");
    return;
  }
  if (stuHome.searchText == ""){
    alert("请输入搜索内容");
    return;
  }
  store.searchText = stuHome.searchText;
  router.push("/student/recommend")
};
</script>


<template>
  <div class="top-center">
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="toCourse">
        <el-icon><Reading /></el-icon>
        <el-text type="warning" size="large">课程</el-text>
      </el-menu-item>
      <div class="width-zhanwei"></div>
      <el-menu-item index="2">
        <el-icon><Medal /></el-icon>
        <el-text type="warning" size="large" @click="toGame">答题</el-text>
      </el-menu-item>
      <div class="width-zhanwei"></div>
      <el-menu-item index="3">
        <el-icon><Trophy /></el-icon>
        <el-text type="warning" size="large" @click="toExam">考试</el-text>
      </el-menu-item>

      <div class="search-input">
        <el-input
          type="text"
          v-model="stuHome.searchText"
          maxlength="32"
          :placeholder="stuHome.defaultSearch"
        />
        <div style="width: 20px"></div>
        <el-icon @click="search"><Search /></el-icon>
      </div>
      <div class="width-zhanwei"></div>
      <el-image
        :src="stuHome.stu.image"
        style="height: 60px; width: 60px"
        v-if="stuHome.stu.name"
      >
      </el-image>
      <el-button class="top-btn" @click="toLogin" round v-else>
        <el-text size="large">登录</el-text>
      </el-button>
    </el-menu>
  </div>

  <h2 v-if="stuHome.courseRecommend">课程推荐</h2>
  <div style="display: flex" v-if="stuHome.courseRecommend">
    <div class="inline">
      <course-Preview :course="stuHome.coursePre[0]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[1]"></course-Preview>
    </div>

    <div class="inline">
      <course-Preview :course="stuHome.coursePre[2]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[3]"></course-Preview>
    </div>

    <div class="inline">
      <course-Preview :course="stuHome.coursePre[4]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[5]"></course-Preview>
    </div>
  </div>

  <h2>广告</h2>
  <div style="display: flex">
    <Ad :ad="stuHome.ad[0]"></Ad>
    <Ad :ad="stuHome.ad[1]"></Ad>
    <Ad :ad="stuHome.ad[2]"></Ad>
  </div>

  <div class="height-zhanwei"></div>

  <h1>我的课程</h1>
  <div style="display: flex" v-if="stuHome.ifHaveCourse">
    <div class="inline">
      <course-Preview :course="stuHome.coursePre[0]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[1]"></course-Preview>
    </div>

    <div class="inline">
      <course-Preview :course="stuHome.coursePre[2]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[3]"></course-Preview>
    </div>

    <div class="inline">
      <course-Preview :course="stuHome.coursePre[4]"></course-Preview>
      <course-Preview :course="stuHome.coursePre[5]"></course-Preview>
    </div>
  </div>
  <div v-else class="center">
    <el-text type="primary" size="large">还未选择课程哦</el-text>
  </div>

  <div class="height-zhanwei"></div>
  <div class="height-zhanwei"></div>
</template>

<style>
@import "student.scss";
</style>