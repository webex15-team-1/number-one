<template>
  <h3>ようこそ。表示名を登録してください。</h3>
  <div>
    <input type="text" v-model="name" />
  </div>
  <div>
    <button v-on:click="nameRegister">登録</button>
  </div>
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth"

export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    nameRegister() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        displayName: this.name,
      })
        .then(() => {
          alert("登録しました！")
          this.name = ""
          this.$router.push("/login")
        })
        .catch(() => {
          alert("Error!")
        })
    },
    createFirestore() {},
  },
}
</script>
