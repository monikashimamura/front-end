<script setup>

import { reactive, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store/store.js';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const bindData = reactive({
    questions: [
        {
            id: 0,
            qid: 0,
            orde: 0,
            score: 0,
            eid: 0,
            question: {}
        }
    ],
    eid: route.query.eid,
    // 查询条件
    queryInfo: {
        pageNum: 0,
        pageSize: 8,
        tid: -1,
        query: ""
    },
    // 试题列表
    itemList: [
        {
            qid: 0,
            tid: 0,
            stem: '',
            a: '',
            b: '',
            c: '',
            d: '',
            answer: '',
            explanation: '',
            type: '',
            isSelect: false
        }
    ],
    // 总试题数
    totalNum: 0,
    myItem: false,
    dialogQid: 0,
    dialogScore: 0,
    dialogVisible: false
})

const getQuestion = () => {
    console.log(bindData.eid)
    axios({
        method: 'get',
        url: store.url + '/exam/getQuestion',
        headers: {
            Authorization: store.token
        },
        params: {
            eid: bindData.eid
        }
    }).then(
        res => {
            if (res.data.code == 200) {
                bindData.questions = res.data.data.questions
                console.log(bindData.questions)
            }
            else {
                alert(res.data.message)
            }
        }
    )
}

onMounted(() => {
    console.log('mounted!');
    getQuestion()
    getPage()
});

const getPage = async () => {
    if (bindData.myItem == true) {
        bindData.queryInfo.tid == store.user.uid
    }
    else {
        bindData.queryInfo.tid == -1
    }

    await axios(store.url + '/question/getPage', {
        headers: {
            Authorization: store.token
        },
        params: {
            pageNum: bindData.queryInfo.pageNum,
            pageSize: bindData.queryInfo.pageSize,
            tid: bindData.queryInfo.tid,
            query: bindData.queryInfo.query
        }
    }).then(
        res => {
            if (res.data.code == 200) {
                bindData.itemList = res.data.data.records
                bindData.totalNum = res.data.data.total
                console.log(bindData.itemList)
                console.log(bindData.totalNum)
            }
            else {
                alert(res.message)
            }
        }
    )
}

const addItem = () => {
    router.push('/teacher/addItem')
}

const handlehCurrentChange = (val) => {
    bindData.queryInfo.pageNum = Math.ceil(val)
    console.log(bindData.queryInfo.pageNum)

    getPage()
}

const itemTypeChange = (row) => {
    if (row.type == 1) {
        return '单选题'
    }
    if (row.type == 2) {
        return '多选题'
    }
    if (row.type == 3) {
        return '判断题'
    }
}

const itemAnswerChange = (row) => {
    if (row.type == 1) {
        if (row.answer == 8) {
            return 'A'
        }
        if (row.answer == 4) {
            return 'B'
        }
        if (row.answer == 2) {
            return 'C'
        }
        if (row.answer == 1) {
            return 'D'
        }
    }
    if (row.type == 2) {
        var answerInt = row.answer
        console.log()
        console.log("answerInt " + answerInt)
        var answerStr = ''
        var isA = Math.floor(answerInt / 8)
        answerInt = answerInt % 8
        var isB = Math.floor(answerInt / 4)
        answerInt = answerInt % 4
        var isC = Math.floor(answerInt / 2)
        answerInt = answerInt % 2
        var isD = Math.floor(answerInt / 1)
        answerInt = answerInt % 1

        if (isA == 1) {
            answerStr += 'A'
        }
        if (isB == 1) {
            answerStr += 'B'
        }
        if (isC == 1) {
            answerStr += 'C'
        }
        if (isD == 1) {
            answerStr += 'D'
        }
        console.log(isA + "" + isB + "" + isC + "" + isD)
        console.log(answerStr)
        return answerStr
    }
    if (row.type == 3) {
        if (row.answer == 8) {
            return '对'
        }
        if (row.answer == 4) {
            return '错'
        }
    }
}

