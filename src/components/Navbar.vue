<template>
  <nav class="navbar navbar-dark navbar-expand-lg sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/dashboard">
        <img src="/images/b515e6c2-9e5f-486e-908d-dc3ecd0f8ab4_200x200.png" width="38" height="38" alt="Go-to!">
        <span class="ms-2 fw-semibold">Go-to!</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('/dashboard') }" to="/dashboard">
              <i class="fa fa-home"></i> Home
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="{ active: diaryActive }" href="#" data-bs-toggle="dropdown">
              <i class="fa fa-book"></i> Diary
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/diary/collab') }" to="/diary/collab">
                  <i class="fa fa-handshake-o"></i> Collaborative
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/diary/personal') }" to="/diary/personal">
                  <i class="fa fa-key"></i> Personal
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="{ active: expenseActive }" href="#" data-bs-toggle="dropdown">
              <i class="fa fa-bar-chart"></i> Expenses
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/expenses/budget') }" to="/expenses/budget">
                  <i class="fa fa-rupee"></i> Add Budget
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/expenses/add') }" to="/expenses/add">
                  <i class="fa fa-plus"></i> Add Expense
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/expenses/view') }" to="/expenses/view">
                  <i class="fa fa-exchange"></i> View Expenses
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="{ active: todoActive }" href="#" data-bs-toggle="dropdown">
              <i class="fa fa-tasks"></i> To-do
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/todo') }" to="/todo">
                  <i class="fa fa-list"></i> View Tasks
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :class="{ active: isActive('/todo/add') }" to="/todo/add">
                  <i class="fa fa-plus"></i> Add Task
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <button class="btn btn-outline-light btn-sm" id="logoutbtn" @click="logout">
          <i class="fa fa-sign-out"></i> Sign Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const route = useRoute()
const { logout } = useAuth()

function isActive(path) {
  return route.path === path
}

const diaryActive = computed(() =>
  route.path.startsWith('/diary')
)
const expenseActive = computed(() =>
  route.path.startsWith('/expenses')
)
const todoActive = computed(() =>
  route.path.startsWith('/todo')
)
</script>
