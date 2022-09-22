<template>
  <div class="asakatsu">
    <h1 class="start_asakatsu">朝活を始めよう!</h1>
    <div class="timer-container">
      <img src="@/views/images/asakatsu-left.png" />
      <div class="timer-design">
        <button class="question-button" @click="toggleTable">
          <Icon icon="akar-icons:question" width="1.5em" />
        </button>
        <transition name="asakatsu-data">
          <div class="asakatsu-table" v-if="showTable">
            <table>
              <tbody>
                <th>朝活の取り組み時間</th>
                <th>獲得ポイント</th>
                <tr>
                  <td>5分～10分</td>
                  <td>3 P</td>
                </tr>
                <tr>
                  <td>10分～20分</td>
                  <td>6 P</td>
                </tr>
                <tr>
                  <td>20分～30分</td>
                  <td>9 P</td>
                </tr>
                <tr>
                  <td>30分～45分</td>
                  <td>12 P</td>
                </tr>
                <tr>
                  <td>45分～+60分</td>
                  <td>16 P</td>
                </tr>
                <tr>
                  <td>60分～</td>
                  <td>20 P</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
        <div class="timer">
          {{ hour }}:{{ min10 }}{{ min1 }}:{{ sec10 }}{{ sec1 }}
        </div>
        <!--  タイマーは3重円でできている
            そのうちmiddleの上端中央に太陽が張り付いていて
            middleが時間とともに回転することで太陽を動かしている -->
        <div class="minicircle"></div>
        <div
          class="middlecircle"
          :style="{ transform: `rotate(${degree}deg)` }"
        >
          <img class="circle" src="@/views/images/sun.png" />
        </div>
        <div class="bigcircle"></div>
      </div>
      <img src="@/views/images/asakatsu-right.png" />
    </div>
    <div class="asakatsu-console">
      <button class="pop-button" v-on:click="start" v-if="before">開始</button>
      <button class="pop-button" v-on:click="two" v-if="!before && !after">
        終了
      </button>
      <p class="asakatsu-text-navy" v-if="after">
        {{ asakatsuTime }}分朝活をしました
      </p>
      <p class="asakatsu-text-navy" v-if="after && this.point > 0">
        {{ point }}ポイントを獲得しました!
      </p>
      <p class="asakatsu-text-navy" v-if="fight">{{ fightMessage }}</p>
      <button class="pop-button" v-on:click="again" v-if="after">
        もう一度
      </button>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  doc,
  updateDoc,
  getDoc,
  increment,
  arrayUnion,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Icon } from "@iconify/vue"

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
      degree: 0,
      asakatsuTime: "",
      fight: false,
      fightMessage: "朝活を5分以上できるよう頑張りましょう",
      point: 0,
      showTable: false,
    }
  },
  mounted: function () {
    // const auth = getAuth()
    // onAuthStateChanged(auth, async (user) => {
    //   if (!user) {
    //     this.$router.push("/top")
    //   }
    // })
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable
    },
    two() {
      this.stop()
      this.pointRegister()
    },
    start() {
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
      this.min1 = 0
      this.sec10 = 0
      this.sec1 = 0
      this.before = true
      this.after = false
      this.fight = false
      this.point = 0
      this.degree = 0
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
              timePoints: increment(this.point),
              shopPoints: increment(this.point),
              asakatsu: arrayUnion({
                time: this.asakatsuTime,
                date: new Date().toLocaleDateString(),
                CurrentTime: new Date().toLocaleTimeString(),
              }),
            })
          }
        }
      })
    },
  },
  components: {
    Icon,
  },
}
</script>

