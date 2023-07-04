<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
import coursePreview from "@/component/CoursePreview.vue";
const router = useRouter();

const rec = reactive({
  coursePre: [

  ],


});

const init = () => {


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
      rec.coursePre = res.data.data;

    } else {
      console.log("请求课程推荐信息错误");
      console.log(res.data);
    }
  });
};
onMounted(init);




</script>


<template>

  <h2>课程推荐</h2>
  <div style="display: flex" v-for="course in rec.coursePre" :key="course.cid">
      <course-Preview :course="course"></course-Preview>
  </div>








</template>

<style>
@import "student.scss";
</style>