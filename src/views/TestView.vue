<script setup>
import { reactive,onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
const state = reactive({
  count: store.count,
  message: "默认消息",
  params: {
    name: "lihao",
    password: "114514"
  }
});

const setCount = () => {
  state.count++;
};

const test = async () => {
  await axios(store.url + '/test/testUser', {
    headers: {
      Authorization: store.token
    },
    params: {
      id: 114514,

    }
  }).then(
    res => {
      if(res.data.code == 200){
        console.log(res.data);
      }
    }
  )
}
onMounted(() => test(), setCount());
</script>

<template>
  <div id="app">
    <button @click="setCount">{{ state.count }}</button>
    <p><router-link to="home">home</router-link></p>
    <p>{{ state.message }}</p>
  </div>
</template>
