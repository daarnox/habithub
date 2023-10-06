<template>
  <div v-show="displayTimer" class="backdrop" @click.self="closeTimer">
    <!-- <div v-show="true" class="backdrop" @click.self="closeTimer"> -->
    <div class="clock">
      <div class="card">
        <div class="rating">
          <div class="block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store/store";
import FormButton from "@/components/user_interface/FormButton.vue";

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default {
  data() {
    return {
      displayTimer: false,
      counterTime: 0,
    };
  },
  components: {
    FormButton,
  },
  props: [],
  methods: {
    closeTimer() {
      this.displayTimer = false;
      this.$emit("closeTimer");
    },
    startTimer() {
      const time = 5;
      const rating = document.getElementsByClassName("rating")[0];
      rating.innerHTML = "<h2 class='test'></h2>";
      rating.innerHTML += "<div class='block'></div>";
      const block = document.getElementsByClassName("block");

      for (var i = 1; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        block[i].style.transform = "rotate(" + 3.6 * i + "deg)";
        block[i].style.animationDelay = `${(i / 100) * time}s`;
      }

      this.counterTime = time + 1;
      const counter = document.querySelector(".test");

      const IncrementCounter = () => {
        if (this.counterTime > 0) {
          this.counterTime--;
          let minutes = Math.floor(this.counterTime / 60);
          let seconds = this.counterTime % 60;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          counter.innerText = minutes + ":" + seconds;
          setTimeout(() => {
            IncrementCounter();
          }, 1000);
        }
      };

      IncrementCounter();

      setTimeout(() => {
        store.addRandomTree();
        this.displayTimer = false;
        this.showNotification();
      }, time * 1000 + 1000);
    },


    showNotification() {
      createToast(
        {
          title: "Time is up",
          description: "New tree has been planted",
        },
        {
          timeout: 5000,
          toastBackgroundColor: "#529955",
          hideProgressBar: true,
        }
      );
    },
    
  },
  created() {},
  mounted() {
    store.emitter.on("showTimer", (a) => {
      this.displayTimer = true;
      this.startTimer();
    });
  },
};
</script>

<style scoped>
.clock {
  width: 450px;
  height: 450px;
  /* padding: 50px; */
  background: #1e1e1e;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-color: var(--mainColor);
  border-style: solid;
  box-shadow:
    /* -5px -5px 5px rgba(255, 0, 191, 0.5), */ -5px -5px 5px rgba(35, 227, 254, 0.3),
    /* 5px 5px 5px rgb(0, 0, 0, 0.2), */ inset -5px -5px 5px
      rgba(35, 227, 254, 0.2);
  /* inset 5px 5px 5px rgb(0, 0, 0, 0.2);  */
}

.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.65);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.card {
  position: relative;
  /* width: 300px; */
  /* height: 300px; */
  width: 450px;
  height: 450px;
  /* background: red; */
}

.card .rating {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: #500; */
}
</style>