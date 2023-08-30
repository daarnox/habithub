<template>
  <AddHabit v-if="showAddHabitMenu" @closeAddHabit="toggleAddHabit" />
  <div class="habits">
    <div class="container">


      <div class="top-part" style="display:flex; padding:50px;">
        <div style="flex: 1; background-color: none;">
        </div>
        <div style="background-color: none;">
          <h1>today's tasks:</h1>
        </div>
        <div style="flex: 1;  background-color: none;">
          <button class="button" @click="toggleAddHabit" style="float: right; margin-right: 90px;">
            <Icon icon="material-symbols:add" />Add Habit
          </button>    
        </div>
      </div>


      <div class="main-part">
        <div class="left-part">
          <h1 style="margin: 10px; color:#529955">//todo:</h1>
          <div class="task-list">
            <ul>
              <TaskItem v-for="(habit, index) in habits" :key="habit.id" v-bind:task="habit"
                v-bind:displayIfCompleted="false" @remove="removeTask(index)" @complete="completeTask(habit)"
                class="task-list-item" />
            </ul>
          </div>
        </div>

        <div class="right-part">
          <h1 style="margin: 10px; color:#529955">//done:</h1>
          <div class="task-list">
            <ul>
              <TaskItem v-for="(habit, index) in habits" :key="habit.id" v-bind:task="habit" v-bind:displayIfCompleted="true"
                @remove="removeTask(index)" @complete="completeTask(habit)" class="task-list-item" />
            </ul>
          </div>
        </div>
      </div>
      </div>


  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

import TaskItem from '@/components/TaskItem.vue';

import AddHabit from '@/components/AddHabit.vue';

export default {
  data() {
    return {
      habits: [
        {id:1, name:"Coding", details:"for 5 hours", completed:false},
        {id:2, name:"Push Ups", details:"50 a day", completed:false},
        {id:3, name:"Reading", details:"for 30 minutes", completed:false},
        {id:4, name:"Running", details:"at least 4km", completed:false},
      ],
      showAddHabitMenu: false,
    }
  },
  mounted() {
    // fetch('http://localhost:3000/habits')
    //   .then(res => res.json())
    //   .then(data => this.habits = data)
    //   .catch(err => console.log(err.message));
  },
  components: {
    Icon,
    TaskItem,
    AddHabit
  },
  methods: {
    completeTask(habit) {
      habit.completed = !habit.completed;
    },
    toggleAddHabit() {
      this.showAddHabitMenu = !this.showAddHabitMenu;
    }

  },
  // computed: {
  //   className() {
  //     let classes = ['task'];
  //     if(this.task.completed) {
  //       classes.push('task-completed');
  //     }
  //     return classes.join(' ');
  //   }
  // }
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
    flex-direction:column;
    /* justify-content: space-evenly; */
    justify-content: start;
}

.top-part{
  /* background-color: red; */
}

.main-part{
  /* background-color: yellow; */
}


.left-part {
  float: left;
  width: 48%;
  /* background-color:#252525; */
  margin: 1%;
  height: 90%;
}

.right-part {
  float: right;
  width: 48%;
  /* background-color: #252525; */
  margin: 1%;
  height: 90%;
}

.task-list-item {
  background-color: #1e1e1e;;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 8px;  */
  border-radius: 35px;
  margin-bottom: 12px;

}


.button {

  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: .3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #fff;
  box-shadow: inset 0 0 0 2px #fff;
  background-color: transparent;
  height: 48px;
}

.button:hover {
  background-color: #529955;
}

/* .task-list-item input {
  width: 16px;
  height: 16px;
  border: 1px solid red;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: 10px;
}

.task-list-item input:hover  {
  border-color: #006466;
}

.task-list-item input:checked {
  border-color: #006466;
  background-color: #006466;
} */

/* .task-list-item li {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
}

.task-list-item button {
  background: none;
  border: none;
}

.task-list-item button:hover {
  color: #4ec5c1;
} */</style>