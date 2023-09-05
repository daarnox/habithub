<template>
    <!-- <Auth v-if="!userLoggedIn" @userLoggedIn="simulateLoggingIn"/> -->
    <Authentication v-if="!userLoggedIn"/>
    <div v-else>
      <Navigation/>
      <router-view/>    
    </div> 
</template>

<script>

import Navigation from '@/components/Navigation.vue'
import Authentication from '@/components/authentication/Authentication.vue'
import {supabase} from './supabase'
import {store} from '@/store/store'

export default {
  name: 'HomeView',
  components: {
    Navigation,
    Authentication
  },
    data(){
    return {
      userLoggedIn: false,
      store,
    }
  },
  created(){
    const user = supabase.auth.getUser()
    supabase.auth.onAuthStateChange((_, session) => {
      store.setUser(session);
      //console.log(store.user)
      this.userLoggedIn = (store.user != null);
    });
  },
  methods: {
      // simulateLoggingIn(){
      //   this.userLoggedIn = true;
      // }
    },

}
</script>


<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;  /* include the padding and border in an element's total width */
}

#app {
    /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  font-family: Consolas, Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(45deg, #212f45 20%, #1b3a4b 20% 40%, #212f45 40% 60%, #272640 60% 80%, #312244 80%); 
  /* animation: mymove 5s infinite alternate; */  
}

/* @keyframes mymove {
  from {background: #1b3a4b }
  to {background: #312244}
} */

.view-container{
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
