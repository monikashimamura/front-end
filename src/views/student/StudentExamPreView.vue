<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";

const router = useRouter();

const bindData = reactive({
  exam: {
    eid: store.eid,
    cid: store.cid,
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  },
  cid: store.cid,
  hasExam: false,
  isStart: false,
  isEnd: false,
  isOnEdit: false,
});

const getExamByCid = async () => {
  await axios({
    method: "get",
    url: store.url + "/exam/getExam",
    headers: {
      Authorization: store.token,
    },
    params: {
      cid: bindData.cid,
    },
  }).then((res) => {
    if (res.data.code == 200) {
      if (res.data.data == null) {
        bindData.hasExam = false;
      } else {
        bindData.hasExam = true;
        bindData.exam = res.data.data;
        var startTime = new Date(bindData.exam.startTime);
        var endTime = new Date(bindData.exam.endTime);
        store.endTime = res.data.data.endTime;
        var currentTime = new Date();
        if (startTime < currentTime) {
          bindData.isStart = true;
        }
        if (endTime < currentTime) {
          bindData.isEnd = true;
        }
      }
    } else {
      alert(res.data.message);
    }
  });
};

onMounted(getExamByCid);

const startExam = () => {

  axios({
    method: "get",
    url: store.url + "/exam/startExam",
    headers: {
      Authorization: store.token,
    },
    params: {
      eid: bindData.exam.eid,
      uid: store.user.uid
    },
  }).then((res) => {
    store.eid = bindData.exam.eid;
    router.push("exam");
  });

};
</script>

<template>
  <el-card class="main-card">
    <div v-if="bindData.hasExam">
      <div v-if="bindData.isEnd">考试已经结束</div>
      <div v-else-if="bindData.isStart">
        考试正在进行中
        <el-form
          label-width="200px"
          :size="large"
          :disabled="!bindData.isOnEdit"
        >
          <el-form-item label="考试名称">
            <el-input v-model="bindData.exam.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="bindData.exam.startTime"
              type="datetime"
              placeholder="Start Date"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="bindData.exam.endTime"
              type="datetime"
              placeholder="End Date"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="考试描述">
            <el-input
              v-model="bindData.exam.description"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="large" @click="startExam"
          >开始考试</el-button
        >
      </div>
      <div v-else>考试还未开始</div>
    </div>
    <div v-else>老师还未安排考试</div>
  </el-card>
</template>

<style>
@import "student.scss";
</style>
