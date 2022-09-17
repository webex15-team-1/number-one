import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./firebase.js"
import { colorSettings } from "@/store/colorSettings"

createApp(App).use(colorSettings).use(router).mount("#app")
