<template>
  <div class="page-bg page-bg-addexpense">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="hero-wrap">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 text-center fade-up">
            <h2><i class="fa fa-bar-chart me-2" style="color:var(--c-accent)"></i>Expense Tracker</h2>
            <p>Track every rupee. Know where your money goes.</p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center flex-wrap">
              <router-link to="/expenses/budget" class="btn btn-outline-light btn-lg px-4">
                <i class="fa fa-rupee me-1"></i> Set Budget
              </router-link>
              <router-link to="/expenses/add" class="btn btn-primary btn-lg px-4">
                <i class="fa fa-plus me-1"></i> Add Expense
              </router-link>
              <router-link to="/expenses/view" class="btn btn-outline-light btn-lg px-4">
                <i class="fa fa-exchange me-1"></i> View Expenses
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
