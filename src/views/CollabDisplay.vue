<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section">
      <div class="collab-nav-tabs mb-4">
        <router-link to="/diary/collab/write" class="btn btn-primary">
          <i class="fa fa-pencil me-1"></i> Write
        </router-link>
        <router-link to="/diary/collab/book" class="btn btn-outline-light">
          <i class="fa fa-book me-1"></i> Switch Book
        </router-link>
      </div>
      <div v-if="entries.length" class="fade-up">
        <div v-for="entry in entries" :key="entry.date + entry.author" class="col-12 col-md-6 entry-card">
          <h3 class="entry-date">{{ entry.date }}</h3>
          <p class="entry-author">{{ entry.author }}</p>
          <p class="entry-text">{{ entry.text }}</p>
        </div>
      </div>
      <p v-else class="text-muted">No entries in this book yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onValue, ref as dbRef } from 'firebase/database'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { decryptEntry } from '../utils/crypto.js'

const entries = ref([])

const b1 = localStorage.getItem('b1')
const p1 = localStorage.getItem('p1')

onMounted(() => {
  if (!b1 || !p1) return
  const bookRef = dbRef(db, 'users/' + b1 + '/' + p1)
  onValue(bookRef, async (snapshot) => {
    const data = snapshot.val()
    const list = []
    if (data) {
      for (const date in data) {
        for (const author in data[date]) {
          const text = await decryptEntry(data[date][author].mom, b1 + p1)
          list.push({ date, author, text })
        }
      }
    }
    entries.value = list
  })
})
</script>
