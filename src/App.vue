<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/toppage">Top</router-link>
  </nav>
  <ChangeableHeader />
  <router-view />
  <ChangeableFooter />
</template>
<script>
import ChangeableHeader from "./components/ChangeableHeader.vue"
import ChangeableFooter from "./components/ChangeableFooter.vue"

export default {
  components: {
    ChangeableHeader,
    ChangeableFooter,
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
