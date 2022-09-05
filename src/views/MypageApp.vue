<template>
  <h1>{{ name }}さん！マイページへようこそ🎉</h1>
  <button @click="logout">ログアウト</button>
  <MypagePoint :uid="uid" />
  <MypageRanking />
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import MypagePoint from "@/components/MypagePoint.vue"
import MypageRanking from "@/components/MypageRanking.vue"

export default {
  data() {
    return {
      auth: getAuth(),
      name: "",
      uid: "",
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
        this.uid = this.auth.currentUser.uid
      } else {
        this.$router.push("/login")
      }
    })
  },
  components: { MypagePoint, MypageRanking },
}
</script>
