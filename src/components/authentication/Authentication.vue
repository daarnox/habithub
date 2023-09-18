<template>
  <div class="backdrop" @click.self="closeAddHabit">

    <div class="container">
      <h1>Welcome <br /> to our page</h1>

      <div>
        <div style="display:flex">
          <button class="tab-switch" :class="isRegisterActiveTab" @click="switchTab('register')">Register</button>
          <button class="tab-switch" :class="isLoginActiveTab" @click="switchTab('login')">Login</button>
          <button class="tab-switch" :class="isLinkLoginActiveTab" @click="switchTab('linkLogin')">Link Login</button>
        </div>

        <div class="form-container">
          <!-- <keep-alive>   -->
          <!-- does it keep other components still in DOM? -->
          <component :is="selectedTab"></component>
          <!-- </keep-alive> -->
        </div>
      </div>

    </div>

  </div>
</template>
  
<script>
import Login from "@/components/authentication/Login";
import LinkLogin from "@/components/authentication/LinkLogin";
import Register from "@/components/authentication/Register";

export default {
  components: {
    Login,
    LinkLogin,
    Register
  },
  data() {
    return {
      selectedTab: "login"
    };
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab;
    }
  },
  computed: {
    isLoginActiveTab(){
      return this.selectedTab === 'login' ? 'active-tab' : '';
    },
    isRegisterActiveTab(){
      return this.selectedTab === 'register' ? 'active-tab' : '';
    },
    isLinkLoginActiveTab(){
      return this.selectedTab === 'linkLogin' ? 'active-tab' : '';
    }
  }
};
</script>

<style scoped>
.tab-switch {
  padding: 10px;
  min-width: 100px;
  font-family: Consolas;
  background-color: #1e1e1e;
  color: white;
  border-style: none;
}
.active-tab{
  background-color: #2b2b2b;
}

.form-container {
  height:300px;
  width:100%;
  background-color: #2b2b2b;
  /* border-color: #fff;
  border-style: solid; */
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}


.container {
  width: 600px;
  height: 600px;
  padding: 50px;
  background: #1e1e1e;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-color: #529955;
  border-style: solid;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>