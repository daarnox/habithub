<template>
  <div v-show="displayTimer" class="backdrop" @click.self="closeTimer">
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
import mitt from "mitt";

export default {
  data() {
    return {
      displayTimer: false,
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

      const rating = document.getElementsByClassName("rating")[0];
      rating.innerHTML = " ";
      rating.innerHTML += "<div class='block'></div>";
      const block = document.getElementsByClassName("block");

      for (var i = 1; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        // transform-origin: 50% 100px;
        block[i].style.transform = "rotate(" + 3.6 * i + "deg)";
        block[i].style.animationDelay = `${i / 50}s`;
      }

      setTimeout(() => {
        // console.log("test");
        store.addRandomTree();
        this.displayTimer = false;
      }, 2500);
    },
  },
  created() {


  },
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
  padding: 50px;
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
  width: 300px;
  height: 300px;
}

.card .rating {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: #500; */
}

.block {
  position: absolute;
  width: 2px;
  height: 15px;
  background: var(--mainColor);
  left: 50%;
  transform-origin: 50% 150px;
  /* transform: rotate(25deg); */
  animation: animate 0.1s linear forwards;
}

@keyframes animate {
  to {
    opacity: 1;
  }
}

.card .rating h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
  line-height: 1.5em;
}

.card .rating h2 span {
  font-size: 2.5em;
  font-weight: 700;
}
</style>