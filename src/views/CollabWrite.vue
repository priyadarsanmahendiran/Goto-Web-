<template>
  <div class="page-bg page-bg-write">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-9 col-lg-7 fade-up">
          <p class="diary-quote text-center">Write something for the collaborative diary.</p>
          <div class="glass-card">
            <div class="mb-3">
              <label class="form-label">Your entry</label>
              <textarea v-model="text" rows="8" class="form-control" placeholder="Share your thoughts..."></textarea>
            </div>
            <button class="btn btn-primary px-4" @click="save">
              <i class="fa fa-save me-1"></i> Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ref as dbRef, set } from 'firebase/database'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { encryptEntry } from '../utils/crypto.js'
import { useSnackbar } from '../composables/useSnackbar.js'

const text = ref('')
const router = useRouter()
const { showSnackbar } = useSnackbar()

const b1 = localStorage.getItem('b1')
const p1 = localStorage.getItem('p1')
const r1 = localStorage.getItem('r1')

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const todayStr = dd + '-' + mm + '-' + yyyy

async function save() {
  const t = text.value.trim()
  if (!t) {
    showSnackbar('Please write something.', 'warning')
    return
  }
  const encrypted = await encryptEntry(t, b1 + p1)
  await set(dbRef(db, 'users/' + b1 + '/' + p1 + '/' + todayStr + '/' + r1), { mom: encrypted })
  showSnackbar('Entry saved!', 'success')
  setTimeout(() => router.push('/diary/collab/display'), 1500)
}
</script>
