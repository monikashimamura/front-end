<template>
  <div>
        <el-input v-model="form.name"></el-input>
        <el-input v-model="form.description"></el-input>
    <input type="file" ref="form.file" @change="onFileChange">
    <button @click="upload">上传</button>
  </div>
  <div>{{ form }}</div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
import store from '@/store/store.js';

const form = ref({
          chapterId: '',
          courseId: store.cid,
          name: '',
          description: '',
      });
const file = reactive({ value: null });
const onFileChange = (event) => {
      file.value = event.target.files[0];
};

const props = defineProps(['chapter']);

const initChapterId = () => {
  form.value.chapterId = props.chapter.no;
}

const upload = () => {
  initChapterId();
      var formData = new FormData();
      formData.append("file", file.value);
      axios(
        {
          method: 'post',
          url: 'http://localhost:10100/upload',
          params: {
            chapterId: form.value.chapterId,
            courseId: form.value.courseId,
            name: form.value.name,
            description: form.value.description
          },
          data: formData
        }
      )
        .then(response => {
          // 处理响应数据
          console.log(response.data);
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
    }

</script>
