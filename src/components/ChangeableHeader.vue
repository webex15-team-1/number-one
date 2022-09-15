<template>
  <div
    class="header"
    :style="{ backgroundColor: currentSetting.titleBackgroundColor }"
  >
    <span
      class="title header-title"
      :style="{ color: currentSetting.titleColor }"
      >Morening☀️</span
    >
  </div>
</template>
<script>
export default {
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
<style scoped>
.header {
  position: fixed;
  width: 15%;
  height: 3em;
  top: 5%;
  left: 5%;
  text-align: center;
  display: inline-block;
}
.header-title {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 1.5em;
  width: 100%;
  font-size: 1.5em;
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
