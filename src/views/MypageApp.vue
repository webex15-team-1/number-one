<template>
  <h1>{{ name }}さん！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"

export default {
  data() {
    return {
      auth: getAuth(),
      name: "",
    }
  },
  methods: {
    logout() {
      signOut(this.auth)
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
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.name = this.auth.currentUser.displayName
      } else {
        this.$router.push("/login")
      }
    })
  },
}
</script>
