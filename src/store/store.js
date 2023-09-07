import { reactive } from 'vue'
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const store = reactive({

  user: null,
  tasks: [],
  todaysDate: null,
  currentDisplayDate: null,
  currentDisplayDateTasks: [],

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
    //this.currentDisplayDate = dayjs('2005-11-17').startOf('day').toISOString();
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
      executions(id, created_at, is_done)
      `).eq('user_id', this.user.id)
      .filter('executions.created_at', 'gte', previousWeekMonday)
      .filter('executions.created_at', 'lte', nextWeekSunday);

    if (error != null) console.log(error.message)
    else {
      this.tasks = data;
      this.setCurrentDisplayDateTasks();
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
      const currentExecution = task.executions.filter(ex => dayjs(this.currentDisplayDate).isSame(dayjs(ex.created_at), 'day'));
      if (currentExecution.length > 1) console.log("Multiple Executions for one Day"); //TODO: Better error handling

      //regular tasks need to have everyday executions
      if (task.is_regular && currentExecution.length === 0) {

        // MOVE THIS PART OF CODE TO TASK ITEM

        // //create Execution {is_done:false} 
        // const { data, error2 } = await supabase
        //   .from('executions')
        //   .insert({ task_id: task.id, is_done: false }).select();
        // if (error2 != null) console.log(error2.message);
        // task.executions.push(data);
        // currentExecution.push(data);
      }
      //return all regular tasks and other ones with hasDate
      if (task.is_regular || currentExecution.length === 1) this.currentDisplayDateTasks.push({ ...task, executions: currentExecution });
    }
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
        .insert({ task_id: new_task.id, is_done: false }).select();
      console.log(data[0]);
      if (error != null) console.log(error.message);
      else execution.push(data[0]);
      console.log(error)
      console.log(execution);
    }
    //retrieve insterted task in order to get its database id
    this.tasks.push({ ...data[0], executions: execution });
    this.currentDisplayDateTasks.push({ ...data[0], executions: execution });


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
    const { data, error2 } = await supabase
      .from('executions')
      .update({ is_done: !task.executions[0].is_done })
      .eq('id', task.executions[0].id)
    if (error2 != null) console.log(error2.message);
    //update local list
    task.executions[0].is_done = !task.executions[0].is_done;
  },
  async removeTask(task) {
    this.tasks = this.tasks.filter(t => t.id != task.id);
    this.currentDisplayDateTasks = this.currentDisplayDateTasks.filter(t => t.id != task.id);
    // TODO: try catch block?????
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error != null) console.log(error.message);
  },



})