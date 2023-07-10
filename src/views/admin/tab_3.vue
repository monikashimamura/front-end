<template>
  <div class="user-management">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="请输入关键词" class="search-input">
      <button @click="search" class="search-button">搜索</button>
      <button @click="reset" class="reset-button">重置</button>
      <button @click="sortByAgeT" class="sort-button">年龄正序</button>
      <button @click="sortByAgeF" class="sort-button">年龄倒序</button>
      <button @click="Teacher" class="sort-button">只看老师</button>
      
      <button @click="Student" class="sort-button">只看学生</button>
    </div>
    <div class="user-list">
      <div class="table-header">
        <div class="table-header-cell" style="flex: 3;">用户ID</div>
        <div class="table-header-cell" style="flex: 3;">用户名</div>
        <div class="table-header-cell" style="flex: 3;">性别</div>
        <div class="table-header-cell" style="flex: 3;">年龄</div>
        <div class="table-header-cell" style="flex: 3;">手机号码</div>
        <div class="table-header-cell" style="flex: 5;">账号密码</div>
        <div class="table-header-cell" style="flex: 1;">操作</div>
      </div>
      <div class="user-item" v-for="(user, index) in paginatedUsers" :key="user.uid" :class="{ 'highlight': hoverRow === index }" @click="showUserDetails(user)">
        <div class="user-info">
          <div class="user-id">{{ user.uid }}</div>
          <div class="user-username">{{ user.name }}</div>
          <div class="user-gender">{{ user.sex === 0 ? '女' : '男' }}</div>
          <div class="user-age">{{ user.age }}</div>
          <div class="user-phone">{{ user.phoneNumber }}</div>
          <!-- <div class="user-password">{{ user.password }}</div> -->
          <div class="user-password"> ****** </div>

          <div class="user-actions">
            <button class="update-btn" @click.stop="showPopup(user)">修改密码</button>
            <button class="delete-btn" @click.stop="confirmDeleteUser(user)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showConfirmation">
      <div class="modal-content">
        <p>你确定删除 {{ selectedUser.name }} 的账号吗？</p>
        <div>
          <button class="cancel-btn" @click="cancelDelete">取消</button>
          <button class="confirm-btn" @click="deleteUser(selectedUser)">确定</button>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showUserModal">
      <div class="modal-content">
        <h2>用户详情</h2>
        <p>用户ID: {{ selectedUser.uid }}</p>
        <p>用户名: {{ selectedUser.name }}</p>
        <p>性别: {{ selectedUser.sex === 0 ? '女' : '男' }}</p>
        <p>年龄: {{ selectedUser.age }}</p>
        <p>手机号码: {{ selectedUser.phoneNumber }}</p>
        <!-- <p>账号密码: {{ selectedUser.password }}</p> -->
        <button class="close" @click="closeUserModal">关闭</button>
      </div>
    </div>
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
    
        <!-- 修改密码容器 -->
        <div v-if="isPopupVisible" class="up">
      <!-- 弹窗内容 -->
      <div class="up-content">
        <label for="passwordInput">请输入密码:</label>
        <input type="password" id="passwordInput" v-model="password">
        <br>
        <label for="confirmPasswordInput">请再次输入密码:</label>
        <input type="password" id="confirmPasswordInput" v-model="confirmPassword">
        <br>
        <button class="cancel-btn" @click="cancel">取消</button>
        <button class="confirm-btn" @click="confirm(updateUser)">确定</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { computeHash } from "./mysha256";
export default {
  data() {
    return {
      users: [],
      hoverRow: null,
      searchText: '',
      selectedUser: null,
      currentPage: 1,
      pageSize: 8,
      totalPages: 100,
      background: true,
      showConfirmation: false,
      showUserModal: false,
      isPopupVisible: false,
      password: '',
      confirmPassword: '',
    };
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
  },
  methods: {
    fetchUsers() {
      const url = `http://localhost:10100/admin/getAllUser?page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    },
    search(){
      const keyword = encodeURIComponent(this.searchText.trim());
      const url = `http://localhost:10100/admin/getUserBySearch?like=${keyword}&page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    },
    sortByAgeT(){
      const url = `http://localhost:10100/admin/getUserAgeT?page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    },
    sortByAgeF(){
      const url = `http://localhost:10100/admin/getUserAgeF?page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    },
    Teacher(){
      const url = `http://localhost:10100/admin/getTeacher?page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });

    },
    Student(){
      const url = `http://localhost:10100/admin/getStudent?page=${this.currentPage - 1}&size=${this.pageSize}`;
      axios
        .get(url)
        .then((response) => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });

    },

    reset(){
      this.searchText = ''; // 将搜索文本置为空字符串
     this.currentPage = 1; // 将当前页码重置为1
     this.fetchUsers(); // 重新获取用户数据
    },

    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
    confirmDeleteUser(user) {
      this.selectedUser = user;
      this.showConfirmation = true;
    },
    cancelDelete() {
      this.showConfirmation = false;
    },
    deleteUser(user) {
      const index = this.users.findIndex((u) => u.uid === user.uid);
      if (index !== -1) {
        // 发送删除请求到后端
        axios
          .delete(`http://localhost:10100/admin/deleteUser?id=${user.uid}`)
          .then((response) => {
            console.log('User deleted successfully:', response);
            // 删除成功后从前端列表中移除该用户
            this.users.splice(index, 1);
            this.showConfirmation = false;
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
    },
    showUserDetails(user) {
      this.selectedUser = user;
      this.showUserModal = true;
    },
    closeUserModal() {
      this.showUserModal = false;
    },

    showPopup(user) {
      this.updateUser=user;
      this.isPopupVisible = true;
    },
    cancel() {
      this.isPopupVisible = false;
    },
    confirm(user) {
      if (this.password.length < 6) {
        alert('密码长度至少为六位');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }

      // 执行密码更新的逻辑
      axios.put(`http://localhost:10100/admin/updatePassword?id=${user.uid}&password=${computeHash(this.password)}`)
      .then((data)=>{
        if(data.data.code==200){
          this.password='';
          this.confirmPassword='';
          alert("修改密码成功")
        }
      }).catch((error)=>{
        alert("修改密码失败")
      });

      this.isPopupVisible = false; // 关闭弹窗
    }


   
  },
};
</script>


<style scoped>
.user-management {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
}

.search-button,
.reset-button,
.sort-button {
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.user-list {
  background-color: #f5f5f5;
  padding: 10px;
  width: 100%;
  height: 480px;
}

.table-header {
  display: flex;
  background-color: #ccc;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #999;
}

.table-header-cell {
  text-align: left;
  padding: 5px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #999;
  cursor: pointer;
}

.highlight {
  background-color: #d0c98b;
}

.user-info {
  display: flex;
  flex: 1;
}

.user-id,
.user-username,
.user-gender,
.user-age,
.user-phone,
.user-password {
  flex: 1;
  padding: 5px;
}

.user-actions {
  flex: 1;
  text-align: right;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.update-btn {
  padding: 5px 10px;
  background-color: #0091ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.close {
  position: relative;
 /*  top: 500px;
  right: 200px; */
  margin-left:50%;
  font-size: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
}
.page {
  position: relative;
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

.up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.up-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.up-content label {
  text-align: right;
}

.up-content input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

</style>
