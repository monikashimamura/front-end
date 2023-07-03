<template>
  <div class="user-management">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="请输入关键词" class="search-input">
      <button @click="search" class="search-button">搜索</button>
      <button @click="reset" class="reset-button">重置</button>
      <button @click="sortByAge" class="sort-button">按年龄排序</button>
      <button @click="sortByRegistrationTime" class="sort-button">按注册时间排序</button>
    </div>
    <div class="user-list">
      <div class="table-header">
        <div class="table-header-cell" style="flex: 3;">用户ID</div>
        <div class="table-header-cell" style="flex: 3;">用户名</div>
        <div class="table-header-cell" style="flex: 4;">性别</div>
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
          <div class="user-password">{{ user.password }}</div>
          <div class="user-actions">
            <button class="delete-btn" @click="deleteUser(user.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="selectedUser">
      <div class="modal-content">
        <button class="close" @click="closeModal">&times;</button>
        <p>用户详情：{{ selectedUser.description }}</p>
      </div>
    </div>
    <div class="page">
        <el-pagination
        v-model:current-page="currentPage"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="totalPages"
        :page-size="pageSize"
        :pager-count="7"
        @current-change="handleCurrentChange"
      />
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      hoverRow: null,
      searchText: '',
      selectedUser: null,
      currentPage: 1,
      pageSize: 10,
      totalPages: 100,
      background:true
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
      axios.get(url)
        .then(response => {
          console.log('Response:', response);
          this.users = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },

    
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
    deleteUser(userId) {
      const index = this.users.findIndex(user => user.id === userId);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
    showUserDetails(user) {
      this.selectedUser = user;
    },
    closeModal() {
      this.selectedUser = null;
    },
    search() {
      // Implement search logic
    },
    reset() {
      // Implement reset logic
    },
    sortByAge() {
      this.users.sort((a, b) => a.age - b.age);
    },
    sortByRegistrationTime() {
      // Implement sorting logic
    },
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
  background-color: #ffeb3b;
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
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 200px;
  right: 200px;
  font-size: 50px;
  color: #ec0d0d;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
