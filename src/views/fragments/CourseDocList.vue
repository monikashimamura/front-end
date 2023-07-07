<template>
    <div class="container">

      <div class="preview">
        <div v-if="previewType === 'video'">
          <video :src="previewUrl" controls></video>
        </div>
        <div v-else-if="previewType === 'pdf'">
          <iframe :src="previewUrl" frameborder="0" allowfullscreen ></iframe>
        </div>
        <div v-else>
          <p>No preview available.</p>
        </div>
      </div>

      <div class="sidebar">
        <div class="section-content" v-if="sections.length === 1" @click="showPreview(sections[0])">
          {{ sections[0].title }}
        </div>
        <el-collapse v-else v-model="chapterActiveNames" accordion class="custom-collapse">
          <el-collapse-item v-for="chapter in chapters" :key="chapter.id" :title="chapter.title">
            <el-collapse v-model="sectionActiveNames[chapter.id]" class="nested-collapse">
                <div v-for="section in chapter.sections" class="section-content" @click="showPreview(section)">
                  {{ section.title }}
                </div>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </template>

  <script>
  import { ref } from 'vue';

  export default {
    data() {
      return {
        chapterActiveNames: [],
        sectionActiveNames: {},
        chapters: [
          {
            id: 1,
            title: 'Chapter 1',
            sections: [
              { id: 1, title: 'Section 1.1', type: 'video', fileUrl: 'http://localhost:8080/test.mp4' },
              { id: 2, title: 'Section 1.2', type: 'pdf', fileUrl: 'http://localhost:8080/doc.pdf' },
            ],
          },
          {
            id: 2,
            title: 'Chapter 2',
            sections: [
              { id: 3, title: 'Section 2.1', type: 'video', fileUrl: 'http://localhost:8080/video.mp4' },
              { id: 4, title: 'Section 2.2', type: 'pdf', fileUrl: 'http://localhost:8080/doc.pdf' },
            ],
          },
        ],
        previewType: null,
        previewUrl: null,
      };
    },
    computed: {
      sections() {
        return this.chapters.flatMap((chapter) => chapter.sections);
      },
    },
    methods: {
      showPreview(section) {
        this.previewType = section.type;
        this.previewUrl = section.fileUrl;
      },

      getLecture() {
        this.chapters
      }
    },
  };
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
