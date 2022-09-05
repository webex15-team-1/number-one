<template>
  <div class="loading">
    <Icon class="loadingSun" icon="bi:sun-fill" color="white" width="10%" />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue"
export default {
  components: {
    Icon,
  },
}
</script>

<style>
.loading {
  background-color: #f2c48d;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadingSun {
  animation: rotate 4s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
