<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section fade-up">
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="glass-card" style="color: white;">
            <h5>Your Budget: {{ budget }}</h5>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-card" style="color: white;">
            <h5>Your Balance: {{ balance }}</h5>
          </div>
        </div>
      </div>

      <div v-if="expenses.length">
        <div v-for="(exp, idx) in expenses" :key="idx" class="expense-card">
          <div>
            <div class="fw-semibold">{{ exp.date }}</div>
            <div class="expense-meta">{{ exp.reason }}</div>
          </div>
          <div class="expense-amount" style="color:var(--c-accent)">{{ exp.amount }}</div>
        </div>
      </div>
      <p v-else class="text-muted">No expenses recorded yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onValue, ref as dbRef } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'

const expenses = ref([])
const budget = ref(0)
const balance = ref(0)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    const uid = user.uid
    onValue(dbRef(db, 'users/' + uid + '/Expense'), (snapshot) => {
      const data = snapshot.val()
      const list = []
      if (data) {
        for (const date in data) {
          list.push({
            date,
            reason: data[date].Name,
            amount: data[date].Amount
          })
        }
      }
      expenses.value = list
    })
    onValue(dbRef(db, 'users/' + uid + '/Budget'), (snapshot) => {
      const data = snapshot.val()
      budget.value = data?.Amount || 0
    })
    onValue(dbRef(db, 'users/' + uid + '/Balance'), (snapshot) => {
      const data = snapshot.val()
      balance.value = data?.Amount || 0
    })
  })
})
</script>
