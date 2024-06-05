<script setup lang="ts">
import { useMusicStore } from '@/stores'
import { computed } from 'vue'
import SearchAlbums from '@/widgets/SearchAlbums.vue'
import TrendingAlbums from '@/widgets/TrendingAlbums.vue'

const store = useMusicStore()

const hasAlbums = computed(() => store.hasAlbums)
</script>

<template>
  <main>
    <SearchAlbums v-if="hasAlbums" />
    <TrendingAlbums v-else />
  </main>
</template>
