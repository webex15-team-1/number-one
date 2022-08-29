<template>
  <div class="asakatsu">
    <h1>朝活を始めよう！</h1>
    <div class="circle"></div>
    <div class="timer">
      {{ hour }}:{{ min10 }}{{ min1 }}:{{ sec10 }}{{ sec1 }}
    </div>
    <button v-on:click="start" v-if="before">開始！</button>
    <button v-on:click="stop" v-if="!before && !after">終了！</button>
    <button v-on:click="again" v-if="after">もう一度</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: 0,
      min10: 0,
      min1: 0,
      sec10: 0,
      sec1: 0,
      before: true,
      after: false,
      timer: "",
      degree: 100,
    }
  },
  methods: {
    start: function () {
      this.before = false
      this.timer = setInterval(() => {
        this.sec1 += 1
        this.degree += 360 * (1 / 60)
        if (this.sec1 === 10) {
          this.sec10 += 1
          this.sec1 = 0
          if (this.sec10 === 6) {
            this.min1 += 1
            this.sec10 = 0
            if (this.min1 === 10) {
              this.min10 += 1
              this.min1 = 0
              if (this.min10 === 6) {
                this.hour += 1
                this.min10 = 0
              }
            }
          }
        }
      }, 1000)
    },
    stop: function () {
      clearInterval(this.timer)
      this.after = true
    },
    again: function () {
      this.hour = 0
      this.min10 = 0
      this.min1 = 0
      this.sec10 = 0
      this.sec1 = 0
      this.before = true
      this.after = false
    },
  },
}
</script>

<style>
.timer {
  font-size: 1000%;
}
.circle {
  margin: 0 auto;
  width: 80vh;
  height: 80vh;
  border-radius: 50%;
  background: white;
  background-image: linear-gradient(
    to right,
    transparent 50%,
    rgb(118, 246, 118) 0
  );
}
.circle::before {
  content: "";
  display: block;
  margin-left: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 30s linear infinite, color 60s step-end infinite;
}
@keyframes spin {
  to {
    transform: rotate(0.5turn);
  }
}
@keyframes color {
  50% {
    background-color: rgb(118, 246, 118);
  }
}
</style>
