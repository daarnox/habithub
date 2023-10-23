<template>
    <AddHabit v-if="showAddHabitMenu" @closeAddHabit="toggleAddHabitMenu" v-bind:date="day.date" />
    <div :class="borderClass" class="flex-display" @mouseover="hover = true" @mouseleave="hover = false">

        <div v-if="hover" class="plus-background" @click="toggleAddHabitMenu">+</div>

        <p style="color: var(--mainColor)">{{ formattedDate }}</p>
        <div style="overflow:hidden;">
            <p v-for="(st,index) in singleTasksList" v-bind:key="index" style="text-overflow: ellipsis; white-space: nowrap;">{{ st }}</p>
        </div>
        <div :class="scoreClass">
            <p v-if="dateType != 'future'">{{ dayPercentage }}%</p>
        </div>
    </div>
</template>
  
<script>
import dayjs from 'dayjs';
import { store } from '@/store/store';
import AddHabit from '@/components/habits/AddHabit.vue';

export default {
    name: "DayFrame",
    props: ["day"],
    data() {
        return {
            hover: false,
            showAddHabitMenu: false,
        };
    },
    components: {
        AddHabit
    },
    methods: {
        toggleAddHabitMenu() {
            this.showAddHabitMenu = !this.showAddHabitMenu;
        },
    },
    computed: {
        formattedDate() {
            const parsedDate = dayjs(this.day.date);
            return parsedDate.format('DD/MM');
        },
        dateType() {
            if (dayjs().isSame(dayjs(this.day.date, 'YYYY-MM-DD'), 'day')) {
                return 'today'
            }
            else if (dayjs().isAfter(dayjs(this.day.date, 'YYYY-MM-DD'), 'day')) {
                return 'past'
            }
            else return 'future'
        },
        borderClass() {
            // dayjs.format('YYYY-MM-DD');
            if (this.dateType == 'today') {
                return 'today-border day-frame'
            }
            else if (this.dateType == 'past') {
                return 'past-border day-frame'
            }
            else return 'default-border day-frame'
        },
        scoreClass() {
            if (this.dateType == 'future') return 'score-none'
            else if (this.dayPercentage >= 75) return 'score-green'
            else if (this.dayPercentage >= 50) return 'score-yellow'
            else return 'score-red'
        },
        singleTasksList() {
            let result = [];
            this.day.tasks.forEach((task) => {

                if (task.type === "ON_DATE") {
                    if (task.executions !== undefined)
                        result.push(task.name);
                } else if (task.type === "UNTIL_DATE") {
                    result.push(task.name)
                }

            })
            return result;
        },
        dayPercentage() {       
            let doneTasks = 0;
            let totalTasks = 0;
            this.day.tasks.forEach((task) => {
                if (task.type === "REGULAR"){
                    totalTasks++;
                    if(task.executions !== undefined) doneTasks++;
                } 
                if (task.type === "UNTIL_DONE" && task.executions !== undefined) {
                    totalTasks++;
                    doneTasks++;
                }
                if (task.type === "ON_DATE") {
                    if (task.executions !== undefined) {
                        totalTasks++;
                        if (task.executions.is_done) doneTasks++;
                    }
                }
            });
            return totalTasks > 0 ? ((doneTasks * 1.0 / totalTasks) * 100 | 0) : 100;
        },
    }
};
</script>

<style scoped>
.plus-background {
    top: 0;
    left: 0;
    position: absolute;
    /* top: 50px; */
    background: rgba(0, 0, 0, 0.35);
    /* border: solid #9cdcfe; */
    color: var(--mainColor);
    border-width: 2px 2px 2px 2px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* z-index: 99; */
    font-size: 50px;
    cursor: pointer;
}

.score-none {
    padding-bottom: 5px;
    /* border: solid #9cdcfe;
    color: #9cdcfe;
    border-width: 0 2px 2px 2px; */
}

.score-red {
    padding-bottom: 5px;
    border: solid #900603;
    color: #900603;
    /* border-width: 0 2px 2px 2px; */
    border-width: 0 0px 2px 0px;
}

.score-yellow {
    padding-bottom: 5px;
    border: solid #fada5e;
    color: #fada5e;
    border-width: 0 0px 2px 0px;
}

.score-green {
    padding-bottom: 5px;
    border: solid #529955;
    color: #529955;
    border-width: 0 0px 2px 0px;
}

.flex-display {
    /* flex-grow: 1; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    position: relative;
}

.today-border {
    border-color: var(--mainTextColor);
    background-color: var(--background4);
}

.past-border {
    background-color: var(--pastDayBackground);
    border-color: var(--background1);
}

.default-border {
    border-color: var(--background1);
    background-color: var(--background2);
}

.day-frame {

    border-style: solid;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    height: 100%;
    overflow: hidden;
    /* flex-grow: 1; */
}

.day-frame:hover {
    background-color: var(--background1);
    border-color: var(--mainColor);
    /* border: solid 
    border-width: 2px 2px 2px 2px; */
}
</style>

