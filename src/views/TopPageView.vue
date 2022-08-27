<template>
  <div class="container">
    <div class="greet">{{ greet }}</div>
    <div class="weather">
      <div
        class="weather-message"
        v-for="(desc, index) in weather.descriptions"
        :key="index"
      >
        今日の{{ desc.name }}の天気は{{ desc.forcast }}です。
      </div>
      <img id="weather-img" :src="weather.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greet: "おはようございます",
      weather: {
        todayData: undefined,
        spot: "京都",
        spotID: "260000",
        descriptions: [],
        image: "",
      },
    }
  },
  methods: {
    /**
     *
     * @param {String} spotID 気象庁の都道府県を示す6桁ID
     */
    async fetchWeather(spotID) {
      try {
        const rawData = await fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${spotID}.json`
        )
        if (!rawData.ok) {
          throw new Error("Weather API failed.")
        }
        const jsonData = await rawData.json()
        this.weather.todayData = jsonData[0].timeSeries[0]
        this.weather.descriptions = this.weather.todayData.areas.map(
          (value) => ({
            name: value.area.name,
            forcast: value.weathers[0],
            forcastCode: value.weatherCodes[0],
          })
        )
      } catch (error) {
        console.error(error)
        this.weather.descriptions = [{ name: "（不明）", forcast: "（不明）" }]
      }
    },
  },
  created() {
    this.fetchWeather(this.weather.spotID)
  },
}
</script>
