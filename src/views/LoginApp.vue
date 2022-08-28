<template>
  <h1>Let's Login</h1>
  <table>
    <tr>
      <th>メールアドレス：</th>
    </tr>
    <tr>
      <td><input type="email" v-model="email" /></td>
    </tr>
    <tr>
      <th>パスワード：</th>
    </tr>
    <tr>
      <td><input type="password" v-model="password" /></td>
    </tr>
  </table>
  <button v-on:click="login">ログインする</button>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

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
        .then(
          //成功時の処理
          alert("ログイン成功しました")
        )
        .catch
        //エラー時処理
        ()
    },
  },
}
</script>
