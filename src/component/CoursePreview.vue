<script>
import store from "@/store/store.js";
// import { useRouter } from "vue-router";
// const router = useRouter();
export default {
  props: ["course"],
  setup() {
    return {};
  },
  methods: {
    lookCourse(cid) {
      store.cid = cid;
      //router.push("./course");
    }
  }
};
</script>

<template>
  <router-link to="/student/course">
    <el-image class="imagePreview" :src="course.image" @click="lookCourse(course.cid)"></el-image>
  </router-link>
  <div class="inline">
    <el-text size="large" type="info"
      >授课教师：</el-text
    >
    <el-text size="large" type="primary"
      >{{ course.teacher }}</el-text
    >
  </div>
  <div>
      <el-text size="small" type="info">{{ course.description }}</el-text>
  </div>
</template>


<style>
@import "component.scss";
</style>