<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5 fade-up">
          <div class="glass-card">
            <h4 class="fw-bold mb-4"><i class="fa fa-rupee me-2" style="color:var(--c-accent)"></i>Budget Settings</h4>
            <div class="mb-3">
              <label class="form-label">Monthly Budget</label>
              <input v-model.number="budget" type="number" class="form-control" placeholder="0.00">
            </div>
            <button class="btn btn-primary w-100 mb-4" @click="setBudget">
              <i class="fa fa-check me-1"></i> Set Budget
            </button>

            <hr style="border-color:var(--c-border)">

            <div class="mb-3 mt-4">
              <label class="form-label">Add Income / Increment</label>
              <input v-model.number="increment" type="number" class="form-control" placeholder="0.00">
            </div>
            <button class="btn btn-outline-light w-100" @click="addIncome">
              <i class="fa fa-plus me-1"></i> Add to Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ref as dbRef, set, onValue } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { useSnackbar } from '../composables/useSnackbar.js'

const budget = ref('')
const increment = ref('')
const userId = ref('')
const { showSnackbar } = useSnackbar()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) userId.value = user.uid
  })
})

function setBudget() {
  const uid = userId.value
  const val = Number(budget.value)
  if (!val) {
    showSnackbar('Please enter a valid amount.', 'warning')
    return
  }
  set(dbRef(db, 'users/' + uid + '/Budget'), { Amount: val })
    .then(() => showSnackbar('Budget set!', 'success'))
    .catch((err) => showSnackbar(err.message, 'error'))
  set(dbRef(db, 'users/' + uid + '/Balance'), { Amount: val })
    .then(() => showSnackbar('Balance added!', 'success'))
    .catch((err) => showSnackbar(err.message, 'error'))
}

function addIncome() {
  const uid = userId.value
  const inc = Number(increment.value)
  if (!inc) {
    showSnackbar('Please enter a valid amount.', 'warning')
    return
  }
  const budgetRef = dbRef(db, 'users/' + uid + '/Budget')
  onValue(budgetRef, (snapshot) => {
    const data = snapshot.val()
    const current = Number(data?.Amount || 0)
    set(budgetRef, { Amount: current + inc })
      .then(() => showSnackbar('Budget updated!', 'success'))
      .catch((err) => showSnackbar(err.message, 'error'))
  }, { onlyOnce: true })

  const balanceRef = dbRef(db, 'users/' + uid + '/Balance/Amount')
  onValue(balanceRef, (snapshot) => {
    const data = snapshot.val()
    const current = Number(data || 0)
    set(dbRef(db, 'users/' + uid + '/Balance'), { Amount: current + inc })
      .then(() => showSnackbar('Balance updated!', 'success'))
      .catch((err) => showSnackbar(err.message, 'error'))
  }, { onlyOnce: true })
}
</script>
