<template>
    <div :class="borderClass">
        <p style="color: #9cdcfe">{{formattedDate}}</p>
    </div>
</template>
  
<script>
    import dayjs from 'dayjs';

    export default {
        name: "DayFrame",
        props: ["date"],
        data() {
            return {
            };
        },
        computed: {
            formattedDate() {
                const parsedDate = dayjs(this.date, 'YYYY-MM-DD');
                return parsedDate.format('DD/MM');
            },
            borderClass(){
                // dayjs.format('YYYY-MM-DD');
                if (dayjs().isSame(dayjs(this.date, 'YYYY-MM-DD'),'day')){
                    return 'today-border day-frame'
                }
                else if(dayjs().isAfter(dayjs(this.date, 'YYYY-MM-DD'),'day')){
                    return 'past-border day-frame'
                }
                else return 'default-border day-frame'
            }
        }
    };
</script>

<style scoped>
.today-border{
    border-color: white;
    background-color: #2b2b2b;
}
.past-border {
    background-color: #2b2b2b;
    border-color: #1e1e1e;
}
.default-border{
    border-color: #1e1e1e;
}
.day-frame{

    border-style: solid;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    height: 100%;
    flex-grow: 1;
}
.day-frame:hover{
     background-color: #1e1e1e;   
}
</style>

