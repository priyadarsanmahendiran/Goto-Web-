<template>
  <div id="dashboard">
    <div class="main" :style="{ height: winHeight + 'px' }">
      <div class="main-content">
        <div class="page-title mb-5">
          <p class="title">Discover your<br>go-to place.</p>
        </div>
        <ul class="social">
          <li><a href="#"><img src="/icons/social/dribbble.svg" alt=""></a></li>
          <li><a href="#"><img src="/icons/social/instagram.svg" alt=""></a></li>
          <li><a href="#"><img src="/icons/social/twitter.svg" alt=""></a></li>
        </ul>
      </div>
    </div>

    <div class="cd-transition-layer">
      <div class="bg-layer"></div>
    </div>

    <div class="full-menu" :class="{ visible: menuOpen }">
      <div class="modal-close" @click="menuOpen = false"></div>
      <div class="fullmenu-content">
        <div class="page-menu">
          <div class="menu-brand">
            <img src="/images/b515e6c2-9e5f-486e-908d-dc3ecd0f8ab4_200x200.png" alt="">
            <span>Go-to!</span>
          </div>

          <ul class="menu-items">
            <li><router-link to="/dashboard" @click="menuOpen = false"><span>Home</span></router-link></li>
            <li><router-link to="/diary" @click="menuOpen = false"><span>Diary</span></router-link></li>
            <li><router-link to="/expenses" @click="menuOpen = false"><span>Expenses</span></router-link></li>
            <li><router-link to="/todo" @click="menuOpen = false"><span>To-do</span></router-link></li>
          </ul>

          <div class="menu-footer">
            <div class="row">
              <div class="col-md-6">
                <h5>About</h5>
                <p>A personal dashboard for your daily thoughts, tasks, and expenses.</p>
              </div>
              <div class="col-md-6">
                <h5>Contact</h5>
                <p>hello@gotoapp.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-icon" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="hello">
      <span>Hello </span>
      <span v-if="user">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const { user } = useAuth()
const winHeight = ref(window.innerHeight)
const menuOpen = ref(false)

function updateHeight() {
  winHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', updateHeight)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})
</script>

<style scoped>
.main {
  background: url(/ban6.jpg) no-repeat;
  background-size: cover;
  display: table;
  width: 100%;
  position: relative;
}
.main:after {
  content: '';
  width: 100%;
  height: 100%;
  left: 0;
  z-index: -1;
  opacity: .85;
  position: absolute;
}
.main-content {
  padding: 0 60px;
  vertical-align: middle;
  display: table-cell;
  height: 100%;
  width: 100%;
}
.page-title .title {
  font-size: 56px;
  line-height: 1.1;
  color: #fff;
  font-weight: 700;
}
.hello {
  position: absolute;
  top: 24px;
  left: 60px;
  z-index: 2;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}
.social {
  position: absolute;
  bottom: 30px;
  left: 60px;
  display: flex;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.social img {
  width: 20px;
  height: 20px;
  filter: invert(1);
  opacity: 0.7;
  transition: opacity 0.3s;
}
.social img:hover { opacity: 1; }

.nav-icon {
  position: absolute;
  top: 24px;
  right: 60px;
  z-index: 5;
  cursor: pointer;
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nav-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  transition: 0.3s;
}

.full-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s 0s, visibility 0s 0.3s;
  box-shadow: 1px 2px 10px 5px black;
  animation: slider 15s infinite linear;
}
@keyframes slider {
  0% { background-image: url(/h1.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; }
  50% { background-image: url(/h2.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; }
  100% { background-image: url(/ban5.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; }
}
.full-menu.visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.7s, visibility 0s;
}
.full-menu .modal-close {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  padding: 50px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background: rgba(0,0,0,0.3) url(/cd-icon-close.svg) no-repeat center center;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.3s 0s, visibility 0s 0.3s, opacity 0.3s 0s;
}
.full-menu.visible .modal-close {
  visibility: visible;
  opacity: 1;
  transition: transform 0.3s 0s, visibility 0s 0s, opacity 0.3s 0s;
  transform: scale(1);
}
.fullmenu-content {
  padding: 5em 5%;
  height: 100%;
  overflow-y: auto;
}
.page-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
.menu-brand {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
}
.menu-brand img { width: 48px; height: 48px; border-radius: 8px; }
.menu-items {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem;
}
.menu-items li {
  margin: 1rem 0;
}
.menu-items a {
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.3s;
}
.menu-items a:hover { opacity: 0.7; }
.menu-footer {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
}
.menu-footer h5 {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
