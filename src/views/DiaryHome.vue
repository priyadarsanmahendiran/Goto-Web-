<template>
  <div class="page-bg page-bg-diary">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="hero-wrap">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 text-center fade-up">
            <h2>The Go-to Diary <i class="fa fa-heart" style="color:var(--c-accent)"></i></h2>
            <p>An online diary — personal and collaborative.</p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <router-link to="/diary/collab" class="btn btn-primary btn-lg px-5">
                <i class="fa fa-handshake-o me-2"></i> Collaborative
              </router-link>
              <router-link to="/diary/personal" class="btn btn-outline-light btn-lg px-5">
                <i class="fa fa-key me-2"></i> Personal
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
