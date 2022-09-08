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
    <button v-on:click="two" v-if="!before && !after">終了！</button>
    <p v-if="after">{{ asakatsuTime }}分朝活をしました！！</p>
    <p v-if="after && this.point > 0">{{ point }}ポイントを獲得しました！</p>
    <p v-if="fight">{{ fightMessage }}</p>
    <button v-on:click="again" v-if="after">もう一度</button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      hour: 0,
      min10: 0,
      min1: 5,
      sec10: 0,
      sec1: 0,
      before: true,
      after: false,
      timer: "",
      degree: 100,
      circle: "circle",
      asakatsuTime: "",
      fight: false,
      fightMessage: "朝活を5分以上できるよう頑張りましょう",
      point: 0,
    }
  },
  methods: {
    two() {
      this.stop()
      this.pointRegister()
    },
    start() {
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
    stop() {
      clearInterval(this.timer)
      this.after = true
      this.circle = "circle start stop"
      this.asakatsuTime = this.hour * 60 + this.min10 * 10 + this.min1
      //分に直す👆

      //ポイント処理
      if (this.asakatsuTime >= 5) {
        if (this.asakatsuTime < 10) {
          this.point += 3
        } else if (this.asakatsuTime < 20) {
          this.point += 6
        } else if (this.asakatsuTime < 30) {
          this.point += 9
        } else if (this.asakatsuTime < 45) {
          this.point += 12
        } else if (this.asakatsuTime < 60) {
          this.point += 16
        } else {
          this.point += 20
        }
      } else {
        this.fight = true
      }
    },
    again() {
      this.hour = 0
      this.min10 = 0
      this.min1 = 5
      this.sec10 = 0
      this.sec1 = 0
      this.before = true
      this.after = false
      this.circle = "circle"
      this.fight = false
    },
    pointRegister() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        // 未ログイン時
        if (!user) {
          // topに飛ばしてログインさせる
          this.$router.push("/top")
        }
        // ログイン時
        else {
          const uid = user.uid
          // ログイン済みのユーザー情報があるかをチェック
          //usersコレクションで確認している
          const docRef = doc(db, "users", uid)
          const userDoc = await getDoc(docRef)
          if (userDoc.exists()) {
            await updateDoc(docRef, {
              timePoints: this.point,
            })
          }
        }
      })
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
