<template>
  <p>choose your favourite page style:</p>

  <div
    style="
      position: relative;
      display: flex;
      height: 50%;
      min-height: 250px;
      width: 60%;
    "
  >
    <div
      class="card"
      v-bind:class="{ 'card-checked': checkedOption === 'cyber' }"
      @click="changePageStyle('cyber')"
    >
      <div style="position: relative">
        <Tree
          v-bind:displayTree="true"
          v-bind:xPosition="-1"
          v-bind:yPosition="0"
          v-bind:displayStyle="'cyber'"
        />
      </div>
    </div>

    <div
      class="card"
      v-bind:class="{ 'card-checked': checkedOption === 'vscode' }"
      @click="changePageStyle('vscode')"
    >
      <div style="position: relative">
        <Tree
          v-bind:displayTree="true"
          v-bind:xPosition="-1"
          v-bind:yPosition="0"
          v-bind:displayStyle="'vscode'"
        />
      </div>
    </div>

    <div
      class="card"
      v-bind:class="{ 'card-checked': checkedOption === 'matrix' }"
      @click="changePageStyle('matrix')"
    >
      <div style="position: relative">
        <Tree
          v-bind:displayTree="true"
          v-bind:xPosition="-1"
          v-bind:yPosition="0"
          v-bind:displayStyle="'matrix'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store/store";
import Tree from "./forest/Tree.vue";
import { supabase } from "@/supabase";

export default {
  name: "PageStyleSwitcher",
  components: {
    Tree,
  },
  data() {
    return {
      store,
      checkedOption: "",
    };
  },
  methods: {
    async changePageStyle(name) {
      this.checkedOption = name;
      const { data, error } = await supabase
        .from("users")
        .update({ chosen_style: name })
        .eq("id", store.user.id)
        .select();
      //TODO: confirm sending a request
      store.userData = data[0];
    },
  },
  computed: {
    changeClass() {
      if (store.userData != null) {
        return store.userData.chosen_style;
      } else return "none";
    },
  },
  watch: {
    changeClass(newChangeClass, oldChangeClass) {
      this.checkedOption = newChangeClass;
    },
  },
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
.card:hover {
  border: solid 1px var(--mainColor);
}

.card-checked {
  border: solid 1px var(--mainColor);
  background-color: var(--mainDarkColor);
}
</style>