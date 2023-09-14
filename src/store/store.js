import { reactive } from 'vue'
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const store = reactive({

  //user session
  user: null,
  //all tasks with all executions
  tasks: [],
  //todays date
  todaysDate: null,
  //used in task list and callendar to retrieve proper data
  currentDisplayDate: null,
  //list of filtered tasks accoring to currentDisplayDate
  currentDateTasks: [],
  //list of days and its data used in callendar
  callendarDates: [],
  //used to check if data is ready to be used
  callendarDatesAreSet: false,

  // new fields
  currentCalendarDatesWithTasks: [],

  setUser(session) {
    this.user = session ? session.user : null;
    //TODO: set current date here???? or maybe better just delete line below

    if (this.user != null && this.currentDisplayDate == null) {
      this.retreiveDate();
      this.retrieveCurrentDayData();
      this.retrieveCallendarData();
    }
  },
  async retrieveCallendarData() {
    this.callendarDatesAreSet = false;
    this.currentCalendarDatesWithTasks = [];
    const previousWeekMonday = dayjs(this.todaysDate).startOf('week').subtract(6, 'day').toISOString();
    const nextWeekSunday = dayjs(this.todaysDate).startOf('week').add(15, 'day').toISOString();
    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id, name, description, completed, is_regular,
      executions(id, created_at, is_done, task_date, task_id)
      `).eq('user_id', this.user.id)
      .filter('executions.task_date', 'gte', previousWeekMonday)
      .filter('executions.task_date', 'lte', nextWeekSunday);
    if (error != null) console.log(error.message)
    else {
      this.tasks = data;  //TODO: handle this differently
      const firstDay = dayjs(this.currentDisplayDate).startOf('week').subtract(6, 'day');
      for (let i = 0; i < 21; i++) { // 21 days for 3 weeks
        const date = firstDay.add(i, 'day').format('YYYY-MM-DD');
        this.currentCalendarDatesWithTasks.push({ date: date, executions: [], percentage: 0 });
      }
      //temporary dictionary
      const executionsByDate = {};
      //iterate over all executions
      for (const task of this.tasks) {
        for (const exec of task.executions) {
          const date = dayjs(exec.task_date).format('YYYY-MM-DD');
          if (date == null) continue;
          if (!executionsByDate[date]) executionsByDate[date] = [];
          executionsByDate[date].push(exec);
        }
      }
      for (const date in executionsByDate) {
        const dayExecutions = executionsByDate[date];
        const dayExecutionsAmount = dayExecutions.length;
        const doneDayExecutionsAmount = dayExecutions.filter(execution => execution.is_done).length;
        const percentage = dayExecutionsAmount > 0 ? (doneDayExecutionsAmount * 1.0 / dayExecutionsAmount) * 100 | 0 : 0;

        const indexToUpdate = this.currentCalendarDatesWithTasks.findIndex(item => item.date === date);
        if (indexToUpdate !== -1) {
          this.currentCalendarDatesWithTasks[indexToUpdate] = {
            date: date,
            executions: dayExecutions,
            percentage: percentage,
          };
        } else {
          console.log('No object found with the specified date.');
        }
      }
      this.callendarDatesAreSet = true;
    }
  },
  async retrieveCurrentDayData(offset = 0) {
    this.currentDateTasks = [];
    //get current days date including offset
    this.currentDisplayDate = dayjs(this.currentDisplayDate).startOf('day').add(offset, 'day').toISOString(); //TODO: what if date is null at first
    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id, name, description, completed, is_regular,
      executions(id, created_at, is_done, task_date, task_id)`)
      .eq('user_id', this.user.id)
      .eq('executions.task_date', this.currentDisplayDate);
    if (error != null) {
      //TODO: better error handling
      console.log(error.message);
    }
    else {
      //filter through tasks selecting only regular ones and single ones with proper date
      //change executions from one element lists into an single objects
      this.currentDateTasks = data.filter(task => {
        if (task.executions != null) {
          //TODO: multiple executions error handling
          if (task.executions.length > 1) console.log("Multiple Executions for one Day");
          task.executions = task.executions[0];
        }
        return (task.is_regular || task.executions)
      });
    }
  },
  retreiveDate(displayDateOffset = 0) {
    //get todays date according to timezone
    dayjs.extend(utc);
    dayjs.extend(timezone);
    this.todaysDate = dayjs().tz('Europe/Warsaw').format('YYYY-MM-DD');
    this.currentDisplayDate = dayjs(this.todaysDate).startOf('day').add(displayDateOffset, 'day').toISOString();
  },
  async addTask(task) {
    //TODO: try catch block?????
    const { data, error } = await supabase
      .from('tasks')
      .insert({ name: task.name, description: task.description, completed: task.completed, user_id: this.user.id, is_regular: task.is_regular }).select();
    if (error != null) console.log(error);
    const new_task = data[0];
    //if task is irregular add by default todays execution to it
    let execution = [];
    if (!task.is_regular) {
      const { data, error } = await supabase
        .from('executions')
        .insert({ task_id: new_task.id, is_done: false, task_date: this.currentDisplayDate }).select();
      //console.log(data[0]);
      if (error != null) console.log(error.message);
      else execution.push(data[0]);
      //console.log(error)
      //console.log(execution);
    }
    //retrieve insterted task in order to get its database id
    this.tasks.push({ ...data[0], executions: execution });
    this.currentDateTasks.push({ ...data[0], executions: execution[0] });
    //update callendar singleTasks list
    //this.setCallendarDates();
    //is this one necessary?
    //this.retreiveData();


  },
  async toggleTaskCompletion(task) {
    // TODO try catch block??
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id)
    if (error != null) console.log(error.message);
    //create new execution
    //TODO: force unique date
    //console.log(task.executions);
    if (task.executions != null) {
      const { data, error2 } = await supabase
        .from('executions')
        .update({ is_done: !task.executions.is_done, task_date: this.currentDisplayDate })
        .eq('id', task.executions.id)
      if (error2 != null) console.log(error2.message);
      task.executions.is_done = !task.executions.is_done;
    } else {
      const { data, error2 } = await supabase
        .from('executions')
        .insert({ task_id: task.id, is_done: true, task_date: this.currentDisplayDate }).select();
      if (error2 != null) console.log(error2.message);
      task.executions = data[0];
    }

    //update local list

    //update callendar percentage
    //this.setCallendarDates();
  },
  async removeTask(task) {
    this.tasks = this.tasks.filter(t => t.id != task.id);
    this.currentDateTasks = this.currentDateTasks.filter(t => t.id != task.id);
    // TODO: try catch block?????
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error != null) console.log(error.message);
    //update callendar singleTasks list
    this.retrieveCallendarData();
  },



})