<style scoped>
@media (min-width: 1001px) {
  .start_asakatsu {
    color: #022340;
  }
  .asakatsu-text-navy {
    color: #022340;
    font-size: 1.5em;
    margin: 0.5em 0;
  }
  .timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5vw;
  }
  .timer-container > img {
    width: 15vw;
    height: 15vw;
  }
  .times {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 30vw;
    margin-bottom: 5%;
  }
  .timer-design {
    position: relative;
    height: 25vw;
    width: 25vw;
    display: inline-block;
  }
  .question-button {
    background: transparent;
    vertical-align: middle;
    text-align: inherit;
    -webkit-appearance: none;
    appearance: none;
    width: 2em;
    height: 2em;
    text-align: center;
    border: none;
    border-radius: 50%;
    margin: 0.5em;
    position: absolute;
    top: 0%;
    left: 95%;
    z-index: 7;
  }
  .asakatsu-table {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    font-size: 1em;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .asakatsu-table > table {
    margin: auto;
    background-color: rgba(216, 238, 254, 0.95);
    border: 1px solid #048abf;
  }
  .asakatsu-data-enter-active,
  .asakatsu-data-leave-active {
    transition: all 0.5s ease;
  }
  .asakatsu-data-enter-from,
  .asakatsu-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  .timer {
    font-size: 3em;
    width: 100%;
    line-height: 30vw;
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .minicircle {
    position: absolute;
    z-index: 3;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-radius: 50%;
    background: #d8eefe;
  }
  .middlecircle {
    position: absolute;
    z-index: 2;
    width: 94%;
    height: 94%;
    top: 3%;
    left: 3%;
    border-radius: 50%;
    background: white;
    transition: all 1s linear;
  }
  .bigcircle {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 50%;
    background: #d8eefe;
  }
  .circle {
    position: absolute;
    display: inline-block;
    z-index: 4;
    width: 20%;
    height: 20%;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
  }

  .pop-button {
    margin: 3%;
    width: 8em;
    height: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    background-color: #048abf;
    border-radius: 60px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 5px solid #022340;
  }
  .pop-button:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
}
@media (max-width: 1000px) {
  .start_asakatsu {
    color: #022340;
    font-size: 2.5em;
  }
  .asakatsu-text-navy {
    color: #022340;
    font-size: 1.5em;
    margin: 0.5em 0;
  }
  .timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5vw;
  }
  .timer-container > img {
    width: 15vw;
    height: 15vw;
  }
  .question-button {
    background: transparent;
    vertical-align: middle;
    text-align: inherit;
    -webkit-appearance: none;
    appearance: none;
    width: 2em;
    height: 2em;
    text-align: center;
    border: none;
    border-radius: 50%;
    margin: 0.5em;
    position: absolute;
    top: 0%;
    left: 95%;
    z-index: 7;
  }
  .asakatsu-table {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    font-size: 1em;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .asakatsu-table > table {
    margin: auto;
    background-color: rgba(216, 238, 254, 0.95);
    border: 1px solid #048abf;
  }
  .asakatsu-data-enter-active,
  .asakatsu-data-leave-active {
    transition: all 0.5s ease;
  }
  .asakatsu-data-enter-from,
  .asakatsu-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  .times {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 30vw;
    margin-bottom: 5%;
  }
  .timer-design {
    position: relative;
    height: 35vw;
    width: 35vw;
    display: block;
  }
  .timer {
    font-size: 3em;
    width: 100%;
    line-height: 30vw;
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .minicircle {
    position: absolute;
    z-index: 3;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-radius: 50%;
    background: #d8eefe;
  }
  .middlecircle {
    position: absolute;
    z-index: 2;
    width: 94%;
    height: 94%;
    top: 3%;
    left: 3%;
    border-radius: 50%;
    background: white;
    transition: all 1s linear;
  }
  .bigcircle {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 50%;
    background: #d8eefe;
  }
  .circle {
    position: absolute;
    display: inline-block;
    z-index: 4;
    width: 20%;
    height: 20%;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
  }

  .pop-button {
    margin: 3%;
    width: 8em;
    height: 2.5em;
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
  .pop-button:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
}
@media (max-width: 670px) {
  .start_asakatsu {
    color: #022340;
    font-size: 2.5em;
  }
  .asakatsu-text-navy {
    color: #022340;
    font-size: 1.5em;
    margin: 0.5em 0;
  }
  .timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5vw;
  }
  .timer-container > img {
    width: 15vw;
    height: 15vw;
  }
  .times {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 30vw;
    margin-bottom: 5%;
  }
  .timer-design {
    position: relative;
    height: 50vw;
    width: 50vw;
    display: block;
  }
  .question-button {
    background: transparent;
    vertical-align: middle;
    text-align: inherit;
    -webkit-appearance: none;
    appearance: none;
    width: 2em;
    height: 2em;
    text-align: center;
    border: none;
    border-radius: 50%;
    margin: 0.5em;
    position: absolute;
    top: 0%;
    left: 95%;
    z-index: 7;
  }
  .asakatsu-table {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    font-size: 0.5em;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .asakatsu-table > table {
    margin: auto;
    background-color: rgba(216, 238, 254, 0.95);
    border: 1px solid #048abf;
  }
  .asakatsu-data-enter-active,
  .asakatsu-data-leave-active {
    transition: all 0.5s ease;
  }
  .asakatsu-data-enter-from,
  .asakatsu-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  .timer {
    font-size: 1.5em;
    width: 100%;
    line-height: 30vw;
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .minicircle {
    position: absolute;
    z-index: 3;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-radius: 50%;
    background: #d8eefe;
  }
  .middlecircle {
    position: absolute;
    z-index: 2;
    width: 94%;
    height: 94%;
    top: 3%;
    left: 3%;
    border-radius: 50%;
    background: white;
    transition: all 1s linear;
  }
  .bigcircle {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    margin: auto;
    border-radius: 50%;
    background: #d8eefe;
  }
  .circle {
    position: absolute;
    display: inline-block;
    z-index: 4;
    width: 20%;
    height: 20%;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
  }

  .pop-button {
    margin: 3%;
    width: 6em;
    height: 1.5em;
    text-align: center;
    font-size: 2em;
    color: white;
    background-color: #048abf;
    border-radius: 60px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 5px solid #022340;
  }
  .pop-button:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
}
</style>
