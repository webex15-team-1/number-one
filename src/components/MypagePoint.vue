<template>
  <div class="point-container">
    <h2>累計朝活ポイント {{ points }}P</h2>
    <h3>平均起床誤差: {{ averageWakeUpDiff }}</h3>
    <h3>平均朝活時間: {{ averageAsakatsuTime }}</h3>
  </div>
</template>
<script>
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
export default {
  props: {
    uid: String,
  },
  data() {
    return {
      points: 0,
      averageWakeUpDiffSec: 0,
      averageAsakatsuTimeSec: 0,
    }
  },
  async mounted() {
    console.log("MypagePoint: " + this.uid)
    const docRef = doc(collection(db, "users"), this.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log("Data of user " + this.uid + ": " + data)
      this.points = data.points
      this.averageWakeUpDiffSec = data.averageWakeUpDiffSec
      this.averageAsakatsuTimeSec = data.averageAsakatsuTimeSec
    } else {
      console.log("User " + this.uid + " not found.")
    }
  },
  computed: {
    averageWakeUpDiff() {
      return this.secondToText(this.averageWakeUpDiffSec)
    },
    averageAsakatsuTime() {
      return this.secondToText(this.averageAsakatsuTimeSec)
    },
  },
  methods: {
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
}
</script>
<style>
.point-container {
  display: inline-block;
  border: 3px solid #048abf;
  border-radius: 25px;
}
</style>
