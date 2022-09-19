<template>
  <button
    class="hamburger-button"
    @click="toggleMenu"
    :class="{ active: isOpened }"
    :style="{ backgroundColor: hamburgerButtonColor }"
  >
    <span :style="{ backgroundColor: currentSetting.generalTextColor }"></span
    ><span :style="{ backgroundColor: currentSetting.generalTextColor }"></span
    ><span :style="{ backgroundColor: currentSetting.generalTextColor }"></span>
  </button>
  <div
    class="hamburger-container"
    :class="{ active: isOpened }"
    :style="{ backgroundColor: currentSetting.hamburgerBackgroundColor }"
  >
    <div class="hamburger-title"><span>Morening☀️</span></div>
    <div class="nav-items">
      <div
        class="nav-item"
        v-for="(item, index) in navData"
        :key="index"
        :style="{ color: currentSetting.generalTextColor }"
      >
        <Icon
          icon="akar-icons:circle-triangle-right-fill"
          width="1.2em"
          :color="currentSetting.generalTextColor"
        /><a
          :href="item.path"
          :style="{ color: currentSetting.generalTextColor }"
          >{{ item.text }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Icon } from "@iconify/vue"
export default {
  components: {
    Icon,
  },
  data() {
    return {
      auth: null,
      login: false,
      isOpened: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    },
  },
  computed: {
    currentSetting() {
      const colorIndex = this.$store.state.activeColorSet
      return this.$store.state.colors[colorIndex]
    },
    hamburgerButtonColor() {
      return this.isOpened
        ? this.currentSetting.hamburgerBackgroundColor
        : this.currentSetting.generalBackgroundColor
    },
    navData() {
      return this.login
        ? [
            { path: "/", text: "Home" },
            { path: "kisyo", text: "起床" },
            { path: "asakatsu", text: "朝活" },
            { path: "mypage", text: "マイページ" },
            { path: "palette", text: "Shop" },
            { path: "logout", text: "ログアウト" },
          ]
        : [{ path: "/top", text: "Top" }]
    },
  },
  created() {
    this.auth = getAuth()
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        this.login = false
      } else {
        this.login = true
      }
    })
  },
}
</script>

