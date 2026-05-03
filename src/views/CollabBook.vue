<template>
  <div class="page-bg page-bg-collab">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5 fade-up">
          <div class="glass-card">
            <h4 class="fw-bold mb-4"><i class="fa fa-book me-2" style="color:var(--c-accent)"></i>Collaborative Book</h4>
            <div class="mb-3">
              <label class="form-label">Book ID</label>
              <input v-model="bookId" type="text" class="form-control" placeholder="Enter book ID">
            </div>
            <div class="mb-3">
              <label class="form-label">Book Password</label>
              <input v-model="bookPw" type="password" class="form-control" placeholder="Enter password">
            </div>
            <div class="mb-4">
              <label class="form-label">Your Name</label>
              <input v-model="refName" type="text" class="form-control" placeholder="Your display name">
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="loginBook"><i class="fa fa-sign-in me-1"></i> Open Book</button>
              <button class="btn btn-outline-light" @click="joinBook"><i class="fa fa-user-plus me-1"></i> Join Book</button>
              <button class="btn btn-outline-light" @click="createBook"><i class="fa fa-plus me-1"></i> Create Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ref as dbRef, onValue, set } from 'firebase/database'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { encryptEntry } from '../utils/crypto.js'
import { useSnackbar } from '../composables/useSnackbar.js'

const bookId = ref('')
const bookPw = ref('')
const refName = ref('')
const router = useRouter()
const { showSnackbar } = useSnackbar()

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const todayStr = dd + '-' + mm + '-' + yyyy

function saveLocal() {
  localStorage.setItem('b1', bookId.value)
  localStorage.setItem('p1', bookPw.value)
  localStorage.setItem('r1', refName.value)
}

function loginBook() {
  const b1 = bookId.value.trim()
  const p1 = bookPw.value.trim()
  const r1 = refName.value.trim()
  if (!b1 || !p1 || !r1) {
    showSnackbar('Please fill in all fields.', 'warning')
    return
  }
  const rootRef = dbRef(db, 'users/' + b1)
  onValue(rootRef, (snapshot) => {
    const data = snapshot.val()
    let found = false
    if (data) {
      for (const pw in data) {
        if (pw === p1) {
          for (const date in data[pw]) {
            for (const name in data[pw][date]) {
              if (name === r1) {
                found = true
                break
              }
            }
          }
        }
      }
    }
    if (found) {
      saveLocal()
      router.push('/diary/collab/display')
    } else {
      showSnackbar('You are not a member. Join the book first.', 'warning')
    }
  }, { onlyOnce: true })
}

async function joinBook() {
  const b1 = bookId.value.trim()
  const p1 = bookPw.value.trim()
  const r1 = refName.value.trim()
  if (!b1 || !p1 || !r1) {
    showSnackbar('Please fill in all fields.', 'warning')
    return
  }
  const rootRef = dbRef(db, 'users/' + b1)
  onValue(rootRef, async (snapshot) => {
    const data = snapshot.val()
    let foundPw = false
    if (data) {
      for (const pw in data) {
        if (pw === p1) foundPw = true
      }
    }
    if (foundPw) {
      const encrypted = await encryptEntry('Hey I am new here!', b1 + p1)
      await set(dbRef(db, 'users/' + b1 + '/' + p1 + '/' + todayStr + '/' + r1), { mom: encrypted })
      saveLocal()
      router.push('/diary/collab/display')
    } else {
      showSnackbar('Wrong book password.', 'error')
    }
  }, { onlyOnce: true })
}

async function createBook() {
  const b1 = bookId.value.trim()
  const p1 = bookPw.value.trim()
  const r1 = refName.value.trim()
  if (!b1 || !p1 || !r1) {
    showSnackbar('Please fill in all fields.', 'warning')
    return
  }
  const rootRef = dbRef(db, 'users/')
  onValue(rootRef, async (snapshot) => {
    const data = snapshot.val()
    let exists = false
    if (data) {
      for (const id in data) {
        if (id === b1) {
          exists = true
          break
        }
      }
    }
    if (exists) {
      showSnackbar('That Book ID is already taken. Try another.', 'warning')
    } else {
      const encrypted = await encryptEntry('New Book up here!', b1 + p1)
      await set(dbRef(db, 'users/' + b1 + '/' + p1 + '/' + todayStr + '/' + r1), { mom: encrypted })
      showSnackbar('Book created!', 'success')
      saveLocal()
      setTimeout(() => router.push('/diary/collab/display'), 1500)
    }
  }, { onlyOnce: true })
}
</script>
