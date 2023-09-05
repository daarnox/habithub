<template>
  <li :class="{ 'toggle-completion': isBeingToggled }">
    <button @click.self="toggleTaskCompletion()" :class="{ 'task-completed': isCompleted }">
      <!-- <span style="color:#dcdcaa">{{task.name}}</span>
        <span style="color:#c586c0">(</span>
        <span style="color:#9cdcfe">{{task.details}}</span>
        <span style="color:#c586c0">)</span> -->
      <span v-if="isCompleted" style="text-decoration:none;">//</span>
      {{ task.name }} ({{ task.description }})
    </button>
    <Icon v-if="!isBeingToggled" icon="iconamoon:trash-duotone" @click="removeTask()" />
    <Icon v-if="isBeingToggled" icon="icon-park-outline:back-one" @click="cancelToggle()" />
  </li>
</template>
  
<script>
import { Icon } from '@iconify/vue';
import { store } from '@/store/store';

export default {
  name: "TaskItem",
  data() {
    return {
      isBeingToggled: false,
    }

  },
  props: ["task"],
  computed: {
    isCompleted() {
      return this.task.completed;
    },
  },
  methods: {
    async toggleTaskCompletion() {
      this.isBeingToggled = true;
      setTimeout(() => {
        if(this.isBeingToggled) store.toggleTaskCompletion(this.task);
      }, 2000);

    },
    cancelToggle(){
      this.isBeingToggled = false;
    },
    async removeTask() {
      store.removeTask(this.task);
    }
  },
  components: {
    Icon
  }
};
</script>

<style scoped>
li {
  /* justify-content: space-between; */
  margin: 0 0 20px;
  /* background-color: #1e1e1e; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* padding: 8px;  */
  border-radius: 35px;

  overflow: hidden;
  transition: all .1s;
  position: relative;
  z-index: 1;
}

li::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  z-index: -2;
}

li::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #2b2b2b;
  transition: all 2s;
  z-index: -1;
}

.toggle-completion::before {
  width: 100%;
}

button {
  width: 80%;
  height: 100%;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  font-family: Consolas;
  border-radius: 35px;
  /* border-color: #2b2b2b;
  border-style: solid; */
}

button:hover {
  color: #d7ba7d;
}

.task-completed {
  text-decoration: line-through;
  color: #529955;
}

.task-completed:hover {
  color: white;
}
</style>

