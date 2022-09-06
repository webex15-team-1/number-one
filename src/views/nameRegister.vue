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
import { doc, setDoc, getDocs } from "firebase/firestore"
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
      this.createDocument()
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
    test() {
      setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      })
    },
    createDocument() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        // 未ログイン時
        if (!user) {
          // topに飛ばしてログインさせる
          this.$router.push("/toppage")
        }
        // ログイン時
        else {
          //const uid = user.uid
          // ログイン済みのユーザー情報があるかをチェック
          //usersコレクションにuidの名前のドキュメントがあるか確認している
          const docRef = doc(db, "users", "test")
          const userDoc = await getDocs(docRef)
          if (!userDoc.exists) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await setDoc(docRef, {
              nickname: "テストです",
            })
          }
        }
      })
    },
  },
}
</script>
