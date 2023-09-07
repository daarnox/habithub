<template>
    <div class="calendar">
        <h1>calendar:</h1>

        <div class="week">
            <h2 style="color: #529955; padding-right: 20px;">//prev week</h2>
            <DayFrame v-for="date in previusWeekDates" :key="date" v-bind:date="date" />
        </div>

        <div class="week">
            <h2 style="color: #529955; padding-right: 20px;">//curr week</h2>
            <DayFrame v-for="date in currentWeekDates" :key="date" v-bind:date="date" />
        </div>

        <div class="week">
            <h2 style="color: #529955; padding-right: 20px;">//next week</h2>
            <DayFrame v-for="date in nextWeekDates" :key="date" v-bind:date="date" />
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
            // previusWeekDates: [],
            // currentWeekDates: [],
            // nextWeekDates: []
        };
    },
    created() {
        dayjs.extend(timezone);
        //this.getWeekDates();

        // this.currentDate = dayjs().tz('Europe/Warsaw').format('YYYY-MM-DD  HH:mm:ss'); // Format the current date
        // this.currentDate = dayjs().format('YYYY-MM-DD'); // Format the current date
    },
    methods: {
        // getWeekDates() {
        //     const startOfWeek = dayjs().startOf('week').add(1, 'day');          // week starts from monday instead of sunday
        //     this.currentWeekDates = Array.from({ length: 7 }, (_, index) =>     //new Array(7).fill(null)
        //         startOfWeek.add(index, 'day').format('YYYY-MM-DD'));

        //     const startOfPrevWeek = dayjs().startOf('week').subtract(6, 'day');
        //     this.previusWeekDates = Array.from({ length: 7 }, (_, index) =>
        //         startOfPrevWeek.add(index, 'day').format('YYYY-MM-DD'));

        //     const startOfNextWeek = dayjs().startOf('week').add(8, 'day');
        //     this.nextWeekDates = Array.from({ length: 7 }, (_, index) =>
        //         startOfNextWeek.add(index, 'day').format('YYYY-MM-DD'));
        // }
    },
    computed: {
        // callendarDates() {
        //     console.log("Callendar Dates have beeen set, length:" + Object.keys(store.callendarDates).length);
        //     result = [];  
        //     //TODO: convert to dictionary in store.js this whole code is redundant
        //     for (const [key, value] of Object.entries(store.callendarDates)) {
        //         result.push(value);
        //     }
        //     return result;
        // },
        previusWeekDates() {
            if(store.callendarDatesAreSet) return store.callendarDates.slice(0, 7);
            else return [];
        },
        currentWeekDates() {
            if(store.callendarDatesAreSet) return store.callendarDates.slice(7, 14);
            else return [];
        },
        nextWeekDates() {
            if(store.callendarDatesAreSet) return store.callendarDates.slice(14, 21);
            else return [];
        },
    }

};
</script>

<style scoped>
.calendar {
    width: 100%;
    height: 100%;
    background-color: #252525;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.week {
    height: 20%;
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

