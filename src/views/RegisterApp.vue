<template>
  <h1>Let's Register your account</h1>
  <div>
    <label>メールアドレス：</label>
    <input type="email" v-model="email" />
  </div>

  <div>
    <label>パスワード：</label>
    <input type="password" v-model="password" />
  </div>
  <div>
    <button v-on:click="signUp">新規登録</button>
  </div>
  <div>
    <button v-on:click="google">Googleで登録</button>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

export default {
  data() {
    return {
      email: "",
      password: "",
      auth: getAuth(),
    }
  },
  methods: {
    signUp() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          //成功時の処理
          alert("登録成功しました")
          this.email = ""
          this.password = ""
          this.$router.push("/name-register")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    google() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(this.auth, provider)
        .then(() => {
          //成功時の処理
          alert("登録成功しました")
          this.$router.push("/name-register")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
  },
}
</script>
