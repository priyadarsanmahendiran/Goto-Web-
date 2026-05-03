<template>
  <div class="page-bg page-bg-memories">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="fade-up">
        <h3 class="section-title"><i class="fa fa-pencil"></i> Your Scribbles</h3>
        <div v-if="entries.length" class="mb-5">
          <div v-for="entry in entries" :key="entry.date" class="col-12 entry-card">
            <h3 class="entry-date">{{ entry.date }}</h3>
            <p class="entry-text">{{ entry.text }}</p>
          </div>
        </div>
        <p v-else class="text-muted mb-5">No entries yet.</p>

        <h3 class="section-title"><i class="fa fa-picture-o"></i> Your Gallery</h3>
        <p v-if="imgError" class="text-warning small">{{ imgError }}</p>
        <div v-if="photos.length" id="carouselExampleIndicators" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div
              v-for="(url, idx) in photos"
              :key="idx"
              :class="['carousel-item', { active: idx === 0 }]"
            >
              <img :src="url" class="d-block w-100 img-fluid" data-interval="1000">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <p v-else class="text-muted mb-5">No photos yet.</p>

        <h3 class="section-title"><i class="fa fa-video-camera"></i> Your Videos</h3>
        <p v-if="videoError" class="text-warning small">{{ videoError }}</p>
        <div v-if="videos.length" id="video" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div
              v-for="(url, idx) in videos"
              :key="idx"
              :class="['carousel-item', { active: idx === 0 }]"
            >
              <video :src="url" controls autoplay data-interval="1000" style="width:100%; max-height:440px; object-fit:cover;"></video>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#video" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#video" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <p v-else class="text-muted mb-5">No videos yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onValue, ref as dbRef } from 'firebase/database'
import { ref as stRef, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { decryptEntry } from '../utils/crypto.js'

const entries = ref([])
const photos = ref([])
const videos = ref([])
const imgError = ref('')
const videoError = ref('')

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    const uid = user.uid
    const diaryRef = dbRef(db, 'users/' + uid + '/Diary')
    onValue(diaryRef, async (snapshot) => {
      const data = snapshot.val()
      const list = []
      photos.value = []
      videos.value = []
      if (data) {
        for (const date in data) {
          const text = await decryptEntry(data[date].mom, uid)
          list.push({ date, text })
          getDownloadURL(stRef(storage, uid + '/' + date + '.jpg'))
            .then((url) => photos.value.push(url))
            .catch(() => {})
          getDownloadURL(stRef(storage, uid + '/' + date + '.mp4'))
            .then((url) => videos.value.push(url))
            .catch(() => {})
        }
      }
      entries.value = list
    })
  })
})
</script>
