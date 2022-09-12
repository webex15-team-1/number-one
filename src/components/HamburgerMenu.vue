<template>
  <button
    class="hamburger-button"
    @click="toggleMenu"
    :class="{ active: isOpened }"
    :style="{ backgroundColor: hamburgerButtonColor }"
  >
    <span :style="{ backgroundColor: colorSet.generalTextColor }"></span
    ><span :style="{ backgroundColor: colorSet.generalTextColor }"></span
    ><span :style="{ backgroundColor: colorSet.generalTextColor }"></span>
  </button>
  <div
    class="hamburger-container"
    :class="{ active: isOpened }"
    :style="{ backgroundColor: colorSet.hamburgerBackgroundColor }"
  >
    <div class="hamburger-title"><span>Morening☀️</span></div>
    <div class="nav-items">
      <div
        class="nav-item"
        v-for="(item, index) in navData"
        :key="index"
        :style="{ color: colorSet.generalTextColor }"
      >
        <Icon
          icon="akar-icons:circle-triangle-right-fill"
          width="1.2em"
          :color="colorSet.generalTextColor"
        /><a :href="item.path" :style="{ color: colorSet.generalTextColor }">{{
          item.text
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { colorSettings } from "@/store/colorSettings"
import { Icon } from "@iconify/vue"
export default {
  components: {
    Icon,
  },
  data() {
    return {
      isOpened: false,
      navData: [
        { path: "/", text: "Home" },
        { path: "kisyo", text: "起床" },
        { path: "asakatsu", text: "朝活" },
        { path: "mypage", text: "マイページ" },
        { path: "palette", text: "Shop" },
        { path: "logout", text: "ログアウト" },
      ],
      colorSettings: colorSettings,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    },
  },
  computed: {
    colorSet() {
      return this.colorSettings.colors[this.colorSettings.activeColorSet]
    },
    hamburgerButtonColor() {
      return this.isOpened
        ? this.colorSet.hamburgerBackgroundColor
        : this.colorSet.generalBackgroundColor
    },
  },
}
</script>

<style scoped>
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
  left: 95%;
  width: 2em;
  height: 2em;
  z-index: 20000;
  margin: 0;
  padding: 0;
  transition: background-color 0.5s ease-in-out;
  border: none;
  border-radius: 0;
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
  width: 75%;
  left: 12.5%;
  height: 3px;
  border-radius: 2px;
}
.hamburger-button span:nth-child(1) {
  top: 22%;
}
.hamburger-button span:nth-child(2) {
  top: 47%;
}
.hamburger-button span:nth-child(3) {
  top: 73%;
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
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5em;
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
  font-size: 1.2em;
}
</style>
