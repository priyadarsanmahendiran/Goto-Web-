import { ref } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.js'

const user = ref(null)
const ready = ref(false)
let resolveReady
const readyPromise = new Promise((resolve) => {
  resolveReady = resolve
})

onAuthStateChanged(auth, (u) => {
  user.value = u
  ready.value = true
  resolveReady()
})

export function useAuth() {
  const logout = async () => {
    await signOut(auth)
    window.location.reload()
  }
  return { user, ready, logout, readyPromise }
}
