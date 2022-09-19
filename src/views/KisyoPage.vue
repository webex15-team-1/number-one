<template>
  <img src="@/views/images/kisyo-bg.png" alt="背景" id="bg" />
  <div class="kisyo-app">
    <!-- じゃんけん -->
    <div class="janken" v-if="isJanken">
      <h2>今日の運試し</h2>
      <h3>勝てばポイント1.5倍！</h3>
      <div class="te__images">
        <div v-if="pon">
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

        <div v-else>
          <!-- ボタン推すまでのドゥルルルルのもの -->
          <img src="@/views/images/guu.png" alt="グー" class="dwu__guu" />
          <img src="@/views/images/tyoki.png" alt="チョキ" class="dwu__tyoki" />
          <img src="@/views/images/paa.png" alt="パー" class="dwu__paa" />
        </div>
      </div>

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

    <div class="jankenKakunin" v-if="buttonClicked">
      <div>獲得ポイント1.5倍のチャンス！運試しする？</div>
      <button class="kakuninButton" v-on:click="yesJanken">する</button>
      <button class="kakuninButton" v-on:click="noJanken">しない</button>
    </div>
    <h1 class="target">今日の起床目標時間</h1>
    <div class="targetTime">
      {{ targetHour }} : {{ targetMin10 }}{{ targetMin1 }}
    </div>
    <button class="pop-button" v-on:click="two">起床</button>
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
      buttonClicked: true,
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
    }
  },
  mounted: function () {
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
    two() {
      this.kisyoButton()
      this.pointRegister()
    },
    //じゃんけんする
    yesJanken() {
      this.isJanken = true
      this.buttonClicked = false
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
  components: { TimeSetup },
}
</script>
<style scoped>
#bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.kisyo-app {
  height: calc(6em + 125vh);
}
.targetTime {
  font-size: 2.5em;
  color: #022340;
}
.hour-box {
  text-align: center;
  font-size: 1.5em;
  width: 8vw;
  color: #022340;
  border: none;
}
.min-box {
  text-align: center;
  font-size: 1.5em;
  width: 4vw;
  color: #022340;
  border: none;
}
.janken {
  border: 4px solid;
  box-sizing: border-box;
  margin: 0 30%;
  padding: 1% 0;
}
.te__images {
  height: 24vw;
  position: relative;
}

.te {
  width: 60%;
  position: absolute;
  left: 20%;
}
.dwu__guu {
  width: 60%;
  position: absolute;
  left: 20%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
}

.dwu__tyoki {
  width: 60%;
  position: absolute;
  left: 20%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-delay: 0.1s;
}

.dwu__paa {
  width: 60%;
  position: absolute;
  left: 20%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-delay: 0.2s;
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
</style>
