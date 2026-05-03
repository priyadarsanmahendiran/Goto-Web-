import { createRouter, createWebHistory } from 'vue-router'
import { auth } from './firebase.js'
import { useAuth } from './composables/useAuth.js'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('./views/Login.vue'), meta: { guest: true } },
  { path: '/register', component: () => import('./views/Register.vue'), meta: { guest: true } },
  { path: '/forgot-password', component: () => import('./views/ForgotPassword.vue'), meta: { guest: true } },
  { path: '/dashboard', component: () => import('./views/Dashboard.vue'), meta: { auth: true } },
  { path: '/diary', component: () => import('./views/DiaryHome.vue'), meta: { auth: true } },
  { path: '/diary/personal', component: () => import('./views/PersonalDiary.vue'), meta: { auth: true } },
  { path: '/diary/personal/write', component: () => import('./views/WriteEntry.vue'), meta: { auth: true } },
  { path: '/diary/personal/memories', component: () => import('./views/Memories.vue'), meta: { auth: true } },
  { path: '/diary/collab', component: () => import('./views/CollabDiary.vue'), meta: { auth: true } },
  { path: '/diary/collab/book', component: () => import('./views/CollabBook.vue'), meta: { auth: true } },
  { path: '/diary/collab/write', component: () => import('./views/CollabWrite.vue'), meta: { auth: true } },
  { path: '/diary/collab/display', component: () => import('./views/CollabDisplay.vue'), meta: { auth: true } },
  { path: '/todo', component: () => import('./views/TodoList.vue'), meta: { auth: true } },
  { path: '/todo/add', component: () => import('./views/TodoAdd.vue'), meta: { auth: true } },
  { path: '/expenses', component: () => import('./views/ExpenseHome.vue'), meta: { auth: true } },
  { path: '/expenses/budget', component: () => import('./views/Salary.vue'), meta: { auth: true } },
  { path: '/expenses/add', component: () => import('./views/AddExpense.vue'), meta: { auth: true } },
  { path: '/expenses/view', component: () => import('./views/ViewExpense.vue'), meta: { auth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let authChecked = false
let authResolve
const authPromise = new Promise((resolve) => {
  authResolve = resolve
})

auth.onAuthStateChanged(() => {
  if (!authChecked) {
    authChecked = true
    authResolve()
  }
})

router.beforeEach(async (to, from, next) => {
  await authPromise
  const currentUser = auth.currentUser
  if (to.matched.some((r) => r.meta.auth) && !currentUser) {
    next('/login')
  } else if (to.matched.some((r) => r.meta.guest) && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
