import { reactive } from 'vue'

export const store = reactive({
  user: null,
  setUser(session) {
    this.user = session ? session.user : null;
  }
})