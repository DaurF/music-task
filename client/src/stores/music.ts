import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchAlbums, findTrendingAlbums } from '@/api'

export const useMusicStore = defineStore('music', () => {
    const trendingAlbums = ref([]) as any
    const albums = ref([]) as any
    const searchQuery = ref('')


    async function setSearchQuery(newSearch: string) {
        searchQuery.value = newSearch;

        if (searchQuery.value.length > 2) {
            albums.value = await searchAlbums(searchQuery.value)
        } else {
            albums.value = []
        }
    }

    async function setTrendingAlbums(tag: string) {
        trendingAlbums.value = await findTrendingAlbums(tag)
    }

    const getAlbums = computed(() => albums.value)
    const getTrendingAlbums = computed(() => trendingAlbums.value)
    const hasAlbums = computed(() => !!albums.value.length)

    return { albums, searchQuery, setSearchQuery, hasAlbums, getAlbums, trendingAlbums, getTrendingAlbums, setTrendingAlbums }
})
