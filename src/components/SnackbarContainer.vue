<template>
  <div id="snackbar-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['snackbar', 'snackbar-' + toast.type, 'snackbar-show']"
    >
      <span class="snackbar-icon">{{ toast.icon }}</span>
      <span class="snackbar-msg">{{ toast.message }}</span>
      <button class="snackbar-close" @click="dismiss(toast.id)">&#x2715;</button>
    </div>
  </div>
</template>

<script setup>
import { useSnackbar } from '../composables/useSnackbar.js'

const { toasts, showSnackbar } = useSnackbar()

function dismiss(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

// expose showSnackbar globally for compatibility
if (typeof window !== 'undefined') {
  window.showSnackbar = showSnackbar
}
</script>
