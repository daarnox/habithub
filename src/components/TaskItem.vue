<template>
    <li v-if="display">
      <button @click.self="$emit('complete')" :class="className">   
        <!-- <span style="color:#dcdcaa">{{task.name}}</span>
        <span style="color:#c586c0">(</span>
        <span style="color:#9cdcfe">{{task.details}}</span>
        <span style="color:#c586c0">)</span> -->
        <span v-if="displayIfCompleted" style="text-decoration:none;">//</span>
        {{task.name}} ({{task.details}})
      </button> 
    </li>
</template>
  
<script>
  export default {
    name: "TaskItem",
    props: ["task", "displayIfCompleted"],
    computed: { 
      className() {
        let classes = ['toggle'];
        if(this.task.completed) {
          classes.push('toggle-completed');
        }
        return classes.join(' ');
      },
      display() {

        //return !this.task.completed

        if(this.displayIfCompleted) {
          return this.task.completed
        } else {
          return !this.task.completed
        }
      }
    }
  };
</script>

<style scoped>
li {
  /* justify-content: space-between; */
  margin: 0 0 20px;
}

button {
  width:80%;
  height: 100%;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  font-family: Consolas;
  border-radius: 35px;
}

button:hover {
  color: #d7ba7d;
}

.toggle.toggle-completed {
  text-decoration:line-through;
  color: #529955;
}

</style>

