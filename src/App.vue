<template>
  <nav>
    <ChangeableHeader />
    <HamburgerMenu />
  </nav>

  <router-view />
  <ChangeableFooter />
</template>
<script>
import ChangeableHeader from "./components/ChangeableHeader.vue"
import ChangeableFooter from "./components/ChangeableFooter.vue"
import HamburgerMenu from "./components/HamburgerMenu.vue"

export default {
  components: {
    ChangeableHeader,
    ChangeableFooter,
    HamburgerMenu,
  },
}
</script>
<style>
#app {
  font-family: "Ubuntu", sans-serif;
  font-family: "Zen Maru Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #022340;
}

nav {
  height: 5em;
  padding: 1em 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
