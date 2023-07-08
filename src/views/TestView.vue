<template>
  <!--顶端-->
  <div class="All">
  <div id="Top">
    <img id="logo" src="src\assets\xuelebao.png" alt="">
    <p>授课老师</p>
  </div>
  <!--选项卡-->
  <div class="admin-wrapper">
    <div class="sidebar">
      <ul class="tab-list">
        <li :class="{ active: activeTab === 'tab1' }" @click="changeTab('tab1')">
          <i class="icon fas fa-home"></i>
          <span>课程介绍</span>
        </li>
        <li :class="{ active: activeTab === 'tab2' }" @click="changeTab('tab2')">
          <i class="icon fas fa-home"></i>
          <span>评分标准</span>
        </li>
        <li :class="{ active: activeTab === 'tab3' }" @click="changeTab('tab3')">
          <i class="icon fas fa-home"></i>
          <span>课件</span>
        </li>
        <li :class="{ active: activeTab === 'tab4' }" @click="changeTab('tab4')">
          <i class="icon fas fa-home"></i>
          <span>测验与作业</span>
        </li>
        <li :class="{ active: activeTab === 'tab5' }" @click="changeTab('tab5')">
          <i class="icon fas fa-home"></i>
          <span>考试</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="scrollable-content">
        <div v-if="activeTab === 'tab1'">
          <h2>课程介绍</h2>
        </div>
        <div v-if="activeTab === 'tab2'">
          <h2>评分标准</h2>
        </div>
        <div v-if="activeTab === 'tab3'">
          <h2>课件</h2>
        </div>
        <div v-if="activeTab === 'tab4'">
          <h2>测验与作业</h2>
        </div>
        <div v-if="activeTab === 'tab5'">
          <h2>考试</h2>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
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
      activeTab: 'tab1' // 默认选中的选项卡
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    }
  },
  mounted() {

  }
};
</script>

<style>
#Top {
  width: 100%;
  height: 50px;
  background-color: rgb(0, 190, 251);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px; /* 添加顶部和选项卡之间的间隔 */
}

#logo {
  margin-left: 20px;
  width: auto;
  height: 100%;
}

.All{
  background-color: #f5f5f5;
}

.admin-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #ffffff;
  padding: 20px;
  overflow: hidden; /* 添加 overflow 属性 */
}

.tab-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* 添加 overflow-y 属性 */
  max-height: calc(100vh - 70px); /* 设置最大高度，减去顶部和底部的高度 */
}

.tab-list li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff; /* 设置选项卡的背景色为白色 */
}

.tab-list li:hover {
  /* background-color: rgb(233, 251, 245); */
  color: rgb(125, 202, 63); /* 鼠标悬停时设置字体颜色为 rgb(233, 251, 245) */
  font-weight: bold;
}

.tab-list li.active {
  background-color: rgb(233, 251, 245); /* 设置选中的选项卡背景色为 rgb(233, 251, 245) */
  color: #000; /* 设置选中的选项卡字体颜色为黑色 */
  font-weight: bold;
}

.icon {
  width: 24px;
  height: 24px;
  background-color: #6e8193;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #ffffff; /* 修改内容区域的背景色为淡灰色 */
  margin-left: 20px; /* 添加内容左侧的间隔 */
  margin-bottom: 20px; /* 添加内容底部的间隔 */
  border-radius: 8px; /* 添加内容区域的圆角 */
  padding: 10px; /* 添加内边距 */
}

.scrollable-content {
  padding: 20px;
}
</style>
