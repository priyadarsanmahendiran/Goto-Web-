<template>
  <div id="forgotPage">
    <div id="loader" v-if="loading">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row g-0 auth-split">
      <div class="col-lg-6 d-none d-lg-block auth-image auth-image-forgot">
        <div class="auth-brand">
          <div class="auth-logo">
            <img src="/images/b515e6c2-9e5f-486e-908d-dc3ecd0f8ab4_200x200.png" width="36" height="36" alt="Go-to!">
            Go-to!
          </div>
          <h2>Reset your access.</h2>
          <p>We'll send you a link to get back in.</p>
        </div>
      </div>
      <div class="col-lg-6 auth-panel">
        <div class="auth-form-wrap">
          <p class="auth-sub">Trouble signing in?</p>
          <h2 class="auth-heading">Reset password</h2>
          <input v-model="email" type="email" placeholder="Email address" required autofocus class="auth-input mt-4">
          <button type="button" class="auth-btn" @click="sendReset">Send Reset Link</button>
          <div class="auth-links">
            <router-link to="/login">Back to Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useSnackbar } from '../composables/useSnackbar.js'

const email = ref('')
const loading = ref(false)
const router = useRouter()
const { showSnackbar } = useSnackbar()

async function sendReset() {
  loading.value = true
  try {
    await sendPasswordResetEmail(auth, email.value)
    showSnackbar('Reset link sent! Check your email.', 'success')
    setTimeout(() => router.push('/login'), 1500)
  } catch (error) {
    showSnackbar('Error: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>
