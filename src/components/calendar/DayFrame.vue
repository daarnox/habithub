<template>
    <div :class="borderClass" class="flex-display">
        <p style="color: #9cdcfe">{{ formattedDate }}</p>
        <p v-for="st in singleTasksList">{{ st }}</p>
        <div :class="scoreClass">
            <p>{{ date.percentage }}</p>
        </div>
    </div>
</template>
  
<script>
import dayjs from 'dayjs';
import { store } from '@/store/store';

export default {
    name: "DayFrame",
    props: ["date"],
    data() {
        return {
        };
    },
    computed: {
        formattedDate() {
            const parsedDate = dayjs(this.date.date, 'YYYY-MM-DD');
            return parsedDate.format('DD/MM');
        },
        borderClass() {
            // dayjs.format('YYYY-MM-DD');
            if (dayjs().isSame(dayjs(this.date.date, 'YYYY-MM-DD'), 'day')) {
                return 'today-border day-frame'
            }
            else if (dayjs().isAfter(dayjs(this.date.date, 'YYYY-MM-DD'), 'day')) {
                return 'past-border day-frame'
            }
            else return 'default-border day-frame'
        },
        scoreClass() {
            if (this.date.percentage >= 75) return 'score-green'
            else if (this.date.percentage >= 50) return 'score-yellow'
            else return 'score-red'
        },
        singleTasksList() {
            //TODO: terrible code, this part shouldnt exist, change it all
            //console.log(this.date)
            let result = [];
            for (const exec of this.date.executions) {
                // console.log(exec)
                const indexToCheck = store.tasks.findIndex(t => t.id === exec.task_id);
                if (indexToCheck !== -1) {
                    if (!store.tasks[indexToCheck].is_regular) result.push(store.tasks[indexToCheck].name)

                } else {
                    console.log('No object found with the specified date.');
                }
            }
            return result
        }
    }
};
</script>

<style scoped>
.score-red {
    padding-bottom: 5px;
    border: solid #900603;
    color: #900603;
    border-width: 0 2px 2px 2px;
}

.score-yellow {
    padding-bottom: 5px;
    border: solid #fada5e;
    color: #fada5e;
    border-width: 0 2px 2px 2px;
}

.score-green {
    padding-bottom: 5px;
    border: solid #529955;
    color: #529955;
    border-width: 0 2px 2px 2px;
}

.flex-display {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.today-border {
    border-color: white;
    background-color: #2b2b2b;
}

.past-border {
    background-color: #2b2b2b;
    border-color: #1e1e1e;
}

.default-border {
    border-color: #1e1e1e;
}

.day-frame {

    border-style: solid;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    height: 100%;
    flex-grow: 1;
}

.day-frame:hover {
    background-color: #1e1e1e;
}
</style>

