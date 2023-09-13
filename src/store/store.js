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
  currentDisplayDateTasks: [],
  //list of days and its data used in callendar
  callendarDates: [],
  //used to check if data is ready to be used
  callendarDatesAreSet: false,

  setUser(session) {
    this.user = session ? session.user : null;
    if (this.user != null && this.tasks.length === 0) this.retreiveData();
  },
  async retreiveData(displayDateOffset = 0) {
    //get todays date
    dayjs.extend(utc);
    dayjs.extend(timezone);
    this.todaysDate = dayjs().tz('Europe/Warsaw').format('YYYY-MM-DD');
    this.currentDisplayDate = dayjs(this.todaysDate).startOf('day').add(displayDateOffset, 'day').toISOString();
    // this.currentDisplayDate = dayjs('2005-11-17').startOf('day').toISOString();
    // console.log("Todays date:" + this.todaysDate)
    // console.log("Display date:" + this.currentDisplayDate)

    const previousWeekMonday = dayjs(this.currentDisplayDate).startOf('week').subtract(6, 'day').toISOString();
    const nextWeekSunday = dayjs(this.currentDisplayDate).startOf('week').add(15, 'day').toISOString();

    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id,
      name,
      description,
      completed,
      is_regular,
      executions(id, created_at, is_done, task_date, task_id)
      `).eq('user_id', this.user.id)
      .filter('executions.task_date', 'gte', previousWeekMonday)
      .filter('executions.task_date', 'lte', nextWeekSunday);

    if (error != null) console.log(error.message)
    else {
      this.tasks = data;
      this.setCurrentDisplayDateTasks();
      this.setCallendarDates();
    }
  },
  setCurrentDisplayDateTasks() {
    if (this.currentDisplayDate == null || this.tasks.length === 0) return;
    this.currentDisplayDateTasks = []
    //this.tasks.forEach(task => {
    //});
    for (const task of this.tasks) {

      //console.log( task)
      //const currentExecution = task.executions.filter(ex => ex.created_at === this.currentDisplayDate);
      const currentExecution = task.executions.filter(ex => dayjs(this.currentDisplayDate).isSame(dayjs(ex.task_date, 'day')));
      if (currentExecution.length > 1) console.log("Multiple Executions for one Day"); //TODO: Better error handling

      //regular tasks need to have everyday executions
      // if (task.is_regular && currentExecution.length === 0) {

      //   // MOVE THIS PART OF CODE TO TASK ITEM

      //   // //create Execution {is_done:false} 
      //   // const { data, error2 } = await supabase
      //   //   .from('executions')
      //   //   .insert({ task_id: task.id, is_done: false }).select();
      //   // if (error2 != null) console.log(error2.message);
      //   // task.executions.push(data);
      //   // currentExecution.push(data);
      // }
      //return all regular tasks and other ones with hasDate

      if (task.is_regular || currentExecution.length === 1) this.currentDisplayDateTasks.push({ ...task, executions: currentExecution[0] });
    }
  },
  changeCurrentDisplayDate(offset) {
    this.currentDisplayDate = dayjs(this.currentDisplayDate).startOf('day').add(offset, 'day').toISOString();
    this.setCurrentDisplayDateTasks();
  },
  setCallendarDates() {
    //TODO: this code can propably be way shorter
    if (this.currentDisplayDate == null || this.tasks.length === 0) return;
    this.callendarDatesAreSet = false;
    //empty dictionary filled with proper dates as keys
    this.callendarDates = [];
    //TODO: different currentDisplayDate for Habits page and Callendar
    const firstDay = dayjs(this.currentDisplayDate).startOf('week').subtract(6, 'day');
    for (let i = 0; i < 21; i++) { // 21 days for 3 weeks
      const date = firstDay.add(i, 'day').format('YYYY-MM-DD');
      //this.callendarDates[date.format('YYYY-MM-DD')] = {}; // Set the date as a key with an empty object as the value
      this.callendarDates.push({ date: date, executions: [], percentage: 0 });
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

      const indexToUpdate = this.callendarDates.findIndex(item => item.date === date);
      if (indexToUpdate !== -1) {
        this.callendarDates[indexToUpdate] = {
          date: date,
          executions: dayExecutions,
          percentage: percentage,
        };
      } else {
        console.log('No object found with the specified date.');
      }

    }
    this.callendarDatesAreSet = true;
    // console.log(this.callendarDates)
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
    this.currentDisplayDateTasks.push({ ...data[0], executions: execution[0] });
    //update callendar singleTasks list
    this.setCallendarDates();
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
    this.setCallendarDates();
  },
  async removeTask(task) {
    this.tasks = this.tasks.filter(t => t.id != task.id);
    this.currentDisplayDateTasks = this.currentDisplayDateTasks.filter(t => t.id != task.id);
    // TODO: try catch block?????
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error != null) console.log(error.message);
    //update callendar singleTasks list
    this.setCallendarDates();
  },



})