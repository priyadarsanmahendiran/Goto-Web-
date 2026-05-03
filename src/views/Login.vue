<template>
  <div id="loginPage">
    <div id="loader" v-if="loading">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row g-0 auth-split">
      <div class="col-lg-6 d-none d-lg-block auth-image auth-image-login">
        <div class="auth-brand">
          <div class="auth-logo">
            <img src="/images/b515e6c2-9e5f-486e-908d-dc3ecd0f8ab4_200x200.png" width="36" height="36" alt="Go-to!">
            Go-to!
          </div>
          <h2>Your diary,<br>your world.</h2>
          <p>Write memories, track expenses, and stay on top of your to-do list — all in one place.</p>
        </div>
      </div>
      <div class="col-lg-6 auth-panel">
        <div class="auth-form-wrap">
          <p class="auth-sub">Welcome back</p>
          <h2 class="auth-heading">Sign in</h2>
          <input v-model="email" type="email" placeholder="Email address" required autofocus class="auth-input mt-4">
          <input v-model="password" type="password" placeholder="Password" required class="auth-input">
          <button type="button" class="auth-btn" @click="login">Sign In</button>
          <div class="auth-links">
            <router-link to="/register">New here? Create account</router-link>
            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useSnackbar } from '../composables/useSnackbar.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const { showSnackbar } = useSnackbar()

async function login() {
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    showSnackbar('Sign in failed: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>
