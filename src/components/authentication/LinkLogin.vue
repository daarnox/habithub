<template>
  <div v-if="errorMsg" >
    <p style="color:red; padding:10px">{{ errorMsg }}</p>
  </div>
  <form class="form" @submit.prevent="handleLogin">
    <input class="text-input" v-model="email" placeholder="Enter your email" />
    <!-- <input type="submit" class="button" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" /> -->
    <FormButton>Send magic link</FormButton>
    <p v-if="displayMessage" style="color:#529955;">Check your email <br />for the login link!</p>
  </form>
</template>

<script>
import { supabase } from '@/supabase';
import FormButton from '@/components/user_interface/FormButton.vue'

export default {
  name: "LinkLogin",
  components: {
    FormButton
  },
  data() {
    return {
      errorMsg: null,
      displayMessage: false,
      loading: false,
      email: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;
        const { data, error } = await supabase.auth.signInWithOtp({ email: this.email });
        if (error) throw error;
      } catch (error) {
        this.errorMsg = error.message;
        setTimeout(() => {
          this.errorMsg = null;
        }, 4000);
      } finally {
        this.loading = false;
      }
      this.displayMessage = true;
      // temporary event to simulate logging in
      // setTimeout(() => {
      //   this.$emit('userLoggedIn');
      // }, 2500);
    },
  }
};
</script>

<style scoped>
.form {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  /* border-color: #fff;
  border-style: solid; */
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
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  box-shadow: inset 0 0 0 2px #fff;
  background-color: transparent;
  /* background-color: #1e1e1e; */
  height: 48px;

}
</style>