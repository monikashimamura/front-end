<script>
// import store from "@/store/store.js";
// import { useRouter } from "vue-router";
// const router = useRouter();

export default {
  props: ["question"],
  data() {
    return {
      radio1: 0,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      radio2: 0,
      confirmed: false
    };
  },
  methods: {
    change() {
      this.confirmed = false;
    },
    sendAnswer(eqid, answer, eid, orde){
      this.confirmed = true;
      this.$emit('listenToAnswer', eqid, answer,orde)
    }
  },
};
</script>

<template>
  <div class="center">
    <div v-if="question.question.type == 1">
      <div>
        <el-text size="large" type="info"> {{ question.orde }}. {{ question.question.stem }}(单选) </el-text>
      </div>
      <el-radio-group v-model="radio1" @click="change">
        <el-radio label="8" size="large">A. {{ question.question.a }}</el-radio>
        <el-radio label="4" size="large">B. {{ question.question.b }}</el-radio>
        <el-radio label="2" size="large">C. {{ question.question.c }}</el-radio>
        <el-radio label="1" size="large">D. {{ question.question.d }}</el-radio>
      </el-radio-group>
      <br>
      <el-button @click="sendAnswer(question.id, this.radio1, question.eid, question.orde)" :class="confirmed ? 'confirm' : 'unconfirm'">确认</el-button>
    </div>

    <div v-if="question.question.type == 2">
      <div>
        <el-text size="large" type="info"> {{ question.orde }}. {{ question.question.stem }}(多选) </el-text>
      </div>
      <el-checkbox v-model="checked1" label="8" @click="change"
        >A. {{ question.question.a }}</el-checkbox
      >
      <el-checkbox v-model="checked2" label="4" @click="change"
        >B. {{ question.question.b }}</el-checkbox
      >
      <el-checkbox v-model="checked3" label="2" @click="change"
        >C. {{ question.question.c }}</el-checkbox
      >
      <el-checkbox v-model="checked4" label="1" @click="change"
        >D. {{ question.question.d }}</el-checkbox
      >
      <br>
      <el-button @click="sendAnswer(question.id, this.checked1 * 8 + this.checked2 * 4 + this.checked3 * 2 + this.checked4 * 1, question.eid, question.orde)" :class="confirmed ? 'confirm' : 'unconfirm'">确认</el-button>
    </div>

    <div v-if="question.question.type == 3">
      <div>
        <el-text size="large" type="info"> {{ question.orde }}. {{ question.question.stem }}(判断) </el-text>
      </div>
      <el-radio-group v-model="radio2" @click="change">
        <el-radio label="8" size="large">对</el-radio>
        <el-radio label="4" size="large">错</el-radio>
      </el-radio-group>
      <br>
      <el-button @click="sendAnswer(question.id, this.radio2, question.eid, question.orde)" :class="confirmed ? 'confirm' : 'unconfirm'">确认</el-button>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>


<style>
@import "component.scss";
</style>