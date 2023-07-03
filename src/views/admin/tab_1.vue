<template>
    <div>
      <h3>学生和老师人数占比</h3>
      <div id="chart"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import axios from 'axios';
  
  export default {
    mounted() {
      // 发起 axios 请求获取数据
      axios
        .get('http://localhost:10100/admin/countByType')
        .then(response => {
          // 在这里处理获取的数据
          const responseData = response.data;
          const studentCount = responseData[0];
          const teacherCount = responseData[1];
          // 使用 ECharts 创建和渲染图表
          this.renderChart(studentCount, teacherCount);
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods: {
      renderChart(studentCount, teacherCount) {
        // 使用 ECharts 初始化图表
        const chart = echarts.init(document.getElementById('chart'));
  
        // 配置图表选项
        const options = {
          title: {
            text: '人数占比',
            subtext: '学生和老师',
            x: 'center',
          },
          tooltip: {
            trigger: 'item', // 点击扇形图触发 tooltip
            formatter: params => {
              // 自定义 tooltip 内容
              const { name, value, percent } = params;
              return `${name}: ${value} (${percent}%)`;
            },
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              data: [
                { value: studentCount, name: '学生人数' },
                { value: teacherCount, name: '老师人数' },
              ],
              label: {
                show: true,
                formatter: '{b}: {c}',
              },
            },
          ],
        };
  
        // 渲染图表
        chart.setOption(options);
      },
    },
  };
  </script>
  
  <style>
  #chart {
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }
  </style>
  