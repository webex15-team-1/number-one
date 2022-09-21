<template>
  <div
    class="loading"
    :style="{ backgroundColor: currentSetting.titleBackgroundColor }"
  >
    <Icon
      class="loadingSun"
      icon="bi:sun-fill"
      width="10%"
      :style="{ color: currentSetting.titleColor }"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue"
export default {
  components: {
    Icon,
  },
  computed: {
    activeColorSet() {
      return this.$store.state.activeColorSet
    },
    currentSetting() {
      return this.$store.state.colors[this.activeColorSet]
    },
  },
}
</script>

<style>
.loading {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}
.loadingSun {
  animation: rotate 4s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
