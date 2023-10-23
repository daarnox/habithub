<template>
  <div class="backdrop" @click.self="closeAddHabit">

    <div class="container">
      <h1>welcome <br/> to our page</h1>

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
  background-color: var(--background1);
  color: var(--mainTextColor);
  border-style: none;
  /* border-top-left-radius: 25px;
  border-top-right-radius: 25px; */
}
.active-tab{
  background-color: var(--background3);
}

.form-container {
  height:350px;
  width:100%;
  background-color: var(--background3);
  /* border-color: #fff;
  border-style: solid; */
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}


.container {
  width: 600px;
  height: 600px;
  padding: 50px;
  background: var(--background1);
  border-radius: 50%;
  color: var(--mainTextColor);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-color: var(--mainColor);
  border-style: solid;

  box-shadow:
    /* -5px -5px 5px rgba(255, 0, 191, 0.5), */
    -5px -5px 5px rgba(35, 227, 254, 0.3),
    /* 5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -5px -5px 5px rgba(35, 227, 254, 0.2);
    /* inset 5px 5px 5px rgb(0, 0, 0, 0.2);  */
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