<template>
    <div class="container-fluid" >
        <!-- 这是最上面的导航拦 -->
        <div class="row">
            <!-- 这是侧边栏，ａ.name是ａｐｔ组织的名称 -->
            <div id="actor-list" class="col-xl-3 scroll">
                <div class="list-group list-group-flush">
                    <input type="text" class="form-control" placeholder="🔍 Search Actor" v-model="searchName" v-on:keyup="filterMethod">
                    <a class="list-group-item"  v-bind:class="{active: a.value === actor.value}"  v-for="(a, i) in filterResult" :key="i" :href="'#' + a.value" v-on:click="selectActor(i)" >
                        {{a.value}}
                    </a>
                </div>
            </div>
            <div class="col-xl-6">
                <!-- 下面的文字 -->
                <div class="row">
                    <dl class="dl-horizontal left">
                        <dt>名称:</dt>
                        <dd>{{actor.value}}</dd>
                        <div >
                            <dt>综合评估值: </dt>
                        </div>
                        <div >
                            <dt>别名: </dt>
                        </div>
                       <div v-if="aptmap.operatingFrom">
                            <dt>组织可能源于: </dt>
                            <dd>{{aptmap.operatingFrom || 'Unknown'}}</dd>
                        </div>
                        <div >
                            <dt>受害国家地区: </dt>
                        </div>
                        <div >
                            <dt>威胁类型: </dt>
                        </div>
                         <div v-if="actor.description">
                            <dt>组织概述: </dt>
                            <dd>{{actor.description || 'None'}}</dd>
                        </div>
                        <div >
                            <dt>参考链接: </dt>
                        </div>
                

                    
                    </dl>
                </div>
            </div>
        </div>

    </div>    
</template>
<script>
import aptorgnazition from '../assets/actors.json'
export default {

data(){ 
    return{
searchName:'',
aptname:[],
filterResult:[],
actor:{},
aptmap:{}


}
},
created(){
    this.allapt();
    this.dealwithsynonyms();
},
mounted() {
   
    
  },
methods:{
allapt(){
        let filterResult=[]
        for (const item of aptorgnazition.values){
        filterResult.push(item)
        }  
        this.filterResult=filterResult
        
    },
filterMethod(){
       const searchName = this.searchName.toLowerCase();
       let filterResult=[]
    
            for (const actor of aptorgnazition.values) {
                if (actor.value.toLowerCase().includes(searchName)) {
                    filterResult.push(actor);
                } 
                else {
                    let synonyms=[]
                    if (actor.meta.synonyms!=undefined){synonyms.push(actor.meta.synonyms)}
                    for (const item of synonyms){
                      for (const synonym of item){
                        if (synonym.toLowerCase().includes(searchName))
                         {
                           filterResult.push(actor);
                           break;
                        }
                      }
                }
            }}
            this.filterResult = filterResult;
      

},
selectActor(actorIndex) {
        this.actor = this.filterResult[actorIndex];
        console.log(this.actor)
        this.aptmap=this.actor.aptmap
    },
dealwithsynonyms(){
    console.log(  this.actor.meta.synonyms)
}
}
    
}
</script>

<style scoped>

#actor-list {
    text-align: left;
    max-height: calc(100vh - 150px);
    margin-right: 15px;
    padding: 0;
}
.scroll {
    overflow-y: auto;
}
.left {
    text-align: left;
}
.jumbotron {
    width: 100%;
    padding: 2em 2em;
    margin: 0;
}
footer {
    padding-top: 1.9rem;
    padding-bottom: 0.8rem;
}
.navbar {
    width: 100%;
}
.list-group-item.active {
    background-color: #dc3545;
    border-color: #dc3545;
}
a.list-group-item {
    color: #dc3545;
}
a.list-group-item.active {
    color: rgb(51, 201, 51);
}
.clickable {
    cursor: pointer;
}
.actor-filter {
    min-height: 30px;
    padding-top: 5px;
}
.actor-filter > .badge {
    margin-right: 5px;
}
.dl-cfr {
    margin-left: 2em;
}
</style>