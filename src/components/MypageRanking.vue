<template>
  <div class="rank-container">
    <div class="rank-title">ランキング</div>
    <table class="names">
      <tr v-for="(name, index) in ranking" :key="index">
        <td>{{ index + 1 }}位</td>
        <td>{{ name }}</td>
      </tr>
    </table>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  text-align: center;
  justify-content: space-between;
  height: 60%;
  margin: 0 auto;
}
.names > tr:last-child {
  margin-bottom: 1em;
}
.names td:first-child {
  width: 3em;
  text-align: left;
  color: inherit;
}
.rank-title {
  margin-top: 0.5em;
  margin-bottom: 0.2em;
  color: #ffffff;
  font-size: 2.5em;
}
.names {
  color: #ffffff;
  font-size: 1em;
}
</style>
