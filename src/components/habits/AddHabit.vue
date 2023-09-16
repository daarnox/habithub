<template>
    <div class="backdrop" @click.self="closeAddHabit">
        <form class="form" @submit.prevent="postData" method="post">
            <h1>add a habit</h1>
            <input class="text-input" type="text" name="name" placeholder="name" v-model="task.name"><br><br>
            <input class="text-input" type="text" name="details" placeholder="details" v-model="task.description"><br><br>
            <!-- <div>
                <input type="checkbox" id="isRegular" name="isRegular" value="false" v-model="task.is_regular">
                <label for="isRegular"> Save as regular task</label>
            </div> -->
            <!-- //<label for="types">Choose a task's type:</label> -->

            <select name="types" id="types" v-model="task.type">
                <option disabled value="">Please select one</option>
                <option value="regular">Regular</option>
                <option value="on_date">Single on date</option>
                <option value="until_date">Single until date</option>
                <option value="until_done">Single until done</option>
            </select>
            <input type="submit" class="button" :value="'Add Habit'" />
        <div v-if="errorMsg">
            <p style="color:red; padding:10px">{{ errorMsg }}</p>
        </div>            
        </form>

    </div>
</template>

<script>
import { store } from '@/store/store'

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
                await store.addTask(this.task);
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
    background: #1e1e1e;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-color: #fff;
    border-style: solid;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.65);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
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
    color: #616467;
    box-shadow: inset 0 0 0 2px #fff;
    background-color: transparent;
    height: 48px;
}

.button:hover {
    color: #fff;
    background-color: #529955;
}

.text-input {

    display: inline-block;
    outline: none;
    font-size: 10px;
    line-height: 1;
    border-radius: 500px;
    border: 1px solid transparent;
    letter-spacing: 2px;
    min-width: 160px;
    /* text-transform: uppercase; */
    white-space: normal;
    font-weight: 700;
    text-align: center;
    padding: 16px 14px 18px;
    color: #fff;
    box-shadow: inset 0 0 0 2px #fff;
    background-color: transparent;
    height: 48px;

}
</style>