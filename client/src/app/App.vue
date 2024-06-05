<script setup lang="ts">
import Header from '../widgets/TheHeader.vue'
import { useUserStore, useMusicStore } from '@/stores'
import { findTrendingAlbums } from '@/api'

const { setUser } = useUserStore()
const musicStore = useMusicStore()

const username = localStorage.getItem('user')
if (username) {
  setUser(username)
}

musicStore.setTrendingAlbums('disco')
</script>
<template>
  <div class="min-h-screen max-w-full rounded-lg border">
    <Header />
    <div class="p-6">
      <RouterView />
    </div>
  </div>
</template>
