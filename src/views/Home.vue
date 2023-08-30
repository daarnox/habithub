<template>
  <div class="home">
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
        <div class="left-part">
          <h1 style="margin: 10px; color:#529955">//future feature</h1>
        </div>
        <div class="right-part">
          <h1 style="margin: 10px; color:#529955">//future feature</h1>
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
.home {
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  margin: auto;
  height: 88vh;
  width: 95vw;
  background-color: #1e1e1e;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  justify-content: start;
}

.left-part {
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

.right-part {
  float: right;
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