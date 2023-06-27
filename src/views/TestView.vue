<script setup>
import { reactive } from "vue";

const state = reactive({
  count: 0,
});

const setCount = () => {
  state.count++;
};
</script>

<template>
  <div id="app">
    <button @click="setCount">{{ state.count }}</button>
    <p><router-link to="home">home</router-link></p>
    <p></p>
  </div>
</template>



