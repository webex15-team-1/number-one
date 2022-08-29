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
    <button v-on:click="googleLogin">googleでログイン</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth"

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          //成功時の処理
          alert("ログイン成功しました")
          this.$router.push("/mypage")
        })
        .catch(() => {
          //エラー時処理
          alert("ログインできませんでした")
        })
    },
    googleLogin() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
    },
  },
}
</script>
