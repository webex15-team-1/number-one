<template>
  <div class="kisyo-app">
    <!-- じゃんけん -->
    <div
      class="janken"
      v-if="isJanken"
      :style="{
        border: `4px solid ${currentSetting.hamburgerBackgroundColor}`,
      }"
    >
      <h2>今日の運試し</h2>
      <h3>勝てばポイント1.5倍！</h3>
      <!-- <div class="te__images"> -->
      <div v-if="pon" class="te__images">
        <img
          v-if="this.pc === 0"
          src="@/views/images/guu.png"
          alt="グー"
          class="te"
        />
        <img
          v-if="this.pc === 1"
          src="@/views/images/tyoki.png"
          alt="チョキ"
          class="te"
        />
        <img
          v-if="this.pc === 2"
          src="@/views/images/paa.png"
          alt="パー"
          class="te"
        />
      </div>

      <div v-else class="te__images">
        <!-- ボタン推すまでのドゥルルルルのもの -->
        <img src="@/views/images/guu.png" alt="グー" class="dwu__guu" />
        <img src="@/views/images/tyoki.png" alt="チョキ" class="dwu__tyoki" />
        <img src="@/views/images/paa.png" alt="パー" class="dwu__paa" />
      </div>
      <!-- </div> -->

      <div class="button__area">
        <button
          v-for="choice in choices"
          v-bind:key="choice.number"
          v-on:click="choose(choice)"
          class="janken__button"
          v-bind:disabled="!buttonJanken"
        >
          {{ choice.te }}
        </button>
      </div>
      <h3 class="result__text">{{ resultText }}</h3>

      <div v-if="countTime">
        このウインドウは{{ remainTime }}秒後に閉じられます。
      </div>
    </div>
    <!-- じゃんけん -->

    <div
      class="jankenKakunin"
      v-if="buttonClicked"
      :style="{
        border: `4px solid ${currentSetting.hamburgerBackgroundColor}`,
      }"
    >
      <div>獲得ポイント1.5倍のチャンス！運試しする？</div>
      <button class="kakuninButton" v-on:click="yesJanken">する</button>
      <button class="kakuninButton" v-on:click="noJanken">しない</button>
    </div>
    <div class="wakeup-wrap">
      <img
        class="ohayo-img"
        src="@/views/images/ohayo-boy.png"
        alt="目覚める男の子"
      />
      <div class="wakeup-console">
        <transition name="wakeup-data">
          <div class="wakeup-table" v-if="showTable">
            <table>
              <tbody>
                <th>起床目標時間との差</th>
                <th>獲得ポイント</th>
                <tr>
                  <td>-10分～+10分</td>
                  <td>10 P</td>
                </tr>
                <tr>
                  <td>+10分～+20分</td>
                  <td>8 P</td>
                </tr>
                <tr>
                  <td>+20分～+30分</td>
                  <td>6 P</td>
                </tr>
                <tr>
                  <td>+30分～+60分</td>
                  <td>4 P</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>

        <div class="wakeup">
          <button class="question-button" @click="toggleTable">
            <Icon icon="akar-icons:question" width="1.5em" />
          </button>
          <h1 class="target">今日の起床目標時間</h1>
          <div class="targetTime">
            {{ targetHour }} : {{ targetMin10 }}{{ targetMin1 }}
          </div>
          <button class="pop-button" v-on:click="two">起床</button>
        </div>
      </div>

      <img
        class="ohayo-img"
        src="@/views/images/ohayo-girl.png"
        alt="目覚める女の子"
      />
    </div>

    <div v-if="isLate && !logExist">
      <div class="timeLate">目標時間より{{ fixedtimeLate }}分です。</div>
      <div class="pointGet">{{ point }}ポイントを獲得しました！</div>
    </div>
    <TimeSetup v-if="isLate || logExist"
      >明日の起床時間を設定しよう！</TimeSetup
    >
  </div>
</template>

<script>
import { Icon } from "@iconify/vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  doc,
  updateDoc,
  getDoc,
  increment,
  arrayUnion,
} from "firebase/firestore"
import { db } from "@/firebase"
import TimeSetup from "@/components/TimeSetup.vue"