<style scoped>
@media (min-width: 1001px) {
  .hamburger-container {
    position: fixed;
    top: 0%;
    left: 125%;
    width: 25%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    z-index: 10000;
  }
  .hamburger-container.active {
    left: 75%;
  }
  .hamburger-button {
    position: fixed;
    top: 5%;
    left: 90%;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    z-index: 20000;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    vertical-align: middle;
    text-align: inherit;
    font: inherit;
    -webkit-appearance: none;
    appearance: none;
  }
  /* https://coco-factory.jp/ugokuweb/move01/5-2-1/ */
  .hamburger-button span {
    display: inline-block;
    transition: all 0.5s;
    position: absolute;
    width: 50%;
    left: 25%;
    height: 3px;
    border-radius: 2px;
  }
  .hamburger-button span:nth-child(1) {
    top: 30%;
  }
  .hamburger-button span:nth-child(2) {
    top: 47%;
  }
  .hamburger-button span:nth-child(3) {
    top: 64%;
  }
  .hamburger-button.active span:nth-child(1) {
    top: 47%;
    transform: rotate(-45deg);
  }
  .hamburger-button.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger-button.active span:nth-child(3) {
    top: 47%;
    transform: rotate(45deg);
  }
  .hamburger-title {
    position: relative;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    height: 3em;
    text-align: center;
  }
  .hamburger-title span {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    font-size: 2em;
    line-height: 2em;
    font-weight: bold;
  }
  .nav-items {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    top: 10%;
  }
  .nav-item {
    margin: 0.5em;
    height: 2em;
    display: flex;
    align-items: center;
  }
  .nav-item svg {
    position: absolute;
    left: 5%;
  }
  .nav-item a {
    position: absolute;
    left: 15%;
    color: inherit;
    text-decoration: none;
    font-size: 1.5em;
    line-height: 1.5em;
  }
}
@media (max-width: 1000px) {
  .hamburger-container {
    position: fixed;
    top: 0%;
    left: 130%;
    width: 30%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    z-index: 10000;
  }
  .hamburger-container.active {
    left: 70%;
  }
  .hamburger-button {
    position: fixed;
    top: 2.5%;
    left: 90%;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    z-index: 20000;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    vertical-align: middle;
    text-align: inherit;
    font: inherit;
    -webkit-appearance: none;
    appearance: none;
  }
  /* https://coco-factory.jp/ugokuweb/move01/5-2-1/ */
  .hamburger-button span {
    display: inline-block;
    transition: all 0.5s;
    position: absolute;
    width: 50%;
    left: 25%;
    height: 3px;
    border-radius: 2px;
  }
  .hamburger-button span:nth-child(1) {
    top: 30%;
  }
  .hamburger-button span:nth-child(2) {
    top: 47%;
  }
  .hamburger-button span:nth-child(3) {
    top: 64%;
  }
  .hamburger-button.active span:nth-child(1) {
    top: 47%;
    transform: rotate(-45deg);
  }
  .hamburger-button.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger-button.active span:nth-child(3) {
    top: 47%;
    transform: rotate(45deg);
  }
  .hamburger-title {
    position: relative;
    top: 2.5%;
    left: 50%;
    transform: translateX(-50%);
    height: 4em;
    text-align: center;
  }
  .hamburger-title span {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    font-size: 1.5em;
    font-weight: bold;
  }
  .nav-items {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    top: 3%;
  }
  .nav-item {
    margin: 0.5em;
    height: 2em;
    display: flex;
    align-items: center;
  }
  .nav-item svg {
    position: absolute;
    left: 5%;
  }
  .nav-item a {
    position: absolute;
    left: 20%;
    color: inherit;
    text-decoration: none;
    font-size: 1.2em;
    line-height: 1.2em;
  }
}
@media (max-width: 670px) {
  .hamburger-container {
    position: fixed;
    top: 0%;
    left: 140%;
    width: 40%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    z-index: 10000;
  }
  .hamburger-container.active {
    left: 60%;
  }
  .hamburger-button {
    position: fixed;
    top: 2.5%;
    left: 85%;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    z-index: 20000;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    vertical-align: middle;
    text-align: inherit;
    font: inherit;
    -webkit-appearance: none;
    appearance: none;
  }
  /* https://coco-factory.jp/ugokuweb/move01/5-2-1/ */
  .hamburger-button span {
    display: inline-block;
    transition: all 0.5s;
    position: absolute;
    width: 50%;
    left: 25%;
    height: 3px;
    border-radius: 2px;
  }
  .hamburger-button span:nth-child(1) {
    top: 30%;
  }
  .hamburger-button span:nth-child(2) {
    top: 47%;
  }
  .hamburger-button span:nth-child(3) {
    top: 64%;
  }
  .hamburger-button.active span:nth-child(1) {
    top: 47%;
    transform: rotate(-45deg);
  }
  .hamburger-button.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger-button.active span:nth-child(3) {
    top: 47%;
    transform: rotate(45deg);
  }
  .hamburger-title {
    position: relative;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    height: 2em;
    text-align: center;
  }
  .hamburger-title span {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    font-size: 1.5em;
    font-weight: bold;
  }
  .nav-items {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    top: 10%;
  }
  .nav-item {
    margin: 0.5em;
    height: 2em;
    display: flex;
    align-items: center;
  }
  .nav-item svg {
    position: absolute;
    left: 5%;
  }
  .nav-item a {
    position: absolute;
    left: 20%;
    color: inherit;
    text-decoration: none;
    font-size: 1em;
    line-height: 1em;
  }
}
</style>
