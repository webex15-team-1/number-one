<template>
  <div class="home">
    <router-link to="/login">ログインへ</router-link>
    <br />
    <router-link to="/register">新規登録へ</router-link>
  </div>
  <Hamburger />
</template>

<script>
// @ is an alias to /src
import Hamburger from "@/components/HamburgerMenu.vue"
export default {
  components: {
    Hamburger,
  },
}
</script>

<style>
.hamburger-container {
  position: absolute;
  right: 5vw;
  border: 1px solid black;
}
</style>