export default {
  data() {
    return {
      isJanken: false,
      buttonClicked: false,
      countTime: false,
      remainTime: 5,
      player: "",
      pc: "",
      resultText: "　",
      pon: false,
      choices: [
        {
          te: "グー",
          number: 0,
        },
        {
          te: "チョキ",
          number: 1,
        },
        {
          te: "パー",
          number: 2,
        },
      ],
      buttonJanken: true,
      targetHour: 6,
      targetMin10: 0,
      targetMin1: 0,
      timeLate: "",
      fixedtimeLate: "",
      isLate: false,
      point: 0,
      i: 1,
      logExist: false,
      showTable: false,
      auth: getAuth(),
    }
  },
  mounted: function () {
    try {
      onAuthStateChanged(this.auth, async (user) => {
        const uid = user.uid
        const docRef = doc(db, "users", uid)
        const userDoc = await getDoc(docRef)
        const janken = userDoc.data().janken
        if (janken) {
          let count = 0
          const day =
            new Date().getFullYear() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getDate()
          for (let i = 0; i < janken.length; i++) {
            if (janken[i].date === day) {
              count++
            }
          }
          if (count === 0) {
            this.buttonClicked = true
          }
        } else {
          this.buttonClicked = true
        }
      })
    } catch (error) {
      console.error(error)
    }
    // 起床した形跡があるかチェック
    const now = new Date()
    const searchString = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`
    const wakeUpLog = localStorage.moreningWakeUpLog
      ? JSON.parse(localStorage.moreningWakeUpLog)
      : []
    this.logExist = wakeUpLog.includes(searchString)
    // 目標時間のlocalStorageからの読み出し
    const previousWakeupTime = localStorage.moreningWakeUp
      ? JSON.parse(localStorage.moreningWakeUp)
      : {
          targetHour: 6,
          targetMin10: 0,
          targetMin1: 0,
        }
    this.targetHour = previousWakeupTime.targetHour
    this.targetMin10 = previousWakeupTime.targetMin10
    this.targetMin1 = previousWakeupTime.targetMin1
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        this.$router.push("/top")
      }
    })
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable
    },
    two() {
      this.kisyoButton()
      this.pointRegister()
    },
    //じゃんけんする
    yesJanken() {
      this.isJanken = true
      this.buttonClicked = false
      onAuthStateChanged(this.auth, async (user) => {
        const uid = user.uid
        // ログイン済みのユーザー情報があるかをチェック
        //usersコレクションで確認している
        const docRef = doc(db, "users", uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          await updateDoc(docRef, {
            janken: arrayUnion({
              jankenDone: true,
              date: new Date().toLocaleDateString(),
            }),
          })
        }
      })
    },
    //じゃんけんしない
    noJanken() {
      this.buttonClicked = false
    },
    kisyoButton() {
      //今の時間
      let now = new Date()
      //目標時間
      let target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        this.targetHour,
        this.targetMin10 * 10 + this.targetMin1
      )
      //差分(分)
      this.timeLate = Math.floor(
        (now.getTime() - target.getTime()) / (1000 * 60)
      )
      if (this.timeLate > 0) {
        this.fixedtimeLate = "+" + this.timeLate
      } else {
        this.fixedtimeLate = this.timeLate
      }

      //ポイント処理
      if (this.isLate || this.logExist) {
        alert("今日の起床時間の結果は登録済みです。")
      } else {
        if (this.timeLate >= -10 && this.timeLate <= 60) {
          if (this.timeLate <= 10) {
            this.point += 10 * this.i
            alert("Perfect！いい調子です！")
          } else if (this.timeLate <= 20) {
            this.point += 8 * this.i
            alert("Great！")
          } else if (this.timeLate <= 30) {
            this.point += 6 * this.i
            alert("Good！")
          } else {
            this.point += 4 * this.i
            alert("OK")
          }
        } else {
          alert("早く起きれるよう頑張りましょう...")
        }
      }
      this.isLate = true

      // 起きたことを記録しておく
      const wakeUpLog = localStorage.moreningWakeUpLog
        ? JSON.parse(localStorage.moreningWakeUpLog)
        : []
      wakeUpLog.push(`${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`)
      console.log(wakeUpLog)
      localStorage.moreningWakeUpLog = JSON.stringify(wakeUpLog)
    },
    choose(choice) {
      this.pon = true
      this.player = choice.number
      this.result()
      this.buttonJanken = false
      this.countTime = true
      setTimeout(() => {
        this.isJanken = false
      }, 5000)
      const remainTime = setInterval(() => {
        this.remainTime -= 1
        if (this.remainTime === 0) clearInterval(remainTime)
      }, 1000)
      //選択した手がでるようにする
    },
    result() {
      //Math.random()は0~1未満の少数を返す
      //最大値に3足して0~2にした
      //math.floor()で小数点以下を切り捨て
      this.pc = Math.floor(Math.random() * 3)
      switch ((this.player - this.pc + 3) % 3) {
        case 0:
          this.resultText = "引き分け..."
          break
        case 1:
          this.resultText = "残念！負けです💦"
          break
        case 2:
          this.resultText = "おめでとう！勝ちです🎉ポイント1.5倍！！"
          this.i = 1.5
      }
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
              getupPoints: increment(this.point),
              shopPoints: increment(this.point),
              kisyo: arrayUnion({
                date: new Date().toLocaleDateString(),
                getupDiff: this.fixedtimeLate,
                getupCurrentTime: new Date().toLocaleTimeString(),
              }),
            })
          }
        }
      })
      // 目標時間のlocalStorageへの保存
      localStorage.moreningWakeUp = JSON.stringify({
        targetHour: this.targetHour,
        targetMin10: this.targetMin10,
        targetMin1: this.targetMin1,
      })
    },
  },
  computed: {
    currentSetting() {
      const colorIndex = this.$store.state.activeColorSet
      return this.$store.state.colors[colorIndex]
    },
  },
  components: { TimeSetup, Icon },
}
</script>
<style scoped>
@media (min-width: 1001px) {
  .kisyo-app {
    display: flex;
    width: 100%;
    margin: 0;
    flex-direction: column;
    align-items: center;
  }
  .janken,
  .jankenKakunin {
    background-color: #d8eefe;
  }
  .janken {
    border: 4px solid;
    box-sizing: border-box;
    margin: 0 10%;
    padding: 1% 0;
    display: inline-flex;
    flex-direction: column;
    width: 30%;
  }
  .janken > h2 {
    margin: 0;
    padding: 0.5em 0;
    font-size: 2.5em;
  }
  .janken > h3 {
    margin: 0;
  }
  .te__images {
    height: 50%;
  }
  .te__images img {
    width: 50%;
  }
  .dwu__guu {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    z-index: 1;
    margin-right: -50%;
  }

  .dwu__tyoki {
    opacity: 0;
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.1s;
    z-index: 2;
  }

  .dwu__paa {
    opacity: 0;
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
    z-index: 3;
    margin-left: -50%;
  }

  @keyframes images {
    0% {
      opacity: 0;
      /* opacityは透明度で、0~1で設定、0は表示されない */
    }
    16.5% {
      opacity: 1;
    }
    33% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .janken__button {
    margin: 1%;
  }

  .pc__text {
    text-align: center;
  }

  .result__text {
    text-align: center;
  }

  .jankenKakunin {
    border: thick double red;
    box-sizing: border-box;
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 1%;
  }

  .kakuninButton {
    margin: 1%;
  }
  .wakeup-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0 4em;
    z-index: 1;
  }
  .ohayo-img {
    width: 20%;
  }
  .wakeup-console {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #048abf;
    border-radius: 31px;
    margin: 2em;
    padding: 0.5em 2em;
  }
  .wakeup-table {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: absolute;
    width: 90%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(216, 238, 254, 0.95);
  }
  .wakeup-table > table th,
  .wakeup-table > table td {
    padding: 0.5em 1em;
    font-size: 1em;
  }
  .wakeup-data-enter-active,
  .wakeup-data-leave-active {
    transition: all 0.5s ease;
  }
  .wakeup-data-enter-from,
  .wakeup-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
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
    right: 0%;
    bottom: 85%;
  }
  .target {
    font-size: 2.5em;
  }
  .targetTime {
    font-size: 3em;
    color: #022340;
  }
  .pop-button {
    margin: 1em 0;
    width: 5em;
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
  .timeLate,
  .pointGet {
    font-size: 1.5em;
  }
}
@media (max-width: 1000px) {
  .kisyo-app {
    display: flex;
    width: 100%;
    margin: 1em 0 calc(100vh - 100% + 10em);
    flex-direction: column;
    align-items: center;
  }
  .janken,
  .jankenKakunin {
    background-color: #d8eefe;
  }
  .janken {
    border: 4px solid;
    box-sizing: border-box;
    margin: 0 10%;
    padding: 1% 0;
    display: inline-flex;
    flex-direction: column;
    width: 50%;
  }
  .janken > h2 {
    margin: 0;
    padding: 0.5em 0;
    font-size: 2.5em;
  }
  .janken > h3 {
    padding: 0;
    margin: 0;
  }
  .te__images {
    height: 30%;
  }
  .te__images img {
    width: 30%;
  }
  .dwu__guu {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    z-index: 1;
    margin-right: -30%;
  }

  .dwu__tyoki {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.1s;
    z-index: 2;
  }

  .dwu__paa {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
    z-index: 3;
    margin-left: -30%;
  }

  @keyframes images {
    0% {
      opacity: 0;
      /* opacityは透明度で、0~1で設定、0は表示されない */
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .janken__button {
    margin: 1%;
  }

  .pc__text {
    text-align: center;
  }

  .result__text {
    text-align: center;
  }

  .jankenKakunin {
    border: thick double red;
    box-sizing: border-box;
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 1%;
  }

  .kakuninButton {
    margin: 1%;
  }
  .wakeup-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0 1em;
    z-index: 1;
  }
  .ohayo-img {
    width: 20%;
  }
  .wakeup-console {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #048abf;
    border-radius: 31px;
    margin: 2em;
    padding: 0.5em 2em;
  }
  .wakeup-table {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: absolute;
    width: 95%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(216, 238, 254, 0.95);
  }
  .wakeup-table > table th,
  .wakeup-table > table td {
    padding: 0.25em;
    font-size: 1em;
    word-break: keep-all;
    line-break: strict;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .wakeup-data-enter-active,
  .wakeup-data-leave-active {
    transition: all 0.5s ease;
  }
  .wakeup-data-enter-from,
  .wakeup-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
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
    right: 5%;
    bottom: 85%;
  }
  .target {
    font-size: 1.5em;
  }
  .targetTime {
    font-size: 2em;
    color: #022340;
  }
  .pop-button {
    margin: 1em 0;
    width: 5em;
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
  .timeLate,
  .pointGet {
    font-size: 1.5em;
  }
}
@media (max-width: 670px) {
  .kisyo-app {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 1em 0 calc(100vh - 100%);
    flex-direction: column;
    align-items: center;
  }
  .janken,
  .jankenKakunin {
    background-color: #d8eefe;
  }
  .janken {
    border: 4px solid;
    box-sizing: border-box;
    margin: 0 10%;
    padding: 1% 0;
    display: inline-flex;
    flex-direction: column;
    width: 90%;
  }
  .janken > h2 {
    margin: 0;
    padding: 0.5em 0;
    font-size: 2.5em;
  }
  .janken > h3 {
    padding: 0;
    margin: 0;
  }
  .te__images {
    height: 30%;
  }
  .te__images img {
    width: 30%;
  }
  .dwu__guu {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    z-index: 1;
    margin-right: -30%;
  }

  .dwu__tyoki {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.1s;
    z-index: 2;
  }

  .dwu__paa {
    animation-name: images;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
    z-index: 3;
    margin-left: -30%;
  }

  @keyframes images {
    0% {
      opacity: 0;
      /* opacityは透明度で、0~1で設定、0は表示されない */
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .janken__button {
    margin: 1%;
  }

  .pc__text {
    text-align: center;
  }

  .result__text {
    text-align: center;
  }

  .jankenKakunin {
    border: thick double red;
    box-sizing: border-box;
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 1%;
  }

  .kakuninButton {
    margin: 1%;
  }
  .wakeup-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0 1em;
    z-index: 1;
  }
  .ohayo-img {
    width: 25%;
  }
  .wakeup-console {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #048abf;
    border-radius: 31px;
    margin: 0.5em;
    padding: 0.5em 2em;
  }
  .wakeup-table {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: absolute;
    width: 95%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(216, 238, 254, 0.95);
  }
  .wakeup-table > table th,
  .wakeup-table > table td {
    padding: 0.25em;
    font-size: 0.7em;
    word-break: keep-all;
    line-break: strict;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .wakeup-data-enter-active,
  .wakeup-data-leave-active {
    transition: all 0.5s ease;
  }
  .wakeup-data-enter-from,
  .wakeup-data-leave-to {
    transform: translate(-50%, -50%);
    opacity: 0;
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
    right: 5%;
    bottom: 85%;
  }
  .target {
    font-size: 1em;
  }
  .targetTime {
    font-size: 2em;
    color: #022340;
  }
  .pop-button {
    margin: 1em 0;
    width: 5em;
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
  .timeLate,
  .pointGet {
    font-size: 1.5em;
  }
}
</style>
