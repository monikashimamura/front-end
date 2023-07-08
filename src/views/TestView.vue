<!-- <template>
  <div>
    <h1>视频上传</h1>
    <input type="file" ref="fileInput" @change="onFileChange">
    <br>
    <label for="courseId">课程ID:</label>
    <input type="text" id="courseId" v-model="courseId">
    <br>
    <label for="chapterId">章节ID:</label>
    <input type="text" id="chapterId" v-model="chapterId">
    <br>
    <label for="name">名称:</label>
    <input type="text" id="name" v-model="name">
    <br>
    <label for="description">描述:</label>
    <textarea id="description" v-model="description"></textarea>
    <br>
    <button @click="uploadVideo">上传视频</button>
  </div>
</template>

<script>
<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const bindData = reactive({
	// 查询条件
	myCourse: [],
    totalNum: 0,
    pageNum: 0,
    pageSize: 3
})

onMounted(() => {
	getMyCourse();
});

const getMyCourse = async () => {

    await axios(store.url + '/course/getByTidPage', {
		headers: {
			Authorization: store.token
		},
        params: {
            tid: store.user.uid,
            page: bindData.pageNum,
            size: bindData.pageSize
        }
	}).then(
		res => {
			if (res.data.code == 200) {
				console.log(res.data);
				bindData.myCourse = res.data.data.records
				bindData.totalNum = res.data.data.total
				cons
export default {
  data() {
    return {
      file: null,
      courseId: '',
      chapterId: '',
      name: '',
      description: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadVideo() {
      // 创建一个 FormData 对象
      var formData = new FormData();

      // 添加参数到 FormData 对象
      formData.append('file', this.file);
      formData.append('courseId', this.courseId);
      formData.append('chapterId', this.chapterId);
      formData.append('name', this.name);
      formData.append('description', this.description);

      // 使用axios或其他HTTP库发送请求
      axios.post('http://localhost:10100/video/upload', formData)
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
 -->

 <template>
  <div>
    <video ref="videoPlayer" :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: "http://localhost:10100/uploads/1/video.mp4", // 视频的 URL
    };
  },
  mounted() {
    this.playVideo();
  },
  methods: {
    playVideo() {
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.play();
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要自行添加 */
</style>
