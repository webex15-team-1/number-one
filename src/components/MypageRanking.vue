<template>
  <div class="rank-container">
    <h2>ランキング</h2>
    <div class="names">
      <h3 v-for="(name, index) in ranking" :key="index">
        {{ index + 1 }}位 {{ name }}
      </h3>
    </div>
  </div>
</template>
<script>
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
export default {
  data() {
    return {
      ranking: [],
      totalPoints: [],
      unsubscribeUsers: null,
    }
  },
  async mounted() {
    // firebaseからデータを取得
    const q = query(collection(db, "users"))
    this.unsubscribeUsers = onSnapshot(q, (querySnapshot) => {
      // ランキングをリセット
      this.totalPoints = []
      this.ranking = []
      //合計点を算出 ただし未定義の得点は0点とみなす
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
      // 上位3人の名前を取り出す
      this.totalPoints.sort((a, b) => {
        return b.points - a.points
      })
      this.ranking = this.totalPoints.map((value) => value.nickname).slice(0, 3)
    })
  },
  unmounted() {
    this.unsubscribeUsers()
    this.unsubscribeUsers = null
  },
}
</script>
<style scoped>
.rank-container {
  display: inline-block;
  width: auto;
  background: #022340;
  border-radius: 24px;
}
.names {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
h2,
h3 {
  color: #ffffff;
}
</style>
