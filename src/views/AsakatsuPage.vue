<template>
  <div class="asakatsu">
    <h1>朝活を始めよう！</h1>
    <div class="times">
      <div class="timer">
        {{ hour }}:{{ min10 }}{{ min1 }}:{{ sec10 }}{{ sec1 }}
      </div>
      <div class="minicircle"></div>
      <div v-bind:class="circle"></div>
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
      circle: "circle",
    }
  },
  methods: {
    start: function () {
      this.circle = "circle start"
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
      this.circle = "circle start stop"
    },
    again: function () {
      this.hour = 0
      this.min10 = 0
      this.min1 = 0
      this.sec10 = 0
      this.sec1 = 0
      this.before = true
      this.after = false
      this.circle = "circle"
    },
  },
}
</script>

<style>
.times {
  position: relative;
  z-index: -1;
  width: 100%;
  height: 30vw;
  margin-bottom: 5%;
}
.timer {
  font-size: 500%;
  width: 50%;
  line-height: 30vw;
  position: absolute;
  z-index: 100;
  margin-left: 25%;
}
.minicircle {
  position: absolute;
  z-index: 3;
  width: 20%;
  height: 20vw;
  margin-left: 40%;
  margin-top: 5vw;
  border-radius: 50%;
  background: white;
}
.circle {
  position: absolute;
  z-index: 1;
  width: 30%;
  height: 30vw;
  margin-left: 35%;
  border-radius: 50%;
  background: white;
}
.start {
  background-image: linear-gradient(
    to right,
    transparent 50%,
    rgb(118, 246, 118) 0
  );
}
.start::before {
  z-index: 2;
  content: "";
  display: block;
  margin-left: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: white;
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
.stop::before {
  animation-play-state: paused;
}
</style>
