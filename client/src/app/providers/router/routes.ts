import Home from "@/pages/HomePage.vue";

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import("@/pages/AuthPage.vue")
  },
  {
    path: '/albums/:id',
    name: 'album',
    component: () => import("@/pages/AppAlbum.vue")
  }
]
