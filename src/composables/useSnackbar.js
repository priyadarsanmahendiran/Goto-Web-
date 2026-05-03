import { ref } from 'vue'

const toasts = ref([])
let idCounter = 0

const ICONS = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }

export function useSnackbar() {
  function showSnackbar(message, type = 'info') {
    const id = ++idCounter
    toasts.value.push({ id, message, type, icon: ICONS[type] || ICONS.info })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 4500)
  }
  return { toasts, showSnackbar }
}
