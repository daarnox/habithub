<template>
    <p>choose your favourite page style:</p>

    <div style="position: relative; display: flex; height: 50%; width: 60%;">


        <div class="card" v-bind:class="{ 'card-checked' : checkedOption === 'vscode'}" @click="changePageStyle('vscode')">
            <div style="position: relative;"><Tree v-bind:displayTree="true" v-bind:xPosition="-1" v-bind:yPosition="0" v-bind:displayStyle="'cyber'" /></div>
        </div>

        <div class="card" v-bind:class="{ 'card-checked' : checkedOption === 'cyber'}" @click="changePageStyle('cyber')">
            <div style="position: relative;"><Tree v-bind:displayTree="true" v-bind:xPosition="-1" v-bind:yPosition="0" /></div>
        </div>

        <div class="card" v-bind:class="{ 'card-checked' : checkedOption === 'matrix'}" @click="changePageStyle('matrix')">
            <div style="position: relative;"><Tree v-bind:displayTree="true" v-bind:xPosition="-1" v-bind:yPosition="0" /></div>
        </div>

        <!-- <Tree
        v-bind:displayTree="true"
        v-bind:xPosition="0"
        v-bind:yPosition="0"
    /> -->
    </div>
</template>

<script>
import { store } from '@/store/store'
import Tree from "./forest/Tree.vue";

export default {
    name: "PageStyleSwitcher",
    components: {
        Tree
    },
    data() {
        return {
            store,
            checkedOption: "vscode"
        };
    },
    methods:{
        changePageStyle(name){
            this.checkedOption = name;

        }
    },
    created() {


    }
};
</script>

<style scoped>

.card {
    flex-grow: 1; 
    display: flex;  
    justify-content: center;
    border-radius: 50px;
    margin: 10px;
    border: solid 1px #00000000;
}
.card:hover{
    border: solid 1px var(--mainColor);
}

.card-checked{
    border: solid 1px var(--mainColor);
    background-color: var(--mainDarkColor);
}

</style>