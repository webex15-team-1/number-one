<template>
  <div class="container">
    <div class="greet">{{ greet }}、{{ user.nickName }}さん</div>
    <div class="weather">
      <div
        class="weather-message"
        v-for="(desc, index) in weather.descriptions"
        :key="index"
      >
        今日の{{ desc.name }}の天気は{{ desc.forecast }}です。
      </div>
      <img id="weather-img" :src="weather.image" alt="" />
    </div>
    <h3>内部データ</h3>
    <div class="debug-area">
      <input type="text" v-model="debug.input.year" style="width: 5em" /><span
        >年</span
      >
      <input type="text" v-model="debug.input.month" style="width: 2em" /><span
        >月</span
      >
      <input type="text" v-model="debug.input.day" style="width: 2em" /><span
        >日</span
      >
      <input type="text" v-model="debug.input.hours" style="width: 2em" /><span
        >時</span
      >
      <input
        type="text"
        v-model="debug.input.minutes"
        style="width: 2em"
      /><span>分</span>
      <input
        type="text"
        v-model="debug.input.seconds"
        style="width: 2em"
      /><span>秒</span>
      <button @click="setTestDate">この時刻でテストする</button>

      <div class="internal-data">
        <table class="computed-data">
          <thead>
            <th colspan="3">computed パラメータ</th>
          </thead>
          <tbody>
            <tr>
              <td>sunPercentAtRising</td>
              <td>0%: sunrise ~ 100%: sunriseEnd</td>
              <td>{{ sunPercentAtRising }}</td>
            </tr>
            <tr>
              <td>sunPercent</td>
              <td>0%: sunriseEnd ~ 50%: 南中 ~ 100%: sunsetStart</td>
              <td>{{ sunPercent }}</td>
            </tr>

            <tr>
              <td>sunPercentAtSetting</td>
              <td>0%: sunsetStart ~ 100%: sunset</td>
              <td>{{ sunPercentAtSetting }}</td>
            </tr>
            <tr>
              <td>sunTheta</td>
              <td>
                単位円上を半径<i>radius</i>の太陽が動くとしたときの太陽の角度と状態
              </td>
              <td>{{ sunTheta.theta }} ({{ sunTheta.phase }})</td>
            </tr>
            <tr>
              <td>moonPercent</td>
              <td>0%: rise ~ 100%: set</td>
              <td>{{ moonPercent }}</td>
            </tr>
          </tbody>
        </table>
        <table class="sun-data">
          <thead>
            <th colspan="2">太陽に関するパラメータ</th>
          </thead>
          <tbody>
            <tr v-for="(value, key) in sun" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
        <table class="moon-data">
          <thead>
            <th colspan="2">月に関するパラメータ</th>
          </thead>
          <tbody>
            <tr v-for="(value, key) in moon" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SunCalc from "suncalc"
