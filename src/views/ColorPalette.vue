<template>
  <div class="palette">
    <h3>ポイントでページの色を変えよう！</h3>
    <h4>現在の所持ポイント: {{ userPoint }}pt</h4>
    <div class="button_container">
      <button
        v-for="(colorSet, index) in colorSets"
        :key="index"
        @click="updateColorSettings(colorSet)"
      >
        {{ colorSet.name }} ({{ colorSet.point }}pt)
      </button>
    </div>
  </div>
</template>
<script>
import { getAuth } from "firebase/auth"
import { colorSettings } from "@/store/colorSettings"
export default {
  data() {
    return {
      colorSets: [
        {
          name: "デフォルト",
          accentColor: "#366273",
          textColor: "#202020",
          bannerColor: "#F2AE2E",
          buttonColor: "#D9663D",
          backgroundColor: "#F2B263",
          point: 0,
        },
        {
          name: "あけぼのの海",
          accentColor: "#366273",
          textColor: "#BDD9F2",
          bannerColor: "#3498BF",
          buttonColor: "#184059",
          backgroundColor: "#4AA2D9",
          point: 10,
        },
      ],
      colorSettings: colorSettings,
      userPoint: 42,
    }
  },
  mounted: function () {
    const auth = getAuth()
    if (!auth.currentUser) {
      this.$router.push("/top")
    }
  },
  methods: {
    updateColorSettings(colorSet) {
      if (
        this.colorSettings.name !== colorSet.name &&
        confirm(colorSet.point + "pt消費します。よろしいですか？")
      ) {
        if (this.userPoint >= colorSet.point) {
          this.colorSettings.name = colorSet.name
          this.colorSettings.accentColor = colorSet.accentColor
          this.colorSettings.textColor = colorSet.textColor
          this.colorSettings.bannerColor = colorSet.bannerColor
          this.colorSettings.buttonColor = colorSet.buttonColor
          this.colorSettings.backgroundColor = colorSet.backgroundColor
          this.userPoint -= colorSet.point
        } else {
          alert("ポイントが不足しています。")
        }
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
