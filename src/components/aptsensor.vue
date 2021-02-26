<template>
  <div>
    <div class="header">APT组织态势感知</div>
    <div class="container-fluid" >
      <div class="row">
        <div class="col-xl-3 ">
      <bar
        :text="aptAbility"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
      <bar
        :text="aptcountry"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
      <bar
        :text="attackmethod"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>

    </div>

<div class="col-xl-6 ">
      <worldmap ></worldmap>
      <activeline :text="activetext"></activeline>

    </div>

    <div class="col-xl-3 ">
      <bar
        :text="victimcountry"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
      <bar
        :text="victimindustry"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
      <bar
        :text="victimdestroy"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>  
    </div>
  </div>
  <div class="row">
    <div class="col-xl-9 ">
  <listanddescription ></listanddescription>
    </div>
    <div class="col-xl-3 ">
  <ladar :text="aptladar"></ladar>
      <pie :text="aptcountryspread" :data="countryspreaddata"></pie>
      <pie :text="aptindustryspread" :data="industryspreaddata"></pie>
       <bar
        :text="a"
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
       <bar
        :text="b"
        
        :ydata="rankdata1.name"
        :datavalue="rankdata1.value"
      ></bar>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import Bar from "./bar.vue";
import Worldmap from "./worldmap.vue";
import actors from "../assets/description.json";
import rankdata1 from "../assets/rankdata.json";
import Ladar from "./ladar.vue";
import Pie from "./pie.vue";
import Activeline from './activeline.vue';
import Listanddescription from './listanddescription.vue';


export default {
  data() {
    return {
      aptAbility: "APT组织综合能力排行",
      aptcountry: "APT组织所属国家排行",
      attackmethod: "使用攻击手段排行",
      victimcountry: "受害国家/地区排行",
      victimindustry: "受害行业排行",
      victimdestroy: "受害损失排行",
      aptladar: "APT组织能力分布",
      aptcountryspread: "攻击国家分布",
      aptindustryspread: "攻击机构分布",
      actor: actors,
      activetext:'活跃度',
      a:'攻击技术统计',
      b:'攻击工具统计',

      countryspreaddata:[
              { value: 1048, name: "中国" },
              { value: 735, name: "美国" },
              { value: 580, name: "印度" },
              { value: 484, name: "伊朗" },
              { value: 300, name: "朝鲜" },
            ],
      industryspreaddata:[
              { value: 1048, name: "政府" },
              { value: 735, name: "能源" },
              { value: 580, name: "金融" },
              { value: 484, name: "国防" },
              { value: 300, name: "互联网" },
              { value: 287, name: "航空航天" },
            ],
    };
  },
  computed: {
    rankdata1() {
      let dataname = [];
      let datavaule = [];
      function up(x, y) {
        return x.value - y.value;
      }
      let data1arrary = rankdata1.aptability.sort(up);
      console.log(data1arrary);
      for (let item of data1arrary) {
        dataname.push(item.name);
        datavaule.push(item.value);
      }
      return { name: dataname, value: datavaule };
    },
  },
  name: "aptsensor",
  components: {
    Worldmap,
    Bar,
    Ladar,
    Pie,
    Activeline,
    Listanddescription,
   
  },
};
</script>

<style>
.header {
  background-color: #f1f1f1;
  text-align: center;
  padding: 20px;
}


</style>