export default {
  data() {
    return {
      debug: {
        input: {
          year: "2022",
          month: "8",
          day: "28",
          hours: "13",
          minutes: "56",
          seconds: "0",
        },
      },
      greet: "おはようございます",
      now: new Date(Date.now()),
      user: {
        latitude: 35.03072421401453,
        longitude: 135.78485329143817,
        nickName: "♰朝活マスター♰",
      },
      weather: {
        todayData: undefined,
        spot: "京都",
        spotID: "260000",
        descriptions: [],
        image: "",
      },
      sun: {},
      moon: {},
      sunFigure: {
        radius: 0.1,
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
            forecast: value.weathers[0],
            forecastCode: value.weatherCodes[0],
          })
        )
      } catch (error) {
        console.error(error)
        this.weather.descriptions = [{ name: "（不明）", forecast: "（不明）" }]
      }
    },
    /**
     * 太陽に関するパラメータを更新する
     * @param {Date} now 現在時刻
     */
    updateSunData(now) {
      // const now = new Date(Date.now())
      const {
        sunrise,
        sunriseEnd,
        solarNoon,
        sunsetStart,
        sunset,
        dusk,
        nauticalDusk,
        night,
        nadir,
        nightEnd,
        nauticalDawn,
        dawn,
      } = SunCalc.getTimes(now, this.user.latitude, this.user.longitude)
      const { altitude, azimuth } = SunCalc.getPosition(
        now,
        this.user.latitude,
        this.user.longitude
      )
      this.sun = {
        sunrise,
        sunriseEnd,
        solarNoon,
        sunsetStart,
        sunset,
        dusk,
        nauticalDusk,
        night,
        nadir,
        nightEnd,
        nauticalDawn,
        dawn,
        altitude,
        azimuth,
      }
    },
    updateMoonData(now) {
      const { altitude, azimuth } = SunCalc.getMoonPosition(
        now,
        this.user.latitude,
        this.user.longitude
      )
      const { phase } = SunCalc.getMoonIllumination(now)
      const { rise, set } = SunCalc.getMoonTimes(
        now,
        this.user.latitude,
        this.user.longitude
      )
      this.moon = { altitude, azimuth, phase, rise, set }
    },
    setTestDate() {
      this.now = new Date(
        this.debug.input.year,
        this.debug.input.month - 1,
        this.debug.input.day,
        this.debug.input.hours,
        this.debug.input.minutes,
        this.debug.input.seconds
      )
      this.updateSunData(this.now)
      this.updateMoonData(this.now)
    },
  },
  created() {
    this.fetchWeather(this.weather.spotID)
    this.updateSunData(this.now)
    this.updateMoonData(this.now)
  },
  computed: {
    sunPercent() {
      const nowMilliSecond = this.now.getTime()
      const MilliSecondFromSunriseEnd =
        nowMilliSecond - this.sun.sunriseEnd.getTime()
      const dayLength =
        this.sun.sunsetStart.getTime() - this.sun.sunriseEnd.getTime()
      return (MilliSecondFromSunriseEnd / dayLength) * 100
    },
    sunPercentAtRising() {
      const nowMilliSecond = this.now.getTime()
      const milliSecondFromSunrise = nowMilliSecond - this.sun.sunrise.getTime()
      const sunriseLength =
        this.sun.sunriseEnd.getTime() - this.sun.sunrise.getTime()
      return (milliSecondFromSunrise / sunriseLength) * 100
    },
    sunPercentAtSetting() {
      const nowMilliSecond = this.now.getTime()
      const millisecondFromSunsetStart =
        nowMilliSecond - this.sun.sunsetStart.getTime()
      const sunsetLength =
        this.sun.sunset.getTime() - this.sun.sunsetStart.getTime()
      return (millisecondFromSunsetStart / sunsetLength) * 100
    },
    moonPercent() {
      const nowMilliSecond = this.now.getTime()
      const millisecondFromMoonRise = nowMilliSecond - this.moon.rise.getTime()
      const moonLength = this.moon.set.getTime() - this.moon.rise.getTime()
      return (millisecondFromMoonRise / moonLength) * 100
    },
    arcsineOfRadius() {
      return Math.asin(this.sunFigure.radius)
    },
    sunTheta() {
      if (0 <= this.sunPercentAtRising && this.sunPercentAtRising <= 100) {
        return {
          phase: "rising",
          theta:
            Math.PI +
            this.arcsineOfRadius -
            2 * this.arcsineOfRadius * (this.sunPercentAtRising / 100),
        }
      } else if (0 <= this.sunPercent && this.sunPercent <= 100) {
        return {
          phase: "day",
          theta:
            Math.PI -
            this.arcsineOfRadius +
            (2 * this.arcsineOfRadius - Math.PI) * (this.sunPercent / 100),
        }
      } else if (
        0 <= this.sunPercentAtSetting &&
        this.sunPercentAtSetting <= 100
      ) {
        return {
          phase: "setting",
          theta:
            this.arcsineOfRadius -
            2 * this.arcsineOfRadius * (this.sunPercentAtSetting / 100),
        }
      } else {
        return { phase: "night", theta: -Math.PI / 2 }
      }
    },
  },
}
</script>

<style scoped>
.internal-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.sun-data {
  display: inline-block;
}
.moon-data {
  display: inline-block;
}
th {
  padding: 0.5em;
  border-bottom: 2px solid;
}
td {
  padding: 0.5em;
  border-bottom: 1px solid;
}
</style>
