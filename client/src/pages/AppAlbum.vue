<script setup lang="ts">
import { useRoute } from 'vue-router'
import { findOneAlbum } from '@/api'
import { computed, onMounted, ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { makeReview, getReviews } from '@/api'
import { useUserStore } from '@/stores'

const route = useRoute()

const reviewContent = ref('')

const reviews = ref<any[]>([])

const albumId = route.params.id as string

const album = ref(null)
const score = ref(1)
const store = useUserStore()

const rating = computed(() => {
  if (reviews.value.length > 0) {
    return (
      reviews.value.reduce((acc, review) => acc + review.score, 0) / reviews.value.length
    ).toFixed(2)
  } else {
    return 'Not defined'
  }
})

async function handlePost() {
  if (!reviewContent.value) {
    return
  }

  const review = {
    username: store.getUsername,
    mbid: album.value.mbid,
    content: reviewContent.value,
    score: Number(score.value)
  }

  const response = await makeReview(review)

  if (response.message === 'OK') {
    reviews.value.push(review)
  }
}

onMounted(async () => {
  album.value = await findOneAlbum(...albumId.split('|'))
  const response = await getReviews(album.value.mbid)
  reviews.value = response.reviews
})
</script>

<template>
  <div v-if="album" class="grid grid-cols-2">
    <div>
      <h6>
        Album: <a target="_blank" class="underline" :href="album.url">{{ album.name }}</a>
      </h6>
      <h6>Artist: {{ album.artist }}</h6>
      <img :src="album.image[3]['#text']" />

      <div>Rating: {{ rating }}</div>

      <div>
        <Card v-for="track in album.tracks.track" :key="track.name" class="mt-4">
          <CardHeader>
            <CardTitle>{{ track.name }}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
    <div>
      <Input v-model="reviewContent" placeholder="Content" class="mb-2" />
      <div>
        <label for="score">Rate the album</label>
        <select id="score" v-model="score">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <Button class="mt-2" @click.prevent="handlePost">Post</Button>
      <Card v-for="review in reviews" :key="review.content" class="mt-4">
        <CardHeader>
          <CardTitle>{{ review.content }}</CardTitle>
          <CardDescription>username: {{ review.username }}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>