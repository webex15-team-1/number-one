<template>
  <div class="logout-msg">
    ログアウトしました。５秒後に<a href="/top">トップページ</a>へ戻ります。
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth"
export default {
  created() {
    this.auth = getAuth()
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        setTimeout(
          function () {
            this.$router.push("/top")
          }.bind(this),
          5000
        )
        //this.$router.push("/home")
      })
      .catch(() => {
        // An error happened.
        alert("Error!")
      })
    this.$store.commit("updateColorSet", { colorIndex: 0 })
  },
}
</script>
<style></style>
