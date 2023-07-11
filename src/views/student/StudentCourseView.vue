<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
const router = useRouter();

const course = reactive({
  course: {
    cid: store.cid,
    name: "经济学",
    description: "学经济",
    start_time: "",
    teacher: "孙笑川",
    scoreRule: "全都0分",
    status: 1,
    image: "/src/assets/jingjixue.jpg",
  },
  joined: false
});

const init = () => {
  console.log(course.course.start_time);
  axios(store.url + "/course/getCourse", {
    headers: {
      Authorization: store.token,
    },
    params: {
      cid: course.course.cid,
      uid: store.user.uid
    },
  }).then((res) => {
    if (res.data.code == 200) {
      course.course = res.data.data.course;
      course.course.teacher = res.data.data.info.teacher;
      course.course.start_time = res.data.data.course.startTimeStr;
      console.log(res.data.data);
      if(res.data.data.info.join == "joined") {
        course.joined = true;
      }
      else {
        course.joined = false;
      }
    } else {
      console.log("请求课程详细信息错误");
      console.log(res.data);
    }
  });
};

onMounted(init);

const startStudy = (cid) => {

  store.cid = cid;
  router.push('study');
}
const startExam = (cid) => {

  store.cid = cid;
  router.push('examPre');
}
const joinUs = (cid) => {
  axios(store.url + "/course/joinCourse", {
    headers: {
      Authorization: store.token,
    },
    params: {
      cid: course.course.cid,
      uid: store.user.uid
    },
  }).then((res) => {
    if (res.status == 200) {
      course.joined = true;
    } else {
      console.log("加入课程出现错误");
      console.log(res);
    }
  });


}

const back = () => {
  router.push('/student');
}
</script>

<template>
  <div style="display: flex">

    <div>
      <el-image
        class="imageCourse"
        :src="course.course.image"
      ></el-image>
    </div>

    <div class="inline" style="margin: 30px">
      <div>
        <text class="big-text-front">课程名：</text>
        <text class="big-text-behind">{{ course.course.name }}</text>
      </div>
      <div>
        <text class="big-text-front">授课教师：</text>
        <text class="big-text-behind">{{ course.course.teacher }}</text>
      </div>
      <div>
        <text class="big-text-front">开课时间：</text>
      </div>
      <div>
        <text class="big-text-behind">{{ course.course.start_time }}</text>
      </div>
    </div>


    <div v-if="course.joined">
      <el-button class="study-btn"  @click="startStudy(course.course.cid)" round>
        <text class="big-text-front">开始学习</text>
      </el-button>
      <el-button class="exam-btn"  @click="startExam(course.course.cid)" round>
        <text class="big-text-front">考试信息</text>
      </el-button>
    </div>
    <div v-else>
      <el-button class="join-btn"  @click="joinUs(course.course.cid)" round>
        <text class="big-text-front">加入课程</text>
      </el-button>
    </div>
  </div>

  <div class="height-zhanwei"></div>



  <div class="inline">
    <div>
      <text class="info-text">
        {{ course.course.description }}
      </text>
    </div>
    <div style="height: 30px"></div>
    <div>
      <text class="info-text">
        评分细则：{{ course.course.scoreRule }}
      </text>
    </div>
  </div>
  <div class="height-zhanwei"></div>
  <el-button class="submit-btn" circle @click="back">返回主页</el-button>
</template>


<style>
@import "student.scss";
</style>