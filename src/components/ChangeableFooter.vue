<template>
  <footer
    class="footer"
    :style="{
      backgroundColor: currentSetting.generalBackgroundColor,
      color: currentSetting.generalTextColor,
    }"
  >
    <div>
      This Application is made by
      <span class="names">No. 1: Jun, Kosuke and Leaf</span>.
    </div>
    <small
      >The Application is created as a part of the GeekSalon WebExpert
      Course.</small
    >
  </footer>
</template>
<script>
export default {
  computed: {
    currentSetting() {
      const colorIndex = this.$store.state.activeColorSet
      return this.$store.state.colors[colorIndex]
    },
  },
}
</script>
<style lang=""></style>
