<template>
    <div class="calendar">
        <h1>calendar:</h1>

        <div class="week">
            <h2 style="color: var(--mainColor); padding-right: 20px;">//prev week</h2>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%">
                <DayFrame v-for="day in previusWeekDates" :key="day" v-bind:day="day" />
            </div>
        </div>

        <div class="week">
            <h2 style="color: var(--mainColor); padding-right: 20px;">//curr week</h2>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%">
                <DayFrame v-for="day in currentWeekDates" :key="day" v-bind:day="day" />
            </div>
        </div>

        <div class="week">
            <h2 style="color: var(--mainColor); padding-right: 20px;">//next week</h2>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%">
                <DayFrame v-for="day in nextWeekDates" :key="day" v-bind:day="day" />
            </div>
        </div>



    </div>
</template>
  
<script>
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import DayFrame from '@/components/calendar/DayFrame.vue'
import { store } from '@/store/store';

export default {
    name: "Calendar",
    components: {
        DayFrame
    },
    data() {
        return {
        };
    },
    created() {
        dayjs.extend(timezone);

    },
    computed: {
        previusWeekDates() {
            if (store.callendarDatesAreSet) return store.currentCalendarData.slice(0, 7);
            else return [];
        },
        currentWeekDates() {
            if (store.callendarDatesAreSet) return store.currentCalendarData.slice(7, 14);
            else return [];
        },
        nextWeekDates() {
            if (store.callendarDatesAreSet) return store.currentCalendarData.slice(14, 21);
            else return [];
        },
    }

};
</script>

<style scoped>
.calendar {
    width: 100%;
    height: 100%;
    background-color: var(--background3);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.week {
    height: 26%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding-left: 50px;
    padding-right: 50px;
    /* border-color: darkgreen; */
    /* border-style: solid; */
}
</style>

