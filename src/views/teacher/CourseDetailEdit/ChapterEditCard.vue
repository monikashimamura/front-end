<template>
  <div class="chapter-card">
    <el-card class="card" style="display: inline; align-items: center;">
      <span>章节名称：</span>
      <el-input v-model="chapter.name" style="display: inline; margin-right: 20px;" />
      <el-button @click="saveChapterName" style="background-color: #1f9eff; color: #ffffff;"> 保存 </el-button>
      <i class="fa-solid fa-arrow-up-from-bracket ikun" style="color: #1f9eff; margin-left: 20px; cursor: pointer;" @click.stop="uploadSection"></i>
      <div v-for="section in chapter.sections" >
      <div class="vgap" />
      <el-card class="card" default="" >
        <template #default>
              <div class="chapter-title" style="display: inline; margin-left: 10px;">
                {{  section.name }}
              </div>
              <div class="delete-button" style="display: inline; margin-right: 20px;" @click.stop="deleteSection(section)">
                <i class="fa-solid fa-trash-can ikun" style="color: #c31818;"></i>
              </div>
            </template>
      </el-card>
      </div>

      <div class="upload-zone" v-if="showUploadZone">
      <upload-lect :chapter="chapter"/>
      </div>

    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElCard, ElButton, ElIcon } from 'element-plus';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import store from "@/store/store.js";
import uploadLect from "./UploadCourseDoc.vue";

const showUploadZone = ref(false);

const chapter = ref({
  no: 2,
  name: "shabi",
  sections: [
    { lid: 1, name: 'Section 1' },
    { lid: 2, name: 'Section 2' },
  ],
});

const props = defineProps(['chapter']);

const saveChapterName = async () => {
  await axios({
    method: 'get',
    url: store.url + '/addChapter?cid=' + store.cid +
         '&name=' + encodeURIComponent(chapter.value.name) +
         '&no=' + chapter.value.no
  }).then(
    res => {
      if (res.data.code == 200) {
            alert("修改成功");
          } else {
            alert("修改失败");
      }
    }
  )
};

const deleteSection = async (section) => {
  await axios({
    method: 'get',
    url: store.url + '/deleteLecture?lid=' + section.lid
  }).then(
    res => {
      if (res.data.code == 200) {
            alert("删除成功");
            getSection();
          } else {
            alert("删除失败");
      }
    }
  )
};

const getSection = async () => {
  console.log("GET SECTION !!!");
  await axios({
    method: 'get',
    url: store.url + '/getLectureByCidAndNo?cid=' + store.cid +
         '&no=' + chapter.value.no
  }).then(
    res => {
      if (res.data.code == 200) {
            console.log("请求成功");
            chapter.value.sections = res.data.data;
          } else {
            console.log("请求失败")
      }
    }
  )
};

const setInitialChapter = () => {
  console.log("SET INITIAL CHAPTER !!!");
  chapter.value = props.chapter;
}

const uploadSection = () => {
  showUploadZone.value = true;
}

onMounted(setInitialChapter);
</script>

<style scoped>


.chapter-card {
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-title {
  font-weight: bold;
}

.section-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-footer {
  text-align: right;
  margin-top: 12px;
}

.vgap {
  height: 10px;
}

  .delete-button {
    margin-right: 20px;
    cursor: pointer;
  }

  .ikun:hover {
    transform: scale(1.2);
  }

</style>
