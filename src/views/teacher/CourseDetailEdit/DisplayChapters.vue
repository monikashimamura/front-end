<template>
  <div class="container">
    <div class="preview">
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
        <el-collapse-item v-for="chapter in chapters" :key="chapter.no" :title="'Chapter ' + chapter.no + '   ' + chapter.name">
          <template #title>
            <div class="chapter-title">
              {{ chapter.no + "  " + chapter.name }}
            </div>
            <div class="edit-button ikun" @click.stop="editChapter(chapter)">
              <i class="fa-regular fa-pen-to-square" style="color: #1f9eff;"></i>
            </div>
            <div class="delete-button ikun" @click.stop="deleteChapter(chapter)">
              <i class="fa-solid fa-trash-can" style="color: #c31818;"></i>
            </div>
          </template>
          <el-collapse v-model="sectionActiveNames[chapter.no]" class="nested-collapse">
              <div v-for="section in chapter.sections" class="section-content" @click="showPreview(section)">
                {{ section.name }}
              </div>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
      <div class="custom-collapse add-section section-content" @click="addChapter">
        <i class="fa-regular fa-square-plus ikun" style="align-self: center; color: #1f9eff;"></i>

      </div>
    </div>
  </div>

  <div class="modal" v-if="showDelConfirmation">
    <div class="modal-content">
      <p>你确定删除章节 {{ tmpOperatedChapter.name }} 吗？</p>
      <div width="100%">
        <div class="cfm-ccl-btn">
          <button class="cancel-btn" @click="cancelDeleteChapter">取消</button>
        </div>
        <div class="cfm-ccl-btn">
          <button class="confirm-btn" @click="confirmDeleteChapter">确定</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="showChapterEditor">
    <cardtestview :chapter="tmpOperatedChapter" style="display: block;" />
    <br />
    <div class="cfm-ccl-btn">
      <button class="confirm-btn" @click="confirmEditChapter" style="display: block;">保存并返回</button>
    </div>
  </div>

  <div class="modal" v-if="showChapterAdder">
    <div class="modal-content">
      <p>请输入章节号（阿拉伯数字）</p>
      <el-input v-model.number="addChapterData.no" />
      <p>请输入章节名称</p>
      <el-input v-model="addChapterData.name" />
      <div width="100%">
        <div class="cfm-ccl-btn">
          <button class="cancel-btn" @click="cancelAddChapter">取消</button>
        </div>
        <div class="cfm-ccl-btn">
          <button class="confirm-btn" @click="confirmAddChapter">确定</button>
        </div>
      </div>
    </div>
  </div>
  <div>{{ showDelConfirmation }}</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import store from "@/store/store.js";
import '@fortawesome/fontawesome-free/css/all.css';

import cardtestview from "./ChapterEditCard.vue";

  let    chapterActiveNames = reactive([]);
  let    sectionActiveNames = reactive({});
  const showDelConfirmation = ref(false);
  const showChapterEditor = ref(false);
  const showChapterAdder = ref(false);
  let tmpOperatedChapter = ref(null);
  let    chapters = reactive([
  {
    "no": 1,
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
      "no": 2,
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

const addChapterData = ref({
  no: "",
  name: ""
});

const addChapter = () => {
  showChapterAdder.value = true;
  console.log("add chapter");
  addChapterData.value.no = "";
  addChapterData.value.name = "";
}

const confirmAddChapter = async () => {
  await axios({
    method: 'get',
    url: store.url + '/addChapter?cid=' + store.cid +
         '&name=' + encodeURIComponent(addChapterData.value.name) +
         '&no=' + addChapterData.value.no
  }).then(
    res => {
      if (res.data.code == 200) {
            alert("添加成功");
          } else {
            alert("添加失败");
      }
      showChapterAdder.value = false;
    }
  );
  methods.getChapters();

}

const cancelAddChapter = () => {
  showChapterAdder.value = false;
  console.log("cancel add chapter");
}

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

  const editChapter = (chapter) => {
    console.log('Editing chapter:', chapter.no)
    showChapterEditor.value = true;
    tmpOperatedChapter = chapter;
  }

  const confirmEditChapter = () => {
    showChapterEditor.value = false;
    methods.getChapters();
  }

  const deleteChapter = (chapter) => {
  // Perform deletion logic for the chapter
  console.log('Deleting chapter:', chapter.no);
  showDelConfirmation.value = true;
  tmpOperatedChapter = chapter;
};

  const cancelDeleteChapter = () => {
    showDelConfirmation.value = false;
  }
  const confirmDeleteChapter = async () => {
    await axios({
        method: 'get',
        url: store.url + '/deleteChapter?cid=' + store.cid + "&no=" + tmpOperatedChapter.no,
    }).then(
      res => {
        showDelConfirmation.value = false;
        if (res.data.code == 200) {
          alert("删除成功");
          methods.getChapters();
        } else {
          alert("删除失败");
        }
      }
    )
  }

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
    height: 70vh;
    width: 100%;
}

video {
    display: block;
    border: none;
    height: 70vh;
    width: 100%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  height: 100%;
}

.sidebar {
  width: 300px;
}

.preview {
  flex-grow: 1;
  margin-right: 20px;
  max-width: calc(80vw - 340px);
  height: calc(80vh);
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


.chapter-title {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.edit-button {
  margin-right: 20px;
  cursor: pointer;
}

.delete-button {
  margin-right: 20px;
  cursor: pointer;
}

.ikun:hover {
  transform: scale(1.2);
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}

.cancel-btn{
  font-size:15px;
  background-color: #007bff;
  color: #fff;
  margin-left: 20%;
}

.confirm-btn{
  font-size:15px;
  background-color: #ff0000;
  color: #fff;
  margin-right: 20%;

}

.cfm-ccl-btn{
  width: 50%;
  display: inline-flex;
}
</style>