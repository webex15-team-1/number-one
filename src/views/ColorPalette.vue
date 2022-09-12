<template>
  <div class="palette">
    <h3>ポイントでページの色を変えよう！</h3>
    <h4>現在の所持ポイント: {{ shopPoints }}pt</h4>
    <div class="button_container">
      <button
        v-for="(colorSet, index) in colorSettings.colors"
        :key="index"
        :disabled="colorSettings.activeColorSet === index"
        @click="updateColorSettings(index)"
      >
        {{ colorSet.name }} ({{ colorSet.price }}pt)
      </button>
    </div>
  </div>
</template>
<script>
import { colorSettings } from "@/store/colorSettings"
export default {
  data() {
    return {
      colorSettings: colorSettings,
      shopPoints: 42,
    }
  },
  methods: {
    updateColorSettings(colorIndex) {
      const price = this.colorSettings.colors[colorIndex].price
      if (price <= this.shopPoints) {
        this.colorSettings.activeColorSet = colorIndex
        this.shopPoints -= price
      } else {
        alert("ポイントが不足しています")
      }
    },
  },
}
</script>
<style>
.button_container {
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
