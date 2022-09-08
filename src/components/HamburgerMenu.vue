<template>
  <div
    class="hamburger-container"
    :style="{ backgroundColor: colorSettings.bannerColor }"
  >
    <button
      class="hamburger-button"
      @click="toggleMenu"
      :class="{ active: isOpened }"
    >
      <span></span><span></span><span></span>
    </button>
    <div class="hamburger-nav-items" :class="{ active: isOpened }">
      <transition-group
        @before-enter="navItemBeforeEnter"
        @enter="navItemEnter"
        @leave="navItemLeave"
      >
        <div
          v-for="(nav, index) in navData"
          @click="jumpPage(nav.path)"
          :key="index"
          :data-index="index"
          v-show="isOpened"
          tag="div"
          class="hamburger-nav-item"
          :style="{
            color: colorSettings.textColor,
            'background-color': colorSettings.buttonColor,
          }"
        >
          {{ nav.text }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import gsap from "gsap"
import { colorSettings } from "@/store/colorSettings"
export default {
  data() {
    return {
      isOpened: false,
      navData: [
        { path: "/", text: "HOME" },
        { path: "top", text: "top" },
        { path: "kisyo", text: "起床" },
        { path: "asakatsu", text: "朝活" },
        { path: "palette", text: "palette" },
      ],
      colorSettings: colorSettings,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    },
    jumpPage(path) {
      this.$router.push(path)
    },
    navItemBeforeEnter(el) {
      gsap.set(el, { opacity: 0, y: -2 * el.dataset.index + "em" })
    },
    navItemEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        delay: 0.3,
        duration: 0.5,
        onComplete: done,
      })
    },
    navItemLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        onComplete: done,
      })
    },
  },
}
</script>

<style scoped>
.hamburger-container {
  width: 6em;
}
.hamburger-button {
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0;
  padding: 0;
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
  transition: all 0.4s;
  position: absolute;
  width: 75%;
  left: 12.5%;
  height: 3px;
  border-radius: 2px;
  background-color: black;
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
.hamburger-nav-items {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s ease-in-out;
  height: 0;
}
.hamburger-nav-items.active {
  height: 14em;
}
.hamburger-nav-item {
  width: 100%;
}
</style>
