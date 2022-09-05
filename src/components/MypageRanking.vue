<template>
  <div class="rank-container">
    <h2>ランキング</h2>
    <h3 v-for="(name, index) in ranking" :key="index">
      {{ index }}位 {{ name }}
    </h3>
  </div>
</template>
<script>
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
export default {
  data() {
    return {
      ranking: [],
    }
  },
  async mounted() {
    const q = query(
      collection(db, "users"),
      orderBy("points", "desc"),
      limit(3)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      this.ranking.push(doc.data().name)
    })
    for (let i = 0; i < 3 - this.ranking.length; i++) {
      this.ranking.push("")
    }
  },
}
</script>
<style lang=""></style>
