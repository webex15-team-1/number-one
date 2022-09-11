<template>
  <div class="point-container">
    <h2>累計朝活ポイント {{ points }}P</h2>
    <h3>平均起床誤差: {{ averageGetupDiff }}</h3>
    <h3>平均朝活時間: {{ averageAsakatsuTime }}</h3>
  </div>
</template>
<script>
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
export default {
  props: {
    uid: String,
  },
  data() {
    return {
      points: 0,
      avgGetupDiffSec: 0,
      avgAsakatsuTimeSec: 0,
      unsubscribeUser: null,
    }
  },
  computed: {
    // 平均起床誤差
    averageGetupDiff() {
      return this.secondToText(this.avgGetupDiffSec)
    },
    // 平均朝活時間
    averageAsakatsuTime() {
      return this.secondToText(this.avgAsakatsuTimeSec)
    },
  },
  methods: {
    // 秒を時分秒に変換する
    secondToText(rawData) {
      const hours = Math.floor(rawData / 3600)
      const minutes = Math.floor((rawData - hours * 3600) / 60)
      const seconds = rawData - hours * 3600 - minutes * 60
      return (
        (hours > 10 ? `${hours}時間 ` : ` ${hours}時間`) +
        (minutes > 10 ? `${minutes}分 ` : ` ${minutes}分 `) +
        (seconds > 10 ? `${seconds}秒` : ` ${seconds}秒`)
      )
    },
  },
  watch: {
    // uidが変更されるとポイント, 起床時間, 朝活時間のデータを取りにいく
    uid: async function () {
      console.log("MypagePoint: " + this.uid)
      // userのデータをとってくる
      const docRef = doc(collection(db, "users"), this.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.unsubscribeUser = onSnapshot(docRef, (doc) => {
          const data = doc.data()
          // ポイントを合計する
          this.points = data.getupPoints + data.timePoints
          // 起床誤差の平均をとる(秒)
          const sumGetupDiffSec =
            data.kisyo
              .map((value) => Number(value.getupDiff))
              .reduce((prev, current) => prev + current) * 60
          this.avgGetupDiffSec = sumGetupDiffSec / data.kisyo.length
          // 朝活時間の平均をとる(秒)
          const sumAsakatsuTimeSec =
            data.asakaysu
              .map((value) => Number(value.time))
              .reduce((prev, current) => prev + current) * 60
          this.avgAsakatsuTimeSec = sumAsakatsuTimeSec / data.asakaysu.length
        })
      } else {
        console.error("User " + this.uid + " not found.")
      }
    },
  },
  unmounted() {
    this.unsubscribeUser()
    this.unsubscribeUser = null
  },
}
</script>
<style>
.point-container {
  display: inline-block;
  border: 3px solid #048abf;
  border-radius: 25px;
}
</style>
