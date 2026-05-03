<template>
  <div class="page-bg page-bg-collab">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="hero-wrap">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 text-center fade-up">
            <blockquote class="diary-quote fs-5 mb-4">
              "What an odd thing a diary is: the things you omit are more important than those you put in."
              <footer class="mt-2 small" style="color:var(--c-muted)">— Simone de Beauvoir</footer>
            </blockquote>
            <router-link to="/diary/collab/book" class="btn btn-primary btn-lg px-5">
              <i class="fa fa-handshake-o me-2"></i> Open Collaborative Book
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
