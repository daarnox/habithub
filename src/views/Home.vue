<template>
  <!-- <Timer v-if="showTimer" @closeTimer="toggleTimer" /> -->
  <div class="view-container">
    <div class="container">
      <div class="top-part" style="display: flex; padding: 50px">
        <div style="flex: 1; background-color: none"></div>
        <div style="background-color: none">
          <h1>hello {{ userName }}, welcome to home page:</h1>
        </div>
        <div style="flex: 1; background-color: none"></div>
      </div>

      <div class="main-part" style="height: 100%">
        <div class="part" style="float: left">
          <h1 style="margin: 10px; color: var(--mainColor)">//options:</h1>
          <div class="cont">
            <div style="display: flex; align-items: center">
              <label for="allowUpdates" style="padding: 20px">
                allow every day updates</label
              >
              <input
                type="checkbox"
                id="allowUpdates"
                @click="toggleAllowUpdates"
                :checked="allowUpdates"
              />

              <!-- <p v-if="store.allowUpdates">test</p> -->
            </div>
            <div style="display: flex; align-items: center">
              <label for="chosenStyle" style="padding: 20px">
                toggle page style</label
              ><br />
              <input
                type="checkbox"
                id="chosenStyle"
                @click="changeCssStyle"
                :checked="chosenStyle"
              />
            </div>
            <!-- temporary toggle timer button -->
            <FormButton class="button" @click="toggleTimer">
              start timer
            </FormButton>
          </div>
        </div>
        <div class="part" style="float: right">
          <h1 style="margin: 10px; color: var(--mainColor)">//forest:</h1>
          <!-- <h1 style="color:#9cdcfe">//future feature</h1> -->
          <Forest></Forest>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase";
import { store } from "@/store/store";

import Forest from "@/components/forest/Forest.vue";
import Timer from "@/components/forest/Timer.vue";
import FormButton from "@/components/user_interface/FormButton.vue";

export default {
  name: "HomeView",
  components: {
    Forest,
    Timer,
    FormButton,
  },
  data() {
    return {
      store,
      // showTimer: false,
    };
  },
  computed: {
    userName() {
      if (store.user != null) {
        const fullEmail = store.user.email;
        const userName = fullEmail.split("@")[0];
        return userName;
      }
    },
    allowUpdates() {
      if (store.userData != null) {
        return store.userData.allow_updates;
      }
    },
    chosenStyle() {
      if (store.userData != null) return store.userData.chosen_style;
    },
  },
  methods: {
    async toggleAllowUpdates() {
      const { data, error } = await supabase
        .from("users")
        .update({ allow_updates: !store.userData.allow_updates })
        .eq("id", store.user.id)
        .select();
      //TODO: confirm sending a request
      store.userData = data[0];
    },
    async changeCssStyle() {
      const { data, error } = await supabase
        .from("users")
        .update({ chosen_style: !store.userData.chosen_style })
        .eq("id", store.user.id)
        .select();
      //TODO: confirm sending a request
      store.userData = data[0];

      // var r = document.querySelector(':root');
      // if (store.userData.chosen_style) {
      //   r.style.setProperty('--mainColor', '#9cdcfe');
      //   r.style.setProperty('--mainDarkColor', '#1e2c33');
      // } else {
      //   r.style.setProperty('--mainColor', '#529955');
      //   r.style.setProperty('--mainDarkColor', '#182e19');
      // }
    },
    toggleTimer() {
      // this.showTimer = !this.showTimer;
      // const emitter = mitt();
      store.emitter.emit("showTimer", { a: "test" });
    },
  },
  mounted() {


  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  justify-content: start;
}

.cont {
  /* background-color: yellow; */
  height: 100%;
  width: 100%;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border-color: #2b2b2b;
border-style: solid; */
}

.part {
  float: left;
  width: 48%;
  background-color: #1e1e1e;
  margin: 1%;
  height: 90%;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: #2b2b2b;
  border-style: solid;
  /* position: relative; */
}

input[type="checkbox"] {
  position: relative;
  width: 60px;
  height: 30px;
  -webkit-appearance: none;
  background: #252525;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

input[type="checkbox"]:checked {
  background: #2b2b2b;
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 27px;
  height: 27px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #919191;
  /* transform: scale(1.1); */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

input:checked[type="checkbox"]:before {
  left: 32px;
  background: var(--mainColor);
  transform: scale(1.1);
}
</style>