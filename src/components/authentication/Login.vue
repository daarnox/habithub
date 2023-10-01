<template>
  <form class="form" @submit.prevent="handleLogin">
    <div v-if="errorMsg">
      <p style="color:red; padding:10px">{{ errorMsg }}</p>
    </div>
    <input type="email" class="text-input" v-model="email" placeholder="Enter your email" />
    <input type="password" class="text-input" v-model="password" placeholder="Enter your password" />

    <FormButton>Log In</FormButton>
  </form>
</template>

<script>
import { supabase } from '@/supabase';
import FormButton from '@/components/user_interface/FormButton.vue'

export default {
  name: "Login",
  components: {
    FormButton
  },
  data() {
    return {
      errorMsg: null,
      loading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;
        const { data, error } = await supabase.auth.signInWithPassword({ email: this.email, password: this.password });
        if (error) throw error;
      } catch (error) {
        this.errorMsg = error.message;
        setTimeout(() => {
          this.errorMsg = null;
        }, 4000);
      } finally {
        this.loading = false;
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
  justify-content: space-around;
  flex-direction: column;
  /* border-color: #fff;
  border-style: solid; */
}

.text-input {
  box-shadow:
    /* -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2);
  display: inline-block;
  outline: none;
  font-size: 10px;
  line-height: 1;
  border-radius: 500px;
  /* border: 1px solid transparent; */
  border-style: none;
  letter-spacing: 2px;
  min-width: 160px;
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  /* box-shadow: inset 0 0 0 2px #fff; */
  /* background-color: transparent; */
  background-color: #1e1e1e;
  /* background-color: #1e1e1e; */
  height: 48px;
}

/* .text-input:hover {
  box-shadow:
    -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2),
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2); 

} */
</style>