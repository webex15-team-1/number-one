<template>
  <h3>ようこそ。表示名を登録してください。</h3>
  <div>
    <input type="text" v-model="name" />
  </div>
  <div>
    <button v-on:click="nameRegister">登録</button>
  </div>
</template>

<script>
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth"

export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    nameRegister() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        displayName: this.name,
      })
        .then(() => {
          alert("登録しました！")
          this.name = ""
          this.$router.push("/top")
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
          this.$router.push("/top")
        }
        // ログイン時
        else {
          // ログイン済みのユーザー情報があるかをチェック
          var userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
          if (!userDoc.exists) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await userDoc.ref.set({
              screen_name: user.uid,
              display_name: "名無しさん",
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
          }
        }
      })
    },
  },
}
</script>
