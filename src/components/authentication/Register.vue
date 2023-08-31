<template>
  <div v-if="errorMsg">
    <p style="color:red; padding:10px">{{ errorMsg }}</p>
  </div>
  <form class="form" @submit.prevent="handleLogin">
    <input class="text-input" v-model="email" placeholder="Enter your email" />
    <input class="text-input" v-model="password" placeholder="Enter your password" />
    <input class="text-input" v-model="confirmPassword" placeholder="Confirm your password" />

    <FormButton>Register</FormButton>
  </form>
</template>

<script>
import { supabase } from '@/supabase';
import FormButton from '@/components/user_interface/FormButton.vue'

export default {
  name: "Register",
  components: {
    FormButton
  },
  data() {
    return {
      errorMsg: null,
      loading: false,
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    async handleLogin() {
      if (this.password == this.confirmPassword){
        try {
          this.loading = true;
          const { data, error } = await supabase.auth.signUp({ email: this.email, password: this.password});
          if (error) throw error;
        } catch (error) {
          this.errorMsg = error.message;
          setTimeout(() => {
            this.errorMsg = null;
          }, 4000);
        } finally {
          this.loading = false;
        }        
      } else {
        this.errorMsg = "Passwords do not match";
          setTimeout(() => {
            this.errorMsg = null;
          }, 4000);
      }

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