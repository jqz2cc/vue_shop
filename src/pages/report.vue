<template>
  <div class="reports_box">
    <div id="main"
         style="width: 800px;height:400px;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import { queryReports } from './../request/api.js'
  import _ from 'lodash'
  export default {
    data() {
      return {
        options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      }
    },
    mounted() {
      let myChart = echarts.init(document.getElementById('main'));

      queryReports().then(res => {
        let { meta, data } = res
        if (meta.status != 200) {
          this.$message.error(meta.msg)
        }
        let result = _.merge(data, this.options)
        // 绘制图表
        myChart.setOption(result);

      })

    },
    created() { },
  }
</script>
<style lang="less" scoped>
</style>

