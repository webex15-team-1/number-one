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
    <div class="debug-area" v-if="debug.showInternalData">
      <h3>内部データ</h3>
      <div>現在の設定: {{ now }}</div>
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
              <td>dawnPercent</td>
              <td>0%: dawn ~ 100%: sunrise</td>
              <td>{{ dawnPercent }}</td>
            </tr>
            <tr>
              <td>sunPercentAtRising</td>
              <td>0%: sunrise ~ 100%: sunriseEnd</td>
              <td>{{ sunPercentAtRising }}</td>
            </tr>
            <tr>
              <td>sunPercent</td>
              <td>0%: sunriseEnd ~ 100%: sunsetStart</td>
              <td>{{ sunPercent }}</td>
            </tr>

            <tr>
              <td>sunPercentAtSetting</td>
              <td>0%: sunsetStart ~ 100%: sunset</td>
              <td>{{ sunPercentAtSetting }}</td>
            </tr>
            <tr>
              <td>duskPercent</td>
              <td>0%: sunset ~ 100%: dusk</td>
              <td>{{ duskPercent }}</td>
            </tr>
            <tr>
              <td>sunTheta</td>
              <td>
                単位円上を半径<i>r</i> =
                {{ sunFigure.radius }}の太陽が動くとしたときの太陽の角度 (rad)
              </td>
              <td>{{ sunTheta }}</td>
            </tr>
            <tr>
              <td>dayPhase</td>
              <td>
                nowが一日のどこに当たるか (night | dawn | rising | day | setting
                | dusk)
              </td>
              <td>{{ dayPhase }}</td>
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
        showInternalData: true,
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
     * 天気予報を取得する
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
    /**
     * 月に関するパラメータを更新する
     * @param {Date} now
     */
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
    /**
     * テストデータを設定する
     * month(1~12)はmonthIndex(0~11)に変換してからコンストラクタに渡す
     */
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
    /**
     * this.nowをミリ秒として取得
     */
    nowMilliSecond() {
      return this.now.getTime()
    },
    /**
     * 現在時刻が日中の何パーセントに当たるかを算出
     * 0%   sunriseEnd  太陽の下端が地平線（完全に出たところ）
     * 100% sunsetStart 太陽の下端が地平線（沈み始め）
     */
    sunPercent() {
      const MilliSecondFromSunriseEnd =
        this.nowMilliSecond - this.sun.sunriseEnd.getTime()
      const dayLength =
        this.sun.sunsetStart.getTime() - this.sun.sunriseEnd.getTime()
      return (MilliSecondFromSunriseEnd / dayLength) * 100
    },
    /**
     * 現在時刻が日の出の何パーセントに当たるかを算出
     * 0%   sunrise    太陽の上端が地平線（出始め）
     * 100% sunriseEnd 太陽の下端が地平線（完全に出たところ）
     */
    sunPercentAtRising() {
      const milliSecondFromSunrise =
        this.nowMilliSecond - this.sun.sunrise.getTime()
      const sunriseLength =
        this.sun.sunriseEnd.getTime() - this.sun.sunrise.getTime()
      return (milliSecondFromSunrise / sunriseLength) * 100
    },
    /**
     * 現在時刻が日の入りの何パーセントに当たるかを算出
     * 0%   sunsetStart 太陽の下端が地平線（沈み始め）
     * 100% sunset      太陽の上端が地平線（完全に沈んだところ）
     */
    sunPercentAtSetting() {
      const millisecondFromSunsetStart =
        this.nowMilliSecond - this.sun.sunsetStart.getTime()
      const sunsetLength =
        this.sun.sunset.getTime() - this.sun.sunsetStart.getTime()
      return (millisecondFromSunsetStart / sunsetLength) * 100
    },
    /**
     * 現在時刻が夜明けの何パーセントに当たるかを算出
     * 0%   dawn    夜明け開始
     * 100% sunrise 夜明け終了/太陽の上端が地平線（出始め）
     */
    dawnPercent() {
      const millisecondFromDawnStart =
        this.nowMilliSecond - this.sun.dawn.getTime()
      const dawnLength = this.sun.sunrise.getTime() - this.sun.dawn.getTime()
      return (millisecondFromDawnStart / dawnLength) * 100
    },
    /**
     * 現在時刻が薄暮の何パーセントに当たるかを算出
     * 0%   太陽の上端が地平線（完全に沈んだところ）/薄暮開始
     * 100% 薄暮終了
     */
    duskPercent() {
      const millisecondFromDuskStart =
        this.nowMilliSecond - this.sun.sunset.getTime()
      const duskLength = this.sun.dusk.getTime() - this.sun.sunset.getTime()
      return (millisecondFromDuskStart / duskLength) * 100
    },
    /**
     * 現在時刻が月の何パーセントに当たるかを算出
     * 0%   rise
     * 100% set
     */
    moonPercent() {
      const millisecondFromMoonRise =
        this.nowMilliSecond - this.moon.rise.getTime()
      const moonLength = this.moon.set.getTime() - this.moon.rise.getTime()
      return (millisecondFromMoonRise / moonLength) * 100
    },
    /**
     * 太陽の半径の逆サイン
     * 日の出・日の入りの際太陽の位置を調節するのに使う
     */
    arcsineOfRadius() {
      return Math.asin(this.sunFigure.radius)
    },
    /**
     * 太陽の位置θ [rad]
     * 単位円を南向きに立っているときの空とみて、
     * (x, y) = (-1, 0)を日の出の位置
     * (x, y) = ( 0, 1)を南中
     * (x, y) = ( 1, 0)を日の入りの位置、
     * x軸を地平線とする。
     * また、太陽の半径をthis.sunFigure.radiusとする。
     * このときの太陽の位置をラジアン単位で算出する。
     * 動きのイメージは太陽の位置の算出方法.pptxにまとめた。
     *
     * それぞれのif節は以下の時間ごとの処理に相当する。
     * 日の出の処理
     *    sunriseのとき円の上側がx軸に触れる。
     *    その後sunPercentAtRisingにしたがって上昇し、
     *    sunriseEndのとき縁の下側がx軸に触れる。
     * 日中の処理
     *    sunriseEndを起点、 sunsetStartを終点とし、
     *    sunPercentにしたがって移動する。
     * 日の入りの処理
     *    sunsetStartのとき円の下側がx軸に触れる。
     *    その後sunPercentAtSettingにしたがって下降し、
     *    sunsetのとき円の上側がx軸に触れる。
     * 夜間の処理
     *    夜間は一律-pi/2（地平線の真下）としている。
     */
    sunTheta() {
      if (0 <= this.sunPercentAtRising && this.sunPercentAtRising <= 100) {
        //日の出
        return (
          Math.PI +
          this.arcsineOfRadius -
          2 * this.arcsineOfRadius * (this.sunPercentAtRising / 100)
        )
      } else if (0 <= this.sunPercent && this.sunPercent <= 100) {
        // 日中
        return (
          Math.PI -
          this.arcsineOfRadius +
          (2 * this.arcsineOfRadius - Math.PI) * (this.sunPercent / 100)
        )
      } else if (
        // 日の入り
        0 <= this.sunPercentAtSetting &&
        this.sunPercentAtSetting <= 100
      ) {
        return (
          this.arcsineOfRadius -
          2 * this.arcsineOfRadius * (this.sunPercentAtSetting / 100)
        )
      } else {
        // 夜間または無効な値
        return -Math.PI / 2
      }
    },
    /**
     * 現在時刻が一日のどの段階に当たるかを文字列で返す
     */
    dayPhase() {
      if (this.now < this.sun.dawn) {
        return "night" //夜
      } else if (this.now < this.sun.sunrise) {
        return "dawn" //夜明け
      } else if (this.now < this.sun.sunriseEnd) {
        return "rising" //日の出
      } else if (this.now < this.sun.sunsetStart) {
        return "day" //日中
      } else if (this.now < this.sun.sunset) {
        return "setting" //日の入り
      } else if (this.now < this.sun.dusk) {
        return "dusk" //薄暮
      } else {
        return "night" //夜
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
