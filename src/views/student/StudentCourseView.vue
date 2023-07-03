<script setup>
import { reactive, onMounted} from "vue";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
const router = useRouter();


const course = reactive({
  course: {
    id: store.cid
  }
})
</script>

<template>
  <div id="app">
    该课程的id为{{ course.course.id }}
  </div>
</template>