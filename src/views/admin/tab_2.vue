<template>
  <div>
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="请输入关键词">
      <button class="button" @click="search">搜索</button>
      <button class="button" @click="reset">重置</button>
      <button class="button" @click="sortByCountT">人数正序</button>
      <button class="button" @click="sortByCountF">人数倒序</button>
      <button class="button" @click="sortByTimeT">时间正序</button>
      <button class="button" @click="sortByTimeF">时间倒序</button>
    </div>
    <div class="course-list">
      <div class="table-header">
        <div class="table-header-cell" style="flex: 6;">课程名称</div>
        <div class="table-header-cell" style="flex: 6;">教师id</div>
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
            <button class="delete-btn" @click.stop="confirmDelete(course)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showConfirmation">
    <div class="modal-content">
      <p>你确定删除{{ myCourse ? myCourse.name : '' }}这门课吗？</p>
      <div>
        <button class="cancel-btn" @click="cancelDelete">取消</button>
        <button class="confirm-btn" @click="deleteCourse(myCourse.cid)">确定</button>
      </div>
    </div>
  </div>
    <div class="modal" v-if="selectedCourse">
      <div class="modal-content">
        
        <p>课程详情：{{ selectedCourse.description }}</p>
        <button class="close" @click="closeModal"><!-- &times; -->确定</button>
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
      pageSize: 8,
      totalPages: 100,
      showConfirmation: false,
      cid: null,
      myCourse:null,
    };
  },
  mounted() {
    this.fetchCourses();
  },
  computed: {
    filteredCourses() {
      const keyword = this.searchText.trim().toLowerCase();
      return this.courses.filter(
        (course) =>
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
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });
    },
    search(){
      const keyword = encodeURIComponent(this.searchText.trim());
      const url = `http://localhost:10100/admin/getCourseBySearch?like=${keyword}&page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });
    },
    reset(){
      this.searchText = ''; // 将搜索文本置为空字符串
     this.currentPage = 1; // 将当前页码重置为1
     this.fetchCourses(); // 重新获取课程数据

    },
    sortByCountT(){
      const url = `http://localhost:10100/admin/courseCountT?page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });

    },
    sortByCountF(){
      const url = `http://localhost:10100/admin/courseCountF?page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });

    },
    sortByTimeT(){
      const url = `http://localhost:10100/admin/courseTimeT?page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });

    },
    sortByTimeF(){
      const url = `http://localhost:10100/admin/courseTimeF?page=${this.currentPage - 1}&size=${this.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.courses = data.data;
            this.totalPages = Math.ceil(data.total / this.pageSize); // 使用总数计算总页数
          } else {
            console.error('请求失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('请求失败:', error);
        });

    },
    handleCurrentChange(page) {
      this.currentPage = page; // 更新当前页码
      this.fetchCourses(); // 发送请求获取对应页的数据
    },
    
    confirmDelete(course) {
      /* event.stopPropagation(); // 停止事件传播 */
      this.showConfirmation = true;
      this.myCourse = course; // 将课程 ID 存储在组件的属性中
    },
    cancelDelete() {
      this.showConfirmation = false;
    },
    closeModal() {
      this.selectedCourse = null;
    },
    deleteCourse(cid) {
      const url = `http://localhost:10100/admin/deleteCourse/${cid}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            // 删除成功，刷新课程列表
            this.fetchCourses();
            this.showConfirmation = false;
          } else {
            console.error('删除失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('删除失败:', error);
        });
    },
    showCourseDetails(course) {
      this.selectedCourse = course;
    },
  },
};
</script>



<style scoped>
.button{
  padding: 5px 10px;
  margin-right: 10px;
  background-color: rgb(8, 32, 243);
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
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
  background-color: #1d75f9;
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
position: relative;
/* top: 500px;
right: 300px; */
margin-left: 50%;
font-size: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
}

.page{
position:relative;
margin-top: 20px;
margin-left: 25%;
}

.cancel-btn{
  position: relative;
  font-size:15px;
  background-color: #007bff;
  color: #fff;
  margin-right: 40%;
}

.confirm-btn{
  position: relative;
  font-size:15px;
  background-color: #ff0000;
  color: #fff;
  

}


</style>
