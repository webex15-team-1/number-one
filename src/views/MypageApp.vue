<template>
  <h1>{{ nickname }}さん！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
  <MypagePoint :uid="uid" />
  <MypageRanking />
  <MypageTweet :uid="uid" />
  <MypageSettings :uid="uid" />
</template>

<script>
import { doc, getDoc } from "firebase/firestore"
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
        const data = docSnap.data()
        this.nickname = data.nickname
      } else {
        // ログアウト時
        this.$router.push("/top")
      }
    })
  },
  components: { MypagePoint, MypageRanking, MypageTweet, MypageSettings },
}
</script>
<style>
* {
  font-family: "Zen Maru Gothic";
}
</style>
