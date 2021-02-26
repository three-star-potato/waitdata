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
    data:Array
  },
  created() {
    this.elid = uuid.v1(); //获取随机id
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let pie = this.$echarts.init(document.getElementById(this.elid));

      var option = {
        title: {
          text: this.text,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
     
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
             label: {
                        formatter: '{b}: {@[' + this.name + ']} ({d}%)'
                    },
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      pie.setOption(option);
    },
  },
};
</script>
