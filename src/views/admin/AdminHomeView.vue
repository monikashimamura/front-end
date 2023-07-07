<template>
  <!--顶端-->
  <div id="Top">

    <h1>admin</h1>
  </div>
  <!--选项卡-->
  <div class="admin-wrapper">
    <div class="sidebar">
      <ul class="tab-list">
        <li :class="{ active: activeTab === 'tab1' }" @click="changeTab('tab1')">
          <i class="icon fas fa-home"></i>
          <span>数据统计</span>
        </li>
        <li :class="{ active: activeTab === 'tab2' }" @click="changeTab('tab2')">
          <i class="icon fas fa-home"></i>
          <span>课程管理</span>
        </li>
        <li :class="{ active: activeTab === 'tab3' }" @click="changeTab('tab3')">
          <i class="icon fas fa-home"></i>
          <span>用户管理</span>
        </li>
        <li :class="{ active: activeTab === 'tab4' }" @click="changeTab('tab4')">
          <i class="icon fas fa-home"></i>
          <span>开课申请</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="scrollable-content">
        
        <!-- 这里放可滑动页面的内容 -->
        <div v-if="activeTab === 'tab1'">
        <!--扇形图-->
        <Tab_1></Tab_1>

      </div>
      <div v-if="activeTab === 'tab2'">
        <h2>课程管理</h2>
        <Tab_2></Tab_2>
        </div>
      <div v-if="activeTab === 'tab3'">
        <!-- <h2>用户管理</h2> -->
        <Tab_3></Tab_3>
      </div>
      <div v-if="activeTab === 'tab4'">
        <h2>开课申请</h2>
        <Tab_4></Tab_4>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab_1 from './tab_1.vue';
import Tab_2 from './tab_2.vue';
import Test from './test.vue';
import Tab_3 from './tab_3.vue';
import Tab_4 from './tab_4.vue'
export default {
 components:{
  Tab_1,
  Tab_2,
  Test,
  Tab_3,
  Tab_4
},

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
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

h1 {
  font-family: Arial, sans-serif;
  color: #fff;
  font-size: 24px;
  text-transform: uppercase;
  margin-left: 30px; /* 可选，添加左侧间距 */
}

.admin-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #d6dce0;
  padding: 20px;
  overflow: hidden; /* 添加 overflow 属性 */
}

.tab-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* 添加 overflow-y 属性 */
  max-height: calc(100vh - 50px); /* 设置最大高度，减去顶部的高度 */
}

.tab-list li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tab-list li:hover {
  background-color: #b3c2d5;
}

.tab-list li.active {
  background-color: #fefeff;
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
  background-color: #f5f5f5;
}

.scrollable-content {
  padding: 20px;
}
</style>
