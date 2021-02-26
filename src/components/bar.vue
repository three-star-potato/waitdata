<template>
  <div :id="elid" style="height: 300px"></div>
</template>

<script>
import { uuid } from "vue-uuid";
export default {
  data() {
    return {
      elid: "",
    };
  },
  props: {
    text: String,
    ydata: Array,
    datavalue: Array,
  },
  created() {
    this.elid = uuid.v1(); //获取随机id
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let bar = this.$echarts.init(document.getElementById(this.elid));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.text,
        },
        tooltip: {},
        // legend: {
        //   data: ["销量"],
        // },
        xAxis: {},
        yAxis: { data: this.ydata },
        grid: {
          left: 55,//解决显示不全的问题
        },
        series: [
          {
            name: "能力",
            type: "bar",
            data: this.datavalue,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      bar.setOption(option);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>