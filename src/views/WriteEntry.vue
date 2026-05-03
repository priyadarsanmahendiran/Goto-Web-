<template>
  <div class="page-bg page-bg-write">
    <div class="page-overlay"></div>
    <Navbar />
    <div class="container page-section">
      <div class="row justify-content-center">
        <div class="col-md-9 col-lg-7 fade-up">
          <p class="diary-quote text-center">"The life of every person is like a diary in which he means to write one story, and writes another" — James Matthew Barrie</p>
          <div class="glass-card">
            <div class="mb-3">
              <label class="form-label">Your memory</label>
              <textarea v-model="moments" rows="11" class="form-control" placeholder="What happened today..."></textarea>
            </div>
            <hr style="border-color:var(--c-border); margin: 1.5rem 0;">
            <p class="small mb-3" style="color:var(--c-muted)">Attach photos or a video to make this memory complete.</p>
            <div class="mb-3">
              <label class="form-label"><i class="fa fa-picture-o me-1"></i> Pictures</label>
              <input type="file" class="form-control" @change="onPhotoChange" accept="image/*">
            </div>
            <div class="mb-4">
              <label class="form-label"><i class="fa fa-video-camera me-1"></i> Video</label>
              <input type="file" class="form-control" @change="onVideoChange" accept="video/*">
            </div>
            <button class="btn btn-primary px-4" @click="save">
              <i class="fa fa-save me-1"></i> Save Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref as dbRef, set } from 'firebase/database'
import { ref as stRef, uploadBytes } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage, auth } from '../firebase.js'
import Navbar from '../components/Navbar.vue'
import { encryptEntry } from '../utils/crypto.js'
import { useSnackbar } from '../composables/useSnackbar.js'

const moments = ref('')
const photoFile = ref(null)
const videoFile = ref(null)
const userId = ref('')
const router = useRouter()
const { showSnackbar } = useSnackbar()

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const todayStr = dd + '-' + mm + '-' + yyyy

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) userId.value = user.uid
  })
})

function onPhotoChange(e) {
  photoFile.value = e.target.files[0]
}
function onVideoChange(e) {
  videoFile.value = e.target.files[0]
}

async function save() {
  const text = moments.value.trim()
  if (!text) {
    showSnackbar('Please write something first.', 'warning')
    return
  }
  const uid = userId.value
  const encrypted = await encryptEntry(text, uid)
  await set(dbRef(db, 'users/' + uid + '/Diary/' + todayStr), { mom: encrypted })
  if (photoFile.value) {
    const renamed = new File([photoFile.value], todayStr + '.jpg', { type: photoFile.value.type })
    await uploadBytes(stRef(storage, uid + '/' + renamed.name), photoFile.value)
  }
  if (videoFile.value) {
    const renamed = new File([videoFile.value], todayStr + '.mp4', { type: videoFile.value.type })
    await uploadBytes(stRef(storage, uid + '/' + renamed.name), videoFile.value)
  }
  showSnackbar('Memory saved!', 'success')
  setTimeout(() => router.push('/diary/personal/memories'), 1500)
}
</script>
