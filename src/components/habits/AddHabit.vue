<template>
    <div class="backdrop" @click.self="closeAddHabit">
        <form class="form" @submit.prevent="postData" method="post">
            <h1>add a task</h1>
            <input class="text-input" type="text" name="name" placeholder="name" v-model="task.name"><br><br>
            <input class="text-input" type="text" name="details" placeholder="details" v-model="task.description"><br><br>
            <!-- <div>
                <input type="checkbox" id="isRegular" name="isRegular" value="false" v-model="task.is_regular">
                <label for="isRegular"> Save as regular task</label>
            </div> -->
            <!-- //<label for="types">Choose a task's type:</label> -->

            <select v-model="task.type" class="option-select" selectedOption="0">
                <option disabled value="0">Please select one</option>
                <option value="REGULAR">regular</option>
                <option value="ON_DATE">on date</option>
                <option value="UNTIL_DATE">until date</option>
                <option value="UNTIL_DONE">until done</option>
            </select>
            <!-- <input type="submit" class="button" :value="'Add Task'" /> -->
            <FormButton>add Task</FormButton>
        <div v-if="errorMsg">
            <p style="color:red; padding:10px">{{ errorMsg }}</p>
        </div>            
        </form>

    </div>
</template>

<script>
import { store } from '@/store/store'
import FormButton from '@/components/user_interface/FormButton.vue'

export default {
    data() {
        return {
            errorMsg: null,
            task: {
                id: null,
                name: null,
                description: null,
                completed: false,
                type: null
            },
        }
    },
    components: {  
        FormButton,

    },
    props: ["date"],
    methods: {
        closeAddHabit() {
            this.$emit('closeAddHabit');
        },
        async postData(e) {
                //             await store.addTask(this.task);
                // this.$emit('closeAddHabit');
            if (this.task.name == null || this.task.description == null  || this.task.type == null ){
                this.errorMsg = "Fill all fields";
                setTimeout(() => {
                    this.errorMsg = null;
                }, 4000);

            } else {
                await store.addTask(this.task, this.date);
                this.$emit('closeAddHabit');
            }
        }
    }
}
</script>

<style scoped>
.form {
    width: 450px;
    height: 450px;
    padding: 50px;
    background: var(--background1);
    border-radius: 50%;
    color: var(--mainTextColor);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-color: var(--mainColor);
    border-style: solid;
    box-shadow:
    /* -5px -5px 5px rgba(255, 0, 191, 0.5), */
    -5px -5px 5px rgba(35, 227, 254, 0.3),
    /* 5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -5px -5px 5px rgba(35, 227, 254, 0.2);
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
    z-index: 99;
}

.text-input {
  display: inline-block;
  outline: none;
  font-size: 10px;
  line-height: 1;
  border-radius: 500px;
  /* border: 1px solid transparent; */
  border-style: none;
  letter-spacing: 2px;
  min-width: 160px;
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: var(--mainTextColor);
  /* box-shadow: inset 0 0 0 2px #fff; */
  /* background-color: transparent; */
  background-color: var(--background2);
  /* background-color: #1e1e1e; */
  height: 48px;
  box-shadow:
    /* -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2);
}

.option-select{
  font-size: 15px;
  font-family: consolas;
  line-height: 1;
  border-radius: 500px;
  border-style: none;
  letter-spacing: 2px;
  min-width: 160px;
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: var(--mainTextColor);
  /* box-shadow: inset 0 0 0 2px #fff; */
  /* background-color: transparent; */
  background-color: var(--background2);
  /* background-color: #1e1e1e; */
  height: 48px;
  box-shadow:
    /* -5px -5px 5px rgba(70, 70, 70, 0.1),
    5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -5px -5px 5px rgba(70, 70, 70, 0.1),
    inset 5px 5px 5px rgb(0, 0, 0, 0.2);


}


</style>