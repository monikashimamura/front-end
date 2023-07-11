<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useRouter } from "vue-router";
import question from "@/component/Question.vue";
const router = useRouter();
const exam = reactive({
  q: [],
  uid: store.user.uid,
  panjuan: [],
  eid: store.eid,
  endTime: store.endTime,
  timer: null
});
const init = () => {
  axios(store.url + "/exam/getQuestion", {
    headers: {
      Authorization: store.token,
    },
    params: {
      eid: exam.eid,
      uid: exam.uid,
    },
  }).then((res) => {
    if (res.data.code == 200) {
      console.log(res.data);
      exam.q = res.data.data.questions;
      exam.panjuan = new Array(exam.q.length);
      for (var i = 0; i < exam.q.length; i++) {
        var panjuanItem = {
          eqid: exam.q[i].id,
          answer: 0,
        };
        exam.panjuan[i] = panjuanItem;
      }

      if (res.data.data.score == "-1") {
        alert("您已经完成考试！");
        router.push("course");
      }
    } else {
      console.log("请求考试题目信息错误");
      console.log(res.data);
    }
  });
};
onMounted(init);

// const formReqData = (data) => {
//   return {
//     answers: data.panjuan,
//     eid: data.eid,
//     uid: data.uid,
//   };
// };

const submit = () => {
  //var params = new URLSearchParams();

  //params.append("answers", exam.panjuan);

  axios({
    method: "post",
    url: store.url + "/exam/submit",
    data: exam.panjuan,
    params: {
      eid: exam.eid,
      uid: exam.uid,
    },
    headers: { "Content-Type": "application/json; charset=utf-8" },
  }).then((res) => {
    if (res.data.code == 200) {
      alert("交卷成功");
      router.push("course");
    } else {
      console.log("交卷失败");
      alert(res.data.message);
    }
  });
};

const getAnswer = (eqid, answer, orde) => {
  // exam.panjuanItem.eqid = eqid;
  // exam.panjuanItem.answer = answer;
  // exam.panjuanItem.eid = eid;
  // exam.panjuanItem.uid = exam.uid;
  // exam.panjuan.push(exam.panjuanItem);
  // exam.panjuan[orde - 1] = exam.panjuanItem;
  // exam.panjuan.splice(orde - 1, 1, exam.panjuanItem);
  exam.panjuan[orde - 1].eqid = eqid;
  exam.panjuan[orde - 1].answer = answer;
  // exam.panjuan[orde - 1].eid = eid;
  // exam.panjuan[orde - 1].uid = exam.uid;
  // console.log(exam.panjuan);
};

// setInterval(() => {
//   var nowTime = new Date();
//   var temp = new Date(exam.endTime);
//   if (nowTime > temp) {
//     submit();
//   }
// }, 10000);

const autoSubmit = () => {
  var nowTime = new Date();
  var temp = new Date(exam.endTime);
  if (nowTime > temp) {
    submit();
  }
};

onMounted(() => {

  exam.timer = setInterval(() => {
   autoSubmit();
  }, 10000);
});

onUnmounted(() => {
  clearInterval(exam.timer);
  exam.timer = null;
});
</script>

<template>
  <div class="center">
    <div>
      <text class="big-text-front">考试结束时间：</text>
      <text class="big-text-behind">{{ exam.endTime }}</text>
    </div>
    <div class="height-zhanwei"></div>
    <div v-for="que in exam.q" :key="que.id">
      <question :question="que" v-on:listenToAnswer="getAnswer"></question>
    </div>
    <el-button class="submit-btn" circle @click="submit">交卷</el-button>
  </div>
</template>


<style>
@import "student.scss";
</style>