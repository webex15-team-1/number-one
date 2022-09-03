<template>
  <h1>Let's Login</h1>
  <div>
    <label>メールアドレス：</label>
    <input type="email" v-model="email" />
  </div>

  <div>
    <label>パスワード：</label>
    <input type="password" v-model="password" />
  </div>
  <button v-on:click="login">ログインする</button>

  <br />
  <div>
    <button v-on:click="googleLogin">Googleでログイン</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
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
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          //成功時の処理
          const name = this.auth.currentUser.displayName
          alert(`ようこそ${name}さん`)
          this.$router.push("/mypage")
        })

        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    googleLogin() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(this.auth, provider)
        .then(() => {
          //成功時の処理
          const name = this.auth.currentUser.displayName
          alert(`ようこそ${name}さん`)
          this.$router.push("/mypage")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
  },
}
</script>
