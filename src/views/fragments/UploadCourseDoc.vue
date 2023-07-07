<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="章节号" prop="chapter">
        <el-input v-model="form.chapterId"></el-input>
      </el-form-item>
      <el-form-item label="课件名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="课件描述" prop="description">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <input type="file" ref="form.file" @change="onFileChange">
    <button @click="uploadVideo">上传视频</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
          chapterId: '',
          courseId: 2,
          name: '',
          description: '',
      },
      file: null,
      uploadUrl: '/api/upload'
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadVideo() {
      var formData = new FormData();
      formData.append("file", this.file);
      // 创建一个 FormData 对象
      // 使用axios或其他HTTP库发送请求
      axios(
        {
          method: 'post',
          url: 'http://localhost:10100/upload',
          params: this.form,
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
  }
};
</script>
