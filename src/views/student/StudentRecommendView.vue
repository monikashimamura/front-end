<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
import coursePreview from "@/component/CoursePreview.vue";
const router = useRouter();

const rec = reactive({
  key: store.searchText,
  coursePre: [


  ],
  temp: 0


});

const init = () => {


  axios(store.url + "/course/getCourseRecommend", {
    headers: {
      Authorization: store.token,
    },
    params: {
      key: rec.key
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
      <course-Preview :course="course" style="flex: {{ (rec.temp++)%3 + 1 }}"></course-Preview>
  </div>








</template>

<style>
@import "student.scss";
</style>