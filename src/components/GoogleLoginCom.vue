<template>
  <button v-on:click="googleLogin">googleでログイン</button>
</template>

<script>
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"

export default {
  data() {
    return {}
  },
  methods: {
    googleLogin() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
    },
  },
}
</script>
