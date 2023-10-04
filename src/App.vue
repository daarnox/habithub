<template>
  <!-- <Auth v-if="!userLoggedIn" @userLoggedIn="simulateLoggingIn"/> -->
  <Authentication v-if="!userLoggedIn" />
  <div v-else>
    <Navigation />
    <Timer/>
    <router-view />
  </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'
import Authentication from '@/components/authentication/Authentication.vue'
import { supabase } from './supabase'
import { store } from '@/store/store'

import Timer from "@/components/forest/Timer.vue";

import '@/styles.css';


export default {
  name: 'HomeView',
  components: {
    Navigation,
    Authentication,
    Timer
  },
  data() {
    return {
      userLoggedIn: false,
      store,
    }
  },
  created() {
    const user = supabase.auth.getUser()
    supabase.auth.onAuthStateChange((_, session) => {
      store.setSession(session);
      //console.log(store.user)
      this.userLoggedIn = (store.user != null);
    });
  },
  computed: {
    changeClass() {
      if (store.userData != null) {
        return store.userData.chosen_style;
      } else return false;
    }
  },
  methods: {
    // simulateLoggingIn(){
    //   this.userLoggedIn = true;
    // }
  },
  watch: {
    changeClass(newChangeClass, oldChangeClass) {
      if (newChangeClass) {
        document.body.style.setProperty('--mainColor', '#9cdcfe');
        document.body.style.setProperty('--mainDarkColor', '#1e2c33');
      } else {
        document.body.style.setProperty('--mainColor', '#529955');
        document.body.style.setProperty('--mainDarkColor', '#182e19');
      }
    },

    //   r.style.setProperty('--mainColor', '#9cdcfe');
    //   r.style.setProperty('--mainDarkColor', '#1e2c33');        
    // } else {
    //   r.style.setProperty('--mainColor', '#529955');
    //   r.style.setProperty('--mainDarkColor', '#182e19');

  }
}
</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* include the padding and border in an element's total width */
}

#app {
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  font-family: Consolas, Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  min-height: 100vh;
  /* position: relative; */
  /* background: linear-gradient(45deg, #212f45 20%, #1b3a4b 20% 40%, #212f45 40% 60%, #272640 60% 80%, #312244 80%); */
  background: linear-gradient(45deg, var(--mainDarkColor) 20%, #202020 20% 80%, var(--mainDarkColor) 80%);
  /* animation: mymove 5s infinite alternate; */
}

/* @keyframes mymove {
  from {background: #1b3a4b }
  to {background: #312244}
} */

.view-container {
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
</style>
