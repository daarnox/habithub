<template>
  <div class="cont">
    <!-- <h1 style="margin: 10px; color:#529955">//forest:</h1> -->

    <div style="display:flex; align-items:center; justify-content: center; margin-bottom: 40px; width: 100%;">
      <h2 style="color: var(--mainColor); font-size: 30px; margin-right: 30px;"> <Icon icon="bi:tree"/>{{ trees.length }}</h2> 
      <FormButton
        class="button"
        @click="toggleTimer"
      >
        start timer
      </FormButton>
    </div>

    <div class="forest">
      <!-- <div class="shadow">test</div>       -->
      <Tree
        v-for="n in 25"
        v-bind:displayTree="trees.includes(n)"
        v-bind:xPosition="(n - 1) % 5"
        v-bind:yPosition="Math.floor((n - 1) / 5)"
        v-bind:key="n"
      ></Tree>
    </div>
  </div>
</template>

<script>
import Tree from "./Tree.vue";
import { store } from "@/store/store";
import FormButton from "@/components/user_interface/FormButton.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "Forest",
  components: {
    Tree,
    FormButton,
    Icon
  },
  data() {
    return {};
  },
  computed: {
    trees() {
      return store.trees;
    },
  },
  methods: {
    toggleTimer() {
      store.emitter.emit("showTimer", { a: "test" });
    },
  },
};
</script>


<style scoped>
.cont {
  /* background-color: yellow; */
  height: 100%;
  width: 100%;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border-color: #2b2b2b;
  border-style: solid; */
}

.forest {
  width: 350px;
  height: 250px;
  /* background: red; */
  position: relative;
  transform-style: preserve-3d;
  /* transform: translateX(-150px) translateZ(-150px) rotateX(0deg) rotateY(15deg) rotateZ(-5deg); */
  /* transform: translateX(50%) translateY(100px); */
  /* transform: translateX(50%) translateY(100px); */
}

/* .forest:hover {
  animation: animate 6s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
} */
</style>