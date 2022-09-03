<template>
  <footer
    class="footer"
    :style="{
      backgroundColor: colorSettings.bannerColor,
      color: colorSettings.textColor,
    }"
  >
    <div>
      This Application is made by
      <span class="names">Jun💤, Kosuke🛵 and Leaf🌱</span>.
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
}
</script>
<style lang=""></style>
