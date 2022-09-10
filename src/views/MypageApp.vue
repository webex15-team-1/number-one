<template>
  <h1>{{ name }}さん！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      auth: getAuth(),
      name: "",
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
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      // 未ログイン時
      if (!user) {
        // topに飛ばしてログインさせる
        this.$router.push("/top")
      }
      // ログイン時
      else {
        const uid = user.uid
        // ログイン済みのユーザー情報があるかをチェック
        //usersコレクションで確認している
        const docRef = doc(db, "users", uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          const data = userDoc.data()
          console.log(`${data.nickname}さんがログインしました`)
          this.name = data.nickname
        }
      }
    })
  },
}
</script>
