<template>
  <h3>ようこそ。表示名を登録してください。</h3>
  <div>
    <input type="text" v-model="name" />
  </div>
  <div>
    <button v-on:click="two">登録</button>
  </div>
</template>

<script>
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    two() {
      this.nameRegister()
      this.createFirestore()
    },
    nameRegister() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        displayName: this.name,
      })
        .then(() => {
          alert("登録しました！")
          this.name = ""
          this.$router.push("/mypage")
        })
        .catch(() => {
          alert("Error!")
        })
    },

    createFirestore() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        // 未ログイン時
        if (!user) {
          // topに飛ばしてログインさせる
          this.$router.push("/toppage")
        }
        // ログイン時
        else {
          const uid = user.uid
          // ログイン済みのユーザー情報があるかをチェック
          //usersコレクションで確認している
          const userDoc = await getDocs(collection(db, "users"))
          if (!userDoc.exists) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await setDoc(doc(db, "users", uid), {
              //usersコレクションにユーザーID名のドキュメントを作る
              userId: uid,
              nickname: this.name,
            })
          }
        }
      })
    },
  },
}
</script>
