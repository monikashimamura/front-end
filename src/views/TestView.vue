<script setup>
import { reactive,onMounted } from 'vue';
import axios from 'axios'
const state = reactive({
  count: 0,
  message: ""
});

const setCount = () => {
  state.count++;
};

const test = async () => {
  const res = await axios.get('http://127.0.0.1:10100/test/test');
  state.message = res.data;
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



