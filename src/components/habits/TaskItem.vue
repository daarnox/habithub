<template>
  <li :class="{ 'toggle-completion': isBeingToggled }">
    <button
      :disabled="disableToggle"
      @click.self="toggleTaskCompletion()"
      :class="{ 'task-important': isImportant, 'task-completed': isCompleted }"
    >
      <!-- <span style="color:#dcdcaa">{{task.name}}</span>
        <span style="color:#c586c0">(</span>
        <span style="color:#9cdcfe">{{task.details}}</span>
        <span style="color:#c586c0">)</span> -->

      <span v-if="isCompleted" style="text-decoration: none">//</span
      >{{ task.name }} ({{ task.description }})
    </button>
    <Icon
      v-if="!isBeingToggled"
      icon="iconamoon:trash-duotone"
      @click="removeTask()"
      class="trash"
    />
    <Icon
      v-if="isBeingToggled"
      icon="icon-park-outline:back-one"
      @click="cancelToggle()"
    />
  </li>
</template>
  
<script>
import { Icon } from "@iconify/vue";
import { store } from "@/store/store";
import { supabase } from "@/supabase";
import dayjs from "dayjs";
import { isMemoSame } from "vue";

export default {
  name: "TaskItem",
  data() {
    return {
      isBeingToggled: false,
    };
  },
  props: ["task"],
  async mounted() {},
  computed: {
    isCompleted() {
      if (this.task.executions == null) return false;
      else return this.task.executions.is_done;
    },
    disableToggle() {
      const currentDate = dayjs(store.currentDisplayDate);
      const todaysDate = dayjs(store.todaysDate);
      const differenceInDays = currentDate.diff(todaysDate, "day");
      if (store.userData != null) {
        if (store.userData.allow_updates === true) return false;
      }
      return Math.abs(differenceInDays) > 1;
    },
    isImportant() {
      // if (this.task.type === "REGULAR") {
      //   const index = store.tasks.findIndex(task => task.name === this.task.name);
      //   const task_executions = store.tasks[index];
      //   index = task_executions.findIndex(dayjs(executions.date).isSame(dayjs(store.currentDisplayDate)));
      //   if (index < 1) return true
      //   else return task_executions[index-1].date
      // } else return false;
      return false;
    },
  },
  methods: {
    async toggleTaskCompletion() {
      //need to pass a date to allow user switching days without waiting for a toggle to complete
      const currentDate = store.currentDisplayDate;
      if (this.isBeingToggled) this.cancelToggle();
      else {
        //TODO: delete cancelToggle and place all code here?
        this.isBeingToggled = true;
        store.emitter.emit("toggleTask", {
          task: this.task,
          currentDate: currentDate,
        });
      }
    },
    cancelToggle() {
      this.isBeingToggled = false;
      const cancelEventName = "cancel" + this.task.name + store.currentDisplayDate;
      store.emitter.emit(cancelEventName, "test");
    },
    async removeTask() {
      store.removeTask(this.task);
    },
  },
  components: {
    Icon,
  },
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
  transition: all 0.1s;
  position: relative;
  z-index: 1;
}

li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  z-index: -2;
}

li::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #2b2b2b;
  transition: all 2s;
  z-index: -1;
}

/* li:hover{
  border: solid #529955;
  border-width: 2px;
} */

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
  /* color: #d7ba7d; */
  color: var(--mainColor);
}

.task-completed:hover {
  color: white;
}

.task-important {
  color: red;
}
.task-completed {
  text-decoration: line-through;
  color: var(--mainColor);
}

button:disabled {
  pointer-events: none;
  opacity: 0.3;
}

.trash:hover {
  color: #c586c0;
}
</style>

