import axios from 'axios'
import { http } from '@/shared/api'

export async function searchAlbums(query: string) {
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY

    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${API_KEY}&format=json`)
    let albums = [] as any[]

    if (response.status === 200) {
        albums = response.data.results.albummatches.album as any[]
    }

    return albums
}

export async function findTrendingAlbums(tag: string) {
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY

    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tag}&api_key=${API_KEY}&format=json`)
    let albums = [] as any[]

    if (response.status === 200) {
        albums = response.data.albums.album as any[]
    }

    return albums
}

export async function findOneAlbum(albumName: string, artist: string) {
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY

    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${albumName}&format=json`)
    console.log(response)
    return response.data.album
}

interface LoginCredentials {
    username: string;
    password: string;
}

export async function makeReview(review: any) {
    const response = await http.post('/reviews', review)

    return response.data
}

export async function getReviews(mbid: string) {
    const response = await http.get(`/reviews/${mbid}`)
    return response.data
}

export async function loginUser(credentials: LoginCredentials) {
    try {
        const response = await http.post('/auth/login', credentials)
        return response.data
    } catch (err) {
        throw err;
    }
}

interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export async function registerUser(credentials: RegisterCredentials) {
    try {
        const response = await http.post('/auth/signup', credentials)
        return response.data
    } catch (err) {
        throw err;
    }
}