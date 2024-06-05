<template>
  <div class="h-full flex gap-4 max-w-full p-6">
    <RouterLink :to="{ name: 'home' }"> Home </RouterLink>
    <div class="relative w-full">
      <Input
        id="search"
        v-model="query"
        type="text"
        placeholder="Type at least 3 characters to search albums..."
        class="pl-10"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>

    <div class="w-40 flex justify-end items-center gap-2">
      <template v-if="!loggedIn">
        <Button variant="secondary">
          <RouterLink :to="{ name: 'auth' }"> Sign in </RouterLink>
        </Button>
        <Button>
          <RouterLink :to="{ name: 'auth' }"> Sign up </RouterLink>
        </Button>
      </template>
      <template v-else>
        <Label for="btn-logout">@{{ username }}</Label>
        <Button id="btn-logout" @click.prevent="store.resetUser"> Logout </Button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/shared/ui/input'
import { ref, computed, watch } from 'vue'
import { useMusicStore } from '@/stores'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { Label } from '@/shared/ui/label'

const { setSearchQuery } = useMusicStore()

const store = useUserStore()

const loggedIn = computed(() => store.loggedIn)
const username = computed(() => store.getUsername)

const router = useRouter()
const query = ref(null)
watch(query, (newQuery) => {
  console.log('hey')
  router.push({ name: 'home' })
  setSearchQuery(newQuery)
})
</script>