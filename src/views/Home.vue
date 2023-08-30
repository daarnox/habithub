<template>
  <div class="view-container">
    <div class="container">
      <div class="top-part" style="display:flex; padding:50px;">
        <div style="flex: 1; background-color: none;">
        </div>
        <div style="background-color: none;">
          <h1>home page:</h1>
        </div>
        <div style="flex: 1;  background-color: none;">
        </div>
      </div>

      <div class="main-part" style="height: 100%;">
        <div class="part" style="float: left;">
          <h1 style="color:#529955">//future feature</h1>
        </div>
        <div class="part" style="float: right;">
          <h1 style="color:#529955">//future feature</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  height: 100%;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  justify-content: start;
}

.part {
  float: left;
  width: 48%;
  background-color: #1e1e1e;
  margin: 1%;
  height: 90%;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-color: #2b2b2b;
  border-style: solid;
}
</style>