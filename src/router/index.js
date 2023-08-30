import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import HabitsView from '../views/habits/Habits.vue'
import SummaryView from '../views/Summary.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/habits',
    name: 'habits',
    component: HabitsView
  },
  {
    path: '/summary',
    name: 'summary',
    component: SummaryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
