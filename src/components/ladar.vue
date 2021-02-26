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
  },
  created() {
    this.elid = uuid.v1(); //获取随机id
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let ladar = this.$echarts.init(document.getElementById(this.elid));

      var option = {
        title: {
          text: this.text,
        },
        tooltip: {},

        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "属性", max: 100 },
            { name: "威胁", max: 100 },
            { name: "防御", max: 100 },
            { name: "活跃", max: 100 },
            { name: "衍化", max: 100 },
          ],
          radius: 85, //缩放
          center: ["50%", "50%"], //位置
        },

        series: [
          {
            name: "demo",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [43, 60, 100, 35, 50],
                name: "data",
              },
            ],
          },
        ],
      };
      ladar.setOption(option);
    },
  },
};
</script>
