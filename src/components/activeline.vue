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
      let line = this.$echarts.init(document.getElementById(this.elid));
var option = {
   title: {
        text: this.text
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
};
    
      line.setOption(option);
    },
  },
};
</script>
