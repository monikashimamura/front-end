<template>
  <div>
    <div class="course-list">
      <div class="table-header">
        <div class="table-header-cell" style="flex: 6;">课程名称</div>
        <div class="table-header-cell" style="flex: 6;">教师id</div>
        <div class="table-header-cell" style="flex: 3;">申请时间</div>
        <div class="table-header-cell" style="flex: 1;">操作</div>
      </div>
      <div class="course-item" v-for="(course, index) in filteredCourses" :key="course.cid" :class="{ 'highlight': hoverRow === index }" @click="showCourseDetails(course)">
        <div class="course-info">
          <div class="course-name">{{ course.name }}</div>
          <div class="course-teacher">{{ course.teacher }}</div>
          <div class="course-start-time">{{ course.startTime }}</div>
          <div class="course-actions">
            <button class="btn1" @click.stop="Refuse(course)">拒绝</button>
            <button class="btn2" @click.stop="Agree(course)">同意</button>
          </div>
        </div>
      </div>
    </div>
  <div class="modal" v-if="refuse">
    <div class="modal-content">
      <p class="pla">你确定拒绝 {{ myCourse ? myCourse.name : '' }} 吗？</p>
      <div>
        <button class="cancel-btn" @click="cancelRefuse">取消</button>
        <button class="confirm-btn" @click="confirmRefuse(myCourse.cid)">确定</button>
      </div>
    </div>
  </div>

  <div class="modal" v-if="agree">
    <div class="modal-content">
      <p>你确定同意 {{ myCourse ? myCourse.name : '' }} 吗？</p>
      <div>
        <button class="cancel-btn" @click="cancelAgree">取消</button>
        <button class="confirm-btn" @click="confirmAgree(myCourse.cid)">确定</button>
      </div>
    </div>
  </div>
    <div class="modal" v-if="selectedCourse">
      <div class="modal-content">
       
        <p>课程详情：{{ selectedCourse.description }}</p>
        <button class="close" @click="closeModal">确定</button>
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
      agree: false,
      refuse:false,
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
      const url = `http://localhost:10100/admin/getCourse?page=${this.currentPage - 1}&size=${this.pageSize}`;
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
    confirmRefuse(cid) {
      const url = `http://localhost:10100/admin/refuseCourse?id=${cid}`;
      fetch(url, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            // 删除成功，刷新课程列表
            this.fetchCourses();
            this.refuse = false;
          } else {
            console.error('操作失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('操作失败:', error);
        });
    },
    confirmAgree(cid) {
      const url = `http://localhost:10100/admin/agreeCourse?id=${cid}`;
      fetch(url, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            // 删除成功，刷新课程列表
            this.fetchCourses();
            this.agree = false;
          } else {
            console.error('操作失败:', data.message);
          }
        })
        .catch((error) => {
          console.error('操作失败:', error);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page; // 更新当前页码
      this.fetchCourses(); // 发送请求获取对应页的数据
    },
    
    Agree(course) {
      this.myCourse = course; // 将课程 ID 存储在组件的属性中
      this.agree = true;
     
    },
    Refuse(course) {
      this.myCourse = course; // 将课程 ID 存储在组件的属性中
      this.refuse = true;
      
    },
    cancelAgree() {
      this.agree = false;
    },
    cancelRefuse(){
      this.refuse=false;
    },
    closeModal() {
      this.selectedCourse = null;
    },
    showCourseDetails(course) {
      this.selectedCourse = course;
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
  background-color: #0691e8;
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

.btn1 {
  padding: 5px 10px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn2 {
  padding: 5px 10px;
  background-color: #076fb4;
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
/* top: 200px;
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
  margin-right: 30%;
}

.confirm-btn{
  position: relative;
  font-size:15px;
  background-color: #ff0000;
  color: #fff;
  

}

</style>

