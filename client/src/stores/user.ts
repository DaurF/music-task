import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref<string | null>(null)

    const getUsername = computed(() => username.value)

    function setUser(newUsername: string) {
        username.value = newUsername;
        localStorage.setItem('user', newUsername)
    }

    function resetUser() {
        username.value = null;
        localStorage.removeItem('user')
    }

    const loggedIn = computed(() => !!username.value)

    return { username, setUser, loggedIn, getUsername, resetUser }
})
