<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card'
import { useMusicStore } from '@/stores'
import { computed } from 'vue'

const store = useMusicStore()

const albums = computed(() => store.getAlbums)
</script>

<template>
  <div>
    <h2 class="font-semibold text-xl mb-4">Searching results</h2>
    <div class="grid grid-cols-8 gap-4">
      <Card v-for="album in albums" :key="album.name">
        <RouterLink :to="{ name: 'album', params: { id: album.name + '|' + album.artist.name } }">
          <CardHeader>
            <CardTitle>{{ album.name }}</CardTitle>
            <CardDescription>{{ album.artist }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              :style="{ borderRadius: '9px', overflow: 'hidden' }"
              class="rounded overflow-hidden"
            >
              <img
                class="object-cover w-full"
                :src="album.image[2]['#text']"
                :alt="`Image for album ${album.name}`"
              />
            </div>
          </CardContent>
        </RouterLink>
      </Card>
    </div>
  </div>
</template>