<template>
  <div class="rank-container">
    <h2>ランキング</h2>
    <h3 v-for="(name, index) in ranking" :key="index">
      {{ index + 1 }}位 {{ name }}
    </h3>
  </div>
</template>
<script>
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
export default {
  data() {
    return {
      ranking: [],
      totalPoints: [],
    }
  },
  async mounted() {
    const q = query(collection(db, "users"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const getupPoints =
        typeof data.getupPoints === "undefined" ? 0 : data.getupPoints
      const timePoints =
        typeof data.timePoints === "undefined" ? 0 : data.timePoints
      this.totalPoints.push({
        nickname: data.nickname,
        points: getupPoints + timePoints,
      })
    })
    this.totalPoints.sort((a, b) => {
      return b.points - a.points
    })
    this.ranking = this.totalPoints.map((value) => value.nickname).slice(0, 3)
  },
}
</script>
<style lang=""></style>
