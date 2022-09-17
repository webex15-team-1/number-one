<template>
  <div class="rank-container">
    <div class="rank-title">ランキング</div>
    <div class="names">
      <div v-for="(name, index) in ranking" :key="index">
        {{ index + 1 }}位 {{ name }}
      </div>
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
  width: 100%;
  background: #022340;
  border-radius: 24px;
  border: 3px solid #022340;
  height: 100%;
  box-sizing: border-box;
}
.names {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.rank-title {
  color: #ffffff;
  font-size: 1.5em;
}
.names {
  color: #ffffff;
  font-size: 1em;
}
</style>
