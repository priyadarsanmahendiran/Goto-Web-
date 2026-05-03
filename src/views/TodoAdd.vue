<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5 fade-up">
          <div class="glass-card">
            <h4 class="fw-bold mb-4"><i class="fa fa-calendar-plus-o me-2" style="color:var(--c-accent)"></i>Add Event</h4>
            <div class="mb-3">
              <label class="form-label">Event name</label>
              <input v-model="eventName" type="text" class="form-control" placeholder="e.g. Team meeting">
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="eventDesc" class="form-control" rows="3"></textarea>
            </div>
            <div class="mb-4">
              <label class="form-label">Date</label>
              <input v-model="eventDate" type="date" class="form-control">
            </div>
            <button class="btn btn-primary w-100" @click="addEvent">
              <i class="fa fa-plus me-1"></i> Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ref as dbRef, set } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { useSnackbar } from '../composables/useSnackbar.js'

const eventName = ref('')
const eventDesc = ref('')
const eventDate = ref('')
const userId = ref('')
const { showSnackbar } = useSnackbar()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    userId.value = user.uid
  })
})

function addEvent() {
  const name = eventName.value.trim()
  const desc = eventDesc.value.trim()
  const date = eventDate.value
  if (!name || !desc || !date) {
    showSnackbar('Please fill in all fields.', 'warning')
    return
  }
  set(dbRef(db, 'users/' + userId.value + '/Todo/' + name), {
    Date: date,
    Description: desc,
    Status: 'Pending'
  })
    .then(() => showSnackbar('Event added!', 'success'))
    .catch((err) => showSnackbar('Error: ' + err.message, 'error'))
}
</script>
