<script>
export default {
  props: ["ad"],
  methods: {
    openAd() {
      window.open(this.ad.link, "_blank");
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div>
    <el-image class="imagePreview" :src="ad.image" @click="openAd"></el-image>
  </div>
</template>


<style>
@import "component.scss";
</style>