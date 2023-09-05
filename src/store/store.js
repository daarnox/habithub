import { reactive } from 'vue'
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const store = reactive({
  todaysDate: null,
  user: null,
  tasks: [],
  setUser(session) {
    this.user = session ? session.user : null;
    if (this.user != null && this.tasks.length === 0) this.retreiveData();
  },
  async retreiveData() {
    //get todays date
    dayjs.extend(utc);
    dayjs.extend(timezone);
    this.todaysDate = dayjs().tz('Europe/Warsaw').format('YYYY-MM-DD');
    console.log(dayjs(this.todaysDate).startOf('day').toISOString());
    //get tasks and executions data
    const { data, error } = await supabase.from('tasks').select(`
      id,
      name,
      description,
      completed,
      is_regular,
      executions(id, created_at, is_done)
      `).eq('user_id', this.user.id)
      .filter('executions.created_at', 'gte', dayjs(this.todaysDate).startOf('day').toISOString())
      .filter('executions.created_at', 'lte', dayjs(this.todaysDate).startOf('day').add(1, 'day').toISOString());
    // `).eq('user_id', this.user.id).eq('executions.is_done', 'false');

    if (error != null) console.log(error.message)
    else {
      this.tasks = data.filter(t => t.is_regular === true);
      console.log(this.tasks)
    }

  },
  async addTask(task) {
    //TODO: try catch block?????
    const { data, error } = await supabase
      .from('tasks')
      .insert({ name: task.name, description: task.description, completed: task.completed, user_id: this.user.id, is_regular: task.is_regular }).select();
    if (error != null) console.log(error);
    //retrieve insterted task in order to get its database id
    this.tasks.push(data[0]);
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
      .insert({ task_id: task.id, is_done: task.completed }).select();
    if (error2 != null) console.log(error2.message);


    //update local list
    task.completed = !task.completed;
  },
  async removeTask(task) {
    this.tasks = this.tasks.filter(t => t.id != task.id);
    // TODO: try catch block?????
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error != null) console.log(error.message);
  },



})