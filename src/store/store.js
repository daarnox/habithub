import { reactive } from 'vue'
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import mitt from "mitt";

import { isProxy, toRaw } from 'vue';

export const store = reactive({

  //session user
  user: null,
  //user data like chosen page style, allow updates
  userData: null,
  //all tasks with all executions
  tasks: [],
  //todays date
  todaysDate: null,
  //used in day's tasks to retrieve proper data
  currentDisplayDate: null,
  //list of filtered tasks accoring to currentDisplayDate
  currentDateTasks: [], //TODO: rename to currentDayData
  //calendar data
  currentCalendarData: [],
  //used to check if data is ready to be used
  callendarDatesAreSet: false,
  // global event emitter
  emitter: mitt(),
  //list of currently displayed forest
  trees: [],

  // retrive all required data once user is logged in
  setSession(session) {
    this.user = session ? session.user : null;
    
    if (this.user != null && this.currentDisplayDate == null) {
      this.retreiveDate();
      //habits page
      this.retrieveCurrentDayData();
      // callendar page
      this.retrieveCurrentCalendarData();
      this.getUserData();
      // forest
      this.getTreeData();

      // handling TaskItem event
      this.emitter.on("toggleTask", (data) => {
        this.delayToggleTaskCompletion(data.task, data.currentDate );
      });
    }
  },

  async getUserData() {
    const { data, error } = await supabase.from('users').select(`
      id, nickname, allow_updates, chosen_style`)
      .eq('id', this.user.id);
    if (data[0] == undefined) {
      const { data, error } = await supabase.from('users')
        .insert({ id: this.user.id }).select();
      this.userData = data[0];
    } else {
      this.userData = data[0];
    }
  },
  async getTreeData() {

    const date = dayjs(this.todaysDate).startOf('day').add(0, 'day').toISOString();

    const { data, error } = await supabase.from('forests').select(`
      user_id, trees, date`)
      .eq('user_id', this.user.id)
      .eq('date', date);

    if(data[0] == null){

      const { data, error } = await supabase.from('forests')
      .insert({ user_id: this.user.id, trees: [], date: date}).select();
      if(error != null ) console.log(error.message)
      this.trees = toRaw(data[0].trees);
    } else {
      this.trees = toRaw(data[0].trees);
    }
  },

  async addRandomTree() {

    const date = dayjs(this.todaysDate).startOf('day').add(0, 'day').toISOString();
    // console.log(typeof(this.trees))
    const trees_copy = toRaw(this.trees);
    // console.log(trees_copy)
    const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter((num) => !trees_copy.includes(num));

    if (availableNumbers.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];

    this.trees.push(randomNumber);

    const { data, error } = await supabase.from('forests')
      .update({ trees: toRaw(this.trees) })
      .eq('user_id', store.user.id)     
      .eq ('date', date).select();

      if (error != null) console.log(error.message);
      // console.log("???????")
    //TODO: confirm sending a request
    this.trees = toRaw(data[0].trees);
    return;
  },
  delayToggleTaskCompletion(task, date){

    const cancelEventName = "cancel" + task.name + date;

    let sendRequest = true;
    // this.emitter.emit("cancelToggleTask" + task.name, "test");

    this.emitter.on(cancelEventName, (data) => {
      sendRequest = false;
    });

    setTimeout(()=>{
      if(sendRequest) this.toggleTaskCompletion(task,date)
    },2000)

  },
  retreiveDate(displayDateOffset = 0) {
    //get todays date according to timezone
    dayjs.extend(utc);
    dayjs.extend(timezone);
    this.todaysDate = dayjs().tz('Europe/Warsaw').format('YYYY-MM-DD');
    this.currentDisplayDate = dayjs(this.todaysDate).startOf('day').add(displayDateOffset, 'day').toISOString();
  },
  //TODO: better comments
  processDayData(data) {
    return data.filter(task => {
      if (task.executions != null) {
        //TODO: multiple executions error handling
        if (task.executions.length > 1) console.log("Multiple Executions for one Day");
        task.executions = task.executions[0];
      }
      //decide whether task should be added based on its type
      if (task.type === "REGULAR") return true
      else if (task.type === "UNTIL_DONE") return (task.keep_on || task.executions)
      else if (task.type === "ON_DATE") return task.executions
      else if (task.type === "UNTIL_DATE") {
        if (task.executions) {
          //TODO send update?
          task.keep_on == false;
          return true;
        } else return task.keep_on;
      }
      else {
        console.log("Unvalid task type"); //TODO: better error handling
        return false;
      }
    });
  },
  async retrieveCurrentDayData(offset = 0) {
    this.currentDateTasks = [];
    //get current days date including offset
    this.currentDisplayDate = dayjs(this.currentDisplayDate).startOf('day').add(offset, 'day').toISOString(); //TODO: what if date is null at first
    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id, name, description, completed, type, keep_on,
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
      this.currentDateTasks = this.processDayData(data);
    }
  },
  async retrieveCurrentCalendarData() {
    this.callendarDatesAreSet = false;
    this.currentCalendarData = [];
    const previousWeekMonday = dayjs(this.todaysDate).startOf('week').subtract(6, 'day').toISOString();
    const nextWeekSunday = dayjs(this.todaysDate).startOf('week').add(15, 'day').toISOString();
    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id, name, description, completed, type, keep_on,
      executions(id, created_at, is_done, task_date, task_id)
      `).eq('user_id', this.user.id)
      .filter('executions.task_date', 'gte', previousWeekMonday)
      .filter('executions.task_date', 'lte', nextWeekSunday);
    if (error != null) console.log(error.message)
    else {
      //create empty list of 21 days and fill it
      this.tasks = data;  //TODO: handle this differently
      const firstDay = dayjs(this.todaysDate).startOf('week').subtract(6, 'day');
      for (let i = 0; i < 21; i++) { // 21 days for 3 weeks
        const date = firstDay.add(i, 'day');
        // get temp tasks list with only executions for particular day
        let temp = data.map(task => {
          let task_copy = { ...task };
          task_copy.executions = task.executions.filter(ex => {
            return dayjs(ex.task_date, 'YYYY-MM-DD').isSame(dayjs(date, 'YYYY-MM-DD'), 'day');
          });
          return task_copy;
        });
        temp = this.processDayData(temp);
        this.currentCalendarData.push({ date: date, tasks: temp });  //TODO: organize differently
      }
      this.callendarDatesAreSet = true;
    }
  },
  async addTask(task, date = null) {
    //TODO: try catch block?????
    const { data, error } = await supabase
      .from('tasks')
      .insert({ name: task.name, description: task.description, completed: task.completed, user_id: this.user.id, type: task.type }).select();
    if (error != null) console.log(error);
    const new_task = data[0];
    //if task is irregular add by default todays execution to it
    let execution = [];
    if (task.type === "ON_DATE" || task.type === "UNTIL_DATE") {
      const temp_date = date ? date : this.currentDisplayDate;
      const { data, error } = await supabase
        .from('executions')
        .insert({ task_id: new_task.id, is_done: false, task_date: temp_date }).select();
      //console.log(data[0]);
      if (error != null) console.log(error.message);
      else execution.push(data[0]);
    }
    //retrieve insterted task in order to get its database id
    this.tasks.push({ ...data[0], executions: execution });
    if (task.type === "UNTIL_DONE" || task.type === "REGULAR" || dayjs(date).isSame(dayjs(this.currentDisplayDate), 'day'))
      this.currentDateTasks.push({ ...data[0], executions: execution[0] });

    //update callendar singleTasks list
    this.retrieveCurrentCalendarData();
  },
  async toggleTaskCompletion(task, currentDate) {
    // TODO try catch block??
    console.log(task)

    if (task.type == "UNTIL_DONE") {
      const { error } = await supabase
        .from('tasks')
        .update({ keep_on: !task.keep_on })
        .eq('id', task.id)
      if (error != null) console.log(error.message);
      task.keep_on = !task.keep_on; // TODO: why is this line necessary
    }
    //either delete it or update execution depending on the task's type
    if (task.executions != null) {
      if (task.type === "REGULAR" || task.type === "UNTIL_DONE") {
        const { error2 } = await supabase.from('executions').delete().eq('id', task.executions.id);
        if (error2 != null) console.log(error2.message);
        task.executions = null;
      } else {
        const { data, error2 } = await supabase
          .from('executions')
          .update({ is_done: !task.executions.is_done, task_date: currentDate })
          .eq('id', task.executions.id).select();
        if (error2 != null) console.log(error2.message);
        task.executions = data[0];
      }
    } else {
      const { data, error2 } = await supabase
        .from('executions')
        .insert({ task_id: task.id, is_done: true, task_date: currentDate }).select();
      if (error2 != null) console.log(error2.message);
      task.executions = data[0];
    }
    //TODO: update percentage differently??
    this.retrieveCurrentCalendarData();
  },
  async removeTask(task) {
    this.tasks = this.tasks.filter(t => t.id != task.id);
    this.currentDateTasks = this.currentDateTasks.filter(t => t.id != task.id);
    // TODO: try catch blocks
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error != null) console.log(error.message);
    //update callendar singleTasks list
    this.retrieveCurrentCalendarData();
  },

})