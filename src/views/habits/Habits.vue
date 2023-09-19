<template>
  <AddHabit v-if="showAddHabitMenu" @closeAddHabit="toggleAddHabitMenu" />
  <!-- @habitAdded="handleHabitAdded"/> -->
  <div class="view-container">
    <div class="container">

      <div class="top-part" style="display:flex; padding:50px;">
        <div style="flex: 1;">
          <!-- TODO: change all buttons to reused component -->
          <button class="button" @click="changeCurrentDisplayDate(-1)" style="float: left">
            <Icon icon="icon-park-outline:left" />
          </button>
          <button class="button" @click="changeCurrentDisplayDate(1)" style="float: left">
            <Icon icon="icon-park-outline:right" />
          </button>
        </div>
        <div style="">
          <h1>{{ dateTitle }} tasks:</h1>
        </div>
        <div style="flex: 1;">
          <button class="button" @click="toggleAddHabitMenu" style="float: right;">
            <!-- <Icon icon="material-symbols:add" /> add task -->
            add task
          </button>
        </div>
      </div>

      <div class="main-part">

        <div class="left-part">
          <h1 style="margin: 10px; color:#529955">//todo:</h1>
          <div class="task-list">
            <ul>
              <TaskItem v-for="(task, index) in uncompletedTasks" :key="task.id" v-bind:task="task" />
            </ul>
          </div>
        </div>

        <div class="right-part">
          <h1 style="margin: 10px; color:#529955">//done:</h1>
          <div class="task-list">
            <ul>
              <TaskItem v-for="(task, index) in completedTasks" :key="task.id" v-bind:task="task" />
            </ul>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

import TaskItem from '@/components/habits/TaskItem.vue';

import AddHabit from '@/components/habits/AddHabit.vue';

import { store } from '@/store/store';

import dayjs from 'dayjs'

export default {
  data() {
    return {
      habits: [],
      // habits: [
      //   { id: 1, name: "Coding", details: "for 5 hours", completed: false },
      //   { id: 2, name: "Push Ups", details: "50 a day", completed: false },
      //   { id: 3, name: "Reading", details: "for 30 minutes", completed: false },
      //   { id: 4, name: "Running", details: "at least 4km", completed: false },
      // ],
      showAddHabitMenu: false,
    }
  },
  mounted() {
    // fetch('http://localhost:3000/habits')
    //   .then(res => res.json())
    //   .then(data => this.habits = data)
    //   .catch(err => console.log(err.message));
    //this.fetchData();
  },
  components: {
    Icon,
    TaskItem,
    AddHabit
  },
  methods: {

    toggleAddHabitMenu() {
      this.showAddHabitMenu = !this.showAddHabitMenu;
    },
    changeCurrentDisplayDate(offset) {
      store.retrieveCurrentDayData(offset);
    }

  },
  computed: {
    allTasks() {
      return store.currentDateTasks;
    },
    completedTasks() {
      return this.allTasks.filter((task) => {
        if (task.executions != null)
          return task.executions.is_done;
        else return false;
      });
    },
    uncompletedTasks() {
      return this.allTasks.filter((task) => {
        if (task.executions != null)
          return !task.executions.is_done;
        else return true;
      });
    },
    dateTitle() {
      const currentDate = dayjs(store.currentDisplayDate);
      const todaysDate = dayjs(store.todaysDate);
      const differenceInDays = currentDate.diff(todaysDate, 'day');

      if (differenceInDays === -1) return 'yesterdays'
      else if (differenceInDays === 0) return 'todays'
      else if (differenceInDays === 1) return 'tomorrows'
      else return currentDate.format('DD/MM')
    }

  }
}
</script>

<style scoped>
.habits {
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  margin: auto;
  height: 88vh;
  width: 95vw;
  background-color: #1e1e1e;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  justify-content: start;
}

.top-part {
  /* background-color: red; */
}

.main-part {
  /* background-color: yellow; */
}


.left-part {
  float: left;
  width: 48%;
  margin: 1%;
  height: 90%;
}

.right-part {
  float: right;
  width: 48%;
  margin: 1%;
  height: 90%;
}

.button {
  /* display: inline-block; */
  /* height: 200px;
  width: 200px; */
  /* -webkit-appearance: none; */
  /* box-shadow:
    -5px -5px 5px rgba(82, 153, 85, 0.5),
    5px 5px 5px rgb(156, 220, 254, 0.2); */
  box-shadow:
    -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2);
  /* position: absolute; */
  /* transform: translate(-50%, -50%); */
  /* top: 50%;
  left: 50%; */
  /* border-radius: 50%; */
  border-radius: 50px;
  min-width: 50px;
  height: 50px;
  border: 5px solid #202020;
  background-color: #1e1e1e;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  font-family: consolas;
  margin: 5px;
  color: #fff;
  font-size: 14px;
  padding: 25px;
}

.button:hover {
  /* background-color: #529955; */
  box-shadow:
    -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2),
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2); 
  color: #529955;
}
</style>