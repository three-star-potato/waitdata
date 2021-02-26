<template>
    <div class="container-fluid" >
        <!-- 这是最上面的导航拦 -->
        <div class="row">
            <!-- 这是侧边栏，ａ.name是ａｐｔ组织的名称 -->
            <div id="actor-list" class="col-xl-2 scroll">
                <div class="list-group list-group-flush">
                    <input type="text" class="form-control" placeholder="🔍 Search Actor" v-model="searchActorName" v-on:keyup="filterActors">
                    <a class="list-group-item" v-bind:class="{active: a.name === actor.name}" v-for="(a, i) in filteredActors" :key="i" :href="'#' + a.name" v-on:click="selectActor(i)">
                        {{a.name}}
                    </a>
                </div>
            </div>
            <div class="col-xl-7">
                <!-- 下面的文字 -->
                <div class="row">
                    <dl class="dl-horizontal left">
                        <dt>名称:</dt>
                        <dd>{{actor.name}}</dd>
                        <div v-if="actor.synonymsString()">
                            <dt>别名: </dt>
                            <dd>{{actor.synonymsString() || 'None'}}</dd>
                        </div>
                        <div v-if="actor.operatingFrom">
                            <dt>组织可能源于: </dt>
                            <dd>{{actor.operatingFrom || 'Unknown'}}</dd>
                        </div>
                        <div v-if="actor.cfrSuspectedState">
                            <dt data-toggle="tooltip" data-placement="left" title="Information provided by Council of Foreign Relations">(CFR) 怀疑的组织赞助者: </dt>
                            <dd>{{actor.cfrSuspectedState}}</dd>
                        </div>
                        <div v-if="actor.cfrSuspectedVictims">
                            <dt data-toggle="tooltip" data-placement="left" title="Information provided by Council of Foreign Relations">(CFR) 怀疑的受害者: </dt>
                            <dd>
                                <ul>
                                    <li v-for="(victim, index) in actor.cfrSuspectedVictims" :key="index">
                                        {{victim}}
                                    </li>
                                </ul>
                            </dd>
                        </div>
                        <div v-if="actor.cfrTypeOfIncident">
                            <dt data-toggle="tooltip" data-placement="left" title="Information provided by Council of Foreign Relations">(CFR) Type of incident: </dt>
                            <dd>{{actor.cfrTypeOfIncident}}</dd>
                        </div>
                        <div v-if="actor.cfrTargetSectors">
                            <dt data-toggle="tooltip" data-placement="left" title="Information provided by Council of Foreign Relations">(CFR) Target sectors: </dt>
                            <dd>
                                <ul>
                                    <li v-for="(sector, index) in actor.cfrTargetSectors" :key="index">
                                        {{sector}}
                                    </li>
                                </ul>
                            </dd>
                        </div>
                        <div v-if="actor.description">
                            <dt>描述: </dt>
                            <dd>{{actor.description || 'None'}}</dd>
                        </div>
                        <div v-if="actor.references">
                        <dt>链接: </dt>
                        <dd>
                            <ul>
                                <li v-for="(ref, index) in actor.references" :key="index">
                                    <a target="_blank" :href="ref">{{ref}}</a>
                                </li>
                            </ul>
                        </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

    </div>    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Actor } from '../models/actor';
import actors from '../utils/actors';

@Component
export default class ThreatActorMap extends Vue {
    private actors: Actor[];
    private filteredActors: Actor[];
    private actor: Actor;
    private previousActor: Actor;
    private selectedActor: number = 0;
    private previousCountry!: string;
    private threatActorMap!: any;
    private searchActorName: string = '';
    private searchActorCountry: string = '';

    constructor() {
        super();
        this.actors = new Array();
        for (const actor of actors.values) {
            this.actors.push(new Actor(actor));
        }
        this.filteredActors = this.actors;
        this.actor = this.actors[0];
        this.previousActor = this.actor;

    }

    public mounted() {
        this.filterActors();
    }

    public selectActor(actorIndex: number) {
        this.previousActor = this.actor;
        this.actor = this.filteredActors[actorIndex];
        this.selectedActor = actorIndex;
    }



    public searchByName(name: string) {
        this.searchActorName = name;
        this.filterActors();
    }



    public resetNameFilter() {
        this.searchByName('');
    }

    // 通过搜索框上的打字筛选出相关的apt组织，或选择地图上的国家，会出现侧边栏的apt组织，
    public filterActors() {
        const searchActorName = this.searchActorName.toLowerCase();
        const filteredActors = new Array<Actor>();

        if (searchActorName === '' ) {
            this.filteredActors = this.actors;
        } else {
            for (const actor of this.actors) {
                if (actor.name.toLowerCase().includes(searchActorName)
                && (this.searchActorCountry === '' || actor.ccOperatingFrom === this.searchActorCountry)) {
                    filteredActors.push(actor);
                } else {
                    for (const synonym of actor.synonyms) {
                        if (synonym.toLowerCase().includes(searchActorName)
                        && (this.searchActorCountry === '' || actor.ccOperatingFrom === this.searchActorCountry)) {
                            filteredActors.push(actor);
                            break;
                        }
                    }
                }
            }
            this.filteredActors = filteredActors;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 以下主要是控制左边的样式和ｍａｐ的宽高-->
<!-- 以下主要是控制左边的样式和map的宽高-->
<style scoped>
#actor-map {
    min-height: 500px;
    width: 900px;
    margin: auto;
}
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