<template>
  <div class="summary">
    <Calendar/>
    </div>
</template>

<script>


import Calendar from '@/components/calendar/Calendar.vue'

export default {
  name: 'Summary',
  components: {
    Calendar
  },
};
</script>

<style scoped>

.summary {
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
</style>