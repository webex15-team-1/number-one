<template>
  <h1>ログイン成功！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"

export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          alert("ログアウトしました")
          this.$router.push("/login")
        })
        .catch(() => {
          // An error happened.
          alert("ログアウトできませんでした")
        })
    },
  },
}
</script>
