<template>
  <h3 id="time-setup-prompt">
    <slot />
  </h3>
  <div id="container">
    <input
      type="time"
      name="wakeup-time"
      id="wakeup-time"
      v-model="wakeupTime"
    />
    <button @click="saveWakeupTime">この時間に起きる！</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wakeupTime: "06:00:00",
    }
  },
  methods: {
    saveWakeupTime() {
      localStorage.moreningWakeUp = JSON.stringify({
        targetHour: Number(this.wakeupTime.substring(0, 2)),
        targetMin10: Number(this.wakeupTime.substring(3, 4)),
        targetMin1: Number(this.wakeupTime.substring(4, 5)),
      })
      alert("登録しました！")
    },
  },
  mounted() {
    const previousWakeupTime = localStorage.moreningWakeUp
      ? JSON.parse(localStorage.moreningWakeUp)
      : {
          targetHour: 6,
          targetMin10: 0,
          targetMin1: 0,
        }
    const hh =
      previousWakeupTime.targetHour < 10
        ? "0" + previousWakeupTime.targetHour
        : previousWakeupTime.targetHour
    const mm =
      String(previousWakeupTime.targetMin10) +
      String(previousWakeupTime.targetMin1)
    this.wakeupTime = `${hh}:${mm}:00`
  },
}
</script>
<style scoped>
#container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}
input {
  width: 5em;
}
button {
  margin: 1em 0;
  width: 10em;
  height: 2em;
  text-align: center;
  font-size: 1em;
  color: white;
  background-color: #048abf;
  border-radius: 60px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 5px solid #022340;
}
button:hover {
  padding-top: 3px;
  border-bottom: 2px solid #022340;
  transition: 0.3s;
  color: white;
}
</style>
