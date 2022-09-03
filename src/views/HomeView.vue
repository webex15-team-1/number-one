<template>
  <ChangeableHeader />
  <div class="home">
    <router-link to="/login">ログインへ</router-link>
    <br />
    <router-link to="/register">新規登録へ</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import ChangeableHeader from "@/components/ChangeableHeader.vue"
export default {
  components: { ChangeableHeader },
}
</script>

<style></style>
