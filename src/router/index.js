import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import TopPage from "@/views/TopPageView.vue"
import KisyoPage from "@/views/KisyoPage.vue"
import AsakatsuPage from "@/views/AsakatsuPage.vue"
import LoginApp from "@/views/LoginApp.vue"
import RegisterApp from "@/views/RegisterApp.vue"
import MypageApp from "@/views/MypageApp.vue"
import NameRegister from "@/views/nameRegister.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginApp",
    component: LoginApp,
  },
  {
    path: "/register",
    name: "RegisterApp",
    component: RegisterApp,
  },
  {
    path: "/mypage",
    name: "MypageApp",
    component: MypageApp,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