const onAddQuestion = (qid, score) => {
    var question = new Object()
    question.qid = qid
    question.score = score
    question.eid = bindData.eid
    console.log(question)
    bindData.questions.push(question)
    bindData.dialogVisible = false
}

const handleClose = (question) => {
    bindData.questions.splice(bindData.questions.indexOf(question), 1)
}

const openDialog = (qid) => {
    bindData.dialogQid = qid
    bindData.dialogScore = 5
    bindData.dialogVisible = true
}

const updateQuestions = () => {
    for (var i = 1; i <= bindData.questions.length; i++) {
        bindData.questions[i-1].orde = i
        console.log("i = " + i)
    }
    axios({
        method: 'post',
        url: store.url + '/exam/updateQuestions',
        headers: {
            Authorization: store.token
        },
        data: bindData.questions
    }).then(
        res => {
            if (res.data.code == 200) {
                alert(res.data.message)
            }
            else {
                alert(res.data.message)
            }
            router.push('/teacher/examdetail')
        }
        
    )
    
}

</script>

<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/mycourse' }">我的课程</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/coursedetail' }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacher/examdetail' }">考试详情</el-breadcrumb-item>
            <el-breadcrumb-item>考试编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-card class="main-card">
        试题列表：
        <el-tag v-for="question in bindData.questions" :key="question.qid" class="mx-1" closable
            :disable-transitions="false" size="large" @close="handleClose(question)">
            {{ question.qid }}({{ question.score }})
        </el-tag>

        
        <el-button type="success" size="large" @click="updateQuestions" style="margin-left: 100px;">保存</el-button>

        <!-- 添加试题区域 -->
        <el-row :gutter="20" style="margin-top: 30px;">
            <el-col :span="8">
                <!-- 搜索与添加区域 -->
                <el-input v-model="bindData.queryInfo.query" placeholder="请输入内容" size="large">
                    <template #append>
                        <el-icon>
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="large" @click="getPage">查找</el-button>
            </el-col>

            <el-col :span="4">
                <el-checkbox v-model="bindData.myItem" label="我的题库" size="large" />
            </el-col>
        </el-row>

        <!-- 列表区域 -->
        <el-table :data="bindData.itemList" border stripe size="large">
            <el-table-column label="题号" prop="qid"></el-table-column>
            <el-table-column label="类型" prop="type" :formatter="itemTypeChange"></el-table-column>
            <el-table-column label="题干" prop="stem"></el-table-column>
            <el-table-column label="选项1" prop="a"></el-table-column>
            <el-table-column label="选项2" prop="b"></el-table-column>
            <el-table-column label="选项3" prop="c"></el-table-column>
            <el-table-column label="选项4" prop="d"></el-table-column>
            <el-table-column label="正确答案" prop="answer" :formatter="itemAnswerChange"></el-table-column>
            <el-table-column label="答案解析" prop="explanation"></el-table-column>
            <el-table-column label="操作">
                <template v-slot:="scope">
                    <el-button type="primary" @click="openDialog(scope.row.qid)">添加</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination">

            <el-pagination @current-change="handlehCurrentChange" :page-size="bindData.queryInfo.pageSize"
                :current-page="bindData.queryInfo.pageNum" layout="prev, pager, next" :total="bindData.totalNum"
                size="large" />
        </div>

        <!-- 弹窗 -->
        <el-dialog v-model="bindData.dialogVisible" title="添加试题" width="30%">
            <div>题号：{{ bindData.dialogQid }}</div>
            <div>赋分：
                <el-input-number v-model="bindData.dialogScore" :min="1"/>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onAddQuestion(bindData.dialogQid, bindData.dialogScore)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style>
@import "default.scss";
@import "template.scss";

.el-tag {
    margin-right: 10px;
}

.el-table {
    margin-top: 40px;
}

.pagination {
    display: block;
    text-align: center;
}

.el-pagination {
    position: fixed;
    bottom: 100px;
    width: 400px;
    margin-left: 600px;
    margin-right: 600px;
}
</style>