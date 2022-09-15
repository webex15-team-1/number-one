<template>
  <div
    @click="backHome()"
    class="header"
    :style="{ backgroundColor: colorSettings.bannerColor }"
  >
    <span class="title header-title" :style="{ color: colorSettings.textColor }"
      >Morening</span
    >
  </div>
  <hamburger-menu />
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
  methods: {
    backHome() {
      this.$router.push("/")
    },
  },
}
</script>
<style scoped>
.header {
  position: sticky;
  width: 10%;
  height: 3em;
  top: 5%;
  left: 5%;
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
  position: sticky;
  left: 90%;
  top: 5%;
}
</style>
