<template>
  <div class="cont">
    <!-- <h1 style="margin: 10px; color:#529955">//forest:</h1> -->
    <div class="forest">
      <Tree v-for="n in 25" v-bind:displayTree="n % 6 == 2 || n === 16 || n === 1" v-bind:xPosition="(n - 1) % 5"
        v-bind:yPosition="Math.floor((n - 1) / 5)"></Tree>
    </div>


  </div>
</template>

<script>
import Tree from './Tree.vue';

export default {
  name: "Forest",
  components: {
    Tree
  },
}

</script>


<style scoped>

.cont{

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
  height:250px;
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