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
import { colorSettings, currentSetting } from "@/store/colorSettings"
export default {
  data() {
    return {
      colorSettings: colorSettings,
      currentSetting: currentSetting,
    }
  },
}
</script>
<style lang=""></style>
