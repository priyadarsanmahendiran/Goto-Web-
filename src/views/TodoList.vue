<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section fade-up">
      <h3 class="section-title"><i class="fa fa-calendar-check-o"></i> Forthcoming Events</h3>
      <div v-if="forthcoming.length">
        <div v-for="(item, idx) in forthcoming" :key="idx" class="row align-items-center mb-4">
          <div class="col-md-8">
            <div class="todo-card">
              <h6>{{ item.name }}</h6>
              <p>Description: {{ item.Description }}</p>
              <span class="todo-badge">Deadline: {{ item.Date }}</span>
            </div>
          </div>
          <div class="col-md-4 mt-2">
            <button class="btn btn-danger btn-sm" @click="deleteEvent(item.name)">
              <i class="fa fa-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-muted">No Forthcoming Events!</p>

      <h3 class="section-title mt-4"><i class="fa fa-clock-o"></i> Pending Events</h3>
      <div v-if="pending.length">
        <div v-for="(item, idx) in pending" :key="idx" class="row align-items-center mb-4">
          <div class="col-md-8">
            <div class="todo-card">
              <h6>{{ item.name }}</h6>
              <p>Description: {{ item.Description }}</p>
              <span class="todo-badge">Deadline: {{ item.Date }}</span>
            </div>
          </div>
          <div class="col-md-4 mt-2">
            <button class="btn btn-danger btn-sm" @click="deleteEvent(item.name)">
              <i class="fa fa-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-muted">No Pending Events!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onValue, ref as dbRef, remove } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { useSnackbar } from '../composables/useSnackbar.js'

const { showSnackbar } = useSnackbar()
const forthcoming = ref([])
const pending = ref([])
const userId = ref('')

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const todayStr = yyyy + '-' + mm + '-' + dd

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    userId.value = user.uid
    const todoRef = dbRef(db, 'users/' + user.uid + '/Todo')
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val()
      const f = []
      const p = []
      if (data) {
        for (const name in data) {
          const item = { name, ...data[name] }
          if (item.Date > todayStr) f.push(item)
          else p.push(item)
        }
      }
      forthcoming.value = f
      pending.value = p
    })
  })
})

function deleteEvent(name) {
  remove(dbRef(db, 'users/' + userId.value + '/Todo/' + name))
    .then(() => showSnackbar('Event deleted.', 'success'))
    .catch((err) => showSnackbar(err.message, 'error'))
}
</script>
