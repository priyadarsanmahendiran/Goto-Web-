<template>
  <div style="background: var(--c-bg); min-height: 100vh;">
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5 fade-up">
          <div class="glass-card">
            <h4 class="fw-bold mb-4"><i class="fa fa-plus-circle me-2" style="color:var(--c-accent)"></i>Track Expense</h4>
            <div class="mb-3">
              <label class="form-label">Amount spent</label>
              <input v-model.number="amount" type="number" class="form-control" placeholder="0.00">
            </div>
            <div class="mb-3">
              <label class="form-label">Date</label>
              <input v-model="date" type="date" class="form-control">
            </div>
            <div class="mb-4">
              <label class="form-label">Category</label>
              <select v-model="reason" class="form-select">
                <option value="Hobbies">Hobbies</option>
                <option value="Vaccation with friends or family">Vacation</option>
                <option value="Education">Education</option>
                <option value="Job training">Job training</option>
                <option value="Sporting goods">Sporting goods</option>
                <option value="EB Bills">Bills</option>
                <option value="Food">Food</option>
                <option value="Emergency">Emergency</option>
                <option value="Donation">Donation</option>
                <option value="Online Purchases">Online Purchases</option>
                <option value="Offline Purchases">Offline Purchases</option>
                <option value="Parties">Parties / Birthday</option>
                <option value="Travelling">Travelling</option>
                <option value="Electronic gadgets">Electronics</option>
                <option value="Personal expense">Personal</option>
                <option value="other expense">Other</option>
              </select>
            </div>
            <button class="btn btn-primary w-100" @click="addExpense">
              <i class="fa fa-plus me-1"></i> Add Expense
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

const amount = ref('')
const date = ref('')
const reason = ref('Hobbies')
const userId = ref('')
const balance = ref(0)
const { showSnackbar } = useSnackbar()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    userId.value = user.uid
    onValue(dbRef(db, 'users/' + user.uid + '/Balance/Amount'), (snapshot) => {
      balance.value = Number(snapshot.val() || 0)
    })
  })
})

function addExpense() {
  const uid = userId.value
  const amt = Number(amount.value)
  const dt = date.value
  const reas = reason.value
  if (!amt || !dt || !reas) {
    showSnackbar('Please fill in all fields.', 'warning')
    return
  }
  const expenseRef = dbRef(db, 'users/' + uid + '/Expense/' + dt)
  onValue(expenseRef, (snapshot) => {
    const existing = snapshot.val()
    let newName = reas
    let newAmt = amt
    if (existing) {
      newName = reas + ', ' + existing.Name
      newAmt = amt + Number(existing.Amount)
    }
    set(expenseRef, { Name: newName, Amount: newAmt })
      .then(() => showSnackbar('Expense recorded!', 'success'))
      .catch((err) => showSnackbar(err.message, 'error'))
    set(dbRef(db, 'users/' + uid + '/Balance'), { Amount: balance.value - amt })
      .catch((err) => showSnackbar(err.message, 'error'))
  }, { onlyOnce: true })
}
</script>
