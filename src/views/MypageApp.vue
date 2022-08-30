<template>
  <h1>ログイン成功！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"

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
          //this.$router.push("/home")
        })
        .catch(() => {
          // An error happened.
          alert("Error!")
        })
    },
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("ようこそ！")
      } else {
        this.$router.push("/login")
      }
    })
  },
}
</script>
