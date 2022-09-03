<template>
  <div class="header" :style="{ backgroundColor: colorSettings.bannerColor }">
    <span class="title header-title" :style="{ color: colorSettings.textColor }"
      >めざせNo.1-朝活-</span
    >
    <div class="header-button-container">
      <div
        class="header-button"
        :style="{
          backgroundColor: colorSettings.buttonColor,
        }"
      >
        <span :style="{ color: colorSettings.textColor }">1</span>
      </div>
      <div
        class="header-button"
        :style="{
          backgroundColor: colorSettings.buttonColor,
        }"
      >
        <span :style="{ color: colorSettings.textColor }">2</span>
      </div>
      <div
        class="header-button"
        :style="{
          backgroundColor: colorSettings.buttonColor,
        }"
      >
        <span :style="{ color: colorSettings.textColor }">3</span>
      </div>
    </div>
    <hamburger-menu />
  </div>
</template>
<script>
import HamburgerMenu from "./HamburgerMenu.vue"
import { colorSettings } from "@/store/colorSettings"
export default {
  components: {
    HamburgerMenu,
  },
  data() {
    return {
      colorSettings: colorSettings,
    }
  },
}
</script>
<style scoped>
.header {
  position: absolute;
  width: 100%;
  height: 5em;
  top: 0%;
  background-color: orange;
  text-align: center;
}
.header-title {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header-button-container {
  position: absolute;
  display: inline-block;
  height: 100%;
  width: 20%;
  right: 15%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-around;
}
.header-button {
  width: 5vw;
  height: 100%;
  background-color: yellow;
  display: inline-block;
  position: relative;
}
.header-button span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hamburger-container {
  position: absolute;
  right: 2%;
  top: 1.5em;
}
</style>
