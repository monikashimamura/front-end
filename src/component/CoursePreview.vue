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
    },
  },
};
</script>

<template>
  <div class="inline">
    <router-link to="/student/course">
      <el-image class="imagePreview" :src="course.course.image" @click="lookCourse(course.course.cid)"></el-image>
    </router-link>
    <div>
      <el-text size="large" type="info">授课教师：</el-text>
      <el-text size="large" type="primary">{{ course.teacher }}</el-text>
    </div>
    <div>
      <el-text size="small" type="info">{{ course.course.description }}</el-text>
    </div>
  </div>
</template>


<style>
@import "component.scss";
</style>