
<template>
  <div>
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="请输入关键词">
      <button @click="search">搜索</button>
      <button @click="reset">重置</button>
      <button @click="sortByEnrollment">按人数排序</button>
      <button @click="sortByStartTime">按开始时间排序</button>
    </div>
    <div class="course-list">
      <div class="table-header">
        <div class="table-header-cell" style="flex: 6;">课程名称</div>
        <div class="table-header-cell" style="flex: 6;">授课老师</div>
        <div class="table-header-cell" style="flex: 3;">开始时间</div>
        <div class="table-header-cell" style="flex: 3;">人数</div>
        <div class="table-header-cell" style="flex: 1;">操作</div>
      </div>
      <div class="course-item" v-for="(course, index) in filteredCourses" :key="course.cid" :class="{ 'highlight': hoverRow === index }" @click="showCourseDetails(course)">
        <div class="course-info">
          <div class="course-name">{{ course.name }}</div>
          <div class="course-teacher">{{ course.teacher }}</div>
          <div class="course-start-time">{{ course.startTime }}</div>
          <div class="course-enrollment">{{ course.studentCount }}</div>
          <div class="course-actions">
            <button class="delete-btn" @click="deleteCourse(course.cid)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="selectedCourse">
      <div class="modal-content">
        <button class="close" @click="closeModal">&times;</button>
        <p>课程详情：{{ selectedCourse.description }}</p>
      </div>
    </div>
    <!-- 分页组件 -->
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        :background="background"
        layout=" prev, pager, next, jumper"
        :total="totalPages"
        :page-size="pageSize"
        :page-count="100"
        :pager-count="7"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      hoverRow: null,
      searchText: '',
      selectedCourse: null,
      currentPage: 1,
      pageSize: 10,
      totalPages: 100,
    };
  },
  mounted() {
    this.fetchCourses();
  },
  computed: {
    filteredCourses() {
      const keyword = this.searchText.trim().toLowerCase();
      return this.courses.filter(
        course =>
          course.name.toLowerCase().includes(keyword) ||
          course.description.toLowerCase().includes(keyword) ||
          course.teacher.toLowerCase().includes(keyword)
      );
    },
  },
  methods: {
    fetchCourses() {
      const url = `http://localhost:10100/admin/getAllCourse?page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch(error => {
          console.error('请求失败:', error);
        });},
        handleCurrentChange(page) {
      this.currentPage = page; // 更新当前页码
      this.fetchCourses(); // 发送请求获取对应页的数据
      console.log("我被调用了");
    },

    deleteCourse(cid) {
      // 根据课程cid删除课程
    },
    showCourseDetails(course) {
      this.selectedCourse = course;
    },
    closeModal() {
      this.selectedCourse = null; // 关闭弹窗
    },
    search() {
      this.currentPage = 1; // 搜索时将当前页重置为第一页
      this.fetchCourses();
    },
    reset() {
      this.searchText = ''; // 重置搜索关键词
      this.currentPage = 1; // 重置当前页为第一页
      this.fetchCourses();
    },
    sortByEnrollment() {
      this.courses.sort((a, b) => a.studentCount - b.studentCount);
    },
    sortByStartTime() {
      this.courses.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    },
  },
};
</script>

  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .search-bar input {
    flex: 1;
    margin-right: 10px;
    padding: 5px;
  }
  
  .search-bar button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .course-list {
    width: 100%;
    height: 480px;
  }
  
  .table-header {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  .table-header-cell {
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  
  .course-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    transition: background-color 0.3s;
    cursor: pointer;
  }
  
  .course-item:hover {
    background-color: #e5e5e5;
  }
  
  .highlight {
    background-color: #c3c3c3;
  }
  
  .course-info {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .course-name {
    flex: 7;
  }
  
  .course-teacher {
    flex: 5;
  }
  
  .course-start-time {
    flex: 4;
  }
  
  .course-enrollment {
    flex: 3;
  }
  
  .course-actions {
    display: flex;
    align-items: center;
  }
  
  .delete-btn {
    padding: 5px 10px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .modal-content {
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
  }
  


  .close {
  position: absolute;
  top: 200px;
  right: 300px;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
}

.page{
  position:relative;
  margin-top: 150px;
  margin-left: 25%;
}
  </style>
  