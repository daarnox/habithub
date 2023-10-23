<template>
  <div v-show="displayTimer" class="backdrop">
    <div class="clock">
      <div class="card">
        <div class="rating">
          <h2 class='curr-time'>00:00</h2>
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
      counterCurrentTime: 0,
      timerDuration: 5
    };
  },
  components: {
    FormButton,
  },
  props: [],
  methods: {
    showNotification() {
      const toastColor = getComputedStyle(document.body).getPropertyValue('--mainColor');
      createToast(
        {
          title: "Time is up",
          description: "New tree has been planted",
        },
        {
          timeout: 5000,
          toastBackgroundColor: toastColor,
          hideProgressBar: true,
          position: 'top-center',
        }
      );
    },
    closeTimer() {
      this.displayTimer = false;
      this.$emit("closeTimer");
    },
    startTimer() {

      const counterTimeLeft = localStorage.getItem('counterTimeLeft');
      this.counterCurrentTime = (counterTimeLeft != null) ? (counterTimeLeft) : (this.timerDuration);

      const rating = document.getElementsByClassName("rating")[0];
      rating.innerHTML = "<h2 class='curr-time'></h2>";
      rating.innerHTML += "<div class='block'></div>";
      const block = document.getElementsByClassName("block");

      for (var i = 1; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        block[i].style.transform = "rotate(" + 3.6 * i + "deg)";
        if (i / 100 > (1.0 - (this.counterCurrentTime / (this.timerDuration * 1.0))))
          block[i].style.animationDelay = `${(i / 100 - (1.0 - this.counterCurrentTime / (this.timerDuration * 1.0))) * this.timerDuration}s`;
      }

      const counter = document.querySelector(".curr-time");

      const IncrementCounter = () => {
        if (this.counterCurrentTime >= 0) {
          let minutes = Math.floor(this.counterCurrentTime / 60);
          let seconds = this.counterCurrentTime % 60;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          counter.innerText = minutes + ":" + seconds;
          this.counterCurrentTime--;
          localStorage.setItem('counterTimeLeft', this.counterCurrentTime);    

          setTimeout(() => {
            IncrementCounter();
          }, 1000);
        }
      };

      IncrementCounter();

      setTimeout(() => {
        this.showNotification();
        localStorage.removeItem('counterTimeLeft');
        store.addRandomTree();
        this.displayTimer = false;
      }, this.counterCurrentTime * 1000 + 2000);

    },
  },
  created() {
  },
  mounted() {
    const counterTimeLeft = localStorage.getItem('counterTimeLeft');
    if (counterTimeLeft != null) {
      this.displayTimer = true;
      this.startTimer();
    }
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
  background: var(--timerBackground);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-color: var(--mainColor);
  border-style: solid;
  box-shadow:
    /* -5px -5px 5px rgba(255, 0, 191, 0.5), */
    -7px -7px 7px rgba(35, 227, 254, 0.3),
    /* 5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -10px -10px 10px rgba(35, 227, 254, 0.2);
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
  width: 450px;
  height: 450px;
}

.card .rating {
  position: relative;
  width: 100%;
  height: 100%;
}

.block {
  position: absolute;
  width: 1px;
  height: 125px;
  background: var(--mainColor);
  left: 50%;
  transform-origin: 50% 222px;
  opacity: 0;
  animation: animate 0.1s linear forwards;
  box-shadow: 0 0 15px var(--mainColor), 0 0 30px var(--mainColor);
}

@keyframes animate {
  to {
    opacity: 1;
  }
}

.curr-time {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--timerCounter);
  font-size: 2.5em;
  font-weight: 500;
  text-align: center;
  line-height: 1.5em;
}
</style>