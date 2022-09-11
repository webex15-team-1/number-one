<template>
  <!-- <h1>{{ nickname }}さん！マイページへようこそ🎉</h1> -->
  <button @click="logout">ログアウト</button>
  <!-- 累計ポイントと平均時間の表示 -->
  <MypagePoint :uid="uid" />
  <!-- ランキング -->
  <MypageRanking />
  <!-- ツイートの表示と送信 -->
  <MypageTweet :uid="uid" />
  <!-- プロフィールの更新 -->
  <MypageSettings :uid="uid" />
</template>

<script>
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import MypagePoint from "@/components/MypagePoint.vue"
import MypageRanking from "@/components/MypageRanking.vue"
import MypageTweet from "@/components/MypageTweet.vue"
import MypageSettings from "@/components/MypageSettings.vue"


export default {
  data() {
    return {
      auth: getAuth(),
      nickname: "",
      uid: "",
      unsubscribeUser: null,
    }
  },
  methods: {
    logout() {
      signOut(this.auth)
        .then(() => {
          // Sign-out successful.
          alert("ログアウトしました")
          //this.$router.push("/home")
        })
        .catch(() => {
          // An error happened.
          alert("Error!")
        })
    },
  },
  mounted() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // ログイン時, ニックネームをfirestoreから取り出す
        this.uid = this.auth.currentUser.uid
        const docRef = doc(db, "users", this.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.unsubscribeUser = onSnapshot(docRef, (doc) => {
            this.nickname = doc.get("nickname")
          })
        }
      } else {
        // ログアウト時
        this.$router.push("/top")
      }
    }
  },
  unmounted() {
    this.unsubscribeUser()
    this.unsubscribeUser = null
  },
  components: { MypagePoint, MypageRanking, MypageTweet, MypageSettings },
}
</script>
<style>
* {
  font-family: "Zen Maru Gothic";
}
</style>
