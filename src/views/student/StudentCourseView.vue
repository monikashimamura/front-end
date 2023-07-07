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
});

const init = () => {
  console.log(course.course.start_time);
  axios(store.url + "/course/getCourse", {
    headers: {
      Authorization: store.token,
    },
    params: {
      cid: course.course.cid,
    },
  }).then((res) => {
    if (res.data.code == 200) {
      console.log(res.data);
      course.course = res.data.data.course;
      course.course.teacher = res.data.data.teacher;
      course.course.start_time = res.data.data.course.startTimeStr;
    } else {
      console.log("请求课程详细信息错误");
      console.log(res.data);
    }
  });
};

onMounted(init);

const startStudy = (cid) => {
  console.log(cid);
  store.cid = cid;
  router.push('study');
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

    <div>
      <el-button class="study-btn"  @click="startStudy(course.course.cid)" round>
        <text class="big-text-front">开始学习</text>
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
</template>


<style>
@import "student.scss";
</style>