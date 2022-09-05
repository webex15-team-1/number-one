import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import TopPage from "@/views/TopPageView.vue"
import KisyoPage from "@/views/KisyoPage.vue"
import AsakatsuPage from "@/views/AsakatsuPage.vue"
import MypageApp from "@/views/MypageApp.vue"
import NameRegister from "@/views/nameRegister.vue"
import Top from "@/views/TopPage.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mypage",
    name: "MypageApp",
    component: MypageApp,
  },
  { path: "/top", name: "top-page", component: TopPage },
  {
    path: "/kisyo",
    name: "kisyo",
    component: KisyoPage,
  },
  {
    path: "/asakatsu",
    name: "asakatsu",
    component: AsakatsuPage,
  },
  {
    path: "/name-register",
    name: "name-register",
    component: NameRegister,
  },
  {
    path: "/toppage",
    name: "toppage",
    component: Top,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
