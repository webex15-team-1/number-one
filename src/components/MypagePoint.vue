<template>
  <div class="point-container">
    <h2>累計朝活ポイント {{ cumulativePoints }}P</h2>
    <h3>平均気象誤差: {{ averageWakeUpDiff }}</h3>
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
      cumulativePoints: 0,
      averageWakeUpDiff: 0,
      averageAsakatsuTime: 0,
    }
  },
  async mounted() {
    const docRef = doc(collection(db, "users"), this.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log("Data of user " + this.uid + ": " + data)
      this.cumulativePoints = data.cumulativePoints
      this.averageWakeUpDiff = data.averageWakeUpDiff
      this.averageAsakatsuTime = data.averageAsakatsuTime
    } else {
      console.log("User " + this.uid + " not found.")
    }
  },
}
</script>
<style></style>
