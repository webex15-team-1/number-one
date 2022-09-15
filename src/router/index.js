import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import KisyoPage from "@/views/KisyoPage.vue"
import AsakatsuPage from "@/views/AsakatsuPage.vue"
import MypageApp from "@/views/MypageApp.vue"
import ColorPallete from "@/views/ColorPalette.vue"
import NameRegister from "@/views/nameRegister.vue"
import Top from "@/views/TopPage.vue"
import Calendar from "@/views/MypageCalendar.vue"
import Logout from "@/views/LogoutPage.vue"

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
    path: "/palette",
    name: "palette",
    component: ColorPallete,
  },
  {
    path: "/name-register",
    name: "name-register",
    component: NameRegister,
  },
  {
    path: "/top",
    name: "top",
    component: Top,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
