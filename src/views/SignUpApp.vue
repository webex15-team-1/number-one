<template>
  <h1>Let's Sign Up</h1>
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
  <button v-on:click="signUp">新規登録</button>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    signUp() {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(
          //成功時の処理
          alert("登録成功しました"),
          console.log("登録成功しました"),
          (this.email = ""),
          (this.password = "")
        )
        .catch
        //エラー時処理
        ()
    },
  },
}
</script>
