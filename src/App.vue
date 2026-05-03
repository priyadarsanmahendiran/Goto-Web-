<template>
  <div>
    <router-view />
    <SnackbarContainer />
  </div>
</template>

<script setup>
import SnackbarContainer from './components/SnackbarContainer.vue'
</script>
