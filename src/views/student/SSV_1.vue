<template>
    <div class="container">
      <div class="preview">
        <div>{{ previewType }}</div>
        <hr />
        <div>{{ previewUrl }}</div>
        <hr />
        <div v-if="previewType === 'video'">
          <video :src="previewUrl" controls>No preview available.</video>
        </div>
        <div v-else>
          <iframe :src="previewUrl" frameborder="0" allowfullscreen >No preview available.</iframe>
        </div>
      </div>
  
  
      <div class="sidebar">
        <div class="section-content" v-if="sections.length === 1" @click="showPreview(sections[0])">
          {{ sections[0].title }}
        </div>
        <el-collapse v-else v-model="chapterActiveNames" accordion class="custom-collapse">
          <el-collapse-item v-for="chapter in chapters" :key="chapter.id" :title="'Chapter ' + chapter.id">
            <el-collapse v-model="sectionActiveNames[chapter.id]" class="nested-collapse">
                <div v-for="section in chapter.sections" class="section-content" @click="showPreview(section)">
                  {{ section.name }}
                </div>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, reactive, ref } from 'vue';
  import axios from 'axios';
  import store from "@/store/store.js";
  
    let    chapterActiveNames = reactive([]);
    let    sectionActiveNames = reactive({});
    let    chapters = reactive([
    {
      "id": 1,
      "sections": [
        {
          "lid": 5,
          "cid": 2,
          "orde": 1,
          "url": "http://localhost:10100/uploads/2/赛道友你.pdf",
          "name": "2",
          "description": "description",
          "type": "application/pdf"
        },
        {
            "lid": 6,
            "cid": 2,
            "orde": 1,
            "url": "http://localhost:10100/uploads/2/100个gdb小技巧（v1.0）.pdf",
            "name": "z z",
            "description": "笑死",
            "type": "application/pdf"
          }
      ]
    },
    {
        "id": 2,
        "sections": [
          {
            "lid": 4,
            "cid": 2,
            "orde": 2,
            "url": "http://localhost:10100/uploads/2/install.exe",
            "name": "3",
            "description": "4",
            "type": "application/x-ms-dos-executable"
          }
        ]
      },
  ]);
  const previewType = ref('');
  const previewUrl = ref('');
  
  
  const sections = () => {
        return this.chapters.flatMap((chapter) => chapter.sections);
      };
    const  methods = {
  
  
      getChapters: async function() {
      await axios({
          method: 'get',
          url: store.url + '/getChapter?cid=' + store.cid ,
      }).then(
          res => {
            console.log("拿到数据");
              if(res.data.code == 200) {
                  chapters.splice(0, chapters.length, ...res.data.data);
              } else {
                  alert(res.data.message)
              }
          }
      )
      },
    };
  
  const showPreview = (section) => {
        console.log("show preview 被调用了")
        previewType.value = section.type;
        let arr = section.url.split('/');
        previewUrl.value = "http://localhost:10100/uploads"
                          + "?courseId=" + arr[arr.length-2]
                          + "&fileName=" + encodeURIComponent(arr[arr.length-1])
                          + "&filetype=" + section.type.replaceAll('/', '%2F');
      };
  
  
    onMounted(methods.getChapters);
  
  </script>
  
  <style scoped>
  iframe {
      display: block;
      border: none;
      height: 90vh;
      width: 100%;
  }
  
  video {
      display: block;
      border: none;
      height: 90vh;
      width: 100%;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
  }
  
  .sidebar {
    width: 300px;
  }
  
  .preview {
    flex-grow: 1;
    margin-right: 20px;
    max-width: calc(100vw - 340px);
    height: calc(300vw * 9 / 16);
  }
  
  .custom-collapse {
    width: 100%;
  }
  
  .nested-collapse {
    margin-top: 10px;
  }
  
  .section-content {
    padding: 8px;
    margin-bottom: 5px;
    background-color: #f7f9fc;
    border-radius: 4px;
    cursor: pointer;
  }
  
  </style>