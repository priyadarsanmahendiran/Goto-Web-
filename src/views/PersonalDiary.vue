<template>
  <div class="page-bg page-bg-personal">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="hero-wrap">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-5 fade-up">
            <div class="glass-card">
              <h3 class="fw-bold mb-2">Your Personal Diary</h3>
              <p class="mb-4" style="color:rgba(255,255,255,0.7);">
                Capture your emotions, memories, and every exciting moment. This diary is yours alone.
              </p>
              <div class="d-grid gap-2 d-sm-flex">
                <router-link to="/diary/personal/write" class="btn btn-primary">
                  <i class="fa fa-pencil me-1"></i> Write for today
                </router-link>
                <router-link to="/diary/personal/memories" class="btn btn-outline-light">
                  <i class="fa fa-history me-1"></i> Previous writings
                </router-link>
              </div>
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
