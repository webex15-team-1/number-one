<template>
  <div class="app">
    <div class="janken">
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
    </div>

    <div class="target">起床目標時間</div>
    <div class="targetTime">
      <input type="number" min="0" max="12" v-model="targetHour" />:<input
        type="number"
        min="0"
        max="5"
        v-model="targetMin10"
      /><input type="number" min="0" max="9" v-model="targetMin1" />
    </div>
    <button v-on:click="kisyoButton">起床</button>
    <div v-if="isLate">
      <div class="timeLate">目標時間より{{ timeLate }}分です。</div>
      <div class="pointGet">{{ point }}ポイントを獲得しました！</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      isLate: false,
      point: 0,
      i: 1,
    }
  },
  methods: {
    kisyoButton: function () {
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
      this.isLate = true

      //ポイント処理
      if (this.timeLate >= -10 && this.timeLate <= 60) {
        if (this.timeLate <= 10) {
          this.point += 10 * this.i
        } else if (this.timeLate <= 20) {
          this.point += 7 * this.i
        } else if (this.timeLate <= 30) {
          this.point += 5 * this.i
        } else {
          this.point += 3 * this.i
        }
      }
    },
    choose(choice) {
      this.pon = true
      this.player = choice.number
      this.result()
      this.buttonJanken = false
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
  },
}
</script>
<style>
.janken {
  border: 4px solid;
  box-sizing: border-box;
  width: auto;
}
.te__images {
  height: 20vw;
  position: relative;
}

.te {
  width: 20%;
  position: absolute;
  left: 40%;
}

.dwu__guu {
  width: 20%;
  position: absolute;
  left: 40%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
}

.dwu__tyoki {
  width: 20%;
  position: absolute;
  left: 40%;
  animation-name: images;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-delay: 0.1s;
}

.dwu__paa {
  width: 20%;
  position: absolute;
  left: 40%;
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

.button__area {
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.janken__button {
  font-size: 100%;
  justify-content: space-around;
}

.pc__text {
  text-align: center;
}

.result__text {
  text-align: center;
}
</style>
