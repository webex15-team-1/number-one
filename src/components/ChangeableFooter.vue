<template>
  <footer
    class="footer"
    :style="{
      backgroundColor: colorSet.generalBackgroundColor,
      color: colorSet.generalTextColor,
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
import { colorSettings } from "@/store/colorSettings"
export default {
  data() {
    return {
      colorSettings: colorSettings,
    }
  },
  computed: {
    colorSet() {
      return this.colorSettings.colors[this.colorSettings.activeColorSet]
    },
  },
}
</script>
<style lang=""></style>
