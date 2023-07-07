<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
const router = useRouter();

const course = reactive({
  course: {
    cid: store.cid,
  },
});

</script>

<template>
  <div>
      课程id为：{{ course.course.cid }}
  </div>
</template>


<style>
@import "student.scss";
</style>