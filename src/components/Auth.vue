<template>
  <div class="backdrop" @click.self="closeAddHabit">
    <form class="form" @submit.prevent="handleLogin">
      <h1>Welcome <br /> to our page</h1>
      <input class="text-input" v-model="email" placeholder="Enter your email" />
      <input type="submit" class="button" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
      <p v-if="displayMessage" style="color:#529955;">Check your email <br/>for the login link!</p>  
    </form>
  </div>
</template>
  
<script>
//import { supabase } from "../supabase";

export default {
  data() {
    return {
      displayMessage: false,
      loading: false,
      email: "",
    };
  },
  methods: {
    async handleLogin() {
      // try {
      //   this.loading = true;
      //   const { data, error } = await supabase.auth.signInWithOtp({ email: this.email });
      //   if (error) throw error;
      //   //alert("Check your email for the login link!");
      // } catch (error) {
      //   alert(error.error_description || error.message);
      // } finally {
      //   this.loading = false;
      // }
      this.displayMessage = true;
      // temporary event to simulate logging in
      setTimeout(() => {
        this.$emit('userLoggedIn');
      }, 2500);
    },
  },
};
</script>

<style scoped>
.form {
  width: 400px;
  height: 400px;
  padding: 50px;
  background: #1e1e1e;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-color: #fff;
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

.button {

  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: .3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #616467;
  box-shadow: inset 0 0 0 2px #fff;
  background-color: transparent;
  height: 48px;
}

.button:hover {
  color: #fff;
  background-color: #529955; 
  /* border-color: #529955; */
  /* box-shadow: inset 0 0 0 2px #529955; */
}

.text-input {

  display: inline-block;
  outline: none;
  font-size: 10px;
  line-height: 1;
  border-radius: 500px;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  box-shadow: inset 0 0 0 2px #fff;
  background-color: transparent;
  height: 48px;

}
</style